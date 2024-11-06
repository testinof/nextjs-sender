import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import EmailLink from "@/components/EmailLink";

export async function sendFile(
  to: string,
  subject: string,
  originalFilename: string,
  fileBuffer: Buffer
) {
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true,
      minVersion: "TLSv1.2",
    },
    debug: true,
  });

  try {
    await transporter.verify();
    console.log("SMTP connection verified successfully");
  } catch (error) {
    console.error("SMTP Verification failed:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    }
    throw error;
  }
  const emailHtml = await render(<EmailLink />);
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html: emailHtml,
    attachments: [
      {
        filename: originalFilename,
        content: fileBuffer,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

export async function demoSend() {
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true,
      minVersion: "TLSv1.2",
    },
    debug: true,
  });

  const emailHtml = await render(<EmailLink />);

  const options = {
    from: process.env.FROM_EMAIL,
    to: "testinofg@gmail.com",
    subject: "hello world",
    html: emailHtml,
  };

  await transporter.sendMail(options);
}
