import { Model, DataTypes } from "sequelize";

export default class Verify extends Model {
  static init(sequelize) {
    return super.init(
      {
        //이메일 코드 칼럼
        email: {
          type: DataTypes.STRING(50),
          unique: true,
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }
}
