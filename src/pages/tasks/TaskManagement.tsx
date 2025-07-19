import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  dueDate: string;
  createdDate: string;
  completedDate?: string;
  relatedCaseId?: string;
  category: 'INSPECTION' | 'DOCUMENTATION' | 'INVESTIGATION' | 'ADMINISTRATIVE' | 'FOLLOW_UP';
  attachments: string[];
  comments: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }>;
}

const TaskManagement: React.FC = () => {
  const { state } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState({
    status: '',
    priority: '',
    category: '',
    assignedTo: '',
    dateFrom: '',
    dateTo: ''
  });
  const [view, setView] = useState<'list' | 'calendar' | 'board'>('list');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Mock tasks data
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Inspektimi i mallrave në kamionin ABC-123',
        description: 'Inspektim fizik i mallrave të deklaruara si textile',
        assignedTo: 'oficer',
        assignedBy: 'supervisor',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        dueDate: '2024-07-20',
        createdDate: '2024-07-17',
        relatedCaseId: 'KV-2024-001',
        category: 'INSPECTION',
        attachments: ['foto1.jpg', 'raport_preliminar.pdf'],
        comments: [
          {
            id: '1',
            author: 'supervisor',
            content: 'Prioritet i lartë - duhet kompletuar sot',
            timestamp: '2024-07-17 09:30'
          }
        ]
      },
      {
        id: '2',
        title: 'Verifikimi i dokumentave për kompanine XYZ',
        description: 'Kontrollimi i autenticitetit të certifikatave të origjinës',
        assignedTo: 'admin',
        assignedBy: 'admin',
        priority: 'MEDIUM',
        status: 'PENDING',
        dueDate: '2024-07-22',
        createdDate: '2024-07-16',
        relatedCaseId: 'KV-2024-002',
        category: 'DOCUMENTATION',
        attachments: ['certificata.pdf'],
        comments: []
      },
      {
        id: '3',
        title: 'Intervistimi i dëshmitarit në rastin DEF',
        description: 'Mbledhja e dëshmisë nga dëshmitari kryesor',
        assignedTo: 'supervisor',
        assignedBy: 'admin',
        priority: 'URGENT',
        status: 'COMPLETED',
        dueDate: '2024-07-18',
        createdDate: '2024-07-15',
        completedDate: '2024-07-17',
        relatedCaseId: 'KV-2024-003',
        category: 'INVESTIGATION',
        attachments: ['deklarata.pdf', 'audio_intervista.mp3'],
        comments: [
          {
            id: '2',
            author: 'supervisor',
            content: 'Intervista u kompletua me sukses. Dëshmitari konfirmoi dyshimet.',
            timestamp: '2024-07-17 14:30'
          }
        ]
      }
    ];

    setTasks(mockTasks);
  }, []);

  const getFilteredTasks = () => {
    const userRole = state.user?.role?.name;
    const username = state.user?.username;

    let filtered = tasks;

    // Apply role-based filtering
    switch (userRole) {
      case 'admin':
        // Admins see all tasks
        break;
      case 'supervisor':
      case 'sector_chief':
        // Supervisors see tasks assigned to them or their subordinates
        filtered = filtered.filter(task => 
          task.assignedTo === username || 
          task.assignedBy === username
        );
        break;
      case 'officer':
        // Officers see only their assigned tasks
        filtered = filtered.filter(task => task.assignedTo === username);
        break;
      default:
        filtered = [];
    }

    // Apply additional filters
    if (filter.status) {
      filtered = filtered.filter(task => task.status === filter.status);
    }
    if (filter.priority) {
      filtered = filtered.filter(task => task.priority === filter.priority);
    }
    if (filter.category) {
      filtered = filtered.filter(task => task.category === filter.category);
    }
    if (filter.assignedTo) {
      filtered = filtered.filter(task => 
        task.assignedTo.toLowerCase().includes(filter.assignedTo.toLowerCase())
      );
    }

    return filtered;
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
      case 'COMPLETED': return '#28a745';
      case 'IN_PROGRESS': return '#007bff';
      case 'PENDING': return '#ffc107';
      case 'CANCELLED': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'INSPECTION': return '🔍';
      case 'DOCUMENTATION': return '📄';
      case 'INVESTIGATION': return '🕵️';
      case 'ADMINISTRATIVE': return '📋';
      case 'FOLLOW_UP': return '📞';
      default: return '📌';
    }
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const handleCreateTask = () => {
    setShowCreateModal(true);
    // TODO: Implement task creation modal
    console.log('Create task modal would open, showCreateModal:', showCreateModal);
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="classic-window" style={{ margin: '20px', maxWidth: '100%' }}>
      <div className="classic-window-header">
        📋 Menaxhimi i Detyrave - Kutia Postare
      </div>

      <div className="classic-window-content">
        {/* Header with View Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px',
          padding: '12px',
          background: '#f0f0f0',
          border: '1px inset #c0c0c0'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={`classic-button ${view === 'list' ? 'classic-button-primary' : ''}`}
              onClick={() => setView('list')}
              style={{ fontSize: '11px' }}
            >
              📋 Lista
            </button>
            <button
              className={`classic-button ${view === 'calendar' ? 'classic-button-primary' : ''}`}
              onClick={() => setView('calendar')}
              style={{ fontSize: '11px' }}
            >
              📅 Kalendari
            </button>
            <button
              className={`classic-button ${view === 'board' ? 'classic-button-primary' : ''}`}
              onClick={() => setView('board')}
              style={{ fontSize: '11px' }}
            >
              📊 Tabela
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="classic-button classic-button-primary"
              onClick={handleCreateTask}
              style={{ fontSize: '11px' }}
            >
              ➕ Krijo Detyrë
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📊 Raporte
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '12px' 
          }}>
            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Statusi:</label>
              <select
                className="classic-dropdown"
                value={filter.status}
                onChange={(e) => setFilter({...filter, status: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="PENDING">Në pritje</option>
                <option value="IN_PROGRESS">Në proces</option>
                <option value="COMPLETED">Kompletuar</option>
                <option value="CANCELLED">Anuluar</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Prioriteti:</label>
              <select
                className="classic-dropdown"
                value={filter.priority}
                onChange={(e) => setFilter({...filter, priority: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="URGENT">Urgjent</option>
                <option value="HIGH">I lartë</option>
                <option value="MEDIUM">Mesatar</option>
                <option value="LOW">I ulët</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Kategoria:</label>
              <select
                className="classic-dropdown"
                value={filter.category}
                onChange={(e) => setFilter({...filter, category: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="INSPECTION">Inspektim</option>
                <option value="DOCUMENTATION">Dokumentim</option>
                <option value="INVESTIGATION">Hetim</option>
                <option value="ADMINISTRATIVE">Administrative</option>
                <option value="FOLLOW_UP">Ndjekje</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Caktuar për:</label>
              <input
                type="text"
                className="classic-textbox"
                value={filter.assignedTo}
                onChange={(e) => setFilter({...filter, assignedTo: e.target.value})}
                placeholder="Emri i oficeri..."
                style={{ fontSize: '11px' }}
              />
            </div>
          </div>
        </div>

        {/* Task List View */}
        {view === 'list' && (
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
                  <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Titulli</th>
                  <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Kategoria</th>
                  <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Caktuar për</th>
                  <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Prioriteti</th>
                  <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Statusi</th>
                  <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Afati</th>
                  <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Veprimet</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task, index) => (
                  <tr 
                    key={task.id}
                    style={{ 
                      backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8',
                      cursor: 'pointer'
                    }}
                    onDoubleClick={() => setSelectedTask(task)}
                  >
                    <td style={{ padding: '8px', border: '1px solid #c0c0c0' }}>
                      <div style={{ fontWeight: 'bold' }}>{task.title}</div>
                      <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                        {task.description.substring(0, 50)}...
                      </div>
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #c0c0c0' }}>
                      {getCategoryIcon(task.category)} {task.category}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #c0c0c0' }}>
                      {task.assignedTo}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #c0c0c0' }}>
                      <span style={{ 
                        padding: '2px 6px', 
                        borderRadius: '3px',
                        backgroundColor: getPriorityColor(task.priority),
                        color: 'white',
                        fontSize: '10px'
                      }}>
                        {task.priority}
                      </span>
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #c0c0c0' }}>
                      <span style={{ 
                        padding: '2px 6px', 
                        borderRadius: '3px',
                        backgroundColor: getStatusColor(task.status),
                        color: 'white',
                        fontSize: '10px'
                      }}>
                        {task.status}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '8px', 
                      border: '1px solid #c0c0c0',
                      color: new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED' ? '#dc3545' : 'inherit'
                    }}>
                      {task.dueDate}
                    </td>
                    <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button 
                          className="classic-button"
                          onClick={() => setSelectedTask(task)}
                          style={{ fontSize: '10px', padding: '2px 6px' }}
                          title="Shiko detajet"
                        >
                          👁️
                        </button>
                        {task.status !== 'COMPLETED' && (
                          <button 
                            className="classic-button"
                            onClick={() => handleTaskUpdate(task.id, { 
                              status: task.status === 'PENDING' ? 'IN_PROGRESS' : 'COMPLETED' 
                            })}
                            style={{ fontSize: '10px', padding: '2px 6px' }}
                            title={task.status === 'PENDING' ? 'Fillo detyrën' : 'Përfundo detyrën'}
                          >
                            {task.status === 'PENDING' ? '▶️' : '✅'}
                          </button>
                        )}
                        <button 
                          className="classic-button"
                          style={{ fontSize: '10px', padding: '2px 6px' }}
                          title="Redakto"
                        >
                          ✏️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Calendar View */}
        {view === 'calendar' && (
          <div style={{ 
            background: 'white', 
            border: '1px inset #c0c0c0', 
            padding: '16px',
            textAlign: 'center',
            minHeight: '400px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '14px' }}>📅 Pamja e Kalendarit</h3>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Kalendari i detyrave - në zhvillim e sipër
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gap: '1px',
              marginTop: '20px'
            }}>
              {['Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht', 'Die'].map(day => (
                <div key={day} style={{ 
                  padding: '8px', 
                  background: '#c0c0c0', 
                  border: '1px outset #c0c0c0',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {day}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Board View */}
        {view === 'board' && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '16px',
            minHeight: '400px'
          }}>
            {['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map(status => (
              <div key={status} style={{ 
                background: '#f8f8f8', 
                border: '1px inset #c0c0c0',
                borderRadius: '4px'
              }}>
                <div style={{ 
                  background: getStatusColor(status), 
                  color: 'white', 
                  padding: '8px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {status} ({filteredTasks.filter(t => t.status === status).length})
                </div>
                <div style={{ padding: '8px' }}>
                  {filteredTasks
                    .filter(task => task.status === status)
                    .map(task => (
                      <div
                        key={task.id}
                        style={{
                          background: 'white',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          padding: '8px',
                          marginBottom: '8px',
                          cursor: 'pointer',
                          fontSize: '11px'
                        }}
                        onClick={() => setSelectedTask(task)}
                      >
                        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                          {task.title}
                        </div>
                        <div style={{ fontSize: '10px', color: '#666' }}>
                          {getCategoryIcon(task.category)} {task.assignedTo}
                        </div>
                        <div style={{ fontSize: '10px', marginTop: '4px' }}>
                          📅 {task.dueDate}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        <div style={{ 
          background: '#f0f0f0', 
          border: '1px inset #c0c0c0', 
          padding: '12px', 
          marginTop: '16px',
          fontSize: '11px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>
            📊 Gjithsej: {filteredTasks.length} detyra | 
            Në pritje: {filteredTasks.filter(t => t.status === 'PENDING').length} | 
            Në proces: {filteredTasks.filter(t => t.status === 'IN_PROGRESS').length} | 
            Kompletuar: {filteredTasks.filter(t => t.status === 'COMPLETED').length}
          </span>
          <span>👤 {state.user?.role?.name} - {state.user?.department}</span>
        </div>

        {/* Task Detail Modal */}
        {selectedTask && (
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
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <div className="classic-window-header">
                📋 Detajet e Detyrës - {selectedTask.title}
              </div>
              <div className="classic-window-content">
                <div style={{ marginBottom: '16px' }}>
                  <strong>Përshkrimi:</strong><br />
                  {selectedTask.description}
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div><strong>Caktuar për:</strong> {selectedTask.assignedTo}</div>
                  <div><strong>Caktuar nga:</strong> {selectedTask.assignedBy}</div>
                  <div><strong>Prioriteti:</strong> 
                    <span style={{ 
                      marginLeft: '8px',
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: getPriorityColor(selectedTask.priority),
                      color: 'white',
                      fontSize: '10px'
                    }}>
                      {selectedTask.priority}
                    </span>
                  </div>
                  <div><strong>Statusi:</strong>
                    <span style={{ 
                      marginLeft: '8px',
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: getStatusColor(selectedTask.status),
                      color: 'white',
                      fontSize: '10px'
                    }}>
                      {selectedTask.status}
                    </span>
                  </div>
                  <div><strong>Data e krijimit:</strong> {selectedTask.createdDate}</div>
                  <div><strong>Afati:</strong> {selectedTask.dueDate}</div>
                </div>

                {selectedTask.attachments.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <strong>Bashkëngjitjet:</strong>
                    <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                      {selectedTask.attachments.map((attachment, index) => (
                        <li key={index} style={{ fontSize: '11px' }}>
                          📎 {attachment}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTask.comments.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <strong>Komentet:</strong>
                    {selectedTask.comments.map(comment => (
                      <div key={comment.id} style={{ 
                        background: '#f8f8f8', 
                        padding: '8px', 
                        margin: '8px 0',
                        border: '1px inset #c0c0c0',
                        fontSize: '11px'
                      }}>
                        <div style={{ fontWeight: 'bold' }}>
                          {comment.author} - {comment.timestamp}
                        </div>
                        <div>{comment.content}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  justifyContent: 'flex-end',
                  borderTop: '1px solid #c0c0c0',
                  paddingTop: '16px'
                }}>
                  <button 
                    className="classic-button"
                    onClick={() => setSelectedTask(null)}
                    style={{ fontSize: '11px' }}
                  >
                    🚪 Mbyll
                  </button>
                  <button 
                    className="classic-button classic-button-primary"
                    style={{ fontSize: '11px' }}
                  >
                    ✏️ Redakto
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

export default TaskManagement;
