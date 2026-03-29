export const OffersBanners = ({ offerBanner }) => {
  if (!offerBanner?.length) return null;

  const banner = offerBanner[0];

  return (
    <section className="pt-4">
      <div className="bg-primary">
        <div className="bg-[url('/Offers.png')] w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white text-center flex items-center justify-center gap-2 sm:gap-5">

            <span className="font-ralesha">
              {banner.title?.value}
            </span>

            <span className="block h-20 bg-shine-gradient w-0.5"></span>

            <span className="font-inter xs:flex xs:gap-4">

              <span className="flex gap-4">
                {banner.discount?.value}
                <span className="hidden xs:flex">|</span>
              </span>

              <a href={banner.buttonLink?.value}>
                {banner.buttonLabel?.value}
              </a>

            </span>

          </h2>
        </div>
      </div>
    </section>
  );
};