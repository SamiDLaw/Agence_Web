import { PortfolioLayout } from "../components/portfolio/PortfolioLayout";
import { ModernAboutSection } from "../components/portfolio/ModernAboutSection";
import { ModernServicesSimple } from "../components/portfolio/ModernServicesSimple";
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
    id: "sami",
    name: "Khelladi Sami",
    role: "Responsable Web",
    bio: "Expert en développement web et en expérience utilisateur, Sami dirige notre département web avec passion et expertise. Sa maîtrise des technologies modernes et son approche centrée sur l'utilisateur permettent de créer des sites web performants, esthétiques et parfaitement adaptés aux besoins de nos clients.",
    image: "/images/team/team-1.jpg",
    skills: ["Développement web", "UI/UX", "Next.js/React"]
  },
  {
    id: "eren",
    name: "Ozdemir Eren",
    role: "Responsable Vidéo",
    bio: "Créateur visuel talentueux, Eren transforme les concepts en récits visuels captivants. Sa vision artistique unique et sa maîtrise technique en production vidéo lui permettent de réaliser des contenus impactants qui racontent des histoires mémorables et renforcent l'identité de marque de nos clients.",
    image: "/images/team/team-2.jpg",
    skills: ["Production vidéo", "Montage", "Direction artistique"]
  },
  {
    id: "coralie",
    name: "Coralie Mates",
    role: "Responsable Communication",
    bio: "Stratège en communication digitale, Coralie excelle dans l'élaboration de stratégies de contenu engageantes et la gestion des communautés en ligne. Son expertise en marketing digital et sa compréhension approfondie des tendances sociales permettent à nos clients de développer une présence en ligne authentique et performante.",
    image: "/images/team/team-3.jpg",
    skills: ["Stratégie digitale", "Community management", "Marketing de contenu"]
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
      <ModernServicesSimple />
      
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