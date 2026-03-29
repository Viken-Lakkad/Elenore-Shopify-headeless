import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export const CelebPicks = ({ celebPicks }) => {
  const title = celebPicks?.title?.value;

  const picks = celebPicks?.images?.references?.nodes;

  if (!picks) return null;

  return (
    <section className="m-auto py-7 sm:py-14 bg-accent">
      <h2 className="text-center font-streamline text-2xl xxs:text-3xl xs:text-5xl px-1.5 sm:px-0">
        {title}
      </h2>

      <div className="hidden md:block pt-10">
        <div className="container m-auto grid grid-cols-4 gap-4">
          {picks.slice(0, 4).map((item, index) => (
            <img
              key={index}
              src={item.image.url}
              alt={`celeb-pick-${index}`}
              className="w-full h-full"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <div className="block md:hidden pt-5 sm:pt-10">
        <Swiper
          slidesPerView={2}
          spaceBetween={8}
          centeredSlides
          loop
          speed={2500}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="CelebPicks"
        >
          {picks.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item.image.url}
                alt={`celeb-pick-${index}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};