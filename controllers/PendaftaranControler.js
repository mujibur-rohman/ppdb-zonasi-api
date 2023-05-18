import Document from "../models/DocumentModel.js";
import Pendaftaran from "../models/PendaftaranModels.js";
import Users from "../models/UsersModel.js";
import fs from "fs";

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
            "photo",
            "photoWithKord",
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

export const getAllPendaftaranUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await Pendaftaran.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Users,
          attributes: ["fullName", "email"],
        },
        {
          model: Document,
          attributes: [
            "photo",
            "photoWithKord",
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

export const getByIdPendaftaran = async (req, res) => {
  try {
    const { id } = req.params;
    const pendaftaran = await Pendaftaran.findOne({
      where: { id },
      include: [
        {
          model: Users,
          attributes: ["fullName", "email"],
        },
        {
          model: Document,
          attributes: [
            "photo",
            "photoWithKord",
            "raport",
            "ijazah",
            "kartuKeluarga",
            "akte",
            "piagamSertifikat",
          ],
        },
      ],
    });
    if (!pendaftaran)
      return res.status(404).json({ message: "Pendaftaran Not Found" });
    res.json(pendaftaran);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getByUserPendaftaran = async (req, res) => {
  try {
    const { userId, registerPeriodId } = req.params;
    const pendaftaran = await Pendaftaran.findOne({
      where: {
        userId,
        registerPeriodId,
      },
      include: [
        {
          model: Users,
          attributes: ["fullName", "email"],
        },
        {
          model: Document,
          attributes: [
            "photo",
            "photoWithKord",
            "raport",
            "ijazah",
            "kartuKeluarga",
            "akte",
            "piagamSertifikat",
          ],
        },
      ],
    });
    if (!pendaftaran)
      return res.status(404).json({ message: "Pendaftaran Not Found" });
    res.json(pendaftaran);
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
    const { id } = req.params;
    const pendaftaran = await Pendaftaran.findOne({
      where: {
        id,
      },
    });
    if (!pendaftaran)
      return res.status(404).json({ message: "Pendaftaran tidak ditemukan" });
    // Buat pendaftaran
    await Pendaftaran.update(
      { ...req.body },
      {
        where: {
          id: pendaftaran.id,
        },
      }
    );
    res.status(200).json({ message: "Pendaftaran berhasil diubah" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePendaftaran = async (req, res) => {
  const { id } = req.params;
  try {
    const pendaftaran = await Pendaftaran.findOne({
      where: {
        id,
      },
    });
    if (!pendaftaran)
      return res.status(404).json({ message: "Pendaftaran tidak ditemukan" });
    const document = await Document.findOne({
      where: { pendaftaranId: pendaftaran.id },
    });
    if (document) {
      const docs = {
        photo: document.photo,
        photoWithKord: document.photoWithKord,
        ijazah: document.ijazah,
        akte: document.akte,
        kartuKeluarga: document.kartuKeluarga,
        raport: document.raport,
        piagamSertifikat: document.piagamSertifikat,
      };
      for (const props in docs) {
        // hapus file lama
        const splitFileNameOld = docs[props].split("/");
        const fileNameOld = splitFileNameOld[splitFileNameOld.length - 1];
        const oldExt = fileNameOld.split(".");
        let filepath;
        if (oldExt[1] === "pdf") {
          filepath = `./public/docs/${fileNameOld}`;
        } else {
          filepath = `./public/images/${fileNameOld}`;
        }
        fs.unlinkSync(filepath);
      }
    }
    await Pendaftaran.destroy({ where: { id: pendaftaran.id } });
    res.status(200).json("Pendaftaran Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
