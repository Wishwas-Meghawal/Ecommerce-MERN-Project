import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const HomeCatSlider = () => {
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
          <SwiperSlide>
            <Link to="/">
              <div className="item rounded-md py-7 px-3 bg-white  text-center flex items-center justify-center flex-col">
                <div className=" cat-img">
                  <img
                    src="https://api.spicezgold.com/download/file_1734525204708_fash.png"
                    alt="Banner slide"
                    className="w-[70px] transition-all"
                  />
                </div>
                <h3>Fashion</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item rounded-sm py-7 px-3 bg-white  text-center flex items-center justify-center flex-col">
                <div className=" cat-img">
                  <img
                    src="https://api.spicezgold.com/download/file_1734525218436_ele.png"
                    alt="Banner slide"
                    className="w-[70px] transition-all"
                  />
                </div>
                <h3>Electronics</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item rounded-sm py-7 px-3 bg-white  text-center flex items-center justify-center flex-col">
                <div className=" cat-img">
                  <img
                    src="https://api.spicezgold.com/download/file_1734525231018_bag.png"
                    alt="Banner slide"
                    className="w-[70px] transition-all"
                  />
                </div>
                <h3>Bags</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item rounded-sm py-7 px-3 bg-white  text-center flex items-center justify-center flex-col">
                <div className=" cat-img">
                  <img
                    src="https://api.spicezgold.com/download/file_1734525239704_foot.png"
                    alt="Banner slide"
                    className="w-[70px] transition-all"
                  />
                </div>
                <h3>Footwear</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item rounded-sm py-7 px-3 bg-white  text-center flex items-center justify-center flex-col">
                <div className=" cat-img">
                  <img
                    src="https://api.spicezgold.com/download/file_1734525248057_gro.png"
                    alt="Banner slide"
                    className="w-[70px] transition-all"
                  />
                </div>
                <h3>Groceries</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item rounded-sm py-7 px-3 bg-white  text-center flex items-center justify-center flex-col">
                <div className=" cat-img">
                  <img
                    src="https://api.spicezgold.com/download/file_1734525255799_beauty.png"
                    alt="Banner slide"
                    className="w-[70px] transition-all"
                  />
                </div>
                <h3>Beauty</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item rounded-sm py-7 px-3 bg-white  text-center flex items-center justify-center flex-col">
                <div className=" cat-img">
                  <img
                    src="https://api.spicezgold.com/download/file_1734525275367_well.png"
                    alt="Banner slide"
                    className="w-[70px] transition-all"
                  />
                </div>
                <h3>Wellness</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item rounded-sm py-7 px-3 bg-white  text-center flex items-center justify-center flex-col">
                <div className=" cat-img">
                  <img
                    src="https://api.spicezgold.com/download/file_1734525286186_jw.png"
                    alt="Banner slide"
                    className="w-[70px] transition-all"
                  />
                </div>
                <h3>Jewellery</h3>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
