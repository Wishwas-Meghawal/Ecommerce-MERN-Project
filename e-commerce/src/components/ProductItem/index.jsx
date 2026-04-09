import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { IDLE_BLOCKER, Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { FiZoomIn } from "react-icons/fi";
import { BiGitCompare } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Button, useScrollTrigger } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { deleteData, editData } from "../../utils/api";
import { CircularProgress } from "@mui/material";
import { MdOutlineShoppingCart } from "react-icons/md";

const ProductItem = (props) => {
  const context = useContext(MyContext);

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [cartItem, setCartItem] = useState([]);

  const [activeTab, setActiveTab] = useState(null);
  const [isShowTabs, setIsShowTabs] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = (product, userId, quantity) => {
    const productItem = {
      _id: product?._id,
      name: product?.name,
      image: product?.images[0],
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
      size: props?.item?.size?.length !== 0 ? selectedName : "",
      weight: props?.item?.productWeight?.length !== 0 ? selectedName : "",
      ram: props?.item?.productRam?.length !== 0 ? selectedName : "",
    };
    setIsLoading(true);
    // product size
    if (
      props?.item?.size?.length !== 0 ||
      props?.item?.productRam?.length !== 0 ||
      props?.item?.productWeight?.length !== 0
    ) {
      setIsShowTabs(true);
    } else {
      context?.addToCart(productItem, userId, quantity);
      setIsAdded(true);
      setIsShowTabs(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
    if (activeTab !== null) {
      context?.addToCart(productItem, userId, quantity);
      setIsAdded(true);
      setIsShowTabs(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const handleClickActiveTab = (index, name) => {
    setActiveTab(index);
    setSelectedName(name);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    const item = context?.cartData?.filter((cartItem) =>
      cartItem.productId.includes(props?.item?._id),
    );

    if (item?.length !== 0) {
      setCartItem(item);
      setIsAdded(true);
      setQuantity(item[0]?.quantity);
    } else {
      setQuantity(1);
    }
  }, [context?.cartData]);

  const minusQty = () => {
    if (quantity !== 1 && quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }

    if (quantity === 1) {
      deleteData(`/api/cart/delete-cart-item/${cartItem[0]?._id}`).then(
        (res) => {
          setIsAdded(false);
          context?.alertBox("Cart item deleted successfully", "success");
          context?.getCartItems();
          setIsShowTabs(false);
          setActiveTab(null);
        },
      );
    } else {
      const obj = {
        _id: cartItem[0]?._id,
        quantity: quantity - 1,
        subTotal: props?.item?.price * (quantity - 1),
      };
      editData(`/api/cart/update-quantity`, obj).then((res) => {
        context?.alertBox(res?.data?.message, "success");
        context?.getCartItems();
      });
    }
  };
  const addQty = () => {
    setQuantity(quantity + 1);

    const obj = {
      _id: cartItem[0]?._id,
      quantity: quantity + 1,
      subTotal: props?.item?.price * (quantity + 1),
    };
    editData(`/api/cart/update-quantity`, obj).then((res) => {
      context?.alertBox(res?.data?.message, "success");
      context?.getCartItems();
    });
  };
  return (
    <div className="group relative bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500">
      {/* Discount Badge */}
      <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md z-10">
        {props?.item?.discount}% OFF
      </span>

      {/* Image Section */}
      <div className="relative h-[300px] overflow-hidden flex items-center justify-center bg-white">
        <div className="relative w-full h-full">
          <Link to={`/product/${props?.item?._id}`}>
            {/* Main Image */}
            <img
              src={props?.item?.images[0]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-110 group-hover:opacity-0"
            />

            {/* Hover Image */}
            <img
              src={props?.item?.images[1]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 scale-105 opacity-0 group-hover:opacity-100"
            />
          </Link>

          {isShowTabs === true && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center gap-3">
              {props?.item?.size?.length !== 0 &&
                props?.item?.size?.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className={`
                      flex items-center justify-center
                      px-3 py-2 
                      w-[25px]
                      min-w-[50px]
                      rounded-lg
                      text-sm font-medium
                      cursor-pointer
                      backdrop-blur-md
                      transition-all duration-200
                    bg-white/80 text-black shadow-md hover:bg-white    hover:scale-105
                      active:scale-95 ${activeTab === index && "!bg-primary text-white"}`}
                      onClick={() => handleClickActiveTab(index, item)}
                    >
                      {item}
                    </span>
                  );
                })}

              {props?.item?.productRam?.length !== 0 &&
                props?.item?.productRam?.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className={`
                      flex items-center justify-center
                      px-3 py-2 
                      w-[25px]
                      min-w-[50px]
                      rounded-lg
                      text-sm font-medium
                      cursor-pointer
                      backdrop-blur-md
                      transition-all duration-200
                    bg-white/80 text-black shadow-md hover:bg-white    hover:scale-105
                      active:scale-95 ${activeTab === index && "!bg-primary text-white"}`}
                      onClick={() => handleClickActiveTab(index, item)}
                    >
                      {item}
                    </span>
                  );
                })}

              {props?.item?.productWeight?.length !== 0 &&
                props?.item?.productWeight?.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className={`
                      flex items-center justify-center
                      px-3 py-2 
                      w-[25px]
                      min-w-[50px]
                      rounded-lg
                      text-sm font-medium
                      cursor-pointer
                      backdrop-blur-md
                      transition-all duration-200
                    bg-white/80 text-black shadow-md hover:bg-white    hover:scale-105
                      active:scale-95 ${activeTab === index && "!bg-primary text-white"}`}
                      onClick={() => handleClickActiveTab(index, item)}
                    >
                      {item}
                    </span>
                  );
                })}
            </div>
          )}
        </div>

        {/* Floating Icons */}
        <div className="absolute top-4 right-[-60px] flex flex-col gap-3 transition-all duration-500 group-hover:right-4">
          {[FiHeart, BiGitCompare, FiZoomIn, HiOutlineDocumentText].map(
            (Icon, i) => (
              <Button
                key={i}
                variant="contained"
                sx={{
                  minWidth: 45,
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)",
                  color: "#111",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",

                  "&:hover": {
                    background: "linear-gradient(135deg,#ff4d4d,#ff6a6a)",
                    color: "#fff",
                    transform: "scale(1.1)",
                  },
                }}
                onClick={() =>
                  Icon === FiZoomIn &&
                  context.handleOpenProductDetailsModal(true, props?.item)
                }
              >
                <Icon size={18} />
              </Button>
            ),
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
        {/* Brand */}
        <span className="text-[11px] uppercase tracking-widest text-gray-400 font-medium">
          {props?.item?.brand}
        </span>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-800 mt-1 leading-snug line-clamp-2 hover:text-red-500 transition">
          <Link to={`/product/${props?.item?._id}`}>
            {props?.item?.name?.substr(0, 40) + "..."}
          </Link>
        </h3>

        {/* Rating */}
        <div className="mt-1">
          <Rating
            defaultValue={props?.item?.rating}
            size="small"
            precision={0.5}
            readOnly
            sx={{ color: "#f59e0b" }}
          />
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-gray-400 line-through text-sm">
            ₹{props?.item?.oldPrice}
          </span>
          <span className="text-lg font-bold text-red-500">
            ₹{props?.item?.price}
          </span>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-3">
          {isAdded === false ? (
            <Button
              variant="outlined"
              onClick={() =>
                addToCart(props?.item, context?.userData?._id, quantity)
              }
              sx={{
                width: "100%",
                borderColor: "#ef4444",
                color: "#ef4444",
                fontSize: "11px",
                fontWeight: 600,
                padding: "5px 14px",
                minHeight: "35px",
                textTransform: "uppercase",
                "&:hover": {
                  backgroundColor: "#ef4444",
                  color: "#fff",
                },
              }}
            >
              <MdOutlineShoppingCart size={20} />
              ADD TO CART
            </Button>
          ) : (
            <>
              {isLoading === true ? (
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    borderColor: "#ef4444",
                    color: "#ef4444",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "5px 14px",
                    minHeight: "35px",
                    textTransform: "uppercase",
                    "&:hover": {
                      backgroundColor: "#ef4444",
                      color: "#fff",
                    },
                  }}
                >
                  <CircularProgress size={20} sx={{ color: "#fff !important" }} />
                </Button>
              ) : (
                <div className="mt-3 flex items-center  justify-center">
                  <div className="flex items-center w-[300px] justify-between overflow-hidden rounded-full border border-gray-200 bg-white ">
                    {/* Minus */}
                    <Button
                      disableRipple
                      disableElevation
                      onClick={minusQty}
                      sx={{
                        minWidth: "48px",
                        height: "42px",
                        color: "#ef4444",
                        borderRadius: 0, // 👈 important
                        transition: "all 0.25s ease",

                        "&:hover": {
                          backgroundColor: "#ef4444",
                          color: "#ffffff",
                        },

                        "&:active": {
                          backgroundColor: "#dc2626",
                          borderRadius: 0, // 👈 force again
                        },

                        "&:focus": {
                          outline: "none",
                          borderRadius: 0, // 👈 yaha bhi
                        },

                        "&.Mui-focusVisible": {
                          borderRadius: 0, // 👈 MUI ka hidden culprit
                        },
                      }}
                    >
                      <FaMinus size={13} />
                    </Button>

                    {/* Quantity */}
                    <span className="px-6 text-base font-semibold text-gray-900 select-none ">
                      {quantity}
                    </span>

                    {/* Plus */}
                    <Button
                      disableRipple
                      disableElevation
                      onClick={addQty}
                      sx={{
                        minWidth: "48px",
                        height: "42px",
                        color: "#ef4444",
                        borderRadius: 0, // 👈 important
                        transition: "all 0.25s ease",

                        "&:hover": {
                          backgroundColor: "#ef4444",
                          color: "#ffffff",
                        },

                        "&:active": {
                          backgroundColor: "#dc2626",
                          borderRadius: 0, // 👈 force again
                        },

                        "&:focus": {
                          outline: "none",
                          borderRadius: 0, // 👈 yaha bhi
                        },

                        "&.Mui-focusVisible": {
                          borderRadius: 0, // 👈 MUI ka hidden culprit
                        },
                      }}
                    >
                      <FaPlus size={13} />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
