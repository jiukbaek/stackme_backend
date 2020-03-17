import express from "express";
import * as DB from "./models/index";
import path from "path";
import cors from "cors";
import multer from "multer";
import passport from "./utils/passport";

import userRouter from "./src/api/user";
import authRouter from "./src/api/auth";
import projectRouter from "./src/api/project";
import careerRouter from "./src/api/career";

import User from "./models/User";

const _storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const uploader = multer({ storage: _storage });

const server = express();

server.use(express.json());
server.use("/public", express.static(path.join(__dirname, "public")));
server.use("/api/auth", cors(), authRouter);
server.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  userRouter
);
server.use(
  "/api/project",
  passport.authenticate("jwt", { session: false }),
  projectRouter
);
server.use(
  "/api/career",
  passport.authenticate("jwt", { session: false }),
  careerRouter
);
server.post("/uploads/images", uploader.single("upload"), (req, res) => {
  console.log(req.file);
  return res.json({
    uploaded: 1,
    fileName: req.file.filename,
    url: req.file.path
  });
});

const port = 3000;

if (process.env.NODE_ENV !== "test") {
  const sequelize = DB.init();
  try {
    (async () => {
      await sequelize.authenticate();
      await sequelize.sync({
        force: true
      });
      const user = await User.create(
        {
          id: null,
          email: "jiuk205@naver.com",
          password: "test1234",
          name: "백지욱",
          birth: "1994-02-05",
          api_key: "",
          auth: 1
        },
        {}
      );
    })();
  } catch (e) {
    console.log(e);
  }

  server.get("/", (req, res) => res.send("Hello World!"));

  server.listen(port, () => console.log(`Start server. Port : ${port}`));
}

export default server;
