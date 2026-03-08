import CategoryModel from "../models/category.model.js";

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

//category  image upload
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

//create category
export async function createCategory(request, response) {
  try {
    let category = new CategoryModel({
      name: request.body.name,
      images: imagesArr,
      parentId: request.body.parentId,
      parentCatName: request.body.parentCatName,
    });

    if (!category) {
      return response.status(500).json({
        message: "Category Not Created",
        error: true,
        success: false,
      });
    }

    category = await category.save();
    imagesArr = [];

    return response.status(200).json({
      message: "Category Created",
      error: false,
      success: true,
      category: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get all category
export async function getCategories(request, response) {
  try {
    const categories = await CategoryModel.find();
    const categoryMap = {};

    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat._doc, children: [] };
    });

    const rootCategories = [];

    categories.forEach((cat) => {
      if (cat.parentId) {
        categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });

    return response.status(200).json({
      error: false,
      success: true,
      data: rootCategories,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get  category count

export async function getCategoriesCount(request, response) {
  try {
    const categoryCount = await CategoryModel.countDocuments({
      parentId: undefined,
    });

    if (!categoryCount) {
      return response.status(500).json({
        success: false,
        error:  true
      });
    } else{
      response.send({
        categoryCount: categoryCount,
      })
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


// get  sub category count

export async function getSubCategoriesCount(request, response) {
  try {
    const categories = await CategoryModel.find();

    if (!categories) {
      return response.status(500).json({
        success: false,
        error:  true
      });
    } else{
      const subCatList = [];
      for(let cat of categories){
        if(cat.parentId!== undefined){
          subCatList.push(cat);
        }
      }
      response.send({
        SubCategoryCount: subCatList.lenght,
      })
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}




//get single category

export async function getCategory(request, response) {
  try {
    const category = await CategoryModel.findById(request.params.id);

    if (!category) {
      return response.status(500).json({
        message: "The category with he given ID was not found",
        success: false,
        error:  true
      });
    }
    return response.status(200).json({
      error: false,
      success:true,
      category: category
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


// delete category image

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

export async function deleteCategory(request, response){
  const category = await CategoryModel.findById(request.params.id);
  const images = category.images;

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

  const subCategory = await CategoryModel.find({
    parentId: request.params.id
  });


  for(let i = 0; i < subCategory.length; i++){
    console.log(subCategory[i]._id);

    const thirdsubCategory = await CategoryModel.find({
      parentId: subCategory[i]._id
    }); 
    
    for(let i = 0; i < thirdsubCategory.length; i++){
      const deleteThirdSubCat = await CategoryModel.findByIdAndDelete(thirdsubCategory[i]._id);
    }

    const deleteSubCat = await CategoryModel.findByIdAndDelete(subCategory[i]._id);
  }

  const deleteCat = await CategoryModel.findByIdAndDelete(request.params.id);

  if(!deleteCat){
    response.status(404).json({
      message: "Category Not Found!",
      error: true,
      success: false,
    });
  }

  response.status(200).json({
    success: true,
    error: false,
    message: "Category Deleted!"
  })
}

export async function updateCategory(request, response) {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      request.params.id,
      {
        name:request.body.name,
        images: imagesArr.length> 0 ? imagesArr[0] : request.body.images,
        parentId: request.body.parentId,
        parentCatName: request.body.parentCatame
      },
      { new: true }
    );

    if(!category){
      return response.status(500).json({
        message: "Categoty cannot br updated!",
        success: false,
        error: true
      });
    }

    imagesArr = [];

    response.status(200).json({
      success: true,
      message:"Category Updated Successfully",
      error: false,
      category: category
    })


  } catch (error) {
    response.status(500).json({
      success: false,
      error: true,
      message: "Category Deleted!"
    })
  }
}