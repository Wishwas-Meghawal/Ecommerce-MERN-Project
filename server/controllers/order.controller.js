import { response } from "express";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export const createOrderController = async (request, response) => {
  try {
    let order = new OrderModel({
      userId: request.body.userId,
      products: request.body.products,
      paymentId: request.body.paymentId,
      payment_status: request.body.payment_status,
      delivery_address: request.body.delivery_address,
      totalAmt: request.body.totalAmt,
      date: request.body.date,
    });

    if (!order) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    for (let i = 0; i < request.body.products.length; i++) {
      await ProductModel.findByIdAndUpdate(
        request.body.products[i].productId,
        {
          coutInStock: parseInt(
            request.body.products[i].coutInStock -
              request.body.products[i].quantity,
          ),
        },
        {
          new: true,
        },
      );
    }
    order = await order.save();

    return response.status(200).json({
      error: false,
      success: true,
      message: "Order Placed",
      order: order,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getOrderDetailsController = async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 5;

    const skip = (page - 1) * limit;

    const totalOrders = await OrderModel.countDocuments();

    const orderList = await OrderModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("delivery_address userId");

    return response.status(200).json({
      error: false,
      success: true,
      message: "Order List",
      data: orderList,
      totalOrders: totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateOrderStatusController = async (request, response) => {
  try {
    const { id, order_status } = request.body;

    const updateOrder = await OrderModel.updateOne(
      {
        _id: id,
      },
      {
        order_status: order_status,
      },
      { new: true },
    );

    return response.status(200).json({
      message: "Update Order Status",
      success: true,
      error: false,
      data: updateOrder,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getTotalOrdersCountController = async (request, response) => {
  try {
    const ordersCount = await OrderModel.countDocuments();
    return response.status(200).json({
      error: false,
      success: true,
      count: ordersCount,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const totalSalesController = async (request, response) => {
  try {
    const currentYear = new Date().getFullYear();

    const ordersList = await OrderModel.find();

    let totalSales = 0;
    const monthlySales = [
      {
        name: "JAN",
        TotalSales: 0,
      },
      {
        name: "FEB",
        TotalSales: 0,
      },
      {
        name: "MAR",
        TotalSales: 0,
      },
      {
        name: "APR",
        TotalSales: 0,
      },
      {
        name: "MAY",
        TotalSales: 0,
      },
      {
        name: "JUN",
        TotalSales: 0,
      },
      {
        name: "JUL",
        TotalSales: 0,
      },
      {
        name: "AUG",
        TotalSales: 0,
      },
      {
        name: "SEP",
        TotalSales: 0,
      },
      {
        name: "OCT",
        TotalSales: 0,
      },
      {
        name: "NOV",
        TotalSales: 0,
      },
      {
        name: "DEC",
        TotalSales: 0,
      },
    ];

    for (let i = 0; i < ordersList.length; i++) {
      totalSales = totalSales + parseInt(ordersList[i]?.totalAmt);
      const str = JSON.stringify(ordersList[i]?.createdAt);
      const year = str.substr(1, 4);
      const monthStr = str.substr(6, 8);
      const month = parseInt(monthStr.substr(0, 2));

      if (currentYear == year) {
        if (month === 1) {
          monthlySales[0] = {
            name: "JAN",
            TotalSales:
              parseInt(monthlySales[0].TotalSales) +
              parseInt(ordersList[i].totalAmt),
          };
        }

        if (month === 2) {
          monthlySales[1] = {
            name: "FEB",
            TotalSales:
              parseInt(monthlySales[1].TotalSales) +
              parseInt(ordersList[i].totalAmt),
          };
        }

        if (month === 3) {
          monthlySales[2] = {
            name: "MAR",
            TotalSales:
              parseInt(monthlySales[2].TotalSales) +
              parseInt(ordersList[i].totalAmt),
          };
        }

        if (month === 4) {
          monthlySales[3] = {
            name: "APR",
            TotalSales:
              parseInt(monthlySales[3].TotalSales) +
              parseInt(ordersList[i].totalAmt),
          };
        }

        if (month === 5) {
          monthlySales[4] = {
            name: "MAY",
            TotalSales:
              parseInt(monthlySales[4].TotalSales) +
              parseInt(ordersList[i].totalAmt),
          };
        }

        if (month === 6) {
          monthlySales[5] = {
            name: "JUN",
            TotalSales:
              parseInt(monthlySales[5].TotalSales) +
              parseInt(ordersList[i].totalAmt),
          };
        }

        if (month === 7) {
          monthlySales[6] = {
            name: "JUL",
            TotalSales:
              parseInt(monthlySales[6].TotalSales) +
              parseInt(ordersList[i].totalAmt),
          };
        }

        if (month === 8) {
          monthlySales[7] = {
            name: "AUG",
            TotalSales:
              parseInt(monthlySales[7].TotalSales) +
              parseInt(ordersList[i].totalAmt),
          };
        }

        if (month === 9) {
          monthlySales[8] = {
            name: "SEP",
            TotalSales:
              parseInt(monthlySales[8].TotalSales) +
              parseInt(ordersList[i].totalAmt),
          };
        }

        if (month === 10) {
          monthlySales[9] = {
            name: "OCT",
            TotalSales:
              parseInt(monthlySales[9].TotalSales) +
              parseInt(ordersList[i].totalAmt),
          };
        }

        if (month === 11) {
          monthlySales[10] = {
            name: "NOV",
            TotalSales:
              parseInt(monthlySales[10].TotalSales) +
              parseInt(ordersList[i].totalAmt),
          };
        }

        if (month === 12) {
          monthlySales[11] = {
            name: "DEC",
            TotalSales:
              parseInt(monthlySales[11].TotalSales) +
              parseInt(ordersList[i].totalAmt),
          };
        }
      }
    }
    return response.status(200).json({
      totalSales: totalSales,
      monthlySales: monthlySales,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const totalUsersController = async (request, response) => {
  try {
    const users = await UserModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const monthlyUsers = [
      {
        name: "JAN",
        TotalSales: 0,
      },
      {
        name: "FEB",
        TotalSales: 0,
      },
      {
        name: "MAR",
        TotalSales: 0,
      },
      {
        name: "APR",
        TotalSales: 0,
      },
      {
        name: "MAY",
        TotalSales: 0,
      },
      {
        name: "JUN",
        TotalSales: 0,
      },
      {
        name: "JUL",
        TotalSales: 0,
      },
      {
        name: "AUG",
        TotalSales: 0,
      },
      {
        name: "SEP",
        TotalSales: 0,
      },
      {
        name: "OCT",
        TotalSales: 0,
      },
      {
        name: "NOV",
        TotalSales: 0,
      },
      {
        name: "DEC",
        TotalSales: 0,
      },
    ];

    for (let i = 0; i < users.length; i++) {
      if (users[i]?._id?.month === 1) {
        monthlyUsers[0] = {
          name: "JAN",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 2) {
        monthlyUsers[1] = {
          name: "FEB",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 3) {
        monthlyUsers[2] = {
          name: "MAR",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 4) {
        monthlyUsers[3] = {
          name: "APR",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 5) {
        monthlyUsers[4] = {
          name: "MAY",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 6) {
        monthlyUsers[5] = {
          name: "JUN",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 7) {
        monthlyUsers[6] = {
          name: "JUL",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 8) {
        monthlyUsers[7] = {
          name: "AUG",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 9) {
        monthlyUsers[8] = {
          name: "SEP",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 10) {
        monthlyUsers[9] = {
          name: "OCT",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 11) {
        monthlyUsers[10] = {
          name: "NOV",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 12) {
        monthlyUsers[11] = {
          name: "DEC",
          TotalUsers: users[i].count,
        };
      }
    }

    return response.status(200).json({
      TotalUsers : monthlyUsers,
      error: false,
      success : true
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
