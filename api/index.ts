import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Health check route to verify API is alive
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "API is reachable",
    env: {
      hasGmailUser: !!process.env.GMAIL_USER,
      hasGmailPass: !!process.env.GMAIL_APP_PASSWORD,
      nodeEnv: process.env.NODE_ENV
    }
  });
});

// API Routes
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return res.status(500).json({ 
      error: "Email service not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in Vercel environment variables." 
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Send to self
    subject: `New Contact Form Submission: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Subject: ${subject}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    res.status(500).json({ 
      error: "Failed to send email", 
      details: error.message || "Unknown SMTP error",
      hint: "Please ensure GMAIL_APP_PASSWORD is a 16-character App Password, not your regular password."
    });
  }
});

app.post("/api/booking", async (req, res) => {
  const { name, email, phone, destination, date, returnDate, travelers, message } = req.body;

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return res.status(500).json({ 
      error: "Email service not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in Vercel environment variables." 
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Send to self
    subject: `New Booking Inquiry: ${destination}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Destination: ${destination}
      Departure Date: ${date}
      Return Date: ${returnDate || 'Not specified'}
      Number of Travelers: ${travelers}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Booking inquiry sent successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    res.status(500).json({ 
      error: "Failed to send email", 
      details: error.message || "Unknown SMTP error",
      hint: "Please ensure GMAIL_APP_PASSWORD is a 16-character App Password, not your regular password."
    });
  }
});

app.post("/api/newsletter", async (req, res) => {
  const { email } = req.body;

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return res.status(500).json({ 
      error: "Email service not configured." 
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `New Newsletter Subscription`,
    text: `New subscriber email: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Subscribed successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    res.status(500).json({ 
      error: "Failed to subscribe", 
      details: error.message || "Unknown SMTP error",
      hint: "Please ensure GMAIL_APP_PASSWORD is a 16-character App Password, not your regular password."
    });
  }
});

export default app;
