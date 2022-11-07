import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

const secret = process.env.TOKEN_KEY;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"] || ' ';
	const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
