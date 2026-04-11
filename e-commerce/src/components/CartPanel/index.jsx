import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import { MyContext } from "../../App";
import { deleteData } from "../../utils/api";

const CartPanel = (props) => {
  const context = useContext(MyContext);

  const removeItem = (id) => {
    deleteData(`/api/cart/delete-cart-item/${id}`).then((res) => {
      context?.alertBox("Cart item deleted successfully", "success");
      context?.getCartItems();
    });
  };
  return (
    <>
      <div className="scroll w-full max-h-[450px] overflow-y-scroll overflow-x-hidden py-3 px-4">
        {props?.data?.map((item, index) => {
          return (
            <div className="cartItem w-full flex items-center gap-4 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-all border border-[rgba(0,0,0,0.05)] mb-3">
              {/* Image */}
              <div className="img w-[22%] h-[90px] overflow-hidden rounded-lg bg-gray-100">
                <Link
                 to={`/product/${item?.productId}`}
                  className="block group h-full"
                >
                  <img
                    src={item?.image}
                    alt=""
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                  />
                </Link>
              </div>

              {/* Info */}
              <div className="info w-[78%] relative">
                {/* Title */}
                <h4 className="text-[15px] font-semibold text-gray-800 leading-tight line-clamp-2 pr-8">
                  <Link
                    to={`/product/${item?.productId}`}
                    className="hover:text-primary transition-all"
                  >
                    {item?.productTitle?.substr(0, 30) + "..."}
                  </Link>
                </h4>

                {/* Qty + Price */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    Qty:{" "}
                    <span className="font-medium text-gray-700">
                      {item?.quantity}
                    </span>
                  </span>

                  <span className="text-primary font-bold text-[15px]">
                    ₹{item?.price}
                  </span>
                </div>

                {/* Delete Icon */}
                <MdDeleteOutline
                  className="absolute top-0 right-0 cursor-pointer text-[22px] text-gray-400 hover:text-red-500 transition-all hover:scale-110"
                  onClick={() => removeItem(item?._id)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <br />
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] p-4">
        <div className="bottomInfo py-3 px-4  w-full  flex items-center justify-between flex-col">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">
              {context?.cartData?.length} item
            </span>
            <span className="text-primary font-bold">
              {(context?.cartData?.length !== 0
                ? context?.cartData
                    ?.map((item) => parseInt(item?.price) * item.quantity)
                    .reduce((total, value) => total + value, 0)
                : 0
              )?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-dashed border-gray-200"></div>

        <div className="bottomInfo py-3 px-4  w-full  flex items-center justify-between flex-col">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">Total(tax excl.)</span>
            <span className="text-primary font-bold">
              {(context?.cartData?.length !== 0
                ? context?.cartData
                    ?.map((item) => parseInt(item?.price) * item.quantity)
                    .reduce((total, value) => total + value, 0)
                : 0
              )?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
          <br />
          <div className="flex items-center justify-center w-full gap-3">
            <Link to="/cart" className="w-[50%] d-block" onClick={context.toggleCartpanel(false)}>
              <Button className="btn-org btn-lg w-full">View Cart</Button>
            </Link>

            <Link to="/checkout" className="w-[50%] d-block">
              <Button className="btn-org  btn-border btn-lg w-full">
                CHECKOUT
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPanel;
