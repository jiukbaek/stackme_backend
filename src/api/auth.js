import express from "express";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import status from "../../utils/statusStr";
import Verify from "../../models/Verify";
import { generatorSecret, sendSecretMail } from "../../utils/utils";

const Router = express.Router();

Router.get("/", (req, res) => {
  res.status(404).json({ msg: status.INVALIDREQ });
});

Router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) {
    if (user.validPassword(password)) {
      const token = jwt.sign(
        { user_id: user.id, user_name: user.name, user_email: user.email },
        process.env.SECRET || "secret"
      );
      return res.status(200).json({ token, user });
    } else {
      return res.status(401).json({ msg: status.UNAUTH });
    }
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

Router.post("/signup", async (req, res) => {
  const { email = null, password = null, name = null, birth = null } = req.body;
  if (!email || !password || !name || !birth)
    return res.json({ msg: status.INVALIDREQ });

  const user = await User.create({ email, password, name, birth });

  return res.status(200).json({ data: user });
});

Router.post("/verify/check", async (req, res) => {
  const { email, code } = req.body;

  const verifyTarget = await Verify.findOne({ where: { email } });

  if (!verifyTarget) return res.status(404).json({ msg: status.INVALIDREQ });

  if (verifyTarget.code === code)
    return res.status(200).json({ msg: "SUCCESS" });
  else return res.status(401).json({ msg: "FAIL" });
});

Router.post("/verify", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) return res.status(409).json({ msg: status.ALREADYDATA });

  const secretKey = generatorSecret();

  const verify = await Verify.findOne({ where: { email } });
  if (verify) {
    verify.update({ code: secretKey }, { email });
  } else {
    Verify.create({ email, code: secretKey });
  }
  sendSecretMail(email, secretKey);
  return res.status(200).json({ msg: "SUCCESS" });
});

export default Router;
