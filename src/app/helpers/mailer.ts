// src/app/helpers/mailer.ts
import nodemailer, { SentMessageInfo } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import User from "../lib/modals/user";
import bcryptjs from "bcryptjs";

type EmailType = "VERIFY" | "RESET";

interface SendEmailArgs {
  email: string;
  emailType: EmailType;
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailArgs): Promise<SentMessageInfo> => {
  // hash the userId to use as token
  const hashedToken = await bcryptjs.hash(userId, 10);

  if (emailType === "VERIFY") {
    await User.findByIdAndUpdate(userId, {
      $set: {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1h
      },
    });
  } else {
    await User.findByIdAndUpdate(userId, {
      $set: {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000, // 1h
      },
    });
  }

  // Use env vars in production — do NOT commit credentials
  const transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
    nodemailer.createTransport({
      host: process.env.MAIL_HOST ?? "sandbox.smtp.mailtrap.io",
      port: Number(process.env.MAIL_PORT ?? 2525),
      auth: {
        user: process.env.MAIL_USER ?? "", // <-- move secrets to .env
        pass: process.env.MAIL_PASS ?? "",
      },
    });

  const actionText =
    emailType === "VERIFY" ? "verify your email" : "reset your password";
  const urlPath = emailType === "VERIFY" ? "verifyEmail" : "resetPassword";

  const domain = process.env.DOMAIN ?? "http://localhost:3000";

  const mailOptions = {
    from: process.env.MAIL_FROM ?? "no-reply@example.com",
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `<b>Click <a href="${domain}/${urlPath}?token=${hashedToken}">here</a> to ${actionText}.</b>`,
  };

  const mailResponse = await transport.sendMail(mailOptions);
  return mailResponse;
};
