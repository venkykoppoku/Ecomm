import nodemailer from "nodemailer";
const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PSD,
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_TO}>`,
    to: options.to,
    subject: options.subject,
    html: options.message,
  };

  await transport.sendMail(message);
};

export default sendEmail;
