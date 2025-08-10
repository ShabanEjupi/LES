import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { ClassicCard } from '../../components/common/ClassicCard';
import { ClassicButton } from '../../components/common/ClassicButton';

interface UserAccess {
  id: string;
  userName: string;
  fullName: string;
  role: string;
  department: string;
  accessLevel: 'READ' | 'WRITE' | 'FULL_ACCESS' | 'NO_ACCESS';
  dateGranted: string;
  grantedBy: string;
  isActive: boolean;
  expiryDate?: string;
  customPermissions: string[];
}

interface CaseAccessInfo {
  caseId: string;
  caseNumber: string;
  title: string;
  securityLevel: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'SECRET';
  createdBy: string;
  assignedTo: string;
  userAccess: UserAccess[];
}

const CaseAccessManagement: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const [showGrantForm, setShowGrantForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<UserAccess['accessLevel']>('READ');
  const [expiryDate, setExpiryDate] = useState('');
  const [reason, setReason] = useState('');

  // Mock data - would come from API
  const caseAccessInfo: CaseAccessInfo = {
    caseId: caseId || '1',
    caseNumber: 'RAS-2024-' + (caseId || '001'),
    title: 'Kundërvajtje Doganore - Dokumentacion i Mangët',
    securityLevel: 'CONFIDENTIAL',
    createdBy: 'Mira Hoxha',
    assignedTo: 'Besart Mustafa',
    userAccess: [
      {
        id: '1',
        userName: 'mira.hoxha',
        fullName: 'Mira Hoxha',
        role: 'Oficer Hetimi',
        department: 'Investigim dhe Hetim',
        accessLevel: 'FULL_ACCESS',
        dateGranted: '2024-01-15',
        grantedBy: 'Sistem',
        isActive: true,
        customPermissions: ['case.create', 'case.edit', 'case.delete', 'case.assign']
      },
      {
        id: '2',
        userName: 'besart.mustafa',
        fullName: 'Besart Mustafa',
        role: 'Oficer Doganor',
        department: 'Kontrolli Doganor',
        accessLevel: 'WRITE',
        dateGranted: '2024-01-16',
        grantedBy: 'Mira Hoxha',
        isActive: true,
        customPermissions: ['case.view', 'case.edit', 'case.comment']
      },
      {
        id: '3',
        userName: 'fitim.berisha',
        fullName: 'Fitim Berisha',
        role: 'Inspektor',
        department: 'Kontrolli Doganor',
        accessLevel: 'READ',
        dateGranted: '2024-01-17',
        grantedBy: 'Mira Hoxha',
        isActive: true,
        customPermissions: ['case.view']
      },
      {
        id: '4',
        userName: 'ramadan.gashi',
        fullName: 'Ramadan Gashi',
        role: 'Supervisor',
        department: 'Menaxhimi i Rasteve',
        accessLevel: 'READ',
        dateGranted: '2024-01-18',
        grantedBy: 'Sistem',
        isActive: true,
        expiryDate: '2024-03-18',
        customPermissions: ['case.view', 'case.review']
      },
      {
        id: '5',
        userName: 'lulzim.krasniqi',
        fullName: 'Lulzim Krasniqi',
        role: 'Juridik',
        department: 'Çështjet Ligjore',
        accessLevel: 'READ',
        dateGranted: '2024-01-20',
        grantedBy: 'Besart Mustafa',
        isActive: false,
        expiryDate: '2024-01-25',
        customPermissions: ['case.view']
      }
    ]
  };

  const availableUsers = [
    { id: 'user1', name: 'Agron Shabani', role: 'Oficer', department: 'Kontrolli' },
    { id: 'user2', name: 'Vjosa Kelmendi', role: 'Analiste', department: 'Analiza Rreziku' },
    { id: 'user3', name: 'Ermal Fejza', role: 'Supervisor', department: 'Investigim' },
    { id: 'user4', name: 'Drita Kastrati', role: 'Ekspert Ligjor', department: 'Çështjet Ligjore' }
  ];

  const accessLevels = [
    { value: 'READ', label: 'Lexim (Read)', description: 'Mund të shikojë rastin dhe dokumentet' },
    { value: 'WRITE', label: 'Shkrim (Write)', description: 'Mund të shkruajë dhe përditësojë rastin' },
    { value: 'FULL_ACCESS', label: 'Qasje e Plotë', description: 'Kontrolli i plotë mbi rastin' },
    { value: 'NO_ACCESS', label: 'Pa Qasje', description: 'Hiqja e qasjes në rast' }
  ];

  const getAccessLevelColor = (level: UserAccess['accessLevel']) => {
    const colors = {
      FULL_ACCESS: '#10b981',
      WRITE: '#3b82f6',
      READ: '#f59e0b',
      NO_ACCESS: '#ef4444'
    };
    return colors[level];
  };

  const getAccessLevelLabel = (level: UserAccess['accessLevel']) => {
    const labels = {
      FULL_ACCESS: 'Qasje e Plotë',
      WRITE: 'Shkrim',
      READ: 'Lexim',
      NO_ACCESS: 'Pa Qasje'
    };
    return labels[level];
  };

  const getSecurityLevelColor = (level: CaseAccessInfo['securityLevel']) => {
    const colors = {
      PUBLIC: '#10b981',
      INTERNAL: '#3b82f6',
      CONFIDENTIAL: '#f59e0b',
      SECRET: '#ef4444'
    };
    return colors[level];
  };

  const getSecurityLevelLabel = (level: CaseAccessInfo['securityLevel']) => {
    const labels = {
      PUBLIC: 'Publike',
      INTERNAL: 'Interne',
      CONFIDENTIAL: 'Konfidenciale',
      SECRET: 'E Fshehtë'
    };
    return labels[level];
  };

  const handleGrantAccess = () => {
    const selectedUserInfo = availableUsers.find(u => u.id === selectedUser);
    if (!selectedUserInfo) return;

    const newAccess: UserAccess = {
      id: Date.now().toString(),
      userName: selectedUserInfo.name.toLowerCase().replace(' ', '.'),
      fullName: selectedUserInfo.name,
      role: selectedUserInfo.role,
      department: selectedUserInfo.department,
      accessLevel: selectedAccessLevel,
      dateGranted: new Date().toISOString().split('T')[0],
      grantedBy: 'Përdoruesi Aktual',
      isActive: true,
      expiryDate: expiryDate || undefined,
      customPermissions: selectedAccessLevel === 'FULL_ACCESS' 
        ? ['case.create', 'case.edit', 'case.delete', 'case.assign']
        : selectedAccessLevel === 'WRITE'
        ? ['case.view', 'case.edit', 'case.comment']
        : ['case.view']
    };

    console.log('Granting access:', newAccess);
    alert(`Qasja u dhënë me sukses për ${selectedUserInfo.name}!`);
    setShowGrantForm(false);
    setSelectedUser('');
    setSelectedAccessLevel('READ');
    setExpiryDate('');
    setReason('');
  };

  const revokeAccess = (userId: string) => {
    const user = caseAccessInfo.userAccess.find(u => u.id === userId);
    if (user && confirm(`A jeni të sigurt që doni të hiqni qasjen për ${user.fullName}?`)) {
      console.log('Revoking access for user:', userId);
      alert('Qasja u hoq me sukses!');
    }
  };

  const modifyAccess = (userId: string, newLevel: UserAccess['accessLevel']) => {
    const user = caseAccessInfo.userAccess.find(u => u.id === userId);
    if (user) {
      console.log(`Modifying access for ${user.fullName} to ${newLevel}`);
      alert(`Qasja për ${user.fullName} u ndryshua në ${getAccessLevelLabel(newLevel)}!`);
    }
  };

  return (
    <MainLayout>
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#1f2937',
            marginBottom: '8px'
          }}>
            🔐 Menaxhimi i Qasjeve në Rast
          </h1>
          <div style={{ 
            fontSize: '16px', 
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Rasti: <strong>{caseAccessInfo.caseNumber}</strong> - {caseAccessInfo.title}
          </div>
          
          {/* Security Level Badge */}
          <div style={{ 
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: getSecurityLevelColor(caseAccessInfo.securityLevel),
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            🛡️ Niveli i Sigurisë: {getSecurityLevelLabel(caseAccessInfo.securityLevel)}
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <ClassicButton 
              variant="primary"
              onClick={() => setShowGrantForm(true)}
            >
              ➕ Jep Qasje të Re
            </ClassicButton>
            
            <ClassicButton variant="default">
              📊 Raporti i Qasjeve
            </ClassicButton>
            
            <ClassicButton variant="default">
              📜 Historiku i Ndryshimeve
            </ClassicButton>
          </div>
        </div>

        {/* Statistics Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px',
          marginBottom: '24px'
        }}>
          <ClassicCard title="Totali i Qasjeve">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {caseAccessInfo.userAccess.length}
            </div>
          </ClassicCard>
          
          <ClassicCard title="Qasje Aktive">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {caseAccessInfo.userAccess.filter(u => u.isActive).length}
            </div>
          </ClassicCard>
          
          <ClassicCard title="Qasje të Plota">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
              {caseAccessInfo.userAccess.filter(u => u.accessLevel === 'FULL_ACCESS').length}
            </div>
          </ClassicCard>
          
          <ClassicCard title="Qasje të Skaduar">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {caseAccessInfo.userAccess.filter(u => !u.isActive).length}
            </div>
          </ClassicCard>
        </div>

        {/* Case Information */}
        <ClassicCard title="📋 Informacionet Bazë të Rastit" className="mb-6">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <strong>Krijuar nga:</strong> {caseAccessInfo.createdBy}
            </div>
            <div>
              <strong>Caktuar tek:</strong> {caseAccessInfo.assignedTo}
            </div>
            <div>
              <strong>Niveli i Sigurisë:</strong> 
              <span style={{ 
                marginLeft: '8px',
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: getSecurityLevelColor(caseAccessInfo.securityLevel),
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {getSecurityLevelLabel(caseAccessInfo.securityLevel)}
              </span>
            </div>
          </div>
        </ClassicCard>

        {/* User Access Table */}
        <ClassicCard title="👥 Përdoruesit me Qasje">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '12px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>
                    Përdoruesi
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>
                    Roli/Departamenti
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>
                    Niveli i Qasjes
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>
                    Data e Dhënjes
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>
                    Dhënë nga
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>
                    Statusi
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>
                    Veprime
                  </th>
                </tr>
              </thead>
              <tbody>
                {caseAccessInfo.userAccess.map((user) => (
                  <tr key={user.id} style={{ 
                    backgroundColor: user.isActive ? 'white' : '#fef2f2'
                  }}>
                    <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{user.fullName}</div>
                        <div style={{ color: '#6b7280', fontSize: '11px' }}>
                          @{user.userName}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                      <div>
                        <div>{user.role}</div>
                        <div style={{ color: '#6b7280', fontSize: '11px' }}>
                          {user.department}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                      <span style={{ 
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: getAccessLevelColor(user.accessLevel),
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        {getAccessLevelLabel(user.accessLevel)}
                      </span>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                      {user.dateGranted}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                      {user.grantedBy}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                      <div>
                        <span style={{ 
                          color: user.isActive ? '#10b981' : '#ef4444',
                          fontWeight: 'bold'
                        }}>
                          {user.isActive ? '✅ Aktive' : '❌ Jo-aktive'}
                        </span>
                        {user.expiryDate && (
                          <div style={{ fontSize: '10px', color: '#6b7280' }}>
                            Skadon: {user.expiryDate}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        <ClassicButton 
                          variant="default" 
                          size="small"
                          onClick={() => modifyAccess(user.id, 'READ')}
                        >
                          ✏️
                        </ClassicButton>
                        <ClassicButton 
                          variant="danger" 
                          size="small"
                          onClick={() => revokeAccess(user.id)}
                        >
                          🗑️
                        </ClassicButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ClassicCard>

        {/* Grant Access Modal */}
        {showGrantForm && (
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
              padding: '24px', 
              borderRadius: '8px',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <h2 style={{ marginBottom: '16px' }}>🔑 Jep Qasje të Re</h2>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Zgjidhni Përdoruesin:
                </label>
                <select 
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                >
                  <option value="">Zgjidhni përdoruesin</option>
                  {availableUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.role} ({user.department})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Niveli i Qasjes:
                </label>
                <select 
                  value={selectedAccessLevel}
                  onChange={(e) => setSelectedAccessLevel(e.target.value as UserAccess['accessLevel'])}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                >
                  {accessLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label} - {level.description}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Data e Skadimit (opsionale):
                </label>
                <input 
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Arsyeja e Dhënies së Qasjes:
                </label>
                <textarea 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    resize: 'vertical'
                  }}
                  placeholder="Shkruani arsyen pse po i jepet qasja këtij përdoruesi..."
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <ClassicButton 
                  variant="default"
                  onClick={() => setShowGrantForm(false)}
                >
                  ❌ Anulo
                </ClassicButton>
                <ClassicButton 
                  variant="primary"
                  onClick={handleGrantAccess}
                  disabled={!selectedUser || !selectedAccessLevel}
                >
                  ✅ Jep Qasje
                </ClassicButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CaseAccessManagement;
