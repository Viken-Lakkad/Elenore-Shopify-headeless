import { useState } from "react";
import { useLoaderData } from "react-router";
import { shopifyGraphQL } from "../utils/shopify-admin";
import {
  collectionByHandleQuery,
  shopByDesignQuery,
  whyElinorJewelsQuery,
} from "../graphql/queries/Queries";
import { ShopByDesign } from "../components/ShopByDesign";
import ProductCard from "../components/ProductCard";
import { WhyElinorJewels } from "../components/WhyElinorJewels";
import { NewsletterForm } from "../components/NewsletterForm";
import { subscribeNewsletterMutation } from "../graphql/mutations/mutations";
import { Filters } from "../Icons/Filters";
import { FilterSidebar } from "../components/FilterSidebar";
import { Pagination } from "../components/Pagination";

const PAGE_SIZE = 12;

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!email) {
    return { success: false, message: "Email is required." };
  }

  try {
    const data = await shopifyGraphQL(subscribeNewsletterMutation, {
      input: {
        email,
        acceptsMarketing: true,
        password: crypto.randomUUID(),
      },
    });

    const { customerUserErrors } = data.customerCreate;

    if (customerUserErrors?.length > 0) {
      const alreadyExists = customerUserErrors.some((e) => e.code === "TAKEN");
      if (alreadyExists) {
        return { success: true, message: "You're already subscribed! 🎉" };
      }
      return { success: false, message: customerUserErrors[0].message };
    }

    return { success: true, message: "You're subscribed! 🎉" };
  } catch (err) {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// ── Helper: build price buckets from actual min/max ──────────────────────────
function buildPriceBuckets(min, max, currency) {
  if (min === max) return [];
  const sym = currency === "INR" ? "₹" : "$";
  const range = max - min;

  const thresholds =
    range <= 1000
      ? [250, 500, 750]
      : range <= 5000
        ? [1000, 2000, 3500]
        : [2500, 5000, 10000];

  const buckets = [];
  thresholds.forEach((t, i) => {
    const prev = thresholds[i - 1] ?? min;
    if (prev < t && t < max) {
      if (i === 0) buckets.push(`Under ${sym}${t.toLocaleString()}`);
      buckets.push(
        `${sym}${prev.toLocaleString()} – ${sym}${t.toLocaleString()}`,
      );
    }
  });

  const last = thresholds[thresholds.length - 1];
  if (last < max) buckets.push(`${sym}${last.toLocaleString()} & Above`);

  return buckets;
}

// ── Loader ───────────────────────────────────────────────────────────────────
export async function loader({ params, request }) {
  const { handle } = params;
  const url = new URL(request.url);

  const after  = url.searchParams.get("after")  || null;
  const before = url.searchParams.get("before") || null;

  // Going backwards uses `last + before`, going forwards uses `first + after`
  const paginationVars = before
    ? { last: PAGE_SIZE, before }
    : { first: PAGE_SIZE, after };

  const data = await shopifyGraphQL(collectionByHandleQuery, {
    handle,
    ...paginationVars,
  });

  const collection = data?.collectionByHandle;

  if (!collection) {
    throw new Response("Collection Not Found", { status: 404 });
  }

  const { pageInfo, edges } = collection.products;

  // Map products with all filter-relevant fields
  const products = edges.map(({ node }) => {
    const price = parseFloat(node.priceRange.minVariantPrice.amount);
    const compareAt = parseFloat(
      node.compareAtPriceRange?.minVariantPrice?.amount || 0,
    );
    const discountPercent =
      compareAt > price
        ? Math.round(((compareAt - price) / compareAt) * 100)
        : 0;

    return {
      id: node.id,
      title: node.title,
      handle: node.handle,
      image: node.featuredImage?.url || null,
      altText: node.featuredImage?.altText || node.title,
      price,
      compareAt,
      discountPercent,
      currency: node.priceRange.minVariantPrice.currencyCode,
      productType: node.productType || "",
      tags: node.tags || [],
      options: node.options || [],
    };
  });

  // ── Build dynamic filters from current page products ──
  const productTypes = [
    ...new Set(products.map((p) => p.productType).filter(Boolean)),
  ];

  const colors = [
    ...new Set(
      products.flatMap((p) =>
        p.options
          .filter((o) => /colou?r/i.test(o.name))
          .flatMap((o) => o.values),
      ),
    ),
  ];

  const materials = [
    ...new Set(
      products.flatMap((p) =>
        p.options
          .filter((o) => /material/i.test(o.name))
          .flatMap((o) => o.values),
      ),
    ),
  ];

  const discountBrackets = [
    { label: "10% Off & Above", min: 10 },
    { label: "20% Off & Above", min: 20 },
    { label: "30% Off & Above", min: 30 },
    { label: "50% Off & Above", min: 50 },
  ]
    .filter((b) => products.some((p) => p.discountPercent >= b.min))
    .map((b) => b.label);

  const prices = products.map((p) => p.price);
  const currency = products[0]?.currency || "INR";
  const priceBuckets =
    prices.length > 0
      ? buildPriceBuckets(Math.min(...prices), Math.max(...prices), currency)
      : [];

  const dynamicFilters = [
    productTypes.length > 0 && {
      id: "productType",
      label: "Product Type",
      options: productTypes,
    },
    colors.length > 0 && { id: "color", label: "Color", options: colors },
    materials.length > 0 && {
      id: "material",
      label: "Material",
      options: materials,
    },
    discountBrackets.length > 0 && {
      id: "discount",
      label: "Discount",
      options: discountBrackets,
    },
    priceBuckets.length > 0 && {
      id: "price",
      label: "Price Range",
      options: priceBuckets,
    },
  ].filter(Boolean);

  // ── Shop by design & Why Elinor Jewels ──
  const shopByDesignData = await shopifyGraphQL(shopByDesignQuery);
  const shopByDesign = shopByDesignData?.metaobjects?.nodes[0] ?? null;

  const whyElinorJewelsData = await shopifyGraphQL(whyElinorJewelsQuery);
  const whyElinorJewels = whyElinorJewelsData?.metaobjects?.nodes?.[0];

  return {
    collection: {
      id: collection.id,
      title: collection.title,
      description: collection.description,
      products,
      pageInfo, // ← hasPreviousPage, hasNextPage, startCursor, endCursor
    },
    dynamicFilters,
    shopByDesign,
    whyElinorJewels,
  };
}

export function meta({ data }) {
  return [
    { title: data?.collection?.title || "Collection" },
    { name: "description", content: data?.collection?.description || "" },
  ];
}

export default function collection() {
  const { collection, dynamicFilters, shopByDesign, whyElinorJewels } =
    useLoaderData();

  const [activeFilters, setActiveFilters] = useState({});

  // Apply active filters to the current page's products
  const filteredProducts = collection.products.filter((product) => {
    // Product Type
    if (
      activeFilters.productType?.length > 0 &&
      !activeFilters.productType.includes(product.productType)
    )
      return false;

    // Color
    if (activeFilters.color?.length > 0) {
      const productColors = product.options
        .filter((o) => /colou?r/i.test(o.name))
        .flatMap((o) => o.values);
      if (!activeFilters.color.some((c) => productColors.includes(c)))
        return false;
    }

    // Material
    if (activeFilters.material?.length > 0) {
      const productMaterials = product.options
        .filter((o) => /material/i.test(o.name))
        .flatMap((o) => o.values);
      if (!activeFilters.material.some((m) => productMaterials.includes(m)))
        return false;
    }

    // Discount
    if (activeFilters.discount?.length > 0) {
      const minRequired = Math.min(
        ...activeFilters.discount.map((d) => parseInt(d)),
      );
      if (product.discountPercent < minRequired) return false;
    }

    // Price Range
    if (activeFilters.price?.length > 0) {
      const sym = product.currency === "INR" ? "₹" : "$";
      const inRange = activeFilters.price.some((bucket) => {
        const nums = bucket
          .replace(new RegExp(`\\${sym}`, "g"), "")
          .match(/[\d,]+/g)
          ?.map((n) => parseInt(n.replace(/,/g, "")));
        if (!nums) return false;
        if (bucket.startsWith("Under")) return product.price < nums[0];
        if (bucket.includes("& Above")) return product.price >= nums[0];
        return product.price >= nums[0] && product.price <= nums[1];
      });
      if (!inRange) return false;
    }

    return true;
  });

  return (
    <>
      <div className="py-8">
        {/* Collection Header */}
        <div className="mb-8 pb-8 text-center border-b border-[#D6D6D6]">
          <h1 className="container mx-auto text-5xl font-streamline font-thin">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-black text-lg container mx-auto font-proxima mt-2 max-w-3xl">
              {collection.description}
            </p>
          )}
        </div>

        {collection.products.length === 0 ? (
          <p className="px-1.5 container mx-auto text-center text-gray-400">
            No products in this collection.
          </p>
        ) : (
          <div className="container mx-auto">
            {/* Filter toggle label */}
            <div>
              <div className="inline-flex px-4 py-2 gap-2 border border-[#D6D6D6] items-center mb-6">
                <span className="h-5 w-5 text-black">
                  <Filters />
                </span>
                <p className="text-base font-proxima text-gray-500">Filter</p>
              </div>
            </div>

            <div className="px-1.5 flex justify-center container mx-auto gap-6">
              {/* Filter Sidebar */}
              <div className="w-3/12">
                <FilterSidebar
                  filters={dynamicFilters}
                  onFilterChange={setActiveFilters}
                />
              </div>

              {/* Products Grid + Pagination */}
              <div className="w-9/12">
                {filteredProducts.length === 0 ? (
                  <p className="text-center text-gray-400 mt-12 font-proxima">
                    No products match your selected filters.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
                <Pagination pageInfo={collection.pageInfo} />
              </div>
            </div>
          </div>
        )}
      </div>
      <ShopByDesign shopByDesign={shopByDesign} />
      <WhyElinorJewels whyElinorJewels={whyElinorJewels} />
      <NewsletterForm />
    </>
  );
}