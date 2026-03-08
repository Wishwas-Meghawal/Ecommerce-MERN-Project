import React, { useContext, useEffect, useState } from "react";
import { FcAddDatabase, FcImageFile, FcUpload, FcFolder } from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";

import { MdClose } from "react-icons/md";
import { Button, TextField } from "@mui/material";
import { Images } from "lucide-react";
import UploadBox from "../../Components/UploadBox";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import {
  deleteImages,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api.js";
import { MyContext } from "../../App.jsx";
import CircularProgress from "@mui/material/CircularProgress";

const EditCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });

  const context = useContext(MyContext);

  const [preview, setPreview] = useState([]);

  useEffect(() => {
    const id = context?.isOpenFullScreenPanel?.id;

    fetchDataFromApi(`/api/category/${id}`).then((res) => {
      console.log(res?.category);
      formFields.name=res?.category?.name
      setPreview(res?.category?.images)
    })
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return { ...formFields, [name]: value };
    })
    formFields.images = preview;
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (formFields.name === "") {
      context.alertBox("Category Name is required", "error");
      setIsLoading(false);
      return false;
    }

    if (preview?.length === 0) {
      context.alertBox("Please Select Category Image", "error");
      setIsLoading(false);
      return false;
    }

    editData(`/api/category/${context?.isOpenFullScreenPanel?.id}`, formFields).then((response) => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
      }, 2500);
    });
  };
  return (
    <div className="p-6 rounded-xl bg-white  w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <FaRegEdit className="text-2xl text-white/90" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Edit Category
          </h2>
          <p className="text-sm text-gray-500">Edit a product category</p>
        </div>
      </div>

      {/* Category Name */}
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="text-sm font-medium text-gray-800 block mb-2">
            Category Name <span className="text-red-500">*</span>
          </label>
          <TextField
            fullWidth
            placeholder="e.g., Electronics"
            name="name"
            value={formFields.name}
            onChange={onChangeInput}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* LEFT SIDE - Upload */}
          <UploadBox
            multiple={true}
            name="images"
            url="/api/category/uploadImages"
            setPreviewFun={setPreviewFun}
          />

          <div className="bg-white border border-gray-200 rounded-xl p-5  flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-4">
              Preview
            </label>

            <div className="h-[260px] transition-colors relative overflow-hidden flex items-center justify-center">
              {preview?.length === 0 ? (
                <div className="  text-gray-400 text-sm">No Image Selected</div>
              ) : (
                <div className="overflow-auto">
                  {preview.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
                    >
                      <span
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition"
                        onClick={() => removeImg(image, index)}
                      >
                        <IoMdClose className="text-white text-xs" />
                      </span>

                      <img src={image} className="w-full" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6  border-gray-200">
          <Button
            type="submit"
            variant="contained"
            className="flex-1 bg-green-600 hover:bg-green-700"
            sx={{
              borderRadius: "8px",
              padding: "12px",
              textTransform: "none",
              fontWeight: 600,
            }}
            startIcon={<FaRegEdit />}
          >
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              "Edit Category"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
