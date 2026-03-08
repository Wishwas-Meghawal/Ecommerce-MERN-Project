import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import { HiViewGrid } from "react-icons/hi";
import { LuMenu } from "react-icons/lu";

import { FiChevronDown } from "react-icons/fi";
import ProductItem from "../../components/ProductItem";
import ProductItemListView from "../../components/ProductItemListView";
import { Button } from "@mui/material";
import SortByDropdown from "../../components/SortByDropdown";
import ProductSkeleton from "../../components/ProductSkeleton";
import Pagination from '@mui/material/Pagination';

const ProductListing = () => {
  const [itemView, setItemView] = useState("grid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fake API delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="py-5 pb-0">
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/"
            className="link transition"
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/"
            className="link transition"
          >
            Fashion
          </Link>
        </Breadcrumbs>
      </div>
      <div className="bg-white p-2 mt-4">
        <div className="container flex gap-3">
          <div className="sidebarWrapper w-[20%] h-full bg-white">
            <Sidebar />
          </div>

          <div className="rightContent w-[80%] py-3">
            {/* Top Bar */}
            <div className="flex items-center justify-between bg-[#f5f5f5] px-4 py-3 rounded-md mb-4">
              <div className=" col1 flex items-center gap-2 itemViewActions">
                <Button
                  className={`w-[40px]! h-[40px]! min-w-[40px]! rounded-full! bg-white flex items-center justify-center shadow ${itemView==="list" && 'active'}`}
                  onClick={() => setItemView("list")}
                >
                  <LuMenu className="text-red-500 text-xl" />
                </Button>
                <Button
                  className={`w-[40px]! h-[40px]! min-w-[40px]! rounded-full! bg-white flex items-center justify-center shadow ${itemView==="grid" && 'active'}`}
                  onClick={() => setItemView("grid")}
                >
                  <HiViewGrid className="text-red-500 text-xl" />
                </Button>
                <p className="text-sm text-gray-700 pl-3 text-[rgba(0,0,0,0.7)]">
                  There are <span className="font-semibold">22</span> products.
                </p>
              </div>

              <div className=" col2 ml-auto flex items-center gap-2">
                <SortByDropdown />
              </div>
            </div>

            {/* Product Grid */}
            <div
              className={`grid gap-4 transition-all duration-300 ${
                itemView === "grid" ? "grid-cols-4" : "grid-cols-1"
              }`}
            >
              {loading ? (
                <>
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                </>
              ) : itemView === "grid" ? (
                <>
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                </>
              ) : (
                <>
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                </>
              )}
            </div>

            <div className="flex items-center justify-center mt-10">
              <Pagination count={10} showFirstButton showLastButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
