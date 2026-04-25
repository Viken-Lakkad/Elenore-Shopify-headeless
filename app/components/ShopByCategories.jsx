import { Link } from "react-router";

export const ShopByCategories = ({ shopCategories }) => {
  if (!shopCategories?.length) return null;

  return (
    <section
      className="lg:container px-1.5 m-auto py-7 md:py-14"
      aria-label="Shop by Categories"
    >
      <h2 className="text-center font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0">
        Shop by Categories
      </h2>

      <div className="pt-5 md:pt-10 grid grid-cols-2 md:grid-cols-4 gap-3 xl:gap-4">
        {shopCategories.map((cat, index) => {
          const title = cat.title?.value;
          const image = cat.image?.reference?.image?.url;
          const handle = cat.collection?.reference?.handle;

          if (!handle) return null;

          const isPriority = index < 2;

          return (
            <div key={cat.id} className="relative h-36 md:h-64 overflow-hidden">
              {image && (
                <img
                  src={image}
                  alt={title ?? "Category image"}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  width={600}
                  height={400}
                  loading={isPriority ? "eager" : "lazy"}
                  decoding={isPriority ? "sync" : "async"}
                />
              )}

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-white/20 pointer-events-none"
                aria-hidden="true"
              />

              <Link
                to={`/collections/${handle}`}
                className="absolute inset-0 z-10 flex items-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-[-2px]"
                aria-label={`Shop ${title}`}
              >
                {/* ✅ h3 — correct hierarchy under the section's h2 */}
                <h3 className="absolute bottom-5 left-3 z-20 text-white font-streamline text-2xl md:text-3xl">
                  {title}
                </h3>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};
