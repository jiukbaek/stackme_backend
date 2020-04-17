import express from "express";
import passport from "../../utils/passport";
import User from "../../models/User";
import { compareId } from "../../utils/utils";
import status from "../../utils/statusStr";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(404).json({ msg: status.INVALIDREQ });
});

//특정 사용자 정보
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (user) {
      if (compareId(id, user_id))
        return res.status(200).json({
          data: {
            id: user.id,
            email: user.email,
            name: user.name,
            birth: user.birth,
            api_key: user.api_key,
            auth: user.auth,
            git_url: user.git_url,
          },
        });
      else return res.status(401).json({ msg: status.UNAUTH });
    } else {
      return res.status(404).json({ msg: status.NODATA });
    }
  }
);

router.post("/", async (req, res) => {
  const {
    email = null,
    password = null,
    name = null,
    birth = null,
    auth = 1,
  } = req.body;
  if (!email || !password || !name || !birth)
    return res.json({ msg: status.INVALIDREQ });

  const checkUser = await User.findOne({
    where: {
      email,
    },
  });

  if (checkUser) return res.status(409).json({ msg: "already user" });

  const user = await User.create({ email, password, name, birth, auth });

  return res.status(200).json({ data: user });
});

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    const values = req.body;

    if (user) {
      if (compareId(user.id, user_id)) {
        const updated = await user.update({ ...values });
        return res.status(200).json({
          data: {
            id: updated.id,
            email: updated.email,
            name: updated.name,
            birth: updated.birth,
            api_key: updated.api_key,
            auth: updated.auth,
            git_url: updated.git_url,
          },
        });
        //return res.status(200).json({ data: updated });
      } else {
        return res.status(401).json({ data: status.UNAUTH });
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
  }
);

export default router;
