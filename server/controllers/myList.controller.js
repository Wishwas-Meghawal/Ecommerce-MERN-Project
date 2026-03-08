import MyListModel from "../models/myList.model.js";


// add item to my list
export const addMyListItemController = async (request,response)=>{
    try {
        const userId = request.userId // from auth middleware
        const { productId, productTitle, image, rating, price, oldPrice, brand, discount } = request.body  
        
        
        if(!productId || !productTitle || !image || !rating || !price || !oldPrice || !brand || !discount){
            return response.status(402).json({
                message: "Provide all required fields",
                error: true,
                success:"false"
            })
        }

        const item = await MyListModel.findOne({
            userId: userId,
            productId : productId
        })
        if(item){
            return response.status(400).json({
                message: "Item already in My List"
            })
        }
        const myListItem = new MyListModel({
            userId: userId,
            productId: productId,
            productTitle: productTitle,
            image: image,
            rating: rating,
            price: price,
            oldPrice: oldPrice,
            brand: brand,
            discount: discount
        })  
        const save = await myListItem.save();


        return response.status(200).json({
            data: save,
            message: "Item added to My List successfully",
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


// delete item from my list
export const deleteMyListItemController = async (request,response)=>{
    try {
        const myListItem = await MyListModel.findById(request.params.id)
        
        if(!myListItem){
            return response.status(404).json({
                message: "Item not found in My List",
                error: true,
                success: false
            })
        }

        const deletedItem = await MyListModel.findByIdAndDelete(request.params.id);

        if(!deletedItem){
            return response.status(404).json({
                message: "The Item not deleted from My List",
                error: true,
                success: false
            })
        }

        return response.status(200).json({
            message: "Item deleted from My List successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,   
            error : true,
            success : false
        })
    }  
    
}


// get all my list items for a user
export const getMyListItemsController = async (request,response)=>{
    try {
        const userId = request.userId; // from auth middleware
        const myListItems = await MyListModel.find(
            { userId: userId }
        );

        return response.status(200).json({  
            data: myListItems,
            message: "My List items fetched successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,       
            error : true,
            success : false
        })
    }
}