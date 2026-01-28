require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   NODEMAILER SETUP
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail", // outlook use panna "hotmail"
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* =========================
   CONTACT FORM MAIL
========================= */
app.post("/send-mail", async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`, // shows user name
      replyTo: email, // 🔥 user email (VERY IMPORTANT)
      to: process.env.TO_EMAIL,
      subject: "New Contact Enquiry - STRUCT IQ",
      html: `
        <h3>New Contact Enquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

    res.json({ message: "Message sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Mail sending failed" });
  }
});

/* =========================
   SERVER START
========================= */
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
