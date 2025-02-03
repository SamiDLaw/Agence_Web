import { NextResponse } from 'next/server';
import { addDays, addWeeks, addMonths, addQuarters } from 'date-fns';
import type { ReportAutomation, PredictiveAnalysis } from '@/types/automation';

const automations: ReportAutomation[] = [];
const analyses: PredictiveAnalysis[] = [];

// Calcul de la prochaine exécution
function calculateNextRun(frequency: ReportAutomation['frequency'], from: Date = new Date()): Date {
  switch (frequency) {
    case 'daily':
      return addDays(from, 1);
    case 'weekly':
      return addWeeks(from, 1);
    case 'monthly':
      return addMonths(from, 1);
    case 'quarterly':
      return addQuarters(from, 1);
    default:
      return addDays(from, 1);
  }
}

// GET /api/automation/reports - Liste des automatisations
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (type === 'analysis') {
    const projectId = searchParams.get('projectId');
    if (projectId) {
      return NextResponse.json(analyses.filter(a => a.projectId === projectId));
    }
    return NextResponse.json(analyses);
  }

  return NextResponse.json(automations);
}

// POST /api/automation/reports - Créer une automatisation
export async function POST(request: Request) {
  const data = await request.json();
  const { type } = data;

  if (type === 'analysis') {
    const analysis: PredictiveAnalysis = {
      ...data,
      id: (analyses.length + 1).toString(),
      createdAt: new Date().toISOString(),
    };
    analyses.push(analysis);
    return NextResponse.json(analysis);
  }

  const automation: ReportAutomation = {
    ...data,
    id: (automations.length + 1).toString(),
    nextRun: calculateNextRun(data.frequency).toISOString(),
    enabled: true
  };
  
  automations.push(automation);
  return NextResponse.json(automation);
}

// PUT /api/automation/reports/:id - Mettre à jour une automatisation
export async function PUT(request: Request) {
  const { id, type, ...updates } = await request.json();
  
  if (type === 'analysis') {
    const analysisIndex = analyses.findIndex(a => a.id === id);
    if (analysisIndex === -1) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
    }
    analyses[analysisIndex] = { ...analyses[analysisIndex], ...updates };
    return NextResponse.json(analyses[analysisIndex]);
  }

  const automationIndex = automations.findIndex(a => a.id === id);
  if (automationIndex === -1) {
    return NextResponse.json({ error: 'Automation not found' }, { status: 404 });
  }
  
  if (updates.frequency && updates.frequency !== automations[automationIndex].frequency) {
    updates.nextRun = calculateNextRun(updates.frequency).toISOString();
  }
  
  automations[automationIndex] = { ...automations[automationIndex], ...updates };
  return NextResponse.json(automations[automationIndex]);
}

// DELETE /api/automation/reports/:id - Supprimer une automatisation
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type');
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  if (type === 'analysis') {
    const analysisIndex = analyses.findIndex(a => a.id === id);
    if (analysisIndex === -1) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
    }
    analyses.splice(analysisIndex, 1);
    return NextResponse.json({ success: true });
  }

  const automationIndex = automations.findIndex(a => a.id === id);
  if (automationIndex === -1) {
    return NextResponse.json({ error: 'Automation not found' }, { status: 404 });
  }
  
  automations.splice(automationIndex, 1);
  return NextResponse.json({ success: true });
}
