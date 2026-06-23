import {
  smartcollab1, smartcollab2, smartcollab3,
  chatbot1, chatbot2, chatbot3,
  ecommerce1, ecommerce2, ecommerce3, ecommerce4,
  iavicitelecom1, iavicitelecom2, iavicitelecom3, iavicitelecom4,
} from "./assets";

// ─── DATA: PROJECTS ───────────────────────────────────────────────
export const PROJECTS = [
  {
    title: "Smart Collaboration APP",
    subtitle: "Platerforme de collaboration intelligente pour équipes distantes",
    desc: "Plateforme REST API & haute performance avec rate limiting, auth JWT, gestion de tache et dashboard analytics.",
    longDesc:
      "Application moderne de collaboration conçue pour optimiser la communication et la gestion des projets au sein des équipes distantes. Basée sur une architecture REST API performante, elle intègre une authentification sécurisée via JWT, un système avancé de gestion des tâches, le suivi des projets en temps réel et un tableau de bord analytique interactif. La plateforme inclut également des mécanismes de rate limiting pour renforcer la sécurité et garantir la stabilité des services, tout en offrant une expérience utilisateur fluide, évolutive et adaptée aux environnements de travail collaboratifs.",
    tags: ["Node.js", "Rest API", "MongoDB", "Tailwind CSS", "Docker"],
    role: "Dev full-stack",
    year: "2026",
    github: "https://github.com/Herimanda/Smart-collab",
    screenshots: [smartcollab1, smartcollab2, smartcollab3],
  },
  {
    title: "ChatApp",
    subtitle: "Chat interne temps réel avec assistant IA intégré",
    desc: "ChatApp est une application web de communication interne offrant une messagerie moderne et des échanges en temps réel au sein d'une organisation.",
    longDesc:
      "ChatApp est une application web de communication interne développée avec la stack MERN offrant une messagerie moderne et des échanges en temps réel au sein d'une organisation.",
    tags: ["React", "Node Js", "MongoDB", "TypeScript"],
    role: "Full-Stack",
    year: "2025",
    github: "https://github.com/Herimanda/Chatbot/",
    screenshots: [chatbot1, chatbot2, chatbot3],
  },
  {
    title: "ANIME",
    subtitle: "Plateforme E-commerce pour produits dérivés d'anime",
    desc: "ANIME est une plateforme e-commerce dédiée aux produits dérivés d'anime, offrant une expérience d'achat simple, personnalisée et intuitive.",
    longDesc:
      "ANIME est une plateforme e-commerce dédiée aux produits dérivés d'anime, développée avec React JS et une architecture backend basée sur Node.js et MongoDB. Elle offre une expérience utilisateur immersive avec des fonctionnalités de personnalisation avancées.",
    tags: ["React js", "Node JS", "MongoDB", "Docker"],
    role: "Full-Stack",
    year: "2024",
    github: "https://github.com/Herimanda/",
    screenshots: [ecommerce1, ecommerce2, ecommerce3, ecommerce4],
  },
  {
    title: "IA Vicitelecom",
    subtitle: "IA d'appel de Prospection pour Vicitelecom",
    desc: "IA vicitelecom est une solution d'appel de prospection automatisée utilisant l'IA pour engager les prospects de manière naturel",
    longDesc:
      "IA Vicitelecom est une solution d'appel de prospection automatisée développée avec Node.js et intégrant des technologies d'IA avancées pour engager les prospects de manière naturelle et efficace.",
    tags: ["React Js", "Node js", "MongoDB", "Asterisk", "Docker"],
    role: "Frontend Developer",
    year: "2026",
    github: "https://github.com/Herimanda/",
    screenshots: [iavicitelecom1, iavicitelecom2, iavicitelecom3, iavicitelecom4],
  },
];