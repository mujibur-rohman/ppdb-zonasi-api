import { DataTypes } from "sequelize";
import db from "../config/database.js";
import RegisterPeriod from "./RegisterPeriodeModel.js";
import Jurusan from "./JurusanModels.js";

const Kuota = db.define("kuota", {
  kuota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  registerPeriodId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  jurusanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

RegisterPeriod.hasMany(Kuota);
Kuota.belongsTo(RegisterPeriod, { foreignKey: "registerPeriodId" });
Jurusan.hasMany(Kuota);
Kuota.belongsTo(Jurusan, { foreignKey: "jurusanId" });

export default Kuota;
