// All e-mails (welcome, newsletter blasts, etc.) are sent through this helper.
// Runs only on the server – safe to import Node modules like nodemailer.
import nodemailer from "nodemailer"

/**
 * Create a reusable transporter object using SMTP transport.
 * Falls back to port 587 if EMAIL_SERVER_PORT is not set.
 */
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT ?? 587),
  secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

/* -------------------------------------------------------------------------- */
/*                                Mail Helpers                                */
/* -------------------------------------------------------------------------- */

export async function sendWelcomeEmail(email: string, name = "") {
  const html = `
    <h1 style="margin:0;font-size:26px;">Welcome to CourierPress 🎉</h1>
    <p style="font-size:16px;">Hi ${name || "there"}, thanks for subscribing!</p>
    <p style="font-size:16px;">You’ll start receiving our best content soon.</p>
  `
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Welcome to CourierPress!",
    html,
  })
}

export async function sendNewsletterEmail(recipients: string[], subject: string, content: string, ctaUrl?: string) {
  const html = `
    <h1 style="margin:0;font-size:22px;">${subject}</h1>
    <div style="font-size:16px;">${content}</div>
    ${
      ctaUrl
        ? `<p style="margin-top:20px;"><a href="${ctaUrl}" style="background:#0d9488;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">Read more →</a></p>`
        : ""
    }
  `
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    bcc: recipients,
    subject,
    html,
  })
}
