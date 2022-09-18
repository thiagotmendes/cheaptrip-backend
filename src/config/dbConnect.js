import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
mongoose.connect( uri );

let db = mongoose.connection;

export default db;