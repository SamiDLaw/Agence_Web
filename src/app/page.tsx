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
      "Option drone FPV disponible",
    ],
  },
  {
    name: "Shambles 360",
    price: "850€",
    description: "Pour les entreprises cherchant une solution complete avec plusieurs pages et un design sur-mesure.",
    features: [
      "Site web multipage",
      "Design UX/UI personnalisé",
      "Optimisation SEO avancee",
      "Integration des reseaux sociaux",
      "Gestion de contenu via WordPress",
      "Option drone FPV disponible",
    ],
  },
  {
    name: "Lawfull Experience",
    price: "1350€",
    description: "Pour une experience web immersive et une strategie de branding poussee.",
    features: [
      "Site web complet avec fonctionnalites avancees",
      "Strategie de branding personnalisee",
      "Animation et interactivite via Framer Motion",
      "Suivi et maintenance (3 mois)",
      "Service de drone FPV inclus",
      "Production video professionnelle",
    ],
  },
];

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <PromoVideoSection />
      <PacksSection />
      <ProjectsSection />
      <TeamSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FaqSection />
      <ContactFormSection />
      <FooterSection />
    </main>
  );
}