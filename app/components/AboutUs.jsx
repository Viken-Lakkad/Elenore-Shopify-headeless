export const AboutUs = ({ aboutUsBenaer }) => {
  const title = aboutUsBenaer?.title?.value || "About Us";
  const bannerImage = aboutUsBenaer?.benaer?.reference?.image?.url || null;

  console.log("title ->", title);
  console.log("bannerImage ->", bannerImage);

  return (
    <div
      className="bg-center bg-cover bg-no-repeat lg:container m-auto"
      style={
        bannerImage ? { backgroundImage: `url(${bannerImage})` } : undefined
      }
    >
      <h2 className="bg-linear-to-r to-[#491425]/80 from-[#790E30]/30 text-white font-streamline text-3xl md:text-5xl py-8 text-center">
        {title}
      </h2>
    </div>
  );
};
