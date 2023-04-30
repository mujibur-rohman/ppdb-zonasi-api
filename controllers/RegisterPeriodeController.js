import { Op } from "sequelize";
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
      })
        .then(() => console.log("Success"))
        .catch((err) => console.log(err));
    });
    res.status(200).json({ message: "Register Periode Create Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRegisterPeriode = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const tahunAjaran = req.query.tahunAjaran || "";
    const offset = limit * page - limit;

    const totalRows = await RegisterPeriod.count({
      where: {
        tahunAjaran: {
          [Op.like]: "%" + tahunAjaran + "%",
        },
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    const registerPeriod = await RegisterPeriod.findAll({
      attributes: ["id", "tahunAjaran", "startDate", "endDate"],
      where: {
        tahunAjaran: {
          [Op.like]: "%" + tahunAjaran + "%",
        },
      },
      limit,
      offset,
      order: ["tahunAjaran"],
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
    res
      .status(200)
      .json({ data: registerPeriod, page, limit, totalRows, totalPage });
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
            [Op.and]: [
              { registerPeriodId: registerPer.id },
              { jurusanId: item.jurusan },
            ],
          },
        }
      );
    });

    res.status(200).json({ message: "Register Periode Upddated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRegisterPeriode = async (req, res) => {
  try {
    const regPer = await RegisterPeriod.findOne({
      where: { id: req.params.id },
    });
    if (!regPer)
      return res.status(404).json({ message: "Periode Pendaftaran Not Found" });
    await RegisterPeriod.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Periode Pendaftaran Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getByIdRegisterPeriode = async (req, res) => {
  try {
    const regPer = await RegisterPeriod.findOne({
      where: { id: req.params.id },
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
    if (!regPer)
      return res.status(404).json({ message: "Periode Pendaftaran Not Found" });
    res.status(200).json(regPer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
