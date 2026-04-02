import { StarIcon } from "../Icons/StarIcon";

export const WhyElinorJewels = ({ whyElinorJewels }) => {
  const subTitle = whyElinorJewels?.subtitle?.value;
  const Title = whyElinorJewels?.title?.value;
  const cards = whyElinorJewels?.cards?.references?.nodes ?? [];
  console.log("cards->", cards);

  return (
    <>
      <section className="bg-[#FFF7EF]">
        <div className="py-8 md:py-16">
          <p className="flex items-center justify-center text-lg gap-4">
            <span>
              <StarIcon />
            </span>
            <span>{subTitle}</span>
          </p>
          <h2 className="text-center font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0 mt-4">
            {Title}
          </h2>
          <div className="mt-9 grid grid-cols-2 gap-6 md:grid-cols-4 m-auto w-full md:w-7/12">
            {cards.map((card, i) => {
              const title = card.cardTitle?.value;
              const image = card.cardImage?.reference?.image;

              return (
                <div key={card.id || i}>
                  <div className="icon h-16 w-36 m-auto">
                    <img
                      src={image?.url || ""}
                      className="m-auto"
                      alt={image?.altText || title || "card-image"}
                      loading="lazy"
                    />
                  </div>
                  <p className="text-center mt-2">{title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
