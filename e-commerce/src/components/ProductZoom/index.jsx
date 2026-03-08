import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "./style.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import "./style.css";

const ProductZoom = () => {
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
          <SwiperSlide>
            <div
              className={`thumb-item group ${
                slideIndex === 0 ? "opacity-100" : "opacity-40"
              }`}
              onClick={() => goto(0)}
            >
              <img
                src="https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={`thumb-item group ${
                slideIndex === 1 ? "opacity-100" : "opacity-40"
              }`}
              onClick={() => goto(1)}
            >
              <img
                src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={`thumb-item group ${
                slideIndex === 2 ? "opacity-100" : "opacity-40"
              }`}
              onClick={() => goto(2)}
            >
              <img
                src="https://rukminim2.flixcart.com/image/128/128/xif0q/shirt/7/k/o/l-tbh-aride-mc-the-bear-house-original-imagwy3697eehdwc.jpeg?q=70"
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={`thumb-item group ${
                slideIndex === 3 ? "opacity-100" : "opacity-40"
              }`}
              onClick={() => goto(3)}
            >
              <img
                src="https://rukminim2.flixcart.com/image/128/128/xif0q/shirt/f/g/e/l-tbh-aride-mc-the-bear-house-original-imagwy36ppecyffn.jpeg?q=70"
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={`thumb-item group ${
                slideIndex === 4 ? "opacity-100" : "opacity-40"
              }`}
              onClick={() => goto(4)}
            >
              <img
                src="https://rukminim2.flixcart.com/image/128/128/xif0q/shirt/n/f/o/l-tbh-aride-mc-the-bear-house-original-imagwy36nd7wt7ef.jpeg?q=70"
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
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
          <SwiperSlide>
            <InnerImageZoom
              src="https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
              zoomType="hover"
              zoomScale={1}
              zoomPreload={true}
              hideHint={true}
              imgAttributes={{
                style: { objectFit: "contain" },
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
              zoomType="hover"
              zoomScale={1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              src="https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/7/k/o/l-tbh-aride-mc-the-bear-house-original-imagwy3697eehdwc.jpeg?q=70&crop=false"
              zoomType="hover"
              zoomScale={1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              src="https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/f/g/e/l-tbh-aride-mc-the-bear-house-original-imagwy36ppecyffn.jpeg?q=70&crop=false"
              zoomType="hover"
              zoomScale={1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              src="https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/n/f/o/l-tbh-aride-mc-the-bear-house-original-imagwy36nd7wt7ef.jpeg?q=70&crop=false"
              zoomType="hover"
              zoomScale={1}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ProductZoom;
