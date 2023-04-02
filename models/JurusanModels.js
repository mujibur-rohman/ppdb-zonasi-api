import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Jurusan = db.define("jurusan", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export default Jurusan;
