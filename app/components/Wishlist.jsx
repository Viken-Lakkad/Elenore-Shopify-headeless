import { Link } from "react-router";
import { StarIcon } from "../Icons/StarIcon";
import { Close } from "../Icons/Close";
import useWishlistStore from "../components/Usewishliststore";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlistStore();

  return (
    <>
      <h2 className="text-center font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0 py-6 border-b border-[#D6D6D6]">
        Your Wishlist
      </h2>

      <section>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <p className="text-xl text-[#747474]">Your wishlist is empty.</p>
            <Link
              to="/"
              className="text-sm underline underline-offset-4 text-black hover:text-[#747474] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="container py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 m-auto">
            {items.map((p) => (
              <div key={p.handle} className="product_wrapper relative">
                {/* Remove from wishlist */}
                <button
                  onClick={() => removeFromWishlist(p.handle)}
                  aria-label="Remove from wishlist"
                  className="absolute top-2 right-2 h-4 w-4 cursor-pointer z-10"
                >
                  <Close />
                </button>

                <Link
                  to={`/products/${p.handle}`}
                  className="product_images block overflow-hidden"
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.altText || p.title}
                      className="w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full aspect-square flex items-center justify-center bg-gray-100 text-gray-300 text-sm">
                      No Image
                    </div>
                  )}
                </Link>

                <div className="product_descriptions mt-2">
                  <p>
                    <span className="product_name block text-black font-semibold text-base md:text-lg">
                      {p.title}
                    </span>
                    {p.subtitle && (
                      <span className="product_subtitle block text-[#747474]">
                        <i>{p.subtitle}</i>
                      </span>
                    )}
                  </p>

                  {p.rating && (
                    <div className="flex items-center gap-1">
                      <StarIcon />
                      <p className="text-primary">({p.rating})</p>
                    </div>
                  )}

                  <p className="text-[#545765]">
                    ₹{parseFloat(p.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
