import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { ClassicCard } from '../../components/common/ClassicCard';
import { ClassicButton } from '../../components/common/ClassicButton';
import type {
  ViolationTemplate
} from '../../types/FineCalculation';

// Common violation types for Kosovo Customs
const KOSOVO_VIOLATION_TEMPLATES: ViolationTemplate[] = [
  {
    id: 'contraband_goods',
    code: 'KD-001',
    nameAlbanian: 'Kontrabandë e Mallrave',
    nameEnglish: 'Contraband of Goods',
    category: 'CONTRABAND',
    baseAmount: 5000,
    description: 'Transportimi i mallrave pa deklarim doganor',
    suggestedSeverity: 'severe',
    commonReductions: ['voluntaryDisclosure', 'cooperativeSubject'],
    applicableTo: ['individuals', 'companies']
  },
  {
    id: 'false_declaration',
    code: 'KD-002',
    nameAlbanian: 'Deklarim i Rremë',
    nameEnglish: 'False Declaration',
    category: 'FALSE_DECLARATION',
    baseAmount: 2500,
    description: 'Deklarim i pasaktë i mallrave ose vlerës',
    suggestedSeverity: 'moderate',
    commonReductions: ['immediatePayment', 'firstTimeOffender'],
    applicableTo: ['companies', 'individuals']
  },
  {
    id: 'duty_evasion',
    code: 'KD-003',
    nameAlbanian: 'Shmangje nga Taksat',
    nameEnglish: 'Duty Evasion',
    category: 'DUTY_EVASION',
    baseAmount: 3000,
    description: 'Shmangje nga pagimi i taksave doganore',
    suggestedSeverity: 'severe',
    commonReductions: ['voluntaryDisclosure'],
    applicableTo: ['companies']
  },
  {
    id: 'prohibited_goods',
    code: 'KD-004',
    nameAlbanian: 'Mallra të Ndaluara',
    nameEnglish: 'Prohibited Goods',
    category: 'PROHIBITED_GOODS',
    baseAmount: 7500,
    description: 'Import/eksport i mallrave të ndaluara',
    suggestedSeverity: 'critical',
    commonReductions: ['cooperativeSubject'],
    applicableTo: ['individuals', 'companies']
  },
  {
    id: 'missing_documents',
    code: 'KD-005',
    nameAlbanian: 'Dokumente të Mangëta',
    nameEnglish: 'Missing Documentation',
    category: 'MISSING_DOCUMENTS',
    baseAmount: 500,
    description: 'Mungesa e dokumenteve të kërkuara',
    suggestedSeverity: 'minor',
    commonReductions: ['minorTechnicalError', 'immediatePayment'],
    applicableTo: ['individuals', 'companies']
  },
  {
    id: 'customs_seal_violation',
    code: 'KD-006',
    nameAlbanian: 'Thyerje e Vulës Doganore',
    nameEnglish: 'Customs Seal Violation',
    category: 'SEAL_VIOLATION',
    baseAmount: 1500,
    description: 'Thyerje ose manipulim i vulës doganore',
    suggestedSeverity: 'moderate',
    commonReductions: ['firstTimeOffender'],
    applicableTo: ['individuals', 'companies']
  }
];

const QuickCalculationTemplates: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<ViolationTemplate | null>(null);

  const handleTemplateSelect = (template: ViolationTemplate) => {
    setSelectedTemplate(template);
    
    // Set URL parameters for the calculation engine
    const params = new URLSearchParams({
      template: template.id,
      violationType: template.category,
      baseAmount: template.baseAmount.toString(),
      severity: template.suggestedSeverity
    });
    
    navigate(`/fines/calculation-engine?${params.toString()}`);
  };

  return (
    <ClassicCard title="🚀 Shabllonet e Shpejta të Kundërvajtjeve">
      <div style={{ marginBottom: '16px' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#666' }}>
          Zgjidhni një shabllone të paracaktuar për të përspejtuar llogaritjen e gjobës:
        </p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '12px'
      }}>
        {KOSOVO_VIOLATION_TEMPLATES.map(template => (
          <div 
            key={template.id}
            style={{
              border: '1px solid #c0c0c0',
              padding: '12px',
              backgroundColor: selectedTemplate?.id === template.id ? '#e3f2fd' : '#f9f9f9',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'all 0.2s ease'
            }}
            onClick={() => handleTemplateSelect(template)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f8ff';
              e.currentTarget.style.borderColor = '#1e3a8a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = selectedTemplate?.id === template.id ? '#e3f2fd' : '#f9f9f9';
              e.currentTarget.style.borderColor = '#c0c0c0';
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '8px'
            }}>
              <div>
                <div style={{ 
                  fontWeight: 'bold',
                  fontSize: '13px',
                  color: '#1e3a8a',
                  marginBottom: '2px'
                }}>
                  {template.code} - {template.nameAlbanian}
                </div>
                <div style={{ 
                  fontSize: '11px',
                  color: '#666',
                  fontStyle: 'italic'
                }}>
                  {template.nameEnglish}
                </div>
              </div>
              <div style={{
                backgroundColor: template.suggestedSeverity === 'critical' ? '#dc3545' :
                               template.suggestedSeverity === 'severe' ? '#fd7e14' :
                               template.suggestedSeverity === 'moderate' ? '#ffc107' : '#28a745',
                color: 'white',
                padding: '2px 6px',
                borderRadius: '3px',
                fontSize: '9px',
                fontWeight: 'bold'
              }}>
                {template.suggestedSeverity === 'critical' ? 'KRITIK' :
                 template.suggestedSeverity === 'severe' ? 'I RËNDË' :
                 template.suggestedSeverity === 'moderate' ? 'MESATAR' : 'I LEHTË'}
              </div>
            </div>
            
            <div style={{ 
              fontSize: '11px',
              color: '#333',
              marginBottom: '8px',
              lineHeight: '1.4'
            }}>
              {template.description}
            </div>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px'
            }}>
              <div style={{ 
                fontWeight: 'bold',
                color: '#e41e20'
              }}>
                Baza: €{template.baseAmount.toLocaleString()}
              </div>
              <div style={{ 
                color: '#666'
              }}>
                {template.applicableTo.join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: '16px',
        textAlign: 'center'
      }}>
        <ClassicButton 
          onClick={() => navigate('/fines/calculation-engine')}
        >
          ➕ Llogaritje Manuale
        </ClassicButton>
      </div>
    </ClassicCard>
  );
};

const FineCalculationTemplateSelector: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout title="Zgjidhni Shabllon për Llogaritje Gjobe">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Header */}
        <ClassicCard title="🎯 Zgjedhja e Shabllonit të Llogaritjes">
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ margin: 0, color: '#1e3a8a' }}>
              Llogaritja e Gjobave Administrative
            </h2>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>
              Administrata Doganore e Kosovës - Zgjidhni shabllon të paracaktuar ose filloni llogaritje manuale
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <ClassicButton 
              variant="primary"
              onClick={() => navigate('/fines/calculation-engine')}
            >
              🧮 Llogaritje Manuale
            </ClassicButton>
            <ClassicButton 
              onClick={() => navigate('/fines/dashboard')}
            >
              📊 Panel Kontrolli
            </ClassicButton>
            <ClassicButton 
              onClick={() => navigate('/fines/calculation-history')}
            >
              📋 Historiku
            </ClassicButton>
          </div>
        </ClassicCard>

        {/* Quick Templates */}
        <QuickCalculationTemplates />

        {/* Case Integration */}
        <ClassicCard title="🔗 Integrimi me Rastet">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: '#f0f8ff',
            border: '1px solid #1e3a8a',
            borderRadius: '4px'
          }}>
            <div>
              <div style={{ 
                fontWeight: 'bold',
                marginBottom: '4px',
                color: '#1e3a8a'
              }}>
                Llogaritje nga Rasti Aktiv
              </div>
              <div style={{ 
                fontSize: '12px',
                color: '#666'
              }}>
                Nëse keni një rast të hapur, mund të llogaritni gjobën direkt nga detajet e rastit.
              </div>
            </div>
            <ClassicButton 
              onClick={() => navigate('/cases')}
            >
              📁 Shiko Rastet
            </ClassicButton>
          </div>
        </ClassicCard>

        {/* Statistics Preview */}
        <ClassicCard title="📊 Statistika të Përgjithshme">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px'
          }}>
            <div style={{ textAlign: 'center', padding: '12px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a' }}>
                {KOSOVO_VIOLATION_TEMPLATES.length}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Shabllonet Disponueshme
              </div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '12px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                €{KOSOVO_VIOLATION_TEMPLATES.reduce((sum, t) => sum + t.baseAmount, 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Vlera Totale Bazë
              </div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '12px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
                €{Math.round(KOSOVO_VIOLATION_TEMPLATES.reduce((sum, t) => sum + t.baseAmount, 0) / KOSOVO_VIOLATION_TEMPLATES.length).toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Mesatarja e Gjobave
              </div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '12px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
                {KOSOVO_VIOLATION_TEMPLATES.filter(t => t.suggestedSeverity === 'critical' || t.suggestedSeverity === 'severe').length}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Kundërvajtje të Rënda
              </div>
            </div>
          </div>
        </ClassicCard>

      </div>
    </MainLayout>
  );
};

export default FineCalculationTemplateSelector;
