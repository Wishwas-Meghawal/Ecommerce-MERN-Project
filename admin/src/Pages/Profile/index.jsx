import React, { useContext, useEffect, useState } from "react";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Puzzle,
  Camera,
  Flag,
  ChevronDown,
  Lock,
  Eye,
  EyeOff,
  MapPinHouse,
} from "lucide-react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  editData,
  fetchDataFromApi,
  postData,
  uploadImage,
} from "../../utils/api.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import AddressSelector from "../../Components/AddressSelector/index.jsx";
import AddAddress from "../Address/AddAddress.jsx";

const Profile = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [address, setAddress] = useState([]);

  const [phone, setPhone] = useState("");

  const [status, setStatus] = useState(false);

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "address", label: "Address", icon: MapPinHouse },
  ];

  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);
  const context = useContext(MyContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [isChangePasswordFormshow, setIsChangePasswordFormShow] =
    useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      history("/login");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id !== undefined && context?.userData?._id !== "") {
      fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`,
      ).then((res) => {
        setAddress(res.data);
        context?.setAddress(res.data);
      });

      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      });

      const ph = `"${context?.userData?.mobile}"`;
      setPhone(ph);
      setChangePassword({
        email: context?.userData?.email,
      });
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return { ...formFields, [name]: value };
    });

    setChangePassword(() => {
      return { ...changePassword, [name]: value };
    });
  };

  const valideValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (formFields.name === "") {
      context.alertBox("Name is required", "error");
      return false;
    }
    if (formFields.email === "") {
      context.alertBox("Email is required", "error");
      return false;
    }
    if (formFields.mobile === "") {
      context.alertBox("Mobile is required", "error");
      return false;
    }

    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then(
      (response) => {
        console.log("Registration Response:", response);
        if (response?.error !== true) {
          setIsLoading(false);
          context.alertBox(response?.data?.message, "success");
        } else {
          context.alertBox(response?.message, "error");
          // localStorage.removeItem("accessToken");
          // localStorage.removeItem("refreshToken");
          setIsLoading(false);
        }
      },
    );
  };

  const valideValue2 = Object.values(changePassword).every((el) => el);

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    setIsLoading2(true);

    // Basic validation
    if (changePassword.oldPassword === "") {
      context.alertBox("Old Password is required", "error");
      return false;
    }
    if (changePassword.newPassword === "") {
      context.alertBox("New Password is required", "error");
      return false;
    }
    if (changePassword.confirmPassword === "") {
      context.alertBox("Confirm Password is required", "error");
      return false;
    }
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      context.alertBox(
        "New Password and Confirm Password do not match",
        "error",
      );
      return false;
    }

    postData(`/api/user/reset-password`, changePassword, {
      withCredentials: true,
    }).then((response) => {
      console.log("Registration Response:", response);
      if (response?.error !== true) {
        setIsLoading2(false);
        context.alertBox(response?.message, "success");
      } else {
        context.alertBox(response?.message, "error");
        // localStorage.removeItem("accessToken");
        // localStorage.removeItem("refreshToken");
        setIsLoading2(false);
      }
    });
  };

  useEffect(() => {
    const userAvatar = [];
    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvatar.push(context?.userData?.avatar);
      setPreview(userAvatar);
    }
  }, [context?.userData]);

  let selectedImages = [];

  const formdata = new FormData();

  const onChangeFile = (e, apiEndPoint) => {
    try {
      setPreview([]);
      const files = e.target.files;
      setUploading(true);
      console.log(files);

      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];
          selectedImages.push(file);
          formdata.append(`avatar`, file);
        } else {
          context.alertBox(
            "Please select a valid image file (JPEG, JPG, PNG, WEBP)",
            "error",
          );
          setUploading(false);
          return false;
        }
      }

      uploadImage("/api/user/user-avatar", formdata).then((res) => {
        setUploading(false);
        let avatar = [];
        avatar.push(res?.data?.avatar);
        setPreview(avatar);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8fa] p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          <aside className="w-full md:w-64 bg-white/90 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-gray-100/80 h-fit">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenuItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveMenuItem(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"}`}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* RIGHT - Main Content */}
          {activeMenuItem === "profile" ? (
            <div className="flex-1 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100/80">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
                  Personal Information
                </h1>
              </div>

              {/* Avatar + Buttons with Upload Overlay */}
              <div className="flex flex-wrap items-center gap-6 mb-10 pb-2">
                <div className="w-[110px] h-[110px] rounded-full overflow-hidden relative group flex items-center justify-center bg-gray-300">
                  {uploading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <>
                      {preview?.length !== 0 ? (
                        preview?.map((img, index) => {
                          return (
                            <img
                              src={img}
                              key={index}
                              className="w-full h-full object-cover"
                              alt="avatar"
                            />
                          );
                        })
                      ) : (
                        <img
                          src="/defaultUser.jpg"
                          className="w-full h-full object-cover"
                          alt="default avatar"
                        />
                      )}
                    </>
                  )}

                  <div className="overlay w-[100%] h-[110%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100 rounded-full">
                    <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
                      name="avatar"
                    />
                  </div>
                </div>
              </div>

              {/* Form Fields with Material UI TextField */}
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Personal info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="name"
                      value={formFields.name}
                      disabled={isLoading === true ? true : false}
                      onChange={onChangeInput}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "5px",
                          backgroundColor: "#f8fafc",
                          "&:hover fieldset": {
                            borderColor: "#94a3b8",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3b82f6",
                            borderWidth: "2px",
                          },
                        },
                      }}
                    />
                  </div>

                  {/* Phone with country code */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <PhoneInput
                        defaultCountry="in"
                        value={phone}
                        onChange={(phone) => {
                          setPhone(phone);
                          setFormFields({
                            mobile: phone,
                          });
                        }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2 ">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="email"
                      value={formFields.email}
                      disabled={true}
                      onChange={onChangeInput}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "5px",
                          backgroundColor: "#f8fafc",
                          "&:hover fieldset": {
                            borderColor: "#94a3b8",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3b82f6",
                            borderWidth: "2px",
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <AddressSelector
                  addresses={address}
                  onAddAddress={() => setActiveMenuItem("address")}
                />

                {/* Save button - bottom right */}
                <div className="flex justify-end ">
                  <Button
                    type="submit"
                    disabled={!valideValue}
                    variant="contained"
                    className="w-full"
                    sx={{
                      background: "linear-gradient(to right, #2563eb, #4f46e5)",
                      borderRadius: "5px",
                      padding: "15px 32px",
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, #1d4ed8, #4338ca)",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      },
                    }}
                  >
                    {isLoading === true ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          ) : activeMenuItem === "security" ? (
            <div className="flex-1 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100/80">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <Shield className="w-7 h-7 text-blue-600" />
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
                  Change Password
                </h1>
              </div>

              {/* Password Change Form with Material UI TextField */}
              <div className="max-w-2xl">
                <div className="mb-8">
                  <p className="text-sm text-gray-500">
                    Your password must be at least 8 characters long and include
                    a mix of letters, numbers, and symbols.
                  </p>
                </div>

                <form
                  className="space-y-6"
                  onSubmit={handleSubmitChangePassword}
                >
                  {/* Current Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <div className="relative">
                      <TextField
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="oldPassword"
                        value={changePassword.oldPassword}
                        disabled={isLoading2 === true ? true : false}
                        onChange={onChangeInput}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#f8fafc",
                            "&:hover fieldset": {
                              borderColor: "#94a3b8",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#3b82f6",
                              borderWidth: "2px",
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <Lock className="w-4 h-4 text-gray-500 mr-2" />
                          ),
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="relative">
                      <TextField
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="newPassword"
                        value={changePassword.newPassword}
                        onChange={onChangeInput}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#f8fafc",
                            "&:hover fieldset": {
                              borderColor: "#94a3b8",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#3b82f6",
                              borderWidth: "2px",
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <Lock className="w-4 h-4 text-gray-500 mr-2" />
                          ),
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  {/* Confirm New Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <TextField
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="confirmPassword"
                        value={changePassword.confirmPassword}
                        onChange={onChangeInput}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#f8fafc",
                            "&:hover fieldset": {
                              borderColor: "#94a3b8",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#3b82f6",
                              borderWidth: "2px",
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <Lock className="w-4 h-4 text-gray-500 mr-2" />
                          ),
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  {/* Password Strength Indicator */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      Password requirements:
                    </p>
                    <ul className="space-y-1">
                      <li className="text-xs text-gray-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        At least 8 characters
                      </li>
                      <li className="text-xs text-gray-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        At least one uppercase letter
                      </li>
                      <li className="text-xs text-gray-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        At least one number
                      </li>
                      <li className="text-xs text-gray-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        At least one special character
                      </li>
                    </ul>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={!valideValue2}
                      variant="contained"
                      sx={{
                        background:
                          "linear-gradient(to right, #2563eb, #4f46e5)",
                        borderRadius: "12px",
                        padding: "8px 32px",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        textTransform: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        "&:hover": {
                          background:
                            "linear-gradient(to right, #1d4ed8, #4338ca)",
                          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                        },
                      }}
                    >
                      {isLoading2 === true ? (
                        <CircularProgress color="inherit" />
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : activeMenuItem === "address" ? (
            <AddAddress />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
