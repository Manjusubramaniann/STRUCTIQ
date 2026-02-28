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
      reply_to: `${name} <${email}>`,
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
<div style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#0b3d91;padding:20px;text-align:center;">
              <img src="https://structiqrebarservice.com/images/logo.png" width="140" />
              <h2 style="color:#ffffff;margin:10px 0 0 0;font-weight:500;">New Website Enquiry</h2>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;">
              <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                <tr>
                  <td style="background:#f4f6f9;font-weight:bold;">Name</td>
                  <td>${name}</td>
                </tr>
                <tr>
                  <td style="background:#f4f6f9;font-weight:bold;">Phone</td>
                  <td>${phone}</td>
                </tr>
                <tr>
                  <td style="background:#f4f6f9;font-weight:bold;">Email</td>
                  <td>${email}</td>
                </tr>
              </table>

              <div style="margin-top:25px;">
                <h4 style="margin-bottom:10px;color:#0b3d91;">Message</h4>
                <div style="background:#f9fafc;padding:15px;border-left:4px solid #0b3d91;border-radius:4px;">
                  ${message}
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background:#f4f6f9;padding:15px;text-align:center;font-size:12px;color:#666;">
              STRUCTIQ Rebar Services | structiqrebarservice.com
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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
<div style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <tr>
            <td style="background:#0b3d91;padding:25px;text-align:center;">
              <img src="https://structiqrebarservice.com/images/logo.png" width="140" />
            </td>
          </tr>

          <tr>
            <td style="padding:35px;text-align:center;">
              <h2 style="color:#0b3d91;margin-bottom:15px;">Thank You, ${name}!</h2>
              <p style="color:#555;font-size:15px;line-height:1.6;">
                We have successfully received your enquiry.
                Our team will contact you shortly.
              </p>

              <div style="margin:30px 0;">
                <a href="https://structiqrebarservice.com"
                   style="background:#0b3d91;color:#ffffff;padding:12px 25px;text-decoration:none;border-radius:4px;font-size:14px;">
                   Visit Our Website
                </a>
              </div>

              <p style="font-size:13px;color:#888;">
                STRUCTIQ Rebar Services<br/>
                structiqrebarservice.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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