import React, { useState } from "react";
import { FcUpload } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { uploadImages } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const UploadBox = (props) => {
  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let selectedImages = [];

  const formdata = new FormData();

  const onChangeFile = (e, apiEndPoint) => {
    try {
      setPreview([]);
      const files = e.target.files;
      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];
          selectedImages.push(file);
          formdata.append(props?.name, file);
        } else {
          context.alertBox(
            "Please select a valid image file (JPEG, JPG, PNG, WEBP)",
            "error",
          );
          setUploading(false);
          return false;
        }
      }

      uploadImages(apiEndPoint, formdata).then((res) => {
        setUploading(false);
        props.setPreviewFun(res?.data?.images);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-blue-500"
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
          Featured Image
        </label>

        <div className="h-[280px] border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 relative overflow-hidden group cursor-pointer">
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            {uploading === true ? (
              <div className="animate-in fade-in zoom-in duration-300">
                <div className="relative">
                  <CircularProgress
                    size={48}
                    thickness={4}
                    className="text-blue-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  </div>
                </div>
                <h4 className="text-center text-sm font-medium text-gray-700 mt-4">
                  Uploading...
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Please wait while we process your image
                </p>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <svg
                    className="w-7 h-7 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>

                <p className="text-sm font-semibold text-gray-800 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400 mb-3">
                  PNG, JPG, WEBP up to 10MB
                </p>

                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                    16:9
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                    4:3
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                    1:1
                  </span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  multiple={
                    props.multiple !== undefined ? props.multiple : false
                  }
                  onChange={(e) => onChangeFile(e, props?.url)}
                  name="images"
                />
              </>
            )}
          </div>

          {/* Hover overlay effect */}
          {!uploading && (
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          )}
        </div>

        {/* Optional: Help text */}
        {!uploading && (
          <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Recommended size: 1200 x 800px or larger
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadBox;
