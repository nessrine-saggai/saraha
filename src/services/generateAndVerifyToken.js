import jwt from "jsonwebtoken";

export const generateToken = (
  payload,
  signature = process.env.TOKEN_SIGNATUR,
  expiresIn = "7d"
) => {
  const token = jwt.sign(payload, signature, { expiresIn });
  return token;
};

export const verifyToken = (token, signature = process.env.TOKEN_SIGNATUR) => {
  const decoded = jwt.verify(token, signature);

  return decoded;
};
