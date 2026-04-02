import CartProductModel from "../models/cartProduct.model.js";

// add item to cart
export const addCartItemController = async (request,response)=>{
    try {
        const userId = request.userId
        const { productTitle,image,rating,price,quantity,subTotal,productId,countInStock } = request.body

        if(!productId){
            return response.status(402).json({
                message: "Provide productId",
                error: true,
                uccess:"false"
            })
        }

        const checkItemCart = await CartProductModel.findOne({
            userId: userId,
            product : productId
        })



        if(checkItemCart){
            return response.status(400).json({
                message: "Item already in cart"
            })
        }

        const cartItem = new CartProductModel({
            productTitle: productTitle,
            image: image,
            rating: rating,
            price: price,
            quantity: quantity,
            subTotal: subTotal,
            productId: productId,
            countInStock: countInStock,
            userId: userId
        })

        const save = await cartItem.save();

        return response.status(200).json({
            data: save,
            message: "Item add successfully",
            error: false,
            success : true
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


//get cart items
export const getCartItemController = async (request,response)=>{
    try {
        const userId = request.userId

        const cartItems = await CartProductModel.find({
            userId: userId
        })

        return response.status(200).json({
            data: cartItems,
            message: "Cart items fetched successfully",
            error: false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true, 
            success : false
        })
    }
}


// upate cart item quantity controller
export const updateCartItemQuantityController = async (request,response)=>{
    try {
        const userId = request.userId
        const { _id, quantity } = request.body


        if(!_id || !quantity){
            return response.status(402).json({
                message: "Provide id and quantity",
                error: true,
                success: false
            })
        }

        const updateCartItem = await CartProductModel.updateOne({
            _id: _id,
            userId: userId
        },{
            quantity: quantity
        })

        return response.status(200).json({
            data: updateCartItem,
            message: "Cart item quantity updated successfully",
            error: false,
            success : true
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


//delete cart item controller
export const deleteCartItemQuantityController = async (request,response)=>{
    try {
        const userId = request.userId
        const { _id , productId} = request.body  
        
        
        if(!_id){
            return response.status(402).json({
                message: "Provide id",
                error: true,
                success: false
            })
        }   

        const deleteCartItem = await CartProductModel.deleteOne({
            _id: _id,
            userId: userId
        })  

        if(!deleteCartItem){
            return response.status(404).json({
                message: "Cart item not found",
                error: true,
                success : false
            })
        }

        return response.status(200).json({
            data: deleteCartItem,
            message: "Cart item deleted successfully",
            error: false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,   
            success : false
        })
    }
}
