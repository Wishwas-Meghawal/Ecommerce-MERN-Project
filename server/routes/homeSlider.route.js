import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { addHomeSlide, deleteMultipleSlide, deleteSlide, getSlide, getSlides, removeImageFromCloudinary, updateSlide, uploadImages } from '../controllers/homeSlider.controller.js';



const homeSlidesRouter = Router();

homeSlidesRouter.post('/uploadImages',auth,upload.array("images"),uploadImages);
homeSlidesRouter.post('/create',auth,addHomeSlide);
homeSlidesRouter.get('/',getSlides);
homeSlidesRouter.get('/:id',getSlide);
homeSlidesRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
homeSlidesRouter.delete("/deleteMultiple", auth, deleteMultipleSlide);
homeSlidesRouter.delete("/:id", auth, deleteSlide);
homeSlidesRouter.put("/:id", auth, updateSlide);


export default homeSlidesRouter;