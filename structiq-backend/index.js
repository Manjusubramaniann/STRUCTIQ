const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Resend } = require("resend");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const validator = require("validator");

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

/* ==============================
   🔒 RATE LIMITING (Spam Protection)
================================= */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 requests per 15 mins per IP
  message: "Too many requests. Please try again later."
});

app.use("/send-mail", limiter);

/* ==============================
   📎 FILE UPLOAD (Attachment)
================================= */

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* ==============================
   🧪 Test Route
================================= */

app.get("/", (req, res) => {
  res.send("STRUCTIQ Mail Server is running");
});

/* ==============================
   📩 Contact Route
================================= */

app.post("/send-mail", upload.single("attachment"), async (req, res) => {
  const { name, phone, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {

    /* ==============================
       1️⃣ HTML Styled Mail to Company
    ================================= */

    await resend.emails.send({
      from: "STRUCTIQ Website <noreply@structiqrebarservice.com>",
      to: ["manjusubramanian39@gmail.com"],
      reply_to: [{ email: email, name: name }],
      subject: `New Contact Enquiry from ${name}`,

      html: `
      <div style="font-family:Arial;padding:20px">
        <img src="https://structiqrebarservice.com/images/logo.png" width="150" />
        <h2 style="color:#0b3d91;">New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background:#f4f4f4;padding:10px;border-radius:5px;">
          ${message}
        </p>
      </div>
      `,

      attachments: req.file
        ? [
            {
              filename: req.file.originalname,
              content: req.file.buffer
            }
          ]
        : []
    });

    /* ==============================
       2️⃣ HTML Thank You Mail to User
    ================================= */

    await resend.emails.send({
      from: "STRUCTIQ <noreply@structiqrebarservice.com>",
      to: [email],
      subject: "Thank you for contacting STRUCTIQ",

      html: `
      <div style="font-family:Arial;padding:20px;text-align:center">
        <img src="https://structiqrebarservice.com/logo.png" width="150" />
        <h2 style="color:#0b3d91;">Thank You, ${name}!</h2>
        <p>We have received your enquiry.</p>
        <p>Our team will contact you shortly.</p>
        <hr />
        <small>STRUCTIQ Rebar Services<br/>
        https://structiqrebarservice.com</small>
      </div>
      `
    });

    res.status(200).json({ message: "Mail sent successfully" });

  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).json({ message: "Mail sending failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});