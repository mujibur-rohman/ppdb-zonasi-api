import { Op } from "sequelize";
import Pendaftaran from "../models/PendaftaranModels.js";

export const getAllqualification = async (req, res) => {
  try {
    const jurusanId = req.query.jurusanId || "";
    const qualification = await Pendaftaran.findAll({
      where: {
        jurusanId: {
          [Op.like]: "%" + jurusanId + "%",
        },
      },
    });

    res.status(200).json(qualification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
