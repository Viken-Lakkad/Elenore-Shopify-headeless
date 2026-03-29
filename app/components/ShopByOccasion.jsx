import { Link } from "react-router";

export const ShopByOccasion = ({ shopByOccasion }) => {
  console.log("shopByOccasion", shopByOccasion);
  const title = shopByOccasion.title.value;
  const buttonLable = shopByOccasion.button.value;
  const buttonURL = shopByOccasion.url.reference.handle;
  const cards = shopByOccasion.card.references.nodes;

  return (
    <>
      <section className="py-8">
        <div className="px-1.5 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 container m-auto">
          <div className="flex flex-col justify-center">
            <h2 className="font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0">
              {title}
            </h2>
            <Link
              to={`/collections/${buttonURL}`}
              className="font-bold text-base md:text-xl"
            >
              {buttonLable}
            </Link>
          </div>

          {cards.map((card, index) => {
            const cardTitle = card.title.value;
            const image = card.image.reference.image.url;
            const alt = card.image.reference.image.altText || cardTitle;
            const handle = card.link.reference.handle;

            return (
              <Link key={index} to={`/collections/${handle}`}>
                <div className="relative after:content-[''] after:absolute after:inset-0 after:bg-linear-to-t after:from-black/90 after:to-transparent">
                  <img src={image} alt={alt} className="w-full" />

                  <h2 className="text-lg md:text-2xl z-10 absolute bottom-4 m-auto w-full font-streamline font-bold text-white text-center">
                    {cardTitle}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};
