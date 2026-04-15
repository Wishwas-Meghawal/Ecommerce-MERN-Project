import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (request, response) => {
  try {
    const {
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      userId,
      landmark,
      addressType,
    } = request.body;

    // if (
    //   !address_line || city || state || pincode || country || mobile || userId
    // ) {
    //   return response.status(500).json({
    //     message: "Please provide all the fields",
    //     error: true,
    //     success: false,
    //   });
    // }

    const address = new AddressModel({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      userId,
      landmark,
      addressType,
    });
    const saveAddress = await address.save();

    const updatecartUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          address_details: saveAddress?._id,
        },
      },
    );

    return response.status(200).json({
      data: saveAddress,
      error: false,
      success: true,
      message: "Address add successfully",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAddressController = async (request, response) => {
  try {
    const address = await AddressModel.find({ userId: request?.query?.userId });

    if (!address) {
      return response.status({
        error: true,
        success: false,
        message: "address not found",
      });
    } else {
      const updateUser = await UserModel.updateOne(
        { _id: request?.query?.userId },
        {
          $push: {
            address: address?._id,
          },
        },
      );

      return response.status(200).json({
        error: false,
        success: true,
        data: address,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteAddressController = async (request, response) => {
  try {
    const userId = request.userId;
    const _id = request.params.id;

    if (!_id) {
      return response.status(402).json({
        message: "Provide id",
        error: true,
        success: false,
      });
    }

    const deleteAddress = await AddressModel.deleteOne({
      _id: _id,
      userId: userId,
    });

    if (!deleteAddress) {
      return response.status(404).json({
        message: "Address not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      data: deleteAddress,
      message: "Address deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getSingleAddressController = async (request, response) => {
  try {
    const id = request.params.id;

    const address = await AddressModel.findOne({ _id: id });

    if (!address) {
      return response.status(404).json({
        message: "Address Not Found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      address: address
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};


export async function editAddress(request, response) {
  try {
    const id = request.params.id;
     const {
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      userId,
      landmark,
      addressType,
    } = request.body;

    

    const address = await AddressModel.findByIdAndUpdate(
      id,
      {
        address_line: address_line,
        city: city,
        state: state,
        pincode: pincode,
        country: country,
        mobile: mobile,
        landmark: landmark,
        addressType: addressType,
      },
      { new: true },
    );


    return response.json({
      message: "Address Updated successfully",
      error: false,
      success: true,
      address: address,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
