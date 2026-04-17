import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.handle}`}
      className="group flex flex-col gap-2 relative"
    >
      <div className="overflow-hidden rounded-xl bg-gray-100 aspect-square">
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
