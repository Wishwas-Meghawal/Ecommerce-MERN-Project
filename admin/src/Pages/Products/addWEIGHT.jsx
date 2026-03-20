import React, { useCallback, useContext, useEffect, useState } from "react";
import { FcAddDatabase } from "react-icons/fc";
import { MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";
import { FaMicrochip, FaWeightHanging } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Chip,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import { MyContext } from "../../App";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

const AddWEIGHT = () => {
  const context = useContext(MyContext);

  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, seteditId] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetchDataFromApi("/api/product/productWEIGHT/get").then((res) => {
      if (res?.error === false) {
        setData(res?.data);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (name === "") {
      context.alertBox("Please enter Product RAM", "error");
    }

    if (editId === "") {
      postData(`/api/product/productWEIGHT/create`, {
        name: name,
      }).then((res) => {
        if (res?.error === false) {
          context.alertBox(res?.message, "success");
          setTimeout(() => {
            setIsLoading(false);
            getData();
            setName("");
          }, [500]);
        } else {
          context.alertBox(res?.message, "error");
        }
      });
    }

    if (editId !== "") {
      editData(`/api/product/productWEIGHT/${editId}`, {
        name: name,
      }).then((res) => {
        if (res?.data?.error === false) {
          context.alertBox(res?.data?.message, "success");
          setTimeout(() => {
            setIsLoading(false);
            getData();
            setName("");
          }, [500]);
        } else {
          context.alertBox(res?.data?.message, "error");
        }
      });
    }
  };

  const deleteItem = (id) => {
    deleteData(`/api/product/productWEIGHT/${id}`).then((res) => {
      getData();
      context.alertBox("Item deleted", "success");
    });
  };

  const editItem = (id) => {
    fetchDataFromApi(`/api/product/productWEIGHT/${id}`).then((res) => {
      setName(res?.data?.name);
      seteditId(res?.data?._id);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-lg">
                <FcAddDatabase className="text-3xl text-white brightness-0 invert" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Add Product WEIGHT
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                 <FaWeightHanging className="text-purple-400" />
                Add and manage product weight details for items measured by
                weight
              </p>
            </div>
          </div>
        </div>

        {/* Add WEIGHT Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-6 mb-6 animate-fadeIn">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Add New WEIGHT
          </h3>
          <form className="form py-3 p-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter Product Weight (e.g., 2KG, 5KG)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-200 transition-all font-medium flex items-center gap-2 cursor-pointer">
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <>
                    <MdSave /> Save
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Material UI Table */}
        {data?.length !== 0 && (
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #f3e8ff",
              overflow: "hidden",
              boxShadow:
                "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.01)",
            }}
          >
            <Table>
              {/* Table Header */}
              <TableHead>
                <TableRow
                  sx={{
                    background: "linear-gradient(to right, #faf5ff, #f5f3ff)",
                    borderBottom: "2px solid #f3e8ff",
                  }}
                >
                  <TableCell
                    sx={{ fontWeight: 600, color: "#1f2937", py: 2 }}
                    width={"10%"}
                  >
                    <div className="w-[60px]">
                      <Checkbox {...label} size="small" />
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#1f2937", py: 2 }}
                    width={"60%"}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FaWeightHanging className="text-purple-400" />
                      PRODUCT WEIGHT
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#1f2937", py: 2 }}
                    width={"30%"}
                  >
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {data?.map((item, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#faf5ff",
                          transition: "all 0.2s",
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {/* // View Mode */}

                      <TableCell sx={{ py: 2 }}>
                        <div className="w-[60px]">
                          <Checkbox {...label} size="small" />
                        </div>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Chip
                            label={
                              <div className="flex items-center gap-1">
                                <FaWeightHanging className="text-purple-400" />
                                WEIGHT
                              </div>
                            }
                            size="small"
                            sx={{
                              backgroundColor: "#f5f3ff",
                              color: "#6d28d9",
                              fontWeight: 500,
                            }}
                          />
                          {item.name}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip
                            title="Edit RAM"
                            placement="top"
                            arrow
                            TransitionComponent={Zoom}
                          >
                            <IconButton
                              size="small"
                              sx={{
                                color: "#6d28d9",
                                "&:hover": { backgroundColor: "#ede9fe" },
                              }}
                              onClick={() => editItem(item?._id)}
                            >
                              <MdEdit size={20} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="Delete RAM"
                            placement="top"
                            arrow
                            TransitionComponent={Zoom}
                          >
                            <IconButton
                              size="small"
                              sx={{
                                color: "#dc2626",
                                "&:hover": { backgroundColor: "#fee2e2" },
                              }}
                              onClick={() => deleteItem(item?._id)}
                            >
                              <MdDelete size={20} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default AddWEIGHT;
