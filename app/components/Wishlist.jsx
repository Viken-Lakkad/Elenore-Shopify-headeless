import { Link } from "react-router";
import useWishlistStore from "../components/Usewishliststore";
import ProductCard from "../components/ProductCard";
import { Close } from "../Icons/Close";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlistStore();

  return (
    <>
      <h2 className="text-center font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0 py-6 border-b border-[#D6D6D6]">
        Your Wishlist
      </h2>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">Your wishlist is empty.</p>
          <Link to="/" className="underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="container py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 m-auto">
          {items.map((p) => (
            <ProductCard
              key={p.handle}
              product={p}
              onAddToCart={(product) => {
                console.log("Add to cart", product);
              }}
              renderTopRight={(product) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromWishlist(product.handle);
                  }}
                  className="absolute top-2 right-2 h-4 w-4 z-10"
                >
                  <Close />
                </button>
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}
