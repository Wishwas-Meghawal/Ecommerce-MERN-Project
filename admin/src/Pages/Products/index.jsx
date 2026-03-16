import {
  Button,
  MenuItem,
  Select,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  Checkbox,
  IconButton,
  FormControlLabel,
  Switch,
  TextField,
  InputAdornment,
} from "@mui/material";
import { BsDownload, BsTrash, BsTrash3 } from "react-icons/bs";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
import { FcAddDatabase, FcFolder} from "react-icons/fc";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { useEffect } from "react";
import { deleteData, deleteMultipleData, fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { motion, AnimatePresence } from "framer-motion";
import CircularProgress from '@mui/material/CircularProgress';
import { FaLeaf } from "react-icons/fa";
import { FlareSharp } from "@mui/icons-material";


// Dummy ProgressBar (replace with your own)
const ProgressBar = ({ value }) => (
  <div className="w-[100px] h-[6px] bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
      style={{ width: `${value}%` }}
    />
  </div>
);

const Products = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [productData, setProductData] = useState([]);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [sortedIds, setSortedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      let productArr = [];
      if (res?.error === false) {
        for(let i = 0; i < res?.products?.length; i++){
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setTimeout(() =>{
          setProductData(productArr);
          setIsLoading(false);
        },1500)
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
  const deleteMultipleProduct = async() =>{

    if(sortedIds.length === 0){
      context.alertBox("Please select items to delete","error");
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
  }

  // 🔹 checkbox logic
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;

    // Update all items checked status
    const updatedItems = productData.map((item) =>({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);
    
    // Update the sorted Ids state
    if(isChecked){
      const ids = updatedItems.map((item) =>  item._id).sort((a,b) => a-b);
      console.log(ids);
      setSortedIds(ids);
    }
    else{
      setSortedIds([]);
    }
  };

  // Handler to toggle individual checkboxes
  const handleCheckboxChange = (e, id, index)=>{
    const updatedItems = productData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );
    setProductData(updatedItems);

    //Updated the sorted Ids state
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item)=>item._id)
      .sort((a,b)=> a-b);
    setSortedIds(selectedIds);
  };

  //Main Category handle
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setProductSubCat('');
    setProductThirdLavelCat('');
    setIsLoading(true);
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${event.target.value}`).then((res)=>{
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() =>{
          setIsLoading(false);
        },1500)
      }
    })
  };
  

  // Sub Category handle
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    setProductCat('');
    setProductThirdLavelCat('');
    setIsLoading(true);
    fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${event.target.value}`).then((res)=>{
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() =>{
          setIsLoading(false);
        },1500)
      }
    })
  };

  // Sub Third lavel Category handle
  const handleChangeProductThirdLavelCat = (event) => {
    setProductThirdLavelCat(event.target.value);
    setProductCat('');
    setProductSubCat('');
    setIsLoading(true);
    fetchDataFromApi(`/api/product/getAllProductsByThirdLavelCatId/${event.target.value}`).then((res)=>{
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() =>{
          setIsLoading(false);
        },1500)
      }
    })
  };

  return (
    <>
      <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-200"
            >
              <FcFolder className="text-3xl text-white brightness-0 invert" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-3xl font-bold text-gray-800 tracking-tight"
              >
                Products Dashboard
              </motion.h1>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 mt-1"
              >
                Manage and monitor your product inventory
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex gap-3 mt-4 md:mt-0"
          >
            {
              sortedIds?.length !== 0 &&
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
            }
            <Tooltip title="Export Data" arrow>
              <IconButton
                sx={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  padding: "10px 16px",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                    borderColor: "#94a3b8",
                  },
                }}
              >
                <BsDownload className="text-gray-600" />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              startIcon={<FcAddDatabase className="text-white text-lg" />}
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
              sx={{
                borderRadius: "14px",
                padding: "10px 24px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                boxShadow: "0 8px 16px -4px rgba(16, 185, 129, 0.2)",
                "&:hover": {
                  boxShadow: "0 12px 24px -6px rgba(16, 185, 129, 0.3)",
                },
              }}
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Product",
                })
              }
            >
              Add New Product
            </Button>
          </motion.div>
        </div>

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
                          <MenuItem
                            value={cat?._id}
                          >
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
                              <MenuItem
                                value={subCat?._id}
                              >
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
                                  <MenuItem
                                    value={thirdCat?._id}
                                    key={index}
                                  >
                                    <div className="flex items-center gap-2 py-1">
                                      <FcFolder />
                                      <span className="font-medium">{thirdCat?.name}</span>
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
                      checked={productData?.length > 0 ? productData.every((item) => item.checked):false}
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

               {
                  isLoading=== false ? productData?.length !== 0 &&
                  productData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((product, index) => {
                      return (
                        <TableRow
                          key={index}
                          hover
                          className="border-b border-gray-100 last:border-0 group"
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                            checked={product.checked === true ? true : false}
                            onChange={(e)=> handleCheckboxChange(e,product._id,index)}
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
                                    {product?.name}
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
                                    boxShadow: "0 4px 8px rgba(34,197,94,0.2)",
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
                                      boxShadow: "0 4px 8px rgba(34,197,94,0.2)",
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
                                    boxShadow: "0 4px 8px rgba(239,68,68,0.2)",
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
                    :
                    <>
                      <TableRow>
                        <TableCell colSpan={8}>
                          <div className="flex items-center justify-center w-full min-h-[400px]">
                      <CircularProgress color="inherit"/>
                    </div>
                        </TableCell>
                      </TableRow>
                    </>
               }
                      
                
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
    </>
  );
};

export default Products;
