import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { addCartItemController, deleteCartItemQuantityController, emptyCartController, getCartItemController, updateCartItemQuantityController } from '../controllers/cart.controller.js';

const cartRouter = Router();

cartRouter.post('/add',auth,addCartItemController);
cartRouter.get('/get',auth,getCartItemController);
cartRouter.put('/update-quantity',auth,updateCartItemQuantityController);
cartRouter.delete('/delete-cart-item/:id',auth,deleteCartItemQuantityController);
cartRouter.delete('/emptyCart/:id',auth,emptyCartController);

export default cartRouter;