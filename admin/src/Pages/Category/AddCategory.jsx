import React, { useContext, useState } from "react";
import { FcAddDatabase, FcImageFile, FcUpload, FcFolder } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import { Button, TextField } from "@mui/material";
import { Images } from "lucide-react";
import UploadBox from "../../Components/UploadBox";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { deleteImages, postData } from "../../utils/api.js";
import { MyContext } from "../../App.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });

  const history = useNavigate()

  

  const context = useContext(MyContext);

  const [preview, setPreview] = useState([]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return { ...formFields, [name]: value };
    });
  };

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

    postData("/api/category/create", formFields).then((response) => {
      console.log(response);
      
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        context?.getCat();
        history("/category/list")
      }, 2500);
    });
  };
  return (
    <div className="p-6 rounded-xl bg-white  w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-600 rounded-lg">
          <FcAddDatabase className="text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Add New Category
          </h2>
          <p className="text-sm text-gray-500">Create a new product category</p>
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
            startIcon={<FcFolder />}
          >
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              "Create Category"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
