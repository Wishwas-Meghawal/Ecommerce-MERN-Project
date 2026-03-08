import * as React from "react";
import { TextField, InputAdornment, IconButton, Paper } from "@mui/material";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

function SearchBox({
  value,
  placeholder = "Search products, brands, categories...",
}) {
  return (
    <div className="group
        w-full
        flex
        items-center
        px-4
        py-2.5
        mb-5
        rounded-sm
        border
        border-gray-200
        bg-white
        transition-all
        duration-300
        hover:border-black
        focus-within:border-black">

      <AiOutlineSearch className="
          text-gray-400
          text-[22px]
          mr-3
          transition-colors
          duration-300
          group-focus-within:text-primary
        " />
      <TextField
        variant="standard"
        fullWidth
        placeholder={placeholder}
        value={value}
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          "& input": {
            fontSize: "15px",
            padding: 0,
          },
        }}
      />

     {value && (
        <IconButton
          size="small"
          onClick={() => onChange("")}
          className="
            ml-2
            text-gray-400
            hover:text-red-500
            transition
          "
        >
          <AiOutlineClose />
        </IconButton>
      )}

    </div>
  );
}
export default SearchBox;
