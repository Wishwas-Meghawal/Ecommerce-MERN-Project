import React, { use, useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { data, Link } from "react-router-dom";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase";
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Register = () => {
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
      if (response?.error !== true) {
        setIsLoading(false);
        context.alertBox(response?.message, "success");
        localStorage.setItem("userEmail", formFields.email);
        setFormFields({
          name: "",
          email: "",
          password: "",
        });

        history("/verify");
      } else {
        context.alertBox(response?.message, "error");
        setIsLoading(false);
      }
    });
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
    <section className="py-10 px-4 flex items-center justify-center bg-[#faf6f5]">
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-lg p-5 sm:p-8">
        {/* Title */}
        <h2 className="text-[20px] font-semibold text-center mb-6">
          Register with a new account
        </h2>

        <form className="w-full mt-5" onSubmit={handleSubmit}>
          {/* User Name */}
          <div className="mb-5 w-full">
            <TextField
              type="text"
              id="name"
              name="name"
              value={formFields.name}
              disabled={isLoading === true ? true : false}
              label="Full Name*"
              variant="outlined"
              className="w-full"
              onChange={onChangeInput}
            />
          </div>
          {/* Email */}
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
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formFields.password}
              disabled={isLoading === true ? true : false}
              label="Password*"
              variant="outlined"
              className="w-full"
              onChange={onChangeInput}
            />
            <Button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute! top-[10px] right-[10px] z-50 cursor-pointer text-gray-500! rounded-full! w-[35px]! h-[35px]! min-w-[35px]!"
            >
              {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
            </Button>
          </div>

          {/* register Button */}
          <div className="flex items-center w-full mt-3">
            <Button
              type="submit"
              disabled={!valideValue}
              className="btn-org btn-lg w-full hover:bg-red-500! transition flex gap-3"
            >
              {isLoading === true ? (
                <CircularProgress color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
          </div>

          {/* Register */}
          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-primary text-[14px] font-medium cursor-pointer ml-1"
            >
              Login
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <Button
            className="btn-lg  gvap-3 bg-[#f1f1f1]! text-black! w-full h-12 flex items-center justify-center gap-3 border rounded-md hover:bg-gray-50 transition"
            onClick={authWithGoogle}
          >
            <FcGoogle size={22} />
            <span className="font-bold">SIGN UP WITH GOOGLE</span>
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Register;
