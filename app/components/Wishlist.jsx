import { Link } from "react-router";
import { StarIcon } from "../Icons/StarIcon";
import { Close } from "../Icons/Close";

export default function Wishlist() {
  const products = [
    {
      id: 1,
      image: "./Earrings1.png",
      name: "Double Hoop Earrings",
      subtitle: "18K Gold Plated",
      rating: "11K",
      price: "Rs. 1099.00",
    },
    {
      id: 2,
      image: "./Earrings2.png",
      name: "Double Hoop Earrings",
      subtitle: "18K Gold Plated",
      rating: "11K",
      price: "Rs. 1099.00",
    },
    {
      id: 3,
      image: "./Earrings3.png",
      name: "Double Hoop Earrings",
      subtitle: "18K Gold Plated",
      rating: "11K",
      price: "Rs. 1099.00",
    },
    {
      id: 4,
      image: "./Earrings4.png",
      name: "Double Hoop Earrings",
      subtitle: "18K Gold Plated",
      rating: "11K",
      price: "Rs. 1099.00",
    },
  ];
  return (
    <>
      <h2 className="text-center font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0 py-6 border-b border-[#D6D6D6]">
        Your Wishlist
      </h2>

      <section>
        <div className=" container py-6 grid grid-cols-4 gap-4 m-auto">
          {products.map((p) => (
            <div key={p.id} className="product_warpper relative">
              <div className="absolute top-2 right-2 h-4 w-4 cursor-pointer">
                <Close />
              </div>
              <Link to="/" className="product_images">
                <img src={p.image} alt={p.name} className="w-full" />
              </Link>

              <div className="product_descriptions mt-2">
                <p>
                  <span className="product_name block text-black font-semibold">
                    {p.name}
                  </span>
                  <span className="product_name block text-[#747474]">
                    <i>{p.subtitle}</i>
                  </span>
                </p>

                <div className="flex items-center gap-1">
                  <StarIcon />
                  <p className="text-[#545765]">({p.rating})</p>
                </div>

                <p className="text-[#545765]">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}