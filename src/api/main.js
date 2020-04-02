import express from "express";
import Project from "../../models/Project";
import { compareId } from "../../utils/utils";
import status from "../../utils/statusStr";

const router = express.Router();

router.get("/posts", async (req, res) => {
  const projects = await Project.findAll({ where: { user_id } });

  return res.status(200).json({ data: projects });
});
