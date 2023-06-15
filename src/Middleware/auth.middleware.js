import { verifyToken } from "../services/generateAndVerifyToken.js";
import userModel from "../../DB/model/User.model.js";

export const auth = async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization?.startsWith(process.env.BEARERKEY)) {
        return res.json({ message: "invalid bearer key" });
    }
    const token = authorization.split(process.env.BEARERKEY)[1];
    if (!token) {
        return res.json({ message: "invalid token" });
    }

    const decoded = verifyToken(token);
    const authUser = await userModel.findById(decoded.id).select("userName email");
    if (!authUser) {
        return res.status(401).json({ message: "not register account" });
    }
   
    req.id = decoded.id;
    next();
}