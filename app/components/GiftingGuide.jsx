import { Link } from "react-router";

export const GiftingGuide = () => {
  return (
    <>
      <section className="py-8">
        <h2 className="text-center font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0">
          Elinor Gifting Guide
        </h2>

        <div className="pt-6 px-1.5 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 container m-auto">
          <Link to="/">
            {" "}
            <img src="./GiftingGuide1.png" alt="GiftingGuide" />
          </Link>
          <Link to="/">
            {" "}
            <img src="./GiftingGuide2.png" alt="GiftingGuide" />
          </Link>
          <Link to="/">
            {" "}
            <img src="./GiftingGuide3.png" alt="GiftingGuide" />
          </Link>
          <Link to="/">
            {" "}
            <img src="./GiftingGuide4.png" alt="GiftingGuide" />
          </Link>
        </div>
      </section>
    </>
  );
};
