import React, { use, useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, styled, Typography } from "@mui/material";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MyContext } from "../../App";
import { FiEdit2, FiPlus } from "react-icons/fi";
import Radio from "@mui/material/Radio";
import { Box, Briefcase, Home } from "lucide-react";
import { MapPinOff } from "lucide-react";
import { data, Link, useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { deleteData, postData } from "../../utils/api";
import { GiTakeMyMoney } from "react-icons/gi";

const VITE_APP_RAZORPAY_KEY_ID = import.meta.env.VITE_APP_RAZORPAY_KEY_ID;
const VITE_APP_RAZORPAY_KEY_SECRET = import.meta.env
  .VITE_APP_RAZORPAY_KEY_SECRET;

const Checkout = () => {
  const context = useContext(MyContext);
  const history = useNavigate();
  const [isChecked, setIsChecked] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    setSelectedAddress(context?.userData?.address_details[0]?._id);
  });

  useEffect(() => {
    setTotalAmount(
      context.cartData?.length !== 0
        ? context.cartData
            ?.map((item) => parseInt(item.price) * item.quantity)
            .reduce((total, value) => total + value, 0)
        : 0,
    )?.toLocaleString("en-US", { style: "currency", currency: "INR" });

    // localStorage.setItem("totalAmount" , context.cartData?.length !== 0 ?
    //   context.cartData?.map(item => parseInt(item.price) * item.quantity)
    //   .reduce((total, value)=> total + value, 0): 0)
    // ?.toLocaleString('en-US',{style: 'currency', currency: 'INR'})
  }, [context.cartData]);

  const handleEditAddress = (id) => {
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
  };

  const handleChange = (event, index) => {
    if (event.target.checked) {
      setIsChecked(index);
      setSelectedAddress(event.target.value);
    }
  };

  const checkout = (e) => {
    e.preventDefault();

    var options = {
      key: VITE_APP_RAZORPAY_KEY_ID,
      key_secret: VITE_APP_RAZORPAY_KEY_SECRET,
      amount: parseInt(totalAmount * 100),
      currency: "INR",
      order_receipt: context?.usrData?.name,
      name: "CLASSYSHOP",
      description: "Test Transaction",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;

        const user = context?.userData;

        const payLoad = {
          userId: user?._id,
          products: context?.cartData,
          paymentId: paymentId,
          payment_status: "COMPLETED",
          delivery_address: selectedAddress,
          totalAmt: totalAmount,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };

        postData(`/api/order/create`, payLoad).then((res) => {
          context?.alertBox(res?.message, "success");
          if (res?.error === false) {
            deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
              context?.getCartItems();
            });
            history("/");
          } else {
            context?.alertBox(res?.message, "error");
          }
        });
      },
      theme: {
        color: "#ff5252",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };


  const cashOnDelivery = () =>{
    const user  = context?.userData;

    const payLoad = {
          userId: user?._id,
          products: context?.cartData,
          paymentId: '',
          payment_status: "CASH ON DELIVERY",
          delivery_address: selectedAddress,
          totalAmt: totalAmount,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };

         postData(`/api/order/create`, payLoad).then((res) => {
          context?.alertBox(res?.message, "success");
          if (res?.error === false) {
            deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
              context?.getCartItems();
            });
            history("/");
          } else {
            context?.alertBox(res?.message, "error");
          }
        });
  }

  return (
    <section className="py-10">
      <form onSubmit={checkout}>
        <div className="container flex gap-5">
          <div className="leftCol w-[70%]">
            <div className="card bg-white shadow-md rounded-md p-5 w-full">
              <div className="flex items-center justify-between">
                <h2>Select Delivery Address</h2>
                <Button
                  variant="outlined"
                  onClick={() => {
                    context?.setOpenAddressPanel(true);
                    context?.setAddressMode("add");
                  }}
                  className="h-[40px] px-6 rounded-2xl  text-white font-semibold text-[15px]  transition-all duration-300 flex items-center gap-2 tracking-wide"
                >
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <FiPlus className="text-[18px]" />
                  </span>
                  ADD NEW ADDRESS
                </Button>
              </div>

              <div className="w-full bg-white p-6 mt-3">
                {context?.userData?.address_details?.length !== 0 ? (
                  context?.userData?.address_details?.map((address, index) => {
                    return (
                      <div key={index} className="space-y-5">
                        <div
                          className={`border border-[rgba(0,0,0,0.1)]  rounded-sm  p-5 mb-3 transition-all duration-300 shadow-sm ${isChecked === index && "bg-[#fff2f2]"}`}
                        >
                          {/* Top */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-4 w-full">
                              {/* Radio */}
                              <div>
                                <Radio
                                  checked={isChecked === index}
                                  onChange={(event) =>
                                    handleChange(event, index)
                                  }
                                  value={address._id}
                                  sx={{
                                    padding: "2px",
                                    "&.Mui-checked": { color: "#2563eb" },
                                  }}
                                />
                              </div>

                              {/* Content */}
                              <div className="w-full">
                                <span
                                  className={`w-fit flex items-center gap-1 text-[10px] px-2 py-[2px] rounded-full font-medium
                                ${
                                  address.addressType === "Home"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-purple-100 text-purple-600"
                                }`}
                                >
                                  {address.addressType === "Home" ? (
                                    <Home size={12} />
                                  ) : (
                                    <Briefcase size={12} />
                                  )}
                                  {address.addressType}
                                </span>
                                <h3 className="text-[20px] font-bold text-gray-800 mb-2">
                                  {context?.userData?.name}
                                </h3>

                                <p className="text-sm text-gray-600">
                                  {[
                                    address?.address_line,
                                    address?.city,
                                    address?.state,
                                  ]
                                    .filter(Boolean)
                                    .join(", ")}

                                  {address?.pincode && (
                                    <>
                                      {" - "}
                                      <span className="font-semibold text-gray-800">
                                        {address.pincode}
                                      </span>
                                    </>
                                  )}
                                </p>

                                <p className="text-[15px] font-bold text-gray-700">
                                  Mobile : {context?.userData?.mobile}
                                </p>
                              </div>
                            </div>

                            {/* Edit */}
                            <Button
                              variant="contained"
                              startIcon={<FiEdit2 size={16} />}
                              sx={{
                                minWidth: "fit-content",
                                px: 2.2,
                                height: 40,
                                textTransform: "none",
                                fontSize: "14px",
                                fontWeight: 700,

                                background: "#eff6ff",
                                color: "#2563eb",
                                boxShadow: "0 2px 8px rgba(37,99,235,0.12)",

                                transition: "all 0.3s ease",

                                "&:hover": {
                                  background:
                                    "linear-gradient(135deg, #3b82f6, #06b6d4)",
                                  color: "#fff",
                                  boxShadow: "0 8px 20px rgba(59,130,246,0.35)",
                                  transform: "translateY(-2px) scale(1.03)",
                                },

                                "&:active": {
                                  transform: "scale(0.98)",
                                },
                              }}
                              onClick={() => handleEditAddress(address?._id)}
                            >
                              EDIT
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="w-full h-full flex items-center justify-center ">
                      <div className="flex flex-col items-center text-center p-6 max-w-sm">
                        {/* Icon Container */}
                        <div className="w-40 h-40 flex items-center justify-center rounded-full  mb-4">
                          <img src="/noaddress.png" alt="" />
                        </div>

                        {/* Title */}
                        <h2 className="flex gap-3 items-center justify-center text-lg font-semibold text-gray-800">
                          No Address Found
                          <MapPinOff className="w-5 h-5 text-gray-400" />
                        </h2>

                        {/* Subtitle */}
                        <p className="text-sm text-gray-500 mt-2">
                          You haven’t added any delivery address yet. Add a new
                          address to continue.
                        </p>

                        <Link to="/address">
                          <Button
                            variant="contained"
                            startIcon={<MdHome />}
                            sx={{
                              mt: 3,
                              px: 4,
                              py: 1.2,
                              borderRadius: "999px",
                              textTransform: "none",
                              fontWeight: 600,
                              background:
                                "linear-gradient(135deg, #ff4d4d, #ff6a6a)",
                              color: "#fff",
                              boxShadow: "0 4px 14px rgba(255, 77, 77, 0.4)",
                              transition: "all 0.3s ease",

                              "&:hover": {
                                background:
                                  "linear-gradient(135deg, #e04343, #ff5252)",
                                boxShadow: "0 6px 18px rgba(255, 77, 77, 0.6)",
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            Add Address
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="rightCol w-full lg:w-[32%]">
            <div className="relative overflow-hidden rounded-md border border-gray-200 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]">
              <div className="p-6">
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-[22px] font-bold text-gray-800 tracking-tight">
                      Your Order
                    </h2>
                  </div>
                </div>

                {/* Head Row */}
                <div className="flex items-center justify-between rounded-md bg-gray-50 px-4 py-3 mb-4 border border-gray-100">
                  <span className="text-[13px] font-semibold uppercase tracking-wide text-gray-500">
                    Product
                  </span>
                  <span className="text-[13px] font-semibold uppercase tracking-wide text-gray-500">
                    Subtotal
                  </span>
                </div>

                {/* Product List */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {context?.cartData?.length > 0 &&
                    context?.cartData?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="group flex items-center justify-between rounded-md border border-gray-100 bg-white px-3 py-3 transition-all duration-300 hover:shadow-md hover:border-orange-200"
                        >
                          {/* Left */}
                          <div className="flex items-center gap-3 w-[70%]">
                            {/* Image */}
                            <div className="w-[58px] h-[58px] overflow-hidden rounded-md bg-gray-100 shrink-0">
                              <img
                                src={item?.image}
                                alt=""
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>

                            {/* Info */}
                            <div className="w-full">
                              <h4
                                title={item?.productTitle}
                                className="text-[14px] font-semibold text-gray-800 leading-5 line-clamp-2"
                              >
                                {item?.productTitle}
                              </h4>

                              <div className="mt-1 flex items-center gap-2 text-[13px] text-gray-500">
                                <span>Qty: {item?.quantity}</span>
                                <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                                <span>
                                  {item?.price?.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "INR",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Price */}
                          <span className="text-[14px] font-bold text-gray-800">
                            {(item?.quantity * item?.price)?.toLocaleString(
                              "en-US",
                              {
                                style: "currency",
                                currency: "INR",
                              },
                            )}
                          </span>
                        </div>
                      );
                    })}
                </div>

                {/* Divider */}
                <div className="my-5 border-t border-dashed border-gray-200"></div>

                {/* Button */}
                <div>
                  <Button
                    type="submit"
                    className="btn-org btn-lg w-full  gap-2"
                  >
                    <BsFillBagCheckFill className="text-[20px]" />
                    Secure Checkout
                  </Button>
                  <Button  className="btn-dark btn-lg w-full gap-2" onClick={cashOnDelivery}>
                    <GiTakeMyMoney className="text-[20px]" />
                    Cash On Delivery
                  </Button>
                </div>

                <p className="text-center text-xs text-gray-400 mt-3">
                  Safe & encrypted payment gateway
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
