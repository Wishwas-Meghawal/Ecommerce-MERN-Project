import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { FiChevronDown } from "react-icons/fi";
import { postData } from "../../utils/api";

const SortByDropdown = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState("Name, A To Z");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortBy = (name, order, products, label) => {
    setSelected(label);

    postData(`/api/product/sortBy`, {
      products: products,
      sortBy: name,
      order: order,
    })
      .then((res) => {
        props.setProductsData(res.data);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Sort by :</span>

      {/* Button */}
      <Button
        onClick={handleClick}
        variant="contained"
        endIcon={<FiChevronDown />}
        sx={{
          backgroundColor: "#fff0fb",
          color: "#000",
          textTransform: "none",
          borderRadius: "10px",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#ffe4f6",
            boxShadow: "none",
          },
        }}
      >
        {selected}
      </Button>

      {/* MUI Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            mt: 1,
            minWidth: 220,
          },
        }}
      >
        <MenuItem onClick={() => handleSortBy("name", "asc", props.productsData, "Name, A To Z")}>
          Name, A To Z
        </MenuItem>

        <MenuItem onClick={() => handleSortBy("name", "desc", props.productsData, "Name, Z To A")}>
          Name, Z To A
        </MenuItem>

        <MenuItem onClick={() => handleSortBy("price", "asc", props.productsData, "Price, Low To High")}>
          Price, Low To High
        </MenuItem>

        <MenuItem onClick={() => handleSortBy("price", "desc", props.productsData, "Price, High To Low")}>
          Price, High To Low
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SortByDropdown;