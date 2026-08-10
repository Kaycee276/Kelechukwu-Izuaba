import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaFileAlt } from "react-icons/fa";

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactElement;
}

const socials: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Kaycee276",
    icon: <FaGithub className="text-sm sm:text-lg md:text-xl" />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kenneth-kelechukwu-izuaba-245658294/",
    icon: <FaLinkedin className="text-sm sm:text-lg md:text-xl" />,
  },
  {
    name: "Twitter",
    url: "https://x.com/kc_deblocksmith",
    icon: <FaTwitter className="text-sm sm:text-lg md:text-xl" />,
  },
  {
    name: "CV / Resume",
    url: "https://docs.google.com/document/d/1c0acDeoCnhHPdQUknvOdlBjG2Ka4uGTjT3YnJuJdGQg/edit?usp=sharing",
    icon: <FaFileAlt className="text-sm sm:text-lg md:text-xl" />,
  },
];

export default function Socials({
  horizontal = false,
}: {
  horizontal?: boolean;
}) {
  return (
    <div
      className={`flex items-center ${horizontal ? "flex-row gap-4" : "flex-col gap-2 sm:gap-3 p-1 sm:p-2"}`}
    >
      <ul
        className={`flex ${horizontal ? "flex-row gap-4 sm:gap-6" : "flex-col gap-3 sm:gap-4 md:gap-6"}`}
      >
        {socials.map((social) => (
          <li key={social.name}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              className="text-white hover:text-[#e85d04] transition-colors"
            >
              {social.icon}
            </a>
          </li>
        ))}
      </ul>
      {!horizontal && (
        <div className="w-[2px] h-4 sm:h-6 md:h-8 bg-white/70"></div>
      )}
    </div>
  );
}
