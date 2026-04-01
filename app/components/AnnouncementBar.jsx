import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { useEffect, useRef } from "react";

const SLIDE_COUNT = 80;

export function AnnouncementBar({ announcements = [] }) {
  const swiperRef = useRef(null);
  const rafRef = useRef(null);

  const slidesArray =
    announcements.length > 0
      ? Array.from({ length: SLIDE_COUNT }, (_, i) => {
          return announcements[i % announcements.length];
        })
      : [];

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    let mounted = true;
    let translateValue = 0;
    const speed = 1.5;

    const getSlideWidth = () => {
      const first = swiper.slides && swiper.slides[0];
      return (first && (first.offsetWidth || first.clientWidth)) || 200;
    };

    const startAnimation = () => {
      if (!mounted) return;

      if (!swiper.slides || swiper.slides.length === 0) {
        rafRef.current = setTimeout(startAnimation, 50);
        return;
      }

      const slideWidth = getSlideWidth();
      const totalWidth = slideWidth * swiper.params.slidesPerView;

      if (swiper.autoplay && swiper.autoplay.stop) {
        swiper.autoplay.stop();
      }

      const loop = () => {
        translateValue -= speed;

        if (Math.abs(translateValue) >= totalWidth) {
          translateValue = 0;
        }

        if (swiper.translateTo) {
          swiper.translateTo(translateValue, 0, false, true);
        }

        rafRef.current = requestAnimationFrame(loop);
      };

      rafRef.current = requestAnimationFrame(loop);
    };

    startAnimation();

    return () => {
      mounted = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        clearTimeout(rafRef.current);
      }
    };
  }, []);

  if (!slidesArray.length) return null;

  return (
    <div className="py-3 bg-primary">
      <Swiper
        className="announcementbar"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay, FreeMode]}
        loop={true}
        speed={0}
        autoplay={false}
        slidesPerView="auto"
        spaceBetween={30}
        allowTouchMove={false}
        freeMode={{ enabled: true, momentum: false }}
        resistance={false}
      >
        {slidesArray.map(function (content, index) {
          return (
            <SwiperSlide key={index} style={{ width:"auto"}}>
              <span className="text-white font-bold tracking-wide whitespace-nowrap">
                {content}
              </span>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}