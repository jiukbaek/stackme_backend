import express from "express";
import Project from "../../models/Project";
import User from "../../models/User";
import {
  compareId,
  getProjectImages,
  setProjectImage,
  makeThumnail,
  replaceProjectImages,
  genPagination,
} from "../../utils/utils";
import passport from "../../utils/passport";
import status from "../../utils/statusStr";
import Sequelize, { Op } from "sequelize";
import cors from "cors";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { user_id } = req.user;
    const {
      page = 1,
      perPage = 10,
      q = "",
      skills = "",
      showing = false,
    } = req.query;

    const where = {};

    if (skills) {
      const skillsArr = skills.split(",");
      const skillsOption = [];

      for (let i = 0; i < skillsArr.length; i++) {
        skillsOption.push(
          Sequelize.where(
            Sequelize.fn("find_in_set", skillsArr[i], Sequelize.col("skills")),
            ">",
            0
          )
        );
      }
      where[Op.or] = skillsOption;
    }

    if (q) {
      where["title"] = { [Op.like]: `%${q}%` };
    }

    if (!showing) where["user_id"] = user_id;
    else where["showing"] = "Y";

    const projects = await Project.findAll({
      where,
      include: [{ model: User, attributes: ["name"] }],
      order: [["createdAt", "DESC"]],
    });

    const pagenation = genPagination(page, perPage, projects.length);

    if (projects.length < 1)
      return res.status(404).json({ msg: status.NODATA });

    return res.status(200).json({
      data: projects.slice(pagenation.startRowNum - 1, pagenation.endRowNum),
      pagenation,
    });
  }
);

router.get("/random", async (req, res) => {
  const { number = 10 } = req.query;
  const projects = await Project.findAll({
    where: {
      showing: "Y",
    },
    order: [[Sequelize.fn("RAND")]],
    limit: parseInt(number),
  });

  if (projects) {
    return res.status(200).json({ data: projects });
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    const project = await Project.findOne({
      where: { id },
      include: [{ model: User, attributes: ["name"] }],
    });

    if (project) {
      if (project.showing === "Y" || compareId(project.user_id, user_id)) {
        return res.status(200).json({ data: project });
      } else {
        return res.status(403).json({ msg: status.UNAUTH });
      }
    } else {
      return res.status(404).json({ msg: status.NODATA });
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
      end_date = null,
    } = req.body;

    if (!type || !title || !content || !skills)
      return res.json({ msg: "Invalid Data" });

    const images = getProjectImages(content);
    const replacedContent = replaceProjectImages(content);
    const setImages = setProjectImage(images);

    const project = await Project.create({
      user_id,
      type,
      title,
      content: replacedContent,
      skills,
      url,
      git_url,
      showing,
      start_date,
      end_date,
    });

    const thumnail = makeThumnail(setImages, project.id);
    await project.update({ thumnail });
    return res.status(200).json({ data: project });
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    const project = await Project.findOne({ where: { id } });
    const values = req.body;

    if (project) {
      if (compareId(project.user_id, user_id)) {
        //content 내용이 바뀔 시
        if (project.content !== values.content) {
          const images = getProjectImages(values.content);
          const replacedContent = replaceProjectImages(values.content);
          values.content = replacedContent;
          setProjectImage(images);
        }
        const updated = await project.update({ ...values });
        return res.status(200).json({ data: updated });
      } else {
        return res.status(403).json({ msg: status.UNAUTH });
      }
    } else {
      return res.status(404).json({ msg: status.NODATA });
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

export default router;
