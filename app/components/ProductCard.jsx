import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.handle}`}
      className="group flex flex-col gap-2"
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
        <p className="text-sm text-[#747474]">
          ₹{parseFloat(product.price).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
