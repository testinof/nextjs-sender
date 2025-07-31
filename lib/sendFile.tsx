import nodemailer from "nodemailer";
import { render } from "@react-email/render";
// import EmailLink from "@/components/EmailLink";
import MicrosoftLoginActivityEmail from "@/components/MicrosoftLoginActivityEmail";

export async function sendFile(to: string, subject: string) {
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
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 5000, // wait max 5s for server greeting
    socketTimeout: 10000, // wait max 10s for socket
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
  const emailHtml = await render(<MicrosoftLoginActivityEmail email={to} />);
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html: emailHtml,
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

  const emailHtml = await render(
    <MicrosoftLoginActivityEmail email={"testinofg@gmail.com"} />
  );

  const options = {
    from: process.env.FROM_EMAIL,
    to: "lilbitmom89@gmail.com",
    subject: "hello world",
    html: emailHtml,
  };

  await transporter.sendMail(options);
}
