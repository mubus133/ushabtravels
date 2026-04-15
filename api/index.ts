import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Check environment variables
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return res.status(500).json({ 
      error: 'Email service not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in environment variables.' 
    });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    // Handle booking request
    if (req.method === 'POST' && req.url === '/api/booking') {
      const { name, email, phone, destination, date, travelers, message } = req.body;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `New Booking Inquiry: ${destination}`,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Destination: ${destination}
Preferred Date: ${date}
Number of Travelers: ${travelers}
Message: ${message}
        `,
      });

      return res.status(200).json({ success: true, message: 'Booking inquiry sent successfully' });
    }

    // Handle contact request
    if (req.method === 'POST' && req.url === '/api/contact') {
      const { name, email, phone, subject, message } = req.body;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `New Contact Form Submission: ${subject}`,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message: ${message}
        `,
      });

      return res.status(200).json({ success: true, message: 'Email sent successfully' });
    }

    // Handle newsletter request
    if (req.method === 'POST' && req.url === '/api/newsletter') {
      const { email } = req.body;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: 'New Newsletter Subscription',
        text: `New subscriber email: ${email}`,
      });

      return res.status(200).json({ success: true, message: 'Subscribed successfully' });
    }

    return res.status(404).json({ error: 'Route not found' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: error.message || 'Unknown SMTP error',
    });
  }
}