import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

const ViolationDetail: React.FC = () => {
  const navigate = useNavigate();
  const { violationId } = useParams();

  // Sample violation data
  const violationData = {
    id: violationId || '03.1.7-2025-4',
    offenseNumber: '03.1.7-2025-4',
    title: 'Kundërvajtje Mandatore - Import Documentation Issues',
    type: 'Kundërvajtje Mandatore',
    status: 'Hapur',
    priority: 'HIGH',
    description: 'Zbuluar probleme në dokumentacionin e importit. Dokumentet e paraqitura nuk përputhen me mallrat e deklaruara. Nevoja për hetim të mëtejshëm.',
    createdDate: '21.03.2025 14:29',
    dueDate: '01.04.2025',
    assignedTo: 'fd_test_mng',
    department: 'BORDER_MANAGEMENT',
    createdBy: 'System Administrator',
    involvedParties: 'Kompania ABC Import/Export, Agjenti Doganor XYZ',
    evidence: 'Dokumentet e importit, fotot e mallrave, analizat laboratorike',
    isConfidential: false,
    requiresApproval: true,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hapur': return 'status-active';
      case 'Në Proces': return 'status-pending';
      case 'Mbyllur': return 'status-closed';
      default: return 'status-pending';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'status-danger';
      case 'MEDIUM': return 'status-warning';
      case 'LOW': return 'status-success';
      default: return 'status-info';
    }
  };

  return (
    <MainLayout>
      <div style={{ padding: '16px' }}>
        {/* Header */}
        <div className="classic-window" style={{ marginBottom: '16px' }}>
          <div className="classic-window-header">
            Detajet e Kundërvajtjes - {violationData.offenseNumber}
          </div>
          <div className="classic-window-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <button className="classic-button" onClick={() => navigate('/violations')}>
                ← Kthehu në Listë
              </button>
              <div>
                <button className="classic-button" style={{ marginLeft: '8px' }}>
                  ✏️ Ndrysho
                </button>
                <button className="classic-button" style={{ marginLeft: '8px' }}>
                  🖨️ Printo
                </button>
              </div>
            </div>

            {/* Status badges */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <span className={`classic-status-badge ${getStatusColor(violationData.status)}`}>
                {violationData.status}
              </span>
              <span className={`classic-status-badge ${getPriorityColor(violationData.priority)}`}>
                Prioritet: {violationData.priority}
              </span>
              <span className="classic-status-badge status-info">
                {violationData.type}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Left Column */}
          <div style={{ flex: '2' }}>
            {/* Basic Information */}
            <div className="classic-window" style={{ marginBottom: '16px' }}>
              <div className="classic-window-header">
                Të Dhënat Bazë
              </div>
              <div className="classic-window-content">
                <div className="classic-form-row">
                  <label>Numri i Kundërvajtjes:</label>
                  <span>{violationData.offenseNumber}</span>
                </div>
                <div className="classic-form-row">
                  <label>Titulli:</label>
                  <span>{violationData.title}</span>
                </div>
                <div className="classic-form-row">
                  <label>Lloji:</label>
                  <span>{violationData.type}</span>
                </div>
                <div className="classic-form-row">
                  <label>Data e Krijimit:</label>
                  <span>{violationData.createdDate}</span>
                </div>
                <div className="classic-form-row">
                  <label>Afati:</label>
                  <span>{violationData.dueDate}</span>
                </div>
                <div className="classic-form-row">
                  <label>Krijuar nga:</label>
                  <span>{violationData.createdBy}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="classic-window" style={{ marginBottom: '16px' }}>
              <div className="classic-window-header">
                Përshkrimi i Kundërvajtjes
              </div>
              <div className="classic-window-content">
                <p style={{ lineHeight: '1.6', margin: '0' }}>{violationData.description}</p>
              </div>
            </div>

            {/* Involved Parties */}
            <div className="classic-window" style={{ marginBottom: '16px' }}>
              <div className="classic-window-header">
                Entitetet e Përfshira
              </div>
              <div className="classic-window-content">
                <p style={{ margin: '0' }}>{violationData.involvedParties}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ flex: '1' }}>
            {/* Assignment Information */}
            <div className="classic-window" style={{ marginBottom: '16px' }}>
              <div className="classic-window-header">
                Të Dhënat e Caktimit
              </div>
              <div className="classic-window-content">
                <div className="classic-form-row">
                  <label>Caktuar për:</label>
                  <span>{violationData.assignedTo}</span>
                </div>
                <div className="classic-form-row">
                  <label>Departamenti:</label>
                  <span>{violationData.department}</span>
                </div>
                <div className="classic-form-row">
                  <label>Konfidencial:</label>
                  <span>{violationData.isConfidential ? 'Po' : 'Jo'}</span>
                </div>
                <div className="classic-form-row">
                  <label>Kërkon Miratim:</label>
                  <span>{violationData.requiresApproval ? 'Po' : 'Jo'}</span>
                </div>
              </div>
            </div>

            {/* Evidence */}
            <div className="classic-window" style={{ marginBottom: '16px' }}>
              <div className="classic-window-header">
                Dëshmitë dhe Provat
              </div>
              <div className="classic-window-content">
                <p style={{ margin: '0', fontSize: '12px', lineHeight: '1.5' }}>{violationData.evidence}</p>
                <div style={{ marginTop: '12px' }}>
                  <button className="classic-button" style={{ width: '100%', marginBottom: '4px' }}>
                    📎 Shiko Dokumentet
                  </button>
                  <button className="classic-button" style={{ width: '100%', marginBottom: '4px' }}>
                    📷 Shiko Fotot
                  </button>
                  <button className="classic-button" style={{ width: '100%' }}>
                    📊 Shiko Analizat
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="classic-window">
              <div className="classic-window-header">
                Veprime
              </div>
              <div className="classic-window-content">
                <button className="classic-button" style={{ width: '100%', marginBottom: '8px' }}>
                  🔄 Ndrysho Statusin
                </button>
                <button className="classic-button" style={{ width: '100%', marginBottom: '8px' }}>
                  👤 Ricakto Oficerin
                </button>
                <button className="classic-button" style={{ width: '100%', marginBottom: '8px' }}>
                  📝 Krijo Aktivitet
                </button>
                <button className="classic-button" style={{ width: '100%', marginBottom: '8px' }}>
                  💰 Krijo Gjobë
                </button>
                <button className="classic-button" style={{ width: '100%' }}>
                  📋 Gjeneroni Raport
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ViolationDetail;
