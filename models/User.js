import { Model, DataTypes } from "sequelize";
import { makeHash, genApiKey } from "../utils/utils";
import bcrypt from "bcrypt";

export default class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50),
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        name: { type: DataTypes.STRING(50), allowNull: false },
        birth: { type: DataTypes.STRING(20), allowNull: false },
        api_key: { type: DataTypes.STRING(500), allowNull: true },
        auth: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        git_url: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        indexes: [{ fields: ["email"] }],
        hooks: {
          beforeCreate: (user) => {
            user.password = makeHash(user.password);
            user.api_key = genApiKey();
          },
        },
      }
    );
  }

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}
