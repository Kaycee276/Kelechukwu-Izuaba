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
		icon: <FaGithub className="text-lg sm:text-xl md:text-2xl" />,
	},
	{
		name: "LinkedIn",
		url: "https://www.linkedin.com/in/kenneth-kelechukwu-izuaba-245658294/",
		icon: <FaLinkedin className="text-lg sm:text-xl md:text-2xl" />,
	},
	{
		name: "Twitter",
		url: "https://x.com/kc_deblocksmith",
		icon: <FaTwitter className="text-lg sm:text-xl md:text-2xl" />,
	},
];

const Socials = () => {
	return (
		<div className="flex flex-col items-center gap-2 p-4">
			<ul className="flex flex-col gap-6">
				{socials.map((social) => (
					<li key={social.name}>
						<a href={social.url} target="_blank" rel="noopener noreferrer">
							{social.icon}
						</a>
					</li>
				))}
			</ul>
			<div className={`w-[3px] h-8 bg-white`}></div>
		</div>
	);
};

export default Socials;
