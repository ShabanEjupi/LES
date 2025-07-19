import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ClassicCard } from '../common/ClassicCard';
import { ClassicButton } from '../common/ClassicButton';

// Comprehensive data entry interface for all Kosovo Customs modules
export interface DataEntry {
  id: string;
  type: 'violation' | 'case' | 'activity' | 'vehicle' | 'goods' | 'penalty' | 'document';
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  assignedOfficer: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  data: Record<string, string | number | boolean>;
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'number' | 'date' | 'multiselect';
  required?: boolean;
}

interface ModuleDefinition {
  id: string;
  name: string;
  icon: string;
  description: string;
  fields: FormField[];
}

const ComprehensiveDataEntry: React.FC = () => {
  const { state } = useAuth();
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [formData, setFormData] = useState<Partial<DataEntry>>({
    type: 'violation',
    priority: 'MEDIUM',
    status: 'DRAFT',
    data: {}
  });

  const modules: ModuleDefinition[] = [
    {
      id: 'violations',
      name: 'Kundërvajtjet',
      icon: '⚠️',
      description: 'Regjistrimi i kundërvajtjeve doganore',
      fields: [
        { name: 'violationType', label: 'Lloji i Kundërvajtjes', type: 'select', required: true },
        { name: 'location', label: 'Vendi i Ngjarjes', type: 'text', required: true },
        { name: 'subjectName', label: 'Emri i Subjektit', type: 'text', required: true },
        { name: 'subjectId', label: 'Nr. Personal/Fiskal', type: 'text', required: true },
        { name: 'vehiclePlate', label: 'Targat e Mjetit', type: 'text' },
        { name: 'goodsDescription', label: 'Përshkrimi i Mallrave', type: 'textarea' },
        { name: 'estimatedValue', label: 'Vlera e Përgjithshme', type: 'number' }
      ]
    },
    {
      id: 'cases',
      name: 'Rastet',
      icon: '📋',
      description: 'Hapja dhe menaxhimi i rasteve',
      fields: [
        { name: 'caseType', label: 'Lloji i Rastit', type: 'select', required: true },
        { name: 'caseTitle', label: 'Titulli i Rastit', type: 'text', required: true },
        { name: 'primaryOfficer', label: 'Oficeri Kryesor', type: 'select', required: true },
        { name: 'department', label: 'Departamenti', type: 'select', required: true },
        { name: 'estimatedDuration', label: 'Kohëzgjatja e Parashikuar', type: 'number' },
        { name: 'relatedViolations', label: 'Kundërvajtjet e Lidhura', type: 'text' }
      ]
    },
    {
      id: 'activities',
      name: 'Aktivitetet',
      icon: '📝',
      description: 'Krijimi i aktiviteteve dhe detyrave',
      fields: [
        { name: 'activityType', label: 'Lloji i Aktivitetit', type: 'select', required: true },
        { name: 'activityTitle', label: 'Titulli i Aktivitetit', type: 'text', required: true },
        { name: 'dueDate', label: 'Data e Përfundimit', type: 'date', required: true },
        { name: 'assignedTeam', label: 'Ekipi i Caktuar', type: 'text' },
        { name: 'requiredResources', label: 'Resurset e Nevojshme', type: 'textarea' },
        { name: 'expectedOutcome', label: 'Rezultati i Pritur', type: 'textarea' }
      ]
    },
    {
      id: 'vehicles',
      name: 'Mjetet e Transportit',
      icon: '🚛',
      description: 'Regjistrimi i mjeteve të transportit',
      fields: [
        { name: 'plateNumber', label: 'Numri i Targës', type: 'text', required: true },
        { name: 'vehicleType', label: 'Lloji i Mjetit', type: 'select', required: true },
        { name: 'make', label: 'Marka', type: 'text' },
        { name: 'model', label: 'Modeli', type: 'text' },
        { name: 'year', label: 'Viti i Prodhimit', type: 'number' },
        { name: 'driverName', label: 'Emri i Shoferit', type: 'text' },
        { name: 'driverLicense', label: 'Nr. i Licencës', type: 'text' },
        { name: 'capacity', label: 'Kapaciteti', type: 'number' }
      ]
    },
    {
      id: 'penalties',
      name: 'Gjobat Administrative',
      icon: '💰',
      description: 'Shqiptimi i gjobave administrative',
      fields: [
        { name: 'penaltyType', label: 'Lloji i Gjobës', type: 'select', required: true },
        { name: 'amount', label: 'Shuma (EUR)', type: 'number', required: true },
        { name: 'reason', label: 'Arsyeja', type: 'textarea', required: true },
        { name: 'violationRef', label: 'Referenca e Kundërvajtjes', type: 'text' },
        { name: 'paymentDeadline', label: 'Afati i Pagesës', type: 'date' },
        { name: 'legalBasis', label: 'Baza Ligjore', type: 'text' }
      ]
    },
    {
      id: 'documents',
      name: 'Dokumentat',
      icon: '📄',
      description: 'Menaxhimi i dokumentave',
      fields: [
        { name: 'documentType', label: 'Lloji i Dokumentit', type: 'select', required: true },
        { name: 'documentNumber', label: 'Numri i Dokumentit', type: 'text', required: true },
        { name: 'issueDate', label: 'Data e Lëshimit', type: 'date' },
        { name: 'validUntil', label: 'Vlen deri më', type: 'date' },
        { name: 'issuedBy', label: 'Lëshuar nga', type: 'text' },
        { name: 'purpose', label: 'Qëllimi', type: 'textarea' }
      ]
    },
    {
      id: 'confiscated-goods',
      name: 'Artikujt e Konfiskuar',
      icon: '📦',
      description: 'Menaxhimi i mallrave të konfiskuara',
      fields: [
        { name: 'goodsType', label: 'Lloji i Mallit', type: 'select', required: true },
        { name: 'description', label: 'Përshkrimi', type: 'textarea', required: true },
        { name: 'quantity', label: 'Sasia', type: 'number', required: true },
        { name: 'unit', label: 'Njësia Matëse', type: 'select', required: true },
        { name: 'estimatedValue', label: 'Vlera e Vlerësuar', type: 'number' },
        { name: 'confiscationDate', label: 'Data e Konfiskimit', type: 'date', required: true },
        { name: 'storageLocation', label: 'Vendi i Ruajtjes', type: 'text' },
        { name: 'condition', label: 'Gjendja', type: 'select' }
      ]
    },
    {
      id: 'audit-diary',
      name: 'Ditari i Auditimit',
      icon: '📓',
      description: 'Regjistrimi i aktiviteteve të auditimit',
      fields: [
        { name: 'auditType', label: 'Lloji i Auditimit', type: 'select', required: true },
        { name: 'auditDate', label: 'Data e Auditimit', type: 'date', required: true },
        { name: 'auditor', label: 'Auditues', type: 'text', required: true },
        { name: 'department', label: 'Departamenti i Audituar', type: 'select', required: true },
        { name: 'findings', label: 'Gjetjet', type: 'textarea' },
        { name: 'recommendations', label: 'Rekomandimet', type: 'textarea' },
        { name: 'followUpDate', label: 'Data e Ndjekjes', type: 'date' }
      ]
    },
    {
      id: 'protocol-book',
      name: 'Libri i Protokollit',
      icon: '📚',
      description: 'Regjistrat e Zyrës Administrative',
      fields: [
        { name: 'protocolNumber', label: 'Numri i Protokollit', type: 'text', required: true },
        { name: 'entryDate', label: 'Data e Hyrjes', type: 'date', required: true },
        { name: 'documentType', label: 'Lloji i Dokumentit', type: 'select', required: true },
        { name: 'sender', label: 'Dërguesi', type: 'text', required: true },
        { name: 'receiver', label: 'Marrësi', type: 'text', required: true },
        { name: 'subject', label: 'Lënda', type: 'text', required: true },
        { name: 'notes', label: 'Shënime', type: 'textarea' }
      ]
    },
    {
      id: 'notifications',
      name: 'Njoftimet',
      icon: '🔔',
      description: 'Sistemi i njoftimeve',
      fields: [
        { name: 'notificationType', label: 'Lloji i Njoftimit', type: 'select', required: true },
        { name: 'title', label: 'Titulli', type: 'text', required: true },
        { name: 'message', label: 'Mesazhi', type: 'textarea', required: true },
        { name: 'priority', label: 'Prioriteti', type: 'select', required: true },
        { name: 'targetDepartment', label: 'Departamenti i Synuar', type: 'select' },
        { name: 'expiryDate', label: 'Data e Skadimit', type: 'date' }
      ]
    },
    {
      id: 'task-management',
      name: 'Kutia Postare e Detyrave',
      icon: '📬',
      description: 'Menaxhimi i detyrave dhe porosive',
      fields: [
        { name: 'taskType', label: 'Lloji i Detyrës', type: 'select', required: true },
        { name: 'taskTitle', label: 'Titulli i Detyrës', type: 'text', required: true },
        { name: 'description', label: 'Përshkrimi', type: 'textarea', required: true },
        { name: 'assignedTo', label: 'I caktuar', type: 'select', required: true },
        { name: 'deadline', label: 'Afati', type: 'date', required: true },
        { name: 'priority', label: 'Prioriteti', type: 'select', required: true },
        { name: 'relatedCase', label: 'Rasti i Lidhur', type: 'text' }
      ]
    },
    {
      id: 'reports',
      name: 'Raportet',
      icon: '📊',
      description: 'Gjenerimi i raporteve të ndryshme',
      fields: [
        { name: 'reportType', label: 'Lloji i Raportit', type: 'select', required: true },
        { name: 'reportTitle', label: 'Titulli i Raportit', type: 'text', required: true },
        { name: 'dateFrom', label: 'Nga Data', type: 'date', required: true },
        { name: 'dateTo', label: 'Deri në Datë', type: 'date', required: true },
        { name: 'department', label: 'Departamenti', type: 'select' },
        { name: 'reportFormat', label: 'Formati', type: 'select', required: true },
        { name: 'includeCharts', label: 'Përfshi Grafikë', type: 'select' }
      ]
    }
  ];,
    {
      id: 'cases',
      name: 'Rastet',
      icon: '📋',
      description: 'Hapja dhe menaxhimi i rasteve',
      fields: [
        { name: 'caseType', label: 'Lloji i Rastit', type: 'select', required: true },
        { name: 'caseTitle', label: 'Titulli i Rastit', type: 'text', required: true },
        { name: 'primaryOfficer', label: 'Oficeri Kryesor', type: 'select', required: true },
        { name: 'department', label: 'Departamenti', type: 'select', required: true },
        { name: 'estimatedDuration', label: 'Kohëzgjatja e Parashikuar', type: 'number' },
        { name: 'relatedViolations', label: 'Kundërvajtjet e Lidhura', type: 'multiselect' }
      ]
    },
    {
      id: 'activities',
      name: 'Aktivitetet',
      icon: '📝',
      description: 'Krijimi i aktiviteteve dhe detyrave',
      fields: [
        { name: 'activityType', label: 'Lloji i Aktivitetit', type: 'select', required: true },
        { name: 'activityTitle', label: 'Titulli i Aktivitetit', type: 'text', required: true },
        { name: 'dueDate', label: 'Data e Përfundimit', type: 'date', required: true },
        { name: 'assignedTeam', label: 'Ekipi i Caktuar', type: 'multiselect' },
        { name: 'requiredResources', label: 'Resurset e Nevojshme', type: 'textarea' },
        { name: 'expectedOutcome', label: 'Rezultati i Pritur', type: 'textarea' }
      ]
    },
    {
      id: 'vehicles',
      name: 'Mjetet e Transportit',
      icon: '🚛',
      description: 'Regjistrimi i mjeteve të transportit',
      fields: [
        { name: 'plateNumber', label: 'Numri i Targës', type: 'text', required: true },
        { name: 'vehicleType', label: 'Lloji i Mjetit', type: 'select', required: true },
        { name: 'make', label: 'Marka', type: 'text' },
        { name: 'model', label: 'Modeli', type: 'text' },
        { name: 'year', label: 'Viti i Prodhimit', type: 'number' },
        { name: 'driverName', label: 'Emri i Shoferit', type: 'text' },
        { name: 'driverLicense', label: 'Nr. i Licencës', type: 'text' },
        { name: 'capacity', label: 'Kapaciteti', type: 'number' }
      ]
    },
    {
      id: 'penalties',
      name: 'Gjobat Administrative',
      icon: '💰',
      description: 'Shqiptimi i gjobave administrative',
      fields: [
        { name: 'penaltyType', label: 'Lloji i Gjobës', type: 'select', required: true },
        { name: 'amount', label: 'Shuma (EUR)', type: 'number', required: true },
        { name: 'reason', label: 'Arsyeja', type: 'textarea', required: true },
        { name: 'violationRef', label: 'Referenca e Kundërvajtjes', type: 'text' },
        { name: 'paymentDeadline', label: 'Afati i Pagesës', type: 'date' },
        { name: 'legalBasis', label: 'Baza Ligjore', type: 'text' }
      ]
    },
    {
      id: 'documents',
      name: 'Dokumentat',
      icon: '📄',
      description: 'Menaxhimi i dokumentave',
      fields: [
        { name: 'documentType', label: 'Lloji i Dokumentit', type: 'select', required: true },
        { name: 'documentNumber', label: 'Numri i Dokumentit', type: 'text', required: true },
        { name: 'issueDate', label: 'Data e Lëshimit', type: 'date' },
        { name: 'validUntil', label: 'Vlen deri më', type: 'date' },
        { name: 'issuedBy', label: 'Lëshuar nga', type: 'text' },
        { name: 'purpose', label: 'Qëllimi', type: 'textarea' }
      ]
    }
  ];

  const violationTypes = [
    'Deklarim i rremë i mallrave',
    'Kontrabandim',
    'Mosdeklarim i mallrave',
    'Kundërvajtje e procedurës doganore',
    'Dokumente të rreme',
    'Tejkalim i kufijve të lejuar',
    'Mosrespektim i embargove',
    'Kundërvajtje të tjera'
  ];

  const vehicleTypes = [
    'Kamion',
    'Furgun',
    'Autobus',
    'Makinë personale',
    'Kamionçin',
    'Rimorkio',
    'Tren mallrash',
    'Anije',
    'Avion',
    'Mjete të tjera'
  ];

  const penaltyTypes = [
    'Gjobë për mosdeklarim',
    'Gjobë për deklarim të rremë',
    'Gjobë për dokumente të rreme',
    'Gjobë për kontrabandim',
    'Gjobë për mosrespektim procedure',
    'Gjobë për vonesë',
    'Gjobë të tjera'
  ];

  const documentTypes = [
    'Procesverbal',
    'Fletë-urdhër',
    'Autorizim',
    'Licencë',
    'Certifikatë',
    'Raport',
    'Njoftim',
    'Vendim',
    'Kërkesë',
    'Përgjigjie'
  ];

  const handleFieldChange = (fieldName: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [fieldName]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const getTitle = (): string => {
      const titleField = formData.data?.title || formData.data?.caseTitle || formData.data?.activityTitle;
      return typeof titleField === 'string' ? titleField : 'Pa titull';
    };
    
    const getDescription = (): string => {
      const descField = formData.data?.description;
      return typeof descField === 'string' ? descField : '';
    };

    const newEntry: DataEntry = {
      id: `${selectedModule}_${Date.now()}`,
      type: formData.type || 'violation',
      title: getTitle(),
      description: getDescription(),
      priority: formData.priority || 'MEDIUM',
      status: 'ACTIVE',
      assignedOfficer: state.user?.id || '',
      createdBy: state.user?.username || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: formData.data || {}
    };

    console.log('New entry created:', newEntry);
    
    // Save to localStorage for now (in real app would save to backend)
    const existingEntries = JSON.parse(localStorage.getItem('kosovoCustomsEntries') || '[]');
    existingEntries.push(newEntry);
    localStorage.setItem('kosovoCustomsEntries', JSON.stringify(existingEntries));
    
    alert('✅ Të dhënat u ruajtën me sukses!');
    
    // Reset form
    setFormData({
      type: 'violation',
      priority: 'MEDIUM',
      status: 'DRAFT',
      data: {}
    });
    setSelectedModule('');
  };

  const getSelectOptions = (fieldName: string) => {
    switch (fieldName) {
      case 'violationType': return violationTypes;
      case 'vehicleType': return vehicleTypes;
      case 'penaltyType': return penaltyTypes;
      case 'documentType': return documentTypes;
      case 'caseType': return ['Rast i ri', 'Rast i rihapur', 'Rast i transferuar', 'Rast urgjent'];
      case 'activityType': return ['Kontroll', 'Hetim', 'Inspektim', 'Raportim', 'Koordinim'];
      case 'department': return ['Kontrolli Kufitar', 'Procedurat Doganore', 'Hetimet', 'Administrata'];
      case 'primaryOfficer': return ['Oficer 1', 'Oficer 2', 'Oficer 3'];
      default: return [];
    }
  };

  const renderField = (field: FormField) => {
    const { name, label, type, required } = field;
    const value = formData.data?.[name] || '';
    const stringValue = typeof value === 'string' ? value : String(value);
    const numberValue = typeof value === 'number' ? value : 0;

    switch (type) {
      case 'select':
        return (
          <select
            key={name}
            className="classic-input"
            value={stringValue}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            required={required}
          >
            <option value="">Zgjidhni {label}</option>
            {getSelectOptions(name).map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            key={name}
            className="classic-input"
            value={stringValue}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            required={required}
            rows={3}
            placeholder={`Shkruani ${label.toLowerCase()}`}
          />
        );
      
      case 'number':
        return (
          <input
            key={name}
            type="number"
            className="classic-input"
            value={numberValue}
            onChange={(e) => handleFieldChange(name, parseFloat(e.target.value) || 0)}
            required={required}
            placeholder={`Shkruani ${label.toLowerCase()}`}
          />
        );
      
      case 'date':
        return (
          <input
            key={name}
            type="date"
            className="classic-input"
            value={stringValue}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            required={required}
          />
        );
      
      default:
        return (
          <input
            key={name}
            type="text"
            className="classic-input"
            value={stringValue}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            required={required}
            placeholder={`Shkruani ${label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Tahoma, Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: '#003d82',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '3px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            🏛️ Sistemi i Integruar i Doganave të Kosovës - Hyrja e të Dhënave
          </h1>
          <p style={{
            margin: '5px 0 0 0',
            fontSize: '12px',
            opacity: 0.9
          }}>
            Zgjidhni modulin për të futur të dhëna të reja në sistem
          </p>
        </div>

        {!selectedModule ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {modules.map(module => (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '2px solid #ddd',
                  borderRadius: '3px'
                }}
              >
                <ClassicCard title={`${module.icon} ${module.name}`}>
                  <p style={{
                    fontSize: '13px',
                    color: '#666',
                    margin: '10px 0',
                    lineHeight: '1.4'
                  }}>
                    {module.description}
                  </p>
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: '#e8f4f8',
                    borderRadius: '3px',
                    fontSize: '11px',
                    color: '#2c5282',
                    fontWeight: 'bold'
                  }}>
                    Klikoni për të filluar
                  </div>
                </ClassicCard>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <ClassicButton
                variant="default"
                size="small"
                onClick={() => setSelectedModule('')}
              >
                ← Kthehu
              </ClassicButton>
              <h2 style={{
                margin: '0 0 0 15px',
                fontSize: '16px',
                color: '#333'
              }}>
                {modules.find(m => m.id === selectedModule)?.icon} {modules.find(m => m.id === selectedModule)?.name}
              </h2>
            </div>

            <ClassicCard title="Formular për Hyrjen e të Dhënave">
              <form onSubmit={handleSubmit}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  {modules.find(m => m.id === selectedModule)?.fields.map(field => (
                    <div key={field.name}>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#333',
                        marginBottom: '5px'
                      }}>
                        {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: '1px solid #ddd',
                  paddingTop: '15px',
                  display: 'flex',
                  gap: '10px'
                }}>
                  <ClassicButton
                    type="submit"
                    variant="primary"
                  >
                    ✅ Ruaj të Dhënat
                  </ClassicButton>
                  <ClassicButton
                    type="button"
                    variant="default"
                    onClick={() => setSelectedModule('')}
                  >
                    ❌ Anulo
                  </ClassicButton>
                </div>
              </form>
            </ClassicCard>
          </div>
        )}
      </div>

      <style>{`
        .classic-input {
          width: 100%;
          padding: 6px 8px;
          border: 1px solid #ccc;
          border-radius: 3px;
          font-size: 11px;
          font-family: Tahoma, Arial, sans-serif;
          background-color: white;
        }
        .classic-input:focus {
          border-color: #4a90e2;
          outline: none;
          box-shadow: 0 0 3px rgba(74, 144, 226, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ComprehensiveDataEntry;
