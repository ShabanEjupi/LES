import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { ClassicCard } from '../../components/common/ClassicCard';
import { ClassicButton } from '../../components/common/ClassicButton';
import type { 
  FineCalculationStatistics, 
  FineCalculationHistory,
  FineCalculationRule 
} from '../../types/FineCalculation';
import { fineCalculationService } from '../../services/fineCalculationService';

interface QuickStatsProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: 'primary' | 'success' | 'warning' | 'error';
}

const QuickStats: React.FC<QuickStatsProps> = ({ title, value, subtitle, variant = 'primary' }) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success': return '#d4edda';
      case 'warning': return '#fff3cd';
      case 'error': return '#f8d7da';
      default: return '#d1ecf1';
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'success': return '#28a745';
      case 'warning': return '#ffc107';
      case 'error': return '#dc3545';
      default: return '#17a2b8';
    }
  };

  return (
    <div style={{ 
      padding: '16px',
      backgroundColor: getBackgroundColor(),
      border: `2px solid ${getBorderColor()}`,
      borderRadius: '4px',
      textAlign: 'center',
      minWidth: '200px'
    }}>
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 'bold',
        color: getBorderColor(),
        marginBottom: '4px'
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '2px'
      }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ 
          fontSize: '11px',
          color: '#666',
          fontStyle: 'italic'
        }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

const FineCalculationDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState<FineCalculationStatistics | null>(null);
  const [recentCalculations, setRecentCalculations] = useState<FineCalculationHistory[]>([]);
  const [activeRules, setActiveRules] = useState<FineCalculationRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Load statistics
        const stats = await fineCalculationService.getStatistics();
        setStatistics(stats);

        // Load recent calculations (last 10)
        const recent = await fineCalculationService.getCalculationHistory({ limit: 10 });
        setRecentCalculations(recent);

        // Load active rules
        const rules = await fineCalculationService.getRules();
        const activeRulesList = rules.filter(rule => rule.isActive);
        setActiveRules(activeRulesList);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <MainLayout title="Panel i Gjobave - Duke u ngarkuar...">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '16px', color: '#666' }}>
            🔄 Duke ngarkuar të dhënat e panelit...
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Panel i Gjobave Administrative">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Header with Quick Actions */}
        <ClassicCard title="🧮 Paneli i Gjobave Administrative">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, color: '#1e3a8a' }}>
                Sistema e Llogaritjes së Gjobave
              </h2>
              <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>
                Administrata Doganore e Kosovës - Panel Kontrolli
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <ClassicButton 
                variant="primary"
                onClick={() => navigate('/fines/calculation-engine')}
              >
                ➕ Llogarit Gjobë të Re
              </ClassicButton>
              <ClassicButton 
                onClick={() => navigate('/fines/calculation-history')}
              >
                📊 Shiko Historikun
              </ClassicButton>
              <ClassicButton 
                onClick={() => navigate('/fines/calculation-rules')}
              >
                ⚙️ Menaxho Rregullat
              </ClassicButton>
            </div>
          </div>
        </ClassicCard>

        {/* Statistics Overview */}
        <ClassicCard title="📊 Statistikat e Përgjithshme">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <QuickStats 
              title="Llogaritje Totale"
              value={statistics?.totalCalculations || 0}
              subtitle="Të gjitha kohët"
              variant="primary"
            />
            <QuickStats 
              title="Llogaritje Sot"
              value={statistics?.calculationsToday || 0}
              subtitle={new Date().toLocaleDateString('sq-AL')}
              variant="success"
            />
            <QuickStats 
              title="Në Pritje Miratimi"
              value={statistics?.pendingApproval || 0}
              subtitle="Kërkon miratim"
              variant="warning"
            />
            <QuickStats 
              title="Vlera Totale"
              value={`€${(statistics?.totalFineAmount || 0).toLocaleString()}`}
              subtitle="Të gjitha gjobat"
              variant="error"
            />
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <QuickStats 
              title="Rregulla Aktive"
              value={activeRules.length}
              subtitle="Në përdorim"
              variant="success"
            />
            <QuickStats 
              title="Mesatarja Ditore"
              value={Math.round((statistics?.totalCalculations || 0) / 30)}
              subtitle="30 ditët e fundit"
              variant="primary"
            />
            <QuickStats 
              title="Përqindja e Miratimeve"
              value={`${Math.round(((statistics?.approvedCalculations || 0) / (statistics?.totalCalculations || 1)) * 100)}%`}
              subtitle="Llogaritje të miratuara"
              variant="success"
            />
            <QuickStats 
              title="Kohë Mesatare"
              value="3.5 min"
              subtitle="Për llogaritje"
              variant="primary"
            />
          </div>
        </ClassicCard>

        {/* Recent Calculations */}
        <ClassicCard title="📋 Llogaritjet e Fundit">
          {recentCalculations.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              color: '#666',
              fontStyle: 'italic'
            }}>
              Nuk ka llogaritje të reja në sistem.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                backgroundColor: 'white'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0' }}>
                    <th style={{ 
                      padding: '8px', 
                      border: '1px solid #c0c0c0',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      📅 Data
                    </th>
                    <th style={{ 
                      padding: '8px', 
                      border: '1px solid #c0c0c0',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ⚖️ Lloji i Kundërvajtjes
                    </th>
                    <th style={{ 
                      padding: '8px', 
                      border: '1px solid #c0c0c0',
                      textAlign: 'right',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      💰 Vlera
                    </th>
                    <th style={{ 
                      padding: '8px', 
                      border: '1px solid #c0c0c0',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ✅ Statusi
                    </th>
                    <th style={{ 
                      padding: '8px', 
                      border: '1px solid #c0c0c0',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      🔗 Veprimet
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentCalculations.map((calc, index) => (
                    <tr 
                      key={calc.id}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? 'white' : '#f9f9f9'
                      }}
                    >
                      <td style={{ padding: '6px', border: '1px solid #c0c0c0', fontSize: '11px' }}>
                        {calc.calculatedAt.toLocaleDateString('sq-AL')}
                      </td>
                      <td style={{ padding: '6px', border: '1px solid #c0c0c0', fontSize: '11px' }}>
                        {calc.input.violationType}
                      </td>
                      <td style={{ 
                        padding: '6px', 
                        border: '1px solid #c0c0c0', 
                        textAlign: 'right',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        color: '#e41e20'
                      }}>
                        €{calc.result.finalAmount.toLocaleString()}
                      </td>
                      <td style={{ 
                        padding: '6px', 
                        border: '1px solid #c0c0c0',
                        textAlign: 'center',
                        fontSize: '11px'
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
                      <td style={{ 
                        padding: '6px', 
                        border: '1px solid #c0c0c0',
                        textAlign: 'center'
                      }}>
                        <ClassicButton 
                          size="small"
                          onClick={() => navigate(`/fines/calculation-engine?id=${calc.id}`)}
                        >
                          👁️ Shiko
                        </ClassicButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            marginTop: '16px'
          }}>
            <ClassicButton 
              onClick={() => navigate('/fines/calculation-history')}
            >
              📊 Shiko Historikun e Plotë
            </ClassicButton>
          </div>
        </ClassicCard>

        {/* Active Rules Summary */}
        <ClassicCard title="⚙️ Rregullat Aktive">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '12px'
          }}>
            {activeRules.slice(0, 6).map(rule => (
              <div 
                key={rule.id}
                style={{
                  padding: '12px',
                  border: '1px solid #c0c0c0',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '4px'
                }}
              >
                <div style={{ 
                  fontWeight: 'bold',
                  fontSize: '12px',
                  color: '#1e3a8a',
                  marginBottom: '4px'
                }}>
                  {rule.violationCode} - {rule.violationNameAlbanian}
                </div>
                <div style={{ 
                  fontSize: '11px',
                  color: '#666',
                  marginBottom: '6px'
                }}>
                  Baza: €{rule.baseAmount.toLocaleString()} ({rule.calculationType})
                </div>
                <div style={{ 
                  fontSize: '10px',
                  color: '#999',
                  fontStyle: 'italic'
                }}>
                  Versioni {rule.version} - {rule.effectiveDate}
                </div>
              </div>
            ))}
          </div>
          
          {activeRules.length > 6 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              marginTop: '16px'
            }}>
              <ClassicButton 
                onClick={() => navigate('/fines/calculation-rules')}
              >
                ⚙️ Shiko të Gjitha Rregullat ({activeRules.length})
              </ClassicButton>
            </div>
          )}
        </ClassicCard>

        {/* Quick Actions */}
        <ClassicCard title="🚀 Veprime të Shpejta">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <ClassicButton 
                variant="primary"
                onClick={() => navigate('/fines/calculation-engine')}
                style={{ 
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px'
                }}
              >
                🧮 Llogarit Gjobë të Re
              </ClassicButton>
              <p style={{ fontSize: '11px', color: '#666', margin: '8px 0 0 0' }}>
                Fillo llogaritje të re automatike
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <ClassicButton 
                onClick={() => navigate('/fines/calculation-rules')}
                style={{ 
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px'
                }}
              >
                ⚙️ Menaxho Rregullat
              </ClassicButton>
              <p style={{ fontSize: '11px', color: '#666', margin: '8px 0 0 0' }}>
                Krijo dhe edito rregullat e llogaritjes
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <ClassicButton 
                onClick={() => navigate('/fines/calculation-history')}
                style={{ 
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px'
                }}
              >
                📊 Historiku i Plotë
              </ClassicButton>
              <p style={{ fontSize: '11px', color: '#666', margin: '8px 0 0 0' }}>
                Shiko të gjitha llogaritjet e kryera
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <ClassicButton 
                onClick={() => navigate('/reports/fines')}
                style={{ 
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px'
                }}
              >
                📋 Raportet
              </ClassicButton>
              <p style={{ fontSize: '11px', color: '#666', margin: '8px 0 0 0' }}>
                Gjenero raporte të gjobave
              </p>
            </div>
          </div>
        </ClassicCard>
      </div>
    </MainLayout>
  );
};

export default FineCalculationDashboard;
