import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { TbTruckDelivery } from "react-icons/tb";
import { FiHeart } from "react-icons/fi";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { MdOutlineShoppingCart } from "react-icons/md";
import QtyBox from "../../components/QtyBox";

const ProductDetailsComponent = (props) => {
  const [activeSize, setActiveSize] = useState(null);
  return (
    <>
      {/* Title */}
      <h1 className="text-[28px] font-semibold text-gray-800 mb-2">
        {props?.item?.name}
      </h1>

      {/* Brand + Rating */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-500">
          Brand :
          <span className="font-medium text-gray-800 ml-1">
            {props?.item?.brand}
          </span>
        </span>

        <Rating value={4.5} precision={0.5} readOnly size="small" />
        <span className="text-sm text-gray-500 hover:text-primary cursor-pointer" onClick={props.gotoReviews}>
          ({props.reviewsCount} Reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4 mb-5">
        <span className="text-gray-400 line-through text-lg">
          ₹{props?.item?.oldPrice}
        </span>
        <span className="text-red-500 text-2xl font-semibold">
          ₹{props?.item?.price}
        </span>
        <span className="text-green-600 text-sm font-medium">
          In Stock: <b>{props?.item?.coutInStock} Items</b>
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-7 mb-3">{props.item?.description}</p>

      {/* SIZE (Flipkart Style) */}

      {props?.item?.productRam?.length !== 0 && (
        <div className=" flex items-center  gap-3 mb-6">
          <p className="text-[18px] font-semibold text-gray-700 ">RAM:</p>

          <div className="flex items-center  gap-1">
            {props?.item?.productRam?.map((item, index) => {
              return (
                <Button
                  className="border! border-[rgba(0,0,0,0.1)]!"
                  key={index}
                  variant={activeSize === index ? "contained" : "outlined"}
                  onClick={() => setActiveSize(index)}
                  sx={{
                    minWidth: "46px",
                    height: "42px",
                    borderRadius: "5px",
                    fontWeight: 600,

                    // CONDITION BASED COLOR
                    backgroundColor:
                      activeSize === index ? "#ff5252" : "transparent",
                    color: activeSize === index ? "#fff" : "#111",
                    border: "1px solid rgba(0,0,0,0.15)",

                    "&:hover": {
                      backgroundColor:
                        activeSize === index ? "#e04848" : "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  {itme}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {props?.item?.productWeight?.length !== 0 && (
        <div className=" flex items-center  gap-3 mb-6">
          <p className="text-[18px] font-semibold text-gray-700 ">WEIGHT:</p>

          <div className="flex items-center  gap-1">
            {props?.item?.productWeight?.map((item, index) => {
              return (
                <Button
                  className="border! border-[rgba(0,0,0,0.1)]!"
                  key={index}
                  variant={activeSize === index ? "contained" : "outlined"}
                  onClick={() => setActiveSize(index)}
                  sx={{
                    minWidth: "46px",
                    height: "42px",
                    borderRadius: "5px",
                    fontWeight: 600,

                    // CONDITION BASED COLOR
                    backgroundColor:
                      activeSize === index ? "#ff5252" : "transparent",
                    color: activeSize === index ? "#fff" : "#111",
                    border: "1px solid rgba(0,0,0,0.15)",

                    "&:hover": {
                      backgroundColor:
                        activeSize === index ? "#e04848" : "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {props?.item?.size?.length !== 0 && (
        <div className=" flex items-center  gap-3 mb-6">
          <p className="text-[18px] font-semibold text-gray-700 ">SIZE:</p>

          <div className="flex items-center  gap-1">
            {props?.item?.size?.map((item, index) => {
              return (
                <Button
                  className="border! border-[rgba(0,0,0,0.1)]!"
                  key={index}
                  variant={activeSize === index ? "contained" : "outlined"}
                  onClick={() => setActiveSize(index)}
                  sx={{
                    minWidth: "46px",
                    height: "42px",
                    borderRadius: "5px",
                    fontWeight: 600,

                    // CONDITION BASED COLOR
                    backgroundColor:
                      activeSize === index ? "#ff5252" : "transparent",
                    color: activeSize === index ? "#fff" : "#111",
                    border: "1px solid rgba(0,0,0,0.15)",

                    "&:hover": {
                      backgroundColor:
                        activeSize === index ? "#e04848" : "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Shipping */}
      <p className="flex items-center gap-2 text-gray-700 mb-6">
        <TbTruckDelivery size={20} className="text-green-600" />
        Free Shipping
        <span className="text-gray-500">(2–3 Days Delivery)</span>
      </p>

      {/* Cart */}
      <div className="flex items-center mt-4 gap-4 mb-6">
        {/* Quantity Control */}
        <div className="qtyBoxWrapper w-[80px] h-[40px]">
          <QtyBox />
        </div>
        <Button
          className="bg-primary!"
          variant="contained"
          sx={{
            height: "40px",
            fontWeight: 600,
            gap: 2,
          }}
        >
          <MdOutlineShoppingCart size={20} />
          ADD TO CART
        </Button>
      </div>

      {/* Wishlist & Compare */}
      <div className="flex items-center gap-6">
        <Button
          variant="text"
          startIcon={<FiHeart size={18} />}
          sx={{
            color: "#374151",
            textTransform: "none",
            "&:hover": { color: "#ef4444" },
          }}
        >
          Add to Wishlist
        </Button>

        <Button
          variant="text"
          startIcon={<HiOutlineArrowsRightLeft size={18} />}
          sx={{
            color: "#374151",
            textTransform: "none",
            "&:hover": { color: "#ef4444" },
          }}
        >
          Add to Compare
        </Button>
      </div>
    </>
  );
};

export default ProductDetailsComponent;
