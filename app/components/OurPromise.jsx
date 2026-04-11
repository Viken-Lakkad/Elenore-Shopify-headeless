export const OurPromise = ({ ourPromise }) => {
  const title = ourPromise?.title?.value;
  const paragraphs = JSON.parse(ourPromise?.paragraphs?.value ?? "[]");
  const buttonLabel = ourPromise?.buttonLabel?.value;
  const buttonLinkRaw = JSON.parse(ourPromise?.buttonLink?.value ?? "{}");
  const buttonLink = buttonLinkRaw?.url;
  const mainImage = ourPromise?.mainImage?.reference?.image;
  const sideImage1 = ourPromise?.sideImage1?.reference?.image;
  const sideImage2 = ourPromise?.sideImage2?.reference?.image;
  const features = ourPromise?.promiseFeatures?.references?.nodes ?? []; // ✅ fixed

  return (
    <>
      <div className="hidden md:block lg:container px-1.5 m-auto py-8">
        <div className="flex gap-2">
          <div className="w-8/12 flex">
            <div className="w-1/2 bg-[#FFEAE6] p-6 flex flex-col justify-center">
              <h2 className="font-streamline text-5xl">{title}</h2>

              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={`text-sm sm:text-base leading-relaxed ${
                    i === 0 ? "mt-4" : "mt-3"
                  }`}
                >
                  {para}
                </p>
              ))}

              <div className="mt-4">
                <a
                  href={buttonLink}
                  className="inline-block cursor-pointer uppercase px-4 py-2 border border-black text-sm tracking-widest"
                >
                  {buttonLabel}
                </a>
              </div>
            </div>

            <div className="w-1/2">
              <img
                src={mainImage?.url}
                alt={mainImage?.altText ?? "Our Promise"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-4/12 flex flex-col justify-between">
            <div className="flex gap-2">
              <img
                src={sideImage1?.url}
                alt={sideImage1?.altText ?? ""}
                className="w-1/2 object-cover"
              />
              <img
                src={sideImage2?.url}
                alt={sideImage2?.altText ?? ""}
                className="w-1/2 object-cover"
              />
            </div>

            <div>
              {features.map((feature, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-2.5 ${
                    i !== features.length - 1 ? "border-b border-black/10" : ""
                  }`}
                >
                  <p className="text-sm">{feature?.label?.value}</p>
                  <img
                    src={feature?.icon?.reference?.image?.url}
                    alt={feature?.label?.value}
                    className="h-10 w-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ───── MOBILE ───── */}
      <div className="block md:hidden py-6 px-1.5">
        <div className="bg-[#FFEAE6] px-5 py-8 text-center">
          <h2 className="font-streamline text-4xl">{title}</h2>

          {paragraphs.map((para, i) => (
            <p
              key={i}
              className={`text-sm leading-relaxed ${i === 0 ? "mt-4" : "mt-3"}`}
            >
              {para}
            </p>
          ))}

          <a
            href={buttonLink}
            className="mt-5 inline-block cursor-pointer uppercase px-4 py-2 border border-black text-sm tracking-widest"
          >
            {buttonLabel}
          </a>
        </div>

        <div className="mt-3">
          <img
            src={mainImage?.url}
            alt={mainImage?.altText ?? "Our Promise"}
            className="w-full object-cover"
          />
        </div>

        <div className="flex gap-2 mt-3">
          <img
            src={sideImage1?.url}
            alt={sideImage1?.altText ?? ""}
            className="w-1/2 object-cover"
          />
          <img
            src={sideImage2?.url}
            alt={sideImage2?.altText ?? ""}
            className="w-1/2 object-cover"
          />
        </div>

        <div className="mt-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-3 ${
                i !== features.length - 1 ? "border-b border-black/10" : ""
              }`}
            >
              <p className="text-sm">{feature?.label?.value}</p>
              <img
                src={feature?.icon?.reference?.image?.url}
                alt={feature?.label?.value}
                className="h-9 w-9 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
