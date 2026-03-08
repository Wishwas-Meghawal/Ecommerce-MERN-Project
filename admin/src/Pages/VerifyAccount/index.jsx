import React, { useContext, useState } from "react";
import {
  FiLock,
  FiRefreshCw,
  FiMail,
  FiLogIn,
  FiUserPlus,
  FiShield,
  FiSmartphone,
  FiCheckCircle,
  FiPhone,
} from "react-icons/fi";
import { RiShieldKeyholeLine } from "react-icons/ri";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { RiCopyrightLine } from "react-icons/ri";
import OTPInput from "../../Components/OTPInput";
import { MyContext } from "../../App.jsx";
import { postData } from "../../utils/api.js";

const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const history = useNavigate();
  const context = useContext(MyContext);
  const verifyOtp = (e) => {
    e.preventDefault();

    if (otp !== "") {
      setIsLoading(true);
      const actionType = localStorage.getItem("actionType");

      if (actionType !== "forgot-password") {
        postData("/api/user/verifyEmail", {
          email: localStorage.getItem("userEmail"),
          otp: otp,
        }).then((response) => {
          console.log("OTP Verification Response:", response);
          if (response?.error !== true) {
            context.alertBox(response?.message, "success");
            localStorage.removeItem("userEmail");
            setIsLoading(false);
            history("/login");
          } else {
            context.alertBox(response?.message, "error");
            setIsLoading(false);
          }
        });
      } else {
        postData("/api/user/verify-forgot-password-otp", {
          email: localStorage.getItem("userEmail"),
          otp: otp,
        }).then((response) => {
          console.log("OTP Verification Response:", response);
          if (response?.error !== true) {
            context.alertBox(response?.message, "success");
            history("/change-password");
          } else {
            context.alertBox(response?.message, "error");
              setIsLoading(false);
          }
        });
      }
    } else {
      context.alertBox("Please enter the OTP", "error");
    }
  };
  return (
    <section className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Header - Fixed with Glassmorphism */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <Link to="/login">
          <img
            src="	https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg"
            alt=""
            className="w-[200px]"
          />
        </Link>

        {/* Auth Buttons */}
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

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-sm w-full mx-auto">
          {/* Header with Icon */}
          <div className="text-center mb-10">
            <div className="mb-6 text-3xl font-bold flex items-center justify-center">
              <Link to="/">
                <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-short.18ca02a8.svg" />
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Welocome Back! <br />
              Please Verify Your Email
            </h1>
            <p className="text-gray-600 flex items-center justify-center gap-2">
              <FiSmartphone className="w-4 h-4" />
              OTP has been sent to{" "}
              <span className="text-[#ff5252] font-bold text-[12px]">
                {localStorage.getItem("userEmail")}
              </span>
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="mb-5">
            <form onSubmit={verifyOtp}>
              <OTPInput length={6} onChange={handleOtpChange} />
              <Button
                type="submit"
                variant="contained"
                startIcon={<FiCheckCircle className="w-5 h-5" />}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                  boxShadow: "0 6px 20px rgba(59, 130, 246, 0.25)",
                  width: "100%",
                  mb: 6,
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.35)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </form>
            {/* Resend OTP */}
            <div className="mt-3 text-center">
              <Button
                variant="text"
                startIcon={<FiRefreshCw className="w-4 h-4" />}
                sx={{
                  color: "#6B7280",
                  textTransform: "none",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  "&:hover": {
                    color: "#3B82F6",
                    backgroundColor: "rgba(59, 130, 246, 0.06)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                Resend OTP
              </Button>
            </div>
          </div>

          {/* Security Info */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mb-8">
            <div className="flex items-start gap-3">
              <FiLock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1">
                  Secure Verification
                </p>
                <p className="text-xs text-blue-700">
                  Your OTP is valid for 10 minutes. Never share it with anyone.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <RiCopyrightLine className="w-3 h-3" />
              Copyright 2026. Theme by RedO, all rights reserved.
            </p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <Button
                variant="text"
                sx={{
                  color: "#6B7280",
                  textTransform: "none",
                  fontSize: "0.75rem",
                  minWidth: "auto",
                  padding: "2px 8px",
                  "&:hover": {
                    color: "#3B82F6",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Help
              </Button>
              <Button
                variant="text"
                sx={{
                  color: "#6B7280",
                  textTransform: "none",
                  fontSize: "0.75rem",
                  minWidth: "auto",
                  padding: "2px 8px",
                  "&:hover": {
                    color: "#3B82F6",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Privacy
              </Button>
              <Button
                variant="text"
                sx={{
                  color: "#6B7280",
                  textTransform: "none",
                  fontSize: "0.75rem",
                  minWidth: "auto",
                  padding: "2px 8px",
                  "&:hover": {
                    color: "#3B82F6",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Terms
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-8 border-t border-gray-100 bg-white/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Isomorphic Dashboard. All rights
            reserved.
            <span className="mx-2">•</span>
            <Button
              variant="text"
              sx={{
                color: "#6B7280",
                textTransform: "none",
                fontSize: "0.875rem",
                minWidth: "auto",
                padding: "0 4px",
                "&:hover": {
                  color: "#8B5CF6",
                  backgroundColor: "transparent",
                },
              }}
            >
              Privacy Policy
            </Button>
            <span className="mx-2">•</span>
            <Button
              variant="text"
              sx={{
                color: "#6B7280",
                textTransform: "none",
                fontSize: "0.875rem",
                minWidth: "auto",
                padding: "0 4px",
                "&:hover": {
                  color: "#8B5CF6",
                  backgroundColor: "transparent",
                },
              }}
            >
              Terms of Service
            </Button>
          </p>
        </div>
      </footer>
    </section>
  );
};
export default VerifyAccount;
