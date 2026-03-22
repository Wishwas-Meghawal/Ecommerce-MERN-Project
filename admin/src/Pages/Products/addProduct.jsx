import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Rating,
  Paper,
  FormControl,
  CircularProgress,
} from "@mui/material";
import UploadBox from "../../Components/UploadBox";
import { MyContext } from "../../App";
import { FcAddDatabase, FcFolder } from "react-icons/fc";
import { WidthFull } from "@mui/icons-material";
import { deleteImages, fetchDataFromApi, postData } from "../../utils/api";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Category from "../Category";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps:{
//     style:{
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       Width:250
//     },
//   },
// };
// Shared styles for consistent input styling

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#F9FAFB",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "#FFFFFF",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#3B82F6",
        borderWidth: "2px",
      },
    },
    "&.Mui-focused": {
      backgroundColor: "#FFFFFF",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#3B82F6",
        borderWidth: "2px",
      },
    },
  },
};

const selectStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#F9FAFB",
    transition: "all 0.2s",

    "&:hover": {
      backgroundColor: "#FFFFFF",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#3B82F6",
        borderWidth: "2px",
      },
    },

    "&.Mui-focused": {
      backgroundColor: "#FFFFFF",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#3B82F6",
        borderWidth: "2px",
      },
    },
  },
};

const AddProduct = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdsubCat: "",
    thirdsubCatId: "",
    coutInStock: "",
    rating: 0, // Changed to number for Rating component
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
  });
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
  const [productRams, setProductRams] = useState([]);
  const [productRamsData, setProductRamsData] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productWeightData, setProductWeightData] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productSizeData, setProductSizeData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [preview, setPreview] = useState([]);

  const setPreviewFun = (previewsArr) => {
    setPreview(previewsArr);
    formFields.images = previewsArr;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = preview;
    deleteImages(`/api/category/deleteImage?img=${image}`).then((res) => {
      imageArr.splice(index, 1);

      setPreview([]);

      setTimeout(() => {
        setPreview(imageArr);
        formFields.images = previewsArr;
      }, 100);
    });
  };

  const context = useContext(MyContext);

  const history = useNavigate();

  useEffect(() => {
    fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
      if (res?.error === false) {
        setProductRamsData(res?.data);
      }
    });

    fetchDataFromApi("/api/product/productWEIGHT/get").then((res) => {
      if (res?.error === false) {
        setProductWeightData(res?.data);
      }
    });

    fetchDataFromApi("/api/product/productSIZE/get").then((res) => {
      if (res?.error === false) {
        setProductSizeData(res?.data);
      }
    });
  }, []);

  //Main Category handle
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId = event.target.value;
    formFields.category = event.target.value;
  };
  const selectCatByName = (name) => {
    formFields.catName = name;
  };

  // Sub Category handle
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };
  const selectSubCatByName = (name) => {
    formFields.subCat = name;
  };
  // Sub Third lavel Category handle
  const handleChangeProductThirdLavelCat = (event) => {
    setProductThirdLavelCat(event.target.value);
    formFields.thirdsubCatId = event.target.value;
  };
  const selectThirdLavelCatByName = (name) => {
    formFields.thirdsubCat = name;
  };

  //is featured handle
  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
    formFields.isFeatured = event.target.value;
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return { ...formFields, [name]: value };
    });
  };

  // Product Rams Handle
  const handleChangeProductRams = (event) => {
    const {
      target: { value },
    } = event;

    setProductRams(typeof value === "string" ? value.split(",") : value);
    formFields.productRam = value;
  };
  // Product Weigth Handle
  const handleChangeProductWeight = (event) => {
    const {
      target: { value },
    } = event;

    setProductWeight(typeof value === "string" ? value.split(",") : value);
    formFields.productWeight = value;
  };

  //Product Size Handle
  const handleChangeProductSize = (event) => {
    const {
      target: { value },
    } = event;

    setProductSize(typeof value === "string" ? value.split(",") : value);
    formFields.size = value;
  };

  // Handler for rating change
  const handleRatingChange = (event, newValue) => {
    setFormFields((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const onChangeRating = (e) => {
    setFormFields(() => ({
      ...formFields,
      rating: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields?.name.trim() === "") {
      context.alertBox("Please Enter Product Name", "error");
      return false;
    }

    if (formFields?.description.trim() === "") {
      context.alertBox("Please Enter Product Description", "error");
      return false;
    }

    if (formFields?.catId === "") {
      context.alertBox("Please Select Category", "error");
      return false;
    }

    if (formFields?.brand.trim() === "") {
      context.alertBox("Please Enter Brand Name", "error");
      return false;
    }

    if (formFields?.price === "" || formFields?.price <= 0) {
      context.alertBox("Please Enter Valid Price", "error");
      return false;
    }

    if (
      formFields?.oldPrice !== "" &&
      formFields?.oldPrice < formFields?.price
    ) {
      context.alertBox("Old Price Must Be Greater Than Price", "error");
      return false;
    }

    if (formFields?.discount !== "" && formFields?.discount < 0) {
      context.alertBox("Discount Cannot Be Negative", "error");
      return false;
    }

    if (formFields?.coutInStock === "" || formFields?.coutInStock < 0) {
      context.alertBox("Please Enter Valid Stock Quantity", "error");
      return false;
    }

    if (formFields?.rating === "") {
      context.alertBox("Please Enter Product Rating ", "error");
      return false;
    }

    if (preview?.length === 0) {
      context.alertBox("Please Upload At Least One Image", "error");
      return false;
    }

    postData("/api/product/create", formFields).then((res) => {
      if (res?.error === false) {
        context.alertBox(res?.message, "success");
        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({
            open: false,
          });
          history("/products");
        }, 1000);
      } else {
        setIsLoading(false);
        context.alertBox(res?.message, "error");
      }
    });
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-gray-50 to-white">
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-600 rounded-lg">
              <FcAddDatabase className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Add New Product
              </h2>
              <p className="text-sm text-gray-500">
                Fill in the product details below
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* LEFT COLUMN */}
            <div className="xl:col-span-2 space-y-8">
              {/* BASIC INFO - Premium Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.  04)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 border border-gray-100/50">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                <div className="p-8">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Basic Product Information
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Product name and description
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        Product Name
                        <span className="text-red-500">*</span>
                      </label>
                      <TextField
                        placeholder="e.g. Nike Air Max 270"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="name"
                        value={formFields.name}
                        onChange={onChangeInput}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#F9FAFB",
                            transition: "all 0.2s",
                            "&:hover": {
                              backgroundColor: "#FFFFFF",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#3B82F6",
                                borderWidth: "2px",
                              },
                            },
                            "&.Mui-focused": {
                              backgroundColor: "#FFFFFF",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#3B82F6",
                                borderWidth: "2px",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Product Description
                      </label>
                      <TextField
                        placeholder="Describe your product in detail..."
                        multiline
                        rows={4}
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="description"
                        value={formFields.description}
                        onChange={onChangeInput}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#F9FAFB",
                            transition: "all 0.2s",
                            "&:hover": {
                              backgroundColor: "#FFFFFF",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#3B82F6",
                                borderWidth: "2px",
                              },
                            },
                            "&.Mui-focused": {
                              backgroundColor: "#FFFFFF",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#3B82F6",
                                borderWidth: "2px",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CATEGORY & BRAND - Premium Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 border border-gray-100/50">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                <div className="p-8">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-5-5A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Category & Brand
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Classification details
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Product Category
                      </label>

                      {context?.catData?.length !== 0 && (
                        <TextField
                          select
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={productCat}
                          onChange={handleChangeProductCat}
                          sx={selectStyles}
                        >
                          {context?.catData?.map((cat, index) => {
                            return (
                              <MenuItem
                                value={cat?._id}
                                onClick={() => selectCatByName(cat?.name)}
                              >
                                <div className="flex items-center gap-2">
                                  <FcFolder />
                                  <span>{cat?.name}</span>
                                </div>
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Product Sub Category
                      </label>

                      {context?.catData?.length !== 0 && (
                        <TextField
                          select
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={productSubCat}
                          onChange={handleChangeProductSubCat}
                          sx={selectStyles}
                        >
                          {context?.catData?.map((cat, index) => {
                            return (
                              cat?.children?.length !== 0 &&
                              cat?.children?.map((subCat, index) => {
                                return (
                                  <MenuItem
                                    value={subCat?._id}
                                    onClick={() =>
                                      selectSubCatByName(subCat?.name)
                                    }
                                  >
                                    <div className="flex items-center gap-2">
                                      <FcFolder />
                                      <span>{subCat?.name}</span>
                                    </div>
                                  </MenuItem>
                                );
                              })
                            );
                          })}
                        </TextField>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Product Third Lavel Category
                      </label>

                      {context?.catData?.length !== 0 && (
                        <TextField
                          select
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={productThirdLavelCat}
                          onChange={handleChangeProductThirdLavelCat}
                          sx={selectStyles}
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
                                        onClick={() =>
                                          selectThirdLavelCatByName(
                                            thirdCat?.name,
                                          )
                                        }
                                      >
                                        <div className="flex items-center gap-2">
                                          <FcFolder />
                                          <span>{thirdCat?.name}</span>
                                        </div>
                                      </MenuItem>
                                    );
                                  })
                                );
                              })
                            );
                          })}
                        </TextField>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Product Brand
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="brand"
                        value={formFields.brand}
                        onChange={onChangeInput}
                        sx={inputStyles}
                      ></TextField>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Is Featured?
                      </label>
                      <TextField
                        select
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={productFeatured}
                        onChange={handleChangeProductFeatured}
                        sx={inputStyles}
                      >
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                      </TextField>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRICING - Premium Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 border border-gray-100/50">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                <div className="p-8">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                      <svg
                        className="w-6 h-6 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Pricing
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Price and discount information
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Product Price ($)
                      </label>
                      <TextField
                        type="number"
                        placeholder="0.00"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="price"
                        value={formFields.price}
                        onChange={onChangeInput}
                        InputProps={{
                          startAdornment: (
                            <span className="text-gray-500 pr-2 font-medium">
                              $
                            </span>
                          ),
                        }}
                        sx={inputStyles}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Product Old Price ($)
                      </label>
                      <TextField
                        type="number"
                        placeholder="0.00"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="oldPrice"
                        value={formFields.oldPrice}
                        onChange={onChangeInput}
                        InputProps={{
                          startAdornment: (
                            <span className="text-gray-500 pr-2 font-medium">
                              $
                            </span>
                          ),
                        }}
                        sx={inputStyles}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Product Discount (%)
                      </label>
                      <TextField
                        type="number"
                        placeholder="0"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="discount"
                        value={formFields.discount}
                        onChange={onChangeInput}
                        InputProps={{
                          endAdornment: (
                            <span className="text-gray-500 pl-2 font-medium">
                              %
                            </span>
                          ),
                        }}
                        sx={inputStyles}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* INVENTORY & SPECS - Premium Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 border border-gray-100/50">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                <div className="p-8">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Inventory & Specifications
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Stock and product specs
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Product Stock
                      </label>
                      <TextField
                        type="number"
                        placeholder="0"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="coutInStock"
                        value={formFields.coutInStock}
                        onChange={onChangeInput}
                        sx={inputStyles}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Product RAM (GB)
                      </label>
                      {productRamsData?.length !== 0 && (
                        <FormControl fullWidth size="small" sx={selectStyles}>
                          <Select
                            multiple
                            variant="outlined"
                            value={productRams}
                            onChange={handleChangeProductRams}
                            SelectProps={{
                              renderValue: (selected) => selected.join(", "),
                            }}
                          >
                            {productRamsData?.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.name}>
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Product Weight (kg)
                      </label>
                      {productWeightData?.length !== 0 && (
                        <FormControl fullWidth size="small" sx={selectStyles}>
                          <Select
                            multiple
                            variant="outlined"
                            value={productWeight}
                            onChange={handleChangeProductWeight}
                            SelectProps={{
                              renderValue: (selected) => selected.join(", "),
                            }}
                          >
                            {productWeightData?.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.name}>
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Product Size
                      </label>
                      {productSizeData?.length !== 0 && (
                        <FormControl fullWidth size="small" sx={selectStyles}>
                          <Select
                            multiple
                            variant="outlined"
                            value={productSize}
                            onChange={handleChangeProductSize}
                            SelectProps={{
                              renderValue: (selected) => selected.join(", "),
                            }}
                          >
                            {productSizeData?.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.name}>
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}
                    </div>

                    {/* RATING COMPONENT - ADDED HERE */}
                    <div className="space-y-2 col-span-1">
                      <label className="text-sm font-medium text-gray-700">
                        Product Rating
                      </label>
                      <div className="flex items-center gap-4 p-2 bg-[#F9FAFB] rounded-xl border-2  border-gray-100 hover:border-[#3B82F6] transition-all duration-200">
                        <Rating
                          name="half-rating"
                          defaultValue={1}
                          precision={0.5}
                          onChange={onChangeRating}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Upload Box */}
            <div className="xl:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Upload Box */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                  <UploadBox
                    multiple={true}
                    name="images"
                    url="/api/product/uploadImages"
                    setPreviewFun={setPreviewFun}
                  />
                </div>

                {/* Preview Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col">
                  <label className="text-sm font-semibold text-gray-800 mb-4 tracking-wide">
                    Image Preview
                  </label>

                  <div className="min-h-[260px] transition-all relative overflow-hidden">
                    {preview?.length === 0 ? (
                      <div className="h-[260px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                        <span className="text-gray-400 text-sm">
                          No Image Selected
                        </span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 max-h-[260px] overflow-y-auto pr-1">
                        {preview.map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group hover:shadow-md transition-all duration-300"
                          >
                            {/* Remove Button */}
                            <span
                              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md"
                              onClick={() => removeImg(image, index)}
                            >
                              <IoMdClose className="text-white text-sm" />
                            </span>

                            <img
                              src={image}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              alt="preview"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION BAR */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-4">
            <Button
              variant="outlined"
              className="px-8 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              {isLoading === true ? (
                <CircularProgress color="inherit" />
              ) : (
                "Save Product"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
