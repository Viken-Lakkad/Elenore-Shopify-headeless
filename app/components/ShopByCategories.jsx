import { Link } from "react-router";

export const ShopByCategories = ({ shopCategories }) => {
  if (!shopCategories?.length) return null;

  return (
    <section className="container m-auto py-7  md:py-14">
      <h2 className="text-center font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0">
        Shop by Categories
      </h2>

      <div className="pt-5 md:pt-10  grid grid-cols-2 md:grid-cols-4 gap-3 xl:gap-4">
        {shopCategories.map((cat) => {
          const title = cat.title?.value;
          const image = cat.image?.reference?.image?.url;
          const handle = cat.collection?.reference?.handle;

          return (
            <div
              key={cat.id}
              className="relative h-36 md:h-64 bg-cover bg-center after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 after:to-white/20"
              style={{ backgroundImage: `url(${image})` }}
            >
              <Link
                to={`/collections/${handle}`}
                className="absolute inset-0 flex items-end"
              >
                <h2 className="bottom-5 z-20 left-3 text-white font-streamline text-2xl md:text-3xl absolute">
                  {title}
                </h2>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};
