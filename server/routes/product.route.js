import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { createProduct, createProductRAMS, createProductSIZE, createProductWEIGHT, deleteMultipleProduct, deleteProduct, deleteProductRAMS, deleteProductSIZE, deleteProductWEIGHT, filters, getAllFeaturedProducts, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdLavelCatId, getAllProductsByThirdLavelCatName, getProduct, getProductRAMS, getProductRAMSById, getProductsCount, getProductSIZE, getProductSIZEById, getProductWEIGHT, getProductWEIGHTById, removeImageFromCloudinary, updateProduct, updateProductRAMS, updateProductSIZE, updateProductWEIGHT, uploadImages } from '../controllers/product.controller.js';


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
productRouter.delete('/deleteMultiple',auth,deleteMultipleProduct);
productRouter.delete('/:id',deleteProduct);
productRouter.get('/:id',getProduct);
productRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
productRouter.put("/updateProduct/:id", auth, updateProduct);

//Product Rams Route
productRouter.post("/productRAMS/create", auth, createProductRAMS);
productRouter.delete('/productRAMS/:id',deleteProductRAMS);
productRouter.put("/productRAMS/:id", auth, updateProductRAMS);
productRouter.get("/productRAMS/get" ,getProductRAMS);
productRouter.get("/productRAMS/:id" ,getProductRAMSById);

//Product Size Route
productRouter.post("/productSIZE/create", auth, createProductSIZE);
productRouter.delete('/productSIZE/:id',deleteProductSIZE);
productRouter.put("/productSIZE/:id", auth, updateProductSIZE);
productRouter.get("/productSIZE/get" ,getProductSIZE);
productRouter.get("/productSIZE/:id" ,getProductSIZEById);

//Product Weigth Route
productRouter.post("/productWEIGHT/create", auth, createProductWEIGHT);
productRouter.delete('/productWEIGHT/:id',deleteProductWEIGHT);
productRouter.put("/productWEIGHT/:id", auth, updateProductWEIGHT);
productRouter.get("/productWEIGHT/get" ,getProductWEIGHT);
productRouter.get("/productWEIGHT/:id" ,getProductWEIGHTById);


productRouter.post("/filters" ,filters);



export default productRouter;