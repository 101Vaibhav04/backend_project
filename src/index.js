import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import {app} from './app.js';

import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';    // Added .js extension
import connectDB from './db/index.js';


connectDB()
.then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
  });
  })
.catch((err) => {
  console.log("Error connecting to MongoDB:", err);
}) 