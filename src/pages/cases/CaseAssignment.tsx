import React, { useState, useEffect } from 'react';
import { ClassicCard } from '../../components/common/ClassicCard';
import { ClassicButton } from '../../components/common/ClassicButton';

interface CaseAssignment {
  id: string;
  caseNumber: string;
  violationType: string;
  assignedOfficerName: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW' | 'URGENT';
  deadline: string;
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ESCALATED' | 'OVERDUE';
  assignmentReason: string;
  location: string;
  estimatedHours: number;
}

interface Officer {
  id: string;
  name: string;
  department: string;
  available: boolean;
}

interface PendingCase {
  id: string;
  caseNumber: string;
  violationType: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW' | 'URGENT';
  location: string;
  description: string;
}

const CaseAssignment: React.FC = () => {
  const [assignments, setAssignments] = useState<CaseAssignment[]>([]);
  const [pendingCases, setPendingCases] = useState<PendingCase[]>([]);
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [selectedCase, setSelectedCase] = useState<PendingCase | null>(null);
  const [selectedOfficer, setSelectedOfficer] = useState<string>('');
  const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW' | 'URGENT'>('MEDIUM');
  const [deadline, setDeadline] = useState<string>('');
  const [assignmentReason, setAssignmentReason] = useState<string>('');
  const [showAssignmentForm, setShowAssignmentForm] = useState<boolean>(false);

  useEffect(() => {
    // Mock data
    const mockOfficers: Officer[] = [
      { id: 'off-001', name: 'Agim Krasniqi', department: 'Kundërvajtjet Doganore', available: true },
      { id: 'off-002', name: 'Blerta Hoxha', department: 'Kontrolli Kufitar', available: true },
      { id: 'off-003', name: 'Driton Berisha', department: 'Hetimi Financiar', available: false }
    ];

    const mockPendingCases: PendingCase[] = [
      {
        id: 'case-001',
        caseNumber: 'KV-2025-001',
        violationType: 'Kontrabandë Mallrash',
        priority: 'HIGH',
        location: 'Aeroporti i Prishtinës',
        description: 'Dyshim për kontrabandë mallrash të vlefshme'
      },
      {
        id: 'case-002',
        caseNumber: 'KV-2025-002',
        violationType: 'Shmangje nga Tatimi',
        priority: 'MEDIUM',
        location: 'Dogana Merdarë',
        description: 'Përdorim i dokumenteve të rreme për shmangje tatimore'
      }
    ];

    const mockAssignments: CaseAssignment[] = [
      {
        id: 'assign-001',
        caseNumber: 'KV-2025-003',
        violationType: 'Dokumentim i Rremë',
        assignedOfficerName: 'Agim Krasniqi',
        priority: 'HIGH',
        deadline: '2025-01-25',
        status: 'IN_PROGRESS',
        assignmentReason: 'Specialization në dokumentim dhe ekspertizë në raste të ngjashme',
        location: 'Dogana Gjilan',
        estimatedHours: 20
      }
    ];

    setOfficers(mockOfficers);
    setPendingCases(mockPendingCases);
    setAssignments(mockAssignments);
  }, []);

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'URGENT': return { backgroundColor: '#dc2626', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      case 'HIGH': return { backgroundColor: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      case 'MEDIUM': return { backgroundColor: '#eab308', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      case 'LOW': return { backgroundColor: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      default: return { backgroundColor: '#6b7280', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'COMPLETED': return { backgroundColor: '#10b981', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      case 'IN_PROGRESS': return { backgroundColor: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      case 'ASSIGNED': return { backgroundColor: '#eab308', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      case 'ESCALATED': return { backgroundColor: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      case 'OVERDUE': return { backgroundColor: '#dc2626', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      default: return { backgroundColor: '#6b7280', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
    }
  };

  const handleAssignCase = () => {
    if (!selectedCase || !selectedOfficer || !deadline) {
      alert('Ju lutem plotësoni të gjitha fushat e detyrueshme');
      return;
    }

    const officer = officers.find(o => o.id === selectedOfficer);
    const newAssignment: CaseAssignment = {
      id: `assign-${Date.now()}`,
      caseNumber: selectedCase.caseNumber,
      violationType: selectedCase.violationType,
      assignedOfficerName: officer?.name || '',
      priority,
      deadline,
      status: 'ASSIGNED',
      assignmentReason,
      location: selectedCase.location,
      estimatedHours: 16
    };

    setAssignments([...assignments, newAssignment]);
    setPendingCases(pendingCases.filter(c => c.id !== selectedCase.id));
    
    // Reset form
    setSelectedCase(null);
    setSelectedOfficer('');
    setPriority('MEDIUM');
    setDeadline('');
    setAssignmentReason('');
    setShowAssignmentForm(false);

    alert('Rasti është caktuar me sukses!');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 8px 0', color: '#1f2937' }}>
          Caktimi i Rasteve
        </h1>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Menaxhimi dhe caktimi i rasteve të kundërvajtjeve
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <ClassicCard title="Raste në Pritje">
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
            {pendingCases.length}
          </div>
        </ClassicCard>
        
        <ClassicCard title="Oficerë të Disponueshëm">
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
            {officers.filter(o => o.available).length}
          </div>
        </ClassicCard>

        <ClassicCard title="Raste Aktive">
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
            {assignments.filter(a => a.status === 'IN_PROGRESS').length}
          </div>
        </ClassicCard>

        <ClassicCard title="Raste të Caktuara">
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
            {assignments.length}
          </div>
        </ClassicCard>
      </div>

      {/* Pending Cases Section */}
      {pendingCases.length > 0 && (
        <ClassicCard title="🕒 Raste në Pritje për Caktim">
          <div style={{ display: 'grid', gap: '16px' }}>
            {pendingCases.map((pendingCase) => (
              <div key={pendingCase.id} style={{ 
                border: '1px solid #d1d5db', 
                borderRadius: '8px', 
                padding: '16px', 
                backgroundColor: '#fefce8' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <h3 style={{ fontWeight: '600', margin: 0 }}>{pendingCase.caseNumber}</h3>
                      <span style={getPriorityStyle(pendingCase.priority)}>
                        {pendingCase.priority}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0' }}>
                      {pendingCase.violationType}
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0' }}>
                      {pendingCase.description}
                    </p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0' }}>
                      Lokacioni: {pendingCase.location}
                    </p>
                  </div>
                  <ClassicButton 
                    variant="primary"
                    onClick={() => {
                      setSelectedCase(pendingCase);
                      setShowAssignmentForm(true);
                    }}
                  >
                    Cakto Rastin
                  </ClassicButton>
                </div>
              </div>
            ))}
          </div>
        </ClassicCard>
      )}

      {/* Assignment Form Modal */}
      {showAssignmentForm && selectedCase && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '24px', 
            width: '100%', 
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                Caktimi i Rastit: {selectedCase.caseNumber}
              </h2>
              <ClassicButton onClick={() => setShowAssignmentForm(false)}>
                Mbyll
              </ClassicButton>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>
                  Oficeri i Caktuar *
                </label>
                <select 
                  value={selectedOfficer} 
                  onChange={(e) => setSelectedOfficer(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '4px' 
                  }}
                >
                  <option value="">Zgjidhni oficerin</option>
                  {officers.filter(o => o.available).map(officer => (
                    <option key={officer.id} value={officer.id}>
                      {officer.name} - {officer.department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>
                  Prioriteti
                </label>
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value as 'HIGH' | 'MEDIUM' | 'LOW' | 'URGENT')}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '4px' 
                  }}
                >
                  <option value="URGENT">URGJENT</option>
                  <option value="HIGH">I LARTË</option>
                  <option value="MEDIUM">MESATAR</option>
                  <option value="LOW">I ULËT</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>
                  Afati Kohor *
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '4px' 
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>
                  Arsyetimi i Caktimit *
                </label>
                <textarea
                  value={assignmentReason}
                  onChange={(e) => setAssignmentReason(e.target.value)}
                  placeholder="Arsyetoni pse ky oficer është i përshtatshëm për këtë rast..."
                  rows={3}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '4px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', paddingTop: '16px' }}>
                <ClassicButton 
                  variant="primary"
                  onClick={handleAssignCase}
                >
                  Konfirmo Caktimin
                </ClassicButton>
                <ClassicButton 
                  onClick={() => setShowAssignmentForm(false)}
                >
                  Anulo
                </ClassicButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assigned Cases List */}
      <ClassicCard title="Raste të Caktuara">
        <div style={{ display: 'grid', gap: '16px' }}>
          {assignments.map((assignment) => (
            <div key={assignment.id} style={{ 
              border: '1px solid #d1d5db', 
              borderRadius: '8px', 
              padding: '16px',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <h3 style={{ fontWeight: '600', margin: 0 }}>{assignment.caseNumber}</h3>
                    <span style={getPriorityStyle(assignment.priority)}>
                      {assignment.priority}
                    </span>
                    <span style={getStatusStyle(assignment.status)}>
                      {assignment.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0' }}>
                    {assignment.violationType}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px', color: '#6b7280', margin: '8px 0' }}>
                    <p style={{ margin: '2px 0' }}>
                      <strong>Oficeri:</strong> {assignment.assignedOfficerName}
                    </p>
                    <p style={{ margin: '2px 0' }}>
                      <strong>Afati:</strong> {assignment.deadline}
                    </p>
                    <p style={{ margin: '2px 0' }}>
                      <strong>Lokacioni:</strong> {assignment.location}
                    </p>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0' }}>
                    <strong>Arsyetimi:</strong> {assignment.assignmentReason}
                  </p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '14px', color: '#6b7280', marginLeft: '16px' }}>
                  <p style={{ margin: 0 }}>{assignment.estimatedHours}h</p>
                </div>
              </div>
            </div>
          ))}

          {assignments.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
              <p>Nuk ka raste të caktuara aktualisht.</p>
            </div>
          )}
        </div>
      </ClassicCard>
    </div>
  );
};

export default CaseAssignment;
