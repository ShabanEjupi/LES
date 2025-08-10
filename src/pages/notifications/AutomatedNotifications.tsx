import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { ClassicCard } from '../../components/common/ClassicCard';
import { ClassicButton } from '../../components/common/ClassicButton';
import '../../styles/classic-theme.css';

// Notification Types and Interfaces
interface NotificationRule {
  id: string;
  name: string;
  nameAlbanian: string;
  trigger: string;
  condition: string;
  isActive: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  recipients: string[];
  template: string;
  channels: ('EMAIL' | 'SMS' | 'SYSTEM' | 'PUSH')[];
  delayMinutes: number;
  maxRetries: number;
  createdAt: string;
  createdBy: string;
}

interface NotificationTemplate {
  id: string;
  name: string;
  nameAlbanian: string;
  subject: string;
  content: string;
  variables: string[];
  type: 'EMAIL' | 'SMS' | 'SYSTEM';
  language: 'sq' | 'en';
  isActive: boolean;
}

interface NotificationQueue {
  id: string;
  ruleId: string;
  ruleName: string;
  recipientId: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone?: string;
  subject: string;
  content: string;
  channel: 'EMAIL' | 'SMS' | 'SYSTEM' | 'PUSH';
  status: 'PENDING' | 'SENT' | 'FAILED' | 'CANCELLED';
  scheduledAt: string;
  sentAt?: string;
  errorMessage?: string;
  retryCount: number;
  relatedEntityType: 'CASE' | 'VIOLATION' | 'FINE' | 'DOCUMENT';
  relatedEntityId: string;
}

interface NotificationStatistics {
  totalRules: number;
  activeRules: number;
  totalSent: number;
  pendingQueue: number;
  failedToday: number;
  successRate: number;
  channelBreakdown: {
    email: number;
    sms: number;
    system: number;
    push: number;
  };
}

const AutomatedNotifications: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'rules' | 'templates' | 'queue' | 'statistics'>('rules');
  const [rules, setRules] = useState<NotificationRule[]>([]);
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [queue, setQueue] = useState<NotificationQueue[]>([]);
  const [statistics, setStatistics] = useState<NotificationStatistics | null>(null);
  const [, setShowRuleDialog] = useState(false);
  const [, setShowTemplateDialog] = useState(false);
  const [, setSelectedRule] = useState<NotificationRule | null>(null);
  const [, setSelectedTemplate] = useState<NotificationTemplate | null>(null);

  // Mock data for development
  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock notification rules
    const mockRules: NotificationRule[] = [
      {
        id: 'RULE-001',
        name: 'Case Assignment Notification',
        nameAlbanian: 'Njoftim për Caktimin e Rastit',
        trigger: 'CASE_ASSIGNED',
        condition: 'priority >= HIGH',
        isActive: true,
        priority: 'HIGH',
        recipients: ['assignedOfficer', 'supervisor'],
        template: 'CASE_ASSIGNMENT_TEMPLATE',
        channels: ['EMAIL', 'SYSTEM'],
        delayMinutes: 0,
        maxRetries: 3,
        createdAt: '2024-01-15T10:00:00Z',
        createdBy: 'admin'
      },
      {
        id: 'RULE-002',
        name: 'Fine Calculation Completed',
        nameAlbanian: 'Njoftim për Përfundimin e Llogaritjes së Gjobës',
        trigger: 'FINE_CALCULATED',
        condition: 'amount > 5000',
        isActive: true,
        priority: 'MEDIUM',
        recipients: ['calculatingOfficer', 'supervisor', 'financeTeam'],
        template: 'FINE_CALCULATION_TEMPLATE',
        channels: ['EMAIL', 'SYSTEM'],
        delayMinutes: 5,
        maxRetries: 2,
        createdAt: '2024-01-15T10:00:00Z',
        createdBy: 'admin'
      },
      {
        id: 'RULE-003',
        name: 'Document Approval Required',
        nameAlbanian: 'Njoftim për Nevojën e Miratimit të Dokumentit',
        trigger: 'DOCUMENT_PENDING_APPROVAL',
        condition: 'documentType IN [VIOLATION_REPORT, FINE_NOTICE]',
        isActive: true,
        priority: 'HIGH',
        recipients: ['approver', 'supervisor'],
        template: 'DOCUMENT_APPROVAL_TEMPLATE',
        channels: ['EMAIL', 'SYSTEM', 'SMS'],
        delayMinutes: 10,
        maxRetries: 3,
        createdAt: '2024-01-15T10:00:00Z',
        createdBy: 'admin'
      },
      {
        id: 'RULE-004',
        name: 'Case Deadline Warning',
        nameAlbanian: 'Paralajmërim për Afatin e Rastit',
        trigger: 'CASE_DEADLINE_APPROACHING',
        condition: 'daysUntilDeadline <= 3',
        isActive: true,
        priority: 'URGENT',
        recipients: ['assignedOfficer', 'supervisor'],
        template: 'DEADLINE_WARNING_TEMPLATE',
        channels: ['EMAIL', 'SMS', 'SYSTEM'],
        delayMinutes: 0,
        maxRetries: 5,
        createdAt: '2024-01-15T10:00:00Z',
        createdBy: 'admin'
      },
      {
        id: 'RULE-005',
        name: 'Violation Created',
        nameAlbanian: 'Njoftim për Krijimin e Kundërvajtjes',
        trigger: 'VIOLATION_CREATED',
        condition: 'severity IN [SEVERE, CRITICAL]',
        isActive: true,
        priority: 'HIGH',
        recipients: ['creatingOfficer', 'supervisor', 'sectorChief'],
        template: 'VIOLATION_CREATED_TEMPLATE',
        channels: ['EMAIL', 'SYSTEM'],
        delayMinutes: 0,
        maxRetries: 3,
        createdAt: '2024-01-15T10:00:00Z',
        createdBy: 'admin'
      }
    ];

    // Mock notification templates
    const mockTemplates: NotificationTemplate[] = [
      {
        id: 'CASE_ASSIGNMENT_TEMPLATE',
        name: 'Case Assignment Template',
        nameAlbanian: 'Shablloni i Caktimit të Rastit',
        subject: 'Rasti i ri {{caseNumber}} është caktuar për ju',
        content: `Përshëndetje {{officerName}},

Ju është caktuar rasti i ri: {{caseNumber}}
Titulli: {{caseTitle}}
Prioriteti: {{casePriority}}
Afati: {{caseDeadline}}

Ju lutemi hyni në sistem për të shqyrtuar detajet e rastit.

Link i rastit: {{caseUrl}}

Përshëndetje,
Sistemi i Doganave të Kosovës`,
        variables: ['officerName', 'caseNumber', 'caseTitle', 'casePriority', 'caseDeadline', 'caseUrl'],
        type: 'EMAIL',
        language: 'sq',
        isActive: true
      },
      {
        id: 'FINE_CALCULATION_TEMPLATE',
        name: 'Fine Calculation Template',
        nameAlbanian: 'Shablloni i Llogaritjes së Gjobës',
        subject: 'Gjoba është llogaritur për rastin {{caseNumber}}',
        content: `Përshëndetje {{officerName}},

Gjoba është llogaritur për rastin: {{caseNumber}}
Lloji i kundërvajtjes: {{violationType}}
Vlera e gjobës: {{fineAmount}} EUR
Baza ligjore: {{legalBasis}}

Ju lutemi shqyrtoni dhe aprovoni llogaritjen.

Link i llogaritjes: {{calculationUrl}}

Përshëndetje,
Sistemi i Doganave të Kosovës`,
        variables: ['officerName', 'caseNumber', 'violationType', 'fineAmount', 'legalBasis', 'calculationUrl'],
        type: 'EMAIL',
        language: 'sq',
        isActive: true
      },
      {
        id: 'DOCUMENT_APPROVAL_TEMPLATE',
        name: 'Document Approval Template',
        nameAlbanian: 'Shablloni i Miratimit të Dokumentit',
        subject: 'Dokument në pritje të miratimit: {{documentType}}',
        content: `Përshëndetje {{approverName}},

Dokumenti i mëposhtëm është në pritje të miratimit tuaj:

Lloji i dokumentit: {{documentType}}
Rasti: {{caseNumber}}
Krijuar nga: {{createdBy}}
Data e krijimit: {{createdAt}}

Ju lutemi shqyrtoni dhe miratoni dokumentin.

Link i dokumentit: {{documentUrl}}

Përshëndetje,
Sistemi i Doganave të Kosovës`,
        variables: ['approverName', 'documentType', 'caseNumber', 'createdBy', 'createdAt', 'documentUrl'],
        type: 'EMAIL',
        language: 'sq',
        isActive: true
      },
      {
        id: 'DEADLINE_WARNING_TEMPLATE',
        name: 'Deadline Warning Template',
        nameAlbanian: 'Shablloni i Paralajmërimit të Afatit',
        subject: 'URGJENT: Afati i rastit {{caseNumber}} po afrohet',
        content: `URGJENT: Paralajmërim për afat

Rasti: {{caseNumber}}
Afati: {{deadline}}
Ditë të mbetura: {{daysRemaining}}

Ju lutemi ndërmerrni veprime për të përfunduar rastin në afat.

Link i rastit: {{caseUrl}}

Përshëndetje,
Sistemi i Doganave të Kosovës`,
        variables: ['caseNumber', 'deadline', 'daysRemaining', 'caseUrl'],
        type: 'EMAIL',
        language: 'sq',
        isActive: true
      }
    ];

    // Mock notification queue
    const mockQueue: NotificationQueue[] = [
      {
        id: 'QUEUE-001',
        ruleId: 'RULE-001',
        ruleName: 'Case Assignment Notification',
        recipientId: 'OFF-001',
        recipientName: 'Mira Hoxha',
        recipientEmail: 'mira.hoxha@dogana.gov.al',
        recipientPhone: '+383 44 123 456',
        subject: 'Rasti i ri CASE-2024-001 është caktuar për ju',
        content: 'Ju është caktuar rasti i ri...',
        channel: 'EMAIL',
        status: 'PENDING',
        scheduledAt: '2024-01-20T14:30:00Z',
        retryCount: 0,
        relatedEntityType: 'CASE',
        relatedEntityId: 'CASE-2024-001'
      },
      {
        id: 'QUEUE-002',
        ruleId: 'RULE-002',
        ruleName: 'Fine Calculation Completed',
        recipientId: 'SUP-001',
        recipientName: 'Besart Mustafa',
        recipientEmail: 'besart.mustafa@dogana.gov.al',
        subject: 'Gjoba është llogaritur për rastin CASE-2024-002',
        content: 'Gjoba është llogaritur...',
        channel: 'EMAIL',
        status: 'SENT',
        scheduledAt: '2024-01-20T13:15:00Z',
        sentAt: '2024-01-20T13:15:30Z',
        retryCount: 0,
        relatedEntityType: 'FINE',
        relatedEntityId: 'FINE-2024-001'
      },
      {
        id: 'QUEUE-003',
        ruleId: 'RULE-004',
        ruleName: 'Case Deadline Warning',
        recipientId: 'OFF-002',
        recipientName: 'Agron Krasniqi',
        recipientEmail: 'agron.krasniqi@dogana.gov.al',
        recipientPhone: '+383 44 987 654',
        subject: 'URGJENT: Afati i rastit CASE-2024-003 po afrohet',
        content: 'URGJENT: Paralajmërim për afat...',
        channel: 'SMS',
        status: 'FAILED',
        scheduledAt: '2024-01-20T12:00:00Z',
        errorMessage: 'SMS gateway error',
        retryCount: 2,
        relatedEntityType: 'CASE',
        relatedEntityId: 'CASE-2024-003'
      }
    ];

    // Mock statistics
    const mockStatistics: NotificationStatistics = {
      totalRules: 5,
      activeRules: 5,
      totalSent: 234,
      pendingQueue: 8,
      failedToday: 3,
      successRate: 94.2,
      channelBreakdown: {
        email: 156,
        sms: 45,
        system: 203,
        push: 12
      }
    };

    setRules(mockRules);
    setTemplates(mockTemplates);
    setQueue(mockQueue);
    setStatistics(mockStatistics);
  };

  const handleToggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, isActive: !rule.isActive }
        : rule
    ));
  };

  const handleRetryNotification = (queueId: string) => {
    setQueue(queue.map(item => 
      item.id === queueId && item.status === 'FAILED'
        ? { ...item, status: 'PENDING', retryCount: item.retryCount + 1 }
        : item
    ));
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
      case 'SENT': return '#28a745';
      case 'PENDING': return '#ffc107';
      case 'FAILED': return '#dc3545';
      case 'CANCELLED': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <MainLayout>
      <div className="classic-window">
        <div className="classic-window-header">
          💬 Njoftimet e Automatizuara - Sistemi i Doganave të Kosovës
        </div>
        
        <div className="classic-window-content">
          {/* Tab Navigation */}
          <div style={{ 
            display: 'flex', 
            borderBottom: '2px inset #c0c0c0',
            marginBottom: '16px',
            background: '#f0f0f0'
          }}>
            {[
              { key: 'rules', label: 'Rregullat', icon: '⚙️' },
              { key: 'templates', label: 'Shabllonet', icon: '📝' },
              { key: 'queue', label: 'Radha', icon: '📋' },
              { key: 'statistics', label: 'Statistikat', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.key}
                className={`classic-button ${activeTab === tab.key ? 'classic-button-pressed' : ''}`}
                onClick={() => setActiveTab(tab.key as 'rules' | 'templates' | 'queue' | 'statistics')}
                style={{ 
                  margin: '4px',
                  fontSize: '11px',
                  border: activeTab === tab.key ? '2px inset #c0c0c0' : '2px outset #c0c0c0'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Rules Tab */}
          {activeTab === 'rules' && (
            <ClassicCard title="⚙️ Rregullat e Njoftimeve">
              <div style={{ marginBottom: '16px' }}>
                <ClassicButton 
                  variant="primary"
                  onClick={() => setShowRuleDialog(true)}
                >
                  ➕ Krijo Rregull të Re
                </ClassicButton>
              </div>

              <div style={{ 
                border: '1px inset #c0c0c0', 
                background: 'white'
              }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '11px'
                }}>
                  <thead style={{ background: '#c0c0c0' }}>
                    <tr>
                      <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Emri</th>
                      <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Shkaktari</th>
                      <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'center' }}>Prioriteti</th>
                      <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'center' }}>Kanalet</th>
                      <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'center' }}>Statusi</th>
                      <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'center' }}>Veprimet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rules.map((rule, index) => (
                      <tr 
                        key={rule.id}
                        style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8' }}
                      >
                        <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                          <strong>{rule.nameAlbanian}</strong><br />
                          <small style={{ color: '#666' }}>{rule.name}</small>
                        </td>
                        <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                          {rule.trigger}
                        </td>
                        <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'center' }}>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '3px',
                            backgroundColor: getPriorityColor(rule.priority),
                            color: 'white',
                            fontSize: '10px'
                          }}>
                            {rule.priority}
                          </span>
                        </td>
                        <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'center' }}>
                          {rule.channels.join(', ')}
                        </td>
                        <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'center' }}>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '3px',
                            backgroundColor: rule.isActive ? '#28a745' : '#dc3545',
                            color: 'white',
                            fontSize: '10px'
                          }}>
                            {rule.isActive ? 'Aktiv' : 'Jo Aktiv'}
                          </span>
                        </td>
                        <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'center' }}>
                          <button
                            className="classic-button"
                            onClick={() => handleToggleRule(rule.id)}
                            style={{ fontSize: '10px', margin: '2px' }}
                          >
                            {rule.isActive ? '🔴 Çaktivizo' : '🟢 Aktivizo'}
                          </button>
                          <button
                            className="classic-button"
                            onClick={() => {
                              setSelectedRule(rule);
                              setShowRuleDialog(true);
                            }}
                            style={{ fontSize: '10px', margin: '2px' }}
                          >
                            ✏️ Edito
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ClassicCard>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <ClassicCard title="📝 Shabllonet e Njoftimeve">
              <div style={{ marginBottom: '16px' }}>
                <ClassicButton 
                  variant="primary"
                  onClick={() => setShowTemplateDialog(true)}
                >
                  ➕ Krijo Shablloni të Re
                </ClassicButton>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {templates.map((template) => (
                  <div
                    key={template.id}
                    style={{
                      border: '1px inset #c0c0c0',
                      background: 'white',
                      padding: '12px'
                    }}
                  >
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: 'bold', 
                      marginBottom: '8px',
                      borderBottom: '1px solid #c0c0c0',
                      paddingBottom: '4px'
                    }}>
                      {template.nameAlbanian}
                    </div>
                    <div style={{ fontSize: '11px', marginBottom: '8px' }}>
                      <strong>Lloji:</strong> {template.type}<br />
                      <strong>Gjuha:</strong> {template.language.toUpperCase()}<br />
                      <strong>Variablat:</strong> {template.variables.length}
                    </div>
                    <div style={{ fontSize: '10px', color: '#666', marginBottom: '8px' }}>
                      <strong>Subjekti:</strong> {template.subject}
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        className="classic-button"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setShowTemplateDialog(true);
                        }}
                        style={{ fontSize: '10px' }}
                      >
                        ✏️ Edito
                      </button>
                      <button
                        className="classic-button"
                        style={{ fontSize: '10px' }}
                      >
                        👁️ Shiko
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ClassicCard>
          )}

          {/* Queue Tab */}
          {activeTab === 'queue' && (
            <ClassicCard title="📋 Radha e Njoftimeve">
              <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                <ClassicButton 
                  onClick={() => loadMockData()}
                >
                  🔄 Rifresko
                </ClassicButton>
                <ClassicButton>
                  🗑️ Pastro të Dërguarat
                </ClassicButton>
              </div>

              <div style={{ 
                border: '1px inset #c0c0c0', 
                background: 'white'
              }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '11px'
                }}>
                  <thead style={{ background: '#c0c0c0' }}>
                    <tr>
                      <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Marrësi</th>
                      <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Subjekti</th>
                      <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'center' }}>Kanali</th>
                      <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'center' }}>Statusi</th>
                      <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'center' }}>Kohëzuar</th>
                      <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'center' }}>Veprimet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queue.map((item, index) => (
                      <tr 
                        key={item.id}
                        style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8' }}
                      >
                        <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                          <strong>{item.recipientName}</strong><br />
                          <small style={{ color: '#666' }}>{item.recipientEmail}</small>
                        </td>
                        <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                          {item.subject}
                        </td>
                        <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'center' }}>
                          {item.channel}
                        </td>
                        <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'center' }}>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '3px',
                            backgroundColor: getStatusColor(item.status),
                            color: 'white',
                            fontSize: '10px'
                          }}>
                            {item.status}
                          </span>
                          {item.status === 'FAILED' && (
                            <div style={{ fontSize: '9px', color: '#dc3545', marginTop: '2px' }}>
                              Përpjekje: {item.retryCount}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'center' }}>
                          {new Date(item.scheduledAt).toLocaleString('sq-AL')}
                        </td>
                        <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'center' }}>
                          {item.status === 'FAILED' && (
                            <button
                              className="classic-button"
                              onClick={() => handleRetryNotification(item.id)}
                              style={{ fontSize: '10px' }}
                            >
                              🔄 Provo Përsëri
                            </button>
                          )}
                          <button
                            className="classic-button"
                            style={{ fontSize: '10px', margin: '2px' }}
                          >
                            👁️ Detajet
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ClassicCard>
          )}

          {/* Statistics Tab */}
          {activeTab === 'statistics' && statistics && (
            <ClassicCard title="📊 Statistikat e Njoftimeve">
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ 
                  border: '1px inset #c0c0c0', 
                  background: 'white', 
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#003d82' }}>
                    {statistics.totalRules}
                  </div>
                  <div style={{ fontSize: '11px' }}>Rregulla Gjithsej</div>
                </div>

                <div style={{ 
                  border: '1px inset #c0c0c0', 
                  background: 'white', 
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                    {statistics.activeRules}
                  </div>
                  <div style={{ fontSize: '11px' }}>Rregulla Aktive</div>
                </div>

                <div style={{ 
                  border: '1px inset #c0c0c0', 
                  background: 'white', 
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
                    {statistics.totalSent}
                  </div>
                  <div style={{ fontSize: '11px' }}>Njoftimet e Dërguara</div>
                </div>

                <div style={{ 
                  border: '1px inset #c0c0c0', 
                  background: 'white', 
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
                    {statistics.pendingQueue}
                  </div>
                  <div style={{ fontSize: '11px' }}>Në Pritje</div>
                </div>

                <div style={{ 
                  border: '1px inset #c0c0c0', 
                  background: 'white', 
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
                    {statistics.failedToday}
                  </div>
                  <div style={{ fontSize: '11px' }}>Dështuan Sot</div>
                </div>

                <div style={{ 
                  border: '1px inset #c0c0c0', 
                  background: 'white', 
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                    {statistics.successRate}%
                  </div>
                  <div style={{ fontSize: '11px' }}>Shkalla e Suksesit</div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '12px', marginBottom: '8px' }}>📊 Shpërndarja sipas Kanaleve:</h4>
                <div style={{ 
                  border: '1px inset #c0c0c0', 
                  background: 'white',
                  padding: '12px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '11px' }}>
                    <div>📧 Email: <strong>{statistics.channelBreakdown.email}</strong></div>
                    <div>📱 SMS: <strong>{statistics.channelBreakdown.sms}</strong></div>
                    <div>💻 Sistem: <strong>{statistics.channelBreakdown.system}</strong></div>
                    <div>🔔 Push: <strong>{statistics.channelBreakdown.push}</strong></div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <ClassicButton>
                  📈 Raport i Detajuar
                </ClassicButton>
                <ClassicButton>
                  📊 Eksporto të Dhënat
                </ClassicButton>
                <ClassicButton>
                  🔧 Parametrat e Sistemit
                </ClassicButton>
              </div>
            </ClassicCard>
          )}

          {/* Integration Section */}
          <div style={{ marginTop: '16px' }}>
            <ClassicCard title="🔗 Integrimet me Modulet e Tjera">
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '12px',
                fontSize: '11px'
              }}>
                <ClassicButton 
                  onClick={() => navigate('/cases')}
                >
                  📋 Case Management<br />
                  <small style={{ color: '#666' }}>Njoftimet për rastet</small>
                </ClassicButton>
                <ClassicButton 
                  onClick={() => navigate('/fines/calculation-engine')}
                >
                  💰 Fine Calculation<br />
                  <small style={{ color: '#666' }}>Njoftimet për gjobet</small>
                </ClassicButton>
                <ClassicButton 
                  onClick={() => navigate('/documents/templates')}
                >
                  📄 Document Templates<br />
                  <small style={{ color: '#666' }}>Njoftimet për dokumentet</small>
                </ClassicButton>
                <ClassicButton 
                  onClick={() => navigate('/violations')}
                >
                  ⚠️ Violations<br />
                  <small style={{ color: '#666' }}>Njoftimet për kundërvajtjet</small>
                </ClassicButton>
              </div>
            </ClassicCard>
          </div>

          {/* Quick Actions */}
          <div style={{ marginTop: '16px' }}>
            <ClassicCard title="⚡ Veprime të Shpejta">
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <ClassicButton variant="primary">
                  🚀 Testimi i Shpejt i Njoftimeve
                </ClassicButton>
                <ClassicButton>
                  📧 Dërgo Njoftim Manual
                </ClassicButton>
                <ClassicButton>
                  ⚙️ Konfigurimi i Gateway-it
                </ClassicButton>
                <ClassicButton>
                  📋 Shiko Logjet
                </ClassicButton>
                <ClassicButton>
                  🔄 Rifresko të Gjitha Rregullat
                </ClassicButton>
              </div>
            </ClassicCard>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AutomatedNotifications;
