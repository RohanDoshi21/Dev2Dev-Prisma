import jwt, { Secret } from "jsonwebtoken";

const generateAuthToken = function (user: any) {
  const payload = {
    user: user,
  };

  const secretKey: Secret = process.env.JWT_SECRET!;

  const token = jwt.sign(payload, secretKey);

  return token;
};

const verifyToken = function (token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export default {
  generateAuthToken,
  verifyToken,
};
