"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailerGenerator = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
function mailerGenerator(options) {
    var transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASSWORD,
        },
    });
    transporter.sendMail({ from: "spellbee931@gmail.com", ...options }, (err, info) => {
        if (err) {
            console.log(err, "error from nodemailer");
        }
    });
}
exports.mailerGenerator = mailerGenerator;
