import { db } from "./index";
import { projects } from "./schema";

const orderedProjects = [
  {
    id: 12,
    title: "KP",
    description:
      "KP provides an intuitive, multi-surface AI assistant accessible via Terminal CLI, Web Dashboard, and Telegram Bot. Users perform read/write onchain operations (balance checks, token transfers, smart contract calls) using plain English commands while their AI model keys and wallet execution remain secure and rate-limit resilient.",
    tags: JSON.stringify(["TypeScript", "Next.js", "LangChain", "PostgreSQL", "KeeperHub"]),
    link: "https://kp-three-mu.vercel.app/",
    repo: "https://github.com/Kaycee276/kp",
  },
  {
    id: 11,
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
    id: 10,
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
    id: 9,
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
    id: 8,
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
    id: 7,
    title: "Sundao",
    description:
      "An opensource dapp to be used to co-ordinate user payment for energy",
    tags: JSON.stringify(["React", "Framer", "JavaScript", "Tailwind"]),
    link: "https://payer-dapp.vercel.app",
    repo: "https://github.com/IDEA-godwin/payer-dapp",
  },
  {
    id: 6,
    title: "Mini Geo Guesser",
    description:
      "Test Your Geography Knowledge, Challenge yourself to identify locations around the world. Make your guess, answer questions, and see how well you know our planet!",
    tags: JSON.stringify(["Solidity", "foundry", "ethers.js"]),
    link: null,
    repo: "https://github.com/solomonadzape95/mini-geo-guesser",
  },
  {
    id: 5,
    title: "Aboki.eth",
    description:
      "Aboki.eth is a decentralized Web3 protocol that allows users to stake digital assets, access fiat loans, and repay to reclaim assets with rewards—without the need for intermediaries.",
    tags: JSON.stringify(["React", "JavaScript", "AppKit", "Framer", "Tailwind"]),
    link: "https://abokieth.vercel.app",
    repo: "https://github.com/Kaycee276/Aboki",
  },
  {
    id: 4,
    title: "Switch Dashboard",
    description:
      "The official explorer for the m3tering protocol, providing real-time insights into energy consumption and device performance.",
    tags: JSON.stringify(["React", "Typescript", "Tailwind", "chart.js", "Next.js"]),
    link: "https://m3terscan-monorepo.vercel.app/",
    repo: "https://github.com/Kaycee276/m3terscan-monorepo",
  },
  {
    id: 3,
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
    id: 2,
    title: "Node-Reg-No",
    description:
      "Node-reg-no is a Node.js application that allows users to upload PDF files and extract registration numbers from them.",
    tags: JSON.stringify(["Node.js", "Express", "REST", "pdf-parse", "postgresql", "postman"]),
    link: null,
    repo: "https://github.com/Kaycee276/Node-reg-no/",
  },
  {
    id: 1,
    title: "Super-Space",
    description:
      "Decentralized App to join audio conversations around Web3 topics with Solana-powered space",
    tags: JSON.stringify(["React", "Appkit", "Javascript", "Tailwind"]),
    link: null,
    repo: "https://github.com/vancube2/Super-Space/",
  },
];

async function reorder() {
  console.log("Re-ordering database projects via libSQL...");
  await db.delete(projects);

  for (const item of orderedProjects) {
    await db.insert(projects).values(item);
  }
  console.log("Database reordered successfully!");
}

reorder().catch(console.error);
