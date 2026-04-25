import { Link } from "react-router";
import { renderRichText } from "../utils/richText";
const safeParse = (str, fallback) => {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};
const HERO_HEADING_ID = "hero-heading";

export const Hero = ({ heroBanner }) => {
  if (!heroBanner) return null;

  const leftImageRef = heroBanner.leftImage?.reference?.image;
  const centerImageRef = heroBanner.centerImage?.reference?.image;
  const rightImageRef = heroBanner.rightImage?.reference?.image;
  const heading = safeParse(heroBanner.heading?.value, null);
  const discount = heroBanner.discount?.value;
  const buttonLabel = heroBanner.buttonLabel?.value;
  const buttonLink = heroBanner.buttonLink?.value || "/";
  const headingText = heroBanner.heading?.value
    ? (() => {
        try {
          const parsed = safeParse(heroBanner.heading.value, null);
          return (
            parsed?.children
              ?.flatMap((node) => node.children?.map((c) => c.value) ?? [])
              .join(" ") ?? ""
          );
        } catch {
          return "";
        }
      })()
    : "";

  return (
    <section aria-labelledby={HERO_HEADING_ID}>
      <div className="flex">
        <div className="hidden xs:block w-4/12">
          {leftImageRef?.url && (
            <img
              src={leftImageRef.url}
              alt={leftImageRef.altText || ""}
              width={leftImageRef.width ?? 600}
              height={leftImageRef.height ?? 800}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="w-full"
            />
          )}
        </div>

        <div className="w-full xs:w-4/12 relative">
          {centerImageRef?.url && (
            <img
              src={centerImageRef.url}
              alt={centerImageRef.altText || "Hero banner"}
              width={centerImageRef.width ?? 600}
              height={centerImageRef.height ?? 800}
              loading="eager"
              fetchpriority="high"
              decoding="sync"
              className="w-full"
            />
          )}

          <div className="absolute top-0 w-full h-full bg-black/30 flex items-center justify-center flex-col">
            <h1
              id={HERO_HEADING_ID}
              className="text-center text-white text-6xl xs:text-4xl md:text-5xl lg:text-6xl"
            >
              {heading && renderRichText(heading)}
            </h1>

            <p className="text-center font-ralesha mt-3.5 text-white text-6xl xs:text-4xl md:text-5xl lg:text-6xl">
              {discount}
            </p>

            <Link
              to={buttonLink}
              aria-label={
                buttonLabel && headingText
                  ? `${buttonLabel} — ${headingText}`
                  : (buttonLabel ?? "View collection")
              }
              rel="noopener noreferrer"
              className="
                border mt-3.5 text-white border-white py-2 px-5 text-center
                focus:outline-none
                focus-visible:ring-2 focus-visible:ring-white
                focus-visible:ring-offset-2 focus-visible:ring-offset-black/30
              "
            >
              {buttonLabel}
            </Link>
          </div>
        </div>

        <div className="hidden xs:block w-4/12">
          {rightImageRef?.url && (
            <img
              src={rightImageRef.url}
              alt={rightImageRef.altText || ""}
              width={rightImageRef.width ?? 600}
              height={rightImageRef.height ?? 800}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="w-full"
            />
          )}
        </div>
      </div>
    </section>
  );
};
