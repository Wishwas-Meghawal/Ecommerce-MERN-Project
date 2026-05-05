import * as React from "react";
import { TextField, InputAdornment, IconButton, Paper } from "@mui/material";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useRef } from "react";

const SearchBox = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef();

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);
    props.setSearchQuery(e.target.value)
    if (searchInput.current.value === "") {
      props.setPageOrder(1);
    }
  };
  return (
    <div
      className="group
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
        focus-within:border-black"
    >
      <AiOutlineSearch
        className="
          text-gray-400
          text-[22px]
          mr-3
          transition-colors
          duration-300
          group-focus-within:text-primary
        "
      />
      <TextField
        variant="standard"
        fullWidth
        placeholder="Search products, brands, categories..."
        value={searchQuery}
        inputRef={searchInput}
        onChange={onChangeInput}
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
    </div>
  );
};
export default SearchBox;
