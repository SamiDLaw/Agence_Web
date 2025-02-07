import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "./components/sections/HeroSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { PacksSection } from "./components/sections/PacksSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { TeamSection } from "./components/sections/TeamSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { NewsletterSection } from "./components/sections/NewsletterSection";
import { FaqSection } from "./components/sections/FaqSection";
import { ContactFormSection } from "./components/sections/ContactFormSection";
import { FooterSection } from "./components/sections/FooterSection";
import { PromoVideoSection } from "./components/sections/PromoVideoSection";
import { DroneCarousel } from "./components/sections/DroneCarousel";

const services = [
  {
    title: "Web Design",
    description: "Creation d'interfaces modernes et intuitives qui captivent vos visiteurs.",
    icon: "🎨",
  },
  {
    title: "Developpement Web",
    description: "Solutions sur mesure avec les dernieres technologies pour une performance optimale.",
    icon: "💻",
  },
  {
    title: "Production Video",
    description: "Contenu visuel percutant pour renforcer votre image de marque.",
    icon: "🎥",
  },
  {
    title: "Drone FPV",
    description: "Prises de vue aerienne uniques et immersives pour des videos spectaculaires.",
    icon: "🚁",
  },
];

const webPacks = [
  {
    id: 1,
    name: "Room Visibilite",
    price: "450€",
    subtitle: "Présence web essentielle",
    description: "Pour les petites entreprises ou independants souhaitant une presence web rapide et efficace.",
    features: [
      "Site web one-page professionnel",
      "Design responsive",
      "Optimisation SEO de base",
      "Formulaire de contact integre",
      "Hebergement + nom de domaine inclus (1 an)",
      "Option drone FPV disponible (+350€)",
    ],
  },
  {
    id: 2,
    name: "Suite Business",
    price: "950€",
    subtitle: "Solution complète",
    description: "Une solution complete pour les entreprises souhaitant une presence web professionnelle et performante.",
    features: [
      "Site web multi-pages",
      "Design personnalise",
      "Optimisation SEO avancee",
      "Integration CMS",
      "Systeme de blog",
      "Support technique (3 mois)",
      "Option drone FPV disponible (+300€)",
    ],
    popular: true
  },
  {
    id: 3,
    name: "E-commerce Start",
    price: "1450€",
    subtitle: "Boutique en ligne",
    description: "Lancez votre boutique en ligne avec une solution e-commerce complete et performante.",
    features: [
      "Site e-commerce complet",
      "Jusqu'a 100 produits",
      "Integration paiement",
      "Gestion des stocks",
      "Panel administration",
      "Formation utilisation",
      "Option drone FPV disponible (+250€)",
    ],
  },
  {
    id: 4,
    name: "Enterprise Plus",
    price: "Sur mesure",
    subtitle: "Solution personnalisée",
    description: "Une solution sur mesure pour les grandes entreprises avec des besoins specifiques.",
    features: [
      "Developpement sur mesure",
      "Architecture personnalisee",
      "Integration API",
      "Securite renforcee",
      "Support premium",
      "Formation equipe",
      "Option drone FPV incluse",
    ],
  },
];

const mediaPacks = [
  {
    id: 5,
    name: "Video Corporate",
    price: "750€",
    subtitle: "Présentation d'entreprise",
    description: "Une video professionnelle pour presenter votre entreprise et vos services.",
    features: [
      "Video HD 2-3 minutes",
      "Tournage 1/2 journee",
      "Montage professionnel",
      "Musique libre de droits",
      "2 revisions incluses",
      "Option drone FPV (+200€)",
    ],
  },
  {
    id: 6,
    name: "Pack Event",
    price: "950€",
    subtitle: "Couverture événementielle",
    description: "Capturez vos evenements avec une equipe video professionnelle.",
    features: [
      "Couverture complete",
      "Montage multi-cameras",
      "Interview participants",
      "Resume video 5 min",
      "Photos evenement",
      "Option drone FPV (+300€)",
    ],
    popular: true
  },
  {
    id: 7,
    name: "Serie Web",
    price: "1950€",
    subtitle: "Contenu régulier",
    description: "Production de contenu video regulier pour vos reseaux sociaux.",
    features: [
      "4 videos par mois",
      "Format optimise social",
      "Scenario sur mesure",
      "Montage dynamique",
      "Sous-titres inclus",
      "Option drone FPV (+200€/video)",
    ],
  },
  {
    id: 8,
    name: "Production Premium",
    price: "Sur mesure",
    subtitle: "Production complète",
    description: "Production video haut de gamme pour vos projets les plus ambitieux.",
    features: [
      "Equipe complete",
      "Materiel cinema",
      "Drone FPV inclus",
      "Post-production avancee",
      "Etalonnage pro",
      "Distribution possible",
    ],
  },
];

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection services={services} />
      <PacksSection webPacks={webPacks} mediaPacks={mediaPacks} />
      <DroneCarousel />
      <ProjectsSection />
      <PromoVideoSection />
      <TeamSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FaqSection />
      <ContactFormSection />
      <FooterSection />
    </main>
  );
}