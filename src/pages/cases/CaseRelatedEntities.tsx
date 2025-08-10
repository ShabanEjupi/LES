import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { ClassicCard } from '../../components/common/ClassicCard';
import { ClassicButton } from '../../components/common/ClassicButton';

interface RelatedEntity {
  id: string;
  type: 'PERSON' | 'COMPANY' | 'DOCUMENT' | 'CASE' | 'VEHICLE' | 'OFFICER';
  name: string;
  description: string;
  relationship: string;
  dateAdded: string;
  addedBy: string;
  status: 'ACTIVE' | 'INACTIVE' | 'UNDER_REVIEW';
  details: {
    [key: string]: string;
  };
}

interface CaseEntity {
  id: string;
  caseNumber: string;
  title: string;
  status: string;
  relatedEntities: RelatedEntity[];
}

const CaseRelatedEntities: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEntityType, setSelectedEntityType] = useState<RelatedEntity['type']>('PERSON');
  const [newEntity, setNewEntity] = useState({
    name: '',
    description: '',
    relationship: '',
    details: {} as { [key: string]: string }
  });

  // Mock data - would come from API
  const caseData: CaseEntity = {
    id: caseId || '1',
    caseNumber: 'RAS-2024-' + (caseId || '001'),
    title: 'Kundërvajtje Doganore - Dokumentacion i Mangët',
    status: 'Aktiv',
    relatedEntities: [
      {
        id: '1',
        type: 'PERSON',
        name: 'Agron Krasniqi',
        description: 'Drejtues i kompanisë përfituese',
        relationship: 'Subjekt kryesor i hetimit',
        dateAdded: '2024-01-15',
        addedBy: 'Mira Hoxha',
        status: 'ACTIVE',
        details: {
          personalNumber: '1234567890',
          address: 'Rruga "Nëna Tereze", Nr. 45, Prishtinë',
          phone: '+383 44 123 456',
          email: 'agron.krasniqi@email.com'
        }
      },
      {
        id: '2',
        type: 'COMPANY',
        name: 'Import-Export SHPK',
        description: 'Kompania importuese në rast',
        relationship: 'Entitet ligjor i përfshirë',
        dateAdded: '2024-01-15',
        addedBy: 'Mira Hoxha',
        status: 'ACTIVE',
        details: {
          registrationNumber: '70123456',
          taxNumber: 'K12345678',
          address: 'Zona Industriale, Ferizaj',
          representative: 'Agron Krasniqi'
        }
      },
      {
        id: '3',
        type: 'DOCUMENT',
        name: 'Deklarata Doganore DG-2024-001234',
        description: 'Deklarata doganore me probleme',
        relationship: 'Dokumenti themelor i rastit',
        dateAdded: '2024-01-16',
        addedBy: 'Besart Mustafa',
        status: 'UNDER_REVIEW',
        details: {
          documentNumber: 'DG-2024-001234',
          issueDate: '2024-01-10',
          customsOffice: 'Dogana Prishtinë',
          value: '25,000 EUR'
        }
      },
      {
        id: '4',
        type: 'VEHICLE',
        name: 'Kamion MAN - 01-AB-123',
        description: 'Mjeti transportues',
        relationship: 'Mjeti i transportit të mallrave',
        dateAdded: '2024-01-16',
        addedBy: 'Besart Mustafa',
        status: 'ACTIVE',
        details: {
          licensePlate: '01-AB-123',
          make: 'MAN',
          model: 'TGX 18.440',
          year: '2019',
          driver: 'Ramadan Gashi'
        }
      },
      {
        id: '5',
        type: 'OFFICER',
        name: 'Inspektori Fitim Berisha',
        description: 'Oficeri që ka zbuluar kundërvajtjen',
        relationship: 'Oficer përgjegjës për zbulimin',
        dateAdded: '2024-01-15',
        addedBy: 'Sistem Automatik',
        status: 'ACTIVE',
        details: {
          badgeNumber: 'INS-445',
          department: 'Kontrolli Doganor',
          shift: 'Mëngjes (06:00-14:00)',
          experience: '8 vjet'
        }
      }
    ]
  };

  const entityTypes = [
    { value: 'PERSON', label: 'Person' },
    { value: 'COMPANY', label: 'Kompani' },
    { value: 'DOCUMENT', label: 'Dokument' },
    { value: 'CASE', label: 'Rast Tjetër' },
    { value: 'VEHICLE', label: 'Mjet' },
    { value: 'OFFICER', label: 'Oficer' }
  ];

  const relationshipTypes = {
    PERSON: ['Subjekt kryesor', 'Dëshmitar', 'Përfaqësues ligjor', 'Person i lidhur'],
    COMPANY: ['Entitet kryesor', 'Kompani bashkëpunuese', 'Furnizues', 'Klient'],
    DOCUMENT: ['Dokument themelor', 'Dëshmi shtesë', 'Dokument ligjor', 'Korrespondencë'],
    CASE: ['Rast i lidhur', 'Rast prind', 'Precedent', 'Rast ndjekës'],
    VEHICLE: ['Mjet transporti', 'Mjet i konfiskuar', 'Mjet dëshmie', 'Mjet i dyshuar'],
    OFFICER: ['Oficer zbulimi', 'Oficer hetimi', 'Oficer mbikëqyrës', 'Ekspert']
  };

  const handleAddEntity = () => {
    const entity: RelatedEntity = {
      id: Date.now().toString(),
      type: selectedEntityType,
      name: newEntity.name,
      description: newEntity.description,
      relationship: newEntity.relationship,
      dateAdded: new Date().toISOString().split('T')[0],
      addedBy: 'Përdoruesi Aktual',
      status: 'ACTIVE',
      details: newEntity.details
    };

    console.log('Adding new entity:', entity);
    alert('Entiteti u shtua me sukses!');
    setShowAddForm(false);
    setNewEntity({ name: '', description: '', relationship: '', details: {} });
  };

  const getEntityIcon = (type: RelatedEntity['type']) => {
    const icons = {
      PERSON: '👤',
      COMPANY: '🏢',
      DOCUMENT: '📄',
      CASE: '📋',
      VEHICLE: '🚛',
      OFFICER: '👮'
    };
    return icons[type];
  };

  const getStatusColor = (status: RelatedEntity['status']) => {
    const colors = {
      ACTIVE: '#10b981',
      INACTIVE: '#6b7280',
      UNDER_REVIEW: '#f59e0b'
    };
    return colors[status];
  };

  const getStatusLabel = (status: RelatedEntity['status']) => {
    const labels = {
      ACTIVE: 'Aktiv',
      INACTIVE: 'Jo-aktiv',
      UNDER_REVIEW: 'Në Shqyrtim'
    };
    return labels[status];
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
            🔗 Entitetet e Ndërlidhur në Rast
          </h1>
          <div style={{ 
            fontSize: '16px', 
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Rasti: <strong>{caseData.caseNumber}</strong> - {caseData.title}
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <ClassicButton 
              variant="primary"
              onClick={() => setShowAddForm(true)}
            >
              ➕ Shto Entitet të Ri
            </ClassicButton>
            
            <ClassicButton variant="default">
              📊 Grafiku i Lidhjeve
            </ClassicButton>
            
            <ClassicButton variant="default">
              📤 Eksporto Raportin
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
          <ClassicCard title="Totali i Entiteteve">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {caseData.relatedEntities.length}
            </div>
          </ClassicCard>
          
          <ClassicCard title="Entitete Aktive">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {caseData.relatedEntities.filter(e => e.status === 'ACTIVE').length}
            </div>
          </ClassicCard>
          
          <ClassicCard title="Në Shqyrtim">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {caseData.relatedEntities.filter(e => e.status === 'UNDER_REVIEW').length}
            </div>
          </ClassicCard>
          
          <ClassicCard title="Lloje të Ndryshme">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
              {new Set(caseData.relatedEntities.map(e => e.type)).size}
            </div>
          </ClassicCard>
        </div>

        {/* Entities Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '16px'
        }}>
          {caseData.relatedEntities.map((entity) => (
            <ClassicCard 
              key={entity.id} 
              title={`${getEntityIcon(entity.type)} ${entity.name}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span 
                  style={{ 
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: getStatusColor(entity.status)
                  }}
                >
                  {getStatusLabel(entity.status)}
                </span>
              </div>
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Përshkrimi:</strong> {entity.description}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Lidhja:</strong> {entity.relationship}
                </div>
                <div style={{ marginBottom: '8px', color: '#6b7280' }}>
                  Shtuar më: {entity.dateAdded} nga {entity.addedBy}
                </div>
                
                {/* Entity-specific details */}
                <div style={{ 
                  marginTop: '12px',
                  padding: '8px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '4px',
                  border: '1px solid #e5e7eb'
                }}>
                  <strong>Detaje:</strong>
                  {Object.entries(entity.details).map(([key, value]) => (
                    <div key={key} style={{ margin: '4px 0' }}>
                      <span style={{ textTransform: 'capitalize' }}>{key}:</span> {value}
                    </div>
                  ))}
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginTop: '12px' 
                }}>
                  <ClassicButton variant="default" size="small">
                    ✏️ Ndrysho
                  </ClassicButton>
                  <ClassicButton variant="default" size="small">
                    👁️ Detaje
                  </ClassicButton>
                  <ClassicButton variant="danger" size="small">
                    🗑️ Hiq
                  </ClassicButton>
                </div>
              </div>
            </ClassicCard>
          ))}
        </div>

        {/* Add Entity Modal */}
        {showAddForm && (
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
              <h2 style={{ marginBottom: '16px' }}>➕ Shto Entitet të Ri</h2>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Lloji i Entitetit:
                </label>
                <select 
                  value={selectedEntityType}
                  onChange={(e) => setSelectedEntityType(e.target.value as RelatedEntity['type'])}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                >
                  {entityTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Emri/Titulli:
                </label>
                <input 
                  type="text"
                  value={newEntity.name}
                  onChange={(e) => setNewEntity({...newEntity, name: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  placeholder="Shkruani emrin ose titullin e entitetit"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Përshkrimi:
                </label>
                <textarea 
                  value={newEntity.description}
                  onChange={(e) => setNewEntity({...newEntity, description: e.target.value})}
                  rows={3}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    resize: 'vertical'
                  }}
                  placeholder="Përshkrimi i entitetit dhe rëndësia e tij në rast"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Lloji i Lidhjes:
                </label>
                <select 
                  value={newEntity.relationship}
                  onChange={(e) => setNewEntity({...newEntity, relationship: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                >
                  <option value="">Zgjidhni llojin e lidhjes</option>
                  {relationshipTypes[selectedEntityType]?.map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <ClassicButton 
                  variant="default"
                  onClick={() => setShowAddForm(false)}
                >
                  ❌ Anulo
                </ClassicButton>
                <ClassicButton 
                  variant="primary"
                  onClick={handleAddEntity}
                  disabled={!newEntity.name || !newEntity.relationship}
                >
                  ✅ Shto Entitetin
                </ClassicButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CaseRelatedEntities;
