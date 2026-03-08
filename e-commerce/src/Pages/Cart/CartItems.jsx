import React, { useState } from "react";
import { Link } from "react-router-dom";

import { IoCloseSharp } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { GoTriangleDown } from "react-icons/go";
import { Rating } from "@mui/material";


const CartItems = (props) => {
  const [sizeanchorEl, setSizeAnchorEl] = useState(null);
  const [selectedSize, setCartItems] = useState(props.size);
  const openSize = Boolean(sizeanchorEl);

  const [qtyanchorEl, setQtyAnchorEl] = useState(null);
  const [selectedQty, setSelectedQty] = useState(props.qty);
  const openQty = Boolean(qtyanchorEl);

  const handleClickSize = (event) => {
    setSizeAnchorEl(event.currentTarget);
  };
  const handleCloseSize = (value) => {
    setSizeAnchorEl(null);
    if(value!==null){
        setCartItems(value)
    }
  };


  const handleClickQty = (event) => {
    setQtyAnchorEl(event.currentTarget);
  };
  const handleCloseQty = (value) => {
    setQtyAnchorEl(null);
    if(value!==null){
        setSelectedQty(value)
    }
  };
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
          className="mb-1"
          sx={{ color: "#f59e0b" }}
        />

        <div className="flex items-center gap-4 mt-1">
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
              onClose={()=>handleCloseSize(null)}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              <MenuItem onClick={()=>handleCloseSize('S')}>S</MenuItem>
              <MenuItem onClick={()=>handleCloseSize('M')}>M</MenuItem>
              <MenuItem onClick={()=>handleCloseSize('L')}>L</MenuItem>
              <MenuItem onClick={()=>handleCloseSize('XL')}>XL</MenuItem>
              <MenuItem onClick={()=>handleCloseSize('XXL')}>XXL</MenuItem>
            </Menu>
          </div>

          <div className="relative">
            <span className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-600 py-1 px-3 rounded-md cursor-pointer" onClick={handleClickQty}
            >
              Qty: {selectedQty} <GoTriangleDown />
            </span>
            <Menu
              id="sizeMenu"
              anchorEl={qtyanchorEl}
              open={openQty}
              onClose={()=>handleCloseQty(null)}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              <MenuItem onClick={()=>handleCloseQty(1)}>1</MenuItem>
              <MenuItem onClick={()=>handleCloseQty(2)}>2</MenuItem>
              <MenuItem onClick={()=>handleCloseQty(3)}>3</MenuItem>
              <MenuItem onClick={()=>handleCloseQty(4)}>4</MenuItem>
              <MenuItem onClick={()=>handleCloseQty(5)}>5</MenuItem>
              <MenuItem onClick={()=>handleCloseQty(6)}>6</MenuItem>
              <MenuItem onClick={()=>handleCloseQty(7)}>7</MenuItem>
              <MenuItem onClick={()=>handleCloseQty(8)}>8</MenuItem>
              <MenuItem onClick={()=>handleCloseQty(9)}>9</MenuItem>
              <MenuItem onClick={()=>handleCloseQty(10)}>10</MenuItem>
            </Menu>
          </div>
        </div>

        <div className="mb-3 mt-2 flex items-center gap-4">
          <span className="text-red-500 font-semibold text-[14px]">$23.00</span>
          <span className="line-through text-gray-400 text-[14px] font-[500]">
            $24.00
          </span>
          <span className="text-red-500 font-semibold text-[14px]">5% OFF</span>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
