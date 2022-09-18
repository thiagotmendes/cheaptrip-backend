import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
	id: {type: String},
	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
},
{
	versionKey: false,
});

const users = mongoose.model("users", UsersSchema);
export default users;
