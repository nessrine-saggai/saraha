import userModel from "../../../../DB/model/User.model.js";
import { generateToken, verifyToken } from "../../../services/generateAndVerifyToken.js";
import { hash, compare } from "../../../services/hashAndCompare.js";
import { sendEmail } from "../../../services/sendEmails.js";
import { loginSchema, signupSchema } from "../Auth.validation.js";

export const signup = async (req, res) => {  
  
    const { userName, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "email already exists" });
    }
  const hashPassword = hash(password);

  const token = generateToken({email},process.env.EMAIL_TOKEN)
  const link = `http://localhost:3000/auth/confirmEmail/${token}`
  await sendEmail(email,'confirm email',`<a href='${link} '>verify your email</a>`);
    const createUser = await userModel.create({userName,email,password: hashPassword,});
    return res.status(202).json({ message: "Done", user: createUser._id });
};
 
export const confirmEmail =async (req, res) => {
  const { token } = req.params;
  const decoded = verifyToken(token, process.env.EMAIL_TOKEN)
  const user = await userModel.updateOne({ email: decoded.email }, { confirmEmail: true })
  return res.json({message:"your email is confirm, you can login"})

  return res.json(decoded)
}
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "email not exists" });
  } else {

    if (!user.confirmEmail) {
      return res.json({message:"plz verify your email"})
    }

    const match = compare(password, user.password);
    if (!match) {
      return res.status(200).json({ message: "invalid password" });
    } else {
      const token = generateToken({id:user.id})
      return res.json({ message: "Done", token });
    }
  }  
};
