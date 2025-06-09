//unique id genrated default in mongoose in beson fromat

import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true   // Index for faster search
  },
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    
  },
    fullname: {
    type: String, 
    required: true,
    trim: true,
    index: true   // Index for faster search
  },
    avatar: {
    type: String,  //cloudinary
    required: true,
  },
  coverImage: {
    type: String //cloudinary

  },
  watchHistory:[{
    type: Schema.Types.ObjectId,
    ref: 'Video' // Reference to Video model
  }],

  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  refreshToken: {
    type: String,
  },

}, {timestamps: true});

userSchema.pre("save",  async function (next) {
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10)
  next()
})// arrow frunction ko this reference nhi pata hota h 


// we can design custom methods for the schema in mongoose

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPRIY
    }
  )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
    {
      _id: this._id,

    },
    process.env.RFERESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPRIY
    }
  )
}

export const User =mongoose.model("User", userSchema);