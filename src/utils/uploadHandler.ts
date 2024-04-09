import { Request } from "express";
import multer from "multer";

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    return cb(new Error("invalid file format"));
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);

    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage, fileFilter: fileFilter });
