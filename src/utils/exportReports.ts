import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Report } from '@/types/reports';
import { writeFile } from 'fs/promises';
import { join } from 'path';

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

export const exportToPDF = (report: Report) => {
  const doc = new jsPDF();
  let yPosition = 20;

  // En-tête
  doc.setFontSize(20);
  doc.text(report.title, 20, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.text(`Généré le ${format(new Date(), 'dd MMMM yyyy', { locale: fr })}`, 20, yPosition);
  yPosition += 20;

  // Résumé global
  doc.setFontSize(16);
  doc.text("Résumé global", 20, yPosition);
  yPosition += 10;

  const summaryData = [
    ["Nombre total de projets", report.metrics.projects.totalProjects.toString()],
    ["Projets en cours", report.metrics.projects.activeProjects.toString()],
    ["Budget total", `${report.metrics.financial?.totalBudget || 0}€`],
    ["Temps total passé", `${report.metrics.team?.totalTimeSpent || 0}h`]
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [["Métrique", "Valeur"]],
    body: summaryData,
    theme: "grid"
  });

  yPosition = (doc as any).lastAutoTable.finalY + 20;

  // Détails des projets
  report.projects.forEach((project, index) => {
    // Vue d'ensemble
    doc.setFontSize(16);
    doc.text("Vue d'ensemble", 20, yPosition);
    yPosition += 10;
    
    const overviewData = [
      ["Nom du projet", project.name],
      ["Statut", project.status],
      ["Budget", `${project.budget}€`],
      ["Temps passé", `${project.timeSpent}h`],
      ["Tâches complétées", `${project.completedTasks}/${project.totalTasks}`]
    ];

    autoTable(doc, {
      startY: yPosition,
      head: [["Métrique", "Valeur"]],
      body: overviewData,
      theme: "grid"
    });

    yPosition = (doc as any).lastAutoTable.finalY + 20;

    // Répartition du temps
    doc.setFontSize(14);
    doc.text("Répartition du temps", 20, yPosition);
    yPosition += 10;

    const timeData = Object.entries(project.timeSpentByType).map(([type, hours]) => [
      type,
      `${hours}h`
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [["Type", "Heures"]],
      body: timeData,
      theme: "striped"
    });

    yPosition = (doc as any).lastAutoTable.finalY + 20;

    // Performance de l'équipe
    doc.setFontSize(14);
    doc.text("Performance de l'équipe", 20, yPosition);
    yPosition += 10;

    const teamData = project.teamPerformance.map(member => [
      member.name,
      member.tasksCompleted.toString(),
      `${member.timeSpent}h`
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [["Membre", "Tâches complétées", "Temps passé"]],
      body: teamData,
      theme: "striped"
    });

    yPosition = (doc as any).lastAutoTable.finalY + 20;

    // Nouvelle page si ce n'est pas le dernier projet
    if (index < report.projects.length - 1) {
      doc.addPage();
      yPosition = 20;
    }
  });

  // Enregistrer le PDF
  doc.save(`${report.title}_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

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
