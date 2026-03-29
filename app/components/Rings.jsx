import { Link } from "react-router";
import { StarIcon } from "../Icons/StarIcon";

export const Rings = ({ rings }) => {
  
  const title = rings?.title?.value;

  const products = [
    rings?.product1?.reference,
    rings?.product2?.reference,
    rings?.product3?.reference,
    rings?.product4?.reference,
  ].filter(Boolean);
  return (
    <>
      <section className="py-8">
        <h2 className="text-center font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0">
          {title}
        </h2>

        <div className="pt-6 px-1.5 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 container m-auto">
          {products.map((product) => (
            <div key={product.id} className="product_warpper">
              <Link
                to={`/products/${product.handle}`}
                className="product_images"
              >
                <img
                  src={product.featuredImage?.url}
                  alt={product.title}
                  className="w-full"
                />
              </Link>

              <div className="product_descriptions mt-2">
                <span className="product_name block text-black font-semibold text-base md:text-lg">
                  {product.title}
                </span>

                <div className="flex items-center gap-1">
                  <StarIcon />
                  <p className="text-[#545765]">(11K)</p>
                </div>

                <p className="text-[#545765]">
                  ₹{product.priceRange.minVariantPrice.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
