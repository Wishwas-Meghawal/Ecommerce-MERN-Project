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
import { fetchDataFromApi, postData } from "./utils/api.js";
import AddressForm from "./Pages/MyAccount/AddressForm";
import { Scroll, Weight } from "lucide-react";
import ScrollToTop from "./components/ScrollToTop/index.jsx";



function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {},
  });
  const [fullWidth, setFullWidth] = useState(true);

  const [openCartPanel, setOpenCartPanel] = useState(false);

  const [maxWidth, setMaxWidth] = useState("lg");

  const [isLogin, setIsLogin] = useState(false);

  const [userData, setUserData] = useState(null);

  const [address, setAddress] = useState([]);

  const [catData, setCatData] = useState([]);

  const [cartData, setCartData] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleOpenProductDetailsModal = (status, item) => {
    setOpenProductDetailsModal({
      open: status,
      item: item,
    });
  };

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal({
      open: false,
      item: {},
    });
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
        getCartItems();
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

  const addToCart = (product, userId, quantity) => {
    if (userId === undefined) {
      alertBox("Please login to add items to cart", "error");
      return false;
    }

    const data = {
      productTitle: product?.name,
      image: product?.image,
      rating: product?.rating,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      productId: product?._id,
      coutInStock: product?.coutInStock,
      userId: userId,
      brand: product?.brand,
      size: product?.size,
      weight: product?.weight,
      ram: product?.ram,
      
    };

    postData("/api/cart/add", data).then((res) => {
      if (res?.error === false) {
        alertBox(res?.message, "success");

        getCartItems();
      } else {
        alertBox(res?.message, "error");
      }
    });
  };

  const getCartItems = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (res?.error === false) {
        setCartData(res?.data);
      }
    });
  };

  const values = {
    setOpenProductDetailsModal,
    handleOpenProductDetailsModal,
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
    catData,
    addToCart,
    cartData,
    getCartItems,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <ScrollToTop />
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route
              path={"/products"}
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
          <ScrollToTop />
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Dialog
        open={openProductDetailsModal.open}
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

            {openProductDetailsModal?.item?.length !== 0 && (
              <>
                <div className="col1 w-[40%]">
                  <ProductZoom images={openProductDetailsModal?.item?.images} />
                </div>

                <div className="col2 w-[60%] py-8 px-8">
                  <ProductDetailsComponent
                    item={openProductDetailsModal?.item}
                  />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Toaster />
    </>
  );
}

export default App;
export { MyContext };
