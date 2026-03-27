import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Button from "@mui/material/Button";
import { Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HomeSlider = (props) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <div className="homeSlider py-4">
        <div className="container relative">
          <button ref={prevRef} className="custom-prev ">
            <FiChevronLeft />
          </button>
          <button ref={nextRef} className="custom-next">
            <FiChevronRight />
          </button>

          <Swiper
            spaceBetween={10}
            loop={true}
            speed={800}
            grabCursor={true}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="sliderHome"
          >
            {props?.data?.length !== 0 &&
              props?.data?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="relative overflow-hidden shadow-lg group">
                      <img
                        src={item?.images[0]}
                        alt="Banner slide"
                        className="w-full h-[400px] md:h-[500px] object-cover block"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HomeSlider;
