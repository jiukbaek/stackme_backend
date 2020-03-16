import express from "express";
import Project from "../../models/Project";

const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Project.findAll();

  return res.json({ data: projects });
});

router.post("/", async (req, res) => {
  const userId = req.user.id;
});

export default router;
