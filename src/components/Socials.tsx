import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export interface SocialLink {
	name: string;
	url: string;
	icon: React.ReactElement;
}

const socials: SocialLink[] = [
	{
		name: "GitHub",
		url: "https://github.com/Kaycee276",
		icon: <FaGithub className="text-xl sm:text-2xl" />,
	},
	{
		name: "LinkedIn",
		url: "https://www.linkedin.com/in/kenneth-kelechukwu-izuaba-245658294/",
		icon: <FaLinkedin className="text-xl sm:text-2xl" />,
	},
	{
		name: "Twitter",
		url: "https://x.com/kc_deblocksmith",
		icon: <FaTwitter className="text-xl sm:text-2xl" />,
	},
];

export default function Socials({ horizontal = false }: { horizontal?: boolean }) {
	return (
		<div className={`flex items-center gap-4 ${horizontal ? "flex-row" : "flex-col p-4"}`}>
			<ul className={`flex ${horizontal ? "flex-row gap-6" : "flex-col gap-6"}`}>
				{socials.map((social) => (
					<li key={social.name}>
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-[#e85d04] transition-colors"
						>
							{social.icon}
						</a>
					</li>
				))}
			</ul>
			{!horizontal && <div className="w-[3px] h-8 bg-white/70"></div>}
		</div>
	);
}
