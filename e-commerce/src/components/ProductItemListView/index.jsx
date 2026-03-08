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

const ProductItemListView = () => {
  const context = useContext(MyContext);
  return (
    <div className="flex  bg-white border border-gray-200 rounded-lg p-4 gap-6 hover:shadow-lg transition relative">
      {/* 🔴 Discount Badge */}
      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
        -8%
      </span>
      {/* IMAGE */}
      <div className="w-[25%] shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Link to="/">
          <img
            src="https://demos.codezeel.com/wordpress/WCM06/WCM060133/wp-content/uploads/2024/01/20-460x460.jpg"
            alt="product"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-between flex-1 w-[75%]">
        <div>
          <span className="text-xs uppercase text-gray-500">
            Flying Machine
          </span>

          <h3 className="text-lg font-semibold text-gray-800 mt-1 font-[400]!">
            Women Wide Leg Killer
          </h3>

          <Rating
            value={4}
            readOnly
            size="small"
            sx={{ color: "#f59e0b" }}
            className="my-2"
          />

          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat alias nostrum porro accusantium.
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="line-through text-gray-400 text-sm">₹1200</span>
            <span className="text-red-500 font-semibold text-lg">₹1500</span>
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
