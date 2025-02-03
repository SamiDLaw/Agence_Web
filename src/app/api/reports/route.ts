import { NextResponse } from 'next/server';
import type { Report } from '@/types/report';

const reports: Report[] = [];

// GET /api/reports - Liste des rapports
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  let filteredReports = [...reports];

  if (type) {
    filteredReports = filteredReports.filter(report => report.type === type);
  }

  if (startDate && endDate) {
    filteredReports = filteredReports.filter(report => {
      const reportStart = new Date(report.dateRange.start);
      const reportEnd = new Date(report.dateRange.end);
      const filterStart = new Date(startDate);
      const filterEnd = new Date(endDate);
      
      return reportStart >= filterStart && reportEnd <= filterEnd;
    });
  }

  return NextResponse.json(filteredReports);
}

// POST /api/reports - Créer un rapport
export async function POST(request: Request) {
  const reportData = await request.json();
  
  const newReport: Report = {
    ...reportData,
    id: (reports.length + 1).toString(),
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  };
  
  reports.push(newReport);
  return NextResponse.json(newReport);
}

// PUT /api/reports/:id - Mettre à jour un rapport
export async function PUT(request: Request) {
  const { id, ...updates } = await request.json();
  const reportIndex = reports.findIndex(r => r.id === id);
  
  if (reportIndex === -1) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }
  
  reports[reportIndex] = {
    ...reports[reportIndex],
    ...updates,
    lastUpdated: new Date().toISOString()
  };
  
  return NextResponse.json(reports[reportIndex]);
}

// DELETE /api/reports/:id - Supprimer un rapport
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
  }

  const reportIndex = reports.findIndex(r => r.id === id);
  
  if (reportIndex === -1) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }
  
  reports.splice(reportIndex, 1);
  return NextResponse.json({ success: true });
}
