import request from "supertest";
import server from "../server";
import * as DB from "../models/index";
import User from "../models/User";

let sequelize = null;

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

describe("Test /user", () => {
  it("should return users", done => {
    request(server)
      .get("/api/user")
      .then(res => {
        const result = JSON.parse(res.text);
        expect(result.data).toBe(true);
        done();
      });
  });
  // it("should return user one", done => {
  //   request(server)
  //     .get("/api/user/3")
  //     .then(res => {
  //       const result = JSON.parse(res.text);
  //       expect(result).toBe(true);
  //       done();
  //     });
  // });
  it("put user modify", done => {
    request(server)
      .put("/api/user/1")
      .send({ email: "1234", name: "qwer" })
      .then(res => {
        console.log(JSON.parse(res.text));
      });
  });
});
