import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@db/index";
import { projects, messages } from "@db/schema";
import { desc } from "drizzle-orm";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const revalidate = 0;

export default async function SecretAdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== "authenticated") {
    redirect("/sys-x92-vault/login");
  }

  const rawProjects = db
    .select()
    .from(projects)
    .orderBy(desc(projects.id))
    .all();
  const rawMessages = db
    .select()
    .from(messages)
    .orderBy(desc(messages.id))
    .all();

  const formattedProjects = rawProjects.map((p) => {
    let parsedTags: string[] = [];
    try {
      parsedTags = JSON.parse(p.tags);
    } catch {
      parsedTags = p.tags.split(",").map((t) => t.trim());
    }
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      tags: parsedTags,
      link: p.link,
      repo: p.repo,
      createdAt: p.createdAt,
    };
  });

  return (
    <AdminDashboardClient
      initialProjects={formattedProjects}
      initialMessages={rawMessages}
    />
  );
}
