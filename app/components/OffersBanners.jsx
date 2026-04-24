export const OffersBanners = ({ offerBanner }) => {
  if (!offerBanner?.length) return null;

  const banner = offerBanner[0];
  const title = banner.title?.value;
  const discount = banner.discount?.value;
  const buttonLabel = banner.buttonLabel?.value;
  const buttonLink = banner.buttonLink?.value;

  return (
    <section className="pt-4" aria-label="Current offers and promotions">
      <div className="bg-primary">
        <div className="bg-[url('/Offers.png')] w-full">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white flex items-center justify-center gap-2 sm:gap-5">
            <h2 className="font-ralesha">{title}</h2>

            <span
              className="block h-20 bg-shine-gradient w-0.5"
              aria-hidden="true"
            />
            <p className="font-inter xs:flex xs:gap-4">
              <span className="flex gap-4">
                {discount}
                <span className="hidden xs:flex" aria-hidden="true">
                  |
                </span>
              </span>

              <a
                href={buttonLink}
                aria-label={
                  buttonLabel && title
                    ? `${buttonLabel} — ${title}`
                    : (buttonLabel ?? "View offer")
                }
                rel="noopener noreferrer"
                className="focus:outline-none focus-visible:underline focus-visible:decoration-2 focus-visible:decoration-white focus-visible:underline-offset-4"
              >
                {buttonLabel}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};