import Jurusan from "../models/JurusanModels.js";
import Pendaftaran from "../models/PendaftaranModels.js";

export const getPendaftarStatus = async (req, res) => {
  try {
    const notSelection = await Pendaftaran.count({
      where: {
        status: -2,
      },
    });
    const notUpload = await Pendaftaran.count({
      where: {
        status: -1,
      },
    });
    const notVerification = await Pendaftaran.count({
      where: {
        status: 0,
      },
    });
    const qualify = await Pendaftaran.count({
      where: {
        status: 1,
      },
    });
    const disqualify = await Pendaftaran.count({
      where: {
        status: 2,
      },
    });

    res.status(200).json({
      notSelection,
      notUpload,
      notVerification,
      qualify,
      disqualify,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getPendaftarJurusan = async (req, res) => {
  try {
    const jurusan = await Jurusan.findAll();

    const pendaftar = await Pendaftaran.findAll();

    console.log(pendaftar);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
