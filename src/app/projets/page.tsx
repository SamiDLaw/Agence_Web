import { PortfolioLayout } from "../components/portfolio/PortfolioLayout";
import { ModernProjectsGrid } from "../components/portfolio/ModernProjectsGrid";
import { MarqueeBanner } from "../components/portfolio/MarqueeBanner";
import { ScrollReveal } from "../components/portfolio/ScrollReveal";
import { AnimatedText } from "../components/portfolio/AnimatedText";
import { CustomCursor } from "../components/portfolio/CustomCursor";
import { projects } from "../data/projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets | Lawgency",
  description: "Découvrez nos projets de design, vidéo, web et community management.",
};

export default function ProjectsPage() {
  return (
    <PortfolioLayout>
      <CustomCursor />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <AnimatedText 
              text="Nos projets" 
              className="text-5xl md:text-7xl font-bold mb-6 text-center"
              once={true}
            />
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center leading-relaxed">
              Découvrez notre sélection de projets en agence vidéo, design web et community management.
              Nous créons des expériences digitales qui captent l'attention et génèrent des résultats.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Bannière défilante */}
      <MarqueeBanner 
        texts={[
          "AGENCE VIDÉO", 
          "DESIGN WEB", 
          "COMMUNITY MANAGEMENT", 
          "STRATÉGIE DIGITALE", 
          "CRÉATION DE CONTENU"
        ]} 
      />
      
      {/* Grille de projets moderne */}
      <ModernProjectsGrid projects={projects} />
    </PortfolioLayout>
  );
}
