import { Request, Response, NextFunction } from "express-serve-static-core";
import UserServices from "../services/user.service";
import AuthServices from "../services/auth.service";
import TokenServices from "../services/token.service";
import exclude from "../utils/utils";
import httpStatus from "http-status";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, first_name, last_name, phone_number } = req.body;
    const user = await UserServices.createUser(
      email,
      password,
      first_name,
      last_name,
      phone_number
    );
    const userWithoutPassword = exclude(user, [
      "createdAt",
      "updatedAt",
      "dpUrl",
    ]);
    const token = await TokenServices.generateAuthToken(userWithoutPassword);
    res
      .status(httpStatus.CREATED)
      .send({ data: { user: userWithoutPassword, token } });
  } catch (error) {
    if (error == "Email already taken") {
      res.status(httpStatus.BAD_REQUEST).send({ error: error });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
    }
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const [user, token] = await AuthServices.login(email, password);
    res.status(httpStatus.OK).send({ data: { user, token } });
  } catch (error) {
    if (error == "Email not found" || error == "Password incorrect") {
      res.status(httpStatus.BAD_REQUEST).send({ error: error });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
    }
  }
};

const profile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.user;
    res.status(httpStatus.OK).send({ data: user });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
  }
};

export default {
  register,
  login,
  profile,
};
