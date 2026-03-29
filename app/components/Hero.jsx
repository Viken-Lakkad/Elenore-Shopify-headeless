import { Link } from "react-router";
import { renderRichText } from "../utils/richText";

export const Hero = ({ heroBanner }) => {
  if (!heroBanner) return null;

  const leftImage = heroBanner.leftImage?.reference?.image?.url;
  const centerImage = heroBanner.centerImage?.reference?.image?.url;
  const rightImage = heroBanner.rightImage?.reference?.image?.url;

  const heading = heroBanner.heading?.value
    ? JSON.parse(heroBanner.heading.value)
    : null;

  const discount = heroBanner.discount?.value;
  const buttonLabel = heroBanner.buttonLabel?.value;
  const buttonLink = heroBanner.buttonLink?.value || "/";

  return (
    <section>
      <div className="flex">
        <div className="hidden xs:block w-4/12">
          {leftImage && (
            <img src={leftImage} className="w-full" alt="Hero Left" />
          )}
        </div>
        <div className="w-full xs:w-4/12 relative">
          {centerImage && (
            <img src={centerImage} className="w-full" alt="Hero Center" />
          )}

          <div className="absolute top-0 w-full h-full bg-black/30 flex items-center justify-center flex-col">
            <h2 className="text-center text-white text-6xl xs:text-4xl md:text-5xl lg:text-6xl">
              {heading && renderRichText(heading)}
            </h2>

            <p className="text-center font-ralesha mt-3.5 text-white text-6xl xs:text-4xl md:text-5xl lg:text-6xl">
              {discount}
            </p>

            <Link
              to={buttonLink}
              className="border mt-3.5 text-white border-white py-2 px-5 text-center"
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
        <div className="hidden xs:block w-4/12">
          {rightImage && (
            <img src={rightImage} className="w-full" alt="Hero Right" />
          )}
        </div>
      </div>
    </section>
  );
};
