const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("STRUCTIQ Mail Server is running");
});

// Send mail API
app.post("/send-mail", async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,                 // USER mail
      to: process.env.EMAIL_USER,  // YOUR mail
      subject: "New Contact Enquiry - STRUCT IQ",
      text: `
Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Mail sent successfully" });

  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).json({ message: "Mail sending failed" });
  }
});

// 🔴 THIS IS THE MOST IMPORTANT LINE
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
