import httpStatus from "http-status";
import ApiError from "../utils/ApiErrors";
import { db } from "../utils/db.server";
import { encryptPassword } from "../utils/encryption";
import exclude from "../utils/utils";

const createUser = async (email: string, password: string, first_name: string, last_name: string, phone_number: string) => {
    try {
        if (await getUserByEmail(email)) {
            throw 'Email already taken';
        }
        const user = await db.user.create({
            data: {
                email,
                password: await encryptPassword(password),
                first_name,
                last_name,
                phone_number,
            },
        });
        return exclude(user, ['password']);
    }
    catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
    catch (error) {
        throw error;
    }
}

export default {
    createUser,
}