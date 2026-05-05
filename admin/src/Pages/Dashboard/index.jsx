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
import { BsTrash, BsTrash3 } from "react-icons/bs";
import TooltipMUI from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
} from "recharts";
import { TableRow, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  IconButton,
  FormControlLabel,
  Switch,
  TextField,
  InputAdornment,
} from "@mui/material";
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
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { FcFolder } from "react-icons/fc";
import CircularProgress from "@mui/material/CircularProgress";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import SearchBox from "../../Components/SearchBox";

const Dashboard = () => {
  const context = useContext(MyContext);
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [categoryFilterVal, setCategoryFilterVal] = useState();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [productData, setProductData] = useState([]);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [sortedIds, setSortedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [pageOrder, setPageOrder] = useState(1);
  const [totalOrdersData, setTotalOrdersData] = useState([]);

  const [users, setUsers] = useState([]);
  const [allReviews, setAllReviews] = useState([]);

  const [ordersCount, setOrdersCount] = useState(null);

  const [chartData, setChartData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct == index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };
  useEffect(() => {
    fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=5`).then(
      (res) => {
        console.log("ORDER API RESPONSE:", res);

        if (res?.error === false) {
          setOrders(res);
          setOrdersData(res?.data);
        }
      },
    );
    fetchDataFromApi(`/api/order/order-list`).then((res) => {
      if (res?.error === false) {
        setTotalOrdersData(res);
      }
    });

    fetchDataFromApi(`/api/order/count`).then((res) => {
      if (res?.error === false) {
        setOrdersCount(res?.count);
      }
    });
  }, [pageOrder]);

  useEffect(() => {
    if (searchQuery !== "") {
      const filterOrders = totalOrdersData?.data?.filter(
        (order) =>
          order?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order?.userId?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order?.userId?.email
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order?.createdAt.includes(searchQuery),
      );
      setOrdersData(filterOrders);
    } else {
      fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=5`).then(
        (res) => {
          if (res?.error === false) {
            setOrders(res);
            setOrdersData(res?.data);
          }
        },
      );
    }
  }, [searchQuery]);

  useEffect(() =>{
    getTotalSalesByYear();

    fetchDataFromApi("/api/user/getAllUsers").then((res)=>{
      if(res?.error === false){
        setUsers(res?.users)
      }
    })

    fetchDataFromApi("/api/user/getAllReviews").then((res)=>{
      if(res?.error === false){
        setAllReviews(res?.reviews)
      }
    })
  }, [])

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

  
  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      let productArr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.products?.length; i++) {
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setTimeout(() => {
          setProductData(productArr);
          setIsLoading(false);
        }, 1500);
      }
    });
  };

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  //🔹Delete Product
  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        getProducts();
        context.alertBox(res?.message, "success");
      } else {
        context.alertBox(res?.message, "error");
      }
    });
  };

  //Delete Multiple Product
  const deleteMultipleProduct = async () => {
    if (sortedIds.length === 0) {
      context.alertBox("Please select items to delete", "error");
      return;
    }

    try {
      const res = await deleteMultipleData("/api/product/deleteMultiple", {
        ids: sortedIds,
      });

      if (res?.success) {
        getProducts();
        context.alertBox("Products deleted successfully", "success");
      }
    } catch (error) {
      context.alertBox("Error deleting items", "error");
    }
  };

  // 🔹 checkbox logic
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;

    // Update all items checked status
    const updatedItems = productData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);

    // Update the sorted Ids state
    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      console.log(ids);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  //Main Category handle
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setProductSubCat("");
    setProductThirdLavelCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${event.target.value}`,
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    });
  };

  // Sub Category handle
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    setProductCat("");
    setProductThirdLavelCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsBySubCatId/${event.target.value}`,
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    });
  };

  // Sub Third lavel Category handle
  const handleChangeProductThirdLavelCat = (event) => {
    setProductThirdLavelCat(event.target.value);
    setProductCat("");
    setProductSubCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsByThirdLavelCatId/${event.target.value}`,
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    });
  };


  const getTotalUsersByYear = () =>{
    fetchDataFromApi(`/api/order/users`).then((res)=>{
      const users = [];
      res?.TotalUsers?.length !== 0 &&
      res?.TotalUsers?.map((item)=>{
        users.push({
          name: item?.name,
          TotalUsers: parseInt(item?.TotalUsers),
        });
      });
      const uniqueArr = users.filter(
        (obj, index,self) =>
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    })
  }

  const getTotalSalesByYear = () =>{
    fetchDataFromApi(`/api/order/sales`).then((res)=>{
      const sales = [];
      res?.monthlySales?.length !== 0 &&
      res?.monthlySales?.map((item)=>{
        sales.push({
          name: item?.name,
          TotalSales: parseInt(item?.TotalSales),
        });
      });
      const uniqueArr = sales.filter(
        (obj, index,self) =>
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    });
  }

  const handelChangeYear = (event) =>{
    getTotalSalesByYear(event.target.value)
    setYear(event.target.value);
  };

  return (
    <>
      <div className="w-full bg-[#f1faff] py-2 px-5 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
        <div>
          <h1 className="text-[38px] sm:text-[44px] font-extrabold leading-tight mb-4 tracking-tight text-gray-900">
            <span className="block">Good Morning,</span>

            <span className="block mt-1 text-[28px] sm:text-[32px] font-semibold text-gray-500">
              {context?.userData?.name}
            </span>

            <span className="block mt-3 w-20 h-1 rounded-full bg-gray-300"></span>
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

      {
        productData?.length !== 0 && users?.length !== 0 && allReviews?.length !== 0 &&
        <DashboardBoxes  orders={ordersCount} products={productData?.length} users={users?.length} reviews={allReviews?.length} category={context?.catData?.length}/>
      }
      

      <div className="card my-4 sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Products</h2>
        </div>

        <div className="flex items-center w-full pl-5 justify-between pr-5">
          <div className="col  ml-auto flex items-center gap-3">
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
            {sortedIds?.length !== 0 && (
              <Tooltip title="Delete Data" arrow>
                <IconButton
                  sx={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "14px",
                    padding: "10px 16px",
                    backgroundColor: "#fee2e2",
                    "&:hover": {
                      backgroundColor: "#e0f2fe",
                      borderColor: "#0284c7",
                    },
                  }}
                  onClick={deleteMultipleProduct}
                >
                  <BsTrash className="text-gray-600" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
        <div className="relative mt-5 overflow-x-auto pb-5 p-5">
          {/* Product Tabale */}
          {/* Filters Section */}
          <div className="bg-gradient-to-r from-white to-gray-50/80 p-6 rounded-2xl mb-8 border border-gray-100/80 shadow-sm backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-5 items-center">
              {/* Search Field - Full width on mobile, flexible on desktop */}
              <div className="flex-1 w-full">
                <TextField
                  fullWidth
                  placeholder="🔍 Search products, categories, brands..."
                  variant="outlined"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="text-xl">🔍</span>
                      </InputAdornment>
                    ),
                    className: "bg-white/90 backdrop-blur-sm",
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      transition: "all 0.2s ease",
                      "& fieldset": {
                        borderColor: "#e9eef2",
                        borderWidth: "1.5px",
                      },
                      "&:hover fieldset": {
                        borderColor: "#2563eb",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2563eb",
                        borderWidth: "2px",
                        boxShadow: "0 4px 12px rgba(37,99,235,0.12)",
                      },
                    },
                  }}
                />
              </div>

              {/* Filter Sections Container */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Category Filter */}
                <div className="min-w-[200px] flex-1 sm:flex-none">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg hidden sm:block">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                    </div>
                    {context?.catData?.length !== 0 && (
                      <Select
                        className="w-full bg-white/90 backdrop-blur-sm"
                        size="small"
                        value={productCat}
                        onChange={handleChangeProductCat}
                        displayEmpty
                        sx={{
                          borderRadius: "12px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e9eef2",
                            borderWidth: "1.5px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#2563eb",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#2563eb",
                            borderWidth: "2px",
                          },
                          "& .MuiSelect-select": {
                            py: "10px",
                            fontSize: "0.95rem",
                          },
                        }}
                      >
                        {context?.catData?.map((cat, index) => {
                          return (
                            <MenuItem value={cat?._id}>
                              <div className="flex items-center gap-2 py-1">
                                <FcFolder />
                                <span className="font-medium">{cat?.name}</span>
                              </div>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  </div>
                </div>

                {/* Sub Category Filter */}
                <div className="min-w-[200px] flex-1 sm:flex-none">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg hidden sm:block">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                    </div>
                    {context?.catData?.length !== 0 && (
                      <Select
                        className="w-full bg-white/90 backdrop-blur-sm"
                        size="small"
                        value={productSubCat}
                        onChange={handleChangeProductSubCat}
                        displayEmpty
                        sx={{
                          borderRadius: "12px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e9eef2",
                            borderWidth: "1.5px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#2563eb",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#2563eb",
                            borderWidth: "2px",
                          },
                          "& .MuiSelect-select": {
                            py: "10px",
                            fontSize: "0.95rem",
                          },
                        }}
                      >
                        {context?.catData?.map((cat, index) => {
                          return (
                            cat?.children?.length !== 0 &&
                            cat?.children?.map((subCat, index) => {
                              return (
                                <MenuItem value={subCat?._id}>
                                  <div className="flex items-center gap-2 py-1">
                                    <FcFolder />
                                    <span className="font-medium">
                                      {subCat?.name}
                                    </span>
                                  </div>
                                </MenuItem>
                              );
                            })
                          );
                        })}
                      </Select>
                    )}
                  </div>
                </div>

                {/* Third Lavel Category Filter */}
                <div className="min-w-[200px] flex-1 sm:flex-none">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg hidden sm:block">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                    </div>
                    {context?.catData?.length !== 0 && (
                      <Select
                        className="w-full bg-white/90 backdrop-blur-sm"
                        size="small"
                        value={productThirdLavelCat}
                        onChange={handleChangeProductThirdLavelCat}
                        displayEmpty
                        sx={{
                          borderRadius: "12px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e9eef2",
                            borderWidth: "1.5px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#2563eb",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#2563eb",
                            borderWidth: "2px",
                          },
                          "& .MuiSelect-select": {
                            py: "10px",
                            fontSize: "0.95rem",
                          },
                        }}
                      >
                        {context?.catData?.map((cat) => {
                          return (
                            cat?.children?.length !== 0 &&
                            cat?.children?.map((subCat) => {
                              return (
                                subCat?.children?.length !== 0 &&
                                subCat?.children?.map((thirdCat, index) => {
                                  return (
                                    <MenuItem value={thirdCat?._id} key={index}>
                                      <div className="flex items-center gap-2 py-1">
                                        <FcFolder />
                                        <span className="font-medium">
                                          {thirdCat?.name}
                                        </span>
                                      </div>
                                    </MenuItem>
                                  );
                                })
                              );
                            })
                          );
                        })}
                      </Select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="relative overflow-x-auto rounded-xl border border-gray-200">
            <TableContainer>
              <Table stickyHeader size={dense ? "small" : "medium"}>
                {/* Table Head */}
                <TableHead>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/80">
                    <TableCell padding="checkbox" className="bg-transparent">
                      <Checkbox
                        onChange={handleSelectAll}
                        checked={
                          productData?.length > 0
                            ? productData.every((item) => item.checked)
                            : false
                        }
                        sx={{
                          color: "#94a3b8",
                          "&.Mui-checked": {
                            color: "#2563eb",
                          },
                          "&.MuiCheckbox-indeterminate": {
                            color: "#2563eb",
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell
                      className="font-semibold! text-[15px]! text-gray-700 bg-transparent py-4"
                      sx={{ width: "28%" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                        Product
                      </div>
                    </TableCell>

                    <TableCell
                      className="font-semibold! text-[15px]! text-gray-700 bg-transparent py-4"
                      sx={{ width: "15%" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
                        Category
                      </div>
                    </TableCell>

                    <TableCell
                      className="font-semibold! text-[15px]! text-gray-700 bg-transparent py-4"
                      sx={{ width: "15%" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
                        Sub Category
                      </div>
                    </TableCell>

                    <TableCell
                      className="font-semibold! text-[15px]! text-gray-700 bg-transparent py-4"
                      sx={{ width: "12%" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-5 bg-green-500 rounded-full"></span>
                        Price
                      </div>
                    </TableCell>

                    <TableCell
                      className="font-semibold! text-[15px]! text-gray-700 bg-transparent py-4"
                      sx={{ width: "10%" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-5 bg-orange-500 rounded-full"></span>
                        Sales
                      </div>
                    </TableCell>

                    <TableCell
                      className="font-semibold! text-[15px]! text-gray-700 bg-transparent py-4"
                      sx={{ width: "10%" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-5 bg-red-500 rounded-full"></span>
                        Actions
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                  {isLoading === false ? (
                    productData?.length !== 0 &&
                    productData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      ?.map((product, index) => {
                        return (
                          <TableRow
                            key={index}
                            hover
                            className="border-b border-gray-100 last:border-0 group"
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={
                                  product.checked === true ? true : false
                                }
                                onChange={(e) =>
                                  handleCheckboxChange(e, product._id, index)
                                }
                                sx={{
                                  color: "#9ca3af",
                                  "&.Mui-checked": {
                                    color: "#3b82f6",
                                  },
                                }}
                              />
                            </TableCell>

                            <TableCell>
                              <div className="flex items-center gap-4 min-w-[250px]">
                                {/* Fixed size image container - 80x80 pixels */}
                                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 shadow-sm">
                                  <Link
                                    to={`/product/${product?._id}`}
                                    className="w-full h-full"
                                  >
                                    <LazyLoadImage
                                      src={
                                        product?.images?.[0] ||
                                        "https://via.placeholder.com/80"
                                      }
                                      alt={product?.name}
                                      effect="blur"
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                      wrapperClassName="w-full h-full"
                                      placeholder={
                                        <div className="w-full h-full bg-gray-200 animate-pulse" />
                                      }
                                    />
                                  </Link>
                                </div>

                                {/* Product details */}
                                <div className="flex-1">
                                  <Typography
                                    variant="body1"
                                    className="font-semibold text-gray-800"
                                  >
                                    <Link
                                      to={`/product/${product?._id}`}
                                      className="hover:text-blue-600 transition-colors"
                                    >
                                      {product?.name?.substr(0, 40) + "..."}
                                    </Link>
                                  </Typography>
                                  <div className="flex items-center gap-2 mt-1">
                                    {/* Brand badge */}
                                    <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
                                      {product?.brand || "Generic"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                {product?.catName}
                              </span>
                            </TableCell>

                            <TableCell>
                              <span className="px-3 py-1 bg-amber-100 text-blue-700 rounded-full text-xs font-semibold">
                                {product?.subCat}
                              </span>
                            </TableCell>

                            <TableCell sx={{ width: "12%" }}>
                              <div className="flex flex-col leading-tight">
                                {product?.oldPrice && (
                                  <span className="text-xs text-gray-400 line-through">
                                    ₹ {product?.oldPrice}
                                  </span>
                                )}

                                <span className="text-lg font-semibold text-gray-900">
                                  ₹ {product?.price}
                                </span>

                                <span className="text-xs text-green-600 font-medium">
                                  {product?.discount}% off
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold text-gray-700">
                                  {product?.sale} sale
                                </span>
                                {/* <ProgressBar value={20} /> */}
                              </div>
                            </TableCell>

                            <TableCell
                              sx={{
                                padding: "12px 20px",
                              }}
                            >
                              <div className="flex items-center gap-1.5">
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    context.setIsOpenFullScreenPanel({
                                      open: true,
                                      model: "Edit Product",
                                      id: product?._id,
                                    })
                                  }
                                  sx={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "10px",
                                    padding: "8px",
                                    backgroundColor: "white",
                                    transition: "all 0.2s",
                                    "&:hover": {
                                      backgroundColor: "#f0fdf4",
                                      borderColor: "#22c55e",
                                      transform: "translateY(-2px)",
                                      boxShadow:
                                        "0 4px 8px rgba(34,197,94,0.2)",
                                    },
                                  }}
                                >
                                  <MdEdit className="text-green-600 text-lg" />
                                </IconButton>
                                <Link to={`/product/${product?._id}`}>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      border: "1px solid #e5e7eb",
                                      borderRadius: "10px",
                                      padding: "8px",
                                      backgroundColor: "white",
                                      transition: "all 0.2s",
                                      "&:hover": {
                                        backgroundColor: "#f0fdf4",
                                        borderColor: "#22c55e",
                                        transform: "translateY(-2px)",
                                        boxShadow:
                                          "0 4px 8px rgba(34,197,94,0.2)",
                                      },
                                    }}
                                  >
                                    <MdVisibility className="text-green-600 text-lg" />
                                  </IconButton>
                                </Link>

                                <IconButton
                                  size="small"
                                  onClick={() => deleteProduct(product?._id)}
                                  sx={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "10px",
                                    padding: "8px",
                                    backgroundColor: "white",
                                    transition: "all 0.2s",
                                    "&:hover": {
                                      backgroundColor: "#fef2f2",
                                      borderColor: "#ef4444",
                                      transform: "translateY(-2px)",
                                      boxShadow:
                                        "0 4px 8px rgba(239,68,68,0.2)",
                                    },
                                  }}
                                >
                                  <MdDelete className="text-red-500 text-lg" />
                                </IconButton>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  ) : (
                    <>
                      <TableRow>
                        <TableCell colSpan={8}>
                          <div className="flex items-center justify-center w-full min-h-[400px]">
                            <CircularProgress color="inherit" />
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={productData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value));
                  setPage(0);
                }}
                sx={{
                  borderTop: "1px solid #e5e7eb",
                  backgroundColor: "#f9fafb",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Order Table */}
      <div className="card my-4 sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
          <div className="[25%]">
            <SearchBox
              serachQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPageOrder={setPageOrder}
            />
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
              {ordersData?.length > 0 ? (
                ordersData.map((order, index) => (
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

        {orders?.totalPages > 1 && (
          <div className="flex items-center justify-center mt-10 pb-5">
            <Pagination
              showFirstButton
              showLastButton
              count={orders?.totalPages}
              page={pageOrder}
              onChange={(e, value) => setPageOrder(value)}
            />
          </div>
        )}
      </div>
      

      <div className="card my-4 sm:rounded-lg bg-white shadow-md">
        {/* Header */}
        <div className="px-5 py-5 pb-2">
          <h2 className="text-[18px] font-semibold text-gray-800">
            Total Users & Total Sales
          </h2>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 px-5 pb-4">
          <span className="flex items-center gap-2 text-[14px] text-gray-600 cursor-pointer" onClick={getTotalSalesByYear}>
            <span className="w-[8px] h-[8px] rounded-full  bg-green-600"></span>
            Total Sales
          </span>
          <span className="flex items-center gap-2 text-[14px] text-gray-600 cursor-pointer" onClick={getTotalUsersByYear}>
            <span className="w-[8px] h-[8px] rounded-full bg-primary"></span>
            Total Users
          </span>
          
        </div>

        {/* Chart */}
        <div className="w-full h-[300px] px-2 pb-4">
          <ResponsiveContainer width="100%" height="100%">
            {
              chartData?.length !== 0 &&
              <BarChart
                width={1000}
                height={500}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom : 5,
                }}
                >
                  <XAxis
                    dataKey="name"
                    scale= "point"
                    padding= {{ left : 10, right : 10}}
                    tick={{fontSize: 12}}
                    label={{ position: "insideBottom", fontSize: 14}}
                    style={{ fill : context?.theme === "dark" ? "white" : "#000"}}
                  />

                  <YAxis
                    tick={{fontSize: 12}}
                    label={{ position: "insideBottom", fontSize: 14}}
                    style={{ fill : context?.theme === "dark" ? "white" : "#000"}}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#071739",
                      color : 'white'
                    }}
                    labelStyle={{color: "yellow"}}
                    itemStyle={{color : 'cyan'}}
                    cursor={{fill: "white"}}
                  />
                  <Legend/>
                  <CartesianGrid
                    strokeDasharray= "3 3"
                    horizontal={false}
                    vertical={false} 
                  />

                  <Bar dataKey="TotalSales" stacked="a" fill="#16a34a"/>
                  <Bar dataKey="TotalUsers" stacked="b" fill="#0858f7"/>


                </BarChart>
            }
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
