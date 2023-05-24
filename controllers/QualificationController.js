import { Op } from "sequelize";
import Pendaftaran from "../models/PendaftaranModels.js";
import Users from "../models/UsersModel.js";
import sendAnnounceQualification from "../utils/sendAnnounceQualification.js";

export const getAllqualification = async (req, res) => {
  try {
    const jurusanId = req.query.jurusanId || "";
    const qualification = await Pendaftaran.findAll({
      where: {
        jurusanId: {
          [Op.like]: "%" + jurusanId + "%",
        },
        status: {
          [Op.gt]: 0,
        },
      },
      order: [["jarak", "ASC"]],
    });

    res.status(200).json(qualification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendEmailQualification = async (req, res) => {
  try {
    const qualification = await Pendaftaran.findAll({
      include: [
        {
          model: Users,
          attributes: ["fullName", "email"],
        },
      ],
    });
    qualification.forEach(async (item) => {
      await sendAnnounceQualification(item);
    });
    res.status(200).json("Email Berhasil Dikirim");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
