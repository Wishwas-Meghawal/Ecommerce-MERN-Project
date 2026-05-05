import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  logoutController,
  removeImageFromCloudinary,
  updateUserDetails,
  userAvatarController,
  verifyEmailController,
  forgotPasswordController,
  verifyForgotPasswordOtp,
  resetPassword,
  refreshToken,
  userDetails,
  authWithGoogleController,
  addReview,
  getReviews,
  getAllReviews,
  getAllUsers,
  deleteMultipleUsers,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const userRouter = Router();
// User Route
userRouter.post("/register", registerUserController);
userRouter.post("/verifyEmail", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.post("/authWithGoogle", authWithGoogleController);
userRouter.get("/logout", auth, logoutController);
userRouter.put(
  "/user-avatar",
  auth,
  upload.array("avatar"),
  userAvatarController
);
userRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
userRouter.put("/:id", auth, updateUserDetails);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/user-details", auth, userDetails);
userRouter.post("/addReview", auth, addReview);
userRouter.get("/getReviews",  getReviews);
userRouter.get("/getAllUsers",  getAllUsers);
userRouter.get("/getAllReviews",  getAllReviews);
userRouter.delete('/deleteMultiple',auth,deleteMultipleUsers);


export default userRouter;
