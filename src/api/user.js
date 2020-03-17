import express from "express";
import User from "../../models/User";
import { compareId } from "../../utils/utils";
import status from "../../utils/statusStr";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(404).json({ msg: status.INVALIDREQ });
});

router.post("/", async (req, res) => {
  const { email = null, password = null, name = null, birth = null } = req.body;
  if (!email || !password || !name || !birth)
    return res.json({ msg: status.INVALIDREQ });

  const user = await User.create({ email, password, name, birth });

  return res.status(200).json({ data: user });
});

//특정 사용자 정보
router.get("/:id", async (req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (user) {
    if (compareId(id, user_id)) return res.status(200).json({ data: user });
    else return res.status(401).json({ msg: status.UNAUTH });
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

router.patch("/:id", async (req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  const values = req.body;

  if (user) {
    if (compareId(user.id, user_id)) {
      const updated = await user.update({ ...values });
      return res.status(200).json({ data: updated });
    } else {
      return res.status(401).json({ data: status.UNAUTH });
    }
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

router.delete("/:id", async (req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (user) {
    if (compareId(user.id, user_id)) {
      const deleted = await user.destroy();
      return res.status(200).json({ data: deleted });
    } else {
      return res.status(401).json({ msg: status.UNAUTH });
    }
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

export default router;
