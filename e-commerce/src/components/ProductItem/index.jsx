import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { FiZoomIn } from "react-icons/fi";
import { BiGitCompare } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { MyContext } from "../../App";

const ProductItem = () => {
  const context = useContext(MyContext);
  return (
    <div className="relative bg-white border border-gray-200  group transition-shadow duration-300 hover:shadow-xl">
      {/* Discount badge */}
      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
        -4%
      </span>

      {/* Image section */}
      <div className="relative h-[250px] overflow-hidden flex items-center justify-center">
        <Link to="/">
          <div className=" h-[250px] overflow-hidden group">
            {/* Main Image */}
            <img
              src="https://demos.codezeel.com/wordpress/WCM06/WCM060133/wp-content/uploads/2024/01/20-460x460.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-contain
                 transition-opacity duration-500
                 opacity-100 group-hover:opacity-0"
            />

            {/* Hover Image */}
            <img
              src="http://demos.codezeel.com/wordpress/WCM06/WCM060133/wp-content/uploads/2024/01/02-37-460x460.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-contain
                 transition-opacity duration-500
                 opacity-0 group-hover:opacity-100"
            />
          </div>
        </Link>

        {/* Hover icons */}
        <div className="absolute top-4 right-[-50px] flex flex-col gap-2 transition-all duration-300 group-hover:right-4">
          <Button
            variant="outlined"
            sx={{
              minWidth: 36, // w-9
              width: 36,
              height: 36,
              padding: 0,
              borderRadius: "50%", // rounded-full
              backgroundColor: "#fff",
              borderColor: "#e5e7eb", // gray-200
              color: "#374151", // gray-700
              transition: "all 0.3s ease",

              "&:hover": {
                backgroundColor: "#ff5252", // primary
                color: "#fff",
                borderColor: "#ff5252",
              },
            }}
          >
            <FiHeart fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            sx={{
              minWidth: 36, // w-9
              width: 36,
              height: 36,
              padding: 0,
              borderRadius: "50%", // rounded-full
              backgroundColor: "#fff",
              borderColor: "#e5e7eb", // gray-200
              color: "#374151", // gray-700
              transition: "all 0.3s ease",

              "&:hover": {
                backgroundColor: "#ff5252", // primary
                color: "#fff",
                borderColor: "#ff5252",
              },
            }}
          >
            <BiGitCompare fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            sx={{
              minWidth: 36, // w-9
              width: 36,
              height: 36,
              padding: 0,
              borderRadius: "50%", // rounded-full
              backgroundColor: "#fff",
              borderColor: "#e5e7eb", // gray-200
              color: "#374151", // gray-700
              transition: "all 0.3s ease",

              "&:hover": {
                backgroundColor: "#ff5252", // primary
                color: "#fff",
                borderColor: "#ff5252",
              },
            }} onClick={()=>context.setOpenProductDetailsModal(true)}
          >
            <FiZoomIn fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            sx={{
              minWidth: 36, // w-9
              width: 36,
              height: 36,
              padding: 0,
              borderRadius: "50%", // rounded-full
              backgroundColor: "#fff",
              borderColor: "#e5e7eb", // gray-200
              color: "#374151", // gray-700
              transition: "all 0.3s ease",

              "&:hover": {
                backgroundColor: "#ff5252", // primary
                color: "#fff",
                borderColor: "#ff5252",
              },
            }}
          >
            <HiOutlineDocumentText fontSize="small" />
          </Button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-3 bg-gray-50">
        {/* Brand */}
        <span className="block text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          Nike
        </span>

        {/* Product Name */}
        <h3 className="text-sm leading-snug mb-1 text-gray-800 font-[400]!">
          ADRO Men Print Regular Fit Hoodie For Men
        </h3>

        {/* Rating */}
        <Rating
          value={4}
          size="small"
          readOnly
          className="mb-1"
          sx={{ color: "#f59e0b" }}
        />

        {/* Price */}
        <div className="mb-3">
          <span className="line-through text-gray-400 mr-2">$24.00</span>
          <span className="text-red-500 font-semibold">$23.00</span>
        </div>

        {/* Button */}
        {/* <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#f5efec",
            color: "#1f2937", // gray-800
            fontSize: "11px",
            fontWeight: 600,
            padding: "6px 0",
            boxShadow: "none",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#ef4444", // red-500
              color: "#fff",
              boxShadow: "none",
            },
          }}
        >
          SELECT OPTIONS
        </Button> */}
      </div>
    </div>
  );
};

export default ProductItem;
