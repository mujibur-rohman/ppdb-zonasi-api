import createMailTransporter from "./createEmailTransporter.js";
import statusCheck from "./statusCheck.js";

const sendAnnounceQualification = async (qualified) => {
  const transporter = createMailTransporter();
  const mailOptions = {
    from: '"Penerimaan Pendaftaran Siswa Baru" <mujiburrohman065@gmail.com>', // sender address
    to: qualified.user.email, // list of receivers
    subject: "Pengumuman PPDB", // Subject line
    // text: "For your security, please verify your account by clicking the button below.",
    html: `<p>Berdasarkan hasil kualifikasi dengan sistem zonasi yang telah dilakukan, saudara/i ${
      qualified?.fullName
    } telah di ${statusCheck(
      qualified?.status
    )}. Atas perhatiannya kami ucapkan terima kasih.</p>
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

export default sendAnnounceQualification;
