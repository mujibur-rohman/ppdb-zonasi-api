import nodemailer from "nodemailer";

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: "ppdb.sma.negeri155jakarta@gmail.com", // generated ethereal user
      pass: "cqfowjjvqkcvfcfq", // generated ethereal password
    },
  });
  return transporter;
};

export default createMailTransporter;
