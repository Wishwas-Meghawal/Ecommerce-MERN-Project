import React, { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";

const ForgotPassword = () => {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
  });

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

    postData(`/api/user/reset-password`,formFields)
    .then((response)=>{
      if(response?.error !== true){
        context.alertBox(response?.message, "success");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");
        setIsLoading(false);
        history("/login");
      } else {
        context.alertBox(response?.message, "error");
      } 
    })
  };

  return (
    <section className="py-10 ">
      <div className="container">
        <div className=" card w-[400px] m-auto bg-white rounded-xl shadow-lg p-8">
          {/* Title */}
          <h2 className="text-[20px] font-semibold text-center mb-6">
            Forgot Password
          </h2>

          {/* Email */}
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="mb-5 w-full relative">
              <TextField
                type={showPassword === true ? "text" : "password"}
                id="password"
                label="New Password*"
                variant="outlined"
                className="w-full"
                name="newPassword"
                value={formFields.newPassword}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <Button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute! top-[10px] right-[10px] z-50 cursor-pointer text-gray-500! rounded-full! w-[35px]! h-[35px]! min-w-[35px]!"
              >
                {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </Button>
            </div>

            {/* Password */}
            <div className="mb-5 relative">
              <TextField
                type={showPassword2 === true ? "text" : "password"}
                id="confirm_password"
                label="Confirm Password*"
                variant="outlined"
                className="w-full"
                name="confirmPassword"
                value={formFields.confirmPassword}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <Button
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute! top-[10px] right-[10px] z-50 cursor-pointer text-gray-500! rounded-full! w-[35px]! h-[35px]! min-w-[35px]!"
              >
                {showPassword2 ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </Button>
            </div>

            {/* Login Button */}
            <div>
              <Button
                type="submit"
                disabled={!valideValue}
                className="btn-org btn-lg w-full hover:bg-red-500! transition flex gap-3"
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
