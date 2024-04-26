import nodemailer from "nodemailer";
import { MailOptions } from "../types";
import "dotenv/config";

export function mailerGenerator(options: MailOptions) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
  });

  transporter.sendMail(
    { from: "spellbee931@gmail.com", ...options },
    (err, info) => {
      if (err) {
        console.log(err, "error from nodemailer");
      }
    }
  );
}
