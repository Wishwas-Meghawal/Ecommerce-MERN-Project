import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Ecommerce App" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("EMAIL SENT:", info.messageId);
    return { success: true };
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return { success: false, error: err.message };
  }
}

export { sendEmail };
