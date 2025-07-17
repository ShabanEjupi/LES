import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

// Types
interface Case {
  id: string;
  caseNumber: string;
  title: string;
  type: 'Administrativ' | 'Penal' | 'Civil' | 'Disciplinor';
  status: 'Hapur' | 'Në Procesim' | 'Mbyllur' | 'Pezulluar' | 'Në Apel';
  priority: 'E Lartë' | 'E Mesme' | 'E Ulët';
  createdDate: string;
  lastActivity: string;
  assignedOfficer: string;
  department: string;
  relatedViolation?: string;
  documentsCount: number;
  description: string;
  plaintiff?: string;
  defendant?: string;
  estimatedValue?: number;
}

// Mock data
const mockCases: Case[] = [
  {
    id: '1',
    caseNumber: 'RAS-2024-001',
    title: 'Kontrabandë Cigaresh - Import i Pakontrolluar',
    type: 'Penal',
    status: 'Në Procesim',
    priority: 'E Lartë',
    createdDate: '2024-01-15',
    lastActivity: '2024-01-22',
    assignedOfficer: 'Agim Berisha',
    department: 'Hetimi Doganor',
    relatedViolation: 'KV-2024-001',
    documentsCount: 15,
    description: 'Rast kontrabande të cigareve me vlerë të lartë',
    plaintiff: 'Drejtoria e Përgjithshme e Doganave',
    defendant: 'ABC Import Sh.p.k.',
    estimatedValue: 50000
  },
  {
    id: '2',
    caseNumber: 'RAS-2024-002',
    title: 'Gjobë Administrative - Dokumentacion i Mangët',
    type: 'Administrativ',
    status: 'Hapur',
    priority: 'E Mesme',
    createdDate: '2024-01-18',
    lastActivity: '2024-01-21',
    assignedOfficer: 'Mira Krasniqi',
    department: 'Administrimi Doganor',
    relatedViolation: 'KV-2024-002',
    documentsCount: 8,
    description: 'Procedurë administrative për dokumentacion të paplotë',
    plaintiff: 'Zyra Doganore Durrës',
    defendant: 'Burim Dyla',
    estimatedValue: 2500
  },
  {
    id: '3',
    caseNumber: 'RAS-2024-003',
    title: 'Çështje Civile - Dëmshpërblim për Gabim Doganor',
    type: 'Civil',
    status: 'Mbyllur',
    priority: 'E Ulët',
    createdDate: '2024-01-10',
    lastActivity: '2024-01-20',
    assignedOfficer: 'Besart Hoxha',
    department: 'Çështjet Ligjore',
    relatedViolation: 'KV-2024-003',
    documentsCount: 12,
    description: 'Kërkesë për dëmshpërblim nga gabim në vlerësim doganor',
    plaintiff: 'Express Logistics Sh.p.k.',
    defendant: 'Dogana e Tiranës',
    estimatedValue: 15000
  },
  {
    id: '4',
    caseNumber: 'RAS-2024-004',
    title: 'Masë Disciplinore - Shkelje të Rregullores',
    type: 'Disciplinor',
    status: 'Pezulluar',
    priority: 'E Mesme',
    createdDate: '2024-01-12',
    lastActivity: '2024-01-19',
    assignedOfficer: 'Fatjona Mullahi',
    department: 'Burime Njerëzore',
    documentsCount: 6,
    description: 'Hetim disciplinor për shkelje të kodeksit etik',
    plaintiff: 'Departamenti i Brendshëm',
    defendant: 'Ardi Nako'
  }
];

const CaseList: React.FC = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<Case[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  // Load cases data
  useEffect(() => {
    const loadCases = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCases(mockCases);
        setFilteredCases(mockCases);
        setLoading(false);
      }, 1000);
    };

    loadCases();
  }, []);

  // Filter cases
  useEffect(() => {
    let filtered = cases;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(caseItem =>
        caseItem.caseNumber.toLowerCase().includes(searchLower) ||
        caseItem.title.toLowerCase().includes(searchLower) ||
        caseItem.assignedOfficer.toLowerCase().includes(searchLower) ||
        caseItem.defendant?.toLowerCase().includes(searchLower) ||
        caseItem.plaintiff?.toLowerCase().includes(searchLower)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(caseItem => caseItem.status === statusFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter(caseItem => caseItem.type === typeFilter);
    }

    if (priorityFilter) {
      filtered = filtered.filter(caseItem => caseItem.priority === priorityFilter);
    }

    setFilteredCases(filtered);
  }, [cases, searchTerm, statusFilter, typeFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hapur': return '#dc3545';
      case 'Në Procesim': return '#ffc107';
      case 'Mbyllur': return '#28a745';
      case 'Pezulluar': return '#6c757d';
      case 'Në Apel': return '#17a2b8';
      default: return '#000';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'E Lartë': return '#dc3545';
      case 'E Mesme': return '#ffc107';
      case 'E Ulët': return '#28a745';
      default: return '#000';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Penal': return '⚖️';
      case 'Administrativ': return '📋';
      case 'Civil': return '👥';
      case 'Disciplinor': return '🔨';
      default: return '📄';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setTypeFilter('');
    setPriorityFilter('');
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="classic-window">
          <div className="classic-titlebar">
            <div className="classic-titlebar-text">
              <span className="classic-titlebar-icon">⏳</span>
              Duke ngarkuar rastet...
            </div>
          </div>
          <div className="classic-window-content" style={{ textAlign: 'center', padding: '50px' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Po ngarkohen rastet gjyqësore...
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="classic-window">
        <div className="classic-titlebar">
          <div className="classic-titlebar-text">
            <span className="classic-titlebar-icon">⚖️</span>
            Menaxhimi i Rasteve Gjyqësore - {filteredCases.length} raste
          </div>
          <div className="classic-titlebar-controls">
            <button 
              className="classic-button classic-button-primary"
              onClick={() => navigate('/cases/create')}
              style={{ marginRight: '8px' }}
            >
              ➕ Rast i Ri
            </button>
            <button 
              className="classic-button"
              onClick={handleRefresh}
              style={{ marginRight: '8px' }}
            >
              🔄 Rifresko
            </button>
            <button 
              className="classic-button"
              onClick={() => window.print()}
              style={{ marginRight: '8px' }}
            >
              🖨️ Printo
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="classic-window-content" style={{ borderBottom: '1px solid #808080' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'end', flexWrap: 'wrap' }}>
            <div className="classic-form-row" style={{ flex: '2', minWidth: '200px' }}>
              <label className="classic-label">🔍 Kërko:</label>
              <input
                type="text"
                className="classic-textbox"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Numri i rastit, titulli, oficeri..."
              />
            </div>
            
            <div className="classic-form-row" style={{ flex: '1', minWidth: '120px' }}>
              <label className="classic-label">Statusi:</label>
              <select
                className="classic-dropdown"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Të gjitha</option>
                <option value="Hapur">Hapur</option>
                <option value="Në Procesim">Në Procesim</option>
                <option value="Mbyllur">Mbyllur</option>
                <option value="Pezulluar">Pezulluar</option>
                <option value="Në Apel">Në Apel</option>
              </select>
            </div>
            
            <div className="classic-form-row" style={{ flex: '1', minWidth: '120px' }}>
              <label className="classic-label">Lloji:</label>
              <select
                className="classic-dropdown"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">Të gjitha</option>
                <option value="Penal">Penal</option>
                <option value="Administrativ">Administrativ</option>
                <option value="Civil">Civil</option>
                <option value="Disciplinor">Disciplinor</option>
              </select>
            </div>
            
            <div className="classic-form-row" style={{ flex: '1', minWidth: '120px' }}>
              <label className="classic-label">Prioriteti:</label>
              <select
                className="classic-dropdown"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="">Të gjitha</option>
                <option value="E Lartë">E Lartë</option>
                <option value="E Mesme">E Mesme</option>
                <option value="E Ulët">E Ulët</option>
              </select>
            </div>
            
            <button 
              className="classic-button"
              onClick={clearFilters}
              style={{ marginBottom: '20px' }}
            >
              🗑️ Pastro Filtrat
            </button>
          </div>
        </div>

        {/* Cases Table */}
        <div className="classic-window-content">
          <div className="classic-table-container">
            <table className="classic-table">
              <thead>
                <tr>
                  <th style={{ width: '120px' }}>Numri</th>
                  <th style={{ width: '60px' }}>Lloji</th>
                  <th style={{ minWidth: '250px' }}>Titulli</th>
                  <th style={{ width: '100px' }}>Statusi</th>
                  <th style={{ width: '80px' }}>Prioriteti</th>
                  <th style={{ width: '150px' }}>Oficeri</th>
                  <th style={{ width: '100px' }}>Krijuar</th>
                  <th style={{ width: '60px' }}>Dok.</th>
                  <th style={{ width: '100px' }}>Veprimet</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem) => (
                  <tr 
                    key={caseItem.id}
                    className={selectedCase === caseItem.id ? 'selected' : ''}
                    onClick={() => setSelectedCase(caseItem.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td style={{ fontFamily: 'monospace', fontSize: '10px' }}>
                      {caseItem.caseNumber}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span title={caseItem.type}>
                        {getTypeIcon(caseItem.type)}
                      </span>
                    </td>
                    <td title={caseItem.description} style={{ fontSize: '11px' }}>
                      {caseItem.title}
                      {caseItem.defendant && (
                        <div style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>
                          Përgjgijës: {caseItem.defendant}
                        </div>
                      )}
                    </td>
                    <td>
                      <span 
                        className="classic-badge"
                        style={{ 
                          backgroundColor: getStatusColor(caseItem.status),
                          color: caseItem.status === 'Në Procesim' ? '#000' : '#fff',
                          fontSize: '9px'
                        }}
                      >
                        {caseItem.status}
                      </span>
                    </td>
                    <td>
                      <span 
                        className="classic-badge"
                        style={{ 
                          backgroundColor: getPriorityColor(caseItem.priority),
                          color: caseItem.priority === 'E Mesme' ? '#000' : '#fff',
                          fontSize: '9px'
                        }}
                      >
                        {caseItem.priority}
                      </span>
                    </td>
                    <td style={{ fontSize: '10px' }}>
                      {caseItem.assignedOfficer}
                      <div style={{ fontSize: '9px', color: '#666' }}>
                        {caseItem.department}
                      </div>
                    </td>
                    <td style={{ fontSize: '10px' }}>
                      {new Date(caseItem.createdDate).toLocaleDateString('sq-AL')}
                    </td>
                    <td style={{ textAlign: 'center', fontSize: '10px' }}>
                      📄 {caseItem.documentsCount}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        <button 
                          className="classic-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/cases/${caseItem.id}`);
                          }}
                          style={{ fontSize: '10px', padding: '2px 4px' }}
                          title="Shiko detajet"
                        >
                          👁️
                        </button>
                        <button 
                          className="classic-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/cases/${caseItem.id}/edit`);
                          }}
                          style={{ fontSize: '10px', padding: '2px 4px' }}
                          title="Edito rastin"
                        >
                          ✏️
                        </button>
                        <button 
                          className="classic-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`/cases/${caseItem.id}/documents`, '_blank');
                          }}
                          style={{ fontSize: '10px', padding: '2px 4px' }}
                          title="Dokumentet"
                        >
                          📁
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCases.length === 0 && (
            <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📂</div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                Nuk u gjetën raste që përputhen me kriteret e kërkimit.
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                Provoni të ndryshoni filtrat ose përdorni terma të ndryshëm kërkimi.
              </div>
              <button 
                className="classic-button classic-button-primary"
                onClick={clearFilters}
                style={{ marginTop: '16px' }}
              >
                Pastro Filtrat
              </button>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="classic-status-bar">
          <div className="classic-status-panel">
            📊 Gjithsej: {cases.length}
          </div>
          <div className="classic-status-panel">
            🔍 Të filtruara: {filteredCases.length}
          </div>
          <div className="classic-status-panel">
            🔴 Hapur: {cases.filter(c => c.status === 'Hapur').length}
          </div>
          <div className="classic-status-panel">
            🟡 Në Procesim: {cases.filter(c => c.status === 'Në Procesim').length}
          </div>
          <div className="classic-status-panel">
            🟢 Mbyllur: {cases.filter(c => c.status === 'Mbyllur').length}
          </div>
          <div className="classic-status-panel">
            ⏸️ Pezulluar: {cases.filter(c => c.status === 'Pezulluar').length}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CaseList;
