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
      "Nexus est une plateforme API conçue pour les équipes engineering qui ont besoin de fiabilité à grande échelle. Elle expose un endpoint GraphQL unifié par-dessus plusieurs microservices, avec un système de rate limiting par tenant, authentification JWT avec rotation automatique des clés, et un moteur de logs temps réel basé sur WebSocket.",
    tags: ["Node.js", "Rest API", "MongoDB", "Tailwind CSS", "Docker"],
    role: "Dev full-stack",
    year: "2026",
    github: "https://github.com/Herimanda/",
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
    github: "https://github.com/Herimanda/",
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