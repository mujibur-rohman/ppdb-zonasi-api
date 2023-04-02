import Jurusan from "../models/JurusanModels.js";
import Kuota from "../models/KuotaModel.js";
import RegisterPeriod from "../models/RegisterPeriodeModel.js";

export const createRegisterPeriode = async (req, res) => {
  try {
    const { tahunAjaran, startDate, kuota, endDate } = req.body;
    // buat register periode
    const registerPer = await RegisterPeriod.create({
      userId: req.id,
      tahunAjaran,
      startDate,
      endDate,
    });

    // looping jurusan
    kuota.forEach(async (item) => {
      await Kuota.create({
        registerPeriodId: registerPer.id,
        jurusanId: item.jurusan,
        kuota: item.kuota,
      });
    });
    res.status(200).json({ message: "Register Periode Create Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRegisterPeriode = async (req, res) => {
  try {
    const registerPeriod = await RegisterPeriod.findAll({
      attributes: ["id", "tahunAjaran", "startDate", "endDate"],
      include: [
        {
          model: Kuota,
          attributes: ["id", "kuota"],
          include: {
            model: Jurusan,
            attributes: ["id", "name"],
          },
        },
      ],
    });
    let response = [];
    registerPeriod.forEach((items) => {
      response.push({
        registerPeriode: items,
      });
    });
    res.status(200).json(registerPeriod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
