import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "./style.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import "./style.css";

const ProductZoom = (props) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [slideIndex, setSlideIndex] = useState();
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <div className="flex gap-4">
      {/* LEFT THUMBNAILS */}
      <div className=" relative w-[15%] flex flex-col items-center">
        {/* TOP BUTTON */}
        <button ref={prevRef} className="thumb-nav-btn mb-2">
          <FiChevronUp />
        </button>

        <Swiper
          ref={zoomSliderSml}
          direction="vertical"
          slidesPerView={5}
          spaceBetween={10}
          modules={[Navigation]}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          className="thumb-swiper h-[500px] overflow-hidden"
        >
          {props?.images?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className={`thumb-item group ${
                    slideIndex === index ? "opacity-100" : "opacity-40"
                  }`}
                  onClick={() => goto(index)}
                >
                  <img
                    src={item}
                    className="w-full transition-all group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* BOTTOM BUTTON */}
        <button ref={nextRef} className="thumb-nav-btn mt-2">
          <FiChevronDown />
        </button>
      </div>

      {/* RIGHT ZOOM IMAGE */}
      <div className="w-[85%] h-[500px] overflow-hidden  ">
        <Swiper
          ref={zoomSliderBig}
          slidesPerView={1}
          spaceBetween={14}
          navigation={false}
        >
          {props?.images?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <InnerImageZoom
                  src={item}
                  zoomType="hover"
                  zoomScale={1}
                  zoomPreload={true}
                  hideHint={true}
                  imgAttributes={{
                    style: { objectFit: "contain" },
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductZoom;
