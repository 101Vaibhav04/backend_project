import { asyncHandler } from "../utils/asyncHandler.js";   


import {ApiError} from "../utils/ApiError.js"; // Import ApiError for error handling

import { User } from "../models/user.model.js"; // Import User model for database operations


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
const existedUser =  User.findOne({
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


})


export { registerUser };