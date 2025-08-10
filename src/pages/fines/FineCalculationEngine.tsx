import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts';
import type {
  FineCalculationRule,
  CalculationInput,
  CalculationResult,
  FineCalculationHistory,
  FineCalculationStatistics
} from '../../types/FineCalculation';
import { fineCalculationService } from '../../services/fineCalculationService';

const FineCalculationEngine: React.FC = () => {
  const { state } = useAuth();
  const [rules, setRules] = useState<FineCalculationRule[]>([]);
  const [selectedRule, setSelectedRule] = useState<FineCalculationRule | null>(null);
  const [calculationInput, setCalculationInput] = useState<CalculationInput>({
    violationType: '',
    isRepeatOffense: false,
    severityLevel: 'moderate',
    cooperationLevel: 'partial',
    economicImpact: 'medium',
    isVoluntaryDisclosure: false,
    isImmediatePayment: false,
    isFirstTimeOffender: true,
    isCooperativeSubject: false,
    isMinorTechnicalError: false
  });
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [showCalculationDetails, setShowCalculationDetails] = useState(false);
  const [statistics, setStatistics] = useState<FineCalculationStatistics | null>(null);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState<FineCalculationHistory[]>([]);

  useEffect(() => {
    const loadRules = async () => {
      try {
        const data = await fineCalculationService.getRules();
        setRules(data);
      } catch (error) {
        console.error('Error loading calculation rules:', error);
      }
    };

    const loadStatistics = async () => {
      try {
        const stats = await fineCalculationService.getStatistics();
        setStatistics(stats);
      } catch (error) {
        console.error('Error loading statistics:', error);
      }
    };

    const loadHistory = async () => {
      try {
        const history = await fineCalculationService.getCalculationHistory({
          userId: state.user?.id
        });
        setCalculationHistory(history);
      } catch (error) {
        console.error('Error loading calculation history:', error);
      }
    };

    const initializeEngine = async () => {
      await loadRules();
      await loadStatistics();
      await loadHistory();
    };

    initializeEngine();
  }, [state.user?.id]);

  const calculateFine = async (): Promise<CalculationResult> => {
    if (!selectedRule) {
      throw new Error('Nuk është zgjedhur rregulla për llogaritjen');
    }

    try {
      const result = await fineCalculationService.calculateFine(calculationInput, selectedRule.id);
      return result;
    } catch (error) {
      console.error('Error calculating fine:', error);
      throw error;
    }
  };

  const handleCalculate = async () => {
    try {
      const result = await calculateFine();
      setCalculationResult(result);
      setShowCalculationDetails(true);
    } catch (error) {
      alert(`Gabim në llogaritje: ${error}`);
    }
  };

  const handleSaveCalculation = async () => {
    if (!calculationResult || !selectedRule) {
      return;
    }

    try {
      await fineCalculationService.saveCalculation({
        ruleId: selectedRule.id,
        input: calculationInput,
        result: calculationResult,
        calculatedBy: state.user?.id || 'unknown',
        approved: false
      });
      
      // Reload history after saving
      try {
        const history = await fineCalculationService.getCalculationHistory({
          userId: state.user?.id
        });
        setCalculationHistory(history);
      } catch (error) {
        console.error('Error reloading calculation history:', error);
      }

      alert('Llogaritja u ruajt me sukses!');
    } catch (error) {
      console.error('Error saving calculation:', error);
      alert('Gabim në ruajtjen e llogaritjes');
    }
  };

  const handleRuleChange = (ruleId: string) => {
    const rule = rules.find(r => r.id === ruleId);
    setSelectedRule(rule || null);
    setCalculationResult(null);
  };

  return (
    <div className="classic-window" style={{ margin: '20px', maxWidth: '100%' }}>
      <div className="classic-window-header">
        🧮 Motori i Llogaritjes së Gjobave Administrative
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
            🧮 Llogaritës i Gjobave sipas Kodit Doganor të Shqipërisë
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📋 Rregullat
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📊 Historiku
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              🖨️ Printo
            </button>
          </div>
        </div>

        {/* Rule Selection */}
        <div style={{ 
          background: '#f8f8f8', 
          border: '1px inset #c0c0c0', 
          padding: '16px', 
          marginBottom: '16px' 
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '12px' }}>📋 Zgjedhja e Rregullës së Llogaritjes:</h4>
          
          <div className="classic-form-row">
            <label className="classic-label" style={{ fontSize: '11px' }}>Lloji i Kundërvajtjes:</label>
            <select
              className="classic-dropdown"
              value={selectedRule?.id || ''}
              onChange={(e) => handleRuleChange(e.target.value)}
              style={{ fontSize: '11px', width: '100%' }}
            >
              <option value="">-- Zgjidhni llojin e kundërvajtjes --</option>
              {rules.map(rule => (
                <option key={rule.id} value={rule.id}>
                  {rule.violationCode} - {rule.violationNameAlbanian}
                </option>
              ))}
            </select>
          </div>

          {selectedRule && (
            <div style={{ 
              marginTop: '12px', 
              padding: '12px', 
              background: 'white', 
              border: '1px inset #c0c0c0',
              fontSize: '11px'
            }}>
              <div><strong>Kodi:</strong> {selectedRule.violationCode}</div>
              <div><strong>Përshkrimi:</strong> {selectedRule.violationNameAlbanian}</div>
              <div><strong>Baza ligjore:</strong> {selectedRule.legalBasis}</div>
              <div><strong>Vlera bazë:</strong> {selectedRule.baseAmount.toLocaleString()} {selectedRule.currency}</div>
              <div><strong>Lloji i llogaritjes:</strong> {selectedRule.calculationType}</div>
              {selectedRule.minimumAmount && (
                <div><strong>Minimumi:</strong> {selectedRule.minimumAmount.toLocaleString()} {selectedRule.currency}</div>
              )}
              {selectedRule.maximumAmount && (
                <div><strong>Maksimumi:</strong> {selectedRule.maximumAmount.toLocaleString()} {selectedRule.currency}</div>
              )}
            </div>
          )}
        </div>

        {/* Calculation Inputs */}
        {selectedRule && (
          <div style={{ 
            background: '#f8f8f8', 
            border: '1px inset #c0c0c0', 
            padding: '16px', 
            marginBottom: '16px' 
          }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '12px' }}>🔢 Parametrat e Llogaritjes:</h4>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '16px',
              marginBottom: '16px'
            }}>
              {/* Violation Value (for percentage calculations) */}
              {selectedRule.calculationType === 'PERCENTAGE' && (
                <div className="classic-form-row">
                  <label className="classic-label" style={{ fontSize: '11px' }}>
                    Vlera e mallrave (EUR):
                  </label>
                  <input
                    type="number"
                    className="classic-textbox"
                    value={calculationInput.violationValue || ''}
                    onChange={(e) => setCalculationInput({
                      ...calculationInput,
                      violationValue: parseFloat(e.target.value) || 0
                    })}
                    placeholder="0.00"
                    style={{ fontSize: '11px' }}
                  />
                </div>
              )}

              {/* Severity Level */}
              <div className="classic-form-row">
                <label className="classic-label" style={{ fontSize: '11px' }}>Shkalla e rëndesës:</label>
                <select
                  className="classic-dropdown"
                  value={calculationInput.severityLevel}
                  onChange={(e) => setCalculationInput({
                    ...calculationInput,
                    severityLevel: e.target.value as CalculationInput['severityLevel']
                  })}
                  style={{ fontSize: '11px' }}
                >
                  <option value="minor">E vogël</option>
                  <option value="moderate">E mesme</option>
                  <option value="severe">E rëndë</option>
                  <option value="critical">Kritike</option>
                </select>
              </div>

              {/* Cooperation Level */}
              <div className="classic-form-row">
                <label className="classic-label" style={{ fontSize: '11px' }}>Niveli i bashkëpunimit:</label>
                <select
                  className="classic-dropdown"
                  value={calculationInput.cooperationLevel}
                  onChange={(e) => setCalculationInput({
                    ...calculationInput,
                    cooperationLevel: e.target.value as CalculationInput['cooperationLevel']
                  })}
                  style={{ fontSize: '11px' }}
                >
                  <option value="full">I plotë</option>
                  <option value="partial">I pjesshëm</option>
                  <option value="none">Asnjë</option>
                </select>
              </div>

              {/* Economic Impact */}
              <div className="classic-form-row">
                <label className="classic-label" style={{ fontSize: '11px' }}>Impakti ekonomik:</label>
                <select
                  className="classic-dropdown"
                  value={calculationInput.economicImpact}
                  onChange={(e) => setCalculationInput({
                    ...calculationInput,
                    economicImpact: e.target.value as CalculationInput['economicImpact']
                  })}
                  style={{ fontSize: '11px' }}
                >
                  <option value="low">I ulët</option>
                  <option value="medium">I mesëm</option>
                  <option value="high">I lartë</option>
                  <option value="critical">Kritik</option>
                </select>
              </div>
            </div>

            {/* Boolean Factors */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '12px',
              marginBottom: '16px'
            }}>
              <label className="classic-checkbox-label" style={{ fontSize: '11px' }}>
                <input
                  type="checkbox"
                  className="classic-checkbox"
                  checked={calculationInput.isRepeatOffense}
                  onChange={(e) => setCalculationInput({
                    ...calculationInput,
                    isRepeatOffense: e.target.checked
                  })}
                />
                Kundërvajtje e përsëritur
              </label>

              <label className="classic-checkbox-label" style={{ fontSize: '11px' }}>
                <input
                  type="checkbox"
                  className="classic-checkbox"
                  checked={calculationInput.isVoluntaryDisclosure}
                  onChange={(e) => setCalculationInput({
                    ...calculationInput,
                    isVoluntaryDisclosure: e.target.checked
                  })}
                />
                Zbulim vullnetar
              </label>

              <label className="classic-checkbox-label" style={{ fontSize: '11px' }}>
                <input
                  type="checkbox"
                  className="classic-checkbox"
                  checked={calculationInput.isImmediatePayment}
                  onChange={(e) => setCalculationInput({
                    ...calculationInput,
                    isImmediatePayment: e.target.checked
                  })}
                />
                Pagesë e menjëhershme
              </label>

              <label className="classic-checkbox-label" style={{ fontSize: '11px' }}>
                <input
                  type="checkbox"
                  className="classic-checkbox"
                  checked={calculationInput.isFirstTimeOffender}
                  onChange={(e) => setCalculationInput({
                    ...calculationInput,
                    isFirstTimeOffender: e.target.checked
                  })}
                />
                Kundërvajtës për herë të parë
              </label>

              <label className="classic-checkbox-label" style={{ fontSize: '11px' }}>
                <input
                  type="checkbox"
                  className="classic-checkbox"
                  checked={calculationInput.isCooperativeSubject}
                  onChange={(e) => setCalculationInput({
                    ...calculationInput,
                    isCooperativeSubject: e.target.checked
                  })}
                />
                Subjekt bashkëpunues
              </label>

              <label className="classic-checkbox-label" style={{ fontSize: '11px' }}>
                <input
                  type="checkbox"
                  className="classic-checkbox"
                  checked={calculationInput.isMinorTechnicalError}
                  onChange={(e) => setCalculationInput({
                    ...calculationInput,
                    isMinorTechnicalError: e.target.checked
                  })}
                />
                Gabim i vogël teknik
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button 
                className="classic-button classic-button-primary"
                onClick={handleCalculate}
                style={{ fontSize: '11px' }}
              >
                🧮 Llogarit Gjobën
              </button>
              <button 
                className="classic-button"
                onClick={() => {
                  setCalculationInput({
                    violationType: '',
                    isRepeatOffense: false,
                    severityLevel: 'moderate',
                    cooperationLevel: 'partial',
                    economicImpact: 'medium',
                    isVoluntaryDisclosure: false,
                    isImmediatePayment: false,
                    isFirstTimeOffender: true,
                    isCooperativeSubject: false,
                    isMinorTechnicalError: false
                  });
                  setCalculationResult(null);
                }}
                style={{ fontSize: '11px' }}
              >
                🗑️ Pastro
              </button>
            </div>
          </div>
        )}

        {/* Calculation Result */}
        {calculationResult && (
          <div style={{ 
            background: '#e8f4fd', 
            border: '2px solid #003d82', 
            padding: '16px', 
            marginBottom: '16px' 
          }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#003d82' }}>
              💰 Rezultati i Llogaritjes
            </h4>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '12px' }}>
                <strong>Vlera bazë:</strong><br />
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {calculationResult.baseAmount.toLocaleString()} {calculationResult.currency}
                </span>
              </div>

              <div style={{ fontSize: '12px' }}>
                <strong>Pas multiplikuesve:</strong><br />
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {calculationResult.multipliedAmount.toLocaleString()} {calculationResult.currency}
                </span>
              </div>

              <div style={{ fontSize: '12px' }}>
                <strong>Pas reduktimeve:</strong><br />
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {calculationResult.reducedAmount.toLocaleString()} {calculationResult.currency}
                </span>
              </div>

              <div style={{ 
                fontSize: '12px', 
                background: 'white', 
                padding: '8px', 
                border: '2px solid #003d82',
                textAlign: 'center'
              }}>
                <strong>GJOBA FINALE:</strong><br />
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#003d82' }}>
                  {calculationResult.finalAmount.toLocaleString()} {calculationResult.currency}
                </span>
              </div>
            </div>

            {calculationResult.appliedMultipliers.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <strong style={{ fontSize: '11px' }}>Multiplikues të aplikuar:</strong>
                <ul style={{ margin: '4px 0 0 16px', fontSize: '10px' }}>
                  {calculationResult.appliedMultipliers.map((mult, index) => (
                    <li key={index}>{mult}</li>
                  ))}
                </ul>
              </div>
            )}

            {calculationResult.appliedReductions.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <strong style={{ fontSize: '11px' }}>Reduktimete aplikuar:</strong>
                <ul style={{ margin: '4px 0 0 16px', fontSize: '10px' }}>
                  {calculationResult.appliedReductions.map((red, index) => (
                    <li key={index}>{red}</li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="classic-button"
                onClick={() => setShowCalculationDetails(!showCalculationDetails)}
                style={{ fontSize: '11px' }}
              >
                {showCalculationDetails ? '📉 Fshih Detajet' : '📈 Shfaq Detajet'}
              </button>
              <button 
                className="classic-button"
                onClick={handleSaveCalculation}
                style={{ fontSize: '11px' }}
              >
                💾 Ruaj Llogaritjen
              </button>
              <button 
                className="classic-button"
                onClick={() => setShowHistoryDialog(true)}
                style={{ fontSize: '11px' }}
              >
                📚 Historiku
              </button>
              <button className="classic-button" style={{ fontSize: '11px' }}>
                🖨️ Printo Raportin
              </button>
            </div>
          </div>
        )}

        {/* Detailed Calculation Breakdown */}
        {showCalculationDetails && calculationResult && (
          <div style={{ 
            background: 'white', 
            border: '1px inset #c0c0c0', 
            padding: '16px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '12px' }}>📊 Detajet e Llogaritjes Hap pas Hapi:</h4>
            
            <div style={{ 
              border: '1px inset #c0c0c0', 
              background: 'white'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '11px'
              }}>
                <thead style={{ background: '#c0c0c0' }}>
                  <tr>
                    <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Hapi</th>
                    <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Përshkrimi</th>
                    <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'right' }}>Faktori</th>
                    <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'right' }}>Vlera (EUR)</th>
                  </tr>
                </thead>
                <tbody>
                  {calculationResult.calculationBreakdown.map((step, index) => (
                    <tr 
                      key={index}
                      style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8' }}
                    >
                      <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'center' }}>
                        {step.step}
                      </td>
                      <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                        {step.description}
                      </td>
                      <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'right' }}>
                        {step.factor.toFixed(3)}
                      </td>
                      <td style={{ 
                        padding: '6px', 
                        border: '1px solid #c0c0c0', 
                        textAlign: 'right',
                        fontWeight: 'bold'
                      }}>
                        {step.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ 
              marginTop: '12px', 
              padding: '8px', 
              background: '#f0f0f0',
              border: '1px inset #c0c0c0',
              fontSize: '10px'
            }}>
              <strong>Baza ligjore:</strong> {calculationResult.legalBasis}
            </div>
          </div>
        )}

        {/* Usage Statistics */}
        <div style={{ 
          background: '#f0f0f0', 
          border: '1px inset #c0c0c0', 
          padding: '12px', 
          fontSize: '11px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <strong>👤 Përdoruesi aktual:</strong><br />
            {state.user?.username}<br />
            Roli: {state.user?.role?.name}<br />
            Departamenti: {state.user?.department}
          </div>
          <div>
            <strong>📊 Statistika:</strong><br />
            Rregulla aktive: {rules.filter(r => r.isActive).length}<br />
            Llogaritje të kryera sot: {statistics?.calculationsToday || 0}<br />
            Vlera mesatare: {statistics?.averageAmount?.toLocaleString() || 'N/A'} EUR
          </div>
          <div>
            <strong>📈 Totale:</strong><br />
            Gjithsej llogaritje: {statistics?.totalCalculations || 0}<br />
            Vlera totale: {statistics?.totalAmountCalculated?.toLocaleString() || 'N/A'} EUR<br />
            Gjoba të lëshuara: {statistics?.totalFinesIssued || 0}
          </div>
          <div>
            <strong>⚖️ Informata ligjore:</strong><br />
            Kodi Doganor i Shqipërisë<br />
            Viti: 2024<br />
            Përditësimi i fundit: 01.01.2024
          </div>
        </div>

        {/* Calculation History Dialog */}
        {showHistoryDialog && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              border: '2px outset #c0c0c0',
              borderRadius: '4px',
              width: '90%',
              maxWidth: '800px',
              maxHeight: '80%',
              overflow: 'auto'
            }}>
              <div className="classic-window-header">
                📚 Historiku i Llogaritjeve të Gjobave
              </div>
              <div className="classic-window-content" style={{ padding: '16px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Llogaritjet e kryera nga {state.user?.fullName}:</strong>
                </div>

                {calculationHistory.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px', 
                    color: '#666',
                    fontStyle: 'italic'
                  }}>
                    Nuk ka llogaritje të ruajtura akoma.
                  </div>
                ) : (
                  <div style={{ 
                    border: '1px inset #c0c0c0', 
                    background: 'white'
                  }}>
                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'collapse',
                      fontSize: '11px'
                    }}>
                      <thead style={{ background: '#c0c0c0' }}>
                        <tr>
                          <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Data</th>
                          <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Lloji</th>
                          <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'right' }}>Vlera</th>
                          <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'center' }}>Statusi</th>
                          <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Rasti</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculationHistory.map((calc, index) => (
                          <tr 
                            key={calc.id}
                            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8' }}
                          >
                            <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                              {calc.calculatedAt.toLocaleDateString('sq-AL')}
                            </td>
                            <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                              {calc.input.violationType}
                            </td>
                            <td style={{ 
                              padding: '6px', 
                              border: '1px solid #c0c0c0', 
                              textAlign: 'right',
                              fontWeight: 'bold'
                            }}>
                              {calc.result.finalAmount.toLocaleString()} {calc.result.currency}
                            </td>
                            <td style={{ 
                              padding: '6px', 
                              border: '1px solid #c0c0c0',
                              textAlign: 'center'
                            }}>
                              <span style={{
                                padding: '2px 6px',
                                borderRadius: '3px',
                                backgroundColor: calc.approved ? '#28a745' : '#ffc107',
                                color: 'white',
                                fontSize: '10px'
                              }}>
                                {calc.approved ? 'Miratuar' : 'Në Pritje'}
                              </span>
                            </td>
                            <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                              {calc.caseId || 'N/A'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '8px',
                  marginTop: '16px'
                }}>
                  <button 
                    className="classic-button"
                    onClick={() => setShowHistoryDialog(false)}
                    style={{ fontSize: '11px' }}
                  >
                    🚪 Mbyll
                  </button>
                  <button 
                    className="classic-button"
                    onClick={() => window.print()}
                    style={{ fontSize: '11px' }}
                  >
                    🖨️ Printo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FineCalculationEngine;
