import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Pendaftaran from "./PendaftaranModels.js";

const Document = db.define(
  "document",
  {
    pendaftaranId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    raport: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ijazah: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    akte: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kartuKeluarga: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    piagamSertifikat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Pendaftaran.hasOne(Document);
Document.belongsTo(Pendaftaran, { foreignKey: "pendaftaranId" });

export default Document;
