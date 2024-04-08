"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailerGenerator = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function mailerGenerator(user, password, options) {
    var transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: user,
            pass: password,
        },
    });
    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err, "error from nodemailer");
        }
    });
}
exports.mailerGenerator = mailerGenerator;
