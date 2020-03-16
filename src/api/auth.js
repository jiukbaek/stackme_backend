import express from "express";
import User from "../../models/User";
import jwt from "jsonwebtoken";

const Router = express.Router();

Router.get("/", (req, res) => {
  res.status(200).json({ result: true });
});

Router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const user = await User.findOne({ where: { email } });
  if (user) {
    if (user.validPassword(password)) {
      const token = jwt.sign(
        { userId: user.id, userEmail: user.email },
        process.env.SECRET || "secret"
      );
      return res.json({ msg: "login", token });
    } else {
      return res.json({ msg: "Invalid Password" });
    }
  } else {
    return res.json({ msg: "No User" });
  }
});

export default Router;
