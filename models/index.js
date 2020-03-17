import { Sequelize } from "sequelize";
import config from "../config/config.json";
import User from "./User";
import Project from "./Project";
import Career from "./Career";
import Skills from "./Skills";
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
  Career.init(sequelize);
  Skills.init(sequelize);

  User.hasMany(Project, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
  });

  User.hasMany(Career, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
  });

  return sequelize;
};
