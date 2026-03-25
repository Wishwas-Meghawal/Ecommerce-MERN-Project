import React, { useContext, useEffect, useState } from "react";
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
import { Button, IconButton, TablePagination, Tooltip } from "@mui/material";
import { MyContext } from "../../App";
import {
  deleteData,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import { BsTrash } from "react-icons/bs";

const HomeSliderBanners = () => {
  const context = useContext(MyContext);
  const [slidesData, setSlidesData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortedIds, setSortedIds] = useState([]);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 🔹 checkbox logic
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;

    // Update all items checked status
    const updatedItems = slidesData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setSlidesData(updatedItems);

    // Update the sorted Ids state
    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      console.log(ids);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  // Handler to toggle individual checkboxes
  const handleCheckboxChange = (e, id, index) => {
    const updatedItems = slidesData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item,
    );
    setSlidesData(updatedItems);

    //Updated the sorted Ids state
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  useEffect(() => {
    getData();
  }, [context?.isOpenFullScreenPanel]);

  const getData = () => {
    fetchDataFromApi("/api/homeSlides").then((res) => {
      let arr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.data?.length; i++) {
          arr[i] = res?.data[i];
          arr[i].checked = false;
        }
        setTimeout(() => {
          setSlidesData(arr);
        }, 300);
      }
    });
  };

  const deleteSlide = (id) => {
    deleteData(`/api/homeSlides/${id}`).then((res) => {
      context.alertBox("Slide deleted", "success");
      getData();
    });
  };

  //Delete Multiple Product
  const deleteMultipleProduct = async () => {
    if (sortedIds.length === 0) {
      context.alertBox("Please select items to delete", "error");
      return;
    }

    try {
      const res = await deleteMultipleData("/api/homeSlides/deleteMultiple", {
        ids: sortedIds,
      });

      if (res?.success) {
        getData();
        context.alertBox("Slides deleted successfully", "success");
      }
    } catch (error) {
      context.alertBox("Error deleting items", "error");
    }
  };

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
          {sortedIds?.length !== 0 && (
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
          )}
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
        </div>
      </div>

      {/* Table */}
      <Paper
        sx={{
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}
      >
        <TableContainer>
          <Table>
            {/* Header */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f9fafb" }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    onChange={handleSelectAll}
                    checked={
                      slidesData?.length > 0
                        ? slidesData.every((item) => item.checked)
                        : false
                    }
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

                <TableCell sx={{ fontWeight: 600 }}>Image Preview</TableCell>

                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* Body */}
            <TableBody>
              {slidesData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  return (
                    <TableRow key={item._id} hover>
                      {/* Checkbox */}
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={item.checked === true ? true : false}
                          onChange={(e) =>
                            handleCheckboxChange(e, item._id, index)
                          }
                          sx={{
                            color: "#9ca3af",
                            "&.Mui-checked": {
                              color: "#3b82f6",
                            },
                          }}
                        />
                      </TableCell>

                      {/* Image */}
                      <TableCell>
                        <div className="w-64 h-32 rounded-lg overflow-hidden border">
                          <img
                            src={item.images[0]}
                            alt="banner"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <div className="flex flex-col gap-2 w-40">
                          <Button
                            variant="contained"
                            startIcon={<MdEdit />}
                            sx={{
                              borderRadius: "10px",
                              textTransform: "none",
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<MdDelete />}
                            onClick={() => deleteSlide(item._id)}
                            sx={{
                              borderRadius: "10px",
                              textTransform: "none",
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={slidesData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>
    </div>
  );
};

export default HomeSliderBanners;
