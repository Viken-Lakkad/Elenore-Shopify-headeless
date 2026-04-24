const safeParse = (str, fallback) => {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

export const OurPromise = ({ ourPromise }) => {
  const title = ourPromise?.title?.value;
  const paragraphs = safeParse(ourPromise?.paragraphs?.value, []);
  const buttonLabel = ourPromise?.buttonLabel?.value;
  const buttonLinkRaw = safeParse(ourPromise?.buttonLink?.value, {});
  const buttonLink = buttonLinkRaw?.url;

  const mainImage = ourPromise?.mainImage?.reference?.image;
  const sideImage1 = ourPromise?.sideImage1?.reference?.image;
  const sideImage2 = ourPromise?.sideImage2?.reference?.image;
  const features = ourPromise?.promiseFeatures?.references?.nodes ?? [];

  const TextBlock = ({ headingClassName, textClassName }) => (
    <>
      <h2 className={headingClassName}>{title}</h2>

      {paragraphs.map((para, i) => (
        <p
          key={i}
          className={`text-sm sm:text-base leading-relaxed ${textClassName} ${
            i === 0 ? "mt-4" : "mt-3"
          }`}
        >
          {para}
        </p>
      ))}

      <div className="mt-4">
        <a
          href={buttonLink}
          aria-label={
            buttonLabel
              ? `${buttonLabel} — Our Promise`
              : "Learn more about our promise"
          }
          rel="noopener noreferrer"
          className="
            inline-block cursor-pointer uppercase px-4 py-2
            border border-black text-sm tracking-widest
            focus:outline-none
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-black
          "
        >
          {buttonLabel}
        </a>
      </div>
    </>
  );

  const SideImages = () => (
    <div className="flex gap-2">
      <img
        src={sideImage1?.url}
        alt={sideImage1?.altText || ""}
        // FIX P3
        width={sideImage1?.width ?? 400}
        height={sideImage1?.height ?? 300}
        loading="lazy"
        decoding="async"
        className="w-1/2 object-cover"
      />
      <img
        src={sideImage2?.url}
        alt={sideImage2?.altText || ""}
        // FIX P3
        width={sideImage2?.width ?? 400}
        height={sideImage2?.height ?? 300}
        loading="lazy"
        decoding="async"
        className="w-1/2 object-cover"
      />
    </div>
  );

  const FeatureList = ({ itemClassName }) => (
    <div>
      {features.map((feature, i) => (
        <div
          key={feature?.label?.value ?? i}
          className={`flex items-center justify-between ${itemClassName} ${
            i !== features.length - 1 ? "border-b border-black/10" : ""
          }`}
        >
          <p className="text-sm">{feature?.label?.value}</p>
          <img
            src={feature?.icon?.reference?.image?.url}
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            className="h-10 w-10 object-contain"
          />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="hidden md:block lg:container px-1.5 m-auto py-8">
        <div className="flex gap-2">
          <div className="w-8/12 flex">
            <div className="w-1/2 bg-[#FFEAE6] p-6 flex flex-col justify-center">
              <TextBlock
                headingClassName="font-streamline text-5xl"
                textClassName=""
              />
            </div>

            <div className="w-1/2">
              <img
                src={mainImage?.url}
                alt={mainImage?.altText || "Our Promise"}
                width={mainImage?.width ?? 800}
                height={mainImage?.height ?? 600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-4/12 flex flex-col justify-between">
            <SideImages />
            <FeatureList itemClassName="py-2.5" />
          </div>
        </div>
      </div>

      <div className="block md:hidden py-6 px-1.5">
        <div className="bg-[#FFEAE6] px-5 py-8 text-center">
          <TextBlock
            headingClassName="font-streamline text-4xl"
            textClassName="text-sm"
          />
        </div>

        <div className="mt-3">
          <img
            src={mainImage?.url}
            alt={mainImage?.altText || "Our Promise"}
            width={mainImage?.width ?? 800}
            height={mainImage?.height ?? 600}
            loading="lazy"
            decoding="async"
            className="w-full object-cover"
          />
        </div>

        <div className="mt-3">
          <SideImages />
        </div>

        <div className="mt-4">
          <FeatureList itemClassName="py-3" />
        </div>
      </div>
    </>
  );
};
