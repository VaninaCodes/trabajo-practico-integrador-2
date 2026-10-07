import { Router } from "express";
import {
    addTagToArticle,
    removeTagFromArticle,
} from "../controllers/article_tag.controller.js";

import {validate} from "../middlewares/validate.js";
import {
  createArticleTagValidation,
  articleTagIdValidation,
} from "../middlewares/validations/article_tag.validation.js";

export const articleTagRouter = Router();

articleTagRouter.post("/articles-tags", createArticleTagValidation, validate, addTagToArticle);
articleTagRouter.delete("/articles-tags/:articleTagId",articleTagIdValidation, validate, removeTagFromArticle);