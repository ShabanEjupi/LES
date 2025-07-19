import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/classic-theme.css';

interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'INSPECTION' | 'INVESTIGATION' | 'DOCUMENTATION' | 'VERIFICATION' | 'TRAINING' | 'MAINTENANCE';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedTo: string;
  assignedToName: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  startDate: string;
  dueDate: string;
  completedAt?: string;
  relatedCaseId?: string;
  relatedViolationId?: string;
  department: string;
  location: string;
  estimatedHours: number;
  actualHours?: number;
  tags: string[];
  attachments: string[];
  comments: ActivityComment[];
}

interface ActivityComment {
  id: string;
  content: string;
  author: string;
  authorName: string;
  createdAt: string;
  type: 'COMMENT' | 'STATUS_CHANGE' | 'ASSIGNMENT' | 'UPDATE';
}

interface ActivityStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
  dueToday: number;
  myActivities: number;
}

const ActivityDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<ActivityStats>({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
    dueToday: 0,
    myActivities: 0,
  });
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [myActivities, setMyActivities] = useState<Activity[]>([]);
  const [urgentActivities, setUrgentActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Simulate API calls
      const mockStats: ActivityStats = {
        total: 125,
        pending: 23,
        inProgress: 45,
        completed: 52,
        overdue: 5,
        dueToday: 8,
        myActivities: 12,
      };

      const mockActivities: Activity[] = [
        {
          id: 'ACT-2024-001',
          title: 'Vehicle Inspection - Border Point Dheu i Bardhë',
          description: 'Complete vehicle inspection for suspicious cargo transport',
          type: 'INSPECTION',
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          assignedTo: 'OFF001',
          assignedToName: 'Officer Petrit Krasniqi',
          createdBy: 'SC001',
          createdByName: 'Sector Chief Ramadan',
          createdAt: '2025-07-19T08:30:00Z',
          startDate: '2025-07-19T09:00:00Z',
          dueDate: '2025-07-19T17:00:00Z',
          relatedCaseId: 'CASE-2024-001',
          department: 'Border Control',
          location: 'Dheu i Bardhë Border Crossing',
          estimatedHours: 4,
          tags: ['vehicle', 'inspection', 'border', 'urgent'],
          attachments: [],
          comments: []
        },
        {
          id: 'ACT-2024-002',
          title: 'Documentation Review - Import License',
          description: 'Review and verify import license documentation for company XYZ',
          type: 'DOCUMENTATION',
          status: 'PENDING',
          priority: 'MEDIUM',
          assignedTo: 'OFF002',
          assignedToName: 'Officer Arber Morina',
          createdBy: 'ADM001',
          createdByName: 'Administrator Fatmir',
          createdAt: '2025-07-18T14:20:00Z',
          startDate: '2025-07-20T08:00:00Z',
          dueDate: '2025-07-22T16:00:00Z',
          relatedCaseId: 'CASE-2024-002',
          department: 'Import/Export Control',
          location: 'Main Office',
          estimatedHours: 6,
          tags: ['documentation', 'import', 'license'],
          attachments: ['license-scan.pdf', 'company-details.pdf'],
          comments: []
        },
        {
          id: 'ACT-2024-003',
          title: 'Investigation - Smuggling Case',
          description: 'Investigate suspected smuggling activities at Pristina Airport',
          type: 'INVESTIGATION',
          status: 'IN_PROGRESS',
          priority: 'URGENT',
          assignedTo: 'INV001',
          assignedToName: 'Investigator Blerta Shala',
          createdBy: 'DIR001',
          createdByName: 'Director Agim Veliu',
          createdAt: '2025-07-17T10:15:00Z',
          startDate: '2025-07-17T12:00:00Z',
          dueDate: '2025-07-20T18:00:00Z',
          relatedViolationId: 'VIO-2024-001',
          department: 'Investigation Unit',
          location: 'Pristina Airport',
          estimatedHours: 24,
          actualHours: 16,
          tags: ['investigation', 'smuggling', 'airport', 'urgent'],
          attachments: ['evidence-photos.zip', 'witness-statements.pdf'],
          comments: []
        }
      ];

      setStats(mockStats);
      setRecentActivities(mockActivities);
      setMyActivities(mockActivities.filter(a => a.assignedTo === 'OFF001'));
      setUrgentActivities(mockActivities.filter(a => a.priority === 'URGENT' || a.priority === 'HIGH'));

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return '⏳';
      case 'IN_PROGRESS': return '🔄';
      case 'COMPLETED': return '✅';
      case 'CANCELLED': return '❌';
      case 'ON_HOLD': return '⏸️';
      default: return '📋';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'priority-urgent';
      case 'HIGH': return 'priority-high';
      case 'MEDIUM': return 'priority-medium';
      case 'LOW': return 'priority-low';
      default: return '';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'INSPECTION': return '🔍';
      case 'INVESTIGATION': return '🕵️';
      case 'DOCUMENTATION': return '📄';
      case 'VERIFICATION': return '✓';
      case 'TRAINING': return '📚';
      case 'MAINTENANCE': return '🔧';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading activity dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Activity Dashboard</h1>
        <p className="page-description">
          Overview of all activities, tasks, and assignments in the Kosovo Customs Administration
        </p>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/activities/create')}
          >
            + Create New Activity
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/activities/list')}
          >
            View All Activities
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.total}</h3>
            <p className="stat-label">Total Activities</p>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.pending}</h3>
            <p className="stat-label">Pending</p>
          </div>
        </div>

        <div className="stat-card in-progress">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.inProgress}</h3>
            <p className="stat-label">In Progress</p>
          </div>
        </div>

        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.completed}</h3>
            <p className="stat-label">Completed</p>
          </div>
        </div>

        <div className="stat-card overdue">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.overdue}</h3>
            <p className="stat-label">Overdue</p>
          </div>
        </div>

        <div className="stat-card due-today">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.dueToday}</h3>
            <p className="stat-label">Due Today</p>
          </div>
        </div>

        <div className="stat-card my-activities">
          <div className="stat-icon">👤</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.myActivities}</h3>
            <p className="stat-label">My Activities</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Recent Activities */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recent Activities</h2>
            <Link to="/activities/list" className="section-link">
              View All →
            </Link>
          </div>
          <div className="activity-list">
            {recentActivities.slice(0, 5).map(activity => (
              <div key={activity.id} className={`activity-item ${getPriorityClass(activity.priority)}`}>
                <div className="activity-header">
                  <div className="activity-icon">
                    {getTypeIcon(activity.type)}
                  </div>
                  <div className="activity-meta">
                    <Link 
                      to={`/activities/${activity.id}`}
                      className="activity-title"
                    >
                      {activity.title}
                    </Link>
                    <div className="activity-details">
                      <span className="activity-id">{activity.id}</span>
                      <span className="activity-type">{activity.type}</span>
                      <span className="activity-assignee">{activity.assignedToName}</span>
                    </div>
                  </div>
                  <div className="activity-status">
                    <span className={`status-badge status-${activity.status.toLowerCase()}`}>
                      {getStatusIcon(activity.status)} {activity.status.replace('_', ' ')}
                    </span>
                    <span className={`priority-badge ${getPriorityClass(activity.priority)}`}>
                      {activity.priority}
                    </span>
                  </div>
                </div>
                <div className="activity-description">
                  {activity.description}
                </div>
                <div className="activity-footer">
                  <span className="activity-location">📍 {activity.location}</span>
                  <span className="activity-due">📅 Due: {new Date(activity.dueDate).toLocaleDateString()}</span>
                  {activity.relatedCaseId && (
                    <span className="activity-case">
                      📁 Case: <Link to={`/cases/${activity.relatedCaseId}`}>{activity.relatedCaseId}</Link>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Activities */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">My Activities</h2>
            <Link to="/activities/list?filter=my" className="section-link">
              View All →
            </Link>
          </div>
          <div className="activity-list">
            {myActivities.slice(0, 3).map(activity => (
              <div key={activity.id} className={`activity-item compact ${getPriorityClass(activity.priority)}`}>
                <div className="activity-header">
                  <div className="activity-icon">
                    {getTypeIcon(activity.type)}
                  </div>
                  <div className="activity-meta">
                    <Link 
                      to={`/activities/${activity.id}`}
                      className="activity-title"
                    >
                      {activity.title}
                    </Link>
                    <div className="activity-details">
                      <span className="activity-due">Due: {new Date(activity.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="activity-status">
                    <span className={`status-badge status-${activity.status.toLowerCase()}`}>
                      {getStatusIcon(activity.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Activities */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Urgent Activities</h2>
            <Link to="/activities/list?priority=urgent,high" className="section-link">
              View All →
            </Link>
          </div>
          <div className="activity-list">
            {urgentActivities.map(activity => (
              <div key={activity.id} className={`activity-item urgent ${getPriorityClass(activity.priority)}`}>
                <div className="activity-header">
                  <div className="activity-icon">
                    {getTypeIcon(activity.type)}
                  </div>
                  <div className="activity-meta">
                    <Link 
                      to={`/activities/${activity.id}`}
                      className="activity-title"
                    >
                      {activity.title}
                    </Link>
                    <div className="activity-details">
                      <span className="activity-assignee">{activity.assignedToName}</span>
                      <span className="activity-due">Due: {new Date(activity.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="activity-status">
                    <span className={`status-badge status-${activity.status.toLowerCase()}`}>
                      {getStatusIcon(activity.status)} {activity.status.replace('_', ' ')}
                    </span>
                    <span className={`priority-badge ${getPriorityClass(activity.priority)}`}>
                      {activity.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button 
            className="btn btn-outline"
            onClick={() => navigate('/activities/create')}
          >
            📝 Create Activity
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => navigate('/activities/reports')}
          >
            📊 View Reports
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => navigate('/activities/list?status=pending')}
          >
            ⏳ Pending Activities
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => navigate('/activities/list?due=today')}
          >
            📅 Due Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDashboard;
