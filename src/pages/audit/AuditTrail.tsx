import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface AuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  username: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  ipAddress: string;
  userAgent?: string;
  success: boolean;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: 'LOGIN' | 'CASE_MANAGEMENT' | 'USER_MANAGEMENT' | 'SYSTEM' | 'DATA_ACCESS' | 'ADMIN';
}

const AuditTrail: React.FC = () => {
  const { state } = useAuth();
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    userId: '',
    action: '',
    resource: '',
    severity: '',
    category: '',
    success: ''
  });
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 50;

  useEffect(() => {
    // Mock audit data - in real app this would come from API
    const mockAuditEntries: AuditEntry[] = [
      {
        id: '1',
        timestamp: '2024-07-17 10:30:15',
        userId: '1',
        username: 'admin',
        action: 'LOGIN',
        resource: 'auth',
        details: 'Hyrje e suksesshme në sistem',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        success: true,
        severity: 'LOW',
        category: 'LOGIN'
      },
      {
        id: '2',
        timestamp: '2024-07-17 10:32:45',
        userId: '1',
        username: 'admin',
        action: 'CREATE_CASE',
        resource: 'violations',
        resourceId: 'KV-2024-001',
        details: 'U krijua rasti i ri i kundervajtjes: Kontrabandë',
        ipAddress: '192.168.1.100',
        success: true,
        severity: 'MEDIUM',
        category: 'CASE_MANAGEMENT'
      },
      {
        id: '3',
        timestamp: '2024-07-17 10:35:12',
        userId: '2',
        username: 'oficer',
        action: 'VIEW_CASE',
        resource: 'violations',
        resourceId: 'KV-2024-001',
        details: 'Shikoi detajet e rastit të kundervajtjes',
        ipAddress: '192.168.1.105',
        success: true,
        severity: 'LOW',
        category: 'DATA_ACCESS'
      },
      {
        id: '4',
        timestamp: '2024-07-17 09:15:30',
        userId: '3',
        username: 'supervisor',
        action: 'FAILED_LOGIN',
        resource: 'auth',
        details: 'Tentativë e dështuar për hyrje në sistem - fjalëkalim i gabuar',
        ipAddress: '192.168.1.110',
        success: false,
        severity: 'MEDIUM',
        category: 'LOGIN'
      },
      {
        id: '5',
        timestamp: '2024-07-17 08:45:22',
        userId: '1',
        username: 'admin',
        action: 'DELETE_USER',
        resource: 'users',
        resourceId: 'user_123',
        details: 'U fshi përdoruesi: test_user',
        ipAddress: '192.168.1.100',
        success: true,
        severity: 'HIGH',
        category: 'USER_MANAGEMENT'
      },
      {
        id: '6',
        timestamp: '2024-07-17 08:30:11',
        userId: '1',
        username: 'admin',
        action: 'EXPORT_DATA',
        resource: 'reports',
        details: 'Eksportoi raportin e kundervajtjeve për muajin korrik',
        ipAddress: '192.168.1.100',
        success: true,
        severity: 'MEDIUM',
        category: 'DATA_ACCESS'
      },
      {
        id: '7',
        timestamp: '2024-07-17 07:20:33',
        userId: '4',
        username: 'unknown',
        action: 'UNAUTHORIZED_ACCESS',
        resource: 'admin_panel',
        details: 'Tentativë e paautorizuar për qasje në panelin e administratorit',
        ipAddress: '192.168.1.150',
        success: false,
        severity: 'CRITICAL',
        category: 'SYSTEM'
      }
    ];

    setAuditEntries(mockAuditEntries);
  }, []);

  const getFilteredEntries = () => {
    let filtered = auditEntries;

    // Apply access control - admins see everything, others see limited info
    const userRole = state.user?.role?.name;
    if (userRole !== 'admin') {
      // Non-admins only see their own actions and public events
      filtered = filtered.filter(entry => 
        entry.userId === state.user?.id || 
        entry.category === 'LOGIN' ||
        entry.action === 'VIEW_CASE'
      );
    }

    // Apply filters
    if (filters.dateFrom) {
      filtered = filtered.filter(entry => entry.timestamp >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(entry => entry.timestamp <= filters.dateTo);
    }
    if (filters.userId) {
      filtered = filtered.filter(entry => 
        entry.username.toLowerCase().includes(filters.userId.toLowerCase())
      );
    }
    if (filters.action) {
      filtered = filtered.filter(entry => entry.action === filters.action);
    }
    if (filters.resource) {
      filtered = filtered.filter(entry => entry.resource === filters.resource);
    }
    if (filters.severity) {
      filtered = filtered.filter(entry => entry.severity === filters.severity);
    }
    if (filters.category) {
      filtered = filtered.filter(entry => entry.category === filters.category);
    }
    if (filters.success !== '') {
      filtered = filtered.filter(entry => entry.success === (filters.success === 'true'));
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return '#dc3545';
      case 'HIGH': return '#fd7e14';
      case 'MEDIUM': return '#ffc107';
      case 'LOW': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'LOGIN': return '🔐';
      case 'CASE_MANAGEMENT': return '📋';
      case 'USER_MANAGEMENT': return '👥';
      case 'SYSTEM': return '⚙️';
      case 'DATA_ACCESS': return '📊';
      case 'ADMIN': return '🛡️';
      default: return '📌';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'LOGIN': return '🔑';
      case 'LOGOUT': return '🚪';
      case 'FAILED_LOGIN': return '❌';
      case 'CREATE_CASE': return '➕';
      case 'UPDATE_CASE': return '✏️';
      case 'DELETE_CASE': return '🗑️';
      case 'VIEW_CASE': return '👁️';
      case 'EXPORT_DATA': return '📤';
      case 'IMPORT_DATA': return '📥';
      case 'DELETE_USER': return '👤❌';
      case 'CREATE_USER': return '👤➕';
      case 'UNAUTHORIZED_ACCESS': return '🚨';
      default: return '📝';
    }
  };

  const filteredEntries = getFilteredEntries();
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const exportAuditLog = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Resource', 'Details', 'IP Address', 'Success', 'Severity'].join(','),
      ...filteredEntries.map(entry => [
        entry.timestamp,
        entry.username,
        entry.action,
        entry.resource,
        `"${entry.details}"`,
        entry.ipAddress,
        entry.success,
        entry.severity
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_log_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="classic-window" style={{ margin: '20px', maxWidth: '100%' }}>
      <div className="classic-window-header">
        📋 Ditari i Auditimit - Ndjekja e Veprimeve në Sistem
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
            🔍 Gjithsej: {filteredEntries.length} hyrje auditimi
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="classic-button"
              onClick={exportAuditLog}
              style={{ fontSize: '11px' }}
            >
              📤 Eksporto CSV
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              🔄 Rifresko
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
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Nga Data:</label>
              <input
                type="datetime-local"
                className="classic-textbox"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Deri Data:</label>
              <input
                type="datetime-local"
                className="classic-textbox"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                style={{ fontSize: '11px' }}
              />
            </div>

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
              <label className="classic-label" style={{ fontSize: '11px' }}>Veprimtaria:</label>
              <select
                className="classic-dropdown"
                value={filters.action}
                onChange={(e) => setFilters({...filters, action: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="LOGIN">Hyrje</option>
                <option value="LOGOUT">Dalje</option>
                <option value="FAILED_LOGIN">Hyrje e dështuar</option>
                <option value="CREATE_CASE">Krijim rasti</option>
                <option value="UPDATE_CASE">Përditësim rasti</option>
                <option value="DELETE_CASE">Fshirje rasti</option>
                <option value="VIEW_CASE">Shikimi i rastit</option>
                <option value="EXPORT_DATA">Eksportim të dhënash</option>
                <option value="UNAUTHORIZED_ACCESS">Qasje e paautorizuar</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Kategoria:</label>
              <select
                className="classic-dropdown"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="LOGIN">Identifikimi</option>
                <option value="CASE_MANAGEMENT">Menaxhimi i rasteve</option>
                <option value="USER_MANAGEMENT">Menaxhimi i përdoruesve</option>
                <option value="SYSTEM">Sistemi</option>
                <option value="DATA_ACCESS">Qasja në të dhëna</option>
                <option value="ADMIN">Administrativ</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Rëndësia:</label>
              <select
                className="classic-dropdown"
                value={filters.severity}
                onChange={(e) => setFilters({...filters, severity: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="CRITICAL">Kritike</option>
                <option value="HIGH">E lartë</option>
                <option value="MEDIUM">Mesatare</option>
                <option value="LOW">E ulët</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Statusi:</label>
              <select
                className="classic-dropdown"
                value={filters.success}
                onChange={(e) => setFilters({...filters, success: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="true">Suksesshme</option>
                <option value="false">Dështuar</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button 
              className="classic-button" 
              onClick={() => {
                setFilters({
                  dateFrom: '', dateTo: '', userId: '', action: '', 
                  resource: '', severity: '', category: '', success: ''
                });
                setCurrentPage(1);
              }}
              style={{ fontSize: '11px' }}
            >
              🗑️ Pastro Filtrat
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              🔍 Kërko
            </button>
          </div>
        </div>

        {/* Audit Entries Table */}
        <div style={{ 
          border: '1px inset #c0c0c0', 
          background: 'white',
          maxHeight: '500px',
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
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Koha</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Përdoruesi</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Veprimtaria</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Resursi</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Detajet</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>IP Adresa</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Statusi</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Rëndësia</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEntries.map((entry, index) => (
                <tr 
                  key={entry.id}
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8',
                    cursor: 'pointer'
                  }}
                  onDoubleClick={() => setSelectedEntry(entry)}
                >
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', whiteSpace: 'nowrap' }}>
                    {entry.timestamp}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', fontWeight: 'bold' }}>
                    {entry.username}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    {getActionIcon(entry.action)} {entry.action}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    {getCategoryIcon(entry.category)} {entry.resource}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', maxWidth: '200px' }}>
                    <div style={{ 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap' 
                    }}>
                      {entry.details}
                    </div>
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    {entry.ipAddress}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'center' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: entry.success ? '#28a745' : '#dc3545',
                      color: 'white',
                      fontSize: '10px'
                    }}>
                      {entry.success ? '✅ Sukses' : '❌ Dështim'}
                    </span>
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'center' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: getSeverityColor(entry.severity),
                      color: 'white',
                      fontSize: '10px'
                    }}>
                      {entry.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
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
              ⬅️ Mbrapa
            </button>
            
            <span style={{ fontSize: '11px' }}>
              Faqja {currentPage} nga {totalPages} ({filteredEntries.length} hyrje)
            </span>
            
            <button
              className="classic-button"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              style={{ fontSize: '11px' }}
            >
              Përpara ➡️
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
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <div className="classic-window-header">
                📋 Detajet e Hyrjes së Auditimit
              </div>
              <div className="classic-window-content">
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'auto 1fr', 
                  gap: '8px 16px',
                  fontSize: '12px'
                }}>
                  <strong>Koha:</strong>
                  <span>{selectedEntry.timestamp}</span>
                  
                  <strong>Përdoruesi:</strong>
                  <span>{selectedEntry.username} (ID: {selectedEntry.userId})</span>
                  
                  <strong>Veprimtaria:</strong>
                  <span>{getActionIcon(selectedEntry.action)} {selectedEntry.action}</span>
                  
                  <strong>Resursi:</strong>
                  <span>{getCategoryIcon(selectedEntry.category)} {selectedEntry.resource}</span>
                  
                  {selectedEntry.resourceId && (
                    <>
                      <strong>ID e Resursi:</strong>
                      <span>{selectedEntry.resourceId}</span>
                    </>
                  )}
                  
                  <strong>Detajet:</strong>
                  <span>{selectedEntry.details}</span>
                  
                  <strong>IP Adresa:</strong>
                  <span>{selectedEntry.ipAddress}</span>
                  
                  {selectedEntry.userAgent && (
                    <>
                      <strong>User Agent:</strong>
                      <span style={{ fontSize: '10px', wordBreak: 'break-all' }}>
                        {selectedEntry.userAgent}
                      </span>
                    </>
                  )}
                  
                  <strong>Statusi:</strong>
                  <span style={{ 
                    padding: '2px 6px', 
                    borderRadius: '3px',
                    backgroundColor: selectedEntry.success ? '#28a745' : '#dc3545',
                    color: 'white',
                    fontSize: '11px'
                  }}>
                    {selectedEntry.success ? '✅ Suksesshme' : '❌ Dështuar'}
                  </span>
                  
                  <strong>Rëndësia:</strong>
                  <span style={{ 
                    padding: '2px 6px', 
                    borderRadius: '3px',
                    backgroundColor: getSeverityColor(selectedEntry.severity),
                    color: 'white',
                    fontSize: '11px'
                  }}>
                    {selectedEntry.severity}
                  </span>
                  
                  <strong>Kategoria:</strong>
                  <span>{getCategoryIcon(selectedEntry.category)} {selectedEntry.category}</span>
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

        {/* Summary Statistics */}
        <div style={{ 
          background: '#f0f0f0', 
          border: '1px inset #c0c0c0', 
          padding: '12px', 
          marginTop: '16px',
          fontSize: '11px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <strong>📊 Statistika:</strong><br />
            Gjithsej: {filteredEntries.length} hyrje<br />
            Suksesshme: {filteredEntries.filter(e => e.success).length}<br />
            Dështuar: {filteredEntries.filter(e => !e.success).length}
          </div>
          <div>
            <strong>🚨 Rëndësia:</strong><br />
            Kritike: {filteredEntries.filter(e => e.severity === 'CRITICAL').length}<br />
            E lartë: {filteredEntries.filter(e => e.severity === 'HIGH').length}<br />
            Mesatare: {filteredEntries.filter(e => e.severity === 'MEDIUM').length}
          </div>
          <div>
            <strong>👤 Qasja juaj:</strong><br />
            Roli: {state.user?.role?.name}<br />
            Departamenti: {state.user?.department}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
