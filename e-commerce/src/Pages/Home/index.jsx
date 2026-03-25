import React, { useEffect, useState } from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from "../../components/AdsBannerSlider";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductsSlider from "../../components/ProductsSlider";
import { fetchDataFromApi } from "../../utils/api";

const Home = () => {
  const [value, setValue] = useState(0);
  const [homeSLidesData, setHomeSlideData] = useState([]);


  useEffect(()=>{
    fetchDataFromApi("/api/homeslides").then((res)=>{
      setHomeSlideData(res?.data)
    })
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    {
      homeSLidesData?.length!==0 &&  <HomeSlider data={homeSLidesData} />
    }
      <HomeCatSlider />

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className="text-[20px] font-semibold">Propular Products</h2>
              <p className="text-[14px] font-normal">
                Do not miss the current offers until the end of March.
              </p>
            </div>

            <div className="rightSec w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
              >
                <Tab label="Fashion" />
                <Tab label="Electronics" />
                <Tab label="Bags" />
                <Tab label="Footwear" />
                <Tab label="Groceries" />
                <Tab label="Beauty" />
                <Tab label="Wellness" />
                <Tab label="Jewellery" />
              </Tabs>
            </div>
          </div>

          <ProductsSlider items={5}/>
        </div>
      </section>

      <section className="py-16 pt-2  bg-white">
        <div className="container">
          <div className="freeShipping w-[80%] m-auto p-4 border-2 border-primary flex items-center justify-between rounded-md">
            <div className="col1 flex items-center gap-4">
              <LiaShippingFastSolid className="text-[50px]" />
              <span className="text-[20px] font-semibold uppercase">
                Free Shipping
              </span>
            </div>

            <div className="col2">
              <p className="mb-0 font-medium">
                Free Delivery On Your First Order and over $200{" "}
              </p>
            </div>

            <p className="font-bold text-[30px]">- Only $200*</p>
          </div>

          <AdsBannerSlider items={4} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-semibold">Latest Products</h2>
          <ProductsSlider items={5}/>

          <AdsBannerSlider items={3} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-semibold">Featured Products</h2>
          <ProductsSlider items={5}/>

          <AdsBannerSlider items={3} />
        </div>
      </section>
    </>
  );
};
export default Home;
