import React, { useContext, useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiUserPlus,
  FiLogIn,
} from "react-icons/fi";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api.js";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return { ...formFields, [name]: value };
    });
  };

  const valideValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (formFields.newPassword === "") {
      context.alertBox("New Password is required", "error");
      setIsLoading(false);
      return false;
    }
    if (formFields.confirmPassword === "") {
      context.alertBox("Confirm Password is required", "error");
      setIsLoading(false);
      return false;
    }

    if (formFields.newPassword !== formFields.confirmPassword) {
      context.alertBox("Password and Confirm Password should be same", "error");
      setIsLoading(false);
      return false;
    }

    postData(`/api/user/reset-password`, formFields).then((response) => {
      if (response?.error !== true) {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");
        context.alertBox(response?.message, "success");
        setIsLoading(false);
        history("/login");
      } else {
        context.alertBox(response?.message, "error");
      }
    });
  };
  return (
    <section className="min-h-screen  bg-white">
      <header className=" w-full flex items-center justify-between px-10 py-5">
        <Link to="/login">
          <img
            src="	https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg"
            alt=""
            className="w-[200px]"
          />
        </Link>
        {/* Social Buttons */}
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button
              variant="outlined"
              startIcon={<FiLogIn className="w-4 h-4" />}
              sx={{
                px: 4,
                py: 1,
                borderRadius: 3,
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#6B7280",
                borderColor: "#E5E7EB",
                borderWidth: 1.5,
                minWidth: "auto",
                "&:hover": {
                  borderColor: "#8B5CF6",
                  color: "#8B5CF6",
                  backgroundColor: "rgba(139, 92, 246, 0.04)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(139, 92, 246, 0.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Login
            </Button>
          </Link>

          <Link to="/sign-up">
            <Button
              variant="contained"
              startIcon={<FiUserPlus className="w-4 h-4" />}
              sx={{
                px: 4,
                py: 1,
                borderRadius: 3,
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                boxShadow: "0 6px 20px rgba(139, 92, 246, 0.25)",
                minWidth: "auto",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                  boxShadow: "0 10px 25px rgba(139, 92, 246, 0.35)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </header>
      {/* 🔐 Login Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className=" text-center">
          {/* Logo */}
          <div className="mb-6 text-3xl font-bold flex items-center justify-center">
            <Link to="/">
              <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-short.18ca02a8.svg" />
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-4 leading-12">
            Welcome Back! <br />
            You Can Change your password <br />
            from here
          </h1>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex-1 h-px bg-gray-200"></span>
            <span className="text-sm text-gray-400">Set Your New Password</span>
            <span className="flex-1 h-px bg-gray-200"></span>
          </div>

          {/* New Password */}
          <form className="w-full px-8 mt-3" onSubmit={handleSubmit}>
            <div className="text-left mb-4 relative">
              <label className="text-sm text-gray-600">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-4 py-2 border border-[rgba(0,0,0,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="newPassword"
                value={formFields.newPassword}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-gray-400 text-[20px]"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Password */}
            <div className="text-left mb-4 relative">
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type={showPassword2 ? "text" : "password"}
                className="w-full mt-1 px-4 py-2 border border-[rgba(0,0,0,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="confirmPassword"
                value={formFields.confirmPassword}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <span
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute right-3 top-9 cursor-pointer text-gray-400 text-[20px]"
              >
                {showPassword2 ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Change Password Button */}
            <Button
              type="submit"
              disabled={!valideValue}
              variant="contained"
              startIcon={<FiCheckCircle className="w-5 h-5" />}
              sx={{
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.5px",
                background:
                  "linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)",
                backgroundSize: "200% auto",
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                width: "100%",
                "&:hover": {
                  backgroundPosition: "right center",
                  boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {isLoading === true ? (
                <CircularProgress color="inherit" />
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default ChangePassword;
