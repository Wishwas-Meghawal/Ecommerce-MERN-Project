import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaRegBell } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { FaRegUser } from "react-icons/fa6";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";

import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api.js";
import AddProduct from "../../Pages/Products/addProduct.jsx";
import AddHomeSlider from "../../Pages/HomeSliderBanners/addHomeSlide.jsx";
import AddCategory from "../../Pages/Category/AddCategory.jsx";
import AddSubCategory from "../../Pages/Category/AddSubCategory.jsx";
import EditCategory from "../../Pages/Category/EditCategory.jsx";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IoMdClose } from "react-icons/io";
import Slide from "@mui/material/Slide";
import EditProduct from "../../Pages/Products/editProduct.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const context = useContext(MyContext);
  const history = useNavigate();

  const logout = async () => {
    setAnchorMyAcc(null);

    try {
      await fetchDataFromApi(
        `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log("Logout API failed but continuing...");
    }

    // ⭐ ALWAYS CLEAR FRONTEND STATE
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    context.setIsLogin(false);
    history("/login");
  };

  return (
    <>
      <header
        className={`h-auto py-2 pr-7 bg-[#fff] flex items-center justify-between shadow-md transition-all 
  sticky top-0 z-50
  ${context.isSidebarOpen ? "left-70 w-[calc(100%-18%)]" : "left-0 w-full"}`}
      >
        <div className="part1">
          <Button
            className="w-[40px]! h-[40px]! min-w-[40px]! rounded-full! text-[rgba(0,0,0,0.8)]!"
            onClick={() => context.setisSidebarOpen(!context.isSidebarOpen)}
          >
            {context.isSidebarOpen === true ? (
              <AiOutlineMenuFold className="text-[20px] text-[rgba(0,0,0,0.8)]" />
            ) : (
              <AiOutlineMenuUnfold className="text-[20px] text-[rgba(0,0,0,0.8)]" />
            )}
          </Button>
        </div>
        <div className="part2  w-[40%] flex items-center justify-end gap-5">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={4} color="secondary">
              <FaRegBell />
            </StyledBadge>
          </IconButton>

          {context.isLogin === true ? (
            <div className="relative">
              <div
                className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
                onClick={handleClickMyAcc}
              >
                <img
                  src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <Menu
                anchorEl={anchorMyAcc}
                id="account-menu"
                open={openMyAcc}
                onClose={handleCloseMyAcc}
                onClick={handleCloseMyAcc}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                slotProps={{
                  paper: {
                    elevation: 3,
                    sx: {
                      borderRadius: "12px",
                      minWidth: 240,
                      mt: 1.5,
                      overflow: "visible",

                      // ⭐ ARROW DESIGN
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 15, // 👉 avatar ke according adjust kar sakte ho
                        width: 12,
                        height: 12,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                        boxShadow: "-2px -2px 5px rgba(0,0,0,0.05)",
                      },
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={handleCloseMyAcc}
                  className="bg-white!
            "
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer">
                      <img
                        src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="info">
                      <h3 className="text-[16px] font-[500] leading-5">
                        {context.userData?.name}
                      </h3>
                      <p className="text-[13px] font-[400] opacity-70">
                        {context.userData?.email}
                      </p>
                    </div>
                  </div>
                </MenuItem>
                <Divider />
                <Link to="/profile">
                  <MenuItem
                    onClick={handleCloseMyAcc}
                    className="flex items-center gap-3"
                  >
                    <FaRegUser className="text-[16px]" />{" "}
                    <span className="text-[14px]">Profile</span>
                  </MenuItem>
                </Link>
                <MenuItem onClick={logout} className="flex items-center gap-3">
                  <LiaSignOutAltSolid className="text-[18px]" />{" "}
                  <span className="text-[14px]">SignOut</span>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login">
              <Button className="btn-blue btn-sm rounded-full!">Sign In</Button>
            </Link>
          )}
        </div>
      </header>

      <Dialog
        fullScreen
        open={context?.isOpenFullScreenPanel.open}
        onClose={() =>
          context?.setIsOpenFullScreenPanel({
            open: false,
          })
        }
        slots={{
          transition: Transition,
        }}
      >
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() =>
                context?.setIsOpenFullScreenPanel({
                  open: false,
                })
              }
            >
              <IoMdClose className="text-gray-800" />
            </IconButton>

            <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
              <span className="text-gray-800">
                {context?.isOpenFullScreenPanel?.model}
              </span>
            </Typography>
          </Toolbar>
        </AppBar>

        {context?.isOpenFullScreenPanel?.model === "Add Product" && (
          <AddProduct />
        )}

        {context?.isOpenFullScreenPanel?.model === "Add Home Slider" && (
          <AddHomeSlider />
        )}

        {context?.isOpenFullScreenPanel?.model === "Add Category" && (
          <AddCategory />
        )}

        {context?.isOpenFullScreenPanel?.model === "Add Sub Category" && (
          <AddSubCategory />
        )}

        {context?.isOpenFullScreenPanel?.model === "Edit Category" && (
          <EditCategory />
        )}

        {context?.isOpenFullScreenPanel?.model === "Edit Product" && (
          <EditProduct />
        )}
      </Dialog>
    </>
  );
};

export default Header;
