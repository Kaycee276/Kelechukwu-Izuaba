import { NextResponse } from "next/server";
import { db } from "@db/index";
import { messages } from "@db/schema";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    // 1. Save message to SQLite database
    const inserted = db
      .insert(messages)
      .values({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        read: 0,
      })
      .returning()
      .get();

    // 2. Send email notification to owner (kizuaba@gmail.com)
    try {
      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (smtpHost && smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(process.env.SMTP_PORT || "587", 10),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${smtpUser}>`,
          to: process.env.NOTIFICATION_EMAIL || "kizuaba@gmail.com",
          replyTo: email,
          subject: `New Portfolio Message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #e85d04;">New Portfolio Contact Message</h2>
              <p><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
              <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${message}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
              <p style="font-size: 12px; color: #888;">This message was submitted via your portfolio contact form and stored in your SQLite Admin Vault.</p>
            </div>
          `,
        });
      } else {
        console.log(`[Contact Notification] New message saved for kizuaba@gmail.com from ${name} <${email}>`);
      }
    } catch (emailErr) {
      console.error("Email notification warning:", emailErr);
      // Non-blocking: DB entry is saved regardless of email service configuration
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! Thank you for reaching out.",
      data: inserted,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
