export const OurStory = ({ ourStory }) => {
  if (!ourStory) return null;

  const title = ourStory.title?.value;
  const image = ourStory.image?.reference?.image?.url;
  const imageAlt = ourStory.image?.reference?.image?.altText || "Our Story";
  const paragraphs = JSON.parse(ourStory.paragraphs?.value || "[]");

  return (
    <>
      <div className="lg:container m-auto py-8 px-4">
        <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:gap-9">
          {/* Image */}
          <div className="w-full md:w-6/12">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-6/12">
            <h2 className="font-streamline text-3xl sm:text-4xl lg:text-5xl text-center md:text-left">
              {title}
            </h2>
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={`text-sm sm:text-base text-center md:text-left leading-relaxed text-gray-600 ${
                  i === 0 ? "mt-4" : "mt-2.5"
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
