import { Link } from "react-router";

export const GiftingGuide = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-8">
      <h2 className="text-center font-streamline text-2xl sm:text-5xl">
        {data.title?.value}
      </h2>

      <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 lg:container m-auto px-1.5">
        {data.card?.references?.nodes?.map((card, i) => {
          const image = card.image?.reference?.image;
          const collection = card.collection?.reference;

          return (
            <Link
              key={i}
              className="mx-auto"
              to={`/collections/${collection?.handle}`}
            >
              <img src={image?.url} alt={image?.altText || ""} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
