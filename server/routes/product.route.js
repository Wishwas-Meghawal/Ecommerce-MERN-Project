import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { createProduct, createProductRAMS, deleteMultipleProduct, deleteMultipleProductRAMS, deleteProduct, deleteProductRAMS, getAllFeaturedProducts, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdLavelCatId, getAllProductsByThirdLavelCatName, getProduct, getProductsCount, getPtoductRAMS, getPtoductRAMSById, removeImageFromCloudinary, updateProduct, updateProductRAMS, uploadImages } from '../controllers/product.controller.js';


const productRouter = Router();

productRouter.post('/uploadImages',auth,upload.array("images"),uploadImages);
productRouter.post('/create',auth,createProduct);
productRouter.get('/getAllProducts',getAllProducts);

productRouter.get('/getAllProductsByCatId/:id',getAllProductsByCatId);
productRouter.get('/getAllProductsByCatName',getAllProductsByCatName);

productRouter.get('/getAllProductsBySubCatId/:id',getAllProductsBySubCatId);
productRouter.get('/getAllProductsBySubCatName',getAllProductsBySubCatName);


productRouter.get('/getAllProductsByThirdLavelCatId/:id',getAllProductsByThirdLavelCatId);
productRouter.get('/getAllProductsByThirdLavelCatName',getAllProductsByThirdLavelCatName);


productRouter.get('/getAllProductsByPrice',getAllProductsByPrice);
productRouter.get('/getAllProductsByRating',getAllProductsByRating);
productRouter.get('/getAllProductsCount',getProductsCount);
productRouter.get('/getAllFeaturedProducts',getAllFeaturedProducts);
productRouter.delete('/deleteMultiple',deleteMultipleProduct);
productRouter.delete('/:id',deleteProduct);
productRouter.get('/:id',getProduct);
productRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
productRouter.put("/updateProduct/:id", auth, updateProduct);
productRouter.post("/productRAMS/create", auth, createProductRAMS);
productRouter.delete('/productRAMS/deleteMultipleRams',deleteMultipleProductRAMS);
productRouter.delete('/productRAMS/:id',deleteProductRAMS);
productRouter.put("/productRAMS/:id", auth, updateProductRAMS);
productRouter.get("/productRAMS/get" ,getPtoductRAMS);
productRouter.get("/productRAMS/:id" ,getPtoductRAMSById);



export default productRouter;