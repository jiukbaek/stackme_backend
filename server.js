import express from "express";
import * as DB from "./models/index";
import path from "path";
import multer from "multer";

import { setRouter } from "./src/";

import User from "./models/User";
import Skill from "./models/Skill";
import Project from "./models/Project";
import Career from "./models/Career";

const _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imageTemp");
  },
  filename: function (req, file, cb) {
    const { user } = req.query;
    cb(null, `${user}_${Date.now()}_${file.originalname}`);
  },
});
const uploader = multer({ storage: _storage });

const server = express();

server.use(express.json());
setRouter(server);
server.use(express.static(path.join(__dirname, "dist")));
server.use("/public", express.static(path.join(__dirname, "public")));
server.use("/config", express.static(path.join(__dirname, "config")));
server.use("/static", express.static(path.join(__dirname, "static")));
server.post("/uploads/images", uploader.single("upload"), (req, res) => {
  return res.json({
    uploaded: 1,
    fileName: req.file.filename,
    url: `/${req.file.path}`,
  });
});

const port = 80;

if (process.env.NODE_ENV !== "test") {
  const sequelize = DB.init();
  try {
    (async () => {
      await sequelize.authenticate();
      await sequelize.sync({
        force: false,
      });
    })();
  } catch (e) {
    console.log(e);
  }

  server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });

  server.listen(port, () => console.log(`Start server. Port : ${port}`));
}

export default server;
