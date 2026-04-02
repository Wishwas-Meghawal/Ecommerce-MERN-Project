import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import { MyContext } from "../../App";
import { Button } from "@mui/material";
import { FaRegUser } from "react-icons/fa";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { fetchDataFromApi } from "../../utils/api";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(MyContext);

  const history = useNavigate();

  const logout = async () => {
    setAnchorEl(null);

    try {
      await fetchDataFromApi(
        `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
        { withCredentials: true },
      );
    } catch (e) {
      console.log("Logout API failed, continuing...");
    }

    // ⭐ ALWAYS CLEAR FRONTEND
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    context.setIsLogin(false);
    context.setUserData(null);

    history("/");
  };

  return (
    <header className="bg-white sticky -top-[47px] z-[100]">
      <div className="top-strip py-2 border-t border-gray-200 border-b">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[12px] font-medium">
                Get up to 50% new season styles , limited time only
              </p>
            </div>

            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-2">
                <li className="list-none">
                  <Link
                    to="/help-center"
                    className="text-[12px] link font-medium transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/order-tracking"
                    className="text-[12px] link font-medium transition"
                  >
                    Order tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header py-4 border-b border-gray-200">
        <div className="container flex items-center justify-between">
          <div className="col1 w-[25%]">
            <Link to={"/"}>
              <img src="/logo.jpg" />
            </Link>
          </div>
          <div className="col2 w-[45%]">
            <Search />
          </div>
          <div className="col3  flex items-center pl-7">
            <ul className="flex items-center gap-3 justify-end w-full">
              {context.isLogin === false ? (
                <li className="list-none">
                  <Link
                    to="/login"
                    className="link transition text-[15px]  font-medium"
                  >
                    Login
                  </Link>{" "}
                  | &nbsp;
                  <Link
                    to="/register"
                    className="link transition text-[15px] font-medium"
                  >
                    Register
                  </Link>
                </li>
              ) : (
                <>
                  <Button
                    className="text-black! myAccountWrap flex items-center gap-3 cursor-pointer"
                    onClick={handleClick}
                  >
                    <div className="w-10 h-10 min-w-10 rounded-full bg-[#f1f1f1] flex items-center justify-center">
                      <FaRegUser className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                    </div>
                    <div className="info flex flex-col">
                      <h4 className="leading-3 text-[14px] text-[rgba(0,0,0,0.6)] font-medium mb-0 capitalize text-left justify-start">
                        {context?.userData?.name}
                      </h4>
                      <span className="text-[13px] text-[rgba(0,0,0,0.6)] font-normal capitalize text-left justify-start">
                        {context?.userData?.email}
                      </span>
                    </div>
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link to="my-account" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 py-3!"
                      >
                        <FaRegUser className="text-[18px]" />{" "}
                        <span className="text-[14px]">My account</span>
                      </MenuItem>
                    </Link>
                    <Link to="my-orders" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 py-3!"
                      >
                        <IoBagCheckOutline className="text-[18px]" />{" "}
                        <span className="text-[14px]">Orders</span>
                      </MenuItem>
                    </Link>
                    <Link to="my-list" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 py-3!"
                      >
                        <IoIosHeartEmpty className="text-[18px]" />{" "}
                        <span className="text-[14px]">My List</span>
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={logout} className="flex gap-2 py-3!">
                      <IoIosLogOut className="text-[18px]" />{" "}
                      <span className="text-[14px]">Logout</span>
                    </MenuItem>
                  </Menu>
                </>
              )}
              <li>
                <Tooltip title="Compare">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary">
                      <IoGitCompareOutline />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="WishList">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary">
                      <FaRegHeart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Cart">
                  <IconButton
                    aria-label="cart"
                    onClick={() => context.setOpenCartPanel(true)}
                  >
                    <StyledBadge badgeContent={4} color="secondary">
                      <MdOutlineShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Navigation />
    </header>
  );
};

export default Header;
