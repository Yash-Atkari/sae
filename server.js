const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, category, message, referenceNumber } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // your Gmail
        pass: process.env.SMTP_PASS, // your App Password
      },
    });

    // Send to your team (from user's entered email)
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // sent via your Gmail yashatkari7@gmail.com
      to: 'atkari.help@gmail.com', // your support inbox
      replyTo: email, // when you reply, it goes to the user's email
      subject: `New Inquiry: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #0056b3;">Sahil Mobiles & Enterprises – New ${subject} Inquiry</h2>
        <hr style="border: none; border-top: 1px solid #eee; margin: 10px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 5px; font-weight: bold; width: 150px;">Name:</td>
            <td style="padding: 5px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 5px; font-weight: bold;">Email:</td>
            <td style="padding: 5px;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 5px; font-weight: bold;">Phone:</td>
            <td style="padding: 5px;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 5px; font-weight: bold;">Category:</td>
            <td style="padding: 5px;">${category}</td>
          </tr>
          <tr>
            <td style="padding: 5px; font-weight: bold;">Reference No:</td>
            <td style="padding: 5px;">${referenceNumber}</td>
          </tr>
          <tr>
            <td style="padding: 5px; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 5px;">${message}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #eee; margin: 10px 0;">
        <p style="font-size: 12px; color: #888;">This email was sent via your website contact form.</p>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      referenceNumber,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
