import React, { useContext, useState } from "react";
import { RechartsDevtools } from "@recharts/devtools";
import DashboardBoxes from "../../Components/DashboardBoxes";
import { Button, Chip } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from "../../Components/Badge";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import ProgressBar from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { BsTrash3 } from "react-icons/bs";
import TooltipMUI from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MyContext } from "../../App";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };
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
import { FaBoxOpen } from "react-icons/fa6";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";

const Dashboard = () => {
  const context = useContext(MyContext);
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [categoryFilterVal, setCategoryFilterVal] = useState();

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct == index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };
  useEffect(() => {
    fetchDataFromApi("/api/order/order-list").then((res) => {
      if (res?.error === false) {
        setOrders(res?.data);
      }
    });
  }, []);

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

  const [chart1Data, setChart1Data] = useState([
    { name: "Jan", TotalUsers: 120, TotalSales: 220 },
    { name: "Feb", TotalUsers: 135, TotalSales: 200 },
    { name: "Mar", TotalUsers: 128, TotalSales: 260 },
    { name: "Apr", TotalUsers: 150, TotalSales: 240 },
    { name: "May", TotalUsers: 145, TotalSales: 280 },
    { name: "Jun", TotalUsers: 170, TotalSales: 310 },
    { name: "Jul", TotalUsers: 160, TotalSales: 290 },
    { name: "Aug", TotalUsers: 180, TotalSales: 330 },
    { name: "Sep", TotalUsers: 165, TotalSales: 300 },
    { name: "Oct", TotalUsers: 190, TotalSales: 360 },
    { name: "Nov", TotalUsers: 175, TotalSales: 340 },
    { name: "Dec", TotalUsers: 210, TotalSales: 390 },
  ]);
  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  return (
    <>
      <div className="w-full bg-[#f1faff] py-2 px-5 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
        <div>
          <h1 className="text-[35px] font-bold leading-11 mb-3">
            Good Morning,
            <br />
            Emma
          </h1>
          <p>
            Here's What happing on your store today. See the statistics at once.
          </p>
          <br />
          <Button
            className="btn-blue capitalize!"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
          >
            <FaPlus />
            Add Product
          </Button>
        </div>
        <img src="./banner-img.png" alt="" />
      </div>
      <DashboardBoxes />

      <div className="card my-4 sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Products</h2>
        </div>

        <div className="flex items-center w-full pl-5 justify-between pr-5">
          <div className="col w-[20%]">
            <h4 className="text-[13plx] font-[600] mb-2">Category By</h4>
            <Select
              className="w-full"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={categoryFilterVal}
              onChange={handleChangeCatFilter}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Men</MenuItem>
              <MenuItem value={20}>Women</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
            </Select>
          </div>

          <div className="col w-[25%] ml-auto flex items-center gap-3">
            <Button className="btn bg-green-600! text-white!">Export</Button>
            <Button
              className="btn-blue text-white! "
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Product",
                })
              }
            >
              <FaPlus />
              Add Product
            </Button>
          </div>
        </div>

        <div className="relative mt-5 overflow-x-auto pb-5">
          <table className="min-w-full text-sm text-left text-gray-600">
            {/* Table Head */}
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 pr-0 py-3 w-[10%]">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th>
                <th className="px-0 py-3 whitespace-nowrap">Product</th>
                <th className="px-6 py-3 whitespace-nowrap">Category</th>
                <th className="px-6 py-3 whitespace-nowrap">Sub Category</th>
                <th className="px-6 py-3 whitespace-nowrap">Brand</th>
                <th className="px-6 py-3 whitespace-nowrap">Price</th>
                <th className="px-6 py-3 whitespace-nowrap">Sales</th>
                <th className="px-6 py-3 whitespace-nowrap">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y">
              <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-[rgba(0,0,0,0.1)]">
                <td className="px-6 pr-0 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="w-[45px] h-[45px] rounded-full overflow-hidden bg-yellow-400 group">
                      <Link to="/products/1234">
                        <img
                          src="./nikeV22.jpg"
                          alt="Nike v22"
                          className="w-full h-full object-cover group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <h3 className="font-semibold  text-[15px] leading-4 hover:text-primary">
                        <Link to="/products/1234">Nike v22</Link>
                      </h3>
                      <span className="text-xs text-gray-500">
                        Running Shoes
                      </span>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-2">Footwear</td>

                {/* Sub Category */}
                <td className="px-6 py-2">Running Shoes</td>

                {/* Brand */}
                <td className="px-6 py-2">Nike</td>

                {/* Price */}
                <td className="px-6 py-2 font-medium">
                  <div className="flex  gap-1 flex-col">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500] leading-3">
                      $58.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $60.00
                    </span>
                  </div>
                </td>

                {/* Rating */}
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px] mb-2">
                    <span className="font-[600]">234</span> sale
                  </p>
                  <ProgressBar value={20} type="warning" />
                </td>

                {/* Action */}
                <td className="px-6 py-2 ">
                  <div className="flex items-center gap-1">
                    <TooltipMUI title="Edit Product" placement="top">
                      <Button className="w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.1)]! rounded-full! hover:bg-[#ccc]!">
                        <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20 px]" />
                      </Button>
                    </TooltipMUI>
                    <TooltipMUI title="View Product" placement="top">
                      <Button className="w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.1)]! rounded-full! hover:bg-[#ccc]!">
                        <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20 px]" />
                      </Button>
                    </TooltipMUI>
                    <TooltipMUI title="Delete Product" placement="top">
                      <Button className="w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.1)]! rounded-full! hover:bg-[#ccc]!">
                        <BsTrash3 className="text-[rgba(0,0,0,0.7)] text-[20 px]" />
                      </Button>
                    </TooltipMUI>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end pt-5 pb-5 px-4">
          <Pagination count={10} color="primary" />
        </div>
      </div>

      <div className="card my-4 sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
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
                        <TooltipMUI
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
                        </TooltipMUI>
                      </td>

                      {/* Order ID */}
                      <td className="px-4 py-4 align-top">
                        <div>
                          <p className="font-mono text-xs font-semibold text-primary bg-primary/5 px-2 py-1 rounded-md inline-block">
                            #{order?._id?.slice(-8)}
                          </p>
                          <TooltipMUI title={order?._id} arrow>
                            <p className="text-[10px] text-gray-400 mt-1 cursor-pointer">
                              Click for full ID
                            </p>
                          </TooltipMUI>
                        </div>
                      </td>

                      {/* Payment ID */}
                      <td className="px-4 py-4 align-top">
                        <div>
                          {order?.paymentId ? (
                            <TooltipMUI title={order?.paymentId} arrow>
                              <p className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md inline-block truncate max-w-[150px]">
                                {order?.paymentId?.slice(-12)}
                              </p>
                            </TooltipMUI>
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
                        <TooltipMUI title={order?.userId?._id} arrow>
                          <p className="font-mono text-xs text-gray-500 cursor-pointer">
                            {order?.userId?._id?.slice(-8)}
                          </p>
                        </TooltipMUI>
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-4 align-top">
                        <Badge status={order.order_status} />
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
                                      {order?.totalAmt?.toLocaleString(
                                        "en-IN",
                                        {
                                          style: "currency",
                                          currency: "INR",
                                        },
                                      )}
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
                      <p className="text-gray-500 font-medium">
                        No orders found
                      </p>
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

      {/* <div className="card my-4 sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5 pb-0">
          <h2 className="text-[18px] font-[600]">Total User & Total Sales</h2>
        </div>
        <div className="flex items-center gap-5  px-5 py-5 pt-1">
          <span className="flex items-center gap-1 text-[14px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
            Total User
          </span>
          <span className="flex items-center gap-1 text-[14px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-primary"></span>
            Total Sales
          </span>
        </div>
        <LineChart
          style={{
            width: "100%",
            maxWidth: "1000px",
            height: "100%",
            maxHeight: "500px",
            aspectRatio: 1.618,
          }}
          responsive
          data={chart1Data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none"/>
          <XAxis dataKey="name"  tick={{ fontSize: 12 }}/>
          <YAxis width="auto" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={3} />
          <RechartsDevtools />
        </LineChart>
      </div> */}

      <div className="card my-4 sm:rounded-lg bg-white shadow-md">
        {/* Header */}
        <div className="px-5 py-5 pb-2">
          <h2 className="text-[18px] font-semibold text-gray-800">
            Total Users & Total Sales
          </h2>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 px-5 pb-4">
          <span className="flex items-center gap-2 text-[14px] text-gray-600">
            <span className="w-[8px] h-[8px] rounded-full bg-green-600"></span>
            Total Users
          </span>
          <span className="flex items-center gap-2 text-[14px] text-gray-600">
            <span className="w-[8px] h-[8px] rounded-full bg-primary"></span>
            Total Sales
          </span>
        </div>

        {/* Chart */}
        <div className="w-full h-[300px] px-2 pb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart1Data}>
              <CartesianGrid strokeDasharray="3 6" stroke="none" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickLine={true}
                axisLine={true}
              />

              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickLine={true}
                axisLine={true}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}
                formatter={(value, name) =>
                  name === "TotalSales"
                    ? [`₹${value}`, "TotalSales"]
                    : [value, "TotalUsers"]
                }
              />

              {/* Users Line */}
              <Line
                type="monotone"
                dataKey="TotalUsers"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
              />

              {/* Sales Line */}
              <Line
                type="monotone"
                dataKey="TotalSales"
                stroke="#3872fa"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
