import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, category, message, referenceNumber } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content for admin/company
    const adminMailOptions = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL, // Your company email
      subject: `New Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 4px; }
            .label { font-weight: bold; color: #495057; }
            .value { color: #212529; }
            .reference { background: #007bff; color: white; padding: 10px; border-radius: 4px; text-align: center; font-size: 18px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
              <p>Reference Number: <strong>${referenceNumber}</strong></p>
            </div>
            <div class="field"><div class="label">Name:</div><div class="value">${name}</div></div>
            <div class="field"><div class="label">Email:</div><div class="value">${email}</div></div>
            <div class="field"><div class="label">Phone:</div><div class="value">${phone}</div></div>
            <div class="field"><div class="label">Category:</div><div class="value">${category}</div></div>
            <div class="field"><div class="label">Subject:</div><div class="value">${subject}</div></div>
            <div class="field"><div class="label">Message:</div><div class="value" style="white-space: pre-wrap;">${message}</div></div>
            <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 4px;">
              <small>This email was sent from your website contact form.</small>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email content for the user
    const userMailOptions = {
      from: process.env.FROM_EMAIL,
      to: email, // send confirmation to the user
      replyTo: process.env.TO_EMAIL, // optional: your company email for reply
      subject: `We've received your inquiry - ${referenceNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #007bff; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
            .content { padding: 20px; background: #f8f9fa; border-radius: 8px; }
            .reference { background: #28a745; color: white; padding: 15px; border-radius: 4px; text-align: center; font-size: 20px; font-weight: bold; margin: 20px 0; }
            .info-box { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${name}</strong>,</p>
              <p>We've successfully received your inquiry and our team will get back to you within 24 hours.</p>
              <div class="reference">Reference Number: ${referenceNumber}</div>
              <div class="info-box">
                <h3>Your Inquiry Details:</h3>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              </div>
              <div class="info-box">
                <h3>What happens next?</h3>
                <ul>
                  <li>Our support team will review your inquiry</li>
                  <li>You'll receive a response within 24 hours</li>
                  <li>We may contact you at ${phone} if needed</li>
                </ul>
              </div>
              <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
              <p>Best regards,<br>Your Support Team</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ success: true, message: 'Emails sent successfully', referenceNumber });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
}
