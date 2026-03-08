import React from "react";
import { FcImageFile, FcUpload } from "react-icons/fc";
import { MdImage, MdInfo } from "react-icons/md";
import { Button } from "@mui/material";

const AddHomeSlider = () => {
  return (
    <div className="p-6 rounded-xl bg-white shadow-xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md">
          <FcImageFile className="text-2xl text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Add Banner Image</h2>
          <p className="text-sm text-gray-600">Upload homepage slider image only</p>
        </div>
      </div>

      {/* Side by Side Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Upload Area */}
        <div>
          {/* File Input with Custom Styling */}
          <label className="block cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
            />
            <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all h-full flex flex-col justify-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <FcUpload className="text-2xl text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Click to select image
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Choose image from your device
                </p>
                <div className="flex flex-col gap-2 text-xs text-gray-500 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>PNG, JPG, WEBP formats</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>Max file size: 10MB</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>1920×600px recommended</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium inline-flex items-center gap-2 shadow-lg">
                  <FcImageFile className="text-white" />
                  Browse Files
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Right Side - Preview & Settings */}
        <div className="space-y-6">
          {/* Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">Image Preview</h3>
              <span className="text-xs text-gray-500">Selected image will appear here</span>
            </div>
            <div className="rounded-xl border-2 border-gray-300 p-6 bg-gradient-to-br from-gray-50 to-white h-48 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MdImage className="text-2xl text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No image selected</p>
                <p className="text-gray-400 text-xs mt-1">Select an image to preview</p>
              </div>
            </div>
          </div>

        

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="contained"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md"
              sx={{
                borderRadius: '10px',
                padding: '10px',
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Upload to Server
            </Button>
            <Button
              variant="outlined"
              className="border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              sx={{
                borderRadius: '10px',
                padding: '10px',
                textTransform: 'none',
              }}
            >
              Cancel Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHomeSlider;