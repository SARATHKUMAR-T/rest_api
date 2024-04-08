import { Response } from "express";
import multer from "multer";

// const excelFilter = (
//   req: Response,
//   file: Express.Multer.File,
//   cb: (message: string | null, destination: string) => void
// ) => {
//   if (
//     file.mimetype.includes("excel") ||
//     file.mimetype.includes("")
//   ) {
//     cb(null, true);
//   } else {
//     cb("Please upload only excel file.", false);
//   }
// };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);

    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
