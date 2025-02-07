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
    name: "Shamble Visibilité",
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
    name: "Room Business",
    price: "850€",
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
    name: "Ope-Ope Shop",
    price: "1350€",
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
    name: "Starter",
    price: "350€",
    subtitle: "Lancement local",
    description: "Pour les artisans, commerçants, ou petites entreprises souhaitant améliorer leur présence locale.",
    features: [
      "Vidéo promotionnelle (30-60 secondes)",
      "Optimisation réseaux sociaux",
      "10 photos professionnelles",
      "Format adapté Instagram/TikTok/Facebook",
      "Livraison express sous 7 jours",
      "Option drone classique disponible (+200€)",
    ],
  },
  {
    id: 6,
    name: "Business Boost",
    price: "500€",
    subtitle: "Croissance en ligne",
    description: "Pour les PME, startups, ou boutiques cherchant à développer leur visibilité en ligne.",
    features: [
      "Vidéo corporate (2-3 minutes)",
      "15 photos professionnelles",
      "Audit et optimisation SEO local",
      "Story-telling de votre marque",
      "Formats adaptés à tous supports",
      "Option drone classique disponible (+200€)",
    ],
    popular: true
  },
  {
    id: 7,
    name: "Visibilité 360",
    price: "900€",
    subtitle: "Couverture complète",
    description: "Pour les entreprises ou entrepreneurs cherchant une couverture complète pour booster leur image.",
    features: [
      "Vidéo promotionnelle (2-3 minutes)",
      "Vidéo drone incluse",
      "20 photos professionnelles",
      "Optimisation YouTube et réseaux",
      "Formats haute qualité",
      "Option drone FPV disponible (+200€)",
    ],
  },
  {
    id: 8,
    name: "Sur Mesure",
    price: "Sur devis",
    subtitle: "Projet personnalisé",
    description: "Pour les clients ayant des besoins spécifiques ou des projets uniques nécessitant une approche sur mesure.",
    features: [
      "Analyse approfondie des besoins",
      "Plan de production personnalisé",
      "Équipe dédiée à votre projet",
      "Services vidéo, photo et drone",
      "Gestion réseaux sociaux possible",
      "Options drone classique et FPV",
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