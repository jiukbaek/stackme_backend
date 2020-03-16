import { Model, DataTypes } from "sequelize";

export default class Project extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        },
        type: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        skills: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        url: {
          type: DataTypes.STRING(100),
          allowNull: true
        },
        github: {
          type: DataTypes.STRING(100),
          allowNull: true
        }
      },
      {
        sequelize,
        charset: "utf8"
      }
    );
  }
}
