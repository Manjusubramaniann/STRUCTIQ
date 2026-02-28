const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Resend } = require("resend");

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

// Test route
app.get("/", (req, res) => {
  res.send("STRUCTIQ Mail Server is running");
});

// Contact form route
app.post("/send-mail", async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  try {
    // 1️⃣ Send enquiry to company
    await resend.emails.send({
      from: "STRUCTIQ Website <noreply@structiqrebarservice.com>",
      to: ["manjusubramanian39@gmail.com"],

      // ✅ Proper Reply-To (IMPORTANT FIX)
      reply_to: [
        {
          email: email,
          name: name
        }
      ],

      subject: `New Contact Enquiry from ${name}`,

      text: `
New enquiry received from STRUCTIQ website.

Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}
      `
    });

    // 2️⃣ Send auto thank-you mail to user
    await resend.emails.send({
      from: "STRUCTIQ <noreply@structiqrebarservice.com>",
      to: [email],
      subject: "Thank you for contacting STRUCTIQ",
      text: `
Hi ${name},

Thank you for contacting STRUCTIQ Rebar Services.

We have received your enquiry and our team will get back to you shortly.

Regards,
STRUCTIQ Team
https://structiqrebarservice.com
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