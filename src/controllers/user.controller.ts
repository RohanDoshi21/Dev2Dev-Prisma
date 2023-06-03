import { Request, Response } from "express";
import userService from "../services/user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({ data: { users } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);

    res.status(200).json({ data: { user } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default {
  getAllUsers,
  getUserById,
};
