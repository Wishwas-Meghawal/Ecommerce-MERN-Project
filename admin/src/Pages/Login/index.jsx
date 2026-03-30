import React, { useContext, useState } from "react";
import { Button, Checkbox } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { fetchDataFromApi, postData } from "../../utils/api.js";
import { MyContext } from "../../App.jsx";

const Login = () => {
  const context = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const forgotPassword = () => {
    if (formFields.email === "") {
      context.alertBox("Please enter your email id first", "error");
      return false;
    } else {
      context.alertBox(`OTP sent to ${formFields.email}`, "success");
      localStorage.setItem("userEmail", formFields.email);
      localStorage.setItem("actionType", "forgot-password");

      postData("/api/user/forgot-password", {
        email: formFields.email,
      }).then((response) => {
        console.log("OTP Verification Response:", response);
        if (response?.error !== true) {
          context.alertBox(response?.message, "success");
          history("/verify-account");
        } else {
          context.alertBox(response?.message, "error");
        }
      });
    }
  };

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
    if (formFields.email === "") {
      context.alertBox("Email is required", "error");
      return false;
    }
    if (formFields.password === "") {
      context.alertBox("Password is required", "error");
      return false;
    }

    postData("/api/user/login", formFields, { withCredentials: true }).then(
      (response) => {
        console.log("Registration Response:", response);
        if (response?.error !== true) {
          setIsLoading(false);

          context.alertBox(response?.message, "success");

          localStorage.setItem("accessToken", response?.data?.accessToken);
          localStorage.setItem("refreshToken", response?.data?.refreshToken);

          context.setIsLogin(true);

          fetchDataFromApi("/api/user/user-details").then((res) => {
            context.setUserData(res?.data);
            
              history("/");
             
          });
        } else {
          context.alertBox(response?.message, "error");
          setIsLoading(false);
        }
      },
    );
  };

  return (
    <section className="min-h-screen flex flex-col bg-white">
      <header className="flex items-center justify-between px-10 py-5">
        <Link to="/login">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-[200px]"
          />
        </Link>
        {/* Social Buttons */}
        {/* <div className="flex items-center gap-4">
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
        </div> */}
      </header>
      {/* 🔐 Login Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className=" text-center">
          {/* Logo */}
          <div className="mb-6 text-3xl font-bold flex items-center justify-center">
            <Link to="/">
              <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-short.18ca02a8.svg" alt="Logo" />
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-4">
            Welcome Back! <br />
            Sign in with your credentials.{" "}
          </h1>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex-1 h-px bg-gray-200"></span>
            <span className="text-sm text-gray-400">
              Or, Sign in with your email
            </span>
            <span className="flex-1 h-px bg-gray-200"></span>
          </div>

          {/* Email */}
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="text-left mb-4">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
                className="w-full mt-1 px-4 py-2 border border-[rgba(0,0,0,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="text-left mb-4 relative">
              <label className="text-sm text-gray-600">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formFields.password}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
                className="w-full mt-1 px-4 py-2 border border-[rgba(0,0,0,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-gray-400 text-[20px]"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Checkbox size="small" defaultChecked />
                <span className="text-sm">Remember Me</span>
              </div>

              <a
                className="text-sm text-blue-600 cursor-pointer"
                onClick={forgotPassword}
              >
                Forgot Password?
              </a>
            </div>

            {/* Sign In Button */}
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={!valideValue}
              sx={{
                backgroundColor: "#2563eb", // same blue like image
                paddingY: "12px",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "15px",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
                transition: "all 0.3s ease",

                "&:hover": {
                  backgroundColor: "#1e40af", // thoda dark blue
                  boxShadow: "0 8px 20px rgba(37, 99, 235, 0.4)",
                  transform: "translateY(-1px)",
                },

                "&:active": {
                  transform: "translateY(0px)",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
                },
              }}
            >
              {isLoading === true ? (
                <CircularProgress color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Signup */}
            {/* <p className="text-sm text-gray-500 mt-6">
              Don’t have an account?{" "}
              <Link to="/sign-up" className="text-blue-600 font-medium">
                Sign Up
              </Link>
            </p> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
