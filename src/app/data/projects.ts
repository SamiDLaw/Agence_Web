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
    id: "chanel-huile-or",
    title: "Chanel L'Huile D'Or",
    client: "Chanel",
    description: "Une expérience visuelle immersive pour le lancement du nouveau produit de beauté de Chanel, mettant en valeur la texture luxueuse et les reflets dorés de L'Huile D'Or.",
    thumbnail: "https://www.chanel.com/images//t_one///q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1920/huile-de-jasmin-revitalizing-facial-oil-1fl-oz--packshot-default-141510-8848869466142.jpg",
    category: "Vidéo",
    slug: "chanel-huile-or",
    year: 2024,
    services: ["Direction artistique", "Production vidéo", "Post-production"],
    videoUrl: "/videos/project-video1.mp4",
    images: [
      "https://www.chanel.com/images//t_one///q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1920/huile-de-jasmin-revitalizing-facial-oil-1fl-oz--packshot-default-141510-8848869466142.jpg",
      "https://www.chanel.com/images//t_one///q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1920/huile-de-jasmin-revitalizing-facial-oil-1fl-oz--packshot-alternative-141510-8848869498910.jpg",
      "https://www.chanel.com/images//t_one///q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1920/huile-de-jasmin-revitalizing-facial-oil-1fl-oz--texture-141510-8848869531678.jpg"
    ],
    featured: true
  },
  {
    id: "nike-sony-a6400",
    title: "Nike x Sony A6400",
    client: "Nike",
    description: "Production vidéo réalisée pour Nike en juin 2023, mettant en valeur l'appareil Sony A6400 dans un contexte sportif dynamique. Cette collaboration a permis de démontrer les capacités exceptionnelles de l'appareil pour capturer le mouvement et l'énergie propres à l'univers Nike.",
    thumbnail: "https://i.ytimg.com/vi/dHYTo6Da2aA/maxresdefault.jpg",
    category: "Vidéo",
    slug: "nike-sony-a6400",
    year: 2023,
    services: ["Production vidéo", "Direction artistique", "Post-production"],
    videoUrl: "/videos/Nike_Spec_Ad_Sony_A6400.mp4",
    images: [
      "https://i.ytimg.com/vi/dHYTo6Da2aA/maxresdefault.jpg",
      "https://i.ytimg.com/vi/dHYTo6Da2aA/hq720.jpg",
      "https://i.ytimg.com/vi/dHYTo6Da2aA/hqdefault.jpg"
    ],
    featured: true
  },
  {
    id: "microsoft-office",
    title: "Microsoft Office Apps",
    client: "Microsoft",
    description: "Refonte de l'interface utilisateur des applications Microsoft Office, avec une approche centrée sur l'expérience utilisateur et l'accessibilité.",
    thumbnail: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OAgf?ver=bea5",
    category: "Web",
    slug: "microsoft-office",
    year: 2023,
    services: ["UI/UX Design", "Développement frontend", "Tests utilisateurs"],
    images: [
      "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OAgf?ver=bea5",
      "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4HCq3?ver=5d8a",
      "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4HzAo?ver=5539"
    ]
  },
  {
    id: "ikea-play-light",
    title: "IKEA Play Of Light",
    client: "IKEA",
    description: "Série de vidéos mettant en scène les luminaires IKEA dans différents environnements, jouant avec les ombres et les reflets pour créer des ambiances uniques.",
    thumbnail: "https://www.ikea.com/global/assets/range-categorisation/images/pendant-lamps-10731.jpeg?imwidth=500",
    category: "Vidéo",
    slug: "ikea-play-light",
    year: 2023,
    services: ["Production vidéo", "Direction photo", "Montage"],
    videoUrl: "/videos/project-video2.mp4",
    images: [
      "https://www.ikea.com/global/assets/range-categorisation/images/pendant-lamps-10731.jpeg?imwidth=500",
      "https://www.ikea.com/global/assets/navigation/images/table-lamps-10732.jpeg?imwidth=500",
      "https://www.ikea.com/global/assets/range-categorisation/images/floor-lamps-20492.jpeg?imwidth=500"
    ],
    featured: true
  },
  {
    id: "loreal-digital",
    title: "L'Oréal Digital Presence",
    client: "L'Oréal",
    description: "Stratégie de présence digitale pour L'Oréal, incluant la gestion des réseaux sociaux, la création de contenu et l'analyse des performances.",
    thumbnail: "https://www.loreal.com/-/media/project/loreal/brand-sites/corp/master/emea/articles/2023/04/loreal-paris-age-perfect-cell-renew/loreal-paris-age-perfect-cell-renew-article-picture.jpg?rev=8b9a5c4cf2034d0f9e5c1e5f4c4a1a6f",
    category: "Community Management",
    slug: "loreal-digital",
    year: 2023,
    services: ["Stratégie digitale", "Création de contenu", "Analyse de données"],
    images: [
      "https://www.loreal.com/-/media/project/loreal/brand-sites/corp/master/emea/articles/2023/04/loreal-paris-age-perfect-cell-renew/loreal-paris-age-perfect-cell-renew-article-picture.jpg?rev=8b9a5c4cf2034d0f9e5c1e5f4c4a1a6f",
      "https://www.loreal.com/-/media/project/loreal/brand-sites/corp/master/emea/articles/2023/03/loreal-paris-glycolic-bright/loreal-paris-glycolic-bright-article-picture.jpg?rev=b0d8b8f9c6e54e9b9d2c3b3e9c3a3a3e",
      "https://www.loreal.com/-/media/project/loreal/brand-sites/corp/master/emea/articles/2023/02/loreal-paris-elvive-bond-repair/loreal-paris-elvive-bond-repair-article-picture.jpg?rev=9c3a3a3e9c3a3a3e9c3a3a3e9c3a3a3e"
    ]
  },
  {
    id: "bmw-i4",
    title: "BMW i4",
    client: "BMW",
    description: "Film promotionnel pour la BMW i4, mettant en valeur le design élégant et les performances électriques de ce véhicule innovant.",
    thumbnail: "https://www.bmw.fr/content/dam/bmw/common/all-models/i-series/i4/2021/highlights/bmw-i4-m50-onepager-sp-desktop.jpg",
    category: "Vidéo",
    slug: "bmw-i4",
    year: 2022,
    services: ["Production vidéo", "Drone FPV", "Post-production"],
    videoUrl: "/videos/project-video3.mp4",
    images: [
      "https://www.bmw.fr/content/dam/bmw/common/all-models/i-series/i4/2021/highlights/bmw-i4-m50-onepager-sp-desktop.jpg",
      "https://www.bmw.fr/content/dam/bmw/common/all-models/i-series/i4/2021/onepager/bmw-i4-onepager-ms-equipment-01-desktop.jpg",
      "https://www.bmw.fr/content/dam/bmw/common/all-models/i-series/i4/2021/onepager/bmw-i4-onepager-ms-equipment-02-desktop.jpg"
    ]
  },
  {
    id: "hermes-seasons",
    title: "Hermès Seasons",
    client: "Hermès",
    description: "Série de visuels pour les collections saisonnières d'Hermès, avec une direction artistique inspirée des éléments naturels propres à chaque saison.",
    thumbnail: "https://assets.hermes.com/is/image/hermesproduct/h-embroidered-sweater--072025HA01-worn-1-0-0-800-800_g.jpg",
    category: "Design",
    slug: "hermes-seasons",
    year: 2022,
    services: ["Direction artistique", "Photographie", "Design graphique"],
    images: [
      "https://assets.hermes.com/is/image/hermesproduct/h-embroidered-sweater--072025HA01-worn-1-0-0-800-800_g.jpg",
      "https://assets.hermes.com/is/image/hermesproduct/les-jardins-d-armenie-shawl-140--243648S-worn-1-0-0-800-800_g.jpg",
      "https://assets.hermes.com/is/image/hermesproduct/h-en-biais-bag-charm--074954CKAA-worn-1-0-0-800-800_g.jpg"
    ],
    featured: true
  },
  {
    id: "adidas-boost",
    title: "Adidas Boost",
    client: "Adidas",
    description: "Animation 3D mettant en valeur la technologie Boost d'Adidas, avec une exploration détaillée de la structure et des performances de la semelle.",
    thumbnail: "https://assets.adidas.com/images/w_600,f_auto,q_auto/9e940d8a4d8d419a9effaf1e00a3291d_9366/Chaussure_Ultraboost_1.0_Gris_HQ4199_01_standard.jpg",
    category: "Design",
    slug: "adidas-boost",
    year: 2022,
    services: ["Animation 3D", "Design technique", "Rendu"],
    images: [
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/9e940d8a4d8d419a9effaf1e00a3291d_9366/Chaussure_Ultraboost_1.0_Gris_HQ4199_01_standard.jpg",
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/c2a18c4e3f104d52a00baf1e00a33a3a_9366/Chaussure_Ultraboost_1.0_Gris_HQ4199_02_standard_hover.jpg",
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/a6b1c25b4f5d4f0e8c6aaf1e00a34f9e_9366/Chaussure_Ultraboost_1.0_Gris_HQ4199_05_standard.jpg"
    ]
  }
];
