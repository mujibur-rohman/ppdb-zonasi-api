import nodemailer from "nodemailer";

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: "mujiburrohman065@gmail.com", // generated ethereal user
      pass: "hwcnapqwwcxyyvln", // generated ethereal password
    },
  });
  return transporter;
};

export default createMailTransporter;
