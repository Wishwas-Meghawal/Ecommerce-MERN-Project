import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { IoCloseSharp } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { GoTriangleDown } from "react-icons/go";
import { Rating } from "@mui/material";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";

const CartItems = (props) => {
  const context = useContext(MyContext);
  const [sizeanchorEl, setSizeAnchorEl] = useState(null);
  const [selectedSize, setCartItems] = useState(props.selected);

  //const [productSizeData, setProductsizeData] = useState([]);
  const openSize = Boolean(sizeanchorEl);

  const [qtyanchorEl, setQtyAnchorEl] = useState(null);
  const [selectedQty, setSelectedQty] = useState(props.qty);
  const openQty = Boolean(qtyanchorEl);

  const handleClickSize = (event) => {
    setSizeAnchorEl(event.currentTarget);
  };
  const handleCloseSize = (value) => {
    setSizeAnchorEl(null);
    if (value !== null) {
      setCartItems(value);
    }
  };

  const handleClickQty = (event) => {
    setQtyAnchorEl(event.currentTarget);
  };
  const handleCloseQty = (value) => {
    setQtyAnchorEl(null);
    if (value !== null) {
      setSelectedQty(value);
      const cartObj = {
        _id: props?.item?._id,
        quantity: value,
        subTotal: props?.item?.price * value,
      };
      editData("/api/cart/update-quantity", cartObj).then((res) => {
        if (res?.data?.error === false) {
          context.alertBox(res?.data?.message, "success");
          context?.getCartItems();
        }
      });
    }
  };

  const updateCart = (selectedVal, qty, field) => {
    handleCloseSize(selectedVal);

    const cartObj = {
      _id: props?.item?._id,
      quantity: qty,
      subTotal: props?.item?.price * qty,
      size: props?.item?.size !== "" ? selectedVal : "",
      ram: props?.item?.ram !== "" ? selectedVal : "",
      weight: props?.item?.weight !== "" ? selectedVal : "",
    };

    // if product size available
    if (field === "size") {
      fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) => {
        const product = res?.product;

        const item = product?.size?.filter((size) =>
          size?.includes(selectedVal),
        );

        if (item?.length !== 0) {
          editData("/api/cart/update-quantity", cartObj).then((res) => {
            if (res?.data?.error === false) {
              context.alertBox(res?.data?.message, "success");
              context?.getCartItems();
            }
          });
        } else{
          context.alertBox(`Product not available with the size of ${selectedVal}`, "error");
        }
      });
    }

    //if product ram available
    if (field === "ram") {
      fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) => {
        const product = res?.product;

        const item = product?.productRam?.filter((ram) =>
          ram?.includes(selectedVal),
        );

        if (item?.length !== 0) {
          editData("/api/cart/update-quantity", cartObj).then((res) => {
            if (res?.data?.error === false) {
              context.alertBox(res?.data?.message, "success");
              context?.getCartItems();
            }
          });
        } else{
          context.alertBox(`Product not available with the ram of ${selectedVal}`, "error", "error");
        }
      });
    }

    // if product weight available
    if (field === "weight") {
      fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) => {
        const product = res?.product;

        const item = product?.productWeight?.filter((weight) =>
          weight?.includes(selectedVal),
        );

        if (item?.length !== 0) {
          editData("/api/cart/update-quantity", cartObj).then((res) => {
            if (res?.data?.error === false) {
              context.alertBox(res?.data?.message, "success");
              context?.getCartItems();
            }
          });
        } else{
          context.alertBox(`Product not available with the weight of ${selectedVal}`, "error", "error");
        }
      });
    }
  };

  const removeItem = (id) => {
    deleteData(`/api/cart/delete-cart-item/${id}`).then((res) => {
      context.alertBox("Product removed from cart", "success");
      context?.getCartItems();
    });
  };

  return (
    <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
      <div className="img w-[15%] rounded-md overflow-hidden">
        <Link to={`/product/${props?.item?.productId}`} className="group">
          <img
            src={props?.item?.image}
            alt=""
            className="w-full group-hover:scale-105 transition-all"
          />
        </Link>
      </div>

      <div className="info w-[85%] relative">
        <IoCloseSharp
          className="cursor-pointer absolute top-0 right-0 text-[22px] transition-all"
          onClick={() => removeItem(props?.item?._id)}
        />
        <span className="text-[13px]">{props?.item?.brand}</span>
        <h3 className="text-[15px]">
          <Link to={`/product/${props?.item?.productId}`} className="link">
            {props?.item?.productTitle}
          </Link>
        </h3>
        <Rating
          value={props?.item?.rating || 0}
          size="small"
          readOnly
          className="mb-1"
          sx={{ color: "#f59e0b" }}
        />

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
          {props?.item?.size !== "" && (
            <>
              {props?.productSizeData?.length !== 0 && (
                <div className="relative">
                  <span
                    className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-600 py-1 px-3 rounded-md cursor-pointer"
                    onClick={handleClickSize}
                  >
                    Size: {selectedSize} <GoTriangleDown />
                  </span>
                  <Menu
                    id="sizeMenu"
                    anchorEl={sizeanchorEl}
                    open={openSize}
                    onClose={() => handleCloseSize(null)}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    {props?.productSizeData?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          className={`${item?.name === selectedSize && "selected"}`}
                          onClick={() =>
                            updateCart(
                              item?.name,
                              props?.item?.quantity,
                              "size",
                            )
                          }
                        >
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </div>
              )}
            </>
          )}

          {props?.item?.ram !== "" && (
            <>
              {props?.productRamsData?.length !== 0 && (
                <div className="relative">
                  <span
                    className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-600 py-1 px-3 rounded-md cursor-pointer"
                    onClick={handleClickSize}
                  >
                    Ram: {selectedSize} <GoTriangleDown />
                  </span>
                  <Menu
                    id="sizeMenu"
                    anchorEl={sizeanchorEl}
                    open={openSize}
                    onClose={() => handleCloseSize(null)}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    {props?.productRamsData?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          className={`${item?.name === selectedSize && "selected"}`}
                          onClick={() =>
                            updateCart(item?.name, props?.item?.quantity, "ram")
                          }
                        >
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </div>
              )}
            </>
          )}

          {props?.item?.weight !== "" && (
            <>
              {props?.productWeightData?.length !== 0 && (
                <div className="relative">
                  <span
                    className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-600 py-1 px-3 rounded-md cursor-pointer"
                    onClick={handleClickSize}
                  >
                    Weigth: {selectedSize} <GoTriangleDown />
                  </span>
                  <Menu
                    id="sizeMenu"
                    anchorEl={sizeanchorEl}
                    open={openSize}
                    onClose={() => handleCloseSize(null)}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    {props?.productWeightData?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          className={`${item?.name === selectedSize && "selected"}`}
                          onClick={() =>
                            updateCart(
                              item?.name,
                              props?.item?.quantity,
                              "weight",
                            )
                          }
                        >
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </div>
              )}
            </>
          )}

          <div className="relative">
            <span
              className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-600 py-1 px-3 rounded-md cursor-pointer"
              onClick={handleClickQty}
            >
              Qty: {selectedQty} <GoTriangleDown />
            </span>
            <Menu
              id="sizeMenu"
              anchorEl={qtyanchorEl}
              open={openQty}
              onClose={() => handleCloseQty(null)}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              {Array.from({ length: 15 }).map((_, index) => (
                <MenuItem key={index} onClick={() => handleCloseQty(index + 1)}>
                  {index + 1}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        <div className="mb-3 mt-2 flex flex-wrap items-center gap-2 sm:gap-4">
          <span className="text-red-500 font-semibold text-[14px]">
            &#x20b9;{props?.item?.price}
          </span>
          <span className="line-through text-gray-400 text-[14px] font-[500]">
            &#x20b9;{props?.item?.oldPrice}
          </span>
          <span className="text-red-500 font-semibold text-[14px]">
            {props?.item?.discount}% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
