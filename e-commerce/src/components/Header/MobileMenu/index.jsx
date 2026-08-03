import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import CategoryCollapse from "../../CategoryCollapse";
import { MyContext } from "../../../App";
import { fetchDataFromApi } from "../../../utils/api";

const MobileMenu = (props) => {
  const context = useContext(MyContext);
  const history = useNavigate();
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    setCatData(context?.catData);
  }, [context?.catData]);

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenMobileMenu(newOpen);
  };

  const logout = async () => {
    props.setIsOpenMobileMenu(false);
    try {
      await fetchDataFromApi(`/api/user/logout`, { withCredentials: true });
    } catch (e) {
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    context?.setIsLogin(false);
    context?.setCartData([]);
    context?.setMyListData([]);
    history("/");
  };

  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation" className="mobileMenuPanel">
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h3 className="text-[16px] font-medium">Menu</h3>
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-[22px]"
        />
      </div>

      <div className="px-3 pb-2 pt-3" onClick={toggleDrawer(false)}>
        {context.isLogin === false ? (
          <div className="flex items-center gap-3">
            <Link to="/login" className="w-full">
              <Button className="!bg-primary! !text-white! w-full">
                Login
              </Button>
            </Link>
            <Link to="/register" className="w-full">
              <Button className="!border-primary! !text-primary! !border w-full">
                Register
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 min-w-10 rounded-full bg-[#f1f1f1] flex items-center justify-center">
              <FaRegUser className="text-[18px] text-[rgba(0,0,0,0.7)]" />
            </div>
            <div className="info flex flex-col">
              <h4 className="leading-4 text-[14px] text-[rgba(0,0,0,0.8)] font-medium mb-0 capitalize">
                {context?.userData?.name}
              </h4>
              <span className="text-[12px] text-[rgba(0,0,0,0.6)] font-normal">
                {context?.userData?.email}
              </span>
            </div>
          </div>
        )}
      </div>

      <Divider />

      {context.isLogin === true && (
        <ul onClick={toggleDrawer(false)}>
          <li className="list-none">
            <Link to="my-account" className="w-full block">
              <Button className="w-full !justify-start !gap-3 !px-4 !py-3 !text-[rgba(0,0,0,0.8)]">
                <FaRegUser className="text-[16px]" /> My account
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Link to="my-orders" className="w-full block">
              <Button className="w-full !justify-start !gap-3 !px-4 !py-3 !text-[rgba(0,0,0,0.8)]">
                <IoBagCheckOutline className="text-[16px]" /> Orders
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Link to="my-list" className="w-full block">
              <Button className="w-full !justify-start !gap-3 !px-4 !py-3 !text-[rgba(0,0,0,0.8)]">
                <IoIosHeartEmpty className="text-[16px]" /> My List
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Button
              onClick={logout}
              className="w-full !justify-start !gap-3 !px-4 !py-3 !text-[rgba(0,0,0,0.8)]"
            >
              <IoIosLogOut className="text-[16px]" /> Logout
            </Button>
          </li>
        </ul>
      )}

      <Divider />

      <div className="p-2">
        <h4 className="px-2 pt-2 pb-1 text-[13px] font-semibold text-[rgba(0,0,0,0.5)] uppercase">
          Shop By Categories
        </h4>
        {catData?.length !== 0 && (
          <div onClick={toggleDrawer(false)}>
            <CategoryCollapse data={catData} />
          </div>
        )}
      </div>
    </Box>
  );

  return (
    <Drawer open={props.isOpenMobileMenu} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default MobileMenu;
