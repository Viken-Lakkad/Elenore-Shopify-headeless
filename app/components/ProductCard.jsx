import { useState, useCallback } from "react";
import { Link } from "react-router";
import useWishlistStore from "../components/Usewishliststore";
import QuickViewModal from "./QuickViewModal";

const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-full w-full transition-colors duration-200"
    fill={filled ? "#ef4444" : "none"}
    stroke={filled ? "#ef4444" : "currentColor"}
    strokeWidth={2}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ProductCard = ({
  product,
  onAddToCart,
  renderTopRight,
  priority = false,
}) => {
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.handle);
  const [showQuickView, setShowQuickView] = useState(false);

  const price = parseFloat(product.price);
  const compareAt = parseFloat(product.compareAt);
  const hasDiscount = compareAt > price;

  const handleWishlist = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist(product);
    },
    [product, toggleWishlist],
  );

  const handleQuickView = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  }, []);

  const handleAddToCart = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onAddToCart?.(product);
    },
    [product, onAddToCart],
  );

  return (
    <>
      <article className="group flex flex-col gap-2 relative">
        <div className="overflow-hidden relative rounded-lg">
          {product.image ? (
            <img
              src={product.image}
              alt={product.altText || product.title || "Product image"}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={400}
              height={500}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding={priority ? "sync" : "async"}
            />
          ) : (
            <div
              className="h-full w-full flex items-center justify-center text-gray-300"
              aria-hidden="true"
            >
              No Image
            </div>
          )}

          {renderTopRight ? (
            renderTopRight(product)
          ) : (
            <button
              onClick={handleWishlist}
              aria-label={`${wishlisted ? "Remove" : "Add"} ${product.title} ${wishlisted ? "from" : "to"} wishlist`}
              aria-pressed={wishlisted}
              className="z-10 absolute top-2 right-3 h-5 w-5"
            >
              <HeartIcon filled={wishlisted} />
            </button>
          )}

          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-[#6b2737] text-white text-[10px] px-2.5 py-0.5 rounded-full font-semibold">
              {product.discountPercent}% OFF
            </span>
          )}

          <div className="absolute bottom-0 left-0 right-0 flex translate-y-full group-hover:translate-y-0 focus-within:translate-y-0 transition-transform duration-200 z-10">
            <button
              onClick={handleQuickView}
              className="flex-1 bg-black/90 text-white py-2.5"
              aria-label={`Quick view ${product.title}`}
            >
              Quick View
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#6b2737] text-white py-2.5"
              aria-label={`Add ${product.title} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-1">
          <Link
            to={`/products/${product.handle}`}
            className="text-sm font-semibold after:content-[''] after:absolute after:inset-0 after:z-[1]"
          >
            <h3 className="text-sm font-semibold m-0">{product.title}</h3>
          </Link>
          {/* pointer-events-none: sits above stretched link without blocking it */}
          <div className="flex gap-2 relative z-[2] pointer-events-none">
            <p>₹{price.toFixed(2)}</p>
            {hasDiscount && (
              <p
                className="line-through text-gray-400"
                aria-label={`Original price ₹${compareAt.toFixed(2)}`}
              >
                <span aria-hidden="true">₹{compareAt.toFixed(2)}</span>
              </p>
            )}
          </div>
        </div>
      </article>

      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
};

export default ProductCard;
