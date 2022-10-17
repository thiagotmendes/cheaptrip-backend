import express from "express"
import db from "./config/dbConnect.js";
import routes from "./routes/index.js"

db.on("error", console.log.bind(console, 'Erro de conexão: '))
db.once("open", () => {
	console.log("Conexão com o banco realizada com sucesso.")
})
/**
 * Start to use express and routes
 */
const app = express();

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use( express.json() )
routes(app);

export default app
