import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGODB_URI;
mongoose.connect( uri );

let db = mongoose.connection;

export default db;