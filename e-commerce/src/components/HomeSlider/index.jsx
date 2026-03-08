import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Button from "@mui/material/Button";
import { Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HomeSlider = () => {
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
            <SwiperSlide>
              <div className="item  overflow-hidden ">
                <img
                  src="https://serviceapi.spicezgold.com/download/1763051442252_34296.jpg"
                  alt="Banner slide"
                  className="w-full"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item  overflow-hidden ">
                <img
                  src="https://serviceapi.spicezgold.com/download/1763051442252_34296.jpg"
                  alt="Banner slide"
                  className="w-full"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item  overflow-hidden ">
                <img
                  src="https://serviceapi.spicezgold.com/download/1763051442252_34296.jpg"
                  alt="Banner slide"
                  className="w-full"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item  overflow-hidden ">
                <img
                  src="https://serviceapi.spicezgold.com/download/1763051442252_34296.jpg"
                  alt="Banner slide"
                  className="w-full"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item  overflow-hidden ">
                <img
                  src="https://serviceapi.spicezgold.com/download/1763051442252_34296.jpg"
                  alt="Banner slide"
                  className="w-full"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item  overflow-hidden">
                <img
                  src="https://serviceapi.spicezgold.com/download/1763812170460_homeslides2.jpg"
                  alt="Banner slide"
                  className="w-full"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item overflow-hidden">
                <img
                  src="https://serviceapi.spicezgold.com/download/1748955932914_NewProject(1).jpg"
                  alt="Banner slide"
                  className="w-full"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item  overflow-hidden">
                <img
                  src="https://serviceapi.spicezgold.com/download/1751685130717_NewProject(8).jpg"
                  alt="Banner slide"
                  className="w-full"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item  overflow-hidden">
                <img
                  src="https://serviceapi.spicezgold.com/download/1759938751802_30744.jpg"
                  alt="Banner slide"
                  className="w-full"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HomeSlider;
