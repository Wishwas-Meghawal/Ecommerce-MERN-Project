import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const HomeCatSlider = (props) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="homecatSlider py-8 pt-4">
      <div className="container relative">
        <button ref={prevRef} className="custom-prev">
          <FiChevronLeft />
        </button>

        <button ref={nextRef} className="custom-next">
          <FiChevronRight />
        </button>
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          loop={true}
          speed={800}
          grabCursor={true}
          fadeEffect={{ crossFade: true }}
          modules={[Navigation]}
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
          {props?.data?.map((cat, index) => {
            return (
              <SwiperSlide>
                <Link to="/">
                  <div className="item rounded-md py-7 px-3 bg-white  text-center flex items-center justify-center flex-col">
                    <div className=" cat-img">
                      <img
                        src={cat?.images[0]}
                        className="w-[70px] transition-all"
                      />
                    </div>
                    <h3>{cat?.name}</h3>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
