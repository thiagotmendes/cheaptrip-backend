import PackageTrip from "../models/Package.js";
import { convertPtBrToDate, dateDiffInDays } from "../utils/date.js";

class PackageController {
	static getPackages = (req, res) => {
		PackageTrip.find((err, packageTrip) => {
			if(!err) {
				const responseAdapter = packageTrip.map(item => {
					return {
						_id: item._id,
						title: item.title,
						description: item.description,
						destination: item.destination,
						imageAddress: item.imageAddress,
						departureDate: item.departureDate,
						returnDate: item.returnDate,
						participants: item.participants,

						price: item.price,
						idUser: item.idUser,
						nights: dateDiffInDays(item.departureDate, item.returnDate)
					}
				})
				res.status(200).json(responseAdapter.reverse());
			}
		});
	}

	static getPackageById = (req, res) => {
		const packageId = req.params.id;
		PackageTrip.findById( packageId, (err, packageTrip) => {
			if(!err) {
				res.status(200).json(packageTrip)
			} else {
				res.status(400).send({message: "Erro ao tentar encontrar pacote de viagem: " + err})
			}
		})
	}

	static savePackage = (req, res) => {
		const userIdFromCurrentJwtToken = req.user.user_id;
		let packageTrip = new PackageTrip({
			...req.body,
			idUser: userIdFromCurrentJwtToken,
			departureDate: convertPtBrToDate(req.body.departureDate),
			returnDate: convertPtBrToDate(req.body.returnDate)
		})
		packageTrip.save((err) => {
			if(err) {
				res.status(500).send({ message: `${err.message} - falha ao cadastrar um novo pacote`})
			} else {
				res.status(201).send(packageTrip.toJSON())
			}
		});
	}

	static deletePackage = (req, res) => {
		let packageTripId = req.params.id;
		PackageTrip.findByIdAndDelete(packageTripId, (err) => {
			if(!err) {
				res.status(200).send({message: 'Pacote excluido com sucesso!'})
			} else {
				res.status(500).send({ message: err.message })
			}
		});
	}
}

export default PackageController;
