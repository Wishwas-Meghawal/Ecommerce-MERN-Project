import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { AiOutlineAreaChart, AiTwotoneGift } from "react-icons/ai";

import { RiBarChartGroupedFill } from "react-icons/ri";
import { PiChartPieSlice } from "react-icons/pi";
import { BsBank, BsBarChart, BsGraphUp, BsPieChart } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaChartPie } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { TbChartBar } from "react-icons/tb";
import { FiTrendingUp } from "react-icons/fi";

const DashboardBoxes = () => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
          <div className="p-6 rounded-sm  bg-gradient-to-br from-red-500/10 via-red-400/5 to-red-500/10  min-h-[180px] flex flex-col justify-between  backdrop-blur-sm">
            {/* Top Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-sm">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7.704a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-red-700/80 tracking-wide">
                    Users
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <b className="text-2xl font-bold text-gray-900">26K</b>
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-700 rounded-full border border-red-300/50">
                      -12.4%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-red-400/60">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600/80">Previous: 29.7K</span>
                <div className="flex items-center gap-1">
                  <span className="text-red-600 font-medium">Decreased</span>
                </div>
              </div>
              <div className="mt-2 w-full bg-red-200/40 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                  style={{ width: "68%" }}
                ></div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="p-6 rounded-sm  bg-gradient-to-br from-green-500/10 via-green-400/5 to-green-500/10  min-h-[180px] flex flex-col justify-between  backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-green-700/80 tracking-wide">
                    Income
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <b className="text-2xl font-bold text-gray-900">$6,200</b>
                    <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-700 rounded-full border border-green-300/50">
                      +40.9%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-green-400/60">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600/80">Previous: $4,400</span>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 font-medium">Increased</span>
                </div>
              </div>
              <div className="mt-2 w-full bg-green-200/40 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="p-6 rounded-sm bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-500/10  min-h-[180px] flex flex-col justify-between   backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-700/80 tracking-wide">
                    Conversion Rate
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <b className="text-2xl font-bold text-gray-900">2.49%</b>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-700 rounded-full border border-blue-300/50">
                      +64.7%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-blue-400/60">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600/80">Previous: 1.51%</span>
                <div className="flex items-center gap-1">
                  <span className="text-blue-600 font-medium">Increased</span>
                </div>
              </div>
              <div className="mt-2 w-full bg-blue-200/40 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="p-6  rounded-sm bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-purple-500/10  min-h-[180px] flex flex-col justify-between  backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-purple-700/80 tracking-wide">
                    Sessions
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <b className="text-2xl font-bold text-gray-900">44K</b>
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-700 rounded-full border border-purple-300/50">
                      -23.6%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-purple-400/60">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600/80">Previous: 57.6K</span>
                <div className="flex items-center gap-1">
                  <span className="text-purple-600 font-medium">Decreased</span>
                </div>
              </div>
              <div className="mt-2 w-full bg-purple-200/40 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                  style={{ width: "58%" }}
                ></div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DashboardBoxes;
