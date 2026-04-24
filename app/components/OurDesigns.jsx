import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const PauseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
  >
    <rect x="3" y="2" width="4" height="12" rx="1" />
    <rect x="9" y="2" width="4" height="12" rx="1" />
  </svg>
);

const PlayIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
  >
    <path d="M4 2l10 6-10 6V2z" />
  </svg>
);

export const OurDesigns = ({ ourDesigns }) => {
  const title = ourDesigns?.title?.value;
  const imageNodes = ourDesigns?.images?.references?.nodes ?? [];

  const swiperRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const togglePause = () => {
    if (!swiperRef.current) return;
    if (paused) {
      swiperRef.current.autoplay.start();
    } else {
      swiperRef.current.autoplay.stop();
    }
    setPaused((prev) => !prev);
  };

  return (
    <div className="lg:container px-1.5 m-auto py-8">
      {/* h2 is correct — page h1 lives in <AboutUs> */}
      <h2 className="text-center font-streamline text-5xl">{title}</h2>

      <div className="hidden md:flex justify-center items-start gap-4 pt-8">
        {imageNodes.map((node, index) => (
          <img
            key={node.image.url ?? index}
            src={node.image.url}
            alt={node.image.altText || `Design ${index + 1}`}
            width={node.image.width ?? 300}
            height={node.image.height ?? 400}
            loading="lazy"
            decoding="async"
            className="w-1/5 even:mt-10"
          />
        ))}
      </div>

      <div className="relative block md:hidden pt-5 sm:pt-10">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={2.5}
          spaceBetween={8}
          centeredSlides
          loop
          speed={2500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="OurDesigns"
          // FIX A11y: labels the carousel region for screen readers
          aria-label="Our Designs slideshow"
        >
          {imageNodes.map((node, index) => (
            <SwiperSlide key={node.image.url ?? index}>
              <img
                src={node.image.url}
                alt={node.image.altText || `Design ${index + 1}`}
                // FIX P3
                width={node.image.width ?? 300}
                height={node.image.height ?? 400}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          onClick={togglePause}
          aria-label={
            paused ? "Play designs slideshow" : "Pause designs slideshow"
          }
          className="
            absolute bottom-2 right-2 z-10
            bg-white/80 rounded-full p-1.5
            focus:outline-none
            focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1
          "
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
      </div>
    </div>
  );
};
