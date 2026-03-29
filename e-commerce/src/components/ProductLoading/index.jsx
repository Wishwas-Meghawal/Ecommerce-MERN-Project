import React from "react";

const ProductLoading = () => {
  return (
    <div className="grid grid-cols-5 gap-5">
      
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="relative bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden animate-pulse w-[250px]"
        >
          
          {/* Discount Badge */}
          <div className="absolute top-3 left-3 h-5 w-16 bg-gray-200 rounded-full z-10"></div>

          {/* Image Section */}
          <div className="relative h-[300px] bg-gray-200 flex items-center justify-center">
            <div className="w-full h-full bg-gray-200"></div>

            {/* Floating Icons */}
            <div className="absolute top-4 right-4 flex flex-col gap-3">
              {[1,2,3,4].map((_, i) => (
                <div
                  key={i}
                  className="w-[45px] h-[45px] rounded-full bg-gray-200"
                ></div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
            
            {/* Brand */}
            <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>

            {/* Product Name */}
            <div className="space-y-2 mb-3">
              <div className="h-3 w-[80%] bg-gray-200 rounded"></div>
              <div className="h-3 w-[60%] bg-gray-200 rounded"></div>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-12 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>

            {/* Button */}
            <div className="h-9 w-full bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default ProductLoading;