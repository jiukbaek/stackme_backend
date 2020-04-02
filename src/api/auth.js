import express from "express";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import status from "../../utils/statusStr";

const Router = express.Router();

Router.get("/", (req, res) => {
  res.status(404).json({ msg: status.INVALIDREQ });
});

Router.post("/login", async (req, res) => {
  console.log(req.body);
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

export default Router;
