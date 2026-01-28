const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Resend } = require("resend");

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.send("STRUCTIQ Mail Server is running");
});

app.post("/send-mail", async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "STRUCTIQ <onboarding@resend.dev>", // default sender
      to: ["er.sksamy@gmail.com"], // YOUR mail
      reply_to: email, // USER email
      subject: "New Contact Enquiry - STRUCTIQ",
      text: `
Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}
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
