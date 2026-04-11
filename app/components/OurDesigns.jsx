import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const OurDesigns = ({ ourDesigns }) => {
  const title = ourDesigns?.title?.value;
  const imageNodes = ourDesigns?.images?.references?.nodes ?? [];

  return (
    <div className="lg:container px-1.5 m-auto py-8">
      <h2 className="text-center font-streamline text-5xl">{title}</h2>

      {/* Desktop */}
      <div className="hidden md:flex justify-center items-start gap-4 pt-8">
        {imageNodes.map((node, index) => (
          <img
            key={index}
            src={node.image.url}
            alt={node.image.altText ?? `Design ${index + 1}`}
            className="w-1/5 even:mt-10"
          />
        ))}
      </div>

      {/* Mobile */}
      <div className="block md:hidden pt-5 sm:pt-10">
        <Swiper
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
        >
          {imageNodes.map((node, index) => (
            <SwiperSlide key={index}>
              <img
                src={node.image.url}
                alt={node.image.altText ?? `Design ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
