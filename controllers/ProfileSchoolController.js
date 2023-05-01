import ProfileSchool from "../models/ProfileSchoolModel.js";
import path from "path";
import { Op } from "sequelize";
import fs from "fs";

export const getProfileSchool = async (req, res) => {
  try {
    const profile = await ProfileSchool.findAll();
    if (!profile) return res.status(404).json({ message: "Profile Not Found" });
    res.status(200).json(profile[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProfileSchool = async (req, res) => {
  const {
    schoolName,
    address,
    provinsi,
    kota,
    kecamatan,
    kelurahan,
    kodePos,
    npsn,
    latitude,
    longitude,
  } = req.body;
  const isAvailable = await ProfileSchool.count();
  if (isAvailable > 0)
    return res.status(403).json({ message: "Profile School is Available" });
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });

  const logo = req.files.logo;
  const fileSize = logo?.data.length;
  const ext = path.extname(logo?.name);
  const fileName = logo.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Gambar Tidak Valid" });
  if (fileSize > 2000000)
    return res.status(422).json({ msg: "Minimal ukuran gambar 2MB" });

  logo.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await ProfileSchool.create({
        schoolName,
        address,
        npsn,
        logo: url,
        latitude,
        longitude,
        provinsi,
        kota,
        kecamatan,
        kelurahan,
        kodePos,
      });
      res.status(200).json({ message: "Profile School Create Successfully" });
    } catch (error) {
      res.status(400).json(error.message);
    }
  });
};

export const updateProfileSchool = async (req, res) => {
  try {
    const {
      schoolName,
      address,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      kodePos,
      npsn,
      logo,
      latitude,
      longitude,
    } = req.body;
    const profileSchool = await ProfileSchool.findOne();
    if (!profileSchool)
      return res.status(404).json({ message: "Profile School Empty" });

    // Jika gambarnya tidak diubah
    let url = "";
    if (!req.files) {
      url = await profileSchool.logo;
      console.log("TANPA UPLOAD");
    } else {
      const logo = req.files.logo;
      const fileSize = logo?.data.length;
      const ext = path.extname(logo?.name);
      const fileName = logo.md5 + ext;
      url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
      const allowedType = [".png", ".jpg", ".jpeg"];
      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Gambar Tidak Valid" });
      if (fileSize > 2000000)
        return res.status(422).json({ msg: "Minimal ukuran gambar 2MB" });

      const splitFilename = profileSchool.logo.split("/");
      const fileNameOld = splitFilename[splitFilename.length - 1];
      const filepath = `./public/images/${fileNameOld}`;
      fs.unlinkSync(filepath);

      logo.mv(`./public/images/${fileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
      console.log("DENGAN UPLOAD");
    }

    await ProfileSchool.update(
      {
        schoolName,
        address,
        provinsi,
        kota,
        kecamatan,
        kelurahan,
        kodePos,
        npsn,
        logo: url,
        latitude,
        longitude,
      },
      {
        where: {
          id: profileSchool.id,
        },
      }
    );
    res.status(200).json({ message: "Profile School Updated" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
