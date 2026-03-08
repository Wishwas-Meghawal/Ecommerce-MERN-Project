import React, { useContext, useState } from "react";
import { Button, Checkbox } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLogIn, FiUserPlus } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api.js";
import { MyContext } from "../../App.jsx";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
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
    if (formFields.name === "") {
      context.alertBox("Name is required", "error");
      return false;
    }
    if (formFields.email === "") {
      context.alertBox("Email is required", "error");
      return false;
    }
    if (formFields.password === "") {
      context.alertBox("Password is required", "error");
      return false;
    }

    postData("/api/user/register", formFields).then((response) => {
      console.log("Registration Response:", response);
      if (response?.error !== true) {
        setIsLoading(false);
        context.alertBox(response?.message, "success");
        localStorage.setItem("userEmail", formFields.email);
        setFormFields({
          name: "",
          email: "",
          password: "",
        });

        history("/verify-account");
      } else {
        context.alertBox(response?.message, "error");
        setIsLoading(false);
      }
    });
  };

  return (
    <section className="min-h-screen flex flex-col bg-white">
      <header className="flex items-center justify-between px-10 py-5">
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
        <div className="text-center">
          {/* Logo */}
          <div className="mb-4 text-3xl font-bold flex items-center justify-center">
            <Link to="/">
              <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-short.18ca02a8.svg" />
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-3">
            Join us today! Get special <br />
            benefits and stay up-to-date.
          </h1>

          {/* Social Buttons */}
          <div className="flex gap-4 mb-6">
            {/* Google Button */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FcGoogle />}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                borderColor: "#e5e7eb",
                paddingY: "10px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#111827",
                backgroundColor: "#fff",
                transition: "all 0.3s ease",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",

                "&:hover": {
                  backgroundColor: "#f9fafb",
                  borderColor: "#d1d5db",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  transform: "translateY(-1px)",
                },

                "&:active": {
                  transform: "translateY(0)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                },
              }}
            >
              Sign in with Google
            </Button>

            {/* Facebook Button */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FaFacebook color="#1877F2" />}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                borderColor: "#e5e7eb",
                paddingY: "10px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#111827",
                backgroundColor: "#fff",
                transition: "all 0.3s ease",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",

                "&:hover": {
                  backgroundColor: "#f0f6ff",
                  borderColor: "#c7d2fe",
                  boxShadow: "0 6px 18px rgba(24,119,242,0.25)",
                  transform: "translateY(-1px)",
                },

                "&:active": {
                  transform: "translateY(0)",
                  boxShadow: "0 2px 6px rgba(24,119,242,0.2)",
                },
              }}
            >
              Sign in with Facebook
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex-1 h-px bg-gray-200"></span>
            <span className="text-sm text-gray-400">
              Or, Sign in with your email
            </span>
            <span className="flex-1 h-px bg-gray-200"></span>
          </div>

          {/* Full Name */}
          <form className="w-full px-8 mt-3" onSubmit={handleSubmit}>
            <div className="text-left mb-4">
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border border-[rgba(0,0,0,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="name"
                  value={formFields.name}
                  disabled={isLoading===true ? true : false}
                  onChange={onChangeInput}
              />
            </div>

            {/* Email */}
            <div className="text-left mb-4">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 border border-[rgba(0,0,0,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="email"
                  value={formFields.email}
                  disabled={isLoading===true ? true : false}
                  onChange={onChangeInput}
              />
            </div>

            {/* Password */}
            <div className="text-left mb-4 relative">
              <label className="text-sm text-gray-600">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-4 py-2 border border-[rgba(0,0,0,0.1)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="password"
                  value={formFields.password}
                  disabled={isLoading===true ? true : false}
                  onChange={onChangeInput}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-gray-400 text-[20px]"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Checkbox size="small" defaultChecked />
                <span className="text-[11px] text-gray-600">
                  By signing up you have agreed to our <b>Terms</b>&
                  <b>Privacy Policy</b>
                </span>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
              {
                isLoading === true ? <CircularProgress color="inherit"/>
                :
                'Sign Up'
              }
            </Button>

            {/* Login */}
            <p className="text-sm text-gray-500 mt-3">
              Don’t want to reset?
              <Link to="/Login" className="text-blue-600 font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
