import nodemailer from 'nodemailer';
import { render } from '@react-email/render';

export async function sendFile(
  to: string,
  subject: string,
  text: React.ReactElement,
  originalFilename: string,
  fileBuffer: Buffer
) {
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
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
      rejectUnauthorized: true, // Add this line
      minVersion: 'TLSv1.2',
    }
  });
  const html = await render(text)

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html,
    attachments: [
      {
        filename: originalFilename,
        content: fileBuffer,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}
