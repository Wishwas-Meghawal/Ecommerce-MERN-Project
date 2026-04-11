import React, { useContext, useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { TbTruckDelivery } from "react-icons/tb";
import { FiHeart } from "react-icons/fi";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { MdOutlineShoppingCart } from "react-icons/md";
import QtyBox from "../../components/QtyBox";
import { MyContext } from "../../App";

import { postData } from "../../utils/api";
import { CircularProgress } from "@mui/material";

const ProductDetailsComponent = (props) => {
  const context = useContext(MyContext);
  const [activeSize, setActiveSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedName, setSelectedName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tabError, setTabError] = useState(false);

  const handleSelectQty = (qty) => {
    setQuantity(qty);
  };

  const handleClickActiveTab = (index, name) => {
    setActiveSize(index);
    setSelectedName(name);
  };

  const addToCart = (product, userId, quantity) => {
    if (userId === undefined) {
      alertBox("Please login to add items to cart", "error");
      return false;
    }

    const productItem = {
      _id: product?._id,
      productTitle: product?.name,
      image: product?.images[0],
      rating: product?.rating,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      productId: product?._id,
      coutInStock: product?.coutInStock,
      userId: userId,
      brand: product?.brand,
      size: props?.item?.size?.length !== 0 ? selectedName : "",
      weight: props?.item?.productWeight?.length !== 0 ? selectedName : "",
      ram: props?.item?.productRam?.length !== 0 ? selectedName : "",
    };

    if (
      props?.item?.size?.length !== 0 ||
      props?.item?.productWeight?.length !== 0 ||
      props?.item?.productRam?.length !== 0
    ) {
      if (selectedName !== null) {
        setIsLoading(true);
        postData("/api/cart/add", productItem).then((res) => {
          if (res?.error === false) {
            context?.alertBox(res?.message, "success");

            context?.getCartItems();
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          } else {
            context?.alertBox(res?.message, "error");
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }
        });
      } else {
        setTabError(true);
      }
    }else{
      setIsLoading(true);
      postData("/api/cart/add", productItem).then((res) => {
          if (res?.error === false) {
            context?.alertBox(res?.message, "success");

            context?.getCartItems();
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          } else {
            context?.alertBox(res?.message, "error");
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }
        });
    }
  };
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
        <span
          className="text-sm text-gray-500 hover:text-primary cursor-pointer"
          onClick={props.gotoReviews}
        >
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
                  key={index}
                  variant={activeSize === index ? "contained" : "outlined"}
                  onClick={() => handleClickActiveTab(index, item)}
                  sx={{
                    minWidth: "46px",
                    height: "42px",
                    borderRadius: "5px",
                    fontWeight: 600,

                    backgroundColor:
                      activeSize === index ? "#ff5252" : "transparent",

                    color:
                      activeSize === index
                        ? "#fff"
                        : tabError
                          ? "#ef4444" // 🔴 text red when error
                          : "#111",

                    border: tabError
                      ? "1px solid #ef4444" // 🔴 ERROR BORDER
                      : "1px solid rgba(0,0,0,0.15)",

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

      {props?.item?.productWeight?.length !== 0 && (
        <div className=" flex items-center  gap-3 mb-6">
          <p className="text-[18px] font-semibold text-gray-700 ">WEIGHT:</p>

          <div className="flex items-center  gap-1">
            {props?.item?.productWeight?.map((item, index) => {
              return (
                <Button
                  key={index}
                  variant={activeSize === index ? "contained" : "outlined"}
                  onClick={() => handleClickActiveTab(index, item)}
                  sx={{
                    minWidth: "46px",
                    height: "42px",
                    borderRadius: "5px",
                    fontWeight: 600,

                    backgroundColor:
                      activeSize === index ? "#ff5252" : "transparent",

                    color:
                      activeSize === index
                        ? "#fff"
                        : tabError
                          ? "#ef4444" // 🔴 text red when error
                          : "#111",

                    border: tabError
                      ? "1px solid #ef4444" // 🔴 ERROR BORDER
                      : "1px solid rgba(0,0,0,0.15)",

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
                  key={index}
                  variant={activeSize === index ? "contained" : "outlined"}
                  onClick={() => handleClickActiveTab(index, item)}
                  sx={{
                    minWidth: "46px",
                    height: "42px",
                    borderRadius: "5px",
                    fontWeight: 600,

                    backgroundColor:
                      activeSize === index ? "#ff5252" : "transparent",

                    color:
                      activeSize === index
                        ? "#fff"
                        : tabError
                          ? "#ef4444" // 🔴 text red when error
                          : "#111",

                    border: tabError
                      ? "1px solid #ef4444" // 🔴 ERROR BORDER
                      : "1px solid rgba(0,0,0,0.15)",

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
          <QtyBox handleSelectQty={handleSelectQty} />
        </div>
        <Button
          className="bg-primary! min-w-[200px]!"
          variant="contained"
          onClick={() =>
            addToCart(props?.item, context?.userData?._id, quantity)
          }
          sx={{
            height: "40px",
            fontWeight: 600,
            gap: 2,
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} sx={{ color: "#fff !important" }} />
          ) : (
            <>
              <MdOutlineShoppingCart size={20} />
              ADD TO CART
            </>
          )}
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
