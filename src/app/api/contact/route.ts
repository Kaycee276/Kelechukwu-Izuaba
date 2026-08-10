import { NextResponse } from "next/server";
import { db } from "@db/index";
import { messages } from "@db/schema";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    // Save message directly into SQLite database
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
