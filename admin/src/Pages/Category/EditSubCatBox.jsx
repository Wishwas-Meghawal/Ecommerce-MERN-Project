import {
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Box,
} from "@mui/material";
import React, { use, useContext, useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { MyContext } from "../../App";
import { FcAddDatabase } from "react-icons/fc";
import { editData } from "../../utils/api";

const EditSubCatBox = ({
  name,
  id,
  catData,
  selectedCat,
  selectedCatName,
  onDelete,
}) => {
  const context = useContext(MyContext);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    parentId: "",
    parentCatName: "",
  });

  useEffect(() => {
    setFormFields({
      name: name || "",
      parentId: selectedCat || "",
      parentCatName: selectedCatName || "",
    });
  }, [name, selectedCat, selectedCatName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("Please Enter Category Name", "error");
      return false;
    }

    editData(`/api/category/${id}`, formFields).then((res) => {
      setTimeout(() => { 
        context.alertBox(res?.data?.message, "success");
        context?.getCat();
        setIsLoading(false);
        setEditMode(false);
      }, 1000);
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        gap: 2,
      }}
    >
      {editMode ? (
        <>
          <Select
            size="small"
            name="parentId"
            value={formFields.parentId}
            onChange={handleChange}
            sx={{
              minWidth: 140,
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            {catData?.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            size="small"
            name="name"
            value={formFields.name}
            onChange={handleChange}
            sx={{ flex: 1 }}
          />

          <Box display="flex" gap={1}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                background: "linear-gradient(to right, #2563eb, #1e40af)",
              }}
              startIcon={<FcAddDatabase />}
            >
              {isLoading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                "Save"
              )}
            </Button>

            <Button
              size="small"
              variant="outlined"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <>
          <span className="font-[500] text-[14px]">{name}</span>

          <Box display="flex" gap={1}>
            <IconButton
              size="small"
              onClick={() => setEditMode(true)}
              sx={{
                backgroundColor: "#ecfdf5",
                "&:hover": { backgroundColor: "#bbf7d0" },
              }}
            >
              <MdEdit className="text-green-600" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => onDelete(id)}
              sx={{
                backgroundColor: "#fef2f2",
                "&:hover": { backgroundColor: "#fecaca" },
              }}
            >
              <MdDelete className="text-red-500" />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default EditSubCatBox;
