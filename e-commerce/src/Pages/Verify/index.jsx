import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import OTPInput from "../../components/OTPInput";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const history = useNavigate();
  const context = useContext(MyContext);

  const verifyOtp = (e) => {
    e.preventDefault();

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
          history("/login");
        } else {
          context.alertBox(response?.message, "error");
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
          history("/forgot-password");
        } else {
          context.alertBox(response?.message, "error");
        }
      });
    }
  };
  return (
    <section className="py-10">
      <div className="container">
        <div className=" card shadow-md w-full max-w-[400px] m-auto bg-white rounded-xl  py-5 px-6 sm:px-10">
          <div className="text-center flex items-center justify-center">
            <img src="/verify2.png" alt="" width="80px" />
          </div>
          {/* Title */}
          <h3 className="text-[20px] font-semibold text-center mt-4 mb-1">
            Verify OTP
          </h3>
          <p className="text-center mt-0 mb-4">
            OTP sent to{" "}
            <span className=" text-primary font-bold">
              {localStorage.getItem("userEmail")}
            </span>
          </p>

          <form onSubmit={verifyOtp}>
            <OTPInput length={6} onChange={handleOtpChange} />

            <div className="flex items-center justify-center">
              <Button type="submit" className="w-full btn-org btn-lg">
                Verify OTP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify;
