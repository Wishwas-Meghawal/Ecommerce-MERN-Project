import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaUsers, FaShoppingCart, FaBoxes, FaTags } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { MdBarChart, MdPieChart, MdShowChart } from "react-icons/md";
import { TbChartBar, TbChartPie } from "react-icons/tb";
import { FiTrendingUp } from "react-icons/fi";

const DashboardBoxes = (props) => {
  // Tumhare exactly waise hi props - koi extra data nahi
  const cards = [
    {
      id: 1,
      title: "Total Users",
      value: props?.users,
      icon: <FaUsers className="w-6 h-6 text-white" />,
      chartIcon: <MdShowChart className="w-5 h-5" />,
      color: "red",
      trend: "+12.5%",
      trendUp: true,
      bgGradient: "from-red-500/10 via-red-400/5 to-red-500/10",
      iconGradient: "from-red-500 to-red-600",
      textColor: "text-red-700/80",
      chartColor: "#ef4444"
    },
    {
      id: 2,
      title: "Total Orders",
      value: props?.orders,
      icon: <FaShoppingCart className="w-6 h-6 text-white" />,
      chartIcon: <TbChartBar className="w-5 h-5" />,
      color: "green",
      trend: "+40.9%",
      trendUp: true,
      bgGradient: "from-green-500/10 via-green-400/5 to-green-500/10",
      iconGradient: "from-green-500 to-green-600",
      textColor: "text-green-700/80",
      chartColor: "#22c55e"
    },
    {
      id: 3,
      title: "Total Products",
      value: props?.products,
      icon: <FaBoxes className="w-6 h-6 text-white" />,
      chartIcon: <MdBarChart className="w-5 h-5" />,
      color: "blue",
      trend: "+64.7%",
      trendUp: true,
      bgGradient: "from-blue-500/10 via-blue-400/5 to-blue-500/10",
      iconGradient: "from-blue-500 to-blue-600",
      textColor: "text-blue-700/80",
      chartColor: "#3b82f6"
    },
    {
      id: 4,
      title: "Total Categories",
      value: props?.category,
      icon: <FaTags className="w-6 h-6 text-white" />,
      chartIcon: <TbChartPie className="w-5 h-5" />,
      color: "purple",
      trend: "-23.6%",
      trendUp: false,
      bgGradient: "from-purple-500/10 via-purple-400/5 to-purple-500/10",
      iconGradient: "from-purple-500 to-purple-600",
      textColor: "text-purple-700/80",
      chartColor: "#a855f7"
    },
  ];

  return (
    <>
      <style jsx>{`
        .dashboardBoxesSlider .swiper-button-next,
        .dashboardBoxesSlider .swiper-button-prev {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          
          transition: all 0.3s ease;
        }
        .dashboardBoxesSlider .swiper-button-next:hover,
        .dashboardBoxesSlider .swiper-button-prev:hover {
          background: white;
          transform: scale(1.1);
          
        }
        .dashboardBoxesSlider .swiper-button-next:after,
        .dashboardBoxesSlider .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
          color: #374151;
        }
        .dashboardBoxesSlider .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .card-slide {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>

      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <div
              className={`
                card-slide group relative p-6 rounded-2xl 
                bg-gradient-to-br ${card.bgGradient}
                min-h-[200px] flex flex-col justify-between 
                backdrop-blur-sm border border-white/30
                transition-all duration-300  hover:scale-[1.02]
                cursor-pointer overflow-hidden
              `}
              role="article"
              aria-label={`${card.title}: ${card.value?.toLocaleString()}`}
            >
              {/* Decorative Background Chart */}
              <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                {card.id === 1 && <MdShowChart className="w-32 h-32" />}
                {card.id === 2 && <TbChartBar className="w-32 h-32" />}
                {card.id === 3 && <MdBarChart className="w-32 h-32" />}
                {card.id === 4 && <TbChartPie className="w-32 h-32" />}
              </div>

              {/* Mini Bar Chart Indicator */}
              <div className="absolute top-4 right-4 flex items-end gap-0.5 h-8 opacity-40 group-hover:opacity-70 transition-opacity">
                <div className={`w-1 h-2 bg-${card.color}-500 rounded-sm animate-pulse`} style={{ backgroundColor: card.chartColor }}></div>
                <div className={`w-1 h-4 bg-${card.color}-500 rounded-sm animate-pulse delay-75`} style={{ backgroundColor: card.chartColor }}></div>
                <div className={`w-1 h-3 bg-${card.color}-500 rounded-sm animate-pulse delay-150`} style={{ backgroundColor: card.chartColor }}></div>
                <div className={`w-1 h-5 bg-${card.color}-500 rounded-sm animate-pulse delay-300`} style={{ backgroundColor: card.chartColor }}></div>
                <div className={`w-1 h-2 bg-${card.color}-500 rounded-sm animate-pulse delay-450`} style={{ backgroundColor: card.chartColor }}></div>
              </div>

              {/* Top Section */}
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Main Icon with Gradient */}
                    <div
                      className={`
                        p-3 bg-gradient-to-br ${card.iconGradient} 
                        rounded-xl shadow-lg group-hover:shadow-xl 
                        transition-all duration-300 group-hover:scale-110
                      `}
                      aria-hidden="true"
                    >
                      {card.icon}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`
                            text-xs font-bold ${card.textColor} 
                            tracking-wider uppercase
                          `}
                        >
                          {card.title}
                        </h3>
                        {/* Chart Icon Indicator */}
                        <span className="text-gray-400/60 group-hover:text-gray-600 transition-colors" aria-hidden="true">
                          {card.chartIcon}
                        </span>
                      </div>
                      
                      <div className="flex items-baseline gap-2 mt-1">
                        <b className="text-3xl font-bold text-gray-900 tracking-tight">
                          {card.value?.toLocaleString() || 0}
                        </b>
                        
                        
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon with Animation */}
                  <div
                    className={`
                      ${card.color === 'red' ? 'text-red-400/40' : 
                        card.color === 'green' ? 'text-green-400/40' : 
                        card.color === 'blue' ? 'text-blue-400/40' : 
                        'text-purple-400/40'}
                      transform transition-all duration-300 
                      group-hover:translate-x-1 group-hover:scale-110
                    `}
                    aria-hidden="true"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default DashboardBoxes;