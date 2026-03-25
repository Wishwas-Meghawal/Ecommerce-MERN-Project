import React, { useDeferredValue, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { FcImageFile, FcUpload } from "react-icons/fc";
import { MdImage, MdInfo } from "react-icons/md";
import { Button } from "@mui/material";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useState } from "react";
import { deleteImages, postData } from "../../utils/api";
import UploadBox from "../../Components/UploadBox";
import { IoMdClose } from "react-icons/io";

const AddHomeSlider = () => {
  const context = useContext(MyContext);
  const history = useNavigate()

  const [formFields, setFormFields] = useState({
    images: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState([]);

  

  const setPreviewFun = (previewsArr) => {
    setPreview(previewsArr);
    formFields.images = previewsArr;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = preview;
    deleteImages(`/api/homeSlides/deleteImage?img=${image}`).then((res) => {
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
      if (preview?.length === 0) {
        context.alertBox("Please Select Slide Image", "error");
        setIsLoading(false);
        return false;
      }
  
      postData("/api/homeSlides/create", formFields).then((response) => {
        console.log(response);
        
        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({
            open: false,
          });
          history("/homeSlider/list")
        }, 2500);
      });
    };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
          <FcImageFile className="text-2xl text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Add Banner Image</h2>
          <p className="text-sm text-gray-600">
            Upload homepage slider image only
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <form className="form py-8 px-8 bg-white rounded-2xl shadow-sm border border-gray-100"  onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left - Upload Section */}
          <div className="h-[420px]">
            <div className="h-full rounded-2xl border-2  border-gray-200 bg-gray-50/40 hover:bg-gray-50 hover:border-emerald-400 transition-all duration-300 flex items-center justify-center p-8 group cursor-pointer">
              <label className="w-full h-full cursor-pointer flex flex-col items-center justify-center gap-4">
                <UploadBox
                  multiple={false}
                  name="images"
                  url="/api/homeSlides/uploadImages"
                  setPreviewFun={setPreviewFun}
                />
              </label>
            </div>
          </div>

          {/* Right - Preview Section */}
          <div className="h-[420px] flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-white">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Image Preview
              </h3>
              <div className="flex items-center gap-2">
                {preview?.length > 0 && (
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-100">
                    {preview.length}
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  {preview?.length || 0} selected
                </span>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50/20">
              {preview?.length === 0 ? (
                <div className="min-h-full flex flex-col items-center justify-center px-6 py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                    <svg
                      className="w-10 h-10 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">
                    No images selected
                  </p>
                  <p className="text-gray-400 text-xs mt-1.5">
                    Upload images to preview here
                  </p>
                </div>
              ) : (
                <div className="p-4 grid grid-cols-2 gap-3">
                  {preview.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="group relative rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => removeImg(image, index)}
                        className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500 hover:scale-110 focus:opacity-100"
                        aria-label="Remove image"
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>

                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />

                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Image Counter Badge (if multiple) */}
                        {preview.length > 1 && index === 0 && (
                          <div className="absolute bottom-2 left-2 z-20 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded-md text-white text-[10px] font-medium">
                            +{preview.length - 1} more
                          </div>
                        )}
                      </div>

                      {/* Image Info */}
                      <div className="px-2.5 py-1.5 bg-white border-t border-gray-100">
                        <p className="text-[10px] text-gray-500 truncate font-medium">
                          IMG_{index + 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={preview?.length === 0}
            className={`
        w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden
        ${
          preview?.length > 0
            ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-sm hover:shadow-md active:scale-[0.99] text-white cursor-pointer"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }
      `}
          >
            <div className="flex items-center justify-center gap-2.5">
              {preview?.length > 0 && (
                <svg
                  className="w-4 h-4 animate-in fade-in duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              )}
              <span>
                {preview?.length > 0
                  ? `Upload ${preview.length} Image${preview.length !== 1 ? "s" : ""} to Server`
                  : "Select Images to Upload"}
              </span>
            </div>
          </button>

          {/* Status Message */}
          {preview?.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-3.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-center text-xs text-gray-500">
                Ready to upload {preview.length} image
                {preview.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddHomeSlider;
