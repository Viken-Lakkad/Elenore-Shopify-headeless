import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export const TrustedPartner = () => {
  const AllBrand = [
    {
      id: 1,
      image: "/brand1.png",
    },
    {
      id: 2,
      image: "./brand2.png",
    },
    {
      id: 3,
      image: "./brand3.png",
    },
    {
      id: 4,
      image: "./brand4.png",
    },
    {
      id: 5,
      image: "./brand5.png",
    },
    {
      id: 6,
      image: "/brand1.png",
    },
    {
      id: 7,
      image: "./brand2.png",
    },
    {
      id: 8,
      image: "./brand3.png",
    },
    {
      id: 9,
      image: "./brand4.png",
    },
    {
      id: 10,
      image: "./brand5.png",
    },
  ];
  return (
    <>
      <section className="py-3">
        <div className="container m-auto   ">
          <div className="flex items-center gap-2">
            <div className="whitespace-nowrap w-2/12 font-inter font-semibold text-sm sm:text-2xl">
              As seen on
            </div>
            <div className="w-10/12">
              <Swiper
                loop="true"
                slidesPerView={5}
                className="TrustedPartner"
                breakpoints={{
                  480: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  890: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  }
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                speed={6000}
                modules={[Autoplay]}
              >
                {AllBrand.map((brand) => (
                  <SwiperSlide key={brand.id}>
                    <img src={brand.image} alt="brand" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
