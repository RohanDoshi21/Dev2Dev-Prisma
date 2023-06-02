import { Request, Response, NextFunction } from "express-serve-static-core";
import TagService from "../services/tag.service";

const getUniqueTags = async (req: Request, res: Response) => {
  try {
    const tags = await TagService.getTagList();

    res.status(200).json({ data: { tags } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getQuestionsByTag = async (req: Request, res: Response) => {
  try {
    const tag = req.params.tag;
    const questions = await TagService.getQuestionsByTag(tag);

    res.status(200).json({ data: { questions } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default {
  getUniqueTags,
  getQuestionsByTag,
};
