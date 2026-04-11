
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { Button, Rating, IconButton, Chip, Zoom } from "@mui/material";
import { MdDelete, MdVisibility } from "react-icons/md";
import { deleteData } from "../../utils/api";
import { MyContext } from "../../App";

const MyListItems = (props) => {
  const context = useContext(MyContext);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleRemove = (id) => {
    deleteData(`/api/myList/${id}`).then((res) => {
      context?.alertBox("Product remove from My List ", "success");
      context?.getMyListData();
    });
  };

  const discountPercentage =
    props?.item?.discount ||
    Math.round(
      ((props?.item?.oldPrice - props?.item?.price) / props?.item?.oldPrice) *
        100,
    );

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="cartItem w-full p-4 flex items-start gap-5 border-b border-gray-100 hover:bg-gray-50 transition-all duration-300 relative overflow-hidden">
        {/* Image */}
        <div className="img w-[120px] md:w-[140px] flex-shrink-0 rounded-xl overflow-hidden shadow-md bg-gray-100">
          <Link to={`/product/${props?.item?.productId}`}>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <img
              src={props?.item?.image}
              alt={props?.item?.productTitle}
              className={`w-full h-[120px] md:h-[140px] object-cover transition-all duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />

            {discountPercentage > 0 && (
              <div className="absolute top-2 left-2">
                <Chip
                  label={`${discountPercentage}% OFF`}
                  size="small"
                  sx={{
                    bgcolor: "#ef4444",
                    color: "#fff",
                    fontSize: "10px",
                    height: "20px",
                  }}
                />
              </div>
            )}
          </Link>
        </div>

        {/* Info */}
        <div className="info flex-1 relative">
          {/* Delete Button */}
          {isHovered && (
            <div className="absolute -top-2 -right-2 z-10">
              <IconButton
                onClick={() => handleRemove(props?.item?._id)}
                size="small"
                sx={{
                  bgcolor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": {
                    bgcolor: "#ef4444",
                    "& svg": { color: "white" },
                  },
                }}
              >
                <MdDelete size={18} />
              </IconButton>
            </div>
          )}

          {/* Brand */}
          <span className="text-xs font-semibold text-primary/70 uppercase">
            {props?.item?.brand || "Premium Brand"}
          </span>

          {/* Title */}
          <Link to={`/product/${props?.item?.productId}`}>
            <h3 className="text-sm md:text-base font-semibold text-gray-800 mt-1 line-clamp-2 hover:text-red-500">
              {props?.item?.productTitle?.length > 80
                ? `${props?.item?.productTitle?.substr(0, 80)}...`
                : props?.item?.productTitle}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <Rating
              value={props?.item?.rating || 4}
              size="small"
              readOnly
              precision={0.5}
            />
            <span className="text-xs text-gray-500">
              ({props?.item?.reviewCount || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <span className="text-xl font-bold text-gray-900">
              ₹{props?.item?.price?.toLocaleString("en-IN")}
            </span>

            {props?.item?.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{props?.item?.oldPrice?.toLocaleString("en-IN")}
              </span>
            )}

            {discountPercentage > 0 && (
              <Chip
                label={`Save ₹${(
                  props?.item?.oldPrice - props?.item?.price
                )?.toLocaleString("en-IN")}`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: "#10b981",
                  color: "#10b981",
                  fontSize: "11px",
                  height: "22px",
                }}
              />
            )}
          </div>

          {/* Actions */}
          <Zoom in={isHovered}>
            <div className="mt-3 flex gap-2">
              <Link to={`/product/${props?.item?.productId}`}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<MdVisibility />}
                  sx={{
                    bgcolor: "#3b82f6",
                    textTransform: "none",
                    fontSize: "12px",
                    "&:hover": { bgcolor: "#2563ed" },
                  }}
                >
                  View Details
                </Button>
              </Link>
            </div>
          </Zoom>
        </div>
      </div>
    </div>
  );
};

export default MyListItems;
