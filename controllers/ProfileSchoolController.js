import { validationResult } from "express-validator";
import ProfileSchool from "../models/ProfileSchoolModel.js";

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
    const isAvailable = await ProfileSchool.count();
    if (isAvailable > 0)
      return res.status(403).json({ message: "Profile School is Available" });
    console.log(isAvailable);
    await ProfileSchool.create({
      schoolName,
      address,
      npsn,
      logo,
      latitude,
      longitude,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      kodePos,
    });
    res.status(201).json({ message: "Profile School Create Successfully" });
  } catch (error) {
    res.status(400).json(error.message);
  }
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
    const profileSchool = await ProfileSchool.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!profileSchool)
      return res.status(404).json({ message: "Profile School Not Found" });

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
        logo,
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
