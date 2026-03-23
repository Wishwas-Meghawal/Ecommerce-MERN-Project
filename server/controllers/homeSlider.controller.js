import HomeSliderModel from "../models/homeSlider.model.js";

import { v2 as cloudinary } from "cloudinary";
import { error, log } from "console";
import fs from "fs";
import categoryRouter from "../routes/category.route.js";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

//Home Slider image upload
var imagesArr = [];
export async function uploadImages(request, response) {
  try {
    imagesArr = [];

    const image = request.files;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image?.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function (error, result) {
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${request.files[i].filename}`);
          console.log(request.files[i].filename);
        }
      );
    }

    return response.status(200).json({
      images: imagesArr,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


//Add Home Slider Banner
export async function addHomeSlide(request, response) {
  try {
    let slide = new HomeSliderModel({
      images: imagesArr,
    });

    if (!slide) {
      return response.status(500).json({
        message: "Slide Not Created",
        error: true,
        success: false,
      });
    }

    slide = await slide.save();
    imagesArr = [];

    return response.status(200).json({
      message: "Slide Created",
      error: false,
      success: true,
      slide: slide,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get all home slide
export async function getSlides(request, response) {
  try {
    const slides = await HomeSliderModel.find();

    if(!slides){
      return response.status(404).json({
        message: "Slides Not Found",
        error: true,
        success: false,
      });
    }
  
    return response.status(200).json({
      error: false,
      success: true,
      data: slides,
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get single slide
export async function getSlide(request, response) {
  try {
    const slide = await HomeSliderModel.findById(request.params.id);

    if (!slide) {
      return response.status(500).json({
        message: "The slide with he given ID was not found",
        success: false,
        error:  true
      });
    }
    return response.status(200).json({
      error: false,
      success:true,
      slide: slide
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// delete slide form cloudinary
export async function removeImageFromCloudinary(request, response) {
  const imageUrl = request.query.img;

  const urlArr = imageUrl.split("/");
  const image = urlArr[urlArr.length - 1];

  const imageName = image.split(".")[0];

  if (imageName) {
    const res = await cloudinary.uploader.destroy(imageName);

    if (res) {
      return response.status(200).json({
        error:true,
        success:false,
        message:"image deleted successfully"
      });
    }
  }
}

// delete category
export async function deleteSlide(request, response){
  const slide = await HomeSliderModel.findById(request.params.id);
  const images = slide.images;

  let img = "";
  for(img of images){
    const imgUrl = img;
    const urlArr = imgUrl.split("/");
     const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if(imageName){
      cloudinary.uploader.destroy(imageName);
    }
  }

  const deleteSlide = await HomeSliderModel.findByIdAndDelete(request.params.id);

  if(!deleteSlide){
    response.status(404).json({
      message: "Slide Not Found!",
      error: true,
      success: false,
    });
  }

  return  response.status(200).json({
    success: true,
    error: false,
    message: "Slide Deleted!"
  })
}

//update slide
export async function updateSlide(request, response) {
    const slide = await HomeSliderModel.findByIdAndUpdate(
      request.params.id,
      {
        images: imagesArr.length> 0 ? imagesArr[0] : request.body.images,
      },
      { new: true }
    );

    if(!slide){
      return response.status(500).json({
        message: "Slide cannot be updated!",
        success: false,
        error: true
      });
    }

    imagesArr = [];

    response.status(200).json({
      success: true,
      message:"Slide Updated Successfully",
      error: false,
      category: category
    })
}

//delete multiple slide
export async function deleteMultipleSlide(request, response) {
  const { ids } = request.body;

  if (!ids || !Array.isArray(ids)) {
    return response.status(400).json({
      message: "Invalid Input",
      error: true,
      success: false,
    });
  }

  for (let i = 0; i < ids?.length; i++) {
    const product = await HomeSliderModel.findById(ids[i]);

    const images = product.images;

    let img = "";
    for (img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];

      const imageName = image.split(".")[0];

      if (imageName) {
        cloudinary.uploader.destroy(imageName);
      }
    }
  }

  try {
    await HomeSliderModel.deleteMany({
      _id: { $in: ids },
    });

    return response.status(200).json({
      message: "Slide deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Error deleting Slide",
      error: true,
      success: false,
    });
  }
}