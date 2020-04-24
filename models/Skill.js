import { Model, DataTypes } from "sequelize";

export default class Skill extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        skill: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
      },
      { sequelize, timestamps: false }
    );
  }
}
