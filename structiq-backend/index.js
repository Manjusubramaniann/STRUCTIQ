const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-mail", async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"STRUCT IQ Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,   // 🔥 USER EMAIL
      subject: "New Contact Enquiry - STRUCT IQ",
      text: `
Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}
      `,
    });

    res.status(200).json({ message: "Mail sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Mail sending failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
