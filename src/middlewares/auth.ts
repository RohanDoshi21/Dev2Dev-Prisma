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
      const errorMessage = (error as Error).message;
      res.status(401).send({ error: errorMessage });
  }
};

const verifyModerator = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error("Please authenticate");
        }
        const value = TokenServices.verifyToken(token);
        req.body.user = (value as JwtPayload)["user"];
        if (req.body.user.role != "MODERATOR") {
            throw new Error("You are not a moderator");
        }
        next();
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(401).send({ error: errorMessage });
    }
};

export default {
  verifyUser,
  verifyModerator,
};
