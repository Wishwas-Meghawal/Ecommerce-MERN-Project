import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";

import "../Navigation/style.css";
import { MyContext } from "../../../App.jsx";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const [catData, setCatData] = useState([]);

  const context = useContext(MyContext);
  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  useEffect(() => {
    setCatData(context?.catData);
  }, [context?.catData]);
  return (
    <>
      <nav className="hidden md:block">
        <div className="container flex items-center justify-end gap-3 lg:gap-7">
          <div className="col-1 w-[30%] lg:w-[20%]">
            <Button
              className="!text-black gap-2 w-full"
              onClick={openCategoryPanel}
            >
              <RiMenu2Fill className="text-[18px] font-bold" />
              <span className="hidden lg:inline">Shop By Categories</span>
              <span className="lg:hidden">Categories</span>
              <LiaAngleDownSolid className="text-[13px] ml-auto" />
            </Button>
          </div>

          <div className="col-2 w-[45%] lg:w-[60%] overflow-x-auto">
            <ul className="flex items-center gap-3 lg:gap-5 nav flex-nowrap">
              <li className="list-none">
                <Link to="/" className="link transition text-[1px] font-[500]">
                  <Button
                    className="link transition !font-[500] !text-[rgba(0,0,0,0.8)]
                            hover:!text-[#ff5252] !py-4"
                  >
                    Home
                  </Button>
                </Link>
              </li>
              {catData?.length !== 0 &&
                catData?.map((cat, index) => {
                  return (
                    <li className="list-none relative" key={index}>
                      <Link
                        to={`/products?catId=${cat?._id}`}
                        className="link transition text-[14px] font-[500]"
                      >
                        <Button
                          className="link transition !font-[500] !text-[rgba(0,0,0,0.8)]
                            hover:!text-[#ff5252] !py-4"
                        >
                          {cat?.name}
                        </Button>
                      </Link>

                      {cat?.children?.length !== 0 && (
                        <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                          <ul>
                            {cat?.children?.map((subCat, index_) => {
                              return (
                                <li
                                  className="list-none w-full relative"
                                  key={index_}
                                >
                                  <Link to={`/products?subCatId=${subCat?._id}`} className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                      {subCat?.name}
                                    </Button>

                                    {subCat?.children?.length !== 0 && (
                                      <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                                        <ul>
                                          {subCat?.children?.map(
                                            (thirdSubcat, index__) => {
                                              return (
                                                <li className="list-none w-full" key={index__}>
                                                  <Link
                                                    to={`/products?thirdLavelCatId=${thirdSubcat?._id}`}
                                                    className="w-full"
                                                  >
                                                    <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                      {thirdSubcat?.name}
                                                    </Button>
                                                  </Link>
                                                </li>
                                              );
                                            },
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="col-3 w-[25%] hidden lg:flex justify-end">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-300">
              <div className="relative">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <GoRocket className="text-white text-[11px]" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-[13px] font-bold text-gray-900 whitespace-nowrap">
                Free Home Delivery
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* category panel component */}

      {  
        catData?.length!==0 &&
        <CategoryPanel
        setIsOpenCatPanel={setIsOpenCatPanel}
        isOpenCatPanel={isOpenCatPanel}
        data={catData}
      />
      }
      
    </>
  );
};

export default Navigation;
