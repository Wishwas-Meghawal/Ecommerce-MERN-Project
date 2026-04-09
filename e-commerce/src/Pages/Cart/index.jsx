import React, { use, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { BsFillBagCheckFill } from "react-icons/bs";
import CartItems from "./CartItems";
import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const context = useContext(MyContext);
  const [productSizeData, setProductSizeData] = useState([]);
  const [productRamsData, setProductRamsData] = useState([]);
  const [productWeightData, setProductWeightData] = useState([]);

  useEffect(() => {
    fetchDataFromApi("/api/product/productSIZE/get").then((res) => {
      if (res?.error === false) {
        setProductSizeData(res?.data);
      }
    });
    fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
      if (res?.error === false) {
        setProductRamsData(res?.data);
      }
    });
    fetchDataFromApi("/api/product/productWEIGHT/get").then((res) => {
      if (res?.error === false) {
        setProductWeightData(res?.data);
      }
    });
  }, []);

  const selectedSize = (item) => {
    if (item?.size !== "") {
      return item?.size;
    }
    if (item?.weigth !== "") {
      return item?.weight;
    }
    if (item?.ram !== "") {
      return item?.ram;
    }
  };

  return (
    <section className="section py-10 pb-10">
      <div className="container w-[80%] max-w-[80%] flex gap-5">
        <div className="leftPart w-[70%]">
          <div className="shadow-md rounded-md  bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>Your Cart</h2>
              <p className="mt-0 ">
                There are{" "}
                <span className="font-bold text-primary">
                  {context?.cartData?.length}
                </span>{" "}
                products in your cart
              </p>
            </div>

            {context?.cartData?.length !== 0 ? (
              context?.cartData?.map((item, index) => {
                return (
                  <CartItems
                    selected={() => selectedSize(item)}
                    qty={item?.quantity}
                    key={item?._id}
                    item={item}
                    productSizeData={productSizeData}
                    productRamsData={productRamsData}
                    productWeightData={productWeightData}
                  />
                );
              })
            ) : (
              <>
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <div className="flex flex-col items-center text-center p-5 max-w-sm">
                    {/* Icon Container */}
                    <div className="w-40 h-40 flex items-center justify-center rounded-full  mb-3">
                      <img src="/empty-cart.png" alt="" />
                    </div>

                    {/* Title */}
                    <h2 className="flex gap-3 items-center justify-center text-lg font-semibold text-gray-800">
                      Your cart feels lonely
                      <ShoppingCart className="w-5 h-5 text-gray-400" />
                    </h2>

                    {/* Subtitle */}
                    <p className="text-sm text-gray-500 mt-2">
                      Looks like you haven’t added anything yet. Start exploring
                      and fill it up!
                    </p>

                    <Link to="/">
                      <Button
                        variant="contained"
                        onClick={context.toggleCartpanel(false)}
                        sx={{
                          mt: 3,
                          px: 4,
                          py: 1.3,
                          borderRadius: "999px",
                          textTransform: "none",
                          fontWeight: 600,
                          background:
                            "linear-gradient(135deg, #ff9900, #ffb84d)",
                          color: "#000",
                          boxShadow: "0 4px 14px rgba(255,153,0,0.4)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #e68a00, #ffa31a)",
                            boxShadow: "0 6px 18px rgba(255,153,0,0.6)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        Continue Shopping
                      </Button>  
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="rightPart w-[30%]">
          <div className="shadow-md rounded-md bg-white p-5 sticky top-[165px] z-[90]">
            <h3 className="pb-3">CART TOTALS</h3>
            <hr />
            <p className="flex items-center justify-between">
              <spna className="text-[14px] font-[500]">Subtotal</spna>
              <spna className="text-primary font-bold">
                {(context?.cartData?.length !== 0
                  ? context?.cartData
                      ?.map((item) => parseInt(item?.price) * item.quantity)
                      .reduce((total, value) => total + value, 0)
                  : 0
                )?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </spna>
            </p>
            <p className="flex items-center justify-between">
              <spna className="text-[14px] font-[500]">Shipping</spna>
              <spna className=" font-bold">Free</spna>
            </p>
            <p className="flex items-center justify-between">
              <spna className="text-[14px] font-[500]">Estimate for</spna>
              <spna className=" font-bold">United Kingdom</spna>
            </p>
            <p className="flex items-center justify-between">
              <spna className="text-[14px] font-[500]">Total</spna>
              <spna className="text-primary font-bold">
                {(context?.cartData?.length !== 0
                  ? context?.cartData
                      ?.map((item) => parseInt(item?.price) * item.quantity)
                      .reduce((total, value) => total + value, 0)
                  : 0
                )?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </spna>
            </p>
            <br />

            <Button className="btn-org btn-lg w-full flex gap-2">
              <BsFillBagCheckFill className="text-[20px]" />
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
