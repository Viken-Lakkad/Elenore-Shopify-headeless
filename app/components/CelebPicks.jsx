import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export const CelebPicks = ({ celebPicks }) => {
  const title = celebPicks?.title?.value;
  const picks = celebPicks?.images?.references?.nodes;

  if (!picks?.length) return null;

  return (
    <section
      className="m-auto py-7 sm:py-14 bg-accent"
      aria-label={title ?? "Celebrity Picks"}
    >
      <h2 className="text-center font-streamline text-2xl xxs:text-3xl xs:text-5xl px-1.5 sm:px-0">
        {title}
      </h2>

      <div className="pt-5 sm:pt-10">
        <Swiper
          slidesPerView={2}
          spaceBetween={8}
          centeredSlides={true}
          loop={true}
          speed={2500}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            768: {
              slidesPerView: 4,
              spaceBetween: 16,
              centeredSlides: false,
              loop: false,
            },
          }}
          modules={[Autoplay]}
          className="lg:container celebPicks m-auto px-1.5 "
        >
          {picks.map((item, index) => {
            const isPriority = index < 2;
            const alt =
              item.image?.altText ||
              (title
                ? `${title} I- image ${index + 1}`
                : `Celebrity pick ${index + 1}`);

            const key = item.id ?? item.image?.url ?? index;

            return (
              <SwiperSlide key={key}>
                <img
                  src={item.image.url}
                  alt={alt}
                  className="w-full h-full object-cover"
                  width={600}
                  height={600}
                  loading={isPriority ? "eager" : "lazy"}
                  fetchPriority={isPriority ? "high" : "auto"}
                  decoding={isPriority ? "sync" : "async"}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};