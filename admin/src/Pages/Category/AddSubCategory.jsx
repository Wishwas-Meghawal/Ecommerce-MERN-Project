import React, { useContext, useState } from "react";
import { FcAddDatabase, FcFolder, FcOpenedFolder } from "react-icons/fc";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";



const AddSubCategory = () => {
  const [productCat, setProductCat] = useState("");
  const [productCat2, setProductCat2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const context = useContext(MyContext);
  const history = useNavigate();

  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });
  const [formFields2, setFormFields2] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const handelChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.parentId = event.target.value;
  };
  const handelChangeProductCat2 = (event) => {
    setProductCat2(event.target.value);
    formFields2.parentId = event.target.value;
  };

  const selectCatFun = (catName) => {
    formFields.parentCatName = catName;
  };
  const selectCatFun2 = (catName) => {
    formFields2.parentCatName = catName;
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    const catId = productCat;
    setProductCat(catId);
    setFormFields(() => {
      return { ...formFields, [name]: value };
    });
  };

  const onChangeInput2 = (e) => {
    const { name, value } = e.target;

    const catId = productCat2;
    setProductCat2(catId);
    setFormFields2(() => {
      return { ...formFields2, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (formFields.name === "") {
      context.alertBox("Category Name is required", "error");
      setIsLoading(false);
      return false;
    }

    if (productCat === "") {
      context.alertBox("Please Select Parent Category ", "error");
      setIsLoading(false);
      return false;
    }

    postData("/api/category/create", formFields).then((response) => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        context?.getCat();
        history("/subCategory/list")
      }, 2500);
    });
  };


  const handleSubmit2 = (e) => {
    e.preventDefault();
    setIsLoading2(true);

    // Basic validation
    if (formFields2.name === "") {
      context.alertBox("Category Name is required", "error");
      setIsLoading2(false);
      return false;
    }

    if (productCat2 === "") {
      context.alertBox("Please Select Parent Category ", "error");
      setIsLoading2(false);
      return false;
    }

    postData("/api/category/create", formFields2).then((response) => {
      setTimeout(() => {
        setIsLoading2(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        context?.getCat();
         history("/subCategory/list")
      }, 2500);
    });
  };

  return (
    <div className="w-full h-full bg-gray-100 py-14 px-6 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ================= ADD SUB CATEGORY CARD ================= */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 transition-all duration-300 hover:shadow-2xl">
          {/* Header */}
          <div className="flex items-start gap-4 mb-10">
            <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-md">
              <FcOpenedFolder className="text-2xl text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Subcategory
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Create a new subcategory under parent category
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form className="form py-2" onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Parent Category */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-800">
                    Parent Category <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-gray-400">Required</span>
                </div>

                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    onChange={handelChangeProductCat}
                    sx={{
                      borderRadius: "14px",
                      backgroundColor: "#f9fafb",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e5e7eb",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#cbd5e1",
                      },
                    }}
                    startAdornment={
                      <div className="pr-2 flex items-center">
                        <MdSubdirectoryArrowRight className="text-gray-400" />
                      </div>
                    }
                  >
                    {context?.catData?.length !== 0 &&
                      context?.catData?.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item?._id}
                          onClick={selectCatFun(item?.name)}
                        >
                          <div className="flex items-center gap-2">
                            <FcFolder />
                            <span>{item?.name}</span>
                          </div>
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>

              {/* Subcategory Name */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-800">
                    Subcategory Name <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-gray-400">Required</span>
                </div>

                <TextField
                  fullWidth
                  placeholder="e.g., Smartphones, Men's Clothing, Kitchen Appliances"
                  name="name"
                  value={formFields.name}
                  onChange={onChangeInput}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      backgroundColor: "#f9fafb",
                      "& fieldset": {
                        borderColor: "#e5e7eb",
                      },
                      "&:hover fieldset": {
                        borderColor: "#cbd5e1",
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Button */}
            <div className="mt-12">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md"
                sx={{
                  borderRadius: "14px",
                  padding: "14px",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "15px",
                }}
                startIcon={<FcAddDatabase className="text-white" />}
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Publish and View"
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* ================= ADD THIRD CATEGORY CARD ================= */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 transition-all duration-300 hover:shadow-2xl">
          {/* Header */}
          <div className="flex items-start gap-4 mb-10">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md">
              <FcOpenedFolder className="text-2xl text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Third Lavel Category
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Create a third-level category under subcategory
              </p>
            </div>
          </div>

          <form className="form py-2" onSubmit={handleSubmit2}>
            <div className="space-y-8">
              {/* Parent Category */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-800">
                    Parent Category <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-gray-400">Required</span>
                </div>

                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    onChange={handelChangeProductCat2}
                    sx={{
                      borderRadius: "14px",
                      backgroundColor: "#f9fafb",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e5e7eb",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#cbd5e1",
                      },
                    }}
                    startAdornment={
                      <div className="pr-2 flex items-center">
                        <MdSubdirectoryArrowRight className="text-gray-400" />
                      </div>
                    }
                  >
                    {context?.catData?.length !== 0 &&
                      context?.catData?.map((item, index) => {
                        return (
                          item?.children?.length !== 0 &&
                          item?.children?.map((item2, index2) => {
                            return (
                              <MenuItem
                                key={index2}
                                value={item2?._id}
                                onClick={selectCatFun2(item2?.name)}
                              >
                                <div className="flex items-center gap-2">
                                  <FcFolder />
                                  <span>{item2?.name}</span>
                                </div>
                              </MenuItem>
                            );
                          })
                        );
                      })}
                  </Select>
                </FormControl>
              </div>

              {/* Subcategory Name */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-800">
                    Subcategory Name <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-gray-400">Required</span>
                </div>

                <TextField
                  fullWidth
                  placeholder="e.g., Smartphones, Men's Clothing, Kitchen Appliances"
                  name="name"
                  value={formFields2.name}
                  onChange={onChangeInput2}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      backgroundColor: "#f9fafb",
                      "& fieldset": {
                        borderColor: "#e5e7eb",
                      },
                      "&:hover fieldset": {
                        borderColor: "#cbd5e1",
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Button */}
            <div className="mt-12">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md"
                sx={{
                  borderRadius: "14px",
                  padding: "14px",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "15px",
                }}
                startIcon={<FcAddDatabase className="text-white" />}
              >
                {isLoading2 ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Publish and View"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
