export const verifyIsAdmin = async (req, res, next) => {
  if (req.role !== 0) return res.status(403).json({ message: "Unauthorized" });
  console.log(req.role);
  next();
};
