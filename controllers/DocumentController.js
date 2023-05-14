import Document from "../models/DocumentModel.js";
import Pendaftaran from "../models/PendaftaranModels.js";
import path from "path";
import fs from "fs";

export const getDocuments = async (req, res) => {
  try {
    const document = await Document.findAll();
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const addDocuments = async (req, res) => {
  try {
    const { pendaftaranId } = req.body;
    const { ...docs } = req.files;
    const availablePendaftaran = await Pendaftaran.findOne({
      where: {
        id: pendaftaranId,
      },
    });
    if (!availablePendaftaran)
      return res.status(404).json({ message: "Pendaftaran tidak ditemukan" });
    const hasAvailableDoc = await Document.findOne({
      where: { pendaftaranId: availablePendaftaran.id },
    });
    if (hasAvailableDoc)
      return res.status(404).json({ message: "Document Sudah Ada" });

    let objSource = {};
    for (const props in docs) {
      const file = docs[props];
      const fileSize = file?.data.length;
      const ext = path.extname(file?.name);
      const fileName = file.md5 + ext;
      let source;
      if (ext === ".pdf") {
        source = `${req.protocol}://${req.get("host")}/docs/${fileName}`;
      } else {
        source = `${req.protocol}://${req.get("host")}/images/${fileName}`;
      }
      const allowedType = [".png", ".jpg", ".jpeg", ".pdf"];
      if (!allowedType.includes(ext.toLowerCase()))
        return res
          .status(422)
          .json({ message: "File harus tipe pdf atau gambar" });
      if (fileSize > 5000000)
        return res.status(422).json({ message: "Minimal ukuran gambar 5MB" });
      objSource[props] = source;

      // Pindahkan file ke public
      if (ext === ".pdf") {
        file.mv(`./public/docs/${fileName}`, async (err) => {
          if (err) return res.status(500).json({ msg: err.message });
        });
      } else {
        file.mv(`./public/images/${fileName}`, async (err) => {
          if (err) return res.status(500).json({ msg: err.message });
        });
      }
    }
    await Document.create({ pendaftaranId, ...objSource });
    res.status(200).json("Document added");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { pendaftaranId, ...bodySource } = req.body;

    const availableDocs = await Document.findOne({
      where: {
        id,
      },
    });
    if (!availableDocs)
      return res.status(404).json({ message: "Document tidak ditemukan" });
    if (req.files) {
      const { ...docs } = req.files;
      let objSource = {};
      for (const props in docs) {
        const file = docs[props];
        const fileSize = file?.data.length;
        const ext = path.extname(file?.name);
        const fileName = file.md5 + ext;
        let source;
        if (ext === ".pdf") {
          source = `${req.protocol}://${req.get("host")}/docs/${fileName}`;
        } else {
          source = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        }
        const allowedType = [".png", ".jpg", ".jpeg", ".pdf"];
        if (!allowedType.includes(ext.toLowerCase()))
          return res
            .status(422)
            .json({ message: "File harus tipe pdf atau gambar" });
        if (fileSize > 5000000)
          return res.status(422).json({ message: "Minimal ukuran gambar 5MB" });
        objSource[props] = source;
        // hapus file lama
        const splitFileNameOld = availableDocs[props].split("/");
        const fileNameOld = splitFileNameOld[splitFileNameOld.length - 1];
        const oldExt = fileNameOld.split(".");
        let filepath;
        if (oldExt[1] === "pdf") {
          filepath = `./public/docs/${fileNameOld}`;
        } else {
          filepath = `./public/images/${fileNameOld}`;
        }
        fs.unlinkSync(filepath);

        // Pindahkan file
        if (ext === ".pdf") {
          file.mv(`./public/docs/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          });
        } else {
          file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          });
        }
      }
      await Document.update(
        { pendaftaranId, ...bodySource, ...objSource },
        { where: { id: availableDocs.id } }
      );
      res.status(200).json("Document updated");
      // res.status(200).json(objSource);
    } else {
      await Document.update(
        { pendaftaranId, ...bodySource },
        { where: { id: availableDocs.id } }
      );
      res.status(200).json("Document Updated");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
