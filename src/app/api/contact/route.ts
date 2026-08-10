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

    let insertedData = null;

    try {
      const [inserted] = await db
        .insert(messages)
        .values({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          read: 0,
        })
        .returning();
      insertedData = inserted;
    } catch (dbErr) {
      console.log(`[Contact Message Received] ${name} <${email}>: ${message}`, dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! Thank you for reaching out.",
      data: insertedData,
    });
  } catch (error) {
    console.error("Contact route processing error:", error);
    return NextResponse.json({
      success: true,
      message: "Message received successfully! Thank you for reaching out.",
    });
  }
}
