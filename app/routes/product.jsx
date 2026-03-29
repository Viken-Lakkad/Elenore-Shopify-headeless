import { useState } from "react";
import { useLoaderData } from "react-router";
import { shopifyGraphQL } from "../utils/shopify-admin";
import { productByHandleQuery } from "../graphql/queries/Queries";
import { useCart } from "../context/CartContext";

export async function loader({ params }) {
  const { handle } = params;
  const data = await shopifyGraphQL(productByHandleQuery, { handle });
  const product = data?.productByHandle;

  if (!product) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return {
    product: {
      id: product.id,
      title: product.title,
      description: product.description,
      vendor: product.vendor,
      tags: product.tags,
      featuredImage: product.featuredImage?.url || null,
      images: product.images.edges.map((edge) => ({
        url: edge.node.url,
        altText: edge.node.altText,
      })),
      // product base price
      price: product.priceRange.minVariantPrice.amount,
      currency: product.priceRange.minVariantPrice.currencyCode,
      variants: product.variants.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.title,
        availableForSale: edge.node.availableForSale,
        price: edge.node.price.amount,        // ✅ FIX: was edge.node.price (object)
        currency: edge.node.price.currencyCode, // ✅ FIX: use variant's own currency
        compareAtPrice: edge.node.compareAtPrice?.amount || null, // sale price
        selectedOptions: edge.node.selectedOptions,
        image: edge.node.image?.url || null,
      })),
    },
  };
}

export function meta({ data }) {
  return [
    { title: data?.product?.title || "Product" },
    { name: "description", content: data?.product?.description || "" },
  ];
}

export default function ProductPage() {
  const { product } = useLoaderData();
  const { addToCart } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0] || null,
  );

  const [selectedImage, setSelectedImage] = useState(
    product.variants[0]?.image ||
      product.images[0]?.url ||
      product.featuredImage,
  );

  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);

    if (variant.image) {
      setSelectedImage(variant.image);
    }
  };

  const handleAddToCart = async () => {
    console.log("=== ADD TO CART ===");
    console.log("Variant ID:", selectedVariant?.id);
    console.log("Variant Title:", selectedVariant?.title);
    console.log("Quantity:", quantity);
    console.log("Price:", selectedVariant?.price);
    console.log("===================");
    await addToCart(selectedVariant?.id, quantity); 
  };

  const displayPrice = Number(selectedVariant?.price ?? product.price).toFixed(
    2,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-3">
          <div className="rounded-xl overflow-hidden bg-gray-100 aspect-square">
            <img
              src={selectedImage}
              alt={product.title}
              className="h-full w-full object-cover transition-all duration-300"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image.url)}
                  className={`h-20 w-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === image.url
                      ? "border-black"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.altText}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {product.vendor && (
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              {product.vendor}
            </p>
          )}

          <h1 className="text-2xl font-semibold">{product.title}</h1>

          <p className="text-xl font-medium text-gray-800">
            {selectedVariant?.currency} {displayPrice}
          </p>

          {product.variants.length > 1 && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">
                {product.variants[0]?.selectedOptions[0]?.name}:
                <span className="ml-1 font-normal">
                  {selectedVariant?.title}
                </span>
              </p>

              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantChange(variant)}
                    disabled={!variant.availableForSale}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      selectedVariant?.id === variant.id
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    } ${
                      !variant.availableForSale ? "opacity-40 line-through" : ""
                    }`}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= QUANTITY ================= */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Quantity:</p>

            <div className="flex items-center gap-3 border rounded-lg px-3 py-2 w-fit">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                −
              </button>

              <span className="w-6 text-center">{quantity}</span>

              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          {/* ================= ADD TO CART ================= */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale}
            className={`w-full py-3 rounded-xl font-semibold ${
              selectedVariant?.availableForSale
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {selectedVariant?.availableForSale ? "Add to Cart" : "Sold Out"}
          </button>
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {product.description && (
            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">Description</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
