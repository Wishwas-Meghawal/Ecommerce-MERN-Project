import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Collapse,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { FcSettings, FcAddDatabase, FcSearch } from "react-icons/fc";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import EditSubCatBox from "./EditSubCatBox.jsx";

const SubCatList = () => {
  const context = useContext(MyContext);

  const [openMain, setOpenMain] = useState(null);
  const [openSub, setOpenSub] = useState(null);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      context?.setCatData(res?.data || []);
    });
  }, [context?.isOpenFullScreenPanel]);

  const deleteCategory = (id) => {
    deleteData(`/api/category/${id}`).then(() => {
      fetchDataFromApi("/api/category").then((res) => {
        context?.setCatData(res?.data || []);
      });
    });
  };
  return (
    <div className="p-6 rounded-xl bg-white shadow-xl border border-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
            <FaLayerGroup className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sub Categories</h2>
            <p className="text-sm text-gray-600">
              Manage hierarchical product categories
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outlined" startIcon={<FcSettings />}>
            Manage
          </Button>

          <Button
            variant="contained"
            startIcon={<FcAddDatabase />}
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Sub Category",
              })
            }
            sx={{
              background: "linear-gradient(to right, #16a34a, #059669)",
            }}
          >
            Add Sub Category
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
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
        />
      </div>

      {/* Nested Category Structure */}
      <Paper sx={{ p: 3, borderRadius: "12px" }}>
        {context?.catData?.map((main, mainIndex) => (
          <Box key={main._id} mb={1}>
            {/* MAIN CATEGORY */}
            <Box
              onClick={() =>
                setOpenMain(openMain === mainIndex ? null : mainIndex)
              }
              sx={{
                p: 2,
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: "#f8fafc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": { backgroundColor: "#ecfdf5" },
              }}
            >
              <Typography fontWeight={600}>{main.name}</Typography>

              {openMain === mainIndex ? <ExpandLess /> : <ExpandMore />}
            </Box>

            {/* SUBCATEGORIES */}
            <Collapse in={openMain === mainIndex} timeout="auto" unmountOnExit>
              <Box pl={4} mt={1}>
                {main.children?.map((sub, subIndex) => (
                  <Box key={sub._id} mb={1}>
                    {/* SUB CATEGORY */}
                    <Box
                      onClick={() =>
                        setOpenSub(openSub === subIndex ? null : subIndex)
                      }
                      sx={{
                        p: 1.5,
                        borderRadius: "8px",
                        cursor: "pointer",
                        backgroundColor: "#f1f5f9",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        "&:hover": { backgroundColor: "#dcfce7" },
                      }}
                    >
                      {/* <Typography>{sub.name}</Typography> */}
                      <EditSubCatBox
                        name={sub?.name}
                        id={sub?._id}
                        catData={context?.catData}
                        selectedCat={sub?.parentId}
                        selectedCatName={sub?.parentCatName}
                        onDelete={deleteCategory}
                      />

                      {openSub === subIndex ? (
                        <ExpandLess fontSize="small" />
                      ) : (
                        <ExpandMore fontSize="small" />
                      )}
                    </Box>

                    {/* THIRD LEVEL */}
                    <Collapse
                      in={openSub === subIndex}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box pl={4} mt={1}>
                        {sub.children?.map((third) => (
                          <Box
                            key={third._id}
                            sx={{
                              p: 1,
                              borderRadius: "6px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              backgroundColor: "#ffffff",
                              border: "1px solid #e5e7eb",
                              mb: 1,
                            }}
                          >
                            <EditSubCatBox
                              name={third?.name}
                              id={third?._id}
                              catData={main?.children}
                              selectedCat={third?.parentId}
                              selectedCatName={third?.parentCatName}
                              onDelete={deleteCategory}
                            />
                          </Box>
                        ))}
                      </Box>
                    </Collapse>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>
        ))}
      </Paper>
    </div>
  );
};

export default SubCatList;
