import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts';

interface CalculationHistoryEntry {
  id: string;
  calculationDate: string;
  userId: string;
  username: string;
  userRole: string;
  violationType: string;
  violationCode: string;
  violationDescription: string;
  ruleId: string;
  ruleVersion: number;
  inputParameters: {
    violationValue?: number;
    isRepeatOffense: boolean;
    severityLevel: string;
    cooperationLevel: string;
    economicImpact: string;
    reductionFactors: string[];
  };
  calculationResults: {
    baseAmount: number;
    multipliedAmount: number;
    reducedAmount: number;
    finalAmount: number;
    currency: string;
    appliedMultipliers: string[];
    appliedReductions: string[];
  };
  caseId?: string;
  fineId?: string;
  isApplied: boolean;
  appliedDate?: string;
  notes?: string;
  ipAddress: string;
  sessionId: string;
}

const FineCalculationHistory: React.FC = () => {
  const { state } = useAuth();
  const [history, setHistory] = useState<CalculationHistoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<CalculationHistoryEntry | null>(null);
  const [filters, setFilters] = useState({
    userId: '',
    violationType: '',
    dateFrom: '',
    dateTo: '',
    isApplied: '',
    searchText: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    loadCalculationHistory();
  }, []);

  const loadCalculationHistory = () => {
    // In a real application, this would load from the backend
    const mockHistory: CalculationHistoryEntry[] = [
      {
        id: 'CALC_001',
        calculationDate: '2024-08-10T14:30:00Z',
        userId: 'user123',
        username: 'artan.krasniqi',
        userRole: 'Officer',
        violationType: 'CONTRABAND',
        violationCode: 'KV-273',
        violationDescription: 'Kontrabandë e Mallrave',
        ruleId: 'CONTRABAND_001',
        ruleVersion: 1,
        inputParameters: {
          violationValue: 15000,
          isRepeatOffense: false,
          severityLevel: 'severe',
          cooperationLevel: 'partial',
          economicImpact: 'high',
          reductionFactors: ['firstTimeOffender']
        },
        calculationResults: {
          baseAmount: 5000,
          multipliedAmount: 35000,
          reducedAmount: 28000,
          finalAmount: 28000,
          currency: 'EUR',
          appliedMultipliers: ['Shkalla e rëndesës: severe', 'Impakti ekonomik: high'],
          appliedReductions: ['Kundërvajtës për herë të parë: -20%']
        },
        caseId: 'KV-2024-001',
        isApplied: true,
        appliedDate: '2024-08-10T15:00:00Z',
        notes: 'Gjoba u aplikua për rastin e kontrabandës së cigareve',
        ipAddress: '192.168.1.100',
        sessionId: 'sess_123456789'
      },
      {
        id: 'CALC_002',
        calculationDate: '2024-08-10T10:15:00Z',
        userId: 'user456',
        username: 'ermira.hoxha',
        userRole: 'Supervisor',
        violationType: 'FALSE_DECLARATION',
        violationCode: 'KV-274',
        violationDescription: 'Deklarim i Rremë',
        ruleId: 'FALSE_DECLARATION_001',
        ruleVersion: 1,
        inputParameters: {
          violationValue: 8000,
          isRepeatOffense: true,
          severityLevel: 'moderate',
          cooperationLevel: 'none',
          economicImpact: 'medium',
          reductionFactors: []
        },
        calculationResults: {
          baseAmount: 2000,
          multipliedAmount: 5040,
          reducedAmount: 5040,
          finalAmount: 5040,
          currency: 'EUR',
          appliedMultipliers: ['Kundërvajtje e përsëritur', 'Bashkëpunimi: none'],
          appliedReductions: []
        },
        caseId: 'KV-2024-002',
        isApplied: false,
        notes: 'Llogaritje preliminare për vlerësim',
        ipAddress: '192.168.1.101',
        sessionId: 'sess_987654321'
      },
      {
        id: 'CALC_003',
        calculationDate: '2024-08-09T16:45:00Z',
        userId: 'user123',
        username: 'artan.krasniqi',
        userRole: 'Officer',
        violationType: 'DUTY_EVASION',
        violationCode: 'KV-275',
        violationDescription: 'Shmangje nga Taksat Doganore',
        ruleId: 'DUTY_EVASION_001',
        ruleVersion: 1,
        inputParameters: {
          violationValue: 5000,
          isRepeatOffense: false,
          severityLevel: 'minor',
          cooperationLevel: 'full',
          economicImpact: 'low',
          reductionFactors: ['voluntaryDisclosure', 'cooperativeSubject']
        },
        calculationResults: {
          baseAmount: 3000,
          multipliedAmount: 1890,
          reducedAmount: 945,
          finalAmount: 1500,
          currency: 'EUR',
          appliedMultipliers: ['Shkalla e rëndesës: minor', 'Bashkëpunimi: full'],
          appliedReductions: ['Zbulim vullnetar: -35%', 'Subjekt bashkëpunues: -15%']
        },
        isApplied: true,
        appliedDate: '2024-08-09T17:00:00Z',
        fineId: 'GA-2024-003',
        notes: 'Gjoba e reduktuar për bashkëpunim të plotë',
        ipAddress: '192.168.1.100',
        sessionId: 'sess_456789123'
      }
    ];

    // Add more mock entries to demonstrate pagination
    const additionalEntries = Array.from({ length: 50 }, (_, index) => ({
      ...mockHistory[0],
      id: `CALC_${String(index + 4).padStart(3, '0')}`,
      calculationDate: new Date(Date.now() - index * 86400000).toISOString(),
      calculationResults: {
        ...mockHistory[0].calculationResults,
        finalAmount: Math.floor(Math.random() * 50000) + 1000
      }
    }));

    setHistory([...mockHistory, ...additionalEntries]);
  };

  const getFilteredHistory = () => {
    let filtered = history;

    // Apply role-based filtering
    const userRole = state.user?.role?.name;
    if (userRole === 'Officer') {
      // Officers see only their own calculations
      filtered = filtered.filter(entry => entry.userId === state.user?.id);
    }

    // Apply search filters
    if (filters.userId) {
      filtered = filtered.filter(entry => entry.username.toLowerCase().includes(filters.userId.toLowerCase()));
    }

    if (filters.violationType) {
      filtered = filtered.filter(entry => entry.violationType === filters.violationType);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(entry => entry.calculationDate >= filters.dateFrom);
    }

    if (filters.dateTo) {
      filtered = filtered.filter(entry => entry.calculationDate <= filters.dateTo + 'T23:59:59Z');
    }

    if (filters.isApplied !== '') {
      const isApplied = filters.isApplied === 'true';
      filtered = filtered.filter(entry => entry.isApplied === isApplied);
    }

    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.violationDescription.toLowerCase().includes(searchLower) ||
        entry.violationCode.toLowerCase().includes(searchLower) ||
        entry.caseId?.toLowerCase().includes(searchLower) ||
        entry.fineId?.toLowerCase().includes(searchLower)
      );
    }

    return filtered.sort((a, b) => new Date(b.calculationDate).getTime() - new Date(a.calculationDate).getTime());
  };

  const getPaginatedHistory = () => {
    const filtered = getFilteredHistory();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(getFilteredHistory().length / itemsPerPage);
  };

  const handleExportHistory = () => {
    const filtered = getFilteredHistory();
    const csvContent = [
      'Data,Përdoruesi,Lloji,Kodi,Vlera Bazë,Vlera Finale,Valuta,Aplikuar,Rasti,Gjoba',
      ...filtered.map(entry => [
        new Date(entry.calculationDate).toLocaleString('sq-AL'),
        entry.username,
        entry.violationType,
        entry.violationCode,
        entry.calculationResults.baseAmount,
        entry.calculationResults.finalAmount,
        entry.calculationResults.currency,
        entry.isApplied ? 'Po' : 'Jo',
        entry.caseId || '',
        entry.fineId || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `historiku-llogaritjeve-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const violationTypes = [
    'CONTRABAND',
    'FALSE_DECLARATION', 
    'DUTY_EVASION',
    'PROHIBITED_GOODS',
    'DOCUMENTATION_MISSING',
    'MISCLASSIFICATION',
    'UNDERVALUATION'
  ];

  return (
    <div className="classic-window" style={{ margin: '20px', maxWidth: '100%' }}>
      <div className="classic-window-header">
        📚 Historiku i Llogaritjeve të Gjobave
      </div>

      <div className="classic-window-content">
        {/* Header Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px',
          padding: '12px',
          background: '#f0f0f0',
          border: '1px inset #c0c0c0'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
            📚 Llogaritje gjithsej: {getFilteredHistory().length} | 
            Të aplikuara: {getFilteredHistory().filter(h => h.isApplied).length}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="classic-button"
              onClick={handleExportHistory}
              style={{ fontSize: '11px' }}
            >
              📤 Eksporto CSV
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📊 Raporte
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              🔄 Rifresko
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ 
          background: '#f8f8f8', 
          border: '1px inset #c0c0c0', 
          padding: '16px', 
          marginBottom: '16px' 
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Përdoruesi:</label>
              <input
                type="text"
                className="classic-textbox"
                value={filters.userId}
                onChange={(e) => setFilters({...filters, userId: e.target.value})}
                placeholder="Emri i përdoruesit..."
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Lloji i Kundërvajtjes:</label>
              <select
                className="classic-dropdown"
                value={filters.violationType}
                onChange={(e) => setFilters({...filters, violationType: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                {violationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Nga Data:</label>
              <input
                type="date"
                className="classic-textbox"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Deri Data:</label>
              <input
                type="date"
                className="classic-textbox"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Statusi:</label>
              <select
                className="classic-dropdown"
                value={filters.isApplied}
                onChange={(e) => setFilters({...filters, isApplied: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="true">Të aplikuara</option>
                <option value="false">Jo të aplikuara</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Kërko:</label>
              <input
                type="text"
                className="classic-textbox"
                value={filters.searchText}
                onChange={(e) => setFilters({...filters, searchText: e.target.value})}
                placeholder="Rasti, gjoba, përshkrimi..."
                style={{ fontSize: '11px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              🔍 Kërko
            </button>
            <button 
              className="classic-button"
              onClick={() => {
                setFilters({
                  userId: '', violationType: '', dateFrom: '', dateTo: '',
                  isApplied: '', searchText: ''
                });
                setCurrentPage(1);
              }}
              style={{ fontSize: '11px' }}
            >
              🗑️ Pastro
            </button>
          </div>
        </div>

        {/* History Table */}
        <div style={{ 
          border: '1px inset #c0c0c0', 
          background: 'white',
          maxHeight: '500px',
          overflow: 'auto'
        }}>
          <table className="calculation-breakdown-table">
            <thead>
              <tr>
                <th>Data/Ora</th>
                <th>Përdoruesi</th>
                <th>Lloji/Kodi</th>
                <th>Parametrat</th>
                <th>Vlera Bazë</th>
                <th>Vlera Finale</th>
                <th>Statusi</th>
                <th>Rasti/Gjoba</th>
                <th>Veprimet</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedHistory().map((entry, index) => (
                <tr 
                  key={entry.id}
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8',
                    cursor: 'pointer'
                  }}
                  onDoubleClick={() => setSelectedEntry(entry)}
                >
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', fontSize: '10px' }}>
                    {new Date(entry.calculationDate).toLocaleString('sq-AL')}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', fontSize: '11px' }}>
                    <div style={{ fontWeight: 'bold' }}>{entry.username}</div>
                    <div style={{ fontSize: '10px', color: '#666' }}>{entry.userRole}</div>
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', fontSize: '11px' }}>
                    <div style={{ fontWeight: 'bold', color: '#003d82' }}>{entry.violationCode}</div>
                    <div style={{ fontSize: '10px', color: '#666' }}>{entry.violationType}</div>
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', fontSize: '10px' }}>
                    <div>Rëndësia: {entry.inputParameters.severityLevel}</div>
                    <div>Bashkëpunimi: {entry.inputParameters.cooperationLevel}</div>
                    <div>Impakti: {entry.inputParameters.economicImpact}</div>
                    {entry.inputParameters.isRepeatOffense && (
                      <div style={{ color: '#dc3545' }}>Përsëritje</div>
                    )}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'right', fontSize: '11px' }}>
                    {entry.calculationResults.baseAmount.toLocaleString()} {entry.calculationResults.currency}
                  </td>
                  <td style={{ 
                    padding: '6px', 
                    border: '1px solid #c0c0c0', 
                    textAlign: 'right', 
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#003d82'
                  }}>
                    {entry.calculationResults.finalAmount.toLocaleString()} {entry.calculationResults.currency}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: entry.isApplied ? '#28a745' : '#ffc107',
                      color: entry.isApplied ? 'white' : '#000',
                      fontSize: '10px'
                    }}>
                      {entry.isApplied ? 'Aplikuar' : 'Llogaritje'}
                    </span>
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', fontSize: '11px' }}>
                    {entry.caseId && <div>📂 {entry.caseId}</div>}
                    {entry.fineId && <div>💰 {entry.fineId}</div>}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button 
                        className="classic-button"
                        onClick={() => setSelectedEntry(entry)}
                        style={{ fontSize: '10px', padding: '2px 6px' }}
                        title="Shiko detajet"
                      >
                        👁️
                      </button>
                      <button 
                        className="classic-button"
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(entry.calculationResults, null, 2));
                          alert('Rezultati u kopjua në clipboard');
                        }}
                        style={{ fontSize: '10px', padding: '2px 6px' }}
                        title="Kopjo rezultatin"
                      >
                        📋
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {getPaginatedHistory().length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666',
            fontSize: '12px'
          }}>
            ℹ️ Nuk ka llogaritje të gjetur sipas kritereve të kërkimit.
          </div>
        )}

        {/* Pagination */}
        {getTotalPages() > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: '8px',
            marginTop: '16px',
            padding: '12px',
            background: '#f0f0f0',
            border: '1px inset #c0c0c0'
          }}>
            <button 
              className="classic-button"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{ fontSize: '11px' }}
            >
              ⬅️ Mëparshme
            </button>
            
            <span style={{ fontSize: '11px', margin: '0 16px' }}>
              Faqja {currentPage} nga {getTotalPages()} 
              ({getFilteredHistory().length} llogaritje gjithsej)
            </span>
            
            <button 
              className="classic-button"
              onClick={() => setCurrentPage(Math.min(getTotalPages(), currentPage + 1))}
              disabled={currentPage === getTotalPages()}
              style={{ fontSize: '11px' }}
            >
              Tjetër ➡️
            </button>
          </div>
        )}

        {/* Detail Modal */}
        {selectedEntry && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div className="classic-window" style={{ 
              width: '90%', 
              maxWidth: '800px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <div className="classic-window-header">
                📚 Detajet e Llogaritjes - {selectedEntry.id}
              </div>
              <div className="classic-window-content">
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '12px' }}>👤 Informata mbi Përdoruesin:</h4>
                    <div style={{ fontSize: '11px' }}>
                      <div><strong>Emri:</strong> {selectedEntry.username}</div>
                      <div><strong>Roli:</strong> {selectedEntry.userRole}</div>
                      <div><strong>Data/Ora:</strong> {new Date(selectedEntry.calculationDate).toLocaleString('sq-AL')}</div>
                      <div><strong>IP Adresa:</strong> {selectedEntry.ipAddress}</div>
                      <div><strong>Session ID:</strong> {selectedEntry.sessionId}</div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '12px' }}>⚖️ Informata mbi Kundërvajtjen:</h4>
                    <div style={{ fontSize: '11px' }}>
                      <div><strong>Kodi:</strong> {selectedEntry.violationCode}</div>
                      <div><strong>Lloji:</strong> {selectedEntry.violationType}</div>
                      <div><strong>Përshkrimi:</strong> {selectedEntry.violationDescription}</div>
                      <div><strong>Rregulla ID:</strong> {selectedEntry.ruleId}</div>
                      <div><strong>Versioni i rregullës:</strong> {selectedEntry.ruleVersion}</div>
                    </div>
                  </div>
                </div>

                <div style={{ 
                  background: '#f8f8f8', 
                  border: '1px inset #c0c0c0', 
                  padding: '12px',
                  marginBottom: '16px'
                }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '12px' }}>🔢 Parametrat e Përdorur:</h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '12px',
                    fontSize: '11px'
                  }}>
                    <div><strong>Vlera e kundërvajtjes:</strong> {selectedEntry.inputParameters.violationValue?.toLocaleString() || 'N/A'} EUR</div>
                    <div><strong>Kundërvajtje e përsëritur:</strong> {selectedEntry.inputParameters.isRepeatOffense ? 'Po' : 'Jo'}</div>
                    <div><strong>Shkalla e rëndesës:</strong> {selectedEntry.inputParameters.severityLevel}</div>
                    <div><strong>Niveli i bashkëpunimit:</strong> {selectedEntry.inputParameters.cooperationLevel}</div>
                    <div><strong>Impakti ekonomik:</strong> {selectedEntry.inputParameters.economicImpact}</div>
                    <div><strong>Faktorë reduktimi:</strong> {selectedEntry.inputParameters.reductionFactors.join(', ') || 'Asnjë'}</div>
                  </div>
                </div>

                <div style={{ 
                  background: '#e8f4fd', 
                  border: '2px solid #003d82', 
                  padding: '12px',
                  marginBottom: '16px'
                }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#003d82' }}>💰 Rezultatet e Llogaritjes:</h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '12px',
                    fontSize: '11px'
                  }}>
                    <div>
                      <strong>Vlera bazë:</strong><br />
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                        {selectedEntry.calculationResults.baseAmount.toLocaleString()} {selectedEntry.calculationResults.currency}
                      </span>
                    </div>
                    <div>
                      <strong>Pas multiplikuesve:</strong><br />
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                        {selectedEntry.calculationResults.multipliedAmount.toLocaleString()} {selectedEntry.calculationResults.currency}
                      </span>
                    </div>
                    <div>
                      <strong>Pas reduktimeve:</strong><br />
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                        {selectedEntry.calculationResults.reducedAmount.toLocaleString()} {selectedEntry.calculationResults.currency}
                      </span>
                    </div>
                    <div style={{ 
                      background: 'white', 
                      padding: '8px', 
                      border: '2px solid #003d82',
                      textAlign: 'center'
                    }}>
                      <strong>GJOBA FINALE:</strong><br />
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#003d82' }}>
                        {selectedEntry.calculationResults.finalAmount.toLocaleString()} {selectedEntry.calculationResults.currency}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedEntry.calculationResults.appliedMultipliers.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ fontSize: '11px' }}>Multiplikues të aplikuar:</strong>
                    <ul style={{ margin: '4px 0 0 16px', fontSize: '10px' }}>
                      {selectedEntry.calculationResults.appliedMultipliers.map((mult, index) => (
                        <li key={index}>{mult}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedEntry.calculationResults.appliedReductions.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ fontSize: '11px' }}>Reduktimete aplikuar:</strong>
                    <ul style={{ margin: '4px 0 0 16px', fontSize: '10px' }}>
                      {selectedEntry.calculationResults.appliedReductions.map((red, index) => (
                        <li key={index}>{red}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedEntry.notes && (
                  <div style={{ 
                    background: 'white', 
                    border: '1px inset #c0c0c0', 
                    padding: '8px',
                    marginBottom: '16px',
                    fontSize: '11px'
                  }}>
                    <strong>Shënime:</strong><br />
                    {selectedEntry.notes}
                  </div>
                )}

                <div style={{ 
                  background: '#f0f0f0', 
                  border: '1px inset #c0c0c0', 
                  padding: '8px',
                  marginBottom: '16px',
                  fontSize: '11px'
                }}>
                  <strong>Statusi i aplikimit:</strong> {selectedEntry.isApplied ? 'Aplikuar' : 'Jo-aplikuar'}
                  {selectedEntry.isApplied && selectedEntry.appliedDate && (
                    <span> - {new Date(selectedEntry.appliedDate).toLocaleString('sq-AL')}</span>
                  )}
                  {selectedEntry.caseId && <div><strong>Rasti:</strong> {selectedEntry.caseId}</div>}
                  {selectedEntry.fineId && <div><strong>Gjoba:</strong> {selectedEntry.fineId}</div>}
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  gap: '8px',
                  borderTop: '1px solid #c0c0c0',
                  paddingTop: '16px'
                }}>
                  <button 
                    className="classic-button"
                    onClick={() => {
                      const json = JSON.stringify(selectedEntry, null, 2);
                      navigator.clipboard.writeText(json);
                      alert('Të dhënat u kopjuan në clipboard');
                    }}
                    style={{ fontSize: '11px' }}
                  >
                    📋 Kopjo të Dhënat
                  </button>
                  <button 
                    className="classic-button"
                    onClick={() => setSelectedEntry(null)}
                    style={{ fontSize: '11px' }}
                  >
                    🚪 Mbyll
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="calculation-statistics">
          <div>
            <strong>📊 Statistika e Historikut:</strong><br />
            Llogaritje gjithsej: {history.length}<br />
            Të aplikuara: {history.filter(h => h.isApplied).length}<br />
            Sot: {history.filter(h => new Date(h.calculationDate).toDateString() === new Date().toDateString()).length}
          </div>
          <div>
            <strong>👥 Përdoruesit aktiv:</strong><br />
            Përdorues të ndryshëm: {new Set(history.map(h => h.username)).size}<br />
            Role të ndryshme: {new Set(history.map(h => h.userRole)).size}<br />
            Përdoruesi aktual: {state.user?.username}
          </div>
          <div>
            <strong>💰 Vlerat e gjobave:</strong><br />
            Vlera mesatare: {Math.round(history.reduce((sum, h) => sum + h.calculationResults.finalAmount, 0) / history.length).toLocaleString()} EUR<br />
            Vlera maksimale: {Math.max(...history.map(h => h.calculationResults.finalAmount)).toLocaleString()} EUR<br />
            Vlera minimale: {Math.min(...history.map(h => h.calculationResults.finalAmount)).toLocaleString()} EUR
          </div>
        </div>
      </div>
    </div>
  );
};

export default FineCalculationHistory;
