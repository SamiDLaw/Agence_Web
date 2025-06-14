export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  thumbnail: string;
  category: string;
  slug: string;
  year: number;
  services: string[];
  videoUrl?: string;
  images: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "uludag-restaurant",
    title: "Restaurant Turc News Uludag",
    client: "Uludag",
    description: "Campagne visuelle et vidéo pour le restaurant turc News Uludag à Marignane, mettant en valeur l'ambiance authentique, les plats traditionnels et l'expérience culinaire unique offerte par l'établissement.",
    thumbnail: "/images/PKLS9028.png",
    category: "Vidéo & Photo",
    slug: "uludag-restaurant",
    year: 2025,
    services: ["Production vidéo", "Photographie culinaire", "Direction artistique"],
    videoUrl: "/videos/uludag-video-1.mp4",
    images: [
      "/images/PKLS9028.png",
      "/images/PKLS9076.png",
      "/images/PKLS9066.png",
      "/images/PKLS9073.png"
    ],
    featured: true
  },
  {
    id: "chanel-huile-or",
    title: "Chanel L'Huile D'Or",
    client: "Chanel",
    description: "Une expérience visuelle immersive pour le lancement du nouveau produit de beauté de Chanel, mettant en valeur la texture luxueuse et les reflets dorés de L'Huile D'Or.",
    thumbnail: "/images/projects/project-1.jpg",
    category: "Vidéo",
    slug: "chanel-huile-or",
    year: 2024,
    services: ["Direction artistique", "Production vidéo", "Post-production"],
    videoUrl: "/videos/project-video1.mp4",
    images: [
      "/images/projects/project-1.jpg",
      "/images/projects/project-2.jpg",
      "/images/projects/project-3.jpg"
    ],
    featured: true
  },
  {
    id: "nike-invincible",
    title: "Nike Invincible 3",
    client: "Nike",
    description: "Campagne visuelle dynamique pour le lancement des nouvelles Nike Invincible 3, mettant en avant la technologie de la semelle et le confort exceptionnel de la chaussure.",
    thumbnail: "/images/projects/project-2.jpg",
    category: "Design",
    slug: "nike-invincible",
    year: 2024,
    services: ["Direction artistique", "Design 3D", "Animation"],
    images: [
      "/images/projects/project-2.jpg",
      "/images/projects/project-3.jpg",
      "/images/projects/project-4.jpg"
    ],
    featured: true
  },
  {
    id: "microsoft-office",
    title: "Microsoft Office Apps",
    client: "Microsoft",
    description: "Refonte de l'interface utilisateur des applications Microsoft Office, avec une approche centrée sur l'expérience utilisateur et l'accessibilité.",
    thumbnail: "/images/projects/project-3.jpg",
    category: "Web",
    slug: "microsoft-office",
    year: 2023,
    services: ["UI/UX Design", "Développement frontend", "Tests utilisateurs"],
    images: [
      "/images/projects/project-3.jpg",
      "/images/projects/project-4.jpg",
      "/images/projects/project-5.jpg"
    ]
  },
  {
    id: "ikea-play-light",
    title: "IKEA Play Of Light",
    client: "IKEA",
    description: "Série de vidéos mettant en scène les luminaires IKEA dans différents environnements, jouant avec les ombres et les reflets pour créer des ambiances uniques.",
    thumbnail: "/images/projects/project-4.jpg",
    category: "Vidéo",
    slug: "ikea-play-light",
    year: 2023,
    services: ["Production vidéo", "Direction photo", "Montage"],
    videoUrl: "/videos/project-video2.mp4",
    images: [
      "/images/projects/project-4.jpg",
      "/images/projects/project-5.jpg",
      "/images/projects/project-1.jpg"
    ],
    featured: true
  },
  {
    id: "loreal-digital",
    title: "L'Oréal Digital Presence",
    client: "L'Oréal",
    description: "Stratégie de présence digitale pour L'Oréal, incluant la gestion des réseaux sociaux, la création de contenu et l'analyse des performances.",
    thumbnail: "/images/projects/project-5.jpg",
    category: "Community Management",
    slug: "loreal-digital",
    year: 2023,
    services: ["Stratégie digitale", "Création de contenu", "Analyse de données"],
    images: [
      "/images/projects/project-5.jpg",
      "/images/projects/project-1.jpg",
      "/images/projects/project-2.jpg"
    ]
  },
  {
    id: "bmw-i4",
    title: "BMW i4",
    client: "BMW",
    description: "Film promotionnel pour la BMW i4, mettant en valeur le design élégant et les performances électriques de ce véhicule innovant.",
    thumbnail: "/images/projects/project-1.jpg",
    category: "Vidéo",
    slug: "bmw-i4",
    year: 2022,
    services: ["Production vidéo", "Drone FPV", "Post-production"],
    videoUrl: "/videos/project-video3.mp4",
    images: [
      "/images/projects/project-1.jpg",
      "/images/projects/project-2.jpg",
      "/images/projects/project-3.jpg"
    ]
  },
  {
    id: "hermes-seasons",
    title: "Hermès Seasons",
    client: "Hermès",
    description: "Série de visuels pour les collections saisonnières d'Hermès, avec une direction artistique inspirée des éléments naturels propres à chaque saison.",
    thumbnail: "/images/projects/project-2.jpg",
    category: "Design",
    slug: "hermes-seasons",
    year: 2022,
    services: ["Direction artistique", "Photographie", "Design graphique"],
    images: [
      "/images/projects/project-2.jpg",
      "/images/projects/project-3.jpg",
      "/images/projects/project-4.jpg"
    ],
    featured: true
  },
  {
    id: "adidas-boost",
    title: "Adidas Boost",
    client: "Adidas",
    description: "Animation 3D mettant en valeur la technologie Boost d'Adidas, avec une exploration détaillée de la structure et des performances de la semelle.",
    thumbnail: "/images/projects/project-3.jpg",
    category: "Design",
    slug: "adidas-boost",
    year: 2022,
    services: ["Animation 3D", "Design technique", "Rendu"],
    images: [
      "/images/projects/project-3.jpg",
      "/images/projects/project-4.jpg",
      "/images/projects/project-5.jpg"
    ]
  }
];
