export const AboutUs = ({ aboutUsBenaer }) => {
  const title = aboutUsBenaer?.title?.value || "About Us";
  const bannerImage = aboutUsBenaer?.benaer?.reference?.image;

  return (
    <div className="relative lg:container m-auto overflow-hidden">
      {bannerImage?.url && (
        <img
          src={bannerImage.url}
          alt=""
          role="presentation"
          fetchpriority="high"
          decoding="sync"
          width={bannerImage.width ?? 1400}
          height={bannerImage.height ?? 400}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      <h1 className="relative z-10 bg-linear-to-r to-[#491425]/80 from-[#790E30]/30 text-white font-streamline text-3xl md:text-5xl py-8 text-center">
        {title}
      </h1>
    </div>
  );
};
