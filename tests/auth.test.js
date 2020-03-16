import request from "supertest";
import server from "../server";
import * as DB from "../models/index";
import User from "../models/User";

let sequelize;

beforeAll(async () => {
  sequelize = await DB.init();
  await sequelize.authenticate();
  await sequelize.sync({
    force: true
  });
  await User.create(
    {
      id: null,
      email: "jiuk205@naver.com",
      password: "test1234",
      name: "백지욱",
      birth: "1994-02-05",
      api_key: ""
    },
    {}
  );
  await User.create(
    {
      id: null,
      email: "jiuk2051@naver.com",
      password: "test11234",
      name: "백지욱1",
      birth: "1994-02-051",
      api_key: ""
    },
    {}
  );
});

afterAll(async () => {
  sequelize.close();
});

describe("Test /auth", () => {
  it("login success", done => {
    request(server)
      .post("/api/auth/login")
      .send({ email: "jiuk205@naver.com", password: "test1234" })
      .then(res => {
        console.log(JSON.parse(res.text));
      });
  });
  it("login false password", done => {
    request(server)
      .post("/api/auth/login")
      .send({ email: "jiuk205@naver.com", password: "test12345" })
      .then(res => {
        console.log(JSON.parse(res.text));
      });
  });
});
