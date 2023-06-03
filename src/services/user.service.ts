import { db } from "../utils/db.server";
import { encryptPassword } from "../utils/encryption";
import exclude from "../utils/utils";

const createUser = async (
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone_number: string
) => {
  try {
    if (await getUserByEmail(email)) {
      throw "Email already taken";
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
    return exclude(user, ["password"]);
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id: number, user: any) => {
  try {
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserById = async (id: number) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const users = await db.user.findMany();
    return users;
  } catch (error) {
    throw error;
  }
};

export default {
  createUser,
  getUserByEmail,
  updateUser,
  getUserById,
  getAllUsers,
};
