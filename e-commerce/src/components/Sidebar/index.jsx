import React, { useState } from "react";
import "../Sidebar/style.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";

import Button from "@mui/material/Button";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { postData } from "../../utils/api.js";
import { use } from "react";

const Sidebar = (props) => {
  const context = useContext(MyContext);
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);

  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdsubCatId: [],
    minPrice: "",
    maxPrice: "",
    rating: "",
    page: 1,
    limit: 25,
  });

  const [price, setPrice] = useState([0, 60000]);
  const location = useLocation();

  const handleCheckBoxChange = (field, value) => {

    context?.setSearchData([]);

    const cuurentValues = filters[field] || [];
    const updatedValues = cuurentValues?.includes(value)
      ? cuurentValues.filter((item) => item !== value)
      : [...cuurentValues, value];

    setFilters((prve) => ({
      ...prve,
      [field]: updatedValues,
    }));

    if (field === "catId") {
      setFilters((prve) => ({
        ...prve,
        subCatId: [],
        thirdsubCatId: [],
      }));
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const queryParameters = new URLSearchParams(location.search);

    if (url.includes("catId")) {
      const categoryId = queryParameters.get("catId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = catArr;
      filters.subCatId = [];
      filters.thirdsubCatId = [];
      filters.rating = [];
      context?.setSearchData([]);
    }
    if (url.includes("subCatId")) {
      const subCategoryId = queryParameters.get("subCatId");
      const subCatArr = [];
      subCatArr.push(subCategoryId);
      filters.catId = [];
      filters.subCatId = subCatArr;
      filters.thirdsubCatId = [];
      filters.rating = [];
      context?.setSearchData([]);
    }
    if (url.includes("thirdLavelCatId")) {
      const thirdSubCategoryId = queryParameters.get("thirdLavelCatId");
      const thirdSubCatArr = [];
      thirdSubCatArr.push(thirdSubCategoryId);
      filters.catId = [];
      filters.subCatId = [];
      filters.thirdsubCatId = thirdSubCatArr;
      filters.rating = [];
      context?.setSearchData([]);
    }

    filters.page = 1;

    setTimeout(() => {
      filtersData();
    }, 200);

    
  }, [location]);

  const filtersData = () => {
    props.setIsLoading(true);

    if (context?.searchData?.products?.length > 0) {
      props.setProductsData(context?.searchData);
      props.setIsLoading(false);
      props.setTotalPages(context?.searchData?.totalPages);
      window.scrollTo(0, 0);
    } else {
      postData(`/api/product/filters`, filters).then((res) => {
        props.setProductsData(res);
        props.setIsLoading(false);
        props.setTotalPages(res?.totalPages);
        window.scrollTo(0, 0);
      });
    }
  };

  useEffect(() => {
    filters.page = props.page;
    filtersData();
  }, [filters, props.page]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1],
    }));
  }, [price]);

  return (
    <aside className="sidebar py-5 sticky top-[135px] z-[50]">
      <div className="box">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Shop By Category
          <Button
            className="w-[30px]! h-[30px]! min-w-[30px]! rounded-full! ml-auto! text-black!"
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            {context?.catData?.length !== 0 &&
              context?.catData?.map((item, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={item?._id}
                    control={<Checkbox size="small" />}
                    checked={filters?.catId?.includes(item?._id)}
                    label={item?.name}
                    onChange={() => handleCheckBoxChange("catId", item?._id)}
                    className="w-full"
                  />
                );
              })}
          </div>
        </Collapse>
      </div>

      <div className="box mt-3">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Filter By Price
        </h3>
        <RangeSlider
          value={price}
          onInput={setPrice}
          min={100}
          max={60000}
          step={5}
        />
        <div className="flex pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            From:<strong className="text-dark">Rs:{price[0]}</strong>
          </span>
          <span className="ml-auto text-[13px]">
            From <strong className="text-dark">Rs:{price[1]}</strong>
          </span>
        </div>
      </div>

      <div className="box mt-3">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Filter By Rating
        </h3>
        <div className="flex items-center">
          <FormControlLabel
            value={5}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(5)}
            onChange={() => handleCheckBoxChange("rating", 5)}
          />
          <Rating name="rating" value={5} size="small" readOnly />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            value={4.5}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(4.5)}
            onChange={() => handleCheckBoxChange("rating", 4.5)}
          />
          <Rating
            name="rating"
            value={4.5}
            precision={0.5}
            size="small"
            readOnly
          />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            value={4}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(4)}
            onChange={() => handleCheckBoxChange("rating", 4)}
          />
          <Rating name="rating" value={4} size="small" readOnly />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            value={3.5}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(3.5)}
            onChange={() => handleCheckBoxChange("rating", 3.5)}
          />
          <Rating
            name="rating"
            value={3.5}
            precision={0.5}
            size="small"
            readOnly
          />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            value={3}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(3)}
            onChange={() => handleCheckBoxChange("rating", 3)}
          />
          <Rating name="rating" value={3} size="small" readOnly />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            value={2.5}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(2.5)}
            onChange={() => handleCheckBoxChange("rating", 2.5)}
          />
          <Rating
            name="rating"
            value={2.5}
            precision={0.5}
            size="small"
            readOnly
          />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            value={2}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(2)}
            onChange={() => handleCheckBoxChange("rating", 2)}
          />
          <Rating name="rating" value={2} size="small" readOnly />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            value={1.5}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(1.5)}
            onChange={() => handleCheckBoxChange("rating", 1.5)}
          />
          <Rating
            name="rating"
            value={1.5}
            precision={0.5}
            size="small"
            readOnly
          />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            value={1}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(1)}
            onChange={() => handleCheckBoxChange("rating", 1)}
          />
          <Rating name="rating" value={1} size="small" readOnly />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
