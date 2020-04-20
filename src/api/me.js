import express from "express";
import User from "../../models/User";
import Career from "../../models/Career";
import Project from "../../models/Project";
import status from "../../utils/statusStr";

const Router = express.Router();

Router.use("/", async (req, res, next) => {
  const { api_key = null } = req.headers;

  if (!api_key) res.status(400).json({ msg: status.INVALIDREQ });

  const user = await User.findOne({ where: { api_key } });

  if (!user) res.status(400).json({ msg: status.INVALIDREQ });
  else req.user = user;

  next();
});

Router.get("/", (req, res) => {
  return res.status(200).json({ data: req.user });
});

Router.get("/projects", async (req, res) => {
  const { user } = req;
  const { fields = null } = req.query;

  const project = await Project.findAll({
    where: { user_id: user.id },
    attributes: fields ? fields.split(",") : null,
  });

  if (project) res.status(200).json({ data: project });
  else res.status(404).json({ msg: status.NODATA });
});

Router.get("/careers", async (req, res) => {
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
