import express from "express";
import Project from "../../models/Project";
import { compareId } from "../../utils/utils";
import status from "../../utils/statusStr";

const router = express.Router();

router.get("/", async (req, res) => {
  const { user_id } = req.user;

  const projects = await Project.findAll({ where: { user_id } });

  return res.status(200).json({ data: projects });
});

router.get("/:id", async (req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;
  const project = await Project.findOne({ where: { id } });

  if (project) {
    if (project.showing || compareId(project.user_id, user_id)) {
      return res.status(200).json({ data: project });
    } else {
      return res.status(403).json({ msg: status.UNAUTH });
    }
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

router.post("/", async (req, res) => {
  const { user_id } = req.user;

  const {
    type = null,
    title = null,
    content = null,
    skills = null,
    url = null,
    git_url = null,
    showing = null,
    start_date = null,
    end_date = null
  } = req.body;

  if (!type || !title || !content || !skills)
    return res.json({ msg: "Invalid Data" });

  const project = await Project.create({
    user_id,
    type,
    title,
    content,
    skills,
    url,
    git_url,
    showing,
    start_date,
    end_date
  });

  return res.status(200).json({ data: project });
});

router.patch("/:id", async (req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;
  const project = await Project(findOne({ where: { id } }));
  const values = req.body;

  if (project) {
    if (compareId(project.user_id, user_id)) {
      const updated = await project.update({ ...values });
      return res.status(200).json({ data: updated });
    } else {
      return res.status(403).json({ msg: status.UNAUTH });
    }
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

router.delete("/:id", async (req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;
  const project = await Project.findOne({ where: { id } });

  if (project) {
    if (compareId(project.user_id, user_id)) {
      const deleted = await project.destroy();
      return res.status(200).json({ data: deleted });
    } else {
      return res.status(403).json({ msg: status.UNAUTH });
    }
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

export default router;
