import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FcFolder } from "react-icons/fc";
import { Rating } from "@mui/material";

// Import Swiper styles and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ProductDetails = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-6 relative"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-2xl -m-1 blur-xl" />

            {/* Main header card */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-5 overflow-hidden">
              <div className="relative flex items-center gap-4">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -120 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-md opacity-40" />

                  <div className="relative p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                    <FcFolder className="text-2xl text-white brightness-0 invert" />
                  </div>
                </motion.div>

                {/* Text */}
                <div>
                  <motion.h1
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-2xl md:text-3xl font-bold text-gray-800"
                  >
                    Product Details
                  </motion.h1>

                  <motion.p
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-500 text-sm mt-1"
                  >
                    Manage and monitor your product inventory
                  </motion.p>
                </div>
              </div>

              {/* Bottom line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              />
            </div>
          </motion.div>
        </div>

        <div className="productDetais flex gap-5">
          <div className="w-[50%]">
            <div className="flex gap-3">
              <div className="slider w-[15%]">
                <Swiper
                  ref={zoomSliderSml}
                  direction={"vertical"}
                  slidesPerView={5}
                  spaceBetween={10}
                  modules={[Navigation]}
                  className="zoomProductSliderThumb h-[500px] overflow-hidden"
                >
                  <SwiperSlide>
                    <div
                      className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 0 ? 'opacity-1' : 'opacity-30'}`}
                      onClick={() => goto(0)}
                    >
                      <img src="https://static.vecteezy.com/system/resources/thumbnails/075/563/145/small_2x/smartphone-wireless-headphones-airpods-and-a-cardholder-on-a-smooth-surface-photo.jpg"
                      className="w-full h-full" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div
                      className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 0 ? 'opacity-1' : 'opacity-30'}`}
                      onClick={() => goto(1)}
                    >
                      <img src="https://static.vecteezy.com/system/resources/thumbnails/075/563/145/small_2x/smartphone-wireless-headphones-airpods-and-a-cardholder-on-a-smooth-surface-photo.jpg" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="zoomContainer w-[85%] h-[500px] overflow-hidden rounded-md">
                <Swiper
                  ref={zoomSliderBig}
                  slidesPerView={1}
                  spaceBetween={0}
                  navigation={false}
                >
                  <SwiperSlide>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/075/563/145/small_2x/smartphone-wireless-headphones-airpods-and-a-cardholder-on-a-smooth-surface-photo.jpg" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
