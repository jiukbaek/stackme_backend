import { Model, Datatypes, DataTypes } from "sequelize";

export default class Career extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        user_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        },
        join_date: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        end_date: {
          type: DataTypes.DATEONLY,
          allowNull: true
        },
        company: {
          type: DataTypes.STRING(500),
          allowNull: false
        },
        duty: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      },
      {
        sequelize,
        charset: "utf8"
      }
    );
  }
}
