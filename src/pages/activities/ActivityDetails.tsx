import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  progress: number;
  checklist: ChecklistItem[];
}

interface ActivityComment {
  id: string;
  content: string;
  author: string;
  authorName: string;
  createdAt: string;
  type: 'COMMENT' | 'STATUS_CHANGE' | 'ASSIGNMENT' | 'UPDATE';
}

interface ChecklistItem {
  id: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  completedBy?: string;
}

const ActivityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'checklist' | 'attachments'>('details');

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id]);

  const loadActivity = async (activityId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      const mockActivity: Activity = {
        id: activityId,
        title: 'Vehicle Inspection - Border Point Dheu i Bardhë',
        description: 'Complete vehicle inspection for suspicious cargo transport. This involves thorough examination of vehicle documents, cargo manifest, and physical inspection of the vehicle and its contents.',
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
        actualHours: 2.5,
        progress: 60,
        tags: ['vehicle', 'inspection', 'border', 'urgent'],
        attachments: [
          'vehicle-documents.pdf',
          'cargo-manifest.pdf',
          'initial-photos.zip'
        ],
        checklist: [
          {
            id: 'CHK-001',
            description: 'Verify vehicle registration documents',
            completed: true,
            completedAt: '2025-07-19T09:15:00Z',
            completedBy: 'OFF001'
          },
          {
            id: 'CHK-002',
            description: 'Check cargo manifest against actual cargo',
            completed: true,
            completedAt: '2025-07-19T09:45:00Z',
            completedBy: 'OFF001'
          },
          {
            id: 'CHK-003',
            description: 'Physical inspection of vehicle exterior',
            completed: true,
            completedAt: '2025-07-19T10:30:00Z',
            completedBy: 'OFF001'
          },
          {
            id: 'CHK-004',
            description: 'Physical inspection of cargo area',
            completed: false
          },
          {
            id: 'CHK-005',
            description: 'Document findings and take photos',
            completed: false
          },
          {
            id: 'CHK-006',
            description: 'Complete inspection report',
            completed: false
          }
        ],
        comments: [
          {
            id: 'COM-001',
            content: 'Activity assigned to Officer Petrit Krasniqi',
            author: 'SYS001',
            authorName: 'System',
            createdAt: '2025-07-19T08:30:00Z',
            type: 'ASSIGNMENT'
          },
          {
            id: 'COM-002',
            content: 'Started vehicle inspection. Vehicle documents appear to be in order.',
            author: 'OFF001',
            authorName: 'Officer Petrit Krasniqi',
            createdAt: '2025-07-19T09:15:00Z',
            type: 'UPDATE'
          },
          {
            id: 'COM-003',
            content: 'Cargo manifest matches declared goods. Proceeding with physical inspection.',
            author: 'OFF001',
            authorName: 'Officer Petrit Krasniqi',
            createdAt: '2025-07-19T09:50:00Z',
            type: 'COMMENT'
          },
          {
            id: 'COM-004',
            content: 'Vehicle exterior inspection complete. Found minor discrepancies in license plate mounting.',
            author: 'OFF001',
            authorName: 'Officer Petrit Krasniqi',
            createdAt: '2025-07-19T10:35:00Z',
            type: 'UPDATE'
          }
        ]
      };

      setActivity(mockActivity);
    } catch (error) {
      console.error('Error loading activity:', error);
      setError('Failed to load activity details');
    } finally {
      setLoading(false);
    }
  };

  const updateActivityStatus = async (newStatus: Activity['status']) => {
    if (!activity) return;

    try {
      // Simulate API call
      setActivity(prev => prev ? { ...prev, status: newStatus } : null);
      
      // Add status change comment
      const statusComment: ActivityComment = {
        id: `COM-${Date.now()}`,
        content: `Status changed to ${newStatus.replace('_', ' ')}`,
        author: 'OFF001',
        authorName: 'Current User',
        createdAt: new Date().toISOString(),
        type: 'STATUS_CHANGE'
      };

      setActivity(prev => prev ? {
        ...prev,
        comments: [...prev.comments, statusComment]
      } : null);

    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const addComment = async () => {
    if (!newComment.trim() || !activity) return;

    try {
      setAddingComment(true);
      
      const comment: ActivityComment = {
        id: `COM-${Date.now()}`,
        content: newComment,
        author: 'OFF001',
        authorName: 'Current User',
        createdAt: new Date().toISOString(),
        type: 'COMMENT'
      };

      setActivity(prev => prev ? {
        ...prev,
        comments: [...prev.comments, comment]
      } : null);

      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setAddingComment(false);
    }
  };

  const toggleChecklistItem = async (itemId: string) => {
    if (!activity) return;

    try {
      setActivity(prev => {
        if (!prev) return null;
        
        const updatedChecklist = prev.checklist.map(item => 
          item.id === itemId 
            ? {
                ...item,
                completed: !item.completed,
                completedAt: !item.completed ? new Date().toISOString() : undefined,
                completedBy: !item.completed ? 'OFF001' : undefined
              }
            : item
        );

        const completedItems = updatedChecklist.filter(item => item.completed).length;
        const progress = Math.round((completedItems / updatedChecklist.length) * 100);

        return {
          ...prev,
          checklist: updatedChecklist,
          progress
        };
      });
    } catch (error) {
      console.error('Error updating checklist:', error);
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

  const getCommentIcon = (type: string) => {
    switch (type) {
      case 'COMMENT': return '💬';
      case 'STATUS_CHANGE': return '🔄';
      case 'ASSIGNMENT': return '👤';
      case 'UPDATE': return '📝';
      default: return '💬';
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading activity details...</p>
        </div>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="page-container">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error || 'Activity not found'}</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/activities')}
          >
            Back to Activities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-nav">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/activities')}
          >
            ← Back to Activities
          </button>
        </div>
        <h1 className="page-title">{activity.title}</h1>
        <p className="page-description">Activity ID: {activity.id}</p>
        
        <div className="activity-summary">
          <div className="summary-item">
            <span className="summary-label">Type:</span>
            <span className="summary-value">
              {getTypeIcon(activity.type)} {activity.type}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Status:</span>
            <span className={`status-badge status-${activity.status.toLowerCase()}`}>
              {getStatusIcon(activity.status)} {activity.status.replace('_', ' ')}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Priority:</span>
            <span className={`priority-badge ${getPriorityClass(activity.priority)}`}>
              {activity.priority}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Progress:</span>
            <span className="summary-value">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${activity.progress}%` }}
                ></div>
              </div>
              {activity.progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Status Actions */}
      <div className="status-actions">
        <h3>Change Status:</h3>
        <div className="status-buttons">
          {activity.status !== 'IN_PROGRESS' && (
            <button 
              className="btn btn-primary"
              onClick={() => updateActivityStatus('IN_PROGRESS')}
            >
              🔄 Start Work
            </button>
          )}
          {activity.status === 'IN_PROGRESS' && (
            <button 
              className="btn btn-warning"
              onClick={() => updateActivityStatus('ON_HOLD')}
            >
              ⏸️ Put on Hold
            </button>
          )}
          {activity.status !== 'COMPLETED' && (
            <button 
              className="btn btn-success"
              onClick={() => updateActivityStatus('COMPLETED')}
            >
              ✅ Mark Complete
            </button>
          )}
          <button 
            className="btn btn-danger"
            onClick={() => updateActivityStatus('CANCELLED')}
          >
            ❌ Cancel
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-container">
        <div className="tab-nav">
          <button 
            className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            📋 Details
          </button>
          <button 
            className={`tab-button ${activeTab === 'checklist' ? 'active' : ''}`}
            onClick={() => setActiveTab('checklist')}
          >
            ✓ Checklist ({activity.checklist.filter(item => item.completed).length}/{activity.checklist.length})
          </button>
          <button 
            className={`tab-button ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            💬 Comments ({activity.comments.length})
          </button>
          <button 
            className={`tab-button ${activeTab === 'attachments' ? 'active' : ''}`}
            onClick={() => setActiveTab('attachments')}
          >
            📎 Attachments ({activity.attachments.length})
          </button>
        </div>

        <div className="tab-content">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="details-content">
              <div className="details-grid">
                <div className="detail-section">
                  <h3>Basic Information</h3>
                  <div className="detail-item">
                    <label>Description:</label>
                    <p>{activity.description}</p>
                  </div>
                  <div className="detail-item">
                    <label>Department:</label>
                    <p>{activity.department}</p>
                  </div>
                  <div className="detail-item">
                    <label>Location:</label>
                    <p>📍 {activity.location}</p>
                  </div>
                  <div className="detail-item">
                    <label>Tags:</label>
                    <div className="tag-list">
                      {activity.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Assignment & Timing</h3>
                  <div className="detail-item">
                    <label>Assigned To:</label>
                    <p>👤 {activity.assignedToName}</p>
                  </div>
                  <div className="detail-item">
                    <label>Created By:</label>
                    <p>👤 {activity.createdByName}</p>
                  </div>
                  <div className="detail-item">
                    <label>Created:</label>
                    <p>📅 {new Date(activity.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="detail-item">
                    <label>Start Date:</label>
                    <p>📅 {new Date(activity.startDate).toLocaleString()}</p>
                  </div>
                  <div className="detail-item">
                    <label>Due Date:</label>
                    <p>📅 {new Date(activity.dueDate).toLocaleString()}</p>
                  </div>
                  {activity.completedAt && (
                    <div className="detail-item">
                      <label>Completed:</label>
                      <p>📅 {new Date(activity.completedAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>

                <div className="detail-section">
                  <h3>Time Tracking</h3>
                  <div className="detail-item">
                    <label>Estimated Hours:</label>
                    <p>⏱️ {activity.estimatedHours} hours</p>
                  </div>
                  {activity.actualHours && (
                    <div className="detail-item">
                      <label>Actual Hours:</label>
                      <p>⏱️ {activity.actualHours} hours</p>
                    </div>
                  )}
                </div>

                <div className="detail-section">
                  <h3>Related Items</h3>
                  {activity.relatedCaseId && (
                    <div className="detail-item">
                      <label>Related Case:</label>
                      <p>
                        📁 <Link to={`/cases/${activity.relatedCaseId}`}>{activity.relatedCaseId}</Link>
                      </p>
                    </div>
                  )}
                  {activity.relatedViolationId && (
                    <div className="detail-item">
                      <label>Related Violation:</label>
                      <p>
                        ⚠️ <Link to={`/violations/${activity.relatedViolationId}`}>{activity.relatedViolationId}</Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Checklist Tab */}
          {activeTab === 'checklist' && (
            <div className="checklist-content">
              <div className="checklist-header">
                <h3>Task Checklist</h3>
                <div className="checklist-progress">
                  <div className="progress-bar large">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${activity.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {activity.checklist.filter(item => item.completed).length} of {activity.checklist.length} completed
                  </span>
                </div>
              </div>
              
              <div className="checklist-items">
                {activity.checklist.map(item => (
                  <div 
                    key={item.id} 
                    className={`checklist-item ${item.completed ? 'completed' : ''}`}
                  >
                    <label className="checklist-label">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleChecklistItem(item.id)}
                      />
                      <span className="checklist-text">{item.description}</span>
                    </label>
                    {item.completed && item.completedAt && (
                      <div className="checklist-meta">
                        ✓ Completed on {new Date(item.completedAt).toLocaleString()}
                        {item.completedBy && ` by ${item.completedBy}`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'comments' && (
            <div className="comments-content">
              <div className="comment-form">
                <h3>Add Comment</h3>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment about this activity..."
                  rows={3}
                  className="comment-input"
                />
                <button 
                  className="btn btn-primary"
                  onClick={addComment}
                  disabled={!newComment.trim() || addingComment}
                >
                  {addingComment ? 'Adding...' : 'Add Comment'}
                </button>
              </div>

              <div className="comments-list">
                {activity.comments.map(comment => (
                  <div key={comment.id} className={`comment-item ${comment.type.toLowerCase()}`}>
                    <div className="comment-header">
                      <div className="comment-icon">
                        {getCommentIcon(comment.type)}
                      </div>
                      <div className="comment-meta">
                        <span className="comment-author">{comment.authorName}</span>
                        <span className="comment-time">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                        <span className="comment-type">{comment.type.replace('_', ' ')}</span>
                      </div>
                    </div>
                    <div className="comment-content">
                      {comment.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attachments Tab */}
          {activeTab === 'attachments' && (
            <div className="attachments-content">
              <div className="attachments-header">
                <h3>Attachments</h3>
                <button className="btn btn-primary">
                  📎 Add Attachment
                </button>
              </div>
              
              <div className="attachments-list">
                {activity.attachments.map((attachment, index) => (
                  <div key={index} className="attachment-item">
                    <div className="attachment-icon">📄</div>
                    <div className="attachment-info">
                      <span className="attachment-name">{attachment}</span>
                      <div className="attachment-actions">
                        <button className="btn-link">Download</button>
                        <button className="btn-link">View</button>
                        <button className="btn-link danger">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {activity.attachments.length === 0 && (
                <div className="no-attachments">
                  <p>No attachments added yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
