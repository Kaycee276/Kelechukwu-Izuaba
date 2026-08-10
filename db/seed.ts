import { db } from "./index";
import { projects } from "./schema";

const initialProjects = [
  {
    title: "Chesster",
    description:
      "Chesster is an online two-player chess game where players create or join sessions using shareable game codes, with all moves validated and tracked in real time. Every game and its full move history are saved to a database, ensuring a persistent and reliable playing experience.",
    tags: JSON.stringify([
      "React",
      "TypeScript",
      "Javascript",
      "Tailwind",
      "NodeJS",
      "Express",
      "Supabase",
      "socket.io",
      "zustand",
      "axios",
      "Solidity",
      "Foundry",
      "reown/appkit",
      "ethers.js",
    ]),
    link: "https://chesster-lovat.vercel.app",
    repo: "https://github.com/Kaycee276/Chesster",
  },
  {
    title: "Midas",
    description:
      "A micro-investment platform that connects university students with verified campus merchants. Students invest small amounts in local businesses they use and trust, while merchants raise capital through a KYC-verified onboarding process.",
    tags: JSON.stringify([
      "React",
      "TypeScript",
      "Tailwind",
      "NodeJS",
      "Express",
      "Supabase",
      "NodeMailer",
      "socket.io",
      "supabase",
      "recharts",
      "zustand",
      "axios",
    ]),
    link: "https://midas-peach-chi.vercel.app",
    repo: "https://github.com/Kaycee276/Midas",
  },
  {
    title: "Rhitta",
    description:
      "Rhitta is a next-generation decentralized music streaming platform that leverages Somnia Data Streams (SDS) to deliver real-time, reactive music experiences on the blockchain.",
    tags: JSON.stringify([
      "React",
      "TypeScript",
      "Tailwind",
      "zustand",
      "Buffer",
      "NodeJS",
      "Express",
      "multer",
      "music-metadata",
      "Supabase",
      "WebAudioPlayer",
      "Rainbow-kit",
      "Somnia Data Streams",
    ]),
    link: "https://rhitta.vercel.app",
    repo: "https://github.com/Kaycee276/Rhitta",
  },
  {
    title: "Escaza",
    description:
      "Escaza is a web-based application built to digitize the logbook experience for IT (Industrial Training) students. It helps students avoid errors while filling their physical logbooks and provides smart features like grammar checking, reminders, and even AI-generated entries based on existing writing.",
    tags: JSON.stringify([
      "React",
      "JavaScript",
      "TypeScript",
      "Framer",
      "Tailwind",
      "NodeJS",
      "Express",
      "Supabase",
      "Google Auth",
      "Chart.js",
    ]),
    link: "https://escaza.vercel.app",
    repo: "https://github.com/Kaycee276/Escaza",
  },
  {
    title: "Sundao",
    description:
      "An opensource dapp to be used to co-ordinate user payment for energy",
    tags: JSON.stringify(["React", "Framer", "JavaScript", "Tailwind"]),
    link: "https://payer-dapp.vercel.app",
    repo: "https://github.com/IDEA-godwin/payer-dapp",
  },
  {
    title: "Mini Geo Guesser",
    description:
      "Test Your Geography Knowledge, Challenge yourself to identify locations around the world. Make your guess, answer questions, and see how well you know our planet!",
    tags: JSON.stringify(["Solidity", "foundry", "ethers.js"]),
    link: null,
    repo: "https://github.com/solomonadzape95/mini-geo-guesser",
  },
  {
    title: "Aboki.eth",
    description:
      "Aboki.eth is a decentralized Web3 protocol that allows users to stake digital assets, access fiat loans, and repay to reclaim assets with rewards—without the need for intermediaries.",
    tags: JSON.stringify(["React", "JavaScript", "AppKit", "Framer", "Tailwind"]),
    link: "https://abokieth.vercel.app",
    repo: "https://github.com/Kaycee276/Aboki",
  },
  {
    title: "Switch Dashboard",
    description:
      "The official explorer for the m3tering protocol, providing real-time insights into energy consumption and device performance.",
    tags: JSON.stringify(["React", "Typescript", "Tailwind", "chart.js", "Next.js"]),
    link: "https://m3terscan-monorepo.vercel.app/",
    repo: "https://github.com/Kaycee276/m3terscan-monorepo",
  },
  {
    title: "Twitpay",
    description:
      "Twitpay is a decentralized social payment platform that enables users to create and claim cryptocurrency giveaways through Twitter integration and blockchain technology.",
    tags: JSON.stringify([
      "React",
      "JavaScript",
      "TypeScript",
      "Framer",
      "Tailwind",
      "NodeJS",
      "Express",
      "Supabase",
      "social auth",
      "Appkit",
      "Foundry",
    ]),
    link: "https://twitpay.vercel.app",
    repo: "https://github.com/Kaycee276/Twitpay",
  },
  {
    title: "Node-Reg-No",
    description:
      "Node-reg-no is a Node.js application that allows users to upload PDF files and extract registration numbers from them.",
    tags: JSON.stringify(["Node.js", "Express", "REST", "pdf-parse", "postgresql", "postman"]),
    link: null,
    repo: "https://github.com/Kaycee276/Node-reg-no/",
  },
  {
    title: "Super-Space",
    description:
      "Decentralized App to join audio conversations around Web3 topics with Solana-powered space",
    tags: JSON.stringify(["React", "Appkit", "Javascript", "Tailwind"]),
    link: null,
    repo: "https://github.com/vancube2/Super-Space/",
  },
];

async function seed() {
  console.log("Seeding database...");
  const existing = await db.select().from(projects);
  if (existing.length === 0) {
    for (const project of initialProjects) {
      await db.insert(projects).values(project);
    }
    console.log("Database seeded successfully with initial projects!");
  } else {
    console.log(`Database already has ${existing.length} projects. Skipping seed.`);
  }
}

seed().catch(console.error);
