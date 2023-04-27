import Jurusan from "../models/JurusanModels.js";
import Kuota from "../models/KuotaModel.js";
import RegisterPeriod from "../models/RegisterPeriodeModel.js";

export const createRegisterPeriode = async (req, res) => {
  try {
    const { tahunAjaran, startDate, kuota, endDate, userId } = req.body;
    // cek apakah tahun ajaran sudah tersedia
    const foundAvailable = await RegisterPeriod.findOne({
      where: {
        tahunAjaran,
      },
    });

    if (foundAvailable)
      return res.status(406).json({ message: "Tahun ajaran sudah tersedia" });

    // buat register periode
    const registerPer = await RegisterPeriod.create({
      userId,
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

export const updateRegisterPeriode = async (req, res) => {
  try {
    const { tahunAjaran, kuota, startDate, endDate } = req.body;
    const { id } = req.params;
    const registerPer = await RegisterPeriod.findOne({
      where: {
        id: id,
      },
    });
    if (!registerPer)
      return res.status(404).json({ message: "Register Periode Not Found" });

    await RegisterPeriod.update(
      {
        userId: registerPer.userId,
        tahunAjaran,
        startDate,
        endDate,
      },
      { where: { id: registerPer.id } }
    );

    // looping jurusan
    kuota.forEach(async (item) => {
      await Kuota.update(
        {
          registerPeriodId: registerPer.id,
          jurusanId: item.jurusan,
          kuota: item.kuota,
        },
        {
          where: {
            registerPeriodId: registerPer.id,
          },
        }
      );
    });

    res.status(200).json({ message: "Register Periode Upddated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
