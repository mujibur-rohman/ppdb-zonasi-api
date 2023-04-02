import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Users from "./UsersModel.js";

const RegisterPeriod = db.define("register_period", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tahunAjaran: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Users.hasMany(RegisterPeriod);
RegisterPeriod.belongsTo(Users, { foreignKey: "userId" });

export default RegisterPeriod;
