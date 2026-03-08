import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { addMyListItemController, deleteMyListItemController, getMyListItemsController } from '../controllers/myList.controller.js';


const myListRouter = Router();

myListRouter.post('/add',auth,addMyListItemController);
myListRouter.get('/',auth,getMyListItemsController);
myListRouter.delete('/:id',auth,deleteMyListItemController);



export default myListRouter;