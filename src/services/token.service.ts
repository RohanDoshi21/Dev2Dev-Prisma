import jwt, { Secret } from "jsonwebtoken";

const generateAuthToken = async function (user: any) {
  const payload = {
    user: user,
  };

  const secretKey: Secret = process.env.JWT_SECRET!;

  const token = jwt.sign(payload, secretKey);

  return token;
};

export default {
  generateAuthToken,
};
