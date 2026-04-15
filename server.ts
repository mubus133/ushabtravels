import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return res.status(500).json({ 
        error: "Email service not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in environment variables." 
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
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
    const { name, email, phone, destination, date, travelers, message } = req.body;

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return res.status(500).json({ 
        error: "Email service not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in environment variables." 
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
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
        Preferred Date: ${date}
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
      service: "gmail",
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
