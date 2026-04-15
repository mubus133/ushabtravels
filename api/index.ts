'use strict';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Replace with your SMTP host
    port: 587,
    secure: false,
    auth: {
        user: 'username@example.com', // Replace with your email
        pass: 'password' // Replace with your password
    }
});

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end(); // Handle preflight request
        return;
    }

    try {
        switch (req.url) {
            case '/api/booking':
                // Handle booking logic here
                res.status(200).json({ message: 'Booking processed.' });
                break;
            case '/api/contact':
                const { name, email, message } = req.body;
                await transporter.sendMail({
                    from: email,
                    to: 'recipient@example.com', // Replace with your recipient address
                    subject: `Contact from ${name}`,
                    text: message
                });
                res.status(200).json({ message: 'Message sent.' });
                break;
            case '/api/newsletter':
                const { newsletterEmail } = req.body;
                await transporter.sendMail({
                    from: 'newsletter@example.com',
                    to: newsletterEmail,
                    subject: 'Newsletter Subscription',
                    text: 'Thank you for subscribing!'
                });
                res.status(200).json({ message: 'Subscribed to newsletter.' });
                break;
            default:
                res.status(404).json({ message: 'Not Found' });
                break;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}