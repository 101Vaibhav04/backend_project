import mongoose from 'mongoose';
import { Schema } from 'mongoose';  

import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'; 

const videoSchema = new Schema({
    videoFile: {
    type: String, // URL to the video file
    required: true
  },
    thumbnail: {
    type: String, // URL to the video thumbnail
    required: true
  },
  title: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,

  },
  duration:{
    type: Number, //cloundinary se info le lena
    required: true
  },
    views: {
    type: Number,
    default: 0
  },
  isPublished:{
    type: Boolean,
    default: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User' // Reference to User model

  }
}, { timestamps: true });


videoSchema.plugin(mongooseAggregatePaginate);


export const Video = mongoose.model('Video', videoSchema);