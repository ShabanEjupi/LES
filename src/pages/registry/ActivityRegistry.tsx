import React, { useState, useEffect } from 'react';
import '../../../styles/classic-theme.css';

interface Activity {
  id: string;
  type: string;
  description: string;
  status: string;
  assignedTo: string;
  dueDate: string;
  priority: string;
  caseId?: string;
  createdAt: string;
  updatedAt: string;
}

const ActivityRegistry: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      // Simulate API call
      const mockActivities: Activity[] = [
        {
          id: 'ACT-001',
          type: 'Inspection',
          description: 'Routine customs inspection at border checkpoint',
          status: 'In Progress',
          assignedTo: 'Officer Smith',
          dueDate: '2025-07-25',
          priority: 'High',
          caseId: 'CASE-001',
          createdAt: '2025-07-19T08:00:00Z',
          updatedAt: '2025-07-19T14:30:00Z'
        },
        {
          id: 'ACT-002',
          type: 'Document Review',
          description: 'Review import documentation for compliance',
          status: 'Pending',
          assignedTo: 'Officer Johnson',
          dueDate: '2025-07-22',
          priority: 'Medium',
          caseId: 'CASE-002',
          createdAt: '2025-07-19T09:15:00Z',
          updatedAt: '2025-07-19T09:15:00Z'
        },
        {
          id: 'ACT-003',
          type: 'Investigation',
          description: 'Follow-up investigation on suspicious shipment',
          status: 'Completed',
          assignedTo: 'Officer Davis',
          dueDate: '2025-07-20',
          priority: 'High',
          caseId: 'CASE-003',
          createdAt: '2025-07-18T10:00:00Z',
          updatedAt: '2025-07-19T16:45:00Z'
        }
      ];
      setActivities(mockActivities);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === '' || activity.status === filterStatus;
    const matchesPriority = filterPriority === '' || activity.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'status-completed';
      case 'in progress': return 'status-in-progress';
      case 'pending': return 'status-pending';
      default: return 'status-default';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading activity registry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Activity Registry</h1>
        <p className="page-description">
          Comprehensive registry of all activities, tasks, and assignments within the system
        </p>
      </div>

      <div className="search-filters-container">
        <div className="search-row">
          <div className="search-group">
            <label htmlFor="search">Search Activities:</label>
            <input
              id="search"
              type="text"
              className="search-input"
              placeholder="Search by description, assignee, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select
              id="status-filter"
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="priority-filter">Priority:</label>
            <select
              id="priority-filter"
              className="filter-select"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="results-summary">
        <p>Showing {filteredActivities.length} of {activities.length} activities</p>
      </div>

      <div className="registry-container">
        {filteredActivities.length === 0 ? (
          <div className="no-results">
            <p>No activities found matching your criteria.</p>
          </div>
        ) : (
          <div className="registry-table-container">
            <table className="registry-table">
              <thead>
                <tr>
                  <th>Activity ID</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assigned To</th>
                  <th>Due Date</th>
                  <th>Case ID</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="activity-id">{activity.id}</td>
                    <td className="activity-type">{activity.type}</td>
                    <td className="activity-description" title={activity.description}>
                      {activity.description.length > 50 
                        ? `${activity.description.substring(0, 50)}...` 
                        : activity.description}
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(activity.status)}`}>
                        {activity.status}
                      </span>
                    </td>
                    <td>
                      <span className={`priority-badge ${getPriorityClass(activity.priority)}`}>
                        {activity.priority}
                      </span>
                    </td>
                    <td className="assigned-to">{activity.assignedTo}</td>
                    <td className="due-date">{new Date(activity.dueDate).toLocaleDateString()}</td>
                    <td className="case-id">
                      {activity.caseId ? (
                        <a href={`/cases/${activity.caseId}`} className="case-link">
                          {activity.caseId}
                        </a>
                      ) : (
                        <span className="no-case">-</span>
                      )}
                    </td>
                    <td className="created-date">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </td>
                    <td className="actions">
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => window.location.href = `/activities/${activity.id}`}
                        >
                          View
                        </button>
                        <button 
                          className="btn btn-sm btn-secondary"
                          onClick={() => window.location.href = `/activities/${activity.id}/edit`}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="registry-actions">
        <button 
          className="btn btn-primary"
          onClick={() => window.location.href = '/activities/new'}
        >
          Create New Activity
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => window.print()}
        >
          Print Registry
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => {/* Export functionality */}}
        >
          Export to Excel
        </button>
      </div>
    </div>
  );
};

export default ActivityRegistry;
