import React, { useContext } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import MyListItems from "./MyListItems";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { MdHome } from "react-icons/md";

const MyList = () => {
  const context = useContext(MyContext);
  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[70%]">
          <div className="shadow-md rounded-md  bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>My List</h2>
              <p className="mt-0 ">
                There are{" "}
                <span className="font-bold text-primary">
                  {context?.myListData?.length}
                </span>{" "}
                products in your My list
              </p>
            </div>
            {context?.myListData?.length !== 0 ? (
              context?.myListData?.map((item, index) => {
                return <MyListItems item={item} />;
              })
            ) : (
              <div className="w-full h-[70vh] flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center text-center p-6 max-w-sm">
                  {/* Icon */}
                  <div
                    className="relative w-32 h-32 flex items-center justify-center rounded-full mb-5 
                bg-gradient-to-br from-red-100 via-pink-100 to-red-50
                shadow-lg shadow-red-100/50 
                border border-red-100
                transition-all duration-300 
                hover:scale-105 hover:shadow-xl"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-red-200 opacity-20 blur-xl"></div>

                    {/* Image */}
                    <img
                      src="/note.png"
                      alt="empty wishlist"
                      className="w-16 h-16 object-contain relative z-10 
               transition-all duration-300 
               group-hover:scale-110"
                    />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-800">
                    Your Wishlist is Empty
                  </h2>

                  {/* Subtitle */}
                  <p className="text-sm text-gray-500 mt-2">
                    Looks like you haven’t added anything yet. Start exploring
                    and save your favorite products!
                  </p>

                  {/* Button */}
                  <Link to="/">
                    <Button
                      variant="contained"
                      startIcon={<MdHome />}
                      sx={{
                        mt: 3,
                        px: 4,
                        py: 1.2,
                        borderRadius: "999px",
                        textTransform: "none",
                        fontWeight: 600,
                        background: "linear-gradient(135deg, #ff4d4d, #ff6a6a)",
                        color: "#fff",
                        boxShadow: "0 4px 14px rgba(255, 77, 77, 0.4)",
                        transition: "all 0.3s ease",

                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #e04343, #ff5252)",
                          boxShadow: "0 6px 18px rgba(255, 77, 77, 0.6)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;
