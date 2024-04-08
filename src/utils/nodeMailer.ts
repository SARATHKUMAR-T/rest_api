import nodemailer from "nodemailer";
import { MailOptions } from "../types";

export function mailerGenerator(
  user: string,
  password: string,
  options: MailOptions
) {
  var transporter = nodemailer.createTransport({
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
