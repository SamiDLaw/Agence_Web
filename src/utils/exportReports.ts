import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Report } from '@/types/report';

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
    ["Nombre total de projets", report.metrics.totalProjects.toString()],
    ["Projets en cours", report.metrics.activeProjects.toString()],
    ["Budget total", `${report.metrics.totalBudget}€`],
    ["Temps total passé", `${report.metrics.totalTimeSpent}h`]
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [["Métrique", "Valeur"]],
    body: summaryData,
    theme: "grid"
  });

  yPosition = (doc as any).lastAutoTable.finalY + 20;

  // Détails des projets
  report.metrics.projects.forEach((project, index) => {
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
    if (index < report.metrics.projects.length - 1) {
      doc.addPage();
      yPosition = 20;
    }
  });

  // Enregistrer le PDF
  doc.save(`${report.title}_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

export const exportToExcel = (report: Report) => {
  const wb = XLSX.utils.book_new();

  // Résumé global
  const summaryData = [
    ["Métrique", "Valeur"],
    ["Nombre total de projets", report.metrics.totalProjects],
    ["Projets en cours", report.metrics.activeProjects],
    ["Budget total", report.metrics.totalBudget],
    ["Temps total passé", report.metrics.totalTimeSpent]
  ];

  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summaryWs, "Résumé global");

  // Détails des projets
  report.metrics.projects.forEach(project => {
    const projectData = [
      ["Vue d'ensemble"],
      ["Métrique", "Valeur"],
      ["Nom du projet", project.name],
      ["Statut", project.status],
      ["Budget", project.budget],
      ["Temps passé", project.timeSpent],
      ["Tâches complétées", `${project.completedTasks}/${project.totalTasks}`],
      [],
      ["Répartition du temps"],
      ["Type", "Heures"],
      ...Object.entries(project.timeSpentByType),
      [],
      ["Performance de l'équipe"],
      ["Membre", "Tâches complétées", "Temps passé"],
      ...project.teamPerformance.map(member => [
        member.name,
        member.tasksCompleted,
        member.timeSpent
      ])
    ];

    const projectWs = XLSX.utils.aoa_to_sheet(projectData);
    XLSX.utils.book_append_sheet(wb, projectWs, project.name.slice(0, 31));
  });

  // Enregistrer le fichier Excel
  XLSX.writeFile(wb, `${report.title}_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
};
