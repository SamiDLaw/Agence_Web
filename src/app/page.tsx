import { PortfolioLayout } from "./components/portfolio/PortfolioLayout";
import { ModernHomepage } from "./components/portfolio/ModernHomepage";
import { CustomCursor } from "./components/portfolio/CustomCursor";
import { projects } from "./data/projects";

export default function Home() {
  // Filtrer les projets en vedette
  const featuredProjects = projects.filter(project => project.featured);
  
  return (
    <PortfolioLayout>
      {/* Curseur personnalisé moderne */}
      <CustomCursor />
      
      {/* Page d'accueil moderne avec tous les composants intégrés */}
      <ModernHomepage 
        featuredProjects={featuredProjects} 
        allProjects={projects.slice(0, 6)} // Limiter à 6 projets pour la galerie
      />
    </PortfolioLayout>
  );
}