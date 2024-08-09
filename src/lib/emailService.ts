import nodemailer, { Transporter } from "nodemailer";
import {
  EmailOptions,
  EmailServiceInterface,
  EmailConfig,
} from "../types/email";

export const emailConfig: EmailConfig = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587, // Use 465 for SSL
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  defaultFrom: process.env.EMAIL_FROM,
};

export class EmailService implements EmailServiceInterface {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass,
      },
    });
  }

  public async sendEmail(options: EmailOptions): Promise<void> {
    const mailOptions = {
      from: options.from || emailConfig.defaultFrom,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(`Error sending email to ${options.to}:`, error);
      throw new Error("Failed to send email");
    }
  }
}
