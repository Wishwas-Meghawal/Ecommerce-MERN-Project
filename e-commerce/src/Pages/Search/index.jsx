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
import Pagination from "@mui/material/Pagination";
import ProductLoading from "../../components/ProductLoading";

import {Menu, MenuItem } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { IoFilterOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { postData } from "../../utils/api";

const SearchPage = () => {
  const [itemView, setItemView] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenMobileFilter, setIsOpenMobileFilter] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [productsData, setProductsData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState("Name, A To Z");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortBy = (name, order, products, value) => {
    setSelected(value);

    postData(`/api/product/sortBy`, {
      products: products,
      sortBy: name,
      order: order,
    })
      .then((res) => {
        setProductsData(res);
        handleClose();
      })
      .catch((err) => {
      });
  };

  return (
    <section className="py-4 pb-0">
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
        <div className="container flex flex-col md:flex-row gap-3">
          <div className="sidebarWrapper hidden md:block md:w-[28%] lg:w-[20%] bg-white">
            <Sidebar
              productsData={productsData}
              setProductsData={setProductsData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              page={page}
              setTotalPages={setTotalPages}
            />
          </div>

          <Drawer
            anchor="left"
            open={isOpenMobileFilter}
            onClose={() => setIsOpenMobileFilter(false)}
          >
            <div className="w-[85vw] max-w-[320px] p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[16px] font-semibold">Filters</h3>
                <IoCloseSharp
                  className="text-[22px] cursor-pointer"
                  onClick={() => setIsOpenMobileFilter(false)}
                />
              </div>
              <Sidebar
                productsData={productsData}
                setProductsData={setProductsData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                page={page}
                setTotalPages={setTotalPages}
              />
            </div>
          </Drawer>

          <div className="rightContent w-full md:w-[72%] lg:w-[80%] py-3">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f5f5] px-3 md:px-4 py-3 rounded-md mb-4 md:sticky md:top-[150px] z-99">
              <div className=" col1 flex items-center gap-2 itemViewActions">
                <Button
                  className="md:hidden !w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white shadow"
                  onClick={() => setIsOpenMobileFilter(true)}
                >
                  <IoFilterOutline className="text-red-500 text-xl" />
                </Button>
                <Button
                  className={`hidden sm:flex w-[40px]! h-[40px]! min-w-[40px]! rounded-full! bg-white items-center justify-center shadow ${itemView === "list" && "active"}`}
                  onClick={() => setItemView("list")}
                >
                  <LuMenu className="text-red-500 text-xl" />
                </Button>
                <Button
                  className={`hidden sm:flex w-[40px]! h-[40px]! min-w-[40px]! rounded-full! bg-white items-center justify-center shadow ${itemView === "grid" && "active"}`}
                  onClick={() => setItemView("grid")}
                >
                  <HiViewGrid className="text-red-500 text-xl" />
                </Button>
                <p className="text-[12px] sm:text-sm text-gray-700 pl-1 sm:pl-3 text-[rgba(0,0,0,0.7)]">
                  There are
                  <span className="font-semibold ml-2 mr-1 text-gray-800">
                    {productsData?.products?.length !== 0 ? productsData?.products?.length : "0"}
                  </span>
                  Products.
                </p>
              </div>

              <div className=" col2 ml-auto flex items-center gap-2">
                {/* <SortByDropdown productsData={productsData} setProductsData={setProductsData} /> */}
                <span className="hidden sm:inline text-sm text-gray-600">Sort by :</span>

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
                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "name",
                        "asc",
                        productsData,
                        "Name, A To Z",
                      )
                    }
                  >
                    Name, A To Z
                  </MenuItem>

                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "name",
                        "desc",
                        productsData,
                        "Name, Z To A",
                      )
                    }
                  >
                    Name, Z To A
                  </MenuItem>

                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "price",
                        "asc",
                        productsData,
                        "Price, Low To High",
                      )
                    }
                  >
                    Price, Low To High
                  </MenuItem>

                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "price",
                        "desc",
                        productsData,
                        "Price, High To Low",
                      )
                    }
                  >
                    Price, High To Low
                  </MenuItem>
                </Menu>
              </div>
            </div>

            {/* Product Grid */}
            <div
              className={`grid gap-3 md:gap-4 transition-all duration-300 ${
                itemView === "grid"
                  ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {itemView === "grid" ? (
                <>
                  {isLoading === true ? (
                    <ProductLoading view={itemView} />
                  ) : (
                    productsData?.products?.length !== 0 &&
                    productsData?.products?.map((item, index) => {
                      return <ProductItem key={index} item={item} />;
                    })
                  )}
                </>
              ) : (
                <>
                  {isLoading === true ? (
                    <ProductLoading view={itemView} />
                  ) : (
                    productsData?.products?.length !== 0 &&
                    productsData?.products?.map((item, index) => {
                      return <ProductItemListView key={index} item={item} />;
                    })
                  )}
                </>
              )}
            </div>

            {totalPages >1 && (
              <div className="flex items-center justify-center mt-10">
                <Pagination
                  showFirstButton
                  showLastButton
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
