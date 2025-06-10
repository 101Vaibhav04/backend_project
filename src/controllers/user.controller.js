import { asyncHandler } from "../utils/asyncHandler.js";   


import {ApiError} from "../utils/ApiError.js"; // Import ApiError for error handling

import { User } from "../models/user.model.js"; // Import User model for database operations

import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
 //get user details from frontend
 // validations like not empty
 //check if user already exixts: username, email
//check for images , check foravatar
//upload on cloudinary, avatar
// create user object - create enry in db
// remove password and refresh token field from response
// check for user creation
//return response   


const {fullname, email, username, password}=  req.body

if( 
  [fullname, email, username, password].some(field => field?.trim() === '')
) {
    throw new ApiError(400, "All fields are required")
}

// Check if user already exists
const existedUser =  await User.findOne({
  $or: [{username},    {email}]
})

if(existedUser) {
  throw new ApiError(400, "User already exists with this username or email")
}

const avatarLocalPath= req.files?. avatar[0]?.path;
const coverImageLocalPath= req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
  throw new ApiError(400, "Avatar image is required");
}

// Upload images to Cloudinary

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath);
if(!avatar){
  throw new ApiError(500, "Failed to upload avatar image");
} 

const user = await User.create({
  fullname,
  email,
  username: username.toLowerCase(), // Store username in lowercase for consistency
  password,
  avatar: avatar.url, // Store the URL of the uploaded image
  coverImage: coverImage?.url || "", // Store the URL of the uploaded image
})

 const createdUser  = await User.findById(user._id).select("-password -refreshToken"); // Exclude password and refreshToken from the response

 if(!createdUser) {
  throw new ApiError(500, "User creation failed")
 }

 return res.status(201).json(
  new ApiResponse(201,createdUser, "User created successfully")
 );


})


export { registerUser };