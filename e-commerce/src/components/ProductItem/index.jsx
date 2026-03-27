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

const ProductItem = (props) => {
  const context = useContext(MyContext);
  return (
    <div className="group relative bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500">
      {/* Discount Badge */}
      <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md z-10">
        {props?.item?.discount}% OFF
      </span>

      {/* Image Section */}
      <div className="relative h-[300px] overflow-hidden flex items-center justify-center bg-white">
        
          <div className="relative w-full h-full">
            <Link to={`/product/${props?.item?._id}`}>
            
            {/* Main Image */}
            <img
              src={props?.item?.images[0]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-110 group-hover:opacity-0"
            />

            {/* Hover Image */}
            <img
              src={props?.item?.images[1]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 scale-105 opacity-0 group-hover:opacity-100"
            />
            </Link>
          </div>
       

        {/* Floating Icons */}
        <div className="absolute top-4 right-[-60px] flex flex-col gap-3 transition-all duration-500 group-hover:right-4">
          {[FiHeart, BiGitCompare, FiZoomIn, HiOutlineDocumentText].map(
            (Icon, i) => (
              <Button
                key={i}
                variant="contained"
                sx={{
                  minWidth: 45,
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)",
                  color: "#111",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",

                  "&:hover": {
                    background: "linear-gradient(135deg,#ff4d4d,#ff6a6a)",
                    color: "#fff",
                    transform: "scale(1.1)",
                  },
                }}
                onClick={() =>
                  Icon === FiZoomIn && context.handleOpenProductDetailsModal(true,props?.item)
                }
              >
                <Icon size={18} />
              </Button>
            ),
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
        {/* Brand */}
        <span className="text-[11px] uppercase tracking-widest text-gray-400 font-medium">
          {props?.item?.brand}
        </span>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-800 mt-1 leading-snug line-clamp-2 hover:text-red-500 transition">
          <Link to={`/product/${props?.item?._id}`}>{props?.item?.name}</Link>
        </h3>

        {/* Rating */}
        <div className="mt-1">
          <Rating
            defaultValue={props?.item?.rating}
            size="small"
            precision={0.5}
            readOnly
            sx={{ color: "#f59e0b" }}
          />
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-gray-400 line-through text-sm">
            ₹{props?.item?.oldPrice}
          </span>
          <span className="text-lg font-bold text-red-500">
            ₹{props?.item?.price}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button className="mt-4 w-full py-2 rounded-lg bg-black text-white text-sm font-medium transition-all duration-300 hover:bg-red-500 hover:shadow-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
