const safeParse = (str, fallback) => {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

export const OurStory = ({ ourStory }) => {
  if (!ourStory) return null;

  const title = ourStory.title?.value;
  const imageRef = ourStory.image?.reference?.image;
  const image = imageRef?.url;
  const imageAlt = imageRef?.altText || "Our Story";
  const imageWidth = imageRef?.width ?? 800;
  const imageHeight = imageRef?.height ?? 600;

  const paragraphs = safeParse(ourStory.paragraphs?.value, []);

  return (
    <div className="lg:container m-auto py-8 px-1.5">
      <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:gap-9">
        <div className="w-full md:w-6/12">
          <img
            src={image}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        <div className="w-full md:w-6/12">
          <h2 className="font-streamline text-3xl sm:text-4xl lg:text-5xl text-center md:text-left">
            {title}
          </h2>

          {paragraphs.map((para, i) => (
            <p
              key={i}
              className={`text-sm sm:text-base text-center md:text-left leading-relaxed ${
                i === 0 ? "mt-4" : "mt-2.5"
              }`}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
