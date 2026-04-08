import { StarIcon } from "../Icons/StarIcon";
import { PlayIcon } from "../Icons/PlayIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useRef, useEffect } from "react";
import "swiper/css/navigation";

const VideoCard = ({
  sources,
  playingId,
  id,
  setPlayingId,
  iconSize = "h-16 w-16",
}) => {
  const videoRef = useRef(null);
  const isPlaying = playingId === id;
  const mp4 = sources?.find((s) => s.mimeType === "video/mp4")?.url;

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.muted = false;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  const handleClick = () => {
    setPlayingId(isPlaying ? null : id);
  };

  return (
    <div className="video_wrepper">
      <div className="video_them relative">
        <video
          ref={videoRef}
          src={mp4}
          className="w-full"
          playsInline
          loop
          muted
          onEnded={() => setPlayingId(null)}
        />
        <button
          type="button"
          aria-label={isPlaying ? "Pause video" : "Play video"}
          onClick={handleClick}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          {!isPlaying && (
            <span className={`${iconSize} block`}>
              <PlayIcon />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export const Customers = ({ clientVideos }) => {
  const starReviews = clientVideos?.starReviews?.value;
  const title = clientVideos?.title?.value;
  const picks = clientVideos?.reviewsVideo?.references?.nodes ?? [];

  const [playingId, setPlayingId] = useState(null); // ✅ only here

  // ✅ Scroll listener lives here in the parent, only registered once
  useEffect(() => {
    const handleScroll = () => setPlayingId(null);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-accent py-8">
      <div className="flex items-center justify-center flex-col xxs:flex-row gap-2 px-1.5 sm:px-0">
        <StarIcon />
        <span className="text-base xs:text-base">{starReviews}</span>
      </div>
      <h2 className="text-center font-streamline text-3xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0">
        {title}
      </h2>

      {/* Desktop Grid */}
      <div className="hidden md:block pt-6">
        <div className="lg:container px-1.5  m-auto grid grid-cols-3 lg:grid-cols-4 gap-4">
          {picks.slice(0, 4).map((pick, i) => (
            <VideoCard
              key={`desktop-${i}`}
              id={`desktop-${i}`}
              sources={pick.sources}
              playingId={playingId}
              setPlayingId={setPlayingId}
            />
          ))}
        </div>
      </div>

      {/* Mobile Swiper with Navigation */}
      <div className="block md:hidden pt-6">
        <div className="relative px-8">
          <Swiper
            loop={true}
            slidesPerView={2}
            centeredSlides={true}
            className="OurCustomers"
            spaceBetween={8}
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-next",
              prevEl: ".swiper-prev",
            }}
            onSlideChange={() => setPlayingId(null)}
          >
            {picks.map((pick, i) => (
              <SwiperSlide key={`mobile-${i}`}>
                <VideoCard
                  id={`mobile-${i}`}
                  sources={pick.sources}
                  playingId={playingId}
                  setPlayingId={setPlayingId}
                  iconSize="h-10 w-10 xs:h-16 xs:w-16"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button
            className="swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};
