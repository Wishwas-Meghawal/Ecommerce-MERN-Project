import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@mui/material/Button";
import "swiper/css";
import "swiper/css/navigation";
import { EffectFade } from "swiper/modules";

import { Navigation } from "swiper/modules";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import ProductItem from "../ProductItem";

const ProductsSlider = (props) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <div className="productsSlider py-5 relative">
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
          modules={[Navigation]}
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
          {props?.data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <ProductItem  item={item}/>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default ProductsSlider;
