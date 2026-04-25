import { useState, useRef, useCallback } from "react";
import { useLoaderData } from "react-router";
import { shopifyGraphQL } from "../utils/shopify-admin";
import { productByHandleQuery } from "../graphql/queries/Queries";
import { useCart } from "../context/CartContext";

// ─── Loader (your original, unchanged) ───────────────────────────────────────
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
      price: product.priceRange.minVariantPrice.amount,
      currency: product.priceRange.minVariantPrice.currencyCode,
      variants: product.variants.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.title,
        availableForSale: edge.node.availableForSale,
        price: edge.node.price.amount,
        currency: edge.node.price.currencyCode,
        compareAtPrice: edge.node.compareAtPrice?.amount || null,
        selectedOptions: edge.node.selectedOptions,
        image: edge.node.image?.url || null,
      })),
    },
  };
}

// ─── Meta ─────────────────────────────────────────────────────────────────────
export function meta({ data }) {
  return [
    { title: data?.product?.title || "Product" },
    { name: "description", content: data?.product?.description || "" },
  ];
}

function ProductImageGallery({
  images,
  featuredImage,
  activeImage,
  onImageChange,
}) {
  const startXRef = useRef(null);

  const allImages =
    images.length > 0
      ? images
      : featuredImage
        ? [{ url: featuredImage, altText: "" }]
        : [];

  const activeIndex = allImages.findIndex((img) => img.url === activeImage);
  const currentIndex = activeIndex === -1 ? 0 : activeIndex;

  const goTo = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(index, allImages.length - 1));
      onImageChange(allImages[clamped].url);
    },
    [allImages, onImageChange],
  );

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (startXRef.current === null) return;
    const delta = startXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) goTo(currentIndex + (delta > 0 ? 1 : -1));
    startXRef.current = null;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") goTo(currentIndex + 1);
    if (e.key === "ArrowLeft") goTo(currentIndex - 1);
  };

  if (allImages.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div
        role="region"
        aria-label="Product images"
        className="relative rounded-xl overflow-hidden bg-gray-100 aspect-square select-none outline-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          aria-live="polite"
        >
          {allImages.map((image, i) => (
            <div key={i} className="min-w-full h-full shrink-0">
              <img
                src={image.url}
                alt={image.altText || `Product image ${i + 1}`}
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                fetchpriority={i === 0 ? "high" : "auto"}
                decoding="async"
                width={800}
                height={800}
              />
            </div>
          ))}
        </div>

        {allImages.length > 1 && (
          <>
            <button
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white disabled:opacity-30 transition"
            >
              ‹
            </button>
            <button
              onClick={() => goTo(currentIndex + 1)}
              disabled={currentIndex === allImages.length - 1}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white disabled:opacity-30 transition"
            >
              ›
            </button>
          </>
        )}

        {allImages.length > 1 && (
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5"
            role="tablist"
            aria-label="Image dots"
          >
            {allImages.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Image ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-5 bg-black" : "w-1.5 bg-black/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory"
          role="tablist"
          aria-label="Product image thumbnails"
        >
          {allImages.map((image, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`View image ${i + 1}`}
              onClick={() => goTo(i)}
              className={`shrink-0 snap-start h-20 w-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === currentIndex
                  ? "border-black scale-105 shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-300"
              }`}
            >
              <img
                src={image.url}
                alt={image.altText || `Thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={80}
                height={80}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
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
    if (variant.image) setSelectedImage(variant.image);
  };

  const handleAddToCart = async () => {
    await addToCart(selectedVariant?.id, quantity);
  };

  const displayPrice = Number(selectedVariant?.price ?? product.price).toFixed(
    2,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductImageGallery
          images={product.images}
          featuredImage={product.featuredImage}
          activeImage={selectedImage}
          onImageChange={setSelectedImage}
        />

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
                    } ${!variant.availableForSale ? "opacity-40 line-through" : ""}`}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>
          )}

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
