import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { uploadImage } from "../../utils/api";
import { PiMapPinLine } from "react-icons/pi";




const AccountSidebar = () => {

  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    const userAvatar = [];
    if(context?.userData?.avatar!=="" && context?.userData?.avatar !== undefined){
      userAvatar.push(context?.userData?.avatar);
      setPreview(userAvatar); 
    }
    
  },[context?.userData]);

  let selectedImages = [];

  const formdata = new FormData();

  const onChangeFile=(e, apiEndPoint)=>{
    try {
      setPreview([]);
      const files = e.target.files;
      setUploading(true);
      console.log(files);

      for (let i = 0; i < files.length; i++) {
        if(
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ){
          const file  = files[i];
          selectedImages.push(file);
          formdata.append(`avatar`, file); 
        } else{
          context.alertBox("Please select a valid image file (JPEG, JPG, PNG, WEBP)", "error");
          setUploading(false);
          return false; 
        }
      }

      
      
      uploadImage("/api/user/user-avatar", formdata).then((res)=>{
        setUploading(false);
        let avatar=[];
        avatar.push(res?.data?.avatar);
        setPreview(avatar);
      });
      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="card1 bg-white shadow-md rounded-md sticky top-[10px]">
      <div className="w-full p-5 flex items-center justify-center flex-col">
        <div className="w-[110px] h-[110px]  rounded-full overflow-hidden relative group flex items-center justify-center bg-gray-300">

          {
            uploading === true ? <CircularProgress color="inherit" /> : 
            <>
                {
                  preview?.length !== 0 ? preview?.map((img, index)=>{
                    return(
                      <img
                        src={img} 
                        key={index}
                        className="w-full h-full object-cover"
                      />
                    )
                  })
                  :

                  <img
                    src="/defaultUser.jpg" 
                    className="w-full h-full object-cover"
                  />
                }
            </> 
          }
        

          <div className="overlay w-[100%] h-[110%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
            <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0 "
              accept="image/*"
              onChange={(e)=>
                onChangeFile(e,"/api/user/user-avatar")
              }
              name="avatar"
            />
          </div>
        </div>
        <h3>{context?.userData?.name}</h3>
        <h6 className="text-[13px] font-[500]">{context?.userData?.email}</h6>
      </div>

      <ul className="list-none pb-5 bg-[#f1f1f1] myAccounttabs">
        <li className="w-full">
          <NavLink to="/my-account" exact={true} activeClassName="isActive">
            <Button className="w-full py-2! justify-start! text-left! px-5! capitalize! text-[rgba(0,0,0,0.8)]!  rounded-none! flex items-center gap-2 ">
              <FaRegUser className="text-[18px]" />
              User Profile
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/address" exact={true} activeClassName="isActive">
            <Button className="w-full py-2! justify-start! text-left! px-5! capitalize! text-[rgba(0,0,0,0.8)]!  rounded-none! flex items-center gap-2 ">
              <PiMapPinLine  className="text-[18px]" />
              Address
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/my-orders" exact={true} activeClassName="isActive">
            <Button className="w-full py-2! justify-start! text-left! px-5! capitalize! text-[rgba(0,0,0,0.8)]!  rounded-none! flex items-center gap-2 ">
              <IoBagCheckOutline className="text-[18px]" />
              My Orders
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/my-list" exact={true} activeClassName="isActive">
            <Button className="w-full py-2! justify-start! text-left! px-5! capitalize! text-[rgba(0,0,0,0.8)]!  rounded-none! flex items-center gap-2 ">
              <IoIosHeartEmpty className="text-[18px]" />
              My List{" "}
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <Button className="w-full py-2! justify-start! text-left! px-5! capitalize! text-[rgba(0,0,0,0.8)]!  rounded-none! flex items-center gap-2 ">
            <IoIosLogOut className="text-[18px]" />
            Logout{" "}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
