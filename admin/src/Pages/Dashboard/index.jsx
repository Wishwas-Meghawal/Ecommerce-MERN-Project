import React, { useContext, useState } from "react";
import { RechartsDevtools } from "@recharts/devtools";
import DashboardBoxes from "../../Components/DashboardBoxes";
import { Button } from "@mui/material";
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

const Dashboard = () => {
  const context = useContext(MyContext);
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [categoryFilterVal, setCategoryFilterVal] = useState();

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

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct == index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
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
          <Button className="btn-blue capitalize!" onClick={()=>context.setIsOpenFullScreenPanel({
                        open:true,
                        model:"Add Product"
                      })}>
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
            <Button className="btn-blue text-white! " onClick={()=>context.setIsOpenFullScreenPanel({
                        open:true,
                        model:"Add Product"
                      })}>
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
        <div className="relative mt-5 overflow-x-auto pb-5">
          <table className="min-w-full text-sm text-left text-gray-600">
            {/* Table Head */}
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3">&nbsp;</th>
                <th className="px-6 py-3 whitespace-nowrap">Order ID</th>
                <th className="px-6 py-3 whitespace-nowrap">Paymant Id</th>
                <th className="px-6 py-3 whitespace-nowrap">Name</th>
                <th className="px-6 py-3 whitespace-nowrap">Phone Number</th>
                <th className="px-6 py-3 whitespace-nowrap">Address</th>
                <th className="px-6 py-3 whitespace-nowrap">Pincode</th>
                <th className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                <th className="px-6 py-3 whitespace-nowrap">Email</th>
                <th className="px-6 py-3 whitespace-nowrap">User Id</th>
                <th className="px-6 py-3 whitespace-nowrap">Order Status</th>
                <th className="px-6 py-3 whitespace-nowrap">Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y">
              <tr className="hover:bg-gray-50 border-b border-[rgba(0,0,0,0.1)]">
                <td>
                  <Button
                    className="w-[35px]! h-[35px]! min-w-[35px]! rounded-full! bg-[#f1fdf1]!"
                    onClick={() => isShowOrderProduct(0)}
                  >
                    {isOpenOrderProduct === 0 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  <span className="text-primary">3874bhjjb937y1nb73y49</span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  <span className="text-primary">3874bhjjb937y1nb73y49</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Show Yamato</td>
                <td className="px-6 py-4">134567890</td>
                <td>
                  <span className="block w-[400px]">
                    Dilli Haat Pitampura, Near Netaji Subhash Place Metro
                    Station, Delhi, 110052, India
                  </span>
                </td>
                <td className="px-6 py-4">123456</td>
                <td className="px-6 py-4">$200.00</td>
                <td className="px-6 py-4">show@gmail.com</td>
                <td className="px-6 py-4">
                  <span className="text-primary">3874bhjjb937y1nb73y49</span>
                </td>
                <td className="px-6 py-4">
                  <Badge status="delivered" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">28-12-2025</td>
              </tr>

              {isOpenOrderProduct === 0 && (
                <tr className="border-b border-[rgba(0,0,0,0.1)]">
                  <td className="pl-20" colSpan="6">
                    <div className="relative mt-5 overflow-x-auto bg-white">
                      <table className="min-w-full text-sm text-left text-primary">
                        {/* Table Head */}
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                          <tr className="border-b border-[rgba(0,0,0,0.1)]">
                            <th className="px-6 py-3 whitespace-nowrap">
                              Product Id
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Product Title
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Image
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Quantity
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Price
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              SubTotal
                            </th>
                          </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y">
                          <tr className="hover:bg-gray-50 border-b border-[rgba(0,0,0,0.1)]">
                            <td className="px-6 py-4 font-medium text-gray-900">
                              <span className="text-gray-600">
                                3874bhjjb937y1nb73y49
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                              Men Pure Cotton Striped Casual Shirt
                            </td>

                            <td className="px-6 py-4">
                              <img
                                src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFyvmaGbG3yOnp_yaTqXq7eKDJA5uoru9K-owHvFevVDxjq4jZdg5Tln2MAlgkLvoCWXdqgRgqhh9a4DvEuIYb6lVwdGLlc4cCumZRHJQ"
                                alt=""
                                className="w-10 h-10 object-cover rounded-md"
                              />
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">2</td>

                            <td className="px-6 py-4">$1300.00</td>
                            <td className="px-6 py-4">$2600.00</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">
                              <span className="text-gray-600">
                                3874bhjjb937y1nb73y49
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                              Men Pure Cotton Striped Casual Shirt
                            </td>

                            <td className="px-6 py-4">
                              <img
                                src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFyvmaGbG3yOnp_yaTqXq7eKDJA5uoru9K-owHvFevVDxjq4jZdg5Tln2MAlgkLvoCWXdqgRgqhh9a4DvEuIYb6lVwdGLlc4cCumZRHJQ"
                                alt=""
                                className="w-10 h-10 object-cover rounded-md"
                              />
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">2</td>

                            <td className="px-6 py-4">$1300.00</td>
                            <td className="px-6 py-4">$2600.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
              <tr className="hover:bg-gray-50">
                <td>
                  <Button
                    className="w-[35px]! h-[35px]! min-w-[35px]! rounded-full! bg-[#f1fdf1]!"
                    onClick={() => isShowOrderProduct(1)}
                  >
                    {isOpenOrderProduct === 1 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  <span className="text-primary">3874bhjjb937y1nb73y49</span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  <span className="text-primary">3874bhjjb937y1nb73y49</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Show Yamato</td>
                <td className="px-6 py-4">134567890</td>
                <td>
                  <span className="block w-[400px]">
                    Dilli Haat Pitampura, Near Netaji Subhash Place Metro
                    Station, Delhi, 110052, India
                  </span>
                </td>
                <td className="px-6 py-4">123456</td>
                <td className="px-6 py-4">$200.00</td>
                <td className="px-6 py-4">show@gmail.com</td>
                <td className="px-6 py-4">
                  <span className="text-gray-600">3874bhjjb937y1nb73y49</span>
                </td>
                <td className="px-6 py-4">
                  <Badge status="delivered" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">28-12-2025</td>
              </tr>

              {isOpenOrderProduct === 1 && (
                <tr>
                  <td className="pl-20" colSpan="6">
                    <div className="relative mt-5 overflow-x-auto bg-white">
                      <table className="min-w-full text-sm text-left text-gray-600">
                        {/* Table Head */}
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                          <tr>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Product Id
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Product Title
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Image
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Quantity
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Price
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              SubTotal
                            </th>
                          </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y">
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">
                              <span className="text-gray-600">
                                3874bhjjb937y1nb73y49
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                              Men Pure Cotton Striped Casual Shirt
                            </td>

                            <td className="px-6 py-4">
                              <img
                                src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFyvmaGbG3yOnp_yaTqXq7eKDJA5uoru9K-owHvFevVDxjq4jZdg5Tln2MAlgkLvoCWXdqgRgqhh9a4DvEuIYb6lVwdGLlc4cCumZRHJQ"
                                alt=""
                                className="w-10 h-10 object-cover rounded-md"
                              />
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">2</td>

                            <td className="px-6 py-4">$1300.00</td>
                            <td className="px-6 py-4">$2600.00</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">
                              <span className="text-gray-600">
                                3874bhjjb937y1nb73y49
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                              Men Pure Cotton Striped Casual Shirt
                            </td>

                            <td className="px-6 py-4">
                              <img
                                src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFyvmaGbG3yOnp_yaTqXq7eKDJA5uoru9K-owHvFevVDxjq4jZdg5Tln2MAlgkLvoCWXdqgRgqhh9a4DvEuIYb6lVwdGLlc4cCumZRHJQ"
                                alt=""
                                className="w-10 h-10 object-cover rounded-md"
                              />
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">2</td>

                            <td className="px-6 py-4">$1300.00</td>
                            <td className="px-6 py-4">$2600.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
                  name === "TotalSales" ? [`₹${value}`, "TotalSales"] : [value, "TotalUsers"]
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
