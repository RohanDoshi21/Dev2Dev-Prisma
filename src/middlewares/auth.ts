import { Request, Response, NextFunction } from "express-serve-static-core";
import TokenServices from "../services/token.service";
import { JwtPayload } from "jsonwebtoken";

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Please authenticate");
    }
    const value = TokenServices.verifyToken(token);
    req.body.user = (value as JwtPayload)["user"];
    next();
  } catch (error) {
    res.status(401).send({ message: error });
  }
};

export default {
  verifyUser,
};
