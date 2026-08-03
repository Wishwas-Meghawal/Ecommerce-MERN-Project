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
import SearchPage from "./Pages/Search/index.jsx";
import OrderSuccess from "./Pages/Orders/success.jsx";
import OrderFailed from "./Pages/Orders/failed.jsx";

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {},
  });

  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [openAddressPanel, setOpenAddressPanel] = useState(false);

  const [maxWidth, setMaxWidth] = useState("lg");

  const [isLogin, setIsLogin] = useState(false);

  const [userData, setUserData] = useState(null);

  const [address, setAddress] = useState([]);

  const [catData, setCatData] = useState([]);

  const [cartData, setCartData] = useState([]);

  const [myListData, setMyListData] = useState([]);

  const [addressMode, setAddressMode] = useState("add");

  const [addressId, setAddressId] = useState("");

  const [searchData, setSearchData] = useState([]);

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

  const toggleAddresspanel = (newOpen) => () => {
    if(newOpen == false){
      setAddressMode("add")
    }
    setOpenAddressPanel(newOpen);
  };



  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

     
      getCartItems();
      getMyListData();
      getUserDetails();
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const getUserDetails = () =>{
     fetchDataFromApi("/api/user/user-details").then((res) => {
        setUserData(res.data);
        if (res?.response?.data?.error === true) {
          if (res?.response?.data?.message === "You have not Login") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            alertBox("Your sesion is closed please login  again", "error");

            window.location.href = "/login";
            setIsLogin(false);
          }
        }
      });
  }

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

  const getMyListData = () => {
    fetchDataFromApi("/api/myList").then((res) => {
      if (res?.error == false) {
        setMyListData(res?.data);
      }
    });
  };

  const values = {
    openProductDetailsModal,
    setOpenProductDetailsModal,
    handleOpenProductDetailsModal,
    handleCloseProductDetailsModal,
    setOpenCartPanel,
    openCartPanel,
    toggleCartpanel,
    setOpenAddressPanel,
    openAddressPanel,
    toggleAddresspanel,
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
    setCartData,
    getCartItems,
    myListData,
    setMyListData,
    getMyListData,
    getUserDetails,
    addressMode,
    setAddressMode,
    addressId,
    setAddressId,
    searchData,
    setSearchData,
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
            <Route path={"/order/success"} exact={true} element={<OrderSuccess />} />
            <Route path={"/order/failed"} exact={true} element={<OrderFailed />} />
            <Route path={"/address"} exact={true} element={<AddressForm />} />
            <Route path={"/search"} exact={true} element={<SearchPage />} />
          </Routes>
          <ScrollToTop />
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />
    </>
  );
}

export default App;
export { MyContext };
