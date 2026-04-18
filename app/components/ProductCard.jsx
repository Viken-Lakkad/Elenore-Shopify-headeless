// import { Link } from "react-router";
// import { HeartIcon } from "../Icons/HeartIcon";

// const ProductCard = ({ product }) => {
//   return (
//     <Link
//       to={`/products/${product.handle}`}
//       className="group flex flex-col gap-2 relative"
//     >
//       <div className="overflow-hidden relative">
//         {product.image ? (
//           <img
//             src={product.image}
//             alt={product.altText}
//             className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         ) : (
//           <div className="h-full w-full flex items-center justify-center text-gray-300">
//             No Image
//           </div>
//         )}
//         <button className="z-10 absolute top-2 h-5 w-5 right-5">
//           <HeartIcon />
//         </button>
//       </div>
//       <div className="mt-1">
//         <p className="text-sm font-semibold text-black">{product.title}</p>
//         <div className="flex items-center gap-2">
//           <p className="text-sm text-[#747474]">
//             ₹{parseFloat(product.price).toFixed(2)}
//           </p>
//           {product.compareAt > product.price && (
//             <>
//               <p className="text-sm text-gray-400 line-through">
//                 ₹{parseFloat(product.compareAt).toFixed(2)}
//               </p>
//               <span className="absolute top-1.5 left-1.5 bg-primary text-xs text-accent px-3 py-1 rounded-full font-semibold">
//                 {product.discountPercent}% off
//               </span>
//             </>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

import { Link } from "react-router";
import useWishlistStore from "../components/Usewishliststore";

const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-full w-full transition-colors duration-200"
    fill={filled ? "#ef4444" : "none"}
    stroke={filled ? "#ef4444" : "currentColor"}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ProductCard = ({ product }) => {
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.handle);

  const handleWishlist = (e) => {
    e.preventDefault(); // prevent Link navigation
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link
      to={`/products/${product.handle}`}
      className="group flex flex-col gap-2 relative"
    >
      <div className="overflow-hidden relative">
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

        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="z-10 absolute top-2 right-5 h-5 w-5"
        >
          <HeartIcon filled={wishlisted} />
        </button>
      </div>

      <div className="mt-1">
        <p className="text-sm font-semibold text-black">{product.title}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-[#747474]">
            ₹{parseFloat(product.price).toFixed(2)}
          </p>
          {product.compareAt > product.price && (
            <>
              <p className="text-sm text-gray-400 line-through">
                ₹{parseFloat(product.compareAt).toFixed(2)}
              </p>
              <span className="absolute top-1.5 left-1.5 bg-primary text-xs text-accent px-3 py-1 rounded-full font-semibold">
                {product.discountPercent}% off
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;