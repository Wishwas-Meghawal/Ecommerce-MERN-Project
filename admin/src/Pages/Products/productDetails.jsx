import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FcFolder } from "react-icons/fc";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";

import {
  Package,
  Tag,
  Percent,
  Boxes,
  CalendarDays,
  FileText,
  Hash,
  Star,
  IndianRupee,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

// Import Swiper styles and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { fetchDataFromApi } from "../../utils/api";
import { Button, Rating } from "@mui/material";

const ProductDetails = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [product, setProduct] = useState();
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const { id } = useParams();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  useEffect(() => {
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
       setTimeout(()=>{
         setProduct(res?.product);
       },2500)
      }
    });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section - Pure CSS animations */}
          <div className="mb-6 relative group">
            {/* Background decoration with hover effect */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-600/5 to-indigo-600/5 rounded-2xl -m-1 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Main header card */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-5 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative flex items-center gap-4">
                {/* Icon with pulse effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl blur-md opacity-40 animate-pulse" />
                  <div className="relative p-3 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
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
            </div>
          </div>

          {product?._id !== "" && product?._id !== undefined && product?._id !== null ?  (
            <div className="productDetails flex flex-col gap-4">
              {/* Top Row - Images and Basic Info */}
              <div className="flex gap-4">
                {/* Left Column - Images */}
                <div className="w-[40%] relative group">
                  {/* Animated background decoration */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                  {/* Main gallery container with glass morphism */}
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -ml-20 -mb-20" />

                    {/* Gallery Header */}
                    <div className="relative flex items-center justify-between mb-4 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Product Gallery
                        </span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
                        {product?.images?.length || 0} Photos
                      </span>
                    </div>

                    {product?.images?.length !== 0 && (
                      <div className="flex flex-col gap-4 relative">
                        {/* Main Image - Simplified */}
                        <div className="relative w-full">
                          <div className="relative h-[450px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl group/main">
                            {/* Decorative corner elements */}
                            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-br-3xl z-10" />
                            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-tl-3xl z-10 " />

                            {/* Simple image counter */}
                            <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                              <span className="text-blue-400">
                                {slideIndex + 1}
                              </span>{" "}
                              / {product?.images?.length}
                            </div>

                            {/* Main Image - Without InnerZoom */}
                            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                              <img
                                src={product?.images[slideIndex]}
                                alt={`Product image ${slideIndex + 1}`}
                                className="w-full h-full object-contain p-8 transition-transform duration-700 hover:scale-110"
                              />
                            </div>

                            {/* Simple navigation buttons */}
                            {product?.images?.length > 1 && (
                              <>
                                <button
                                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover/main:opacity-100 cursor-pointer"
                                  onClick={() =>
                                    slideIndex > 0 &&
                                    setSlideIndex(slideIndex - 1)
                                  }
                                >
                                  ←
                                </button>
                                <button
                                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover/main:opacity-100 cursor-pointer"
                                  onClick={() =>
                                    slideIndex < product?.images?.length - 1 &&
                                    setSlideIndex(slideIndex + 1)
                                  }
                                >
                                  →
                                </button>
                              </>
                            )}

                            {/* Simple progress dots */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-1.5 ">
                              {product?.images?.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setSlideIndex(index)}
                                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                    slideIndex === index
                                      ? "w-6 bg-blue-500"
                                      : "w-1.5 bg-white/50 hover:bg-white/80"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Thumbnails - Now at the bottom */}
                        <div className="w-full mt-2">
                          <div className="relative">
                            {/* Thumbnail slider container */}
                            <Swiper
                              ref={zoomSliderSml}
                              direction="horizontal"
                              slidesPerView={5}
                              spaceBetween={12}
                              modules={[Navigation]}
                              breakpoints={{
                                320: {
                                  slidesPerView: 4,
                                  spaceBetween: 8,
                                },
                                640: {
                                  slidesPerView: 5,
                                  spaceBetween: 12,
                                },
                                1024: {
                                  slidesPerView: 6,
                                  spaceBetween: 12,
                                },
                              }}
                              className="thumb-swiper w-full"
                            >
                              {product?.images?.map((item, index) => (
                                <SwiperSlide key={index}>
                                  <div
                                    className={`relative cursor-pointer transition-all duration-300 group/thumb ${
                                      slideIndex === index
                                        ? "scale-105"
                                        : "hover:scale-102"
                                    }`}
                                    onClick={() => setSlideIndex(index)}
                                  >
                                    {/* Animated border for active thumbnail */}
                                    {slideIndex === index && (
                                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl blur-md opacity-50" />
                                    )}

                                    {/* Thumbnail card */}
                                    <div
                                      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 transition-all duration-300 ${
                                        slideIndex === index
                                          ? "border-blue-600 shadow-xl"
                                          : "border-transparent hover:border-blue-400/50 hover:shadow-lg"
                                      }`}
                                    >
                                      {/* Image */}
                                      <div className="aspect-square w-full overflow-hidden">
                                        <img
                                          src={item}
                                          className="w-full h-full object-cover transition-all duration-500 group-hover/thumb:scale-110"
                                          alt={`Product thumbnail ${index + 1}`}
                                        />
                                      </div>

                                      {/* Active indicator dot */}
                                      {slideIndex === index && (
                                        <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
                                      )}
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Custom styles */}
                  <style jsx>{`
                    .hover\\:scale-102:hover {
                      transform: scale(1.02);
                    }

                    /* Custom scrollbar for thumbnails container if needed */
                    .thumb-swiper {
                      padding: 5px 0;
                    }

                    .thumb-swiper .swiper-slide {
                      transition: all 0.3s;
                      opacity: 0.7;
                    }

                    .thumb-swiper .swiper-slide:hover {
                      opacity: 1;
                    }

                    .thumb-swiper .swiper-slide-active {
                      opacity: 1;
                    }
                  `}</style>
                </div>

                {/* Right Column - Basic Info (Without Description) */}
                <div className="w-[60%] pl-8">
                  <div className="relative group">
                    {/* Animated background decoration - same as image section */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                    {/* Main card with glass morphism - matching image section */}
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 overflow-hidden">
                      {/* Decorative elements - matching image section */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl -mr-20 -mt-20" />
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -ml-20 -mb-20" />

                      {/* Header Section - matching image section style */}
                      <div className="relative flex items-center justify-between mb-4 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Product Information
                          </span>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
                          Basic Details
                        </span>
                      </div>

                      {/* Product Title and Status Row - Simplified like image section */}
                      <div className="relative flex items-start justify-between mb-6">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold text-gray-800">
                            {product?.name}
                          </h2>
                        </div>

                        {/* Simple status badge - matching image section style */}
                        <div className="relative">
                          <span className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            Active
                          </span>
                        </div>
                      </div>

                      {/* Info Grid - Matching thumbnail grid style from image section */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Product Name Card - Simplified */}
                        <div className="relative group/card">
                          <div
                            className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 transition-all duration-300 p-4 hover:border-blue-400/50 hover:shadow-xl ${slideIndex === 0 ? "border-blue-600" : "border-transparent"}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                                <Package className="text-white" size={20} />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Product Name
                                </p>
                                <p className="font-semibold text-gray-800 text-xs">
                                  {product?.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Product ID Card */}
                        <div className="relative group/card">
                          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-transparent hover:border-purple-400/50 hover:shadow-xl transition-all duration-300 p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
                                <Hash className="text-white" size={20} />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Product ID
                                </p>
                                <p className="font-semibold text-gray-800 text-xs">
                                  {product?._id}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Category Card */}
                        <div className="relative group/card">
                          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-transparent hover:border-orange-400/50 hover:shadow-xl transition-all duration-300 p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg">
                                <Tag className="text-white" size={20} />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Category
                                </p>
                                <p className="font-semibold text-gray-800 text-xs">
                                  {product?.catName}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Price Card */}
                        <div className="relative group/card">
                          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-transparent hover:border-green-400/50 hover:shadow-xl transition-all duration-300 p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
                                <IndianRupee className="text-white" size={20} />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Price</p>
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-gray-800 text-xs">
                                    {product?.price}
                                  </p>
                                  <span className="text-[10px] text-green-500 font-medium bg-green-50 px-1.5 py-0.5 rounded-full">
                                    MRP
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Discount Card */}
                        <div className="relative group/card">
                          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-transparent hover:border-pink-400/50 hover:shadow-xl transition-all duration-300 p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-lg">
                                <Percent className="text-white" size={20} />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Discount
                                </p>
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-gray-800 text-xs">
                                    {product?.discount}%
                                  </p>
                                  {product?.oldPrice && (
                                    <span className="text-[10px] line-through text-gray-400 flex items-center">
                                      <IndianRupee
                                        size={8}
                                        className="mr-0.5"
                                      />
                                      {product?.oldPrice}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Stock Card */}
                        <div className="relative group/card">
                          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-transparent hover:border-indigo-400/50 hover:shadow-xl transition-all duration-300 p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
                                <Boxes className="text-white" size={20} />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs text-gray-500">Stock</p>
                                <div className="flex items-center justify-between">
                                  <p className="font-semibold text-gray-800 text-xs">
                                    {product?.coutInStock} Units
                                  </p>
                                  <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                                    In Stock
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Created At Card */}
                        <div className="relative group/card">
                          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-transparent hover:border-gray-400/50 hover:shadow-xl transition-all duration-300 p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg shadow-lg">
                                <CalendarDays
                                  className="text-white"
                                  size={20}
                                />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Created At
                                </p>
                                <p className="font-semibold text-gray-800 text-xs">
                                  {product?.createdAt?.split("T")[0]}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Size Card */}
                        {product?.size?.length !== 0 && (
                          <div className="relative group/card">
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-transparent hover:border-purple-400/50 hover:shadow-xl transition-all duration-300 p-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
                                  <svg
                                    className="text-white"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path d="M20 7h-4.5L15 4H9L8.5 7H4v2h16V7z" />
                                    <path d="M4 9v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Size</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    {product?.size?.map((size, index) => {
                                      return (
                                        <span
                                          key={index}
                                          className="px-1 py-0.5 bg-purple-100 text-purple-700 rounded-md text-xs font-medium"
                                        >
                                          {size?.toUpperCase()}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Simple Stats Row - Matching image gallery style */}
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200/80 hover:border-blue-400/50 hover:shadow-xl transition-all duration-300 p-3 text-center">
                          <p className="text-xs text-gray-500 mb-1">
                            Total Sold
                          </p>
                          <p className="text-lg font-bold text-gray-800">
                            2,847
                          </p>
                          <span className="text-[10px] text-green-600">
                            +12%
                          </span>
                        </div>
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200/80 hover:border-purple-400/50 hover:shadow-xl transition-all duration-300 p-3 text-center">
                          <p className="text-xs text-gray-500 mb-1">
                            Avg Rating
                          </p>
                          <div className="flex items-center justify-center gap-1">
                            <p className="text-lg font-bold text-gray-800">
                              {product?.rating || "4.8"}
                            </p>
                            <Star
                              size={14}
                              className="text-yellow-500 fill-yellow-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row - Full Width Description Section */}
              <div className="w-full mt-2">
                <div className="relative group">
                  {/* Animated background decoration */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                  {/* Main card with glass morphism */}
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -ml-20 -mb-20" />

                    {/* Header Section */}
                    <div className="relative flex items-center justify-between mb-4 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Product Description
                        </span>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full border border-blue-200">
                        Detailed Information
                      </span>
                    </div>

                    {/* Description Content - Full Width */}
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200/80 hover:border-blue-400/50 hover:shadow-xl transition-all duration-300 p-6">
                      {/* Decorative quote marks */}
                      <div className="absolute top-4 right-6 text-6xl font-serif text-gray-200/50">
                        "
                      </div>

                      <div className="flex gap-5">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg h-fit">
                          <FileText className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <p className="text-sm font-semibold text-gray-700">
                              About this product
                            </p>
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                              Full Description
                            </span>
                          </div>

                          <p className="text-gray-700 leading-relaxed text-base">
                            {product?.description ||
                              "No description available for this product."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Section - Full Width */}
              <div className="w-full mt-2">
                <div className="relative group">
                  {/* Animated background decoration */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                  {/* Main card with glass morphism */}
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -ml-20 -mb-20" />

                    {/* Header Section */}
                    <div className="relative flex items-center justify-between mb-4 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Customer Reviews
                        </span>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full border border-purple-200">
                        1,247 Reviews
                      </span>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200/80 hover:border-blue-400/50 hover:shadow-xl transition-all duration-300 p-5">
                        <div className="flex gap-4">
                          {/* User Avatar */}
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              RS
                            </div>
                          </div>

                          {/* Review Content */}
                          <div className="flex-1">
                            {/* User Info and Rating */}
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  Rahul Sharma
                                </h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">
                                    2 days ago
                                  </span>
                                  <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                    Verified Purchase
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Rating
                                  name="read-only"
                                  value={5}
                                  readOnly
                                  size="small"
                                />
                              </div>
                            </div>
                            {/* Review Text */}
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                              The iPhone 15 Pro Max is absolutely stunning! The
                              titanium build feels premium, and the A17 Pro chip
                              is blazing fast. Camera quality is outstanding,
                              especially in low light. Battery life easily lasts
                              a full day. Highly recommended!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-6">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#F3F4F6",
                          color: "#4B5563",
                          padding: "12px 32px",
                          borderRadius: "12px",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          textTransform: "none",
                          border: "1px solid #E5E7EB",
                          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                          transition: "all 300ms",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          "&:hover": {
                            backgroundColor: "#E5E7EB",
                            color: "#1F2937",
                            boxShadow:
                              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                          },
                          "& .MuiButton-startIcon": {
                            marginRight: "4px",
                          },
                        }}
                        startIcon={<RefreshCw size={16} />}
                      >
                        Load More Reviews
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <CircularProgress color="inherit" />
            </div>
          )}

          {/* Product Details Section */}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
