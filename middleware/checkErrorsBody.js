import { validationResult } from "express-validator";

export const checkErrorsBody = async (req, res, next) => {
  const errors = validationResult(req);
  //   Cek error body
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
