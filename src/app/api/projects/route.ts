import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@db/index";
import { projects } from "@db/schema";
import { eq, desc } from "drizzle-orm";

async function isAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "authenticated";
}

export async function GET() {
  try {
    const allProjects = db
      .select()
      .from(projects)
      .orderBy(desc(projects.id))
      .all();
    const formatted = allProjects.map((p) => {
      let parsedTags: string[] = [];
      try {
        parsedTags = JSON.parse(p.tags);
      } catch {
        parsedTags = p.tags.split(",").map((t) => t.trim());
      }
      return { ...p, tags: parsedTags };
    });

    return NextResponse.json({ success: true, projects: formatted });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { title, description, tags, link, repo } = await request.json();

    if (!title || !description || !tags) {
      return NextResponse.json(
        { success: false, error: "Title, description, and tags are required" },
        { status: 400 },
      );
    }

    let tagsString: string;
    if (Array.isArray(tags)) {
      tagsString = JSON.stringify(tags);
    } else if (typeof tags === "string") {
      const parsedArray = tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);
      tagsString = JSON.stringify(parsedArray);
    } else {
      tagsString = JSON.stringify([]);
    }

    const inserted = db
      .insert(projects)
      .values({
        title,
        description,
        tags: tagsString,
        link: link || null,
        repo: repo || null,
      })
      .returning()
      .get();

    return NextResponse.json({ success: true, project: inserted });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 },
      );
    }

    const id = parseInt(idParam, 10);
    db.delete(projects).where(eq(projects.id, id)).run();

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
