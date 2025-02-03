import { useState, useEffect } from 'react';
import type { Report } from '@/types/report';

interface UseReportsOptions {
  type?: Report['type'];
  dateRange?: {
    start: string;
    end: string;
  };
}

export function useReports(options: UseReportsOptions = {}) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReports = async () => {
    try {
      const queryParams = new URLSearchParams();
      
      if (options.type) {
        queryParams.append('type', options.type);
      }
      
      if (options.dateRange) {
        queryParams.append('startDate', options.dateRange.start);
        queryParams.append('endDate', options.dateRange.end);
      }

      const response = await fetch(`/api/reports?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch reports');
      const data = await response.json();
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const createReport = async (report: Omit<Report, 'id' | 'createdAt' | 'lastUpdated'>) => {
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
      });
      if (!response.ok) throw new Error('Failed to create report');
      const newReport = await response.json();
      setReports(prev => [...prev, newReport]);
      return newReport;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  const updateReport = async (id: string, updates: Partial<Report>) => {
    try {
      const response = await fetch('/api/reports', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      });
      if (!response.ok) throw new Error('Failed to update report');
      const updatedReport = await response.json();
      setReports(prev =>
        prev.map(report =>
          report.id === id ? updatedReport : report
        )
      );
      return updatedReport;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  const deleteReport = async (id: string) => {
    try {
      const response = await fetch(`/api/reports?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete report');
      setReports(prev => prev.filter(report => report.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  const getReportsByType = (type: Report['type']) => {
    return reports.filter(report => report.type === type);
  };

  const getReportsByDateRange = (start: string, end: string) => {
    return reports.filter(report => {
      const reportStart = new Date(report.dateRange.start);
      const reportEnd = new Date(report.dateRange.end);
      const rangeStart = new Date(start);
      const rangeEnd = new Date(end);
      
      return reportStart >= rangeStart && reportEnd <= rangeEnd;
    });
  };

  const getReportMetrics = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return null;

    const metrics = {
      projects: report.metrics.projects?.length || 0,
      totalTasks: 0,
      completedTasks: 0,
      totalTimeSpent: 0,
      totalBudget: 0
    };

    report.metrics.projects?.forEach(project => {
      metrics.totalTasks += project.totalTasks;
      metrics.completedTasks += project.completedTasks;
      metrics.totalTimeSpent += project.totalTimeSpent;
      metrics.totalBudget += project.budget;
    });

    return metrics;
  };

  useEffect(() => {
    fetchReports();
  }, [options.type, options.dateRange?.start, options.dateRange?.end]);

  return {
    reports,
    loading,
    error,
    createReport,
    updateReport,
    deleteReport,
    getReportsByType,
    getReportsByDateRange,
    getReportMetrics,
    refetch: fetchReports,
  };
}
