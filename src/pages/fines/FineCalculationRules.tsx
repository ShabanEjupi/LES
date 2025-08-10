import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts';
import type {
  FineCalculationRule
} from '../../types/FineCalculation';
import { fineCalculationService } from '../../services/fineCalculationService';

const FineCalculationRules: React.FC = () => {
  const { state } = useAuth();
  const [rules, setRules] = useState<FineCalculationRule[]>([]);
  const [selectedRule, setSelectedRule] = useState<FineCalculationRule | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingRule, setEditingRule] = useState<Partial<FineCalculationRule>>({});
  const [filters, setFilters] = useState({
    violationType: '',
    isActive: '',
    searchText: ''
  });

  useEffect(() => {
    // Load existing rules
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const loadedRules = await fineCalculationService.getRules();
      setRules(loadedRules);
    } catch (error) {
      console.error('Failed to load rules:', error);
      // Fallback to mock data if service fails
      const mockRules: FineCalculationRule[] = [
        {
          id: 'CONTRABAND_001',
          violationType: 'CONTRABAND',
          violationCode: 'KV-273',
          violationNameAlbanian: 'Kontrabandë e Mallrave',
          violationNameEnglish: 'Goods Smuggling',
          legalBasis: 'Neni 273, Kodi Doganor i Republikës së Shqipërisë',
          baseAmount: 5000,
          currency: 'EUR',
          calculationType: 'PERCENTAGE',
          percentageRate: 200,
          minimumAmount: 5000,
          maximumAmount: 100000,
          multiplierFactors: {
            firstOffense: 1.0,
            repeatOffense: 2.0,
            severity: { minor: 0.5, moderate: 1.0, severe: 1.5, critical: 2.0 },
            cooperation: { full: 0.8, partial: 1.0, none: 1.5 },
            economicImpact: { low: 0.8, medium: 1.0, high: 1.3, critical: 1.8 }
          },
          reductionFactors: {
            voluntaryDisclosure: 0.3,
            immediatePayment: 0.1,
            firstTimeOffender: 0.2,
            cooperativeSubject: 0.15,
            minorTechnicalError: 0.5
          },
          isActive: true,
          effectiveDate: '2024-01-01',
          notes: 'Gjoba për kontrabandë sipas Kodit Doganor',
          createdBy: 'sistem',
          createdAt: '2024-01-01T00:00:00Z',
          version: 1
        }
        // Add more mock rules as needed
      ];
      setRules(mockRules);
    }
  };

  const handleCreateRule = () => {
    setEditingRule({
      violationType: '',
      violationCode: '',
      violationNameAlbanian: '',
      violationNameEnglish: '',
      legalBasis: '',
      baseAmount: 0,
      currency: 'EUR',
      calculationType: 'FIXED',
      isActive: true,
      effectiveDate: new Date().toISOString().split('T')[0],
      notes: '',
      multiplierFactors: {
        firstOffense: 1.0,
        repeatOffense: 1.5,
        severity: { minor: 0.8, moderate: 1.0, severe: 1.2, critical: 1.5 },
        cooperation: { full: 0.8, partial: 1.0, none: 1.2 },
        economicImpact: { low: 0.9, medium: 1.0, high: 1.1, critical: 1.3 }
      },
      reductionFactors: {
        voluntaryDisclosure: 0.2,
        immediatePayment: 0.1,
        firstTimeOffender: 0.15,
        cooperativeSubject: 0.1,
        minorTechnicalError: 0.3
      }
    });
    setIsCreating(true);
  };

  const handleEditRule = (rule: FineCalculationRule) => {
    setEditingRule({ ...rule });
    setSelectedRule(rule);
    setIsEditing(true);
  };

  const handleSaveRule = async () => {
    try {
      if (isCreating) {
        const newRule: FineCalculationRule = {
          ...editingRule as FineCalculationRule,
          id: `RULE_${Date.now()}`,
          createdBy: state.user?.username || 'unknown',
          createdAt: new Date().toISOString(),
          version: 1
        };
        await fineCalculationService.createRule(newRule);
        setRules([...rules, newRule]);
      } else if (isEditing && selectedRule) {
        const updatedRule: FineCalculationRule = {
          ...editingRule as FineCalculationRule,
          lastModifiedBy: state.user?.username || 'unknown',
          lastModifiedAt: new Date().toISOString(),
          version: (selectedRule.version || 1) + 1
        };
        await fineCalculationService.updateRule(updatedRule.id, updatedRule);
        setRules(rules.map(rule => rule.id === selectedRule.id ? updatedRule : rule));
      }

      setIsCreating(false);
      setIsEditing(false);
      setEditingRule({});
      setSelectedRule(null);
    } catch (error) {
      console.error('Failed to save rule:', error);
      alert('Gabim në ruajtjen e rregullës. Provoni përsëri.');
    }
  };

  const handleDeleteRule = (ruleId: string) => {
    if (confirm('Jeni të sigurt që dëshironi të fshini këtë rregull? Ky veprim nuk mund të zhbëhet.')) {
      setRules(rules.filter(rule => rule.id !== ruleId));
    }
  };

  const getFilteredRules = () => {
    let filtered = rules;

    if (filters.violationType) {
      filtered = filtered.filter(rule => rule.violationType === filters.violationType);
    }

    if (filters.isActive !== '') {
      const isActive = filters.isActive === 'true';
      filtered = filtered.filter(rule => rule.isActive === isActive);
    }

    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(rule => 
        rule.violationNameAlbanian.toLowerCase().includes(searchLower) ||
        rule.violationCode.toLowerCase().includes(searchLower) ||
        rule.legalBasis.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
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
        📐 Menaxhimi i Rregullave të Llogaritjes së Gjobave
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
            📐 Rregullat e Llogaritjes - Gjithsej: {getFilteredRules().length}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="classic-button classic-button-primary"
              onClick={handleCreateRule}
              style={{ fontSize: '11px' }}
            >
              ➕ Rregull i Ri
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📤 Eksporto
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📥 Importo
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '12px'
          }}>
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
              <label className="classic-label" style={{ fontSize: '11px' }}>Statusi:</label>
              <select
                className="classic-dropdown"
                value={filters.isActive}
                onChange={(e) => setFilters({...filters, isActive: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="true">Aktive</option>
                <option value="false">Jo-aktive</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Kërko:</label>
              <input
                type="text"
                className="classic-textbox"
                value={filters.searchText}
                onChange={(e) => setFilters({...filters, searchText: e.target.value})}
                placeholder="Kërko në rregulla..."
                style={{ fontSize: '11px' }}
              />
            </div>
          </div>
        </div>

        {/* Rules Table */}
        <div style={{ 
          border: '1px inset #c0c0c0', 
          background: 'white',
          maxHeight: '400px',
          overflow: 'auto'
        }}>
          <table className="calculation-breakdown-table">
            <thead>
              <tr>
                <th>Kodi</th>
                <th>Lloji</th>
                <th>Përshkrimi (Shqip)</th>
                <th>Vlera Bazë</th>
                <th>Lloji i Llogaritjes</th>
                <th>Statusi</th>
                <th>Data e Krijimit</th>
                <th>Veprimet</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredRules().map((rule, index) => (
                <tr 
                  key={rule.id}
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8',
                    cursor: 'pointer'
                  }}
                  onDoubleClick={() => setSelectedRule(rule)}
                >
                  <td style={{ fontWeight: 'bold', color: '#003d82' }}>
                    {rule.violationCode}
                  </td>
                  <td>{rule.violationType}</td>
                  <td>{rule.violationNameAlbanian}</td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    {rule.baseAmount.toLocaleString()} {rule.currency}
                  </td>
                  <td>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: rule.calculationType === 'FIXED' ? '#28a745' : 
                                     rule.calculationType === 'PERCENTAGE' ? '#007bff' : '#ffc107',
                      color: 'white',
                      fontSize: '10px'
                    }}>
                      {rule.calculationType}
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: rule.isActive ? '#28a745' : '#dc3545',
                      color: 'white',
                      fontSize: '10px'
                    }}>
                      {rule.isActive ? 'Aktive' : 'Jo-aktive'}
                    </span>
                  </td>
                  <td style={{ fontSize: '10px' }}>
                    {new Date(rule.createdAt).toLocaleDateString('sq-AL')}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button 
                        className="classic-button"
                        onClick={() => setSelectedRule(rule)}
                        style={{ fontSize: '10px', padding: '2px 6px' }}
                        title="Shiko detajet"
                      >
                        👁️
                      </button>
                      <button 
                        className="classic-button"
                        onClick={() => handleEditRule(rule)}
                        style={{ fontSize: '10px', padding: '2px 6px' }}
                        title="Edito"
                      >
                        ✏️
                      </button>
                      <button 
                        className="classic-button"
                        onClick={() => handleDeleteRule(rule.id)}
                        style={{ fontSize: '10px', padding: '2px 6px' }}
                        title="Fshij"
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

        {getFilteredRules().length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666',
            fontSize: '12px'
          }}>
            ℹ️ Nuk ka rregulla të gjetur sipas kritereve të kërkimit.
          </div>
        )}

        {/* Rule Detail Modal */}
        {selectedRule && !isEditing && !isCreating && (
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
                📐 Detajet e Rregullës - {selectedRule.violationCode}
              </div>
              <div className="classic-window-content">
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '12px' }}>📋 Informata Bazë:</h4>
                    <div style={{ fontSize: '11px' }}>
                      <div><strong>Kodi:</strong> {selectedRule.violationCode}</div>
                      <div><strong>Lloji:</strong> {selectedRule.violationType}</div>
                      <div><strong>Emri (Shqip):</strong> {selectedRule.violationNameAlbanian}</div>
                      <div><strong>Emri (Anglisht):</strong> {selectedRule.violationNameEnglish}</div>
                      <div><strong>Baza ligjore:</strong> {selectedRule.legalBasis}</div>
                      <div><strong>Statusi:</strong> {selectedRule.isActive ? 'Aktive' : 'Jo-aktive'}</div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '12px' }}>💰 Parametrat e Llogaritjes:</h4>
                    <div style={{ fontSize: '11px' }}>
                      <div><strong>Vlera bazë:</strong> {selectedRule.baseAmount.toLocaleString()} {selectedRule.currency}</div>
                      <div><strong>Lloji i llogaritjes:</strong> {selectedRule.calculationType}</div>
                      {selectedRule.percentageRate && (
                        <div><strong>Përqindja:</strong> {selectedRule.percentageRate}%</div>
                      )}
                      {selectedRule.minimumAmount && (
                        <div><strong>Minimumi:</strong> {selectedRule.minimumAmount.toLocaleString()} {selectedRule.currency}</div>
                      )}
                      {selectedRule.maximumAmount && (
                        <div><strong>Maksimumi:</strong> {selectedRule.maximumAmount.toLocaleString()} {selectedRule.currency}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  background: '#f8f8f8', 
                  border: '1px inset #c0c0c0', 
                  padding: '12px',
                  marginBottom: '16px'
                }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '12px' }}>🔢 Multiplikuesit:</h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '12px',
                    fontSize: '11px'
                  }}>
                    <div>
                      <strong>Kundërvajtje:</strong><br />
                      E parë: {selectedRule.multiplierFactors.firstOffense}<br />
                      E përsëritur: {selectedRule.multiplierFactors.repeatOffense}
                    </div>
                    <div>
                      <strong>Rëndësia:</strong><br />
                      E vogël: {selectedRule.multiplierFactors.severity.minor}<br />
                      E mesme: {selectedRule.multiplierFactors.severity.moderate}<br />
                      E rëndë: {selectedRule.multiplierFactors.severity.severe}<br />
                      Kritike: {selectedRule.multiplierFactors.severity.critical}
                    </div>
                    <div>
                      <strong>Bashkëpunimi:</strong><br />
                      I plotë: {selectedRule.multiplierFactors.cooperation.full}<br />
                      I pjesshëm: {selectedRule.multiplierFactors.cooperation.partial}<br />
                      Asnjë: {selectedRule.multiplierFactors.cooperation.none}
                    </div>
                    <div>
                      <strong>Impakti ekonomik:</strong><br />
                      I ulët: {selectedRule.multiplierFactors.economicImpact.low}<br />
                      I mesëm: {selectedRule.multiplierFactors.economicImpact.medium}<br />
                      I lartë: {selectedRule.multiplierFactors.economicImpact.high}<br />
                      Kritik: {selectedRule.multiplierFactors.economicImpact.critical}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  background: '#e8f4fd', 
                  border: '1px inset #c0c0c0', 
                  padding: '12px',
                  marginBottom: '16px'
                }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '12px' }}>📉 Faktorët e Reduktimit:</h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                    gap: '8px',
                    fontSize: '11px'
                  }}>
                    <div>Zbulim vullnetar: -{(selectedRule.reductionFactors.voluntaryDisclosure * 100).toFixed(1)}%</div>
                    <div>Pagesë e menjëhershme: -{(selectedRule.reductionFactors.immediatePayment * 100).toFixed(1)}%</div>
                    <div>Kundërvajtës i ri: -{(selectedRule.reductionFactors.firstTimeOffender * 100).toFixed(1)}%</div>
                    <div>Subjekt bashkëpunues: -{(selectedRule.reductionFactors.cooperativeSubject * 100).toFixed(1)}%</div>
                    <div>Gabim teknik i vogël: -{(selectedRule.reductionFactors.minorTechnicalError * 100).toFixed(1)}%</div>
                  </div>
                </div>

                {selectedRule.notes && (
                  <div style={{ 
                    background: 'white', 
                    border: '1px inset #c0c0c0', 
                    padding: '8px',
                    marginBottom: '16px',
                    fontSize: '11px'
                  }}>
                    <strong>Shënime:</strong><br />
                    {selectedRule.notes}
                  </div>
                )}

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  gap: '8px',
                  borderTop: '1px solid #c0c0c0',
                  paddingTop: '16px'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="classic-button classic-button-primary"
                      onClick={() => handleEditRule(selectedRule)}
                      style={{ fontSize: '11px' }}
                    >
                      ✏️ Edito
                    </button>
                    <button 
                      className="classic-button"
                      onClick={() => {
                        const newRule = { ...selectedRule, id: `RULE_${Date.now()}` };
                        setEditingRule(newRule);
                        setIsCreating(true);
                        setSelectedRule(null);
                      }}
                      style={{ fontSize: '11px' }}
                    >
                      📋 Kopjo
                    </button>
                  </div>
                  
                  <button 
                    className="classic-button"
                    onClick={() => setSelectedRule(null)}
                    style={{ fontSize: '11px' }}
                  >
                    🚪 Mbyll
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Modal */}
        {(isEditing || isCreating) && (
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
            zIndex: 1001
          }}>
            <div className="classic-window" style={{ 
              width: '95%', 
              maxWidth: '900px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <div className="classic-window-header">
                📐 {isCreating ? 'Krijimi i Rregullës së Re' : 'Editimi i Rregullës'}
              </div>
              <div className="classic-window-content">
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div className="classic-form-row">
                    <label className="classic-label">Kodi i Kundërvajtjes:</label>
                    <input
                      type="text"
                      className="classic-textbox"
                      value={editingRule.violationCode || ''}
                      onChange={(e) => setEditingRule({...editingRule, violationCode: e.target.value})}
                      placeholder="KV-XXX"
                    />
                  </div>

                  <div className="classic-form-row">
                    <label className="classic-label">Lloji i Kundërvajtjes:</label>
                    <select
                      className="classic-dropdown"
                      value={editingRule.violationType || ''}
                      onChange={(e) => setEditingRule({...editingRule, violationType: e.target.value})}
                    >
                      <option value="">-- Zgjidhni llojin --</option>
                      {violationTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="classic-form-row">
                    <label className="classic-label">Emri në Shqip:</label>
                    <input
                      type="text"
                      className="classic-textbox"
                      value={editingRule.violationNameAlbanian || ''}
                      onChange={(e) => setEditingRule({...editingRule, violationNameAlbanian: e.target.value})}
                    />
                  </div>

                  <div className="classic-form-row">
                    <label className="classic-label">Emri në Anglisht:</label>
                    <input
                      type="text"
                      className="classic-textbox"
                      value={editingRule.violationNameEnglish || ''}
                      onChange={(e) => setEditingRule({...editingRule, violationNameEnglish: e.target.value})}
                    />
                  </div>

                  <div className="classic-form-row">
                    <label className="classic-label">Vlera Bazë:</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="number"
                        className="classic-textbox"
                        value={editingRule.baseAmount || 0}
                        onChange={(e) => setEditingRule({...editingRule, baseAmount: parseFloat(e.target.value) || 0})}
                        style={{ flex: 1 }}
                      />
                      <select
                        className="classic-dropdown"
                        value={editingRule.currency || 'EUR'}
                        onChange={(e) => setEditingRule({...editingRule, currency: e.target.value as 'EUR' | 'USD' | 'ALL'})}
                        style={{ width: '80px' }}
                      >
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="ALL">ALL</option>
                      </select>
                    </div>
                  </div>

                  <div className="classic-form-row">
                    <label className="classic-label">Lloji i Llogaritjes:</label>
                    <select
                      className="classic-dropdown"
                      value={editingRule.calculationType || 'FIXED'}
                      onChange={(e) => setEditingRule({...editingRule, calculationType: e.target.value as 'FIXED' | 'PERCENTAGE' | 'PROGRESSIVE' | 'CUSTOM'})}
                    >
                      <option value="FIXED">E fiksuar</option>
                      <option value="PERCENTAGE">Përqindjesore</option>
                      <option value="PROGRESSIVE">Progressive</option>
                      <option value="CUSTOM">E personalizuar</option>
                    </select>
                  </div>
                </div>

                <div className="classic-form-row">
                  <label className="classic-label">Baza Ligjore:</label>
                  <textarea
                    className="classic-textbox"
                    value={editingRule.legalBasis || ''}
                    onChange={(e) => setEditingRule({...editingRule, legalBasis: e.target.value})}
                    rows={2}
                    placeholder="Neni X, Ligji për..."
                  />
                </div>

                <div className="classic-form-row">
                  <label className="classic-label">Shënime:</label>
                  <textarea
                    className="classic-textbox"
                    value={editingRule.notes || ''}
                    onChange={(e) => setEditingRule({...editingRule, notes: e.target.value})}
                    rows={3}
                    placeholder="Shënime shtesë për rregullën..."
                  />
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  gap: '8px',
                  marginTop: '20px',
                  borderTop: '1px solid #c0c0c0',
                  paddingTop: '16px'
                }}>
                  <button 
                    className="classic-button"
                    onClick={() => {
                      setIsCreating(false);
                      setIsEditing(false);
                      setEditingRule({});
                      setSelectedRule(null);
                    }}
                    style={{ fontSize: '11px' }}
                  >
                    ❌ Anulo
                  </button>
                  <button 
                    className="classic-button classic-button-primary"
                    onClick={handleSaveRule}
                    style={{ fontSize: '11px' }}
                  >
                    ✅ Ruaj
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="calculation-statistics">
          <div>
            <strong>📊 Statistika:</strong><br />
            Rregulla aktive: {rules.filter(r => r.isActive).length}<br />
            Rregulla gjithsej: {rules.length}<br />
            Lloje kundërvajtjesh: {new Set(rules.map(r => r.violationType)).size}
          </div>
          <div>
            <strong>👤 Përdoruesi aktual:</strong><br />
            {state.user?.username}<br />
            Roli: {state.user?.role?.name}<br />
            Departamenti: {state.user?.department}
          </div>
          <div>
            <strong>⚖️ Informata ligjore:</strong><br />
            Kodi Doganor i Shqipërisë<br />
            Viti: 2024<br />
            Përditësimi i fundit: 01.01.2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default FineCalculationRules;
