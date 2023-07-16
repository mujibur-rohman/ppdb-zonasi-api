import Jurusan from "../models/JurusanModels.js";
import Pendaftaran from "../models/PendaftaranModels.js";

export const getJurusan = async (req, res) => {
  try {
    const jurusan = await Jurusan.findAll({
      include: [
        {
          model: Pendaftaran,
          attributes: ["id"],
        },
      ],
    });

    res.status(200).json(jurusan);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const createJurusan = async (req, res) => {
  try {
    const { name } = req.body;
    await Jurusan.create({ name });
    res.status(200).json({ message: "Create Jurusan Successfully" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const updateJurusan = async (req, res) => {
  const { name } = req.body;
  try {
    const jurusan = await Jurusan.findOne({ where: { id: req.params.id } });
    if (!jurusan) return res.status(404).json({ message: "Jurusan Not Found" });

    await Jurusan.update({ name }, { where: { id: jurusan.id } });
    res.status(200).json({ message: "Update Jurusan Successfully", jurusan });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteJurusan = async (req, res) => {
  try {
    const jurusan = await Jurusan.findOne({ where: { id: req.params.id } });
    if (!jurusan) return res.status(404).json({ message: "Jurusan Not Found" });

    await Jurusan.destroy({ where: { id: jurusan.id } });
    res.status(200).json({ message: "Jurusan Deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
