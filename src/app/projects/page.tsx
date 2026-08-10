import { db } from "@db/index";
import { projects } from "@db/schema";
import { desc } from "drizzle-orm";
import ProjectsClient, { ProjectItem } from "@/components/ProjectsClient";

export const revalidate = 0; // Disable caching so new projects appear dynamically

export default async function ProjectsPage() {
	const rawProjects = await db.select().from(projects).orderBy(desc(projects.id));

	const formattedProjects: ProjectItem[] = rawProjects.map((p) => {
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
		};
	});

	return <ProjectsClient projects={formattedProjects} />;
}
