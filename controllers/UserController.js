import { Op } from "sequelize";
import Users from "../models/UsersModel.js";
import argon2 from "argon2";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const role = req.query.role || "";
    const offset = limit * page - limit;

    const totalRows = await Users.count({
      where: {
        [Op.or]: [
          {
            fullName: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
        role: {
          [Op.like]: "%" + role + "%",
        },
      },
    });
    const totalPage = Math.ceil(totalRows / limit);
    const response = await Users.findAll({
      where: {
        [Op.or]: [
          {
            fullName: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
        role: {
          [Op.like]: "%" + role + "%",
        },
      },
      offset: offset,
      limit: limit,
      order: [["fullName", "ASC"]],
      attributes: [
        "id",
        "uuid",
        "fullName",
        "email",
        "role",
        "isEmailVerified",
        "createdAt",
        "updatedAt",
      ],
    });
    res.status(200).json({
      data: response,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({
      where: {
        uuid: id,
      },
    });
    if (!user) return res.status(404).json({ message: "User bot Found" });

    await Users.destroy({ where: { id: user.id } });
    res.status(200).json({ message: "User deleted" });
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
    const newUser = await Users.create({
      fullName,
      email,
      password: hashPassword,
      role,
      isEmailVerified: false,
    });
    await sendVerificationEmail(newUser.email);
    res.status(201).json({ message: "User Create Successfully" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const sendEmail = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ message: "User not Found" });
  if (user.isEmailVerified)
    return res.status(403).json({ message: "Email Sudah Terverifikasi" });
  sendVerificationEmail(user);
  res.status(200).json({ message: "Email has Sent" });
};

export const verifyEmail = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ message: "User not Found" });
  try {
    // await Users.update(
    //   {
    //     fullName: user.fullName,
    //     email: user.email,
    //     password: user.password,
    //     role: user.role,
    //     isEmailVerified: true,
    //   },
    //   {
    //     where: {
    //       id: user.id,
    //     },
    //   }
    // );
    res.status(200).json({ message: "Email has Verified" });
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
        isEmailVerified: user.isEmailVerified,
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
        isEmailVerified: user.isEmailVerified,
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
