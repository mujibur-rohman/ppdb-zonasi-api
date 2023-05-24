import argon2 from "argon2";
import Users from "../models/UsersModel.js";
import jwt from "jsonwebtoken";
import { ADMIN_ROLES, SISWA_ROLES } from "../constants/roles.js";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

export const LoginAdmin = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Jika user ada maka cek password
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ message: "Wrong Password" });
    // Jika rolenya bukan admin
    if (!ADMIN_ROLES.includes(user.role))
      return res.status(403).json({ message: "Not Authorization" });
    // Set tokennya
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          uuid: user.uuid,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    // passing cookie
    res.cookie("accessToken", accessToken, { maxAge: 10000000 });

    const uuid = user.uuid;
    const id = user.id;
    const fullName = user.fullName;
    const email = user.email;
    const role = user.role;
    const isEmailVerified = user.isEmailVerified;
    res.status(200).json({
      id,
      uuid,
      fullName,
      email,
      role,
      isEmailVerified,
      token: { accessToken, expired: 60 * 24 },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const LoginSiswa = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Jika user ada maka cek password
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ message: "Wrong Password" });
    // Jika rolenya bukan siswa
    if (!SISWA_ROLES.includes(user.role))
      return res.status(403).json({ message: "Not Authorization" });
    // Set tokennya
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          uuid: user.uuid,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    // passing cookie
    res.cookie("accessToken", accessToken, { maxAge: 10000000 });

    const uuid = user.uuid;
    const id = user.id;
    const fullName = user.fullName;
    const email = user.email;
    const role = user.role;
    const isEmailVerified = user.isEmailVerified;
    res.status(200).json({
      id,
      uuid,
      fullName,
      email,
      role,
      isEmailVerified,
      token: { accessToken, expired: 60 * 24 },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const RegisterSiswa = async (req, res) => {
  const { fullName, email, password } = req.body;
  const hashPassword = await argon2.hash(password);
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) return res.status(400).json({ message: "Email Sudah Terdaftar" });
    const userNew = await Users.create({
      fullName,
      email,
      password: hashPassword,
      role: 2,
      isEmailVerified: false,
    });
    await sendVerificationEmail(userNew);
    res.status(201).json({ message: "Email Berhasil Terdaftar" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const Logout = (req, res) => {
  if (!res.locals.cookie.accessToken) {
    return res.status(405).json({ message: "Anda tidak login" });
  }
  res.clearCookie("accessToken");
  res.json({ message: "Logout Success" });
};
export const Me = (req, res) => {
  if (!res.locals.cookie.accessToken) {
    return res.status(405).json({ message: "Anda belum login" });
  }

  let user;
  jwt.verify(
    res.locals.cookie.accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid Token" }); //invalid token
      user = decoded.user;
    }
  );
  res.json({ user });
};
