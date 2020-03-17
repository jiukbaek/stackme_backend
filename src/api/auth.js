import express from "express";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import status from "../../utils/statusStr";

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
        { user_id: user.id },
        process.env.SECRET || "secret"
      );
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ msg: status.UNAUTH });
    }
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

export default Router;
