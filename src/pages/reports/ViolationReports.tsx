import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts';
import MainLayout from '../../components/layout/MainLayout';
import { ClassicCard } from '../../components/common/ClassicCard';
import { ClassicButton } from '../../components/common/ClassicButton';
import './ViolationReports.css';

interface ViolationReportData {
  id: string;
  reportType: string;
  caseNumber: string;
  violationType: string;
  subject: string;
  officer: string;
  status: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdDate: string;
  completedDate?: string;
  department: string;
  sector: string;
  fineAmount?: number;
  location: string;
  description: string;
}

interface ReportSummary {
  totalCases: number;
  activeCases: number;
  completedCases: number;
  pendingCases: number;
  urgentCases: number;
  totalFines: number;
  averageFine: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byDepartment: Record<string, number>;
  monthlyTrend: Array<{
    month: string;
    cases: number;
    fines: number;
  }>;
}

interface ReportFilter {
  dateFrom: string;
  dateTo: string;
  department: string;
  sector: string;
  violationType: string;
  status: string;
  priority: string;
  officer: string;
}

const ViolationReports: React.FC = () => {
  useAuth(); // For future user-specific filtering
  const [reportData, setReportData] = useState<ViolationReportData[]>([]);
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [selectedReportType, setSelectedReportType] = useState<string>('summary');
  const [filters, setFilters] = useState<ReportFilter>({
    dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 30 days
    dateTo: new Date().toISOString().split('T')[0],
    department: '',
    sector: '',
    violationType: '',
    status: '',
    priority: '',
    officer: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string>('');

  // Mock data for demonstration
  const generateMockData = (): ViolationReportData[] => {
    const violationTypes = [
      'Kontrabandë e Mallrave',
      'Deklarim i Rremë',
      'Shmangje nga Taksat',
      'Mallra të Ndaluara',
      'Dokumente të Mangëta',
      'Thyerje e Vulës Doganore'
    ];
    
    const departments = ['Doganat e Prishtinës', 'Doganat e Gjakovës', 'Doganat e Mitrovicës', 'Doganat e Prizrenit'];
    const officers = ['Agim Kastrati', 'Fatmire Berisha', 'Besnik Krasniqi', 'Valdete Gashi'];
    const statuses = ['ACTIVE', 'PENDING', 'COMPLETED', 'CANCELLED'];
    const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;

    const data: ViolationReportData[] = [];
    
    for (let i = 1; i <= 150; i++) {
      const violationType = violationTypes[Math.floor(Math.random() * violationTypes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      const createdDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      data.push({
        id: `CASE-2024-${String(i).padStart(3, '0')}`,
        reportType: 'VIOLATION',
        caseNumber: `03.1.7-2024-${i}`,
        violationType,
        subject: `Subjekt ${i}`,
        officer: officers[Math.floor(Math.random() * officers.length)],
        status,
        priority,
        createdDate,
        completedDate: status === 'COMPLETED' ? new Date(new Date(createdDate).getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
        department: departments[Math.floor(Math.random() * departments.length)],
        sector: `Sektori ${Math.floor(Math.random() * 5) + 1}`,
        fineAmount: Math.floor(Math.random() * 50000) + 500,
        location: 'Kufiri me Shqipërinë',
        description: `Kundërvajtje e ${violationType.toLowerCase()}`
      });
    }
    
    return data;
  };

  const calculateSummary = (data: ViolationReportData[]): ReportSummary => {
    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    const byDepartment: Record<string, number> = {};
    let totalFines = 0;
    let fineCount = 0;

    data.forEach(item => {
      byType[item.violationType] = (byType[item.violationType] || 0) + 1;
      byStatus[item.status] = (byStatus[item.status] || 0) + 1;
      byDepartment[item.department] = (byDepartment[item.department] || 0) + 1;
      
      if (item.fineAmount) {
        totalFines += item.fineAmount;
        fineCount++;
      }
    });

    // Generate monthly trend (last 6 months)
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthData = data.filter(item => {
        const itemDate = new Date(item.createdDate);
        return itemDate.getMonth() === date.getMonth() && itemDate.getFullYear() === date.getFullYear();
      });
      
      monthlyTrend.push({
        month: date.toLocaleDateString('sq-AL', { month: 'short', year: 'numeric' }),
        cases: monthData.length,
        fines: monthData.reduce((sum, item) => sum + (item.fineAmount || 0), 0)
      });
    }

    return {
      totalCases: data.length,
      activeCases: data.filter(item => item.status === 'ACTIVE').length,
      completedCases: data.filter(item => item.status === 'COMPLETED').length,
      pendingCases: data.filter(item => item.status === 'PENDING').length,
      urgentCases: data.filter(item => item.priority === 'URGENT').length,
      totalFines,
      averageFine: fineCount > 0 ? totalFines / fineCount : 0,
      byType,
      byStatus,
      byDepartment,
      monthlyTrend
    };
  };

  const applyFilters = (data: ViolationReportData[]): ViolationReportData[] => {
    return data.filter(item => {
      const itemDate = new Date(item.createdDate);
      const fromDate = new Date(filters.dateFrom);
      const toDate = new Date(filters.dateTo);
      
      return (
        itemDate >= fromDate && itemDate <= toDate &&
        (filters.department === '' || item.department === filters.department) &&
        (filters.sector === '' || item.sector === filters.sector) &&
        (filters.violationType === '' || item.violationType === filters.violationType) &&
        (filters.status === '' || item.status === filters.status) &&
        (filters.priority === '' || item.priority === filters.priority) &&
        (filters.officer === '' || item.officer === filters.officer)
      );
    });
  };

  const generateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const allData = generateMockData();
      const filteredData = applyFilters(allData);
      const summaryData = calculateSummary(filteredData);
      
      setReportData(filteredData);
      setSummary(summaryData);
      setLastGenerated(new Date().toLocaleString('sq-AL'));
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Gabim në gjenerimin e raportit');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportReport = (format: 'PDF' | 'EXCEL' | 'CSV') => {
    // Simulate export functionality
    alert(`Eksportimi në format ${format} do të implementohet së shpejti...`);
  };

  useEffect(() => {
    const initializeReports = async () => {
      await generateReport();
    };
    
    initializeReports();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderSummaryReport = () => (
    <div className="report-content">
      {/* Key Metrics */}
      <ClassicCard title="📊 Treguesit Kryesorë">
        <div className="metrics-grid">
          <div className="metric-card total">
            <div className="metric-value">{summary?.totalCases || 0}</div>
            <div className="metric-label">Raste Totale</div>
          </div>
          <div className="metric-card active">
            <div className="metric-value">{summary?.activeCases || 0}</div>
            <div className="metric-label">Raste Aktive</div>
          </div>
          <div className="metric-card completed">
            <div className="metric-value">{summary?.completedCases || 0}</div>
            <div className="metric-label">Raste të Mbyllura</div>
          </div>
          <div className="metric-card urgent">
            <div className="metric-value">{summary?.urgentCases || 0}</div>
            <div className="metric-label">Raste Urgjente</div>
          </div>
          <div className="metric-card fine-total">
            <div className="metric-value">€{summary?.totalFines.toLocaleString() || 0}</div>
            <div className="metric-label">Gjoba Totale</div>
          </div>
          <div className="metric-card fine-average">
            <div className="metric-value">€{Math.round(summary?.averageFine || 0).toLocaleString()}</div>
            <div className="metric-label">Gjoba Mesatare</div>
          </div>
        </div>
      </ClassicCard>

      {/* Violation Types Breakdown */}
      <ClassicCard title="🔍 Lloje Kundërvajtjesh">
        <div className="breakdown-table">
          <div className="table-header">
            <div>Lloji</div>
            <div>Numri</div>
            <div>Përqindja</div>
          </div>
          {summary && Object.entries(summary.byType).map(([type, count]) => (
            <div key={type} className="table-row">
              <div>{type}</div>
              <div>{count}</div>
              <div>{((count / summary.totalCases) * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </ClassicCard>

      {/* Status Distribution */}
      <ClassicCard title="📈 Shpërndarja sipas Statusit">
        <div className="breakdown-table">
          <div className="table-header">
            <div>Statusi</div>
            <div>Numri</div>
            <div>Përqindja</div>
          </div>
          {summary && Object.entries(summary.byStatus).map(([status, count]) => (
            <div key={status} className="table-row">
              <div>
                <span className={`status-badge ${status.toLowerCase()}`}>
                  {status === 'ACTIVE' ? 'Aktive' :
                   status === 'PENDING' ? 'Në Pritje' :
                   status === 'COMPLETED' ? 'Të Mbyllura' : 'Të Anulluara'}
                </span>
              </div>
              <div>{count}</div>
              <div>{((count / summary.totalCases) * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </ClassicCard>

      {/* Monthly Trend */}
      <ClassicCard title="📅 Trendi Mujor">
        <div className="trend-chart">
          {summary?.monthlyTrend.map(month => (
            <div key={month.month} className="trend-bar">
              <div className="trend-month">{month.month}</div>
              <div className="trend-values">
                <div className="trend-cases">
                  <div className="trend-bar-fill" style={{ height: `${(month.cases / Math.max(...summary.monthlyTrend.map(m => m.cases))) * 100}%` }}></div>
                  <span>{month.cases} raste</span>
                </div>
                <div className="trend-fines">€{month.fines.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </ClassicCard>
    </div>
  );

  const renderDetailedReport = () => (
    <div className="report-content">
      <ClassicCard title="📋 Lista e Detajuar e Rasteve">
        <div className="detailed-table">
          <div className="table-header">
            <div>Nr. Rasti</div>
            <div>Lloji</div>
            <div>Subjekti</div>
            <div>Zyrtari</div>
            <div>Statusi</div>
            <div>Përparësia</div>
            <div>Data</div>
            <div>Gjoba</div>
          </div>
          {reportData.slice(0, 50).map(item => (
            <div key={item.id} className="table-row">
              <div>{item.caseNumber}</div>
              <div>{item.violationType}</div>
              <div>{item.subject}</div>
              <div>{item.officer}</div>
              <div>
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status === 'ACTIVE' ? 'Aktive' :
                   item.status === 'PENDING' ? 'Në Pritje' :
                   item.status === 'COMPLETED' ? 'Mbyllur' : 'Anulluar'}
                </span>
              </div>
              <div>
                <span className={`priority-badge ${item.priority.toLowerCase()}`}>
                  {item.priority === 'URGENT' ? 'Urgjent' :
                   item.priority === 'HIGH' ? 'I Lartë' :
                   item.priority === 'MEDIUM' ? 'Mesatar' : 'I Ulët'}
                </span>
              </div>
              <div>{new Date(item.createdDate).toLocaleDateString('sq-AL')}</div>
              <div>€{item.fineAmount?.toLocaleString() || '-'}</div>
            </div>
          ))}
        </div>
        {reportData.length > 50 && (
          <div className="table-footer">
            Duke treguar 50 nga {reportData.length} raste totale. Përdorni eksportimin për të marrë të gjitha të dhënat.
          </div>
        )}
      </ClassicCard>
    </div>
  );

  return (
    <MainLayout>
      <div className="violation-reports">
        
        {/* Header */}
        <ClassicCard title="📊 Raporte të Kundërvajtjeve Doganore">
          <div className="report-header">
            <div className="report-info">
              <h2>Raporte të Detajuara të Kundërvajtjeve</h2>
              <p>Analizë gjithëpërfshirëse e rasteve të kundërvajtjeve doganore</p>
              {lastGenerated && (
                <div className="last-generated">
                  Përditësuar më: {lastGenerated}
                </div>
              )}
            </div>
            <div className="report-actions">
              <ClassicButton onClick={generateReport} disabled={isGenerating}>
                {isGenerating ? '⏳ Duke gjeneruar...' : '🔄 Rifresko'}
              </ClassicButton>
              <ClassicButton onClick={() => exportReport('PDF')}>
                📄 PDF
              </ClassicButton>
              <ClassicButton onClick={() => exportReport('EXCEL')}>
                📊 Excel
              </ClassicButton>
            </div>
          </div>
        </ClassicCard>

        {/* Filters */}
        <ClassicCard title="🔍 Filtrat e Raportit">
          <div className="report-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label>Nga Data:</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                />
              </div>
              <div className="filter-group">
                <label>Deri në Datë:</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                />
              </div>
              <div className="filter-group">
                <label>Departamenti:</label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                >
                  <option value="">Të gjitha</option>
                  <option value="Doganat e Prishtinës">Doganat e Prishtinës</option>
                  <option value="Doganat e Gjakovës">Doganat e Gjakovës</option>
                  <option value="Doganat e Mitrovicës">Doganat e Mitrovicës</option>
                  <option value="Doganat e Prizrenit">Doganat e Prizrenit</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Lloji:</label>
                <select
                  value={filters.violationType}
                  onChange={(e) => setFilters(prev => ({ ...prev, violationType: e.target.value }))}
                >
                  <option value="">Të gjitha</option>
                  <option value="Kontrabandë e Mallrave">Kontrabandë e Mallrave</option>
                  <option value="Deklarim i Rremë">Deklarim i Rremë</option>
                  <option value="Shmangje nga Taksat">Shmangje nga Taksat</option>
                  <option value="Mallra të Ndaluara">Mallra të Ndaluara</option>
                </select>
              </div>
            </div>
            <div className="filter-actions">
              <ClassicButton variant="primary" onClick={generateReport}>
                🔍 Apliko Filtrat
              </ClassicButton>
              <ClassicButton onClick={() => setFilters({
                dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                dateTo: new Date().toISOString().split('T')[0],
                department: '',
                sector: '',
                violationType: '',
                status: '',
                priority: '',
                officer: ''
              })}>
                🗑️ Pastro
              </ClassicButton>
            </div>
          </div>
        </ClassicCard>

        {/* Report Type Selector */}
        <ClassicCard title="📑 Lloji i Raportit">
          <div className="report-type-selector">
            <div className="report-types">
              <button
                className={`report-type-btn ${selectedReportType === 'summary' ? 'active' : ''}`}
                onClick={() => setSelectedReportType('summary')}
              >
                📊 Përmbledhje
              </button>
              <button
                className={`report-type-btn ${selectedReportType === 'detailed' ? 'active' : ''}`}
                onClick={() => setSelectedReportType('detailed')}
              >
                📋 Detajuar
              </button>
            </div>
          </div>
        </ClassicCard>

        {/* Report Content */}
        {isGenerating ? (
          <ClassicCard title="⏳ Duke gjeneruar raport...">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Po përgatitet raporti i kundërvajtjeve...</p>
            </div>
          </ClassicCard>
        ) : (
          selectedReportType === 'summary' ? renderSummaryReport() : renderDetailedReport()
        )}

      </div>
    </MainLayout>
  );
};

export default ViolationReports;
