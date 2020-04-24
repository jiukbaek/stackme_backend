import { Model, DataTypes } from "sequelize";

export default class Project extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        thumnail: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        skills: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        url: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        git_url: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        showing: {
          type: DataTypes.STRING(2),
          allowNull: false,
        },
        start_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        end_date: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
      },
      {
        sequelize,
      }
    );
  }
}
