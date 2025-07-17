import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Violation {
  id: string;
  caseNumber: string;
  violationType: string;
  subject: string;
  officer: string;
  status: string;
  createdDate: string;
  assignedTo: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  department: string;
  sector: string;
}

const ViolationsList: React.FC = () => {
  const { state } = useAuth();
  const [violations, setViolations] = useState<Violation[]>([]);
  const [searchFilters, setSearchFilters] = useState({
    caseNumber: '',
    violationType: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    officer: '',
    priority: '',
    department: '',
    sector: ''
  });
  const [selectedViolations, setSelectedViolations] = useState<string[]>([]);

  // Hierarchical filtering based on user role and access level
  const getFilteredViolations = () => {
    const userRole = state.user?.role?.name;
    const department = state.user?.department;

    let filtered = violations;

    // Apply hierarchical access control
    switch (userRole) {
      case 'admin':
        // Admins see everything
        break;
      case 'director':
        // Directors see all cases in their department
        filtered = filtered.filter(v => v.department === department);
        break;
      case 'sector_chief':
        // Sector chiefs see cases in their sector
        filtered = filtered.filter(v => v.sector === state.user?.customsPost);
        break;
      case 'officer':
        // Officers see only their assigned cases
        filtered = filtered.filter(v => v.assignedTo === state.user?.username);
        break;
      default:
        filtered = [];
    }

    return filtered;
  };

  useEffect(() => {
    const mockViolations: Violation[] = [
      {
        id: '1',
        caseNumber: 'KV-2024-001',
        violationType: 'Kontrabandë',
        subject: 'ABC Company Ltd.',
        officer: 'Agron Krasniqi',
        status: 'Në proces',
        createdDate: '2024-01-15',
        assignedTo: 'oficer',
        priority: 'HIGH',
        department: 'Doganat',
        sector: 'Prishtina'
      },
      {
        id: '2',
        caseNumber: 'KV-2024-002',
        violationType: 'Gabim deklarimi',
        subject: 'XYZ Import Export',
        officer: 'Fatmire Jashari',
        status: 'Kompletuar',
        createdDate: '2024-01-10',
        assignedTo: 'supervisor',
        priority: 'MEDIUM',
        department: 'Doganat',
        sector: 'Prizren'
      },
      {
        id: '3',
        caseNumber: 'KV-2024-003',
        violationType: 'Dokumenta të falsifikuara',
        subject: 'DEF Logistics',
        officer: 'Mentor Gashi',
        status: 'Në pritje',
        createdDate: '2024-01-20',
        assignedTo: 'admin',
        priority: 'URGENT',
        department: 'Doganat',
        sector: 'Gjilan'
      }
    ];
    
    setViolations(mockViolations);
  }, []);

  const filteredViolations = getFilteredViolations();

  const handleCreateViolation = () => {
    // Navigate to violation creation page
    console.log('Creating new violation...');
  };

  const handleViewViolation = (violationId: string) => {
    console.log('Viewing violation:', violationId);
  };

  const handleEditViolation = (violationId: string) => {
    console.log('Editing violation:', violationId);
  };

  const handleDeleteViolation = (violationId: string) => {
    if (confirm('Jeni të sigurt që dëshironi të fshini këtë rast?')) {
      setViolations(prev => prev.filter(v => v.id !== violationId));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return '#dc3545';
      case 'HIGH': return '#fd7e14';
      case 'MEDIUM': return '#ffc107';
      case 'LOW': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Kompletuar': return '#28a745';
      case 'Në proces': return '#007bff';
      case 'Në pritje': return '#ffc107';
      case 'Anuluar': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="classic-window" style={{ margin: '20px', maxWidth: '100%' }}>
      <div className="classic-window-header">
        📋 Menaxhimi i Kundervajtjeve - Lista e Rasteve
      </div>

      <div className="classic-window-content">
        {/* Search and Filter Section */}
        <div style={{ 
          background: '#f0f0f0', 
          border: '1px inset #c0c0c0', 
          padding: '16px', 
          marginBottom: '16px' 
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Numri i Rastit:</label>
              <input
                type="text"
                className="classic-textbox"
                value={searchFilters.caseNumber}
                onChange={(e) => setSearchFilters({...searchFilters, caseNumber: e.target.value})}
                placeholder="KV-2024-001"
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Lloji i Kundervajtjes:</label>
              <select
                className="classic-dropdown"
                value={searchFilters.violationType}
                onChange={(e) => setSearchFilters({...searchFilters, violationType: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="Kontrabandë">Kontrabandë</option>
                <option value="Gabim deklarimi">Gabim deklarimi</option>
                <option value="Dokumenta të falsifikuara">Dokumenta të falsifikuara</option>
                <option value="Mosdeklarim">Mosdeklarim</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Statusi:</label>
              <select
                className="classic-dropdown"
                value={searchFilters.status}
                onChange={(e) => setSearchFilters({...searchFilters, status: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="Në pritje">Në pritje</option>
                <option value="Në proces">Në proces</option>
                <option value="Kompletuar">Kompletuar</option>
                <option value="Anuluar">Anuluar</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Prioriteti:</label>
              <select
                className="classic-dropdown"
                value={searchFilters.priority}
                onChange={(e) => setSearchFilters({...searchFilters, priority: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="URGENT">Urgjent</option>
                <option value="HIGH">I lartë</option>
                <option value="MEDIUM">Mesatar</option>
                <option value="LOW">I ulët</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              🔍 Kërko
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              🗑️ Pastro Filtrat
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📊 Eksporto
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '16px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="classic-button classic-button-primary"
              onClick={handleCreateViolation}
              style={{ fontSize: '11px' }}
            >
              ➕ Krijo Rast të Ri
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📝 Krijo Aktivitet
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📋 Krijo Detyrë
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              💰 Krijo Gjobë
            </button>
          </div>
          
          <div style={{ fontSize: '11px', color: '#666' }}>
            Gjithsej: {filteredViolations.length} raste | Ju keni qasje: {state.user?.role?.name}
          </div>
        </div>

        {/* Violations Table */}
        <div style={{ 
          border: '1px inset #c0c0c0', 
          background: 'white',
          maxHeight: '600px',
          overflow: 'auto'
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '11px'
          }}>
            <thead style={{ 
              background: '#c0c0c0', 
              position: 'sticky', 
              top: 0 
            }}>
              <tr>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>
                  <input type="checkbox" />
                </th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Nr. Rasti</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Lloji</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Subjekti</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Oficeri</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Statusi</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Prioriteti</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Data</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Veprimet</th>
              </tr>
            </thead>
            <tbody>
              {filteredViolations.map((violation, index) => (
                <tr 
                  key={violation.id}
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8',
                    cursor: 'pointer'
                  }}
                  onDoubleClick={() => handleViewViolation(violation.id)}
                >
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    <input 
                      type="checkbox"
                      checked={selectedViolations.includes(violation.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedViolations([...selectedViolations, violation.id]);
                        } else {
                          setSelectedViolations(selectedViolations.filter(id => id !== violation.id));
                        }
                      }}
                    />
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', fontWeight: 'bold' }}>
                    {violation.caseNumber}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    {violation.violationType}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    {violation.subject}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    {violation.officer}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: getStatusColor(violation.status),
                      color: 'white',
                      fontSize: '10px'
                    }}>
                      {violation.status}
                    </span>
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: getPriorityColor(violation.priority),
                      color: 'white',
                      fontSize: '10px'
                    }}>
                      {violation.priority}
                    </span>
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    {violation.createdDate}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button 
                        className="classic-button"
                        onClick={() => handleViewViolation(violation.id)}
                        style={{ fontSize: '10px', padding: '2px 6px' }}
                        title="Shiko detajet"
                      >
                        👁️
                      </button>
                      <button 
                        className="classic-button"
                        onClick={() => handleEditViolation(violation.id)}
                        style={{ fontSize: '10px', padding: '2px 6px' }}
                        title="Redakto"
                      >
                        ✏️
                      </button>
                      <button 
                        className="classic-button"
                        onClick={() => handleDeleteViolation(violation.id)}
                        style={{ fontSize: '10px', padding: '2px 6px' }}
                        title="Fshi"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredViolations.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666',
            fontSize: '12px'
          }}>
            ℹ️ Nuk ka raste të gjetur sipas kritereve të kërkimit.
          </div>
        )}

        {/* Status Bar */}
        <div style={{ 
          background: '#f0f0f0', 
          border: '1px inset #c0c0c0', 
          padding: '8px', 
          marginTop: '16px',
          fontSize: '11px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>📊 Statistika: {filteredViolations.length} raste të shfaqura</span>
          <span>👤 Qasja juaj: {state.user?.role?.name} - {state.user?.department}</span>
        </div>
      </div>
    </div>
  );
};

export default ViolationsList;
