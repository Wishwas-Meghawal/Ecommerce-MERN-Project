import React, { useState, useRef, useEffect } from "react";
import { FcFolder } from "react-icons/fc";
import { Rating } from "@mui/material";
import InnerImageZoom from "react-inner-image-zoom";
import "./style.css";

// Import Swiper styles and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const ProductDetails = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();
  const headerRef = useRef(null);

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section - Pure CSS animations */}
          <div ref={headerRef} className="mb-6 relative group">
            {/* Background decoration with hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-2xl -m-1 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Main header card */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-5 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Animated gradient line - top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative flex items-center gap-4">
                {/* Icon with pulse effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-md opacity-40 animate-pulse" />
                  <div className="relative p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <FcFolder className="text-2xl text-white brightness-0 invert" />
                  </div>
                </div>

                {/* Text with slide-up animation on hover */}
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 transform group-hover:translate-x-1 transition-transform duration-300">
                    Product Details
                  </h1>
                  <p className="text-gray-500 text-sm mt-1 transform group-hover:translate-x-1 transition-transform duration-300 delay-75">
                    Manage and monitor your product inventory
                  </p>
                </div>
              </div>

              {/* Bottom line animation */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="productDetails flex flex-col lg:flex-row gap-8">
            {/* Left Column - Images */}
            <div className="lg:w-1/2">
              <div className="flex flex-col-reverse md:flex-row gap-3">
                {/* Thumbnail Slider - Vertical on desktop, horizontal on mobile */}
                <div className="md:w-[15%] w-full">
                  <div className="relative h-full">
                    <Swiper
                      ref={zoomSliderSml}
                      direction="vertical"
                      slidesPerView={5}
                      spaceBetween={8}
                      modules={[Navigation]}
                      breakpoints={{
                        320: {
                          direction: "horizontal",
                          slidesPerView: 4,
                          spaceBetween: 8,
                        },
                        768: {
                          direction: "vertical",
                          slidesPerView: 5,
                          spaceBetween: 10,
                        },
                      }}
                      className="thumb-swiper w-full"
                      style={{
                        height: "500px", // Fixed height for desktop
                      }}
                    >
                      {[0, 1, 2, 3, 4].map((index) => (
                        <SwiperSlide key={index} style={{ height: "auto" }}>
                          <div
                            className={`cursor-pointer transition-all duration-300 ${
                              slideIndex === index
                                ? "opacity-100 ring-2 ring-blue-500 ring-offset-2 mt-1 rounded-lg"
                                : "opacity-60 hover:opacity-100"
                            }`}
                            onClick={() => goto(index)}
                          >
                            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                              <img
                                src={
                                  index === 0
                                    ? "https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
                                    : index === 1
                                      ? "https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
                                      : index === 2
                                        ? "https://rukminim2.flixcart.com/image/128/128/xif0q/shirt/7/k/o/l-tbh-aride-mc-the-bear-house-original-imagwy3697eehdwc.jpeg?q=70"
                                        : index === 3
                                          ? "https://rukminim2.flixcart.com/image/128/128/xif0q/shirt/f/g/e/l-tbh-aride-mc-the-bear-house-original-imagwy36ppecyffn.jpeg?q=70"
                                          : "https://rukminim2.flixcart.com/image/128/128/xif0q/shirt/n/f/o/l-tbh-aride-mc-the-bear-house-original-imagwy36nd7wt7ef.jpeg?q=70"
                                }
                                className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                                alt={`Product thumbnail ${index + 1}`}
                              />
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>

                {/* Main Image Slider */}
                <div className="md:w-[85%] w-full md:h-[500px] h-[400px] overflow-hidden rounded-xl bg-white shadow-lg">
                  <Swiper
                    ref={zoomSliderBig}
                    slidesPerView={1}
                    spaceBetween={14}
                    navigation={false}
                    className="h-full"
                  >
                    <SwiperSlide>
                      <InnerImageZoom
                        src="https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
                        zoomType="hover"
                        zoomScale={1.5}
                        zoomPreload={true}
                        hideHint={true}
                        imgAttributes={{
                          style: {
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                          },
                        }}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <InnerImageZoom
                        src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
                        zoomType="hover"
                        zoomScale={1.5}
                        imgAttributes={{
                          style: {
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                          },
                        }}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <InnerImageZoom
                        src="https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/7/k/o/l-tbh-aride-mc-the-bear-house-original-imagwy3697eehdwc.jpeg?q=70&crop=false"
                        zoomType="hover"
                        zoomScale={1.5}
                        imgAttributes={{
                          style: {
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                          },
                        }}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <InnerImageZoom
                        src="https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/f/g/e/l-tbh-aride-mc-the-bear-house-original-imagwy36ppecyffn.jpeg?q=70&crop=false"
                        zoomType="hover"
                        zoomScale={1.5}
                        imgAttributes={{
                          style: {
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                          },
                        }}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <InnerImageZoom
                        src="https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/n/f/o/l-tbh-aride-mc-the-bear-house-original-imagwy36nd7wt7ef.jpeg?q=70&crop=false"
                        zoomType="hover"
                        zoomScale={1.5}
                        imgAttributes={{
                          style: {
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                          },
                        }}
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>

            {/* Right Column - Product Info (Placeholder)
            <div className="lg:w-1/2 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Product Name</label>
                  <p className="text-lg font-semibold">Premium Cotton Shirt</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Price</label>
                  <p className="text-2xl font-bold text-blue-600">$49.99</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Rating</label>
                  <div className="flex items-center gap-2">
                    <Rating value={4.5} precision={0.5} readOnly />
                    <span className="text-sm text-gray-500">(120 reviews)</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Description</label>
                  <p className="text-gray-600">
                    Premium quality cotton shirt with modern fit design. Perfect for casual and formal occasions.
                  </p>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]">
                  Add to Cart
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
