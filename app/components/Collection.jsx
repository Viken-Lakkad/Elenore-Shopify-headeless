import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export const Collection = ({ heroCollection }) => {
  const collections = heroCollection
    ? [...heroCollection, ...heroCollection]
    : [];

  return (
    <div className="lg:container py-3 m-auto px-1.5">
      <Swiper
        className="Collections"
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
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
      >
        {collections.map((collection, index) => (
          <SwiperSlide key={index}>
            <div className="group flex flex-col gap-2 justify-center items-center">
              <Link
                to={collection.linkUrl}
                className="h-20 w-20 sm:h-28 sm:w-28 rounded-full border-2 border-transparent group-hover:border-[#F1D3CD] transition-all duration-300 overflow-hidden"
              >
                <img
                  src={collection.image} 
                  alt={collection.title}
                  className="h-full w-full object-cover"
                />
              </Link>
              <p className="collection_name text-sm text-center">
                {collection.title}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
