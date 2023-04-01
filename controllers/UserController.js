import Users from "../models/UsersModel.js";
import argon2 from "argon2";
import ProfileSchool from "../models/ProfileSchoolModel.js";
import { validationResult } from "express-validator";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: [
        "uuid",
        "fullName",
        "email",
        "role",
        "createdAt",
        "updatedAt",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const hashPassword = await argon2.hash(password);
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) return res.status(400).json({ message: "User already exists" });

    await Users.create({
      fullName,
      email,
      password: hashPassword,
      role,
    });
    res.status(201).json({ message: "User Create Successfully" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const updateFullName = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ message: "User not Found" });
  try {
    await Users.update(
      {
        fullName: req.body.fullName,
        email: user.email,
        password: user.password,
        role: user.role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ message: "User Updated" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!user) return res.status(404).json({ message: "User not Found" });
    await Users.update(
      {
        fullName: user.fullName,
        email: user.email,
        password: await argon2.hash(req.body.newPassword),
        role: user.role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ message: "Password Updated" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
