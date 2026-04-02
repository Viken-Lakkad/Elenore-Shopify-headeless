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
        password: crypto.randomUUID(), // ← Shopify requires this; user never logs in
      },
    });

    const { customer, customerUserErrors } = data.customerCreate;

    if (customerUserErrors?.length > 0) {
      // Handle "already exists" gracefully
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

export async function loader({ params }) {
  const { handle } = params;

  const data = await shopifyGraphQL(collectionByHandleQuery, { handle });
  const collection = data?.collectionByHandle;

  if (!collection) {
    throw new Response("Collection Not Found", { status: 404 });
  }
  // Shop by design data
  const shopByDesignData = await shopifyGraphQL(shopByDesignQuery);
  const shopByDesign = shopByDesignData?.metaobjects?.nodes[0] ?? null;

  // Why Elinor Jewels
  const whyElinorJewelsData = await shopifyGraphQL(whyElinorJewelsQuery);
  const whyElinorJewels = whyElinorJewelsData?.metaobjects?.nodes?.[0];

  return {
    collection: {
      id: collection.id,
      title: collection.title,
      description: collection.description,
      products: collection.products.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.title,
        handle: edge.node.handle,
        image: edge.node.featuredImage?.url || null,
        altText: edge.node.featuredImage?.altText || edge.node.title,
        price: edge.node.priceRange.minVariantPrice.amount,
        currency: edge.node.priceRange.minVariantPrice.currencyCode,
      })),
    },
    shopByDesign,
    whyElinorJewels
  };
}

export function meta({ data }) {
  return [
    { title: data?.collection?.title || "Collection" },
    { name: "description", content: data?.collection?.description || "" },
  ];
}

export default function CollectionPage() {
  const { collection, shopByDesign, whyElinorJewels } = useLoaderData();

  return (
    <>
      <div className="py-8">
        <div className="mb-8 pb-8 text-center border-b border-[#D6D6D6]">
          <h1 className=" container mx-auto text-5xl font-streamline font-thin">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-black text-lg container mx-auto font-proxima mt-2 max-w-3xl">
              {collection.description}
            </p>
          )}
        </div>

        {/* Products Grid */}
        {collection.products.length === 0 ? (
          <p className="px-1.5 container mx-auto text-center text-gray-400">
            No products in this collection.
          </p>
        ) : (
          <div className="px-1.5 container mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {collection.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <ShopByDesign shopByDesign={shopByDesign} />
      <WhyElinorJewels whyElinorJewels={whyElinorJewels} />
      <NewsletterForm />
    </>
  );
}
