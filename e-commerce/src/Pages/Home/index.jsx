import React, { useContext, useEffect, useState } from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from "../../components/AdsBannerSlider";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductsSlider from "../../components/ProductsSlider";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import ProductLoading from "../../components/ProductLoading";

const Home = () => {
  const [value, setValue] = useState(0);
  const [homeSLidesData, setHomeSlideData] = useState([]);
  const [popularProductData, setPopularProductData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFromApi("/api/homeslides").then((res) => {
      setHomeSlideData(res?.data);
    });

    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      setProductData(res?.products);
    });

    fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res) => {
      setFeaturedProducts(res?.products);
    });
  }, []);

  useEffect(() => {
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`,
    ).then((res) => {
      if (res?.error === false) {
        setPopularProductData(res?.products);
      }
    });
  }, [context?.catData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId = (id) => {
    setPopularProductData([]);
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      if (res?.error === false) {
        setPopularProductData(res?.products);
      }
    });
  };

  return (
    <>
      {homeSLidesData?.length !== 0 && <HomeSlider data={homeSLidesData} />}

      {context?.catData?.length !== 0 && (
        <HomeCatSlider data={context?.catData} />
      )}

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="leftSec">
              <h2 className="text-[18px] md:text-[20px] font-semibold">Propular Products</h2>
              <p className="text-[13px] md:text-[14px] font-normal">
                Do not miss the current offers until the end of March.
              </p>
            </div>

            <div className="rightSec w-full md:w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
              >
                {context?.catData?.length !== 0 &&
                  context?.catData?.map((cat, index) => {
                    return (
                      <Tab
                        label={cat?.name}
                        onClick={() => filterByCatId(cat?._id)}
                      />
                    );
                  })}
              </Tabs>
            </div>
          </div>

          {popularProductData?.length === 0 && <ProductLoading />}

          {popularProductData?.length !== 0 && (
            <ProductsSlider items={5} data={popularProductData} />
          )}
        </div>
      </section>

      <section className="py-16 pt-2  bg-white">
        <div className="container">
          <div className="freeShipping w-full md:w-[80%] m-auto p-4 border-2 border-primary flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 text-center md:text-left rounded-md">
            <div className="col1 flex items-center gap-3 md:gap-4">
              <LiaShippingFastSolid className="text-[36px] md:text-[50px]" />
              <span className="text-[16px] md:text-[20px] font-semibold uppercase">
                Free Shipping
              </span>
            </div>

            <div className="col2">
              <p className="mb-0 font-medium text-[13px] md:text-[16px]">
                Free Delivery On Your First Order and over $200{" "}
              </p>
            </div>

            <p className="font-bold text-[22px] md:text-[30px]">- Only $200*</p>
          </div>

          <AdsBannerSlider items={4} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-semibold">Latest Products</h2>

          {productData?.length === 0 && <ProductLoading />}

          {productData?.length !== 0 && (
            <ProductsSlider items={5} data={productData} />
          )}

          <AdsBannerSlider items={3} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-semibold">Featured Products</h2>

          {featuredProducts?.length === 0 && <ProductLoading />}
          {featuredProducts?.length !== 0 && (
            <ProductsSlider items={5} data={featuredProducts} />
          )}

          <AdsBannerSlider items={3} />
        </div>
      </section>
    </>
  );
};
export default Home;
