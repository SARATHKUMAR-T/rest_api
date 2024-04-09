"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
function fileFilter(req, file, cb) {
    if (file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheetml")) {
        cb(null, true);
    }
    else {
        return cb(new Error("invalid file format"));
    }
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
