import { Model, DataTypes } from "sequelize";

export default class Skills extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        skill: {
          type: DataTypes.STRING(500),
          allowNull: false
        }
      },
      { sequelize, charset: "utf8" }
    );
  }
}
