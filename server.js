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
  destination: function(req, file, cb) {
    cb(null, "public/imageTemp");
  },
  filename: function(req, file, cb) {
    const { user } = req.query;
    cb(null, `${user}_${Date.now()}_${file.originalname}`);
  }
});
const uploader = multer({ storage: _storage });

const server = express();

server.use(express.json());
setRouter(server);
server.use("/public", express.static(path.join(__dirname, "public")));
server.post("/uploads/images", uploader.single("upload"), (req, res) => {
  return res.json({
    uploaded: 1,
    fileName: req.file.filename,
    url: req.file.path
  });
});

const port = 3000;

if (process.env.NODE_ENV !== "test") {
  const sequelize = DB.init();
  // try {
  //   (async () => {
  //     await sequelize.authenticate();
  //     await sequelize.sync({
  //       force: true
  //     });
  //     const user = await User.create({
  //       id: null,
  //       email: "jiuk205@naver.com",
  //       password: "test1234",
  //       name: "백지욱",
  //       birth: "1994-02-05",
  //       api_key: "",
  //       auth: 1
  //     });

  //     await Skill.create({ id: null, skill: "Javascript" });
  //     await Skill.create({ id: null, skill: "jQuery" });
  //     await Skill.create({ id: null, skill: "React" });
  //     await Skill.create({ id: null, skill: "Vue" });
  //     await Skill.create({ id: null, skill: "Angular" });
  //     await Skill.create({ id: null, skill: "Mysql" });
  //     await Skill.create({ id: null, skill: "Mongo" });
  //     await Skill.create({ id: null, skill: "AWS EC2" });

  //     await Career.create({
  //       id: null,
  //       user_id: 1,
  //       company: "꿈의 직장",
  //       join_date: "2019-01-01",
  //       duty: "웹 개발자"
  //     });

  //     await Project.create({
  //       user_id: "1",
  //       type: "2",
  //       title: "testTitle1",
  //       content: "test",
  //       skills: "5,1,2",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "N",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle2",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "2.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle3",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "3.jpg",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle4",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "4.jpg",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle5",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });

  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //     await Project.create({
  //       user_id: "1",
  //       type: "1",
  //       title: "testTitle6",
  //       content: "test",
  //       skills: "1,3,5",
  //       url: "url.com",
  //       github: "github",
  //       thumnail: "api.png",
  //       showing: "Y",
  //       start_date: "2010-12-01"
  //     });
  //   })();
  // } catch (e) {
  //   console.log(e);
  // }

  server.get("/", (req, res) => res.send("Hello World!"));

  server.listen(port, () => console.log(`Start server. Port : ${port}`));
}

export default server;
