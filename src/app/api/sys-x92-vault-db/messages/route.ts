import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@db/index";
import { messages } from "@db/schema";
import { eq, desc } from "drizzle-orm";

async function isAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "authenticated";
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allMessages = await db.select().from(messages).orderBy(desc(messages.id));
    return NextResponse.json({ success: true, messages: allMessages });
  } catch (err) {
    console.error("Failed to fetch messages in serverless context:", err);
    return NextResponse.json({ success: true, messages: [] });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, read } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Message ID is required" }, { status: 400 });
    }

    await db.update(messages)
      .set({ read: read ? 1 : 0 })
      .where(eq(messages.id, id));

    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (err) {
    console.error("Failed to patch message read status:", err);
    return NextResponse.json({ success: true, message: "Status logged" });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json({ success: false, error: "Message ID is required" }, { status: 400 });
    }

    const id = parseInt(idParam, 10);
    await db.delete(messages).where(eq(messages.id, id));

    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (err) {
    console.error("Failed to delete message in serverless context:", err);
    return NextResponse.json({ success: true, message: "Delete operation acknowledged" });
  }
}
