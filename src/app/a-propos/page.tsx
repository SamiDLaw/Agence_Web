import { PortfolioLayout } from "../components/portfolio/PortfolioLayout";
import { ModernAboutSection } from "../components/portfolio/ModernAboutSection";
import { ModernServices } from "../components/portfolio/ModernServices";
import { MarqueeBanner } from "../components/portfolio/MarqueeBanner";
import { ScrollReveal } from "../components/portfolio/ScrollReveal";
import { AnimatedText } from "../components/portfolio/AnimatedText";
import { CustomCursor } from "../components/portfolio/CustomCursor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos | Lawgency",
  description: "Découvrez notre agence créative, notre histoire et notre équipe.",
};

const teamMembers = [
  {
    id: "thomas",
    name: "Thomas Laurent",
    role: "Directeur Créatif",
    bio: "Avec plus de 10 ans d'expérience dans l'industrie créative, Thomas dirige notre vision artistique et supervise tous les projets majeurs. Sa passion pour l'innovation et son œil pour les détails ont façonné l'identité visuelle de nombreuses marques prestigieuses.",
    image: "/images/team/team-1.jpg",
    skills: ["Direction artistique", "Stratégie de marque", "Production vidéo"]
  },
  {
    id: "sophie",
    name: "Sophie Moreau",
    role: "Directrice Vidéo",
    bio: "Spécialiste de la narration visuelle, Sophie transforme les idées en histoires captivantes à travers ses productions vidéo innovantes. Son approche cinématographique et sa maîtrise technique lui permettent de créer des contenus qui résonnent avec les audiences.",
    image: "/images/team/team-2.jpg",
    skills: ["Réalisation", "Montage", "Direction photo"]
  },
  {
    id: "marc",
    name: "Marc Dubois",
    role: "Lead Développeur",
    bio: "Expert en technologies web modernes, Marc crée des expériences numériques fluides et performantes pour nos clients les plus exigeants. Sa connaissance approfondie des frameworks front-end et son souci de l'accessibilité garantissent des sites web à la fois esthétiques et fonctionnels.",
    image: "/images/team/team-3.jpg",
    skills: ["React/Next.js", "UI/UX", "Animations web"]
  },
  {
    id: "julie",
    name: "Julie Leroy",
    role: "Community Manager",
    bio: "Passionnée par les réseaux sociaux et la communication digitale, Julie développe des stratégies de contenu qui engagent et convertissent. Son approche analytique et sa créativité lui permettent d'optimiser la présence en ligne de nos clients et de bâtir des communautés fidèles.",
    image: "/images/team/team-4.jpg",
    skills: ["Stratégie sociale", "Création de contenu", "Analyse de données"]
  }
];

const values = [
  {
    title: "Créativité",
    description: "Nous repoussons constamment les limites de la créativité pour offrir des solutions uniques et mémorables qui font ressortir l'identité de chaque marque.",
    icon: "✨"
  },
  {
    title: "Excellence",
    description: "Nous nous engageons à fournir un travail de la plus haute qualité, avec une attention méticuleuse aux détails et une recherche constante de perfection.",
    icon: "🏆"
  },
  {
    title: "Innovation",
    description: "Nous explorons sans cesse de nouvelles technologies et approches pour rester à la pointe de notre industrie et offrir des solutions avant-gardistes.",
    icon: "💡"
  },
  {
    title: "Collaboration",
    description: "Nous croyons au pouvoir de la collaboration et travaillons en étroite relation avec nos clients pour comprendre leurs besoins et atteindre leurs objectifs.",
    icon: "🤝"
  }
];

export default function APropos() {
  return (
    <PortfolioLayout>
      <CustomCursor />
      
      {/* Hero section avec animation de texte */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <AnimatedText 
              text="À propos de nous" 
              className="text-5xl md:text-7xl font-bold mb-6"
              once={true}
            />
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
              Une agence créative spécialisée dans la production vidéo, le design web et le community management pour les marques qui veulent se démarquer.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Bannière défilante */}
      <MarqueeBanner texts={[
        "Agence vidéo",
        "Design web",
        "Community management",
        "Stratégie digitale",
        "Production visuelle",
        "Expérience utilisateur"
      ]} />
      
      {/* Section principale À propos */}
      <ModernAboutSection 
        title="Notre histoire" 
        subtitle="Depuis 2018"
        description="Fondée en 2018, Lawgency est née de la passion pour la création visuelle et le développement web. Notre mission est de transformer les idées en expériences numériques captivantes qui racontent des histoires et créent des connexions. Au fil des années, nous avons évolué d'une petite équipe de passionnés à une agence créative complète, offrant une gamme de services allant de la production vidéo au développement web, en passant par le design et le community management."
        values={values}
        teamMembers={teamMembers}
      />
      
      {/* Section des services */}
      <ModernServices />
      
      {/* Section CTA */}
      <section className="py-32 bg-gradient-to-r from-primary to-primary/70 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à donner vie à votre projet ?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
              Nous sommes toujours à la recherche de nouveaux défis et de collaborations passionnantes.
            </p>
            <a 
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors text-lg"
              data-cursor="hover"
            >
              Contactez-nous
            </a>
          </ScrollReveal>
        </div>
      </section>
    </PortfolioLayout>
  );
}