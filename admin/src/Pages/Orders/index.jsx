import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Checkbox,
  Avatar,
} from "@mui/material";

import {
  FcPaid,
  FcSettings,
  FcSearch,
  FcOvertime,
  FcDebt,
  FcMoneyTransfer,
} from "react-icons/fc";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdMoreVert,
  MdFilterList,
  MdLocalShipping,
  MdCheckCircle,
  MdCancel,
  MdPending,
} from "react-icons/md";
import {
  FaBox,
  FaRupeeSign,
  FaUser,
  FaCreditCard,
  FaTruck,
  FaCheck,
} from "react-icons/fa";
import { editData, fetchDataFromApi } from "../../utils/api.js";
import { useEffect } from "react";
import { useState } from "react";

import { Tooltip } from "@mui/material";
import { TbTruckDelivery, TbPackage } from "react-icons/tb";
import {
  IoDiamondOutline,
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
} from "react-icons/io5";
import { BsCalendar3, BsCashCoin, BsWallet2, BsReceipt } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FaAngleDown, FaAngleUp, FaBoxOpen } from "react-icons/fa6";
import Badge from "../../Components/Badge";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useContext } from "react";
import { MyContext } from "../../App.jsx";

const Orders = () => {
  const context = useContext(MyContext);
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };

  const handleChange = (e, id) => {
    setOrderStatus(e.target.value);

    const obj = {
      id: id,
      order_status: e.target.value,
    };

    editData(`/api/order/order-status/${id}`, obj).then((res) => {
      if (res?.data?.error === false) {
        context.alertBox(res?.data?.message, "success");
      }
    });
  };

  useEffect(() => {
    fetchDataFromApi("/api/order/order-list").then((res) => {
      if (res?.error === false) {
        setOrders(res?.data);
      }
    });
  }, [orderStatus]);

  // Helper function to format address properly
  const formatAddress = (address) => {
    if (!address) return "No address provided";
    const parts = [
      address.address_line,
      address.city,
      address.state,
      address.landmark,
    ].filter(Boolean);
    let formatted = parts.join(", ");
    if (address.pincode) {
      formatted += ` - ${address.pincode}`;
    }
    return formatted;
  };

  return (
    <div className="p-6 rounded-xl bg-white shadow-xl border border-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md">
            <FcPaid className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Orders Management
            </h2>
            <p className="text-sm text-gray-600">
              View and manage all customer orders
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="contained"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            sx={{
              borderRadius: "12px",
              padding: "10px 20px",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Export Orders
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">
                {orders?.length || 0}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FcPaid className="text-2xl text-blue-500" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-800">₹2,45,899</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FaRupeeSign className="text-2xl text-green-500" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <MdPending className="text-2xl text-purple-500" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-800">₹9,915</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FcMoneyTransfer className="text-2xl text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <TextField
            fullWidth
            placeholder="Search by Order ID, Customer, Email..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FcSearch />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "white",
              },
            }}
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outlined"
            startIcon={<MdFilterList />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              padding: "10px 20px",
            }}
          >
            Filter Orders
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              padding: "10px 20px",
            }}
          >
            Shipping
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <table className="min-w-[1200px] w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
              <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-12"></th>
              <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                ORDER ID
              </th>
              <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                PAYMENT ID
              </th>
              <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                CUSTOMER
              </th>
              <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                CONTACT
              </th>
              <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider min-w-[280px]">
                SHIPPING ADDRESS
              </th>
              <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                AMOUNT
              </th>
              <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                EMAIL
              </th>
              <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                USER ID
              </th>
              <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                DATE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders?.length > 0 ? (
              orders.map((order, index) => (
                <React.Fragment key={order?._id || index}>
                  <tr className="hover:bg-gray-50/80 transition duration-150 group">
                    {/* Expand Button */}
                    <td className="px-4 py-4 align-top">
                      <Tooltip
                        title={
                          isOpenOrderProduct === index
                            ? "Hide items"
                            : "View items"
                        }
                        arrow
                      >
                        <Button
                          className="w-9! h-9! min-w-9! rounded-full! bg-gray-100! hover:bg-primary! group-hover:border-primary transition-all duration-300 shadow-sm"
                          onClick={() => isShowOrderProduct(index)}
                        >
                          {isOpenOrderProduct === index ? (
                            <FaAngleUp className="text-gray-700 text-sm group-hover:text-white" />
                          ) : (
                            <FaAngleDown className="text-gray-700 text-sm group-hover:text-white" />
                          )}
                        </Button>
                      </Tooltip>
                    </td>

                    {/* Order ID */}
                    <td className="px-4 py-4 align-top">
                      <div>
                        <p className="font-mono text-xs font-semibold text-primary bg-primary/5 px-2 py-1 rounded-md inline-block">
                          #{order?._id?.slice(-8)}
                        </p>
                        <Tooltip title={order?._id} arrow>
                          <p className="text-[10px] text-gray-400 mt-1 cursor-pointer">
                            Click for full ID
                          </p>
                        </Tooltip>
                      </div>
                    </td>

                    {/* Payment ID */}
                    <td className="px-4 py-4 align-top">
                      <div>
                        {order?.paymentId ? (
                          <Tooltip title={order?.paymentId} arrow>
                            <p className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md inline-block truncate max-w-[150px]">
                              {order?.paymentId?.slice(-12)}
                            </p>
                          </Tooltip>
                        ) : (
                          <Chip
                            icon={<BsCashCoin className="text-sm" />}
                            label="COD"
                            size="small"
                            className="bg-amber-100 text-amber-700 font-semibold"
                          />
                        )}
                      </div>
                    </td>

                    {/* Customer Name */}
                    <td className="px-4 py-4 align-top">
                      <p className="font-semibold text-gray-800 text-sm">
                        {order?.userId?.name || "N/A"}
                      </p>
                    </td>

                    {/* Phone Number */}
                    <td className="px-4 py-4 align-top">
                      <div className="flex items-center gap-1.5">
                        <IoCallOutline className="text-xs text-gray-400" />
                        <p className="text-sm text-gray-700 font-medium">
                          {order?.userId?.mobile || "N/A"}
                        </p>
                      </div>
                    </td>

                    {/* Address - Now with proper wrapping and better styling */}
                    <td className="px-4 py-4 align-top min-w-[280px] max-w-[320px]">
                      <div className="flex items-start gap-2">
                        <IoLocationOutline className="text-gray-400 text-sm mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                          <p className="text-sm text-gray-700 leading-relaxed break-words whitespace-normal">
                            {formatAddress(order?.delivery_address)}
                          </p>
                          {order?.delivery_address?.address_type && (
                            <Chip
                              label={order.delivery_address.address_type}
                              size="small"
                              className="bg-gray-100 text-gray-600 text-[10px] h-5"
                            />
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-4 align-top">
                      <p className="font-bold text-primary text-base">
                        {order?.totalAmt?.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </p>
                      {order?.payment_status && (
                        <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full inline-block mt-1">
                          {order.payment_status}
                        </span>
                      )}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4 align-top">
                      <div className="flex items-center gap-1.5">
                        <IoMailOutline className="text-xs text-gray-400" />
                        <p className="text-xs text-gray-600 truncate max-w-[140px]">
                          {order?.userId?.email || "N/A"}
                        </p>
                      </div>
                    </td>

                    {/* User ID */}
                    <td className="px-4 py-4 align-top">
                      <Tooltip title={order?.userId?._id} arrow>
                        <p className="font-mono text-xs text-gray-500 cursor-pointer">
                          {order?.userId?._id?.slice(-8)}
                        </p>
                      </Tooltip>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-4 align-top">
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={
                          order?.order_status !== null
                            ? order?.order_status
                            : orderStatus
                        }
                        size="small"
                        className="w-full"
                        onChange={(e) => handleChange(e, order?._id)}
                      >
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"confirm"}>Confirm</MenuItem>
                        <MenuItem value={"delivered"}>Delivered</MenuItem>
                      </Select>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 align-top">
                      <div className="flex items-center gap-1.5">
                        <BsCalendar3 className="text-gray-400 text-xs" />
                        <p className="text-sm text-gray-600 whitespace-nowrap">
                          {order?.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "N/A"}
                        </p>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Order Products Section */}
                  {isOpenOrderProduct === index && (
                    <tr>
                      <td colSpan={11} className="px-0 py-0">
                        <div className="bg-gradient-to-r from-amber-50/40 to-orange-50/40 border-y border-amber-100">
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                              <h4 className="font-bold text-gray-800 flex items-center gap-2 text-sm uppercase tracking-wider">
                                <TbPackage className="text-primary text-lg" />
                                Order Items Details
                                <span className="ml-2 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                                  {order?.products?.length} items
                                </span>
                              </h4>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <BsReceipt />
                                  Order Total:{" "}
                                  <strong className="text-primary">
                                    {order?.totalAmt?.toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                    })}
                                  </strong>
                                </span>
                              </div>
                            </div>

                            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                              <div className="overflow-x-auto">
                                <table className="min-w-[700px] w-full text-sm">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        PRODUCT
                                      </th>
                                      <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        ID
                                      </th>
                                      <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        TITLE
                                      </th>
                                      <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        QTY
                                      </th>
                                      <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        PRICE
                                      </th>
                                      <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        SUBTOTAL
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-100">
                                    {order?.products?.map((product, idx) => (
                                      <tr
                                        key={idx}
                                        className="hover:bg-gray-50 transition-colors"
                                      >
                                        <td className="px-5 py-3 align-middle">
                                          <img
                                            src={product?.image}
                                            alt={product?.productTitle}
                                            className="w-12 h-12 object-cover rounded-lg shadow-sm border border-gray-200 bg-white"
                                            onError={(e) => {
                                              e.target.src =
                                                "https://placehold.co/400x400?text=No+Image";
                                            }}
                                          />
                                        </td>
                                        <td className="px-5 py-3 align-middle">
                                          <p className="font-mono text-xs text-gray-400">
                                            {product?._id?.slice(-8)}
                                          </p>
                                        </td>
                                        <td className="px-5 py-3 align-middle">
                                          <p className="font-medium text-gray-800 text-sm line-clamp-2 max-w-[250px]">
                                            {product.productTitle}
                                          </p>
                                        </td>
                                        <td className="px-5 py-3 align-middle">
                                          <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 text-primary font-bold rounded-lg text-sm">
                                            {product?.quantity}
                                          </span>
                                        </td>
                                        <td className="px-5 py-3 align-middle text-gray-700">
                                          {product?.price?.toLocaleString(
                                            "en-IN",
                                            {
                                              style: "currency",
                                              currency: "INR",
                                            },
                                          )}
                                        </td>
                                        <td className="px-5 py-3 align-middle font-semibold text-gray-800">
                                          {(
                                            product?.price * product?.quantity
                                          )?.toLocaleString("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                          })}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <tfoot className="bg-gray-50 border-t border-gray-200">
                                    <tr>
                                      <td
                                        colSpan={5}
                                        className="px-5 py-3 text-right font-semibold text-gray-700"
                                      >
                                        Total Amount:
                                      </td>
                                      <td className="px-5 py-3 font-bold text-primary text-base">
                                        {order?.totalAmt?.toLocaleString(
                                          "en-IN",
                                          {
                                            style: "currency",
                                            currency: "INR",
                                          },
                                        )}
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <TbTruckDelivery className="text-5xl text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">No orders found</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Your order history will appear here once you place an
                      order.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Orders;
