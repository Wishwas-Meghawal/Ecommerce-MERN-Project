import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData, postData } from "../../utils/api";

import CircularProgress from "@mui/material/CircularProgress";
import { Collapse } from "react-collapse";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");

  const [phone, setPhone] = useState("");

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

  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      history("/");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id !== undefined && context?.userData?._id !== "") {
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

  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center justify-between">
              <h2 className="pb-3">My Profile</h2>
              <Button
                className="btn-org btn-sm"
                onClick={() =>
                  setIsChangePasswordFormShow(!isChangePasswordFormshow)
                }
              >
                Change Password
              </Button>
            </div>
            <hr />

            <form className="mt-5" onSubmit={handleSubmit}>
              <div className="flex items-center gap-2">
                <div className="w-[50%]">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="name"
                    value={formFields.name}
                    disabled={isLoading === true ? true : false}
                    onChange={onChangeInput}
                  />
                </div>
                <div className="w-[50%]">
                  <div className="mui-phone-wrapper">
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
              </div>
              <div className="flex items-center mt-4 gap-2">
                <div className="w-full">
                  <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="email"
                    value={formFields.email}
                    disabled={true}
                    onChange={onChangeInput}
                  />
                </div>
              </div>

              <br />

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  disabled={!valideValue}
                  className="btn-org btn-lg w-[200px]"
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

          <Collapse isOpened={isChangePasswordFormshow}>
            <div className="card bg-white p-5 shadow-md rounded-md">
              <div className="flex items-center justify-between">
                <h2 className="pb-3">Change Password</h2>
              </div>
              <hr />

              <form className="mt-5" onSubmit={handleSubmitChangePassword}>
                <div className="grid grid-cols-2 gap-5">

                  {
                    context?.userData?.signUpWithGoogle === false &&
                    <div className="col">
                    <TextField
                      label="Old Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="oldPassword"
                      value={changePassword.oldPassword}
                      disabled={isLoading2 === true ? true : false}
                      onChange={onChangeInput}
                    />
                  </div>
                  }

                  

                  <div className="col">
                    <TextField
                      type="text"
                      label="New Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="newPassword"
                      value={changePassword.newPassword}
                      onChange={onChangeInput}
                    />
                  </div>

                  <div className="col">
                    <TextField
                      label="Confirm New Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="confirmPassword"
                      value={changePassword.confirmPassword}
                      onChange={onChangeInput}
                    />
                  </div>
                </div>

                <br />

                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    className="btn-org btn-lg w-[200px]"
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
          </Collapse>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
