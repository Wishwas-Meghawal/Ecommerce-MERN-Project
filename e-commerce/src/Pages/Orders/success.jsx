import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <section className="w-full p-10 py-20 flex flex-col items-center justify-center bg-gray-50 px-6 overflow-hidden">
      {/* Success Icon */}
      <div className="bg-[#ff5252]/10 p-5 rounded-full mb-5">
        <img src="/checked.png" alt="success" className="w-20 h-20" />
      </div>

      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
        Order Placed Successfully
      </h1>

      {/* Subtext */}
      <p className="text-gray-500 text-center max-w-md mb-6 text-sm">
        Thank you for your purchase! Your order has been confirmed and is being
        processed.
      </p>

      {/* Divider */}
      <div className="w-20 h-[2px] bg-[#ff5252] mb-6 rounded-full"></div>

      {/* Buttons */}
      <div className="flex gap-4 w-full max-w-sm">
        {/* Home Button */}
        <Link to="/" className="w-1/2">
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: "#ff5252",
              color: "#ff5252",
              fontWeight: 500,
              borderRadius: "6px", // 👈 radius kam
              height: "44px", // 👈 height badhi
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#000",
                borderColor: "#000",
                color: "#fff",
              },
            }}
          >
            Home
          </Button>
        </Link>

        {/* View Orders Button */}
        <Link to="/my-orders" className="w-1/2">
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#ff5252",
              fontWeight: 500,
              borderRadius: "6px", // 👈 radius kam
              height: "44px", // 👈 height badhi
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
          >
            View Orders
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default OrderSuccess;
