import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { ClassicCard } from '../../components/common/ClassicCard';
import { ClassicButton } from '../../components/common/ClassicButton';

interface CaseAction {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'PRIMARY' | 'SECONDARY' | 'ADMINISTRATIVE' | 'REPORTING';
  requiredRole: string[];
  isAvailable: boolean;
  lastUsed?: string;
}

interface AdditionalInfo {
  key: string;
  label: string;
  value: string;
  type: 'text' | 'date' | 'number' | 'currency' | 'link' | 'status';
  isEditable: boolean;
  category: 'BASIC' | 'FINANCIAL' | 'LEGAL' | 'TECHNICAL' | 'AUDIT';
}

interface CaseDetails {
  caseId: string;
  caseNumber: string;
  title: string;
  status: string;
  lastUpdated: string;
  actions: CaseAction[];
  additionalInfo: AdditionalInfo[];
}

const AdditionalCaseInfo: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const [selectedCategory, setSelectedCategory] = useState<AdditionalInfo['category'] | 'ALL'>('ALL');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Mock data - would come from API
  const caseDetails: CaseDetails = {
    caseId: caseId || '1',
    caseNumber: 'RAS-2024-' + (caseId || '001'),
    title: 'Kundërvajtje Doganore - Dokumentacion i Mangët',
    status: 'Në Procesim',
    lastUpdated: '2024-01-22 14:30',
    actions: [
      {
        id: '1',
        name: 'Krijoni Aktivitet',
        description: 'Krijo aktivitet të ri për këtë rast',
        icon: '➕',
        color: '#10b981',
        category: 'PRIMARY',
        requiredRole: ['OFFICER', 'SUPERVISOR'],
        isAvailable: true,
        lastUsed: '2024-01-20'
      },
      {
        id: '2',
        name: 'Caktoni Detyrë',
        description: 'Caktoni detyrë të re për oficerët',
        icon: '📋',
        color: '#3b82f6',
        category: 'PRIMARY',
        requiredRole: ['SUPERVISOR', 'MANAGER'],
        isAvailable: true,
        lastUsed: '2024-01-19'
      },
      {
        id: '3',
        name: 'Gjeneroni Raport',
        description: 'Gjenero raport zyrtar për rastin',
        icon: '📄',
        color: '#8b5cf6',
        category: 'REPORTING',
        requiredRole: ['OFFICER', 'SUPERVISOR'],
        isAvailable: true,
        lastUsed: '2024-01-18'
      },
      {
        id: '4',
        name: 'Kalkuloni Gjobën',
        description: 'Hapni kalkulatorin e gjobave',
        icon: '💰',
        color: '#f59e0b',
        category: 'PRIMARY',
        requiredRole: ['OFFICER', 'LEGAL_ADVISOR'],
        isAvailable: true,
        lastUsed: '2024-01-17'
      },
      {
        id: '5',
        name: 'Arkivoni Rastin',
        description: 'Arkivoni rastin e mbyllur',
        icon: '📦',
        color: '#6b7280',
        category: 'ADMINISTRATIVE',
        requiredRole: ['SUPERVISOR', 'MANAGER'],
        isAvailable: false,
        lastUsed: undefined
      },
      {
        id: '6',
        name: 'Dërgoni për Apel',
        description: 'Dërgoni rastin në komisionin e apelit',
        icon: '⚖️',
        color: '#ef4444',
        category: 'SECONDARY',
        requiredRole: ['LEGAL_ADVISOR'],
        isAvailable: true
      },
      {
        id: '7',
        name: 'Eksportoni Dokumentet',
        description: 'Eksportoni të gjitha dokumentet e rastit',
        icon: '📤',
        color: '#06b6d4',
        category: 'ADMINISTRATIVE',
        requiredRole: ['OFFICER'],
        isAvailable: true
      },
      {
        id: '8',
        name: 'Njoftoni Palët',
        description: 'Dërgo njoftim automatik të palëve të interesuara',
        icon: '📧',
        color: '#84cc16',
        category: 'SECONDARY',
        requiredRole: ['OFFICER', 'SUPERVISOR'],
        isAvailable: true
      }
    ],
    additionalInfo: [
      {
        key: 'case_officer',
        label: 'Oficeri Përgjegjës',
        value: 'Mira Hoxha',
        type: 'text',
        isEditable: true,
        category: 'BASIC'
      },
      {
        key: 'estimated_value',
        label: 'Vlera e Vlerësuar',
        value: '25,000',
        type: 'currency',
        isEditable: true,
        category: 'FINANCIAL'
      },
      {
        key: 'incident_date',
        label: 'Data e Incidentit',
        value: '2024-01-15',
        type: 'date',
        isEditable: true,
        category: 'BASIC'
      },
      {
        key: 'customs_office',
        label: 'Zyra Doganore',
        value: 'Dogana Prishtinë',
        type: 'text',
        isEditable: false,
        category: 'BASIC'
      },
      {
        key: 'legal_reference',
        label: 'Referenca Ligjore',
        value: 'Ligji Doganor Nr. 03/L-109, Neni 245',
        type: 'text',
        isEditable: true,
        category: 'LEGAL'
      },
      {
        key: 'evidence_count',
        label: 'Numri i Dëshmive',
        value: '8',
        type: 'number',
        isEditable: true,
        category: 'TECHNICAL'
      },
      {
        key: 'case_complexity',
        label: 'Kompleksiteti',
        value: 'I Mesëm',
        type: 'status',
        isEditable: true,
        category: 'TECHNICAL'
      },
      {
        key: 'deadline',
        label: 'Afati Përfundimtar',
        value: '2024-02-15',
        type: 'date',
        isEditable: true,
        category: 'BASIC'
      },
      {
        key: 'potential_fine',
        label: 'Gjoba e Mundshme',
        value: '5,000',
        type: 'currency',
        isEditable: true,
        category: 'FINANCIAL'
      },
      {
        key: 'audit_trail',
        label: 'Shenjat e Auditimit',
        value: 'audit-trail-link',
        type: 'link',
        isEditable: false,
        category: 'AUDIT'
      },
      {
        key: 'risk_level',
        label: 'Niveli i Rrezikut',
        value: 'I Lartë',
        type: 'status',
        isEditable: true,
        category: 'TECHNICAL'
      },
      {
        key: 'investigation_hours',
        label: 'Orët e Hetimit',
        value: '24',
        type: 'number',
        isEditable: true,
        category: 'TECHNICAL'
      }
    ]
  };

  const categoryLabels = {
    ALL: 'Të Gjitha',
    BASIC: 'Bazike',
    FINANCIAL: 'Financiare',
    LEGAL: 'Ligjore',
    TECHNICAL: 'Teknike',
    AUDIT: 'Auditimi'
  };

  const actionCategories = {
    PRIMARY: { label: 'Kryesore', color: '#10b981' },
    SECONDARY: { label: 'Dytësore', color: '#3b82f6' },
    ADMINISTRATIVE: { label: 'Administrative', color: '#6b7280' },
    REPORTING: { label: 'Raportimi', color: '#8b5cf6' }
  };

  const filteredInfo = selectedCategory === 'ALL' 
    ? caseDetails.additionalInfo 
    : caseDetails.additionalInfo.filter(info => info.category === selectedCategory);

  const getFieldValue = (info: AdditionalInfo) => {
    switch (info.type) {
      case 'currency':
        return `€${info.value}`;
      case 'date':
        return new Date(info.value).toLocaleDateString('sq-AL');
      case 'link':
        return 'Shiko Detajet';
      case 'status':
        return info.value;
      default:
        return info.value;
    }
  };

  const getFieldColor = (info: AdditionalInfo) => {
    if (info.type === 'status') {
      if (info.value.includes('Lartë')) return '#ef4444';
      if (info.value.includes('Mesëm')) return '#f59e0b';
      if (info.value.includes('Ulët')) return '#10b981';
    }
    return '#374151';
  };

  const handleEditField = (info: AdditionalInfo) => {
    setEditingField(info.key);
    setEditValue(info.value);
  };

  const handleSaveField = () => {
    console.log(`Saving field ${editingField} with value: ${editValue}`);
    alert('Fusha u përditësua me sukses!');
    setEditingField(null);
    setEditValue('');
  };

  const handleActionClick = (action: CaseAction) => {
    if (!action.isAvailable) {
      alert('Ky veprim nuk është i disponueshëm për momentin.');
      return;
    }

    console.log(`Executing action: ${action.name}`);
    
    switch (action.id) {
      case '1':
        alert('Duke hapur formularin për krijimin e aktivitetit...');
        break;
      case '2':
        alert('Duke hapur formularin për caktimin e detyrës...');
        break;
      case '3':
        alert('Duke gjeneruar raportin zyrtar...');
        break;
      case '4':
        alert('Duke hapur kalkulatorin e gjobave...');
        break;
      case '6':
        alert('Duke dërguar rastin për apel...');
        break;
      case '7':
        alert('Duke eksportuar dokumentet...');
        break;
      case '8':
        alert('Duke dërguar njoftimet...');
        break;
      default:
        alert(`Veprimi "${action.name}" u ekzekutua me sukses!`);
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
            ℹ️ Butonat dhe Informata Tjera
          </h1>
          <div style={{ 
            fontSize: '16px', 
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Rasti: <strong>{caseDetails.caseNumber}</strong> - {caseDetails.title}
          </div>
          
          <div style={{ 
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: '#e5e7eb',
            color: '#374151',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            📅 Përditësuar: {caseDetails.lastUpdated}
          </div>
        </div>

        {/* Quick Actions */}
        <ClassicCard title="⚡ Veprime të Shpejta" className="mb-6">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '12px'
          }}>
            {Object.entries(actionCategories).map(([category, config]) => {
              const categoryActions = caseDetails.actions.filter(a => a.category === category);
              return (
                <div key={category}>
                  <h4 style={{ 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    color: config.color,
                    marginBottom: '8px'
                  }}>
                    {config.label}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {categoryActions.map((action) => (
                      <ClassicButton
                        key={action.id}
                        variant={action.isAvailable ? 'primary' : 'default'}
                        onClick={() => handleActionClick(action)}
                        disabled={!action.isAvailable}
                      >
                        <span style={{ marginRight: '6px' }}>{action.icon}</span>
                        {action.name}
                      </ClassicButton>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ClassicCard>

        {/* Information Categories Filter */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <ClassicButton
              key={key}
              variant={selectedCategory === key ? 'primary' : 'default'}
              onClick={() => setSelectedCategory(key as AdditionalInfo['category'] | 'ALL')}
            >
              {label} ({key === 'ALL' ? caseDetails.additionalInfo.length : caseDetails.additionalInfo.filter(info => info.category === key).length})
            </ClassicButton>
          ))}
        </div>

        {/* Additional Information */}
        <ClassicCard title="📋 Informata Shtesë">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '16px'
          }}>
            {filteredInfo.map((info) => (
              <div key={info.key} style={{ 
                padding: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#f9fafb'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 'bold',
                    color: '#6b7280',
                    textTransform: 'uppercase'
                  }}>
                    {info.label}
                  </span>
                  <span style={{ 
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: '#e5e7eb',
                    color: '#374151'
                  }}>
                    {categoryLabels[info.category]}
                  </span>
                </div>
                
                {editingField === info.key ? (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type={info.type === 'number' ? 'number' : info.type === 'date' ? 'date' : 'text'}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      style={{ 
                        flex: 1,
                        padding: '4px 8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}
                    />
                    <ClassicButton variant="primary" size="small" onClick={handleSaveField}>
                      ✅
                    </ClassicButton>
                    <ClassicButton variant="default" size="small" onClick={() => setEditingField(null)}>
                      ❌
                    </ClassicButton>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ 
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: getFieldColor(info),
                      flex: 1
                    }}>
                      {info.type === 'link' ? (
                        <a href="#" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                          {getFieldValue(info)}
                        </a>
                      ) : (
                        getFieldValue(info)
                      )}
                    </span>
                    {info.isEditable && (
                      <ClassicButton 
                        variant="default" 
                        size="small"
                        onClick={() => handleEditField(info)}
                      >
                        ✏️
                      </ClassicButton>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ClassicCard>

        {/* Action History */}
        <ClassicCard title="📊 Statistikat e Veprimeve" className="mt-6">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                {caseDetails.actions.filter(a => a.isAvailable).length}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Veprime të Disponueshme</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {caseDetails.actions.filter(a => a.lastUsed).length}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Veprime të Përdorura</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                {caseDetails.additionalInfo.filter(i => i.isEditable).length}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Fusha të Ndryshueshme</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {new Set(caseDetails.additionalInfo.map(i => i.category)).size}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Kategori Informacionesh</div>
            </div>
          </div>
        </ClassicCard>
      </div>
    </MainLayout>
  );
};

export default AdditionalCaseInfo;
