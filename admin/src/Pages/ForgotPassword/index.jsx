import { Button } from "@mui/material";
import { FiMail, FiArrowRight, FiLogIn, FiUserPlus } from "react-icons/fi";

import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <section className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col">
      {/* Top Navigation */}
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

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center">
          {/* Header */}
          <div className="mb-6 text-9xl font-bold flex items-center justify-center">
            <Link to="/">
              <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-short.18ca02a8.svg" />
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-4">
            Welcome Back! <br />
            Sign in with your credentials.{" "}
          </h1>

          {/* Form Card */}
          {/* Email Label */}
          <div className="mb-3 flex items-center justify-start">
            <span className="text-sm font-semibold text-gray-900">Email</span>
          </div>

          {/* Email Input */}
          <div className="mb-5">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-4   border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 text-gray-900 placeholder-gray-500 text-base bg-white"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FiMail className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          {/* Reset Password Button */}
          <Button
            type="submit"
            className="btn-blue mb-3! btn-lg w-full h-[50px]  gap-2"
          >
            <span>Reset Password</span>
            <FiArrowRight className="w-5 h-5" />
          </Button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't want to reset?
              <Link
                to="/sign-up"
                className="text-gray-900 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              © Copyright 2026. Theme by ReeQ, all rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="w-full overflow-hidden mt-auto">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 text-gray-100"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default ForgotPassword;
