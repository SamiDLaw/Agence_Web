import { PortfolioLayout } from "../../components/portfolio/PortfolioLayout";
import { ModernProjectDetail } from "../../components/portfolio/ModernProjectDetail";
import { CustomCursor } from "../../components/portfolio/CustomCursor";
import { projects } from "../../data/projects";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

// Génération dynamique des métadonnées pour chaque projet
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    return {
      title: "Projet non trouvé | Lawgency",
      description: "Ce projet n'existe pas ou a été supprimé.",
    };
  }
  
  return {
    title: `${project.title} | ${project.client} | Lawgency`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    notFound();
  }
  
  // Trouver les projets suivant et précédent pour la navigation
  const currentIndex = projects.findIndex(p => p.slug === params.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  
  // Transformer le projet pour le format attendu par ProjectDetail
  const projectDetail = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    client: project.client,
    year: project.year,
    category: project.category,
    description: project.description,
    // Générer du contenu pour les champs qui n'existent pas dans le type Project
    challenge: `Pour ce projet avec ${project.client}, nous avons dû relever plusieurs défis techniques et créatifs. L'objectif était de créer une expérience ${project.category.toLowerCase()} qui se démarque tout en respectant l'identité de la marque.`,
    solution: `Notre équipe a développé une approche sur mesure, en utilisant nos compétences en ${project.services.join(', ')}. Nous avons travaillé en étroite collaboration avec ${project.client} pour assurer que chaque aspect du projet réponde à leurs attentes.`,
    results: `Le résultat final a permis à ${project.client} d'atteindre ses objectifs de communication et de renforcer sa présence dans son secteur. Le projet a été très bien reçu par le public cible.`,
    coverImage: project.thumbnail || '/images/projects/default-cover.jpg',
    gallery: project.images || [],
    video: project.videoUrl,
    technologies: project.services,
    nextProject: nextProject ? {
      id: nextProject.id,
      title: nextProject.title,
      slug: nextProject.slug,
      thumbnail: nextProject.thumbnail || '/images/projects/default-thumb.jpg'
    } : undefined,
    prevProject: prevProject ? {
      id: prevProject.id,
      title: prevProject.title,
      slug: prevProject.slug,
      thumbnail: prevProject.thumbnail || '/images/projects/default-thumb.jpg'
    } : undefined
  };
  
  return (
    <PortfolioLayout>
      <CustomCursor />
      <ModernProjectDetail project={projectDetail} />
    </PortfolioLayout>
  );
}
