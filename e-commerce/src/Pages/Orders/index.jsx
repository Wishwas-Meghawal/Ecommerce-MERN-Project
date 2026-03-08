import React, { useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from "../../components/Badge";

const Orders = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct == index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };
  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[80%]">
          <div className="shadow-md rounded-md  bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>My Orders</h2>
              <p className="mt-0 ">
                There are <span className="font-bold text-primary">2</span>{" "}
                Orders
              </p>

              <div className="relative mt-5 overflow-x-auto bg-white">
                <table className="min-w-full text-sm text-left text-gray-600">
                  {/* Table Head */}
                  <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                    <tr>
                      <th className="px-6 py-3">&nbsp;</th>
                      <th className="px-6 py-3 whitespace-nowrap">Order ID</th>
                      <th className="px-6 py-3 whitespace-nowrap">
                        Paymant Id
                      </th>
                      <th className="px-6 py-3 whitespace-nowrap">Name</th>
                      <th className="px-6 py-3 whitespace-nowrap">
                        Phone Number
                      </th>
                      <th className="px-6 py-3 whitespace-nowrap">Address</th>
                      <th className="px-6 py-3 whitespace-nowrap">Pincode</th>
                      <th className="px-6 py-3 whitespace-nowrap">
                        Total Amount
                      </th>
                      <th className="px-6 py-3 whitespace-nowrap">Email</th>
                      <th className="px-6 py-3 whitespace-nowrap">User Id</th>
                      <th className="px-6 py-3 whitespace-nowrap">
                        Order Status
                      </th>
                      <th className="px-6 py-3 whitespace-nowrap">Date</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td>
                        <Button
                          className="w-[35px]! h-[35px]! min-w-[35px]! rounded-full! bg-[#f1fdf1]!"
                          onClick={() => isShowOrderProduct(0)}
                        >
                          {isOpenOrderProduct === 0 ? (
                            <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                          ) : (
                            <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                          )}
                        </Button>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <span className="text-primary">
                          3874bhjjb937y1nb73y49
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <span className="text-primary">
                          3874bhjjb937y1nb73y49
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Show Yamato
                      </td>
                      <td className="px-6 py-4">134567890</td>
                      <td>
                        <span className="block w-[400px]">
                          Dilli Haat Pitampura, Near Netaji Subhash Place Metro
                          Station, Delhi, 110052, India
                        </span>
                      </td>
                      <td className="px-6 py-4">123456</td>
                      <td className="px-6 py-4">$200.00</td>
                      <td className="px-6 py-4">show@gmail.com</td>
                      <td className="px-6 py-4">
                        <span className="text-primary">
                          3874bhjjb937y1nb73y49
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge status="delivered" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        28-12-2025
                      </td>
                    </tr>

                    {isOpenOrderProduct === 0 && (
                      <tr>
                        <td className="pl-20" colSpan="6">
                          <div className="relative mt-5 overflow-x-auto bg-white">
                            <table className="min-w-full text-sm text-left text-primary">
                              {/* Table Head */}
                              <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                                <tr>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    Product Id
                                  </th>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    Product Title
                                  </th>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    Image
                                  </th>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    Quantity
                                  </th>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    Price
                                  </th>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    SubTotal
                                  </th>
                                </tr>
                              </thead>

                              {/* Table Body */}
                              <tbody className="divide-y">
                                <tr className="hover:bg-gray-50">
                                  <td className="px-6 py-4 font-medium text-gray-900">
                                    <span className="text-gray-600">
                                      3874bhjjb937y1nb73y49
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 font-medium text-gray-900">
                                    Men Pure Cotton Striped Casual Shirt
                                  </td>

                                  <td className="px-6 py-4">
                                    <img
                                      src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFyvmaGbG3yOnp_yaTqXq7eKDJA5uoru9K-owHvFevVDxjq4jZdg5Tln2MAlgkLvoCWXdqgRgqhh9a4DvEuIYb6lVwdGLlc4cCumZRHJQ"
                                      alt=""
                                      className="w-10 h-10 object-cover rounded-md"
                                    />
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap">
                                    2
                                  </td>

                                  <td className="px-6 py-4">$1300.00</td>
                                  <td className="px-6 py-4">$2600.00</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                  <td className="px-6 py-4 font-medium text-gray-900">
                                    <span className="text-gray-600">
                                      3874bhjjb937y1nb73y49
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 font-medium text-gray-900">
                                    Men Pure Cotton Striped Casual Shirt
                                  </td>

                                  <td className="px-6 py-4">
                                    <img
                                      src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFyvmaGbG3yOnp_yaTqXq7eKDJA5uoru9K-owHvFevVDxjq4jZdg5Tln2MAlgkLvoCWXdqgRgqhh9a4DvEuIYb6lVwdGLlc4cCumZRHJQ"
                                      alt=""
                                      className="w-10 h-10 object-cover rounded-md"
                                    />
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap">
                                    2
                                  </td>

                                  <td className="px-6 py-4">$1300.00</td>
                                  <td className="px-6 py-4">$2600.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                    <tr className="hover:bg-gray-50">
                      <td>
                        <Button
                          className="w-[35px]! h-[35px]! min-w-[35px]! rounded-full! bg-[#f1fdf1]!"
                          onClick={() => isShowOrderProduct(1)}
                        >
                          {isOpenOrderProduct === 1 ? (
                            <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                          ) : (
                            <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                          )}
                        </Button>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <span className="text-primary">
                          3874bhjjb937y1nb73y49
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <span className="text-primary">
                          3874bhjjb937y1nb73y49
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Show Yamato
                      </td>
                      <td className="px-6 py-4">134567890</td>
                      <td>
                        <span className="block w-[400px]">
                          Dilli Haat Pitampura, Near Netaji Subhash Place Metro
                          Station, Delhi, 110052, India
                        </span>
                      </td>
                      <td className="px-6 py-4">123456</td>
                      <td className="px-6 py-4">$200.00</td>
                      <td className="px-6 py-4">show@gmail.com</td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600">
                          3874bhjjb937y1nb73y49
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge status="delivered" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        28-12-2025
                      </td>
                    </tr>

                    {isOpenOrderProduct === 1 && (
                      <tr>
                        <td className="pl-20" colSpan="6">
                          <div className="relative mt-5 overflow-x-auto bg-white">
                            <table className="min-w-full text-sm text-left text-gray-600">
                              {/* Table Head */}
                              <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                                <tr>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    Product Id
                                  </th>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    Product Title
                                  </th>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    Image
                                  </th>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    Quantity
                                  </th>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    Price
                                  </th>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    SubTotal
                                  </th>
                                </tr>
                              </thead>

                              {/* Table Body */}
                              <tbody className="divide-y">
                                <tr className="hover:bg-gray-50">
                                  <td className="px-6 py-4 font-medium text-gray-900">
                                    <span className="text-gray-600">
                                      3874bhjjb937y1nb73y49
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 font-medium text-gray-900">
                                    Men Pure Cotton Striped Casual Shirt
                                  </td>

                                  <td className="px-6 py-4">
                                    <img
                                      src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFyvmaGbG3yOnp_yaTqXq7eKDJA5uoru9K-owHvFevVDxjq4jZdg5Tln2MAlgkLvoCWXdqgRgqhh9a4DvEuIYb6lVwdGLlc4cCumZRHJQ"
                                      alt=""
                                      className="w-10 h-10 object-cover rounded-md"
                                    />
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap">
                                    2
                                  </td>

                                  <td className="px-6 py-4">$1300.00</td>
                                  <td className="px-6 py-4">$2600.00</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                  <td className="px-6 py-4 font-medium text-gray-900">
                                    <span className="text-gray-600">
                                      3874bhjjb937y1nb73y49
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 font-medium text-gray-900">
                                    Men Pure Cotton Striped Casual Shirt
                                  </td>

                                  <td className="px-6 py-4">
                                    <img
                                      src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFyvmaGbG3yOnp_yaTqXq7eKDJA5uoru9K-owHvFevVDxjq4jZdg5Tln2MAlgkLvoCWXdqgRgqhh9a4DvEuIYb6lVwdGLlc4cCumZRHJQ"
                                      alt=""
                                      className="w-10 h-10 object-cover rounded-md"
                                    />
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap">
                                    2
                                  </td>

                                  <td className="px-6 py-4">$1300.00</td>
                                  <td className="px-6 py-4">$2600.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
