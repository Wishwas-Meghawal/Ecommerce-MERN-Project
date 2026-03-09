import React, { useEffect } from "react";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Siderbar from "./Components/Sidebar";

import { createContext } from "react";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";
import Users from "./Components/Users";
import HomeSliderBanners from "./Pages/HomeSliderBanners";
import Category from "./Pages/Category";
import SubCatList from "./Pages/Category/SubCatList";
import Orders from "./Pages/Orders";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyAccount from "./Pages/VerifyAccount";
import ChangePassword from "./Pages/ChangePassword";

import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api.js";
import Profile from "./Pages/Profile/index.jsx";
import ProductDetails from "./Pages/Products/productDetails.jsx";

const MyContext = createContext();

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const [catData, setCatData] = useState([]);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
    id: "",
  });

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className=" contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Siderbar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: <Login />,
    },
    {
      path: "/sign-up",
      exact: true,
      element: <SignUp />,
    },
    {
      path: "/products",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className=" contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Siderbar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Products />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className=" contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Siderbar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Users />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/homeSlider/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className=" contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Siderbar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <HomeSliderBanners />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className=" contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Siderbar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Category />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/subCategory/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className=" contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Siderbar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <SubCatList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/orders",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className=" contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Siderbar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Orders />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/forgot-password",
      exact: true,
      element: <ForgotPassword />,
    },
    {
      path: "/verify-account",
      exact: true,
      element: <VerifyAccount />,
    },
    {
      path: "/change-password",
      exact: true,
      element: <ChangePassword />,
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className=" contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Siderbar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Profile />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/:id",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className=" contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Siderbar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <ProductDetails />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsLogin(false);
      setUserData(null);
      return;
    }

    fetchDataFromApi("/api/user/user-details")
      .then((res) => {
        if (res?.error === true) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          setIsLogin(false);
          setUserData(null);
          return;
        }

        // ✅ LOGIN SUCCESS
        setUserData(res?.data);
        setIsLogin(true);
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setIsLogin(false);
        setUserData(null);

        alertBox("Session expired, please login again", "error");

       window.location.href = "/login";
      });
  }, []);

  useEffect(() => {
    getCat();
  }, []);

  const getCat = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res?.data);
    });
  };

  const alertBox = (msg, type) => {
    if (type === "success") {
      toast.success(msg);
    }
    if (type === "error") {
      toast.error(msg);
    }
  };
  const values = {
    isSidebarOpen,
    setisSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    alertBox,
    userData,
    setUserData,
    address,
    setAddress,
    catData,
    setCatData,
    getCat,
  };
  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
        <Toaster />
      </MyContext.Provider>
    </>
  );
}

export default App;
export { MyContext };
