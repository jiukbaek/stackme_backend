import { Sequelize } from "sequelize";
import config from "../config/config.json";
import User from "./User";
import Project from "./Project";
require("dotenv").config();

export const init = () => {
  const env = process.env.NODE_ENV || "dev";
  const dbConfig = config[env];
  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      dialect: dbConfig.dialect,
      host: dbConfig.host,
      port: dbConfig.port
    }
  );

  User.init(sequelize);
  Project.init(sequelize);

  User.hasMany(Project, {
    foreignKey: "userId"
  });

  return sequelize;
};
