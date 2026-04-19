import OrderModel from "../models/order.model.js"
import ProductModel from "../models/product.model.js"

export const createOrderController =  async (request, response) =>{
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

    if(!order){
      response.status(500).json({
        error: true,
        success: false
      })
    }

    for(let i = 0; i< request.body.products.length; i++){
      await ProductModel.findByIdAndUpdate(
        request.body.products[i].productId,
        {
          coutInStock: parseInt(request.body.products[i].coutInStock - request.body.products[i].quantity),
        },
        {
          new : true
        }
      );
    }
    order = await order.save();

    return response.status(200).json({
      error: false,
      success: true,
      message: "Order Placed",
      order: order
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


export const getOrderDetailsController =  async (request, response) =>{
  try {
    const userId = request.userId;

    const orderList = (await OrderModel.find({userId : userId})).toSorted({ createdAt: -1}).populate('delivery_address, userId')

    return response.status(200).json({
      error: false,
      success: true,
      message: "Order List",
      data: orderList
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}