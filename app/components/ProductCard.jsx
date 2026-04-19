import { useState } from "react";
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
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ProductCard = ({
  product,
  onAddToCart,
  renderTopRight, // 🔥 injected UI (wishlist/remove/etc)
}) => {
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.handle);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <>
      <Link
        to={`/products/${product.handle}`}
        className="group flex flex-col gap-2 relative"
      >
        <div className="overflow-hidden relative rounded-lg">
          {/* Image */}
          {product.image ? (
            <img
              src={product.image}
              alt={product.altText}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-300">
              No Image
            </div>
          )}

          {renderTopRight ? (
            renderTopRight(product)
          ) : (
            <button
              onClick={handleWishlist}
              className="z-10 absolute top-2 right-3 h-5 w-5"
            >
              <HeartIcon filled={wishlisted} />
            </button>
          )}

          {/* Discount */}
          {parseFloat(product.compareAt) > parseFloat(product.price) && (
            <span className="absolute top-2 left-2 bg-[#6b2737] text-white text-[10px] px-2.5 py-0.5 rounded-full font-semibold">
              {product.discountPercent}% OFF
            </span>
          )}

          {/* Actions */}
          <div className="absolute bottom-0 left-0 right-0 flex translate-y-full group-hover:translate-y-0 transition-transform duration-200">
            <button
              onClick={handleQuickView}
              className="flex-1 bg-black/90 text-white py-2.5"
            >
              Quick View
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#6b2737] text-white py-2.5"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Text */}
        <div className="mt-1">
          <p className="text-sm font-semibold">{product.title}</p>

          <div className="flex gap-2">
            <p>₹{parseFloat(product.price).toFixed(2)}</p>

            {parseFloat(product.compareAt) > parseFloat(product.price) && (
              <p className="line-through text-gray-400">
                ₹{parseFloat(product.compareAt).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </Link>

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