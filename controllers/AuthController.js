import argon2 from "argon2";
import Users from "../models/UsersModel.js";
import jwt from "jsonwebtoken";

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
    // Set tokennya
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          uuid: user.uuid,
          email: user.email,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    // passing cookie
    res.cookie("accessToken", accessToken, { maxAge: 10000000 });

    const uuid = user.uuid;
    const fullName = user.fullName;
    const email = user.email;
    const role = user.role;
    res.status(200).json({
      uuid,
      fullName,
      email,
      role,
      token: { accessToken, expired: 60 * 24 },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const LogoutAdmin = (req, res) => {
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
