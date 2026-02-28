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

  try {
    // 1️⃣ Send Mail to Company
    await resend.emails.send({
      from: "STRUCTIQ Website <noreply@structiqrebarservice.com>",
      to: ["manjusubramanian39@gmail.com"],
      // reply_to: email,
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
      `,

      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <img src="https://structiqrebarservice.com/images/logo.png" width="150" />
        <h2 style="color:#0b3d91;">New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background:#f4f4f4;padding:10px;border-radius:5px;">
          ${message}
        </div>
      </div>
      `
    });

    // 2️⃣ Auto Thank You Mail to User
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
structiqrebarservice.com
      `,

      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; text-align:center;">
        <img src="https://structiqrebarservice.com/images/logo.png" width="150" />
        <h2 style="color:#0b3d91;">Thank You, ${name}!</h2>
        <p>We have received your enquiry.</p>
        <p>Our team will contact you shortly.</p>
        <hr/>
        <small>
          STRUCTIQ Rebar Services <br/>
          https://structiqrebarservice.com
        </small>
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