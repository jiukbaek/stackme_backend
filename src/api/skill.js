import express from "express";
import { Op } from "sequelize";
import Skill from "../../models/Skill";
import status from "../../utils/statusStr";

const router = express.Router();

router.get("/", async (req, res) => {
  const skills = await Skill.findAll();
  return res.status(200).json({ data: skills });
});

// router.get("/", async (req, res) => {
//   const { word, indexes } = req.query;
//   let skills = [];
//   if (word) {
//     const startedWord = await Skill.findAll({
//       where: { skill: { [Op.like]: word + "%" } }
//     });

//     const includedWord = await Skill.findAll({
//       where: {
//         skill: {
//           [Op.like]: "%" + word + "%",
//           [Op.notLike]: word + "%"
//         }
//       }
//     });

//     skills = [...startedWord, ...includedWord];
//   } else if (indexes) {
//     const indexArr = indexes.split(",");

//     skills = await Skill.findAll({
//       where: {
//         id: { [Op.in]: indexArr }
//       }
//     });
//   } else {
//     return res.status(404).json({ msg: status.INVALIDREQ });
//   }
//   if (skills) {
//     return res.status(200).json({ data: skills });
//   } else {
//     return res.status(404).json({ msg: status.NODATA });
//   }
// });

export default router;
