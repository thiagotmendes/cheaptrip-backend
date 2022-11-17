import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
	id: {type: String},
	title: {type: String},
	destination: {type: String},
	description: {type: String},
	imageAddress: {type: String},
	departureDate: {type: Date},
	returnDate: {type: Date},
	participants: {type: Number},
	price: {type: Number},
	idUser: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}
},
{
	versionKey: false,
})

const Package = mongoose.model("package", PackageSchema);
export default Package;
