import { useRef, useState } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css"; // FIX P2: required — prevents CLS caused by unstyled Swiper on first paint

const PauseIcon = () => (
  <svg
    width="14"
    height="14"
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
    width="14"
    height="14"
    viewBox="0 0 16 16"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
  >
    <path d="M4 2l10 6-10 6V2z" />
  </svg>
);

const MAX_SLIDES_PER_VIEW = 8;

const IMG_SIZE = 112; // 28 * 4 (sm:h-28 sm:w-28 in Tailwind = 7rem = 112px)

export const Collection = ({ heroCollection }) => {
  const collections = heroCollection ?? [];
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
    <div className="lg:container py-3 m-auto px-1.5">
      <div className="relative">
        <Swiper // FIX A1: Capture swiper instance for programmatic play/pause
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="Collections"
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          loopAdditionalSlides={MAX_SLIDES_PER_VIEW}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={3000}
          breakpoints={{
            480: { slidesPerView: 4, spaceBetween: 50 },
            768: { slidesPerView: 5, spaceBetween: 50 },
            1024: { slidesPerView: 8, spaceBetween: 50 },
          }}
          modules={[Autoplay]}
          // FIX A3: Labels the region for screen readers
          aria-label="Shop by collection"
        >
          {collections.map((collection, index) => {
            const isAboveFold = index < MAX_SLIDES_PER_VIEW;

            return (
              <SwiperSlide key={collection.id}>
                <div className="group flex flex-col gap-2 justify-center items-center">
                  <Link
                    to={collection.linkUrl}
                    className="flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1D3CD] focus-visible:ring-offset-2 rounded-full"
                  >
                    <span className="h-20 w-20 sm:h-28 sm:w-28 rounded-full border-2 border-transparent group-hover:border-[#F1D3CD] transition-all duration-300 overflow-hidden block">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        // FIX P3: Explicit dimensions prevent CLS
                        width={IMG_SIZE}
                        height={IMG_SIZE}
                        // FIX P3: Above-fold = high priority; below-fold = lazy
                        loading={isAboveFold ? "eager" : "lazy"}
                        fetchpriority={isAboveFold ? "high" : "low"}
                        decoding={isAboveFold ? "sync" : "async"}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <p className="collection_name text-sm text-center">
                      {collection.title}
                    </p>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button
          type="button"
          onClick={togglePause}
          aria-label={
            paused
              ? "Play collections slideshow"
              : "Pause collections slideshow"
          }
          className="
            absolute bottom-1 right-1 z-10
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
