import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { ClassicCard } from '../../components/common/ClassicCard';
import { ClassicButton } from '../../components/common/ClassicButton';

interface CaseType {
  id: string;
  name: string;
  nameAlbanian: string;
  category: 'ADMINISTRATIVE' | 'CRIMINAL' | 'CIVIL' | 'DISCIPLINARY';
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  estimatedDuration: number; // in days
  requiredRoles: string[];
  requiredDocuments: string[];
  workflow: string[];
  isActive: boolean;
  createdDate: string;
  lastModified: string;
  caseCount: number;
  icon: string;
  color: string;
}

const DifferentCaseTypes: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CaseType['category'] | 'ALL'>('ALL');
  const [newCaseType, setNewCaseType] = useState({
    name: '',
    nameAlbanian: '',
    category: 'ADMINISTRATIVE' as CaseType['category'],
    description: '',
    priority: 'MEDIUM' as CaseType['priority'],
    estimatedDuration: 30,
    requiredRoles: [] as string[],
    requiredDocuments: [] as string[],
    workflow: [] as string[],
    icon: '📋',
    color: '#3b82f6'
  });

  // Mock data - would come from API
  const caseTypes: CaseType[] = [
    {
      id: '1',
      name: 'Administrative Fine',
      nameAlbanian: 'Gjobë Administrative',
      category: 'ADMINISTRATIVE',
      description: 'Gjoba administrative për kundërvajtje doganore të lehta',
      priority: 'MEDIUM',
      estimatedDuration: 15,
      requiredRoles: ['OFFICER', 'SUPERVISOR'],
      requiredDocuments: ['Deklarata Doganore', 'Dëshmi', 'Raport Kontrolli'],
      workflow: ['Hapja e Rastit', 'Hetimi', 'Vendimi', 'Mbyllja'],
      isActive: true,
      createdDate: '2024-01-01',
      lastModified: '2024-01-15',
      caseCount: 125,
      icon: '💰',
      color: '#f59e0b'
    },
    {
      id: '2',
      name: 'Criminal Investigation',
      nameAlbanian: 'Hetim Penal',
      category: 'CRIMINAL',
      description: 'Hetim penal për kundërvajtje të rënda doganore dhe kontrabandë',
      priority: 'HIGH',
      estimatedDuration: 90,
      requiredRoles: ['INVESTIGATOR', 'PROSECUTOR', 'DIRECTOR'],
      requiredDocuments: ['Kallëzim Penal', 'Dëshmi Eksperte', 'Dokumentacion Ligjor'],
      workflow: ['Kallëzimi', 'Hetimi Fillestar', 'Hetimi i Detajuar', 'Akuzimi', 'Gjykimi'],
      isActive: true,
      createdDate: '2024-01-01',
      lastModified: '2024-01-10',
      caseCount: 23,
      icon: '⚖️',
      color: '#ef4444'
    },
    {
      id: '3',
      name: 'Civil Compensation',
      nameAlbanian: 'Dëmshpërblim Civil',
      category: 'CIVIL',
      description: 'Çështje civile për dëmshpërblim nga gabimet doganore',
      priority: 'MEDIUM',
      estimatedDuration: 60,
      requiredRoles: ['LEGAL_ADVISOR', 'SUPERVISOR'],
      requiredDocuments: ['Kërkesa për Dëmshpërblim', 'Prova Dëmesh', 'Vlerësim Ekspert'],
      workflow: ['Aplikimi', 'Vlerësimi', 'Vendimi', 'Pagesa'],
      isActive: true,
      createdDate: '2024-01-01',
      lastModified: '2024-01-12',
      caseCount: 8,
      icon: '🏛️',
      color: '#10b981'
    },
    {
      id: '4',
      name: 'Disciplinary Action',
      nameAlbanian: 'Masë Disciplinore',
      category: 'DISCIPLINARY',
      description: 'Masa disciplinore për personelin doganor për shkelje të rregullores',
      priority: 'HIGH',
      estimatedDuration: 45,
      requiredRoles: ['HR_MANAGER', 'DIRECTOR', 'INSPECTOR'],
      requiredDocuments: ['Raport Disciplinor', 'Dëshmi', 'Vendim Disciplinor'],
      workflow: ['Raporti', 'Hetimi', 'Seanca Dëgjimore', 'Vendimi', 'Zbatimi'],
      isActive: true,
      createdDate: '2024-01-01',
      lastModified: '2024-01-08',
      caseCount: 15,
      icon: '⚠️',
      color: '#8b5cf6'
    },
    {
      id: '5',
      name: 'Customs Audit',
      nameAlbanian: 'Auditim Doganor',
      category: 'ADMINISTRATIVE',
      description: 'Auditim i kompanive për pajtueshmëri me rregulloret doganore',
      priority: 'LOW',
      estimatedDuration: 30,
      requiredRoles: ['AUDITOR', 'SUPERVISOR'],
      requiredDocuments: ['Plan Auditimi', 'Dokumente Financiare', 'Raport Auditimi'],
      workflow: ['Planifikimi', 'Zbatimi', 'Analizimi', 'Raporti', 'Ndjekja'],
      isActive: true,
      createdDate: '2024-01-01',
      lastModified: '2024-01-20',
      caseCount: 42,
      icon: '🔍',
      color: '#06b6d4'
    },
    {
      id: '6',
      name: 'Appeal Review',
      nameAlbanian: 'Shqyrtim Apeli',
      category: 'ADMINISTRATIVE',
      description: 'Shqyrtimi i ankesave kundër vendimeve doganore',
      priority: 'MEDIUM',
      estimatedDuration: 45,
      requiredRoles: ['APPEAL_OFFICER', 'LEGAL_ADVISOR'],
      requiredDocuments: ['Ankesa', 'Vendimi Origjinal', 'Dëshmi Shtesë'],
      workflow: ['Pranima e Ankesës', 'Shqyrtimi', 'Vendimi', 'Njoftimi'],
      isActive: true,
      createdDate: '2024-01-01',
      lastModified: '2024-01-18',
      caseCount: 67,
      icon: '📋',
      color: '#84cc16'
    }
  ];

  const categories = [
    { value: 'ALL', label: 'Të Gjitha', count: caseTypes.length },
    { value: 'ADMINISTRATIVE', label: 'Administrative', count: caseTypes.filter(ct => ct.category === 'ADMINISTRATIVE').length },
    { value: 'CRIMINAL', label: 'Penale', count: caseTypes.filter(ct => ct.category === 'CRIMINAL').length },
    { value: 'CIVIL', label: 'Civile', count: caseTypes.filter(ct => ct.category === 'CIVIL').length },
    { value: 'DISCIPLINARY', label: 'Disciplinore', count: caseTypes.filter(ct => ct.category === 'DISCIPLINARY').length }
  ];

  // Available data for future enhancements
  // const availableRoles = [
  //   'OFFICER', 'SUPERVISOR', 'INVESTIGATOR', 'PROSECUTOR', 'DIRECTOR', 
  //   'LEGAL_ADVISOR', 'HR_MANAGER', 'INSPECTOR', 'AUDITOR', 'APPEAL_OFFICER'
  // ];

  // const availableDocuments = [
  //   'Deklarata Doganore', 'Dëshmi', 'Raport Kontrolli', 'Kallëzim Penal',
  //   'Dëshmi Eksperte', 'Dokumentacion Ligjor', 'Kërkesa për Dëmshpërblim',
  //   'Prova Dëmesh', 'Vlerësim Ekspert', 'Raport Disciplinor', 'Vendim Disciplinor',
  //   'Plan Auditimi', 'Dokumente Financiare', 'Raport Auditimi', 'Ankesa'
  // ];

  // const workflowSteps = [
  //   'Hapja e Rastit', 'Hetimi', 'Vendimi', 'Mbyllja', 'Kallëzimi',
  //   'Hetimi Fillestar', 'Hetimi i Detajuar', 'Akuzimi', 'Gjykimi',
  //   'Aplikimi', 'Vlerësimi', 'Pagesa', 'Raporti', 'Seanca Dëgjimore',
  //   'Zbatimi', 'Planifikimi', 'Analizimi', 'Ndjekja', 'Pranima e Ankesës',
  //   'Shqyrtimi', 'Njoftimi'
  // ];

  const filteredCaseTypes = selectedCategory === 'ALL' 
    ? caseTypes 
    : caseTypes.filter(ct => ct.category === selectedCategory);

  const getCategoryColor = (category: CaseType['category']) => {
    const colors = {
      ADMINISTRATIVE: '#3b82f6',
      CRIMINAL: '#ef4444',
      CIVIL: '#10b981',
      DISCIPLINARY: '#8b5cf6'
    };
    return colors[category];
  };

  const getCategoryLabel = (category: CaseType['category']) => {
    const labels = {
      ADMINISTRATIVE: 'Administrative',
      CRIMINAL: 'Penale',
      CIVIL: 'Civile',
      DISCIPLINARY: 'Disciplinore'
    };
    return labels[category];
  };

  const getPriorityColor = (priority: CaseType['priority']) => {
    const colors = {
      LOW: '#10b981',
      MEDIUM: '#f59e0b',
      HIGH: '#ef4444',
      URGENT: '#dc2626'
    };
    return colors[priority];
  };

  const getPriorityLabel = (priority: CaseType['priority']) => {
    const labels = {
      LOW: 'E Ulët',
      MEDIUM: 'E Mesme',
      HIGH: 'E Lartë',
      URGENT: 'Urgjente'
    };
    return labels[priority];
  };

  const handleCreateCaseType = () => {
    const caseType: CaseType = {
      id: Date.now().toString(),
      ...newCaseType,
      isActive: true,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      caseCount: 0
    };

    console.log('Creating new case type:', caseType);
    alert(`Lloji i rastit "${newCaseType.nameAlbanian}" u krijua me sukses!`);
    setShowCreateForm(false);
    setNewCaseType({
      name: '',
      nameAlbanian: '',
      category: 'ADMINISTRATIVE',
      description: '',
      priority: 'MEDIUM',
      estimatedDuration: 30,
      requiredRoles: [],
      requiredDocuments: [],
      workflow: [],
      icon: '📋',
      color: '#3b82f6'
    });
  };

  const toggleCaseTypeStatus = (id: string) => {
    const caseType = caseTypes.find(ct => ct.id === id);
    if (caseType) {
      const newStatus = !caseType.isActive ? 'aktivua' : 'çaktivua';
      console.log(`Case type ${caseType.nameAlbanian} ${newStatus}`);
      alert(`Lloji i rastit "${caseType.nameAlbanian}" u ${newStatus} me sukses!`);
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
            📂 Llojet e Ndryshme të Rasteve
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Menaxhimi i llojeve të rasteve për sistemin doganor të Kosovës
          </p>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <ClassicButton 
              variant="primary"
              onClick={() => setShowCreateForm(true)}
            >
              ➕ Krijo Lloj të Ri
            </ClassicButton>
            
            <ClassicButton variant="default">
              📊 Statistikat
            </ClassicButton>
            
            <ClassicButton variant="default">
              📤 Eksporto Raportin
            </ClassicButton>
          </div>
        </div>

        {/* Category Filter */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {categories.map((category) => (
            <ClassicButton
              key={category.value}
              variant={selectedCategory === category.value ? 'primary' : 'default'}
              onClick={() => setSelectedCategory(category.value as CaseType['category'] | 'ALL')}
            >
              {category.label} ({category.count})
            </ClassicButton>
          ))}
        </div>

        {/* Statistics Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px',
          marginBottom: '24px'
        }}>
          <ClassicCard title="Totali i Llojeve">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {caseTypes.length}
            </div>
          </ClassicCard>
          
          <ClassicCard title="Aktive">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {caseTypes.filter(ct => ct.isActive).length}
            </div>
          </ClassicCard>
          
          <ClassicCard title="Totali i Rasteve">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
              {caseTypes.reduce((sum, ct) => sum + ct.caseCount, 0)}
            </div>
          </ClassicCard>
          
          <ClassicCard title="Mesatarja e Kohëzgjatjes">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {Math.round(caseTypes.reduce((sum, ct) => sum + ct.estimatedDuration, 0) / caseTypes.length)} ditë
            </div>
          </ClassicCard>
        </div>

        {/* Case Types Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '16px'
        }}>
          {filteredCaseTypes.map((caseType) => (
            <ClassicCard 
              key={caseType.id} 
              title={`${caseType.icon} ${caseType.nameAlbanian}`}
            >
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                {/* Header with status */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <span style={{ 
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: getCategoryColor(caseType.category),
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {getCategoryLabel(caseType.category)}
                  </span>
                  
                  <span style={{ 
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: caseType.isActive ? '#10b981' : '#6b7280',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {caseType.isActive ? '✅ Aktiv' : '❌ Jo-aktiv'}
                  </span>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '12px' }}>
                  <strong>Përshkrimi:</strong> {caseType.description}
                </div>

                {/* Key Info */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '8px',
                  marginBottom: '12px',
                  padding: '8px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '4px'
                }}>
                  <div>
                    <strong>Prioriteti:</strong>
                    <div style={{ 
                      color: getPriorityColor(caseType.priority),
                      fontWeight: 'bold'
                    }}>
                      {getPriorityLabel(caseType.priority)}
                    </div>
                  </div>
                  <div>
                    <strong>Kohëzgjatja:</strong>
                    <div>{caseType.estimatedDuration} ditë</div>
                  </div>
                  <div>
                    <strong>Raste Aktive:</strong>
                    <div style={{ fontWeight: 'bold', color: '#3b82f6' }}>
                      {caseType.caseCount}
                    </div>
                  </div>
                  <div>
                    <strong>Krijuar:</strong>
                    <div>{caseType.createdDate}</div>
                  </div>
                </div>

                {/* Required Roles */}
                <div style={{ marginBottom: '8px' }}>
                  <strong>Rolet e Kërkuara:</strong>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '4px', 
                    marginTop: '4px' 
                  }}>
                    {caseType.requiredRoles.map((role, index) => (
                      <span key={index} style={{ 
                        padding: '2px 6px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '4px',
                        fontSize: '10px'
                      }}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Workflow Steps */}
                <div style={{ marginBottom: '12px' }}>
                  <strong>Hapat e Punës:</strong>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '2px',
                    marginTop: '4px'
                  }}>
                    {caseType.workflow.map((step, index) => (
                      <div key={index} style={{ 
                        fontSize: '10px',
                        padding: '2px 4px',
                        backgroundColor: index % 2 === 0 ? '#f3f4f6' : 'transparent'
                      }}>
                        {index + 1}. {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <ClassicButton variant="default" size="small">
                    ✏️ Ndrysho
                  </ClassicButton>
                  <ClassicButton 
                    variant={caseType.isActive ? 'danger' : 'primary'} 
                    size="small"
                    onClick={() => toggleCaseTypeStatus(caseType.id)}
                  >
                    {caseType.isActive ? '⏸️ Çaktivo' : '▶️ Aktivo'}
                  </ClassicButton>
                  <ClassicButton variant="default" size="small">
                    📊 Statistikat
                  </ClassicButton>
                </div>
              </div>
            </ClassicCard>
          ))}
        </div>

        {/* Create Case Type Modal */}
        {showCreateForm && (
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
              maxWidth: '800px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <h2 style={{ marginBottom: '16px' }}>📂 Krijo Lloj të Ri Rasti</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Left Column */}
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                      Emri në Anglisht:
                    </label>
                    <input 
                      type="text"
                      value={newCaseType.name}
                      onChange={(e) => setNewCaseType({...newCaseType, name: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '8px', 
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                      placeholder="Administrative Fine"
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                      Emri në Shqip:
                    </label>
                    <input 
                      type="text"
                      value={newCaseType.nameAlbanian}
                      onChange={(e) => setNewCaseType({...newCaseType, nameAlbanian: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '8px', 
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                      placeholder="Gjobë Administrative"
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                      Kategoria:
                    </label>
                    <select 
                      value={newCaseType.category}
                      onChange={(e) => setNewCaseType({...newCaseType, category: e.target.value as CaseType['category']})}
                      style={{ 
                        width: '100%', 
                        padding: '8px', 
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                    >
                      <option value="ADMINISTRATIVE">Administrative</option>
                      <option value="CRIMINAL">Penale</option>
                      <option value="CIVIL">Civile</option>
                      <option value="DISCIPLINARY">Disciplinore</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                      Prioriteti:
                    </label>
                    <select 
                      value={newCaseType.priority}
                      onChange={(e) => setNewCaseType({...newCaseType, priority: e.target.value as CaseType['priority']})}
                      style={{ 
                        width: '100%', 
                        padding: '8px', 
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                    >
                      <option value="LOW">E Ulët</option>
                      <option value="MEDIUM">E Mesme</option>
                      <option value="HIGH">E Lartë</option>
                      <option value="URGENT">Urgjente</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                      Kohëzgjatja e Vlerësuar (ditë):
                    </label>
                    <input 
                      type="number"
                      value={newCaseType.estimatedDuration}
                      onChange={(e) => setNewCaseType({...newCaseType, estimatedDuration: Number(e.target.value)})}
                      style={{ 
                        width: '100%', 
                        padding: '8px', 
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                      min="1"
                      max="365"
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                      Ikona:
                    </label>
                    <input 
                      type="text"
                      value={newCaseType.icon}
                      onChange={(e) => setNewCaseType({...newCaseType, icon: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '8px', 
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                      placeholder="📋"
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                      Ngjyra:
                    </label>
                    <input 
                      type="color"
                      value={newCaseType.color}
                      onChange={(e) => setNewCaseType({...newCaseType, color: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '8px', 
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        height: '40px'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Full width fields */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Përshkrimi:
                </label>
                <textarea 
                  value={newCaseType.description}
                  onChange={(e) => setNewCaseType({...newCaseType, description: e.target.value})}
                  rows={3}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    resize: 'vertical'
                  }}
                  placeholder="Përshkrimi i detajuar i llojit të rastit..."
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <ClassicButton 
                  variant="default"
                  onClick={() => setShowCreateForm(false)}
                >
                  ❌ Anulo
                </ClassicButton>
                <ClassicButton 
                  variant="primary"
                  onClick={handleCreateCaseType}
                  disabled={!newCaseType.name || !newCaseType.nameAlbanian || !newCaseType.description}
                >
                  ✅ Krijo Llojin
                </ClassicButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DifferentCaseTypes;
