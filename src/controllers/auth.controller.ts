import { Request, Response, NextFunction } from 'express-serve-static-core';
import UserServices from '../services/user.service';
import TokenServices from '../services/token.service';
import exclude from '../utils/utils';
import httpStatus from 'http-status';

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, first_name, last_name, phone_number } = req.body;
        const user = await UserServices.createUser(email, password, first_name, last_name, phone_number);
        const userWithoutPassword = exclude(user, ['createdAt', 'updatedAt']);
        const token = await TokenServices.generateAuthToken(userWithoutPassword);
        res.status(httpStatus.CREATED).send({ user: userWithoutPassword, token });
    } catch (error) {
        if (error == 'Email already taken') {
            res.status(httpStatus.BAD_REQUEST).send({ message: error });
        }
        else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error });
        }
    }
}

export default {
    register,
}