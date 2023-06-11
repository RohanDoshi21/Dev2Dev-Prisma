import UserServices from "../services/user.service";
import TokenServices from "../services/token.service";
import { isPasswordMatch } from "../utils/encryption";
import exclude from "../utils/utils";

const login = async (email: string, password: string) => {
  try {
    const user = await UserServices.getUserByEmail(email);
    if (!user) {
      throw "Email not found";
    }
    const isMatch = await isPasswordMatch(password, user.password);
    if (!isMatch) {
      throw "Password incorrect";
    }
    const userCopy = { ...user };
    exclude(userCopy, ["password"]);

    const userWithoutPassword = exclude(user, [
      "password",
      "createdAt",
      "updatedAt",
      "dpUrl",
    ]);

    const token = await TokenServices.generateAuthToken(userWithoutPassword);
    return [userCopy, token];
  } catch (error) {
    throw error;
  }
};

export default {
  login,
};
