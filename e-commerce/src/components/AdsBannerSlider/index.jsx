import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { EffectFade } from "swiper/modules";

import { Navigation, Autoplay } from "swiper/modules";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import BannerBox from "../BannerBox";

const AdsBannerSlider = (props) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <div className="homecatSlider py-5 w-full relative">
            <button ref={prevRef} className="custom-prev">
            <FiChevronLeft />
            </button>

            <button ref={nextRef} className="custom-next">
            <FiChevronRight />
            </button>
            <Swiper
                slidesPerView={props.items}
                spaceBetween={10}
                loop={true}
                speed={800}
                grabCursor={true}
                fadeEffect={{ crossFade: true }}
                modules={[Navigation, Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                onSwiper={(swiper) => {
                    setTimeout(() => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                    });
                }}
                className="sliderHome"
                >
                <SwiperSlide>
                    <BannerBox image={"/banner1.jpg"} link={'/'} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox image={"/banner2.jpg"} link={'/'} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox image={"/banner3.jpg"} link={'/'} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox image={"/banner4.jpg"} link={'/'} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox image={"/banner5.webp"} link={'/'} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox image={"/banner6.webp"} link={'/'} />
                </SwiperSlide>
            </Swiper>
      </div>
    </>
  );
};

export default AdsBannerSlider;
