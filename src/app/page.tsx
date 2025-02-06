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

const packs = [
  {
    name: "Room Visibilite",
    price: "450€",
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
    name: "Shambles",
    price: "850€",
    description: "Solution complete pour les entreprises en croissance necessitant une presence web plus elaboree.",
    features: [
      "Site web multi-pages professionnel",
      "Design personnalise",
      "Optimisation SEO avancee",
      "Integration reseaux sociaux",
      "Systeme de blog integre",
      "Analytics et rapports mensuels",
      "Option drone FPV disponible (+350€)",
    ],
  },
  {
    name: "Lawgency",
    price: "1450€",
    description: "Pack premium pour une presence digitale complete et sur mesure.",
    features: [
      "Site web e-commerce complet",
      "Design exclusif",
      "SEO premium",
      "Integration CRM",
      "Formation utilisateur",
      "Support premium 24/7",
      "Option drone FPV incluse",
    ],
  },
];

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection services={services} />
      <DroneCarousel />
      <PacksSection packs={packs} />
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