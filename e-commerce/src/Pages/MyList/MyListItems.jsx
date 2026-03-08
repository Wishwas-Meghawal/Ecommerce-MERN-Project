import React, { useState } from "react";
import { Link } from "react-router-dom";

import { IoCloseSharp } from "react-icons/io5";
import { Button, Rating } from "@mui/material";


const MyListItems = (props) => {
  
  return (
    <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
      <div className="img w-[15%] rounded-md overflow-hidden">
        <Link to="/product/7845" className="group">
          <img
            src="https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
            alt=""
            className="w-full group-hover:scale-105 transition-all"
          />
        </Link>
      </div>

      <div className="info w-[85%] relative">
        <IoCloseSharp className="cursor-pointer absolute top-0 right-0 text-[22px] transition-all" />
        <span className="text-[13px]">Flying Machine</span>
        <h3 className="text-[15px]">
          <Link to="/" className="link">
            Men Pure Cotton Striped Casual Shirt
          </Link>
        </h3>
        <Rating
          value={4}
          size="small"
          readOnly
          className="mb-3"
          sx={{ color: "#f59e0b" }}
        />


        <div className="mb-2 mt-2 flex items-center gap-4">
          <span className="text-red-500 font-semibold text-[14px]">$23.00</span>
          <span className="line-through text-gray-400 text-[14px] font-medium">
            $24.00
          </span>
          <span className="text-red-500 font-semibold text-[14px]">5% OFF</span>
        </div>


        <Button className="btn-org btn-sm">Add to Cart</Button>
      </div>
    </div>
  );
};

export default MyListItems;
