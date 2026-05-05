import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import { FcFolder, FcSettings, FcAddDatabase, FcSearch } from "react-icons/fc";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdMoreVert,
  MdFilterList,
} from "react-icons/md";
import { MyContext } from "../../App";
import { useState } from "react";
import { useEffect } from "react";
import { deleteData, fetchDataFromApi } from "../../utils/api";

const Category = () => {
  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      context?.setCatData(res?.data);
    });
  }, [context?.isOpenFullScreenPanel]);
 
  const deleteCategory = (id) => {
    deleteData(`/api/category/${id}`).then((res) => {
      fetchDataFromApi("/api/category").then((res) => {
        context?.setCatData(res?.data);
      });
    });
  };

  return (
    <div className="p-6 rounded-xl bg-white shadow-xl border border-gray-200">
      {/* Header - unchanged */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
            <FcFolder className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
            <p className="text-sm text-gray-600">
              Manage product categories and subcategories
            </p>
          </div>
        </div>

        <Button
          variant="contained"
          startIcon={<FcAddDatabase className="text-white" />}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          sx={{
            borderRadius: "12px",
            padding: "10px 20px",
            textTransform: "none",
            fontWeight: 500,
          }}
          onClick={() =>
            context.setIsOpenFullScreenPanel({
              open: true,
              model: "Add Category",
            })
          }
        >
          Add Category
        </Button>
      </div>

      {/* Search & Filter Bar - unchanged */}
      {/* <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <TextField
            fullWidth
            placeholder="Search categories..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FcSearch />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "white",
              },
            }}
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outlined"
            startIcon={<MdFilterList />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              padding: "10px 20px",
            }}
          >
            Filter
          </Button>
        </div>
      </div> */}

      {/* Material UI Table with Improved Styling */}
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="category table">
            <TableHead>
              <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/80">
                <TableCell
                  className="font-semibold! text-[15px]! text-gray-700 bg-transparent py-4"
                  sx={{ width: "28%" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                    Category Image
                  </div>
                </TableCell>

                <TableCell
                  className="font-semibold! text-[15px]! text-gray-700 bg-transparent py-4"
                  sx={{ width: "15%" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
                    Category Name
                  </div>
                </TableCell>

                <TableCell
                  className="font-semibold! text-[15px]! text-gray-700 bg-transparent py-4"
                  sx={{ width: "10%" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-5 bg-red-500 rounded-full"></span>
                    Actions
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {context?.catData?.length !== 0 &&
                context?.catData?.map((item, index) => {
                  return (
                    <TableRow
                      hover
                      key={item?.index || index}
                      sx={{
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f8fafd",
                          "& .MuiTableCell-body": {
                            color: "#0f172a",
                          },
                        },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      {/* Category Image Cell - Improved */}
                      <TableCell
                        sx={{
                          padding: "12px 20px",
                          width: "100px",
                        }}
                      >
                        <div className="flex items-center">
                          <div
                            className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border-2 border-white shadow-md transition-transform hover:scale-105 hover:shadow-lg"
                            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                          >
                            <img
                              src={item?.images}
                              alt={item?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </TableCell>

                      {/* Category Name Cell - Improved */}
                      <TableCell
                        sx={{
                          padding: "16px 20px",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 text-base">
                                {item?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Actions Cell - Improved */}
                      <TableCell
                        sx={{
                          padding: "12px 20px",
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          <IconButton
                            size="small"
                            onClick={() =>
                              context.setIsOpenFullScreenPanel({
                                open: true,
                                model: "Edit Category",
                                id: item?._id,
                              })
                            }
                            sx={{
                              border: "1px solid #e5e7eb",
                              borderRadius: "10px",
                              padding: "8px",
                              backgroundColor: "white",
                              transition: "all 0.2s",
                              "&:hover": {
                                backgroundColor: "#f0fdf4",
                                borderColor: "#22c55e",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 8px rgba(34,197,94,0.2)",
                              },
                            }}
                          >
                            <MdEdit className="text-green-600 text-lg" />
                          </IconButton>

                          <IconButton
                            size="small"
                            onClick={() => deleteCategory(item._id)}
                            sx={{
                              border: "1px solid #e5e7eb",
                              borderRadius: "10px",
                              padding: "8px",
                              backgroundColor: "white",
                              transition: "all 0.2s",
                              "&:hover": {
                                backgroundColor: "#fef2f2",
                                borderColor: "#ef4444",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 8px rgba(239,68,68,0.2)",
                              },
                            }}
                          >
                            <MdDelete className="text-red-500 text-lg" />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination with improved styling */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={100}
          rowsPerPage={10}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
          sx={{
            borderTop: "1px solid #f0f0f0",
            backgroundColor: "#fafbfc",
            "& .MuiTablePagination-select": {
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            },
            "& .MuiTablePagination-displayedRows": {
              fontWeight: 500,
              color: "#4b5563",
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default Category;
