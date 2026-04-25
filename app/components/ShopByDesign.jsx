import { Link } from "react-router";

export const ShopByDesign = ({ shopByDesign }) => {
  const sectionTitle = shopByDesign?.title?.value;
  const cards = shopByDesign?.card?.references?.nodes ?? [];

  if (!sectionTitle && !cards.length) return null;

  return (
    <section
      className="py-8 lg:container m-auto px-1.5"
      aria-label={sectionTitle ?? "Shop by Design"}
    >
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 px-2 md:px-0">
        <div className="flex items-center justify-center">
          <h2 className="text-center font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0">
            {sectionTitle}
          </h2>
        </div>

        {cards.map((card, index) => {
          const title = card.title?.value;
          const subtitle = card.subtitle?.value;
          const image = card.image?.reference?.image;
          const collection = card.link?.reference;
          const handle = collection?.handle;

          if (!handle) return null;

          if (!image?.url) return null;

          const url = `/collections/${handle}`;
          const stableKey = card.id ?? url ?? index;
          const isPriority = index < 2;

          return (
            <div
              key={stableKey}
              className="relative overflow-hidden
                         after:content-[''] after:absolute after:inset-0
                         after:bg-linear-to-t after:from-black/50 after:to-white/20
                         after:z-[1] after:pointer-events-none"
            >
              <img
                src={image.url}
                alt={image.altText ?? title ?? ""}
                className="w-full h-full object-cover"
                width={600}
                height={800}
                loading={isPriority ? "eager" : "lazy"}
                decoding={isPriority ? "sync" : "async"}
              />

              <Link
                to={url}
                className="absolute inset-0 z-10 flex items-end pb-5 pl-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-[-3px]"
                aria-label={
                  subtitle ? `Shop ${title} – ${subtitle}` : `Shop ${title}`
                }
              >
                <div className="pointer-events-none">
                  <h3 className="font-streamline text-2xl sm:text-4xl text-white">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="font-bold text-white text-xs md:text-xl">
                      {subtitle}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};
