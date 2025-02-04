import { Report } from '@/types/reports';
import * as XLSX from 'xlsx';

interface ProjectMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
}

interface TeamMetrics {
  totalMembers: number;
  activeMembers: number;
  totalTimeSpent: number;
}

interface FinancialMetrics {
  totalBudget: number;
  totalRevenue: number;
  totalExpenses: number;
}

interface ReportMetrics {
  projects: ProjectMetrics;
  team?: TeamMetrics;
  financial?: FinancialMetrics;
}

export async function exportToExcel(report: Report) {
  const summaryData = [
    ["Nombre total de projets", report.metrics.projects.totalProjects.toString()],
    ["Projets en cours", report.metrics.projects.activeProjects.toString()],
    ["Budget total", `${report.metrics.financial?.totalBudget || 0}€`],
    ["Temps total passé", `${report.metrics.team?.totalTimeSpent || 0}h`]
  ];

  const projectsData = report.projects ? [
    ["Nom du projet", "État", "Budget", "Temps passé"],
    ...report.projects.map(project => [
      project.name,
      project.status,
      `${project.budget}€`,
      `${project.timeSpent}h`
    ])
  ] : [];

  const workbook = XLSX.utils.book_new();

  // Ajouter la feuille de résumé
  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summaryWs, "Résumé");

  // Ajouter la feuille des projets
  if (projectsData.length > 0) {
    const projectsWs = XLSX.utils.aoa_to_sheet(projectsData);
    XLSX.utils.book_append_sheet(workbook, projectsWs, "Projets");
  }

  // Générer le buffer Excel
  const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  // Créer le nom du fichier avec la date
  const fileName = `rapport_${new Date().toISOString().split('T')[0]}.xlsx`;

  // Retourner le buffer et le nom du fichier
  return {
    buffer: excelBuffer,
    fileName
  };
}
