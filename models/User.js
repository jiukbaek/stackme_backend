import { Model, DataTypes } from "sequelize";
import { makeHash } from "../utils/utils";
import bcrypt from "bcrypt";

export default class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING(50),
          unique: true,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING(500),
          allowNull: false
        },
        name: { type: DataTypes.STRING(50), allowNull: false },
        birth: { type: DataTypes.STRING(20), allowNull: false },
        api_key: { type: DataTypes.STRING(500), allowNull: false }
      },
      {
        sequelize,
        charset: "utf8",
        indexes: [{ fields: ["email"] }],
        hooks: {
          beforeCreate: user => {
            user.password = makeHash(user.password);
          }
        }
      }
    );
  }

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}
