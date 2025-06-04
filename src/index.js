import dotenv from 'dotenv';
dotenv.config({ path: './.env' });


import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';    // Added .js extension
import connectDB from './db/index.js';


connectDB() 