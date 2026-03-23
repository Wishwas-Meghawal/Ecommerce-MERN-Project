import React, { useContext } from "react";
import {
  FcImageFile,
  FcSettings,
  FcAddDatabase,
  FcCalendar,
} from "react-icons/fc";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdDragIndicator,
  MdMoreVert,
} from "react-icons/md";
import { FaImage, FaLink } from "react-icons/fa";
import { Button, IconButton } from "@mui/material";
import { MyContext } from "../../App";

const HomeSliderBanners = () => {
  const context = useContext(MyContext);
  return (
    <div className="p-6 rounded-xl bg-white shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <FaImage className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Home Slider Banners
            </h2>
            <p className="text-sm text-gray-600">
              Manage homepage slider banners and images
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="contained"
            startIcon={<FcAddDatabase className="text-white" />}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
            sx={{
              borderRadius: "12px",
              padding: "10px 20px",
              textTransform: "none",
              fontWeight: 500,
            }}
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Home Slider",
              })
            }
          >
            Add New Banner
          </Button>
          <Button
            variant="outlined"
            startIcon={<FcSettings />}
            className="border-gray-300 hover:bg-gray-50"
            sx={{
              borderRadius: "12px",
              padding: "10px 20px",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-3">
                  <MdDragIndicator className="text-gray-500 text-lg" />
                  <span>Image Preview</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Banner 1 - Summer Sale */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-5">
                <div className="w-64 h-32 rounded-lg overflow-hidden border">
                  <img
                    src="/homebanner2.jpg"
                    alt="Flash Deal Banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-col gap-3 w-48">
                  {/* Action Row 1 */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                      <MdEdit className="text-base" />
                      Edit
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-100 flex items-center gap-2">
                      <MdVisibility className="text-base" />
                    </button>
                  </div>

                  {/* Action Row 2 */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2">
                      <FcImageFile className="text-base" />
                      Change
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-100 flex items-center gap-2">
                      <MdMoreVert className="text-base" />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button className="px-3 py-2 border border-red-300 text-red-600 text-sm rounded-lg hover:bg-red-50 hover:border-red-400 flex items-center justify-center gap-2">
                    <MdDelete className="text-base" />
                    Delete Banner
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 pt-6 border-t border-gray-200 gap-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">4</span> banners •
          <span className="ml-3 px-3 py-1.5 bg-gradient-to-r from-green-100 to-green-50 text-green-700 text-xs font-medium rounded-lg">
            All Active
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Banners per page:</span>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white shadow-sm">
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              size="small"
              className="border-gray-300 hover:bg-gray-50 shadow-sm"
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                padding: "8px 16px",
              }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              size="small"
              className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm"
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                minWidth: "40px",
                padding: "8px",
              }}
            >
              1
            </Button>
            <Button
              variant="outlined"
              size="small"
              className="border-gray-300 hover:bg-gray-50 shadow-sm"
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                minWidth: "40px",
                padding: "8px",
              }}
            >
              2
            </Button>
            <Button
              variant="outlined"
              size="small"
              className="border-gray-300 hover:bg-gray-50 shadow-sm"
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                padding: "8px 16px",
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSliderBanners;
