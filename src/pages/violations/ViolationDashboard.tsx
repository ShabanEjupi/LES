import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts';
import MainLayout from '../../components/layout/MainLayout';
import './ViolationDashboard.css';

interface ViolationSummary {
  total: number;
  active: number;
  completed: number;
  pending: number;
  urgent: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  recentActivity: RecentActivity[];
}

interface RecentActivity {
  id: string;
  type: 'created' | 'updated' | 'completed' | 'assigned';
  caseNumber: string;
  description: string;
  timestamp: string;
  user: string;
}

interface QuickStats {
  todayCreated: number;
  weeklyCompleted: number;
  pendingApproval: number;
  overdueItems: number;
}

const ViolationDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const [summary, setSummary] = useState<ViolationSummary | null>(null);
  const [quickStats, setQuickStats] = useState<QuickStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for dashboard data
    const fetchDashboardData = async () => {
      // Mock data based on real Albanian Customs scenarios
      const mockSummary: ViolationSummary = {
        total: 247,
        active: 68,
        completed: 134,
        pending: 45,
        urgent: 23,
        byType: {
          'Kontrabandë mallit': 42,
          'Gabim në deklarimin doganor': 35,
          'Dokumenta të falsifikuara': 28,
          'Mosdeklarim i mallrave': 31,
          'Shkelje të procedurave doganore': 38,
          'Transportim ilegal i mallrave': 24,
          'Evazion fiskal': 19,
          'Mallra të ndaluara': 15,
          'Gabim në vlerësimin doganor': 22,
          'Shkelje të kuotave të importit': 11
        },
        byStatus: {
          'Aktiv': 43,
          'Në procesim': 24,
          'Mbyllur': 89
        },
        byPriority: {
          'I lartë': 12,
          'I mesëm': 67,
          'I ulët': 77
        },
        recentActivity: [
          {
            id: '1',
            type: 'created',
            caseNumber: 'KV-2025-089',
            description: 'Kontrabandë e zbuluar në Pikën Kufitare Bërnjak - mallra elektronike',
            timestamp: '2025-07-20 14:25',
            user: 'Agron Berisha'
          },
          {
            id: '2',
            type: 'updated',
            caseNumber: 'KV-2025-087',
            description: 'Përditësuar hetimi për gabimin në deklarimin doganor - Kompania ABC',
            timestamp: '2025-07-20 13:15',
            user: 'Fatmire Krasniqi'
          },
          {
            id: '3',
            type: 'completed',
            caseNumber: 'KV-2025-084',
            description: 'Përfunduar rasti i transportimit ilegal të duhanit',
            timestamp: '2025-07-20 11:45',
            user: 'Mentor Gashi'
          },
          {
            id: '4',
            type: 'assigned',
            caseNumber: 'KV-2025-088',
            description: 'Caktuar hetues i specializuar për rastin e dokumentave të falsifikuara',
            timestamp: '2025-07-20 10:30',
            user: 'Blerta Jashari'
          },
          {
            id: '5',
            type: 'created',
            caseNumber: 'KV-2025-090',
            description: 'Evazion fiskal i zbuluar - import i padeklaruar nga Turqia',
            timestamp: '2025-07-20 09:15',
            user: 'Driton Musliu'
          }
        ]
      };

      const mockQuickStats: QuickStats = {
        todayCreated: 8,
        weeklyCompleted: 34,
        pendingApproval: 12,
        overdueItems: 6
      };

      // Simulate loading delay
      setTimeout(() => {
        setSummary(mockSummary);
        setQuickStats(mockQuickStats);
        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create':
        navigate('/violations/new');
        break;
      case 'list':
        navigate('/violations/list');
        break;
      case 'search':
        navigate('/violations?tab=search');
        break;
      case 'reports':
        navigate('/violations?tab=reports');
        break;
      case 'types':
        navigate('/violations/change-type');
        break;
      case 'subjects':
        navigate('/violations/subjects');
        break;
      default:
        break;
    }
  };

  if (loading || !summary || !quickStats) {
    return (
      <MainLayout>
        <div className="violation-dashboard loading">
          <div className="classic-window">
            <div className="classic-window-header">
              📊 Menaxhimi i Kundërvajtjeve - Dashboard
            </div>
            <div className="classic-window-content">
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Duke ngarkuar të dhënat...</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="violation-dashboard">
        {/* Header Section */}
        <div className="classic-window dashboard-header">
          <div className="classic-window-header">
            📊 Menaxhimi i Kundërvajtjeve - Dashboard
          </div>
          <div className="classic-window-content">
            <div className="dashboard-header-content">
              <div className="welcome-section">
                <h2>Mirë se vini, {state.user?.fullName || 'Përdorues'}</h2>
                <p>Administrata Doganore e Republikës së Kosovës</p>
                <p className="current-date">
                  {new Date().toLocaleDateString('sq-AL', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="quick-actions">
                <button 
                  className="classic-button btn-primary"
                  onClick={() => handleQuickAction('create')}
                >
                  ➕ Krijoni Kundërvajtje të Re
                </button>
                <button 
                  className="classic-button"
                  onClick={() => handleQuickAction('list')}
                >
                  📋 Shikoni të Gjitha
                </button>
                <button 
                  className="classic-button"
                  onClick={() => handleQuickAction('search')}
                >
                  🔍 Kërkimi i Avancuar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="dashboard-grid">
          <div className="classic-window quick-stats">
            <div className="classic-window-header">
              📈 Statistikat e Shpejta
            </div>
            <div className="classic-window-content">
              <div className="stats-grid">
                <div className="stat-card today">
                  <div className="stat-icon">📅</div>
                  <div className="stat-info">
                    <span className="stat-number">{quickStats.todayCreated}</span>
                    <span className="stat-label">Krijuar Sot</span>
                  </div>
                </div>
                <div className="stat-card weekly">
                  <div className="stat-icon">✅</div>
                  <div className="stat-info">
                    <span className="stat-number">{quickStats.weeklyCompleted}</span>
                    <span className="stat-label">Përfunduar Këtë Javë</span>
                  </div>
                </div>
                <div className="stat-card pending">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-info">
                    <span className="stat-number">{quickStats.pendingApproval}</span>
                    <span className="stat-label">Në Pritje të Miratimit</span>
                  </div>
                </div>
                <div className="stat-card overdue">
                  <div className="stat-icon">⚠️</div>
                  <div className="stat-info">
                    <span className="stat-number">{quickStats.overdueItems}</span>
                    <span className="stat-label">Me Vonesë</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="classic-window summary-overview">
            <div className="classic-window-header">
              📊 Përmbledhje e Përgjithshme
            </div>
            <div className="classic-window-content">
              <div className="summary-cards">
                <div className="summary-card total">
                  <h3>{summary.total}</h3>
                  <p>Gjithsej Kundërvajtje</p>
                </div>
                <div className="summary-card active">
                  <h3>{summary.active}</h3>
                  <p>Aktive</p>
                </div>
                <div className="summary-card completed">
                  <h3>{summary.completed}</h3>
                  <p>Përfunduar</p>
                </div>
                <div className="summary-card urgent">
                  <h3>{summary.urgent}</h3>
                  <p>Urgjente</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="dashboard-main-grid">
          {/* Violations by Type */}
          <div className="classic-window chart-section">
            <div className="classic-window-header">
              📊 Kundërvajtjet sipas Llojit
            </div>
            <div className="classic-window-content">
              <div className="chart-data">
                {Object.entries(summary.byType).map(([type, count]) => (
                  <div key={type} className="chart-item">
                    <div className="chart-bar">
                      <div 
                        className="chart-fill"
                        style={{ width: `${(count / Math.max(...Object.values(summary.byType))) * 100}%` }}
                      ></div>
                    </div>
                    <div className="chart-label">
                      <span className="chart-type">{type}</span>
                      <span className="chart-count">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="classic-window activity-section">
            <div className="classic-window-header">
              🕒 Aktiviteti i Fundit
            </div>
            <div className="classic-window-content">
              <div className="activity-list">
                {summary.recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'created' && '➕'}
                      {activity.type === 'updated' && '✏️'}
                      {activity.type === 'completed' && '✅'}
                      {activity.type === 'assigned' && '👤'}
                    </div>
                    <div className="activity-details">
                      <div className="activity-header">
                        <span className="case-number">{activity.caseNumber}</span>
                        <span className="activity-time">{activity.timestamp}</span>
                      </div>
                      <p className="activity-description">{activity.description}</p>
                      <span className="activity-user">nga {activity.user}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="activity-footer">
                <button 
                  className="classic-button"
                  onClick={() => navigate('/audit-trail')}
                >
                  Shiko të Gjitha Aktivitetet
                </button>
              </div>
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="classic-window priority-section">
            <div className="classic-window-header">
              🎯 Shpërndarja sipas Prioritetit
            </div>
            <div className="classic-window-content">
              <div className="priority-chart">
                {Object.entries(summary.byPriority).map(([priority, count]) => (
                  <div key={priority} className="priority-item">
                    <div className={`priority-indicator priority-${priority.toLowerCase().replace(' ', '-')}`}></div>
                    <span className="priority-label">{priority}</span>
                    <span className="priority-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="classic-window actions-panel">
            <div className="classic-window-header">
              ⚡ Veprime të Shpejta
            </div>
            <div className="classic-window-content">
              <div className="actions-grid">
                <button 
                  className="action-button"
                  onClick={() => handleQuickAction('subjects')}
                >
                  <div className="action-icon">👥</div>
                  <span>Menaxhimi i Subjekteve</span>
                </button>
                <button 
                  className="action-button"
                  onClick={() => handleQuickAction('types')}
                >
                  <div className="action-icon">🔄</div>
                  <span>Ndryshimi i Llojit</span>
                </button>
                <button 
                  className="action-button"
                  onClick={() => handleQuickAction('reports')}
                >
                  <div className="action-icon">📊</div>
                  <span>Raporte</span>
                </button>
                <button 
                  className="action-button"
                  onClick={() => navigate('/tasks')}
                >
                  <div className="action-icon">📋</div>
                  <span>Menaxhimi i Detyrave</span>
                </button>
                <button 
                  className="action-button"
                  onClick={() => navigate('/fines')}
                >
                  <div className="action-icon">💰</div>
                  <span>Gjobat Administrative</span>
                </button>
                <button 
                  className="action-button"
                  onClick={() => navigate('/documents')}
                >
                  <div className="action-icon">📄</div>
                  <span>Dokumentet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ViolationDashboard;
