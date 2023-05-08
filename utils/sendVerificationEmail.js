import createMailTransporter from "./createEmailTransporter.js";

const sendVerificationEmail = async (user) => {
  const transporter = createMailTransporter();
  const mailOptions = {
    from: '"PPDB Email Verification" <mujiburrohman065@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Verifikasi Email", // Subject line
    // text: "For your security, please verify your account by clicking the button below.",
    html: `<p>Demi keamanan, klik tulisan dibawah ini untuk aktivasi email agar dapat login.</p>
      <a style="background-color:#0591f5; color:#fff; padding: 3px 5px; display:inline-block; text-decoration:none; border-radius:5px;" href="${process.env.CLIENT_URL}">Verifikasi Email</a>
    `,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent");
    }
  });
};

export default sendVerificationEmail;
