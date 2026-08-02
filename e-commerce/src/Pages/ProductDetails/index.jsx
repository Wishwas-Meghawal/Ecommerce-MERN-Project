import { Breadcrumbs } from "@mui/material";
import ProductZoom from "../../components/ProductZoom";
import { Link, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { use, useEffect, useState } from "react";
import ProductsSlider from "../../components/ProductsSlider";
import ProductDetailsComponent from "../../components/ProductDetails";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import Reviews from "./Reviews";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useRef } from "react";

const ProductDetails = () => {
  const context = useContext(MyContext);
  const [activeTab, setActiveTab] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  const [productData, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [relatedproductData, setRelatedProductData] = useState([]);

  const { id } = useParams();
  const reviewSec = useRef();

  useEffect(() => {
    fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
      if (res?.error === false) {
        setReviewsCount(res?.reviews?.length);
      }
    });
  }, [reviewsCount]);

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setProductData(res?.product);

        fetchDataFromApi(
          `/api/product/getAllProductsBySubCatId/${res?.product?.subCatId}`,
        ).then((res) => {
          if (res?.error === false) {
            const filteredData = res?.products?.filter((item) => item._id !== id);
            setRelatedProductData(filteredData);
          }
        });

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    });

    window.scrollTo(0, 0);
  }, [id]);

  const gotoReviews = () => {
    setActiveTab(1);
    window.scrollTo({
      top: reviewSec.current?.offsetTop - 170,
      behavior: "smooth",
    });
    setActiveTab(1);
  };

  return (
    <>
      <section className="bg-white py-2">
        {isLoading === true ? (
          <div className="flex items-center justify-center min-h-[300px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
            <div className="flex flex-col items-center gap-4 p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200">
              {/* Loader */}
              <CircularProgress
                size={50}
                thickness={4}
                sx={{
                  color: "#6366f1", // Indigo premium color
                }}
              />

              {/* Text */}
              <p className="text-sm font-medium text-gray-600 animate-pulse">
                Loading, please wait...
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="container flex flex-col md:flex-row gap-4">
              <div className="productZoomContainer w-full md:w-[45%] mt-1">
                <ProductZoom images={productData?.images} />
              </div>

              <div className="productContent w-full md:w-[55%] lg:w-[65%] px-0 md:px-4">
                <ProductDetailsComponent
                  item={productData}
                  reviewsCount={reviewsCount}
                  gotoReviews={gotoReviews}
                />
              </div>
            </div>

            <div className="container  pt-10">
              {/* TAB BUTTONS */}
              <div className="flex items-center gap-5 sm:gap-8 mb-5 overflow-x-auto">
                <span
                  className={`link text-[16px] sm:text-[18px] cursor-pointer font-[500] whitespace-nowrap ${
                    activeTab === 0 && "text-primary"
                  }`}
                  onClick={() => setActiveTab(0)}
                >
                  Description
                </span>
                {/* <span
                  className={`link text-[18px] cursor-pointer font-[500] ${
                    activeTab === 1 && "text-primary"
                  }`}
                  onClick={() => setActiveTab(1)}
                >
                  Product Details
                </span> */}
                <span
                  className={`link text-[16px] sm:text-[18px] cursor-pointer font-[500] whitespace-nowrap ${
                    activeTab === 1 && "text-primary"
                  }`}
                  onClick={() => setActiveTab(1)}
                  ref={reviewSec}
                >
                  Reviews( {reviewsCount} )
                </span>
              </div>

              {activeTab === 0 && (
                <div className="shadow-md w-full px-4 sm:px-8 py-5 rounded-md">
                  {productData?.description}
                </div>
              )}

              {/* {activeTab === 1 && (
                <div class="bg-white mt-6 px-4 py-4 border border-gray-200 rounded-md">
                  <h2 class="text-lg font-semibold text-gray-800 mb-4">
                    Product Details
                  </h2>

                  <table class="w-full text-sm border-collapse">
                    <tbody>
                      <tr class="align-top bg-gray-50 border-b border-gray-200">
                        <td class="w-[30%] py-3 px-3 text-gray-500 font-medium">
                          Product Name
                        </td>
                        <td class="w-[70%] py-3 px-3 text-gray-800 leading-7">
                          Men Solid Blue Casual Shirt
                        </td>
                      </tr>

                      <tr class="align-top border-b border-gray-200">
                        <td class="py-3 px-3 text-gray-500 font-medium">
                          Brand
                        </td>
                        <td class="py-3 px-3 text-gray-800 leading-7">
                          Flying Machine
                        </td>
                      </tr>

                      <tr class="align-top bg-gray-50 border-b border-gray-200">
                        <td class="py-3 px-3 text-gray-500 font-medium">
                          Color
                        </td>
                        <td class="py-3 px-3 text-gray-800 leading-7">
                          Navy Blue
                        </td>
                      </tr>

                      <tr class="align-top border-b border-gray-200">
                        <td class="py-3 px-3 text-gray-500 font-medium">
                          Size
                        </td>
                        <td class="py-3 px-3 text-gray-800 leading-7">XL</td>
                      </tr>

                      <tr class="align-top bg-gray-50 border-b border-gray-200">
                        <td class="py-3 px-3 text-gray-500 font-medium">
                          Fabric
                        </td>
                        <td class="py-3 px-3 text-gray-800 leading-7">
                          100% Cotton
                        </td>
                      </tr>

                      <tr class="align-top border-b border-gray-200">
                        <td class="py-3 px-3 text-gray-500 font-medium">
                          Fit Type
                        </td>
                        <td class="py-3 px-3 text-gray-800 leading-7">
                          Slim Fit
                        </td>
                      </tr>

                      <tr class="align-top bg-gray-50">
                        <td class="py-3 px-3 text-gray-500 font-medium">
                          Occasion
                        </td>
                        <td class="py-3 px-3 text-gray-800 leading-7">
                          Casual Wear
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )} */}

              {activeTab === 1 && (
                <>
                  {productData?.reviews?.length !== 0 && (
                    <Reviews
                      productId={productData?._id}
                      setReviewsCount={setReviewsCount}
                    />
                  )}
                </>
              )}
            </div>

            {relatedproductData?.length !== 0 && (
              <div className="container pt-8">
                <h2 className="text-[20px] font-[600]">Related Products</h2>
                <ProductsSlider items={5} data={relatedproductData} />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default ProductDetails;
