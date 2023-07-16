import { Op } from "sequelize";
import Pendaftaran from "../models/PendaftaranModels.js";
import RegisterPeriod from "../models/RegisterPeriodeModel.js";
import Kuota from "../models/KuotaModel.js";
import Jurusan from "../models/JurusanModels.js";

export const statusVerification = async (req, res) => {
  try {
    // get current periode
    const currentYear = new Date().getFullYear();
    const currentPeriode = await RegisterPeriod.findOne({
      where: { tahunAjaran: `${currentYear}/${currentYear + 1}` },
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
    if (!currentPeriode)
      return res.status(404).json({ message: "Periode Pendaftaran Not Found" });

    // Ubah status pendaftar terkait
    const pendaftarCurrent = await Pendaftaran.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!pendaftarCurrent)
      return res.status(404).json({ message: "Pendaftaran tidak ditemukan" });

    let isOverDistanceStatus;

    // jika jarak melebihi maxDistance
    if (pendaftarCurrent.jarak > currentPeriode.maxDistance) {
      isOverDistanceStatus = -2;
    } else {
      isOverDistanceStatus = 1;
    }

    await Pendaftaran.update(
      {
        status: isOverDistanceStatus,
      },
      {
        where: {
          id: pendaftarCurrent.id,
        },
      }
    );

    // ==Proses kualifikasi==

    const qualifiedPendaftar = await Pendaftaran.findAll({
      where: {
        [Op.and]: [
          { jurusanId: pendaftarCurrent.jurusanId },
          {
            status: {
              [Op.gt]: 0,
            },
          },
        ],
      },
      order: [["jarak", "ASC"]],
    });

    const getKuotaCurrent = currentPeriode.kuota?.filter((kuota) => {
      return kuota.jurusan.id === pendaftarCurrent.jurusanId;
    })[0];

    // Jika jumlah kualifikasi lebih kecil dari kuota
    if (qualifiedPendaftar.length <= getKuotaCurrent.kuota) {
      qualifiedPendaftar.forEach(async (element) => {
        await Pendaftaran.update(
          {
            status: 1, // di ubah menjadi 1 (kualifikasi)
          },
          {
            where: {
              id: element.id,
            },
          }
        );
      });
      // return res.json({ message: "Berhasil Di Verifikasi" });
    }
    const disqualified = qualifiedPendaftar.splice(getKuotaCurrent.kuota);
    qualifiedPendaftar.forEach(async (element) => {
      await Pendaftaran.update(
        {
          status: 1,
        },
        {
          where: {
            id: element.id,
          },
        }
      );
    });

    disqualified.forEach(async (element) => {
      await Pendaftaran.update(
        {
          status: 2, // di ubah menjadi 2 (diskualifikasi)
        },
        {
          where: {
            id: element.id,
          },
        }
      );
    });

    res.json("Berhasil Di Verifikasi");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const statusDecline = async (req, res) => {
  try {
    // get current periode
    const currentYear = new Date().getFullYear();
    const currentPeriode = await RegisterPeriod.findOne({
      where: { tahunAjaran: `${currentYear}/${currentYear + 1}` },
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
    if (!currentPeriode)
      return res.status(404).json({ message: "Periode Pendaftaran Not Found" });

    const pendaftarCurrent = await Pendaftaran.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!pendaftarCurrent)
      return res.status(404).json({ message: "Pendaftaran tidak ditemukan" });

    await Pendaftaran.update(
      {
        userId: pendaftarCurrent.userId,
        registerPeriodId: pendaftarCurrent.registerPeriodId,
        jurusanId: pendaftarCurrent.jurusanId,
        fullName: pendaftarCurrent.fullName,
        placeBirth: pendaftarCurrent.placeBirth,
        birthday: pendaftarCurrent.birthday,
        religion: pendaftarCurrent.religion,
        gender: pendaftarCurrent.gender,
        fromSchool: pendaftarCurrent.fromSchool,
        nisn: pendaftarCurrent.nisn,
        address: pendaftarCurrent.address,
        kelurahan: pendaftarCurrent.kelurahan,
        kecamatan: pendaftarCurrent.kecamatan,
        kota: pendaftarCurrent.kota,
        provinsi: pendaftarCurrent.provinsi,
        kodePos: pendaftarCurrent.kodePos,
        status: -2,
        latitude: pendaftarCurrent.latitude,
        longitude: pendaftarCurrent.longitude,
        jarak: pendaftarCurrent.jarak,
      },
      {
        where: {
          id: pendaftarCurrent.id,
        },
      }
    );

    // ==Proses kualifikasi==

    const qualifiedPendaftar = await Pendaftaran.findAll({
      where: {
        [Op.and]: [
          { jurusanId: pendaftarCurrent.jurusanId },
          {
            status: {
              [Op.gt]: 0,
            },
          },
        ],
      },
      order: [["jarak", "ASC"]],
    });

    const getKuotaCurrent = currentPeriode.kuota?.filter((kuota) => {
      return kuota.jurusan.id === pendaftarCurrent.jurusanId;
    })[0];

    // Jika jumlah kualifikasi lebih kecil dari kuota
    if (qualifiedPendaftar.length <= getKuotaCurrent.kuota) {
      qualifiedPendaftar.forEach(async (element) => {
        await Pendaftaran.update(
          {
            userId: element.userId,
            registerPeriodId: element.registerPeriodId,
            jurusanId: element.jurusanId,
            fullName: element.fullName,
            placeBirth: element.placeBirth,
            birthday: element.birthday,
            religion: element.religion,
            gender: element.gender,
            fromSchool: element.fromSchool,
            nisn: element.nisn,
            address: element.address,
            kelurahan: element.kelurahan,
            kecamatan: element.kecamatan,
            kota: element.kota,
            provinsi: element.provinsi,
            kodePos: element.kodePos,
            status: 1, // di ubah menjadi 1 (kualifikasi)
            latitude: element.latitude,
            longitude: element.longitude,
            jarak: element.jarak,
          },
          {
            where: {
              id: element.id,
            },
          }
        );
      });
      // return res.json({ message: "Berhasil Di Verifikasi" });
    }
    const disqualified = qualifiedPendaftar.splice(getKuotaCurrent.kuota);
    qualifiedPendaftar.forEach(async (element) => {
      await Pendaftaran.update(
        {
          userId: element.userId,
          registerPeriodId: element.registerPeriodId,
          jurusanId: element.jurusanId,
          fullName: element.fullName,
          placeBirth: element.placeBirth,
          birthday: element.birthday,
          religion: element.religion,
          gender: element.gender,
          fromSchool: element.fromSchool,
          nisn: element.nisn,
          address: element.address,
          kelurahan: element.kelurahan,
          kecamatan: element.kecamatan,
          kota: element.kota,
          provinsi: element.provinsi,
          kodePos: element.kodePos,
          status: 1,
          latitude: element.latitude,
          longitude: element.longitude,
          jarak: element.jarak,
        },
        {
          where: {
            id: element.id,
          },
        }
      );
    });

    disqualified.forEach(async (element) => {
      await Pendaftaran.update(
        {
          userId: element.userId,
          registerPeriodId: element.registerPeriodId,
          jurusanId: element.jurusanId,
          fullName: element.fullName,
          placeBirth: element.placeBirth,
          birthday: element.birthday,
          religion: element.religion,
          gender: element.gender,
          fromSchool: element.fromSchool,
          nisn: element.nisn,
          address: element.address,
          kelurahan: element.kelurahan,
          kecamatan: element.kecamatan,
          kota: element.kota,
          provinsi: element.provinsi,
          kodePos: element.kodePos,
          status: 2, // di ubah menjadi 2 (diskualifikasi)
          latitude: element.latitude,
          longitude: element.longitude,
          jarak: element.jarak,
        },
        {
          where: {
            id: element.id,
          },
        }
      );
    });

    res.json("Pendaftaran Berhasil Ditolak");
  } catch (error) {
    res.status(400).json(error.message);
  }
};
