const statusCheck = (status) => {
  switch (status) {
    case 1:
      return '<span style="background-color:green; color:#fff; padding: 3px 5px; display:inline-block; border-radius:5px;">Terima</span> di sekolah kami, harap mengumpulkan berkas fisik ke sekolah paling lambat 3 hari setelah menerima email ini';
    case 2:
      return '<span style="background-color:red; color:#fff; padding: 3px 5px; display:inline-block; border-radius:5px;">Diskualifikasi di Sekolah kami</span>';
    default:
      return '<span style="background-color:red; color:#fff; padding: 3px 5px; display:inline-block; border-radius:5px;">Tolak</span> di Sekolah kami';
  }
};

export default statusCheck;
