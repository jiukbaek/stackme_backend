import express from "express";
import User from "../../models/User";

const router = express.Router();

//사용자 리스트
router.get("/", async (req, res) => {
  const users = await User.findAll();

  return res.json({ data: users });
});

router.post("/", async (req, res) => {
  const { email = "", password = "", name = "", birth = "" } = req.body;
  if (!email || !password || !name || !birth)
    return res.json({ msg: "invalid data" });

  const user = await User.create({ email, password, name, birth });

  return res.status(200).json({ data: user });
});

//특정 사용자 정보
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ where: { id } });
  if (user) return res.json({ data: user });
  else return res.status(404).json({ msg: "No Data" });
});

router.get("/test", (req, res) => {
  return res.status(200).json({ result: true });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (user) {
    const updated = await user.update({ ...req.body });
    return res.json({ data: updated });
  } else {
    return res.json({ msg: "No Data" });
  }
});

export default router;
