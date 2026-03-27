import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./Pages/Home";
import ProductListing from "./Pages/ProductListing";
import Footer from "./components/Footer";
import ProductDetails from "./Pages/Productdetails";
import { createContext } from "react";
const MyContext = createContext();

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ProductZoom from "./components/ProductZoom";
import { IoCloseSharp } from "react-icons/io5";
import ProductDetailsComponent from "./components/ProductDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CartPage from "./Pages/Cart";
import Verify from "./Pages/Verify";

import toast, { Toaster } from "react-hot-toast";
import ForgotPassword from "./Pages/ForgotPassword";
import { Checkbox, useStepContext } from "@mui/material";
import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount";
import MyList from "./Pages/MyList";
import MyListItems from "./Pages/MyList/MyListItems";
import Orders from "./Pages/Orders";
import { fetchDataFromApi } from "./utils/api.js";
import AddressForm from "./Pages/MyAccount/AddressForm";



function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);

  const [openCartPanel, setOpenCartPanel] = useState(false);

  const [maxWidth, setMaxWidth] = useState("lg");

  const [isLogin, setIsLogin] = useState(false);

  const [userData, setUserData] = useState(null);

  const [address, setAddress] = useState([]);

  const [catData, setCatData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;


  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
  };

  const toggleCartpanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsLogin(false);
      setUserData(null);
      return;
    }

    setIsLogin(true);

    fetchDataFromApi("/api/user/user-details")
      .then((res) => {
        if (res?.error === true) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          setIsLogin(false);
          setUserData(null);
          return;
        }

        setUserData(res?.data);
      })
      .catch(() => {
        setIsLogin(false);
        setUserData(null);
      });
  }, [isLogin]);

  useEffect(() => {
      fetchDataFromApi("/api/category").then((res) => {
        if (res?.error === false) {
          setCatData(res?.data);
        }
      });
    }, []);

  const alertBox = (msg, type) => {
    if (type === "success") {
      toast.success(msg);
    }
    if (type === "error") {
      toast.error(msg);
    }
  };
  const values = {
    setOpenProductDetailsModal,
    setOpenCartPanel,
    openCartPanel,
    toggleCartpanel,
    alertBox,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    address,
    setAddress,
    setCatData,
    catData
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route
              path={"/productListing"}
              exact={true}
              element={<ProductListing />}
            />
            <Route
              path={"/product/:id"}
              exact={true}
              element={<ProductDetails />}
            />
            <Route path={"/login"} exact={true} element={<Login />} />
            <Route path={"/register"} exact={true} element={<Register />} />
            <Route path={"/cart"} exact={true} element={<CartPage />} />
            <Route path={"/verify"} exact={true} element={<Verify />} />
            <Route
              path={"/forgot-password"}
              exact={true}
              element={<ForgotPassword />}
            />
            <Route path={"/checkout"} exact={true} element={<Checkout />} />
            <Route path={"/my-account"} exact={true} element={<MyAccount />} />
            <Route path={"/my-list"} exact={true} element={<MyList />} />
            <Route path={"/my-orders"} exact={true} element={<Orders />} />
            <Route path={"/address"} exact={true} element={<AddressForm />} />

          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Dialog
        open={openProductDetailsModal}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailslModal"
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative">
            <Button
              className="w-10! h-10! min-w-10! rounded-full! text-black! absolute! top-0 right-0 bg-[#f1f1f1]!"
              onClick={handleCloseProductDetailsModal}
            >
              <IoCloseSharp className="text-[20px] " />
            </Button>
            <div className="col1 w-[40%]">
              <ProductZoom />
            </div>

            <div className="col2 w-[60%] py-8 px-8">
              <ProductDetailsComponent />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Toaster />
    </>
  );
}

export default App;
export { MyContext };
