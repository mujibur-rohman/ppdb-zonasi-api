import Document from "../models/DocumentModel.js";
import Pendaftaran from "../models/PendaftaranModels.js";
import Users from "../models/UsersModel.js";

export const getAllPendaftaran = async (req, res) => {
  try {
    const response = await Pendaftaran.findAll({
      include: [
        {
          model: Users,
          attributes: ["fullName", "email"],
        },
        {
          model: Document,
          attributes: [
            "raport",
            "ijazah",
            "kartuKeluarga",
            "akte",
            "piagamSertifikat",
          ],
        },
      ],
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPendaftaran = async (req, res) => {
  try {
    const foundAvailable = await Pendaftaran.findOne({
      where: {
        registerPeriodId: req.body.registerPeriodId,
        userId: req.body.userId,
      },
    });
    if (foundAvailable)
      return res
        .status(406)
        .json({ message: "Anda sudah mendaftar di periode tersebut" });
    // Buat pendaftaran
    await Pendaftaran.create({ ...req.body });
    res.status(200).json({ message: "Pendaftaran anda diterima" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePendaftaran = async (req, res) => {
  try {
    const pendaftaran = await Pendaftaran.findOne({
      where: {
        registerPeriodId: req.body.registerPeriodId,
        userId: req.body.userId,
      },
    });
    if (!pendaftaran)
      return res.status(404).json({ message: "Pendaftaran tidak ditemukan" });
    // Buat pendaftaran
    await Pendaftaran.update(
      { ...req.body },
      {
        where: {
          registerPeriodId: req.body.registerPeriodId,
          userId: req.body.userId,
        },
      }
    );
    res.status(200).json({ message: "Pendaftaran berhasil diubah" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
