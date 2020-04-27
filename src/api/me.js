import express from "express";
import User from "../../models/User";
import Career from "../../models/Career";
import Project from "../../models/Project";
import status from "../../utils/statusStr";
import Skill from "../../models/Skill";
import { getProjectType } from "../../utils/utils";
import { Op } from "sequelize";

const Router = express.Router();

Router.use("/", async (req, res, next) => {
  const { api_key = null } = req.headers;

  if (!api_key) return res.status(400).json({ msg: status.INVALIDREQ });

  const user = await User.findOne({ where: { api_key } });

  if (!user) return res.status(400).json({ msg: status.INVALIDREQ });
  else req.user = user;

  next();
});

Router.get("/project", async (req, res) => {
  const { user } = req;
  const { fields = null } = req.query;

  const result = await Project.findAll({
    where: { user_id: user.id },
    attributes: fields ? fields.split(",") : null,
  });

  if (!result) res.status(404).json({ msg: status.NODATA });

  const projects = result.map((project) => {
    project.type = getProjectType(project.type);
    project.thumnail = `https://stackme.co.kr/static/public/thumnail/${project.thumnail}`;
    return project;
  });

  console.log(projects);
  return res.status(200).json({ data: projects });
});

Router.get("/project/:id", async (req, res) => {
  const { user } = req;
  const { fields = null } = req.query;
  const { id } = req.params;

  const project = await Project.findOne({
    where: { id },
    attributes: fields ? fields.split(",") : null,
  });

  if (!project) res.status(404).json({ msg: status.NODATA });

  if (project.user_id === user.id) {
    const skills = await Skill.findAll({
      where: {
        id: {
          [Op.in]: project.skills.split(","),
        },
      },
      attributes: ["skill"],
    });

    const skillArr = skills.map((skill) => skill.skill);

    project.content = project.content.replace(
      /\/static\/public/gi,
      "https://stackme.co.kr/static/public"
    );

    project.skills = skillArr;

    return res.status(200).json({ data: project });
  } else return res.status(401).json({ data: status.UNAUTH });
});

Router.get("/career", async (req, res) => {
  const { user } = req;
  const { fields = null } = req.query;

  const career = await Career.findAll({
    where: { user_id: user.id },
    attributes: fields ? fields.split(",") : null,
  });

  if (career) res.status(200).json({ data: career });
  else res.status(404).json({ msg: status.NODATA });
});

export default Router;
