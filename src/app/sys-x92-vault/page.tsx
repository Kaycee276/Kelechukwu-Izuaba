import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@db/index";
import { projects, messages } from "@db/schema";
import { desc } from "drizzle-orm";
import AdminDashboardClient, { ProjectData, MessageData } from "@/components/AdminDashboardClient";

export const revalidate = 0;

export default async function SecretAdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== "authenticated") {
    redirect("/sys-x92-vault/login");
  }

  let formattedProjects: ProjectData[] = [];
  let formattedMessages: MessageData[] = [];

  try {
    const rawProjects = await db.select().from(projects).orderBy(desc(projects.id));
    if (rawProjects && rawProjects.length > 0) {
      formattedProjects = rawProjects.map((p) => {
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
    }
  } catch (err) {
    console.error("Admin Vault projects query fallback:", err);
  }

  try {
    const rawMessages = await db.select().from(messages).orderBy(desc(messages.id));
    if (rawMessages && rawMessages.length > 0) {
      formattedMessages = rawMessages;
    }
  } catch (err) {
    console.error("Admin Vault messages query fallback:", err);
  }

  return (
    <AdminDashboardClient
      initialProjects={formattedProjects}
      initialMessages={formattedMessages}
    />
  );
}
