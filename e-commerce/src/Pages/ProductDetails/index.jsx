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

const ProductDetails = () => {
  
  const [activeTab, setActiveTab] = useState(0);

  const [rating, setRating] = useState(0);

  const [productData, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setProductData(res?.product);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    });
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <div className="py-10">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition text-[14px]"
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition text-[14px]"
            >
              Fashion
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition text-[14px]"
            >
              THE BEAR HOUSE
            </Link>
          </Breadcrumbs>
        </div>
      </div>

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
            <div className="container flex gap-4">
              <div className="productZoomContainer w-[45%] mt-1">
                <ProductZoom images={productData?.images} />
              </div>

              <div className="productContent w-[65%] px-4">
                <ProductDetailsComponent item={productData} />
              </div>
            </div>

            <div className="container  pt-10">
              {/* TAB BUTTONS */}
              <div className="flex items-center gap-8 mb-5">
                <span
                  className={`link text-[18px] cursor-pointer font-[500] ${
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
                  className={`link text-[18px] cursor-pointer font-[500] ${
                    activeTab === 1 && "text-primary"
                  }`}
                  onClick={() => setActiveTab(1)}
                >
                  Reviews(11)
                </span>
              </div>

              {activeTab === 0 && (
                <div className="shadow-md w-full px-8 py-5 rounded-md">
                  {
                    productData?.description
                  }
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
                <div className="mt-10 py-10 px-10 border rounded-md border-[rgba(0,0,0,0.2)]">
                  {/* TITLE */}
                  <h2 className="text-[24px] font-semibold mb-4">
                    Customer Reviews
                  </h2>

                  {/* REVIEW LIST (SCROLLABLE) */}
                  <div className="max-h-[420px] overflow-y-auto pr-3 reviewScroll  rounded-md p-4 bg-white">
                    {/* SINGLE REVIEW */}
                    <div className="flex gap-4 mb-6">
                      {/* USER IMAGE */}
                      <img
                        src="https://i.pravatar.cc/100?img=11"
                        alt="user"
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      {/* CONTENT */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">
                            Rahul Sharma
                          </h4>
                          <Rating
                            value={4.5}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                        </div>

                        <p className="text-sm text-gray-500 mb-1">2 days ago</p>

                        <p className="text-gray-700 leading-7 text-sm">
                          Product quality is amazing. Fabric is very soft and
                          fitting is perfect. Totally worth the price.
                        </p>
                      </div>
                    </div>

                    {/* SINGLE REVIEW */}
                    <div className="flex gap-4 mb-6">
                      <img
                        src="https://i.pravatar.cc/100?img=22"
                        alt="user"
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">
                            Aman Verma
                          </h4>
                          <Rating value={4} readOnly size="small" />
                        </div>

                        <p className="text-sm text-gray-500 mb-1">1 week ago</p>

                        <p className="text-gray-700 leading-7 text-sm">
                          Shirt looks exactly like the pictures. Delivery was
                          fast. Recommended 👍
                        </p>
                      </div>
                    </div>

                    {/* SINGLE REVIEW */}
                    <div className="flex gap-4 mb-6">
                      <img
                        src="https://i.pravatar.cc/100?img=35"
                        alt="user"
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">
                            Neha Gupta
                          </h4>
                          <Rating value={5} readOnly size="small" />
                        </div>

                        <p className="text-sm text-gray-500 mb-1">
                          3 weeks ago
                        </p>

                        <p className="text-gray-700 leading-7 text-sm">
                          Loved the color and quality. Perfect for daily wear.
                          Will buy again.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-6">
                      <img
                        src="https://i.pravatar.cc/100?img=35"
                        alt="user"
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">
                            Neha Gupta
                          </h4>
                          <Rating value={5} readOnly size="small" />
                        </div>

                        <p className="text-sm text-gray-500 mb-1">
                          3 weeks ago
                        </p>

                        <p className="text-gray-700 leading-7 text-sm">
                          Loved the color and quality. Perfect for daily wear.
                          Will buy again.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-6">
                      <img
                        src="https://i.pravatar.cc/100?img=35"
                        alt="user"
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">
                            Neha Gupta
                          </h4>
                          <Rating value={5} readOnly size="small" />
                        </div>

                        <p className="text-sm text-gray-500 mb-1">
                          3 weeks ago
                        </p>

                        <p className="text-gray-700 leading-7 text-sm">
                          Loved the color and quality. Perfect for daily wear.
                          Will buy again.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-6">
                      <img
                        src="https://i.pravatar.cc/100?img=35"
                        alt="user"
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">
                            Neha Gupta
                          </h4>
                          <Rating value={5} readOnly size="small" />
                        </div>

                        <p className="text-sm text-gray-500 mb-1">
                          3 weeks ago
                        </p>

                        <p className="text-gray-700 leading-7 text-sm">
                          Loved the color and quality. Perfect for daily wear.
                          Will buy again.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ADD REVIEW */}
                  <div className="mt-8  rounded-md p-5 ">
                    <h3 className="text-[18px] font-semibold mb-3">
                      Write a Review
                    </h3>

                    {/* RATING */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-medium text-gray-700">
                        Your Rating:
                      </span>
                      <Rating
                        value={rating}
                        precision={0.5}
                        onChange={(e, newValue) => setRating(newValue)}
                      />
                    </div>

                    {/* REVIEW TEXT */}
                    <textarea
                      placeholder="Write your review here..."
                      className="w-full h-[120px] border rounded-md p-3 text-sm outline-none focus:border-red-500"
                    ></textarea>

                    {/* SUBMIT */}
                    <Button
                      variant="contained"
                      sx={{ mt: 2, fontWeight: 600, background: "#ff5252" }}
                    >
                      Submit Review
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="container pt-8">
              <h2 className="text-[20px] font-[600]">Related Products</h2>
              <ProductsSlider items={5} />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ProductDetails;
