import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export function AnnouncementBar({ announcements = [] }) {
  if (!announcements.length) return null;

  return (
    <div className="py-3 bg-primary">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        slidesPerView="auto"
        spaceBetween={30}
        allowTouchMove={false}
        className="announcementbar"
      >
        {announcements.map((content, index) => (
          <SwiperSlide key={index} style={{ width: "auto" }}>
            <span className="text-white font-bold tracking-wide whitespace-nowrap">
              {content}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
