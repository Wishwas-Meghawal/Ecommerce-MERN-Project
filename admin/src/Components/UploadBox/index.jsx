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
    <div className="p-5 rounded-xl bg-white border border-gray-200">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700 mb-4">
          Featured Image
        </label>

        <div className="h-[260px] border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors relative overflow-hidden flex items-center justify-center">
          <div className="flex flex-col items-center justify-center h-full text-center">
            {uploading === true ? (
              <>
                <CircularProgress />
                <h4 className="text-center">Uploading...</h4>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <FcUpload className="text-xl" />
                </div>

                <p className="text-sm font-medium text-gray-700">
                  Click to upload
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  multiple={
                    props.multiple !== undefined ? props.multiple : false
                  }
                  onChange={(e) => onChangeFile(e, props?.url)}
                  name="images"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadBox;
