import mongoose from "mongoose";

mongoose.connect( "mongodb+srv://thiagotmendes:S0ulhunt3r@cluster0.tzbb4bv.mongodb.net/test" );

let db = mongoose.connection;

export default db;