import { Link } from "react-router";

export const ShopByDesign = ({ shopByDesign }) => {
  const sectionTitle = shopByDesign?.title?.value;
  const cards = shopByDesign?.card?.references?.nodes ?? [];

  return (
    <section className="py-8 lg:container m-auto px-1.5">
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 px-2 md:px-0">
        <div className="flex items-center justify-center">
          <h2 className="text-center font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0">
            {sectionTitle}
          </h2>
        </div>

        {cards.map((card, i) => {
          const title = card.title?.value;
          const subtitle = card.subtitle?.value;
          const image = card.image?.reference?.image;
          const collection = card.link?.reference;
          const url = collection?.handle
            ? `/collections/${collection.handle}`
            : "/";

          return (
            <div
              key={i}
              className="relative after:content-[''] after:absolute after:inset-0 after:bg-linear-to-t after:from-black/50 after:to-white/20"
            >
              <img
                src={image?.url}
                alt={image?.altText ?? title}
                className="w-full"
              />
              <Link className="absolute bottom-5 left-3.5 z-20" to={url}>
                <h3 className="font-streamline text-2xl sm:text-4xl text-white">
                  {title}
                </h3>
                <p className="font-bold text-white text-xs md:text-xl">
                  {subtitle}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};
