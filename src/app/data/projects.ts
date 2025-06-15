import { getVideoUrl } from "./cloudinary-urls";

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
    id: "comores-fashion",
    title: "Collection Traditionnelle Comorienne",
    client: "Comores Fashion",
    description: "Direction artistique et production photo pour la première collection de vêtements traditionnels comoriens revisités. Ce shooting met en valeur l'élégance et l'authenticité des tissus et motifs comoriens dans une approche contemporaine et raffinée.",
    thumbnail: "/images/PKLS7608.png",
    category: "Photo",
    slug: "comores-fashion",
    year: 2025,
    services: ["Direction artistique", "Photographie de mode", "Stylisme", "Post-production"],
    images: [
      "/images/PKLS7608.png",
      "/images/PKLS7621.png",
      "/images/PKLS7715.png",
      "/images/PKLS7725.png"
    ],
    featured: true
  },
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
    videoUrl: "https://res.cloudinary.com/dckyksspe/video/upload/v1749980736/lawgency/uludag-video-1.mp4",
    images: [
      "/images/PKLS9028.png",
      "/images/PKLS9076.png",
      "/images/PKLS9066.png",
      "/images/PKLS9073.png"
    ],
    featured: true
  },
  {
    id: "chanel-n5",
    title: "Chanel N°5 - Animation 3D",
    client: "Chanel",
    description: "Animation 3D cinématique mettant en scène l'iconique flacon de parfum Chanel N°5. Cette réalisation sublime le design intemporel du produit à travers un jeu d'éclairages sophistiqués et une mise en scène épurée qui reflète l'élégance et le raffinement de la marque. La vidéo capture l'essence du luxe à la française avec des mouvements fluides et une attention particulière aux détails.",
    thumbnail: "/images/chanel-1.png",
    category: "Vidéo",
    slug: "chanel-n5",
    year: 2024,
    services: ["Animation 3D", "Direction artistique", "Rendu et éclairage", "Post-production"],
    videoUrl: getVideoUrl("/videos/Chanel-N5.mp4", "Chanel-N5"),
    images: [
      "/images/chanel-1.png",
      "/images/chanel-2.png",
      "/images/chanel-3.png"
    ],
    featured: true
  },
  {
    id: "nike-sony-a6400",
    title: "Nike x Sony A6400",
    client: "Nike",
    description: "Production vidéo réalisée pour Nike en juin 2023, mettant en valeur l'appareil Sony A6400 dans un contexte sportif dynamique. Cette collaboration a permis de démontrer les capacités exceptionnelles de l'appareil pour capturer le mouvement et l'énergie propres à l'univers Nike.",
    thumbnail: "/images/photo-nike-1.png",
    category: "Vidéo",
    slug: "nike-sony-a6400",
    year: 2023,
    services: ["Production vidéo", "Direction artistique", "Post-production"],
    videoUrl: getVideoUrl("/videos/Nike_Spec_Ad_Sony_A6400.mp4", "Nike_Spec_Ad_Sony_A6400"),
    images: [
      "/images/photo-nike-1.png",
      "/images/photo-nike-2.png"
    ],
    featured: true
  },
  {
    id: "microsoft-office",
    title: "Microsoft Office Apps - Nouvelle Ère",
    client: "Microsoft",
    description: "Collaboration avec Microsoft pour illustrer la nouvelle ère de design des applications Office sous Windows 11. Notre équipe a créé un film immersif mettant en valeur les nouvelles interfaces épurées, les coins arrondis et le thème sombre adapté au système d'exploitation. Le concept visuel explore la transformation des formes physiques et numériques dans un mouvement synchronisé élégant, soulignant la nouvelle matérialité 'Mica' et les fonctionnalités collaboratives des applications.",
    thumbnail: "/images/microsoft/Microsoft-Office-UX-Brand-Film-Media.Work_.jpg",
    category: "Vidéo & Design",
    slug: "microsoft-office",
    year: 2023,
    services: ["Direction artistique", "Animation 3D", "Production vidéo", "UI/UX Design"],
    images: [
      "/images/microsoft/Microsoft-Office-UX-Brand-Film-Media.Work_.jpg",
      "/images/microsoft/Microsoft-Office-UX-Brand-Film-Media.Work2_.jpg",
      "/images/microsoft/Microsoft-Office-UX-Brand-Film-Media.Work4_.jpg",
      "/images/microsoft/Microsoft-Office-UX-Brand-Film-Media.Work5_.jpg"
    ]
  },
  {
    id: "damius-tricycle",
    title: "Damius - Tricycle Essentiel",
    client: "Damius",
    description: "Campagne vidéo mettant en valeur le tricycle Essentiel de la marque Damius, un véhicule électrique à trois roues conçu pour les seniors et personnes à mobilité réduite. Notre équipe a créé un film promotionnel soulignant les aspects pratiques, sécuritaires et l'autonomie qu'offre ce moyen de transport innovant. La réalisation met en lumière la facilité d'utilisation et l'accessibilité du produit dans un environnement quotidien.",
    thumbnail: "/images/damius/catalogue-tricycle-evasion.jpg",
    category: "Vidéo",
    slug: "damius-tricycle",
    year: 2024,
    services: ["Production vidéo", "Direction artistique", "Post-production"],
    videoUrl: getVideoUrl("/videos/Damius-01.mp4", "Damius-01"),
    images: [
      "/images/damius/Damius-velo-electrique-3-roues-accessible.jpg",
      "/images/damius/catalogue-tricycle-evasion.jpg"
    ],
    featured: true
  },
  {
    id: "fc-castellane",
    title: "FC La Castellane",
    client: "OM Fondation",
    description: "Reportage vidéo réalisé pour l'OM Fondation lors du lancement officiel du FC La Castellane, un nouveau club de football local créé en collaboration avec le centre social La Castellane. Cette production met en lumière l'importance du sport comme vecteur d'inclusion sociale et de développement pour les jeunes du quartier marseillais. Les images capturent l'enthousiasme des participants, l'engagement des éducateurs et le soutien de la communauté pour ce projet sportif et social.",
    thumbnail: "/images/fc-castellane-1.jpg",
    category: "Vidéo",
    slug: "fc-castellane",
    year: 2024,
    services: ["Reportage vidéo", "Montage", "Production sociale"],
    videoUrl: getVideoUrl("/videos/vidéo-fc-castellane.mp4", "video-fc-castellane"),
    images: [
      "/images/fc-castellane-1.jpg",
      "/images/fc-castellane-2.jpg"
    ],
    featured: true
  },
  {
    id: "legend-boxing-marseille",
    title: "Legend Boxing Marseille",
    client: "Legend Boxing",
    description: "Campagne promotionnelle réalisée pour le club de boxe Legend Boxing situé à Marseille. Cette production vidéo dynamique met en lumière l'intensité des entraînements, la passion des boxeurs et l'ambiance unique du club. Les séquences captent l'essence de ce sport exigeant tout en valorisant les installations modernes et l'encadrement professionnel offerts par Legend Boxing.",
    thumbnail: "/images/boxe-1.png",
    category: "Vidéo",
    slug: "legend-boxing-marseille",
    year: 2024,
    services: ["Production vidéo", "Direction artistique", "Post-production"],
    videoUrl: getVideoUrl("/videos/pub-marseille-boxe-compressed.mp4", "pub-marseille-boxe-compressed"),
    images: [
      "/images/boxe-1.png",
      "/images/boxe-2.png",
      "/images/boxe-3.png"
    ],
    featured: true
  },
  {
    id: "vrunk-streetwear",
    title: "Vrunk Streetwear",
    client: "Vrunk",
    description: "Campagne promotionnelle réalisée pour Vrunk, une marque de vêtements streetwear en pleine expansion. Notre équipe a conçu et produit un shooting photo professionnel ainsi qu'une vidéo publicitaire pour mettre en valeur leur nouvelle collection. Le style visuel urbain et contemporain reflète l'identité de la marque, ciblant un public jeune et branché. La stratégie de communication s'articule autour des réseaux sociaux, notamment TikTok, pour maximiser l'engagement et la visibilité de la marque.",
    thumbnail: "/images/vrunk/vrunk-1.png",
    category: "Vidéo",
    slug: "vrunk-streetwear",
    year: 2023,
    services: ["Production vidéo", "Shooting photo", "Direction artistique"],
    videoUrl: getVideoUrl("/videos/vidéo-vrunk.mp4", "video-vrunk"),
    images: [
      "/images/vrunk/vrunk-1.png",
      "/images/vrunk/vrunk-2.png",
      "/images/vrunk/vrunk-3.png"
    ],
    featured: true
  }
];
