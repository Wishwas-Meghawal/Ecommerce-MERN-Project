import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { FiZoomIn } from "react-icons/fi";
import { BiGitCompare } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from "react";
import { MyContext } from "../../App";

const ProductItemListView = (props) => {
  const context = useContext(MyContext);
  return (
    <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-lg p-4 gap-4 sm:gap-6 hover:shadow-lg transition relative">
      {/* 🔴 Discount Badge */}
      <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md z-10">
        {props?.item?.discount}% OFF
      </span>
      {/* IMAGE */}
      <div className="w-full sm:w-[25%] h-[180px] sm:h-auto shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Link to={`/product/${props?.item?._id}`}>
          <img
            src={props?.item?.images[0]}
            alt="product"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-between flex-1 w-full sm:w-[75%]">
        <div>
          <span className="text-xs uppercase text-gray-500">
            {props?.item?.brand}
          </span>

          <h3 className="text-lg font-semibold text-gray-800 mt-1 font-[400]!">
            <Link to={`/product/${props?.item?._id}`}>{props?.item?.name?.substr(0, 40)+'...'}</Link>
          </h3>

          <Rating
            defaultValue={props?.item?.rating}
            size="small"
            precision={0.5}
            readOnly
            sx={{ color: "#f59e0b" }}
          />

          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            {props?.item?.description}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="line-through text-gray-400 text-sm">₹{props?.item?.oldPrice}</span>
            <span className="text-red-500 font-semibold text-lg">₹{props?.item?.price}</span>
          </div>

          {/* BUTTON */}
          <div className="mt-3">
            <Button
              variant="outlined"
              startIcon={<FiShoppingCart size={15} />}
              sx={{
                borderColor: "#ef4444",
                color: "#ef4444",
                fontSize: "11px",
                fontWeight: 600,
                padding: "5px 14px",
                minHeight: "32px",
                textTransform: "uppercase",
                "&:hover": {
                  backgroundColor: "#ef4444",
                  color: "#fff",
                },
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemListView;
