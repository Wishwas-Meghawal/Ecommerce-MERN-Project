import React, { useContext, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchDataFromApi, postData } from "../../utils/api.js";


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase";
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login = () => {
  const context = useContext(MyContext);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        if (response?.error !== true) {
          context.alertBox(response?.message, "success");
          history("/verify");
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
        if (response?.error !== true) {
          setIsLoading(false);

          context.alertBox(response?.message, "success");


          localStorage.setItem(
            "accessToken",
            response.accessToken || response?.data?.accessToken,
          );

          localStorage.setItem(
            "refreshToken",
            response.refreshToken || response?.data?.refreshToken,
          );

          context.setIsLogin(true);

          fetchDataFromApi("/api/user/user-details").then((res) => {
            context.setUserData(res?.data);
          });

          history("/");
        } else {
          context.alertBox(response?.message, "error");
          // localStorage.removeItem("accessToken");
          // localStorage.removeItem("refreshToken");
          setIsLoading(false);
        }
      },
    );
  };


  const authWithGoogle = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          const fields = {
            name: user.providerData[0].displayName,
            email: user.providerData[0].email,
            password: null,
            avatar: user.providerData[0].photoURL,
            mobile: user.providerData[0].phoneNumber,
            role: "USER",
          };
  
          postData("/api/user/authWithGoogle", fields).then((res) => {
            if (res?.error !== true) {
              setIsLoading(false);
              context.alertBox(res?.message, "success");
              localStorage.setItem(
                "accessToken",res?.data?.accessToken,
              );
  
              localStorage.setItem(
                "refreshToken",res?.data?.refreshToken,
              );
  
              context.setIsLogin(true);
              
              localStorage.setItem("userEmail", fields.email);
              history("/");
            } else {
              context.alertBox(res?.message, "error");
              setIsLoading(false);
            }
          });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    };

  return (
    <section className="py-10 ">
      <div className="container">
        <div className=" card w-full max-w-[400px] m-auto bg-white rounded-xl shadow-lg p-5 sm:p-8">
          {/* Title */}
          <h2 className="text-[20px] font-semibold text-center mb-6">
            Login to your account
          </h2>

          {/* Email */}
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="mb-5 w-full">
              <TextField
                type="email"
                id="email"
                name="email"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                label="Email Id*"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            {/* Password */}
            <div className="mb-5 relative">
              <TextField
                type={showPassword === true ? "text" : "password"}
                id="password"
                label="Password*"
                variant="outlined"
                className="w-full"
                name="password"
                value={formFields.password}
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

            {/* Forgot */}
            <div className="text-right mb-4">
              <a
                className=" link cursor-pointer text-[14px] text-gray-600 hover:text-red-500"
                onClick={forgotPassword}
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <div className="flex items-center w-full mt-3">
              <Button
                type="submit"
                disabled={!valideValue}
                className="btn-org btn-lg w-full hover:bg-red-500! transition flex gap-3"
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>

            {/* Register */}
            <p className="text-center text-sm mt-4 text-gray-600">
              Not Registered?
              <Link
                to="/register"
                className="text-primary text-[14px] font-medium cursor-pointer ml-1"
              >
                Sign Up
              </Link>
            </p>

            {/* Divider */}
            <div className="flex items-center my-5">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-sm text-gray-500">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Login */}
            <Button
            className="btn-lg  gvap-3 bg-[#f1f1f1]! text-black! w-full h-12 flex items-center justify-center gap-3 border rounded-md hover:bg-gray-50 transition"
            onClick={authWithGoogle}
          >
            <FcGoogle size={22} />
            <span className="font-bold">LOGIN WITH GOOGLE</span>
          </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
