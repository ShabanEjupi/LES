import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

interface UserFormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    personalNumber: string;
    address: string;
    dateOfBirth: string;
  };
  systemInfo: {
    username: string;
    role: string;
    department: string;
    position: string;
    isActive: boolean;
    startDate: string;
    contractType: string;
  };
  permissions: {
    cases: string[];
    documents: string[];
    users: string[];
    reports: string[];
    system: string[];
  };
  security: {
    requireMFA: boolean;
    passwordExpiration: number;
    sessionTimeout: number;
    allowRemoteAccess: boolean;
    dataAccessLevel: string;
  };
}

const UserCreate: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<UserFormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      personalNumber: '',
      address: '',
      dateOfBirth: '',
    },
    systemInfo: {
      username: '',
      role: '',
      department: '',
      position: '',
      isActive: true,
      startDate: '',
      contractType: 'FULL_TIME',
    },
    permissions: {
      cases: [],
      documents: [],
      users: [],
      reports: [],
      system: [],
    },
    security: {
      requireMFA: true,
      passwordExpiration: 90,
      sessionTimeout: 480,
      allowRemoteAccess: false,
      dataAccessLevel: 'INTERNAL',
    },
  });

  const steps = [
    'Informacionet Personale',
    'Informacionet e Sistemit',
    'Lejet dhe Qasjet',
    'Siguria dhe Konfirmimi'
  ];

  const roles = [
    { value: 'Administrator', label: 'Administrator', permissions: ['ALL'] },
    { value: 'Supervisor', label: 'Supervisor', permissions: ['CASES_ALL', 'DOCS_READ', 'USERS_READ', 'REPORTS_ALL'] },
    { value: 'Oficer', label: 'Oficer Doganor', permissions: ['CASES_CRUD', 'DOCS_CRUD', 'REPORTS_READ'] },
    { value: 'Përdorues', label: 'Përdorues i Thjeshtë', permissions: ['CASES_READ', 'DOCS_READ'] },
    { value: 'Auditor', label: 'Auditor', permissions: ['CASES_READ', 'DOCS_READ', 'REPORTS_ALL'] },
  ];

  const departments = [
    'IT dhe Sisteme',
    'Doganë dhe Kontrolli',
    'Hetim dhe Zbulimi',
    'Administrata',
    'Sigurim dhe Mbrojtje',
    'Ligjore dhe Ankesa',
    'Financa dhe Buxheti',
    'Burime Njerëzore'
  ];

  const permissionCategories = {
    cases: [
      { id: 'cases_create', label: 'Krijoni raste të reja' },
      { id: 'cases_edit', label: 'Editoni rastet ekzistuese' },
      { id: 'cases_delete', label: 'Fshini rastet' },
      { id: 'cases_assign', label: 'Caktoni rastet përdoruesve' },
      { id: 'cases_close', label: 'Mbyllni rastet' },
      { id: 'cases_view_all', label: 'Shikoni të gjitha rastet' },
    ],
    documents: [
      { id: 'docs_upload', label: 'Ngarkoni dokumente' },
      { id: 'docs_edit', label: 'Editoni dokumentet' },
      { id: 'docs_delete', label: 'Fshini dokumentet' },
      { id: 'docs_download', label: 'Shkarkoni dokumentet' },
      { id: 'docs_view_confidential', label: 'Shikoni dokumentet konfidenciale' },
    ],
    users: [
      { id: 'users_create', label: 'Krijoni përdorues të rinj' },
      { id: 'users_edit', label: 'Editoni përdoruesit' },
      { id: 'users_delete', label: 'Fshini përdoruesit' },
      { id: 'users_permissions', label: 'Menaxhoni lejet' },
    ],
    reports: [
      { id: 'reports_view', label: 'Shikoni raportet' },
      { id: 'reports_create', label: 'Krijoni raporte' },
      { id: 'reports_export', label: 'Eksportoni raportet' },
      { id: 'reports_admin', label: 'Raportet administrative' },
    ],
    system: [
      { id: 'system_settings', label: 'Konfiguroni sistemin' },
      { id: 'system_backup', label: 'Menaxhoni rezervat' },
      { id: 'system_audit', label: 'Qasje në auditimin' },
      { id: 'system_maintenance', label: 'Mirëmbajtja e sistemit' },
    ],
  };

  const handleInputChange = (section: keyof UserFormData, field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePermissionChange = (category: keyof typeof formData.permissions, permission: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [category]: checked 
          ? [...prev.permissions[category], permission]
          : prev.permissions[category].filter(p => p !== permission)
      }
    }));
  };

  const handleRoleChange = (role: string) => {
    const selectedRole = roles.find(r => r.value === role);
    setFormData(prev => ({
      ...prev,
      systemInfo: {
        ...prev.systemInfo,
        role
      },
      permissions: {
        cases: selectedRole?.permissions.includes('ALL') || selectedRole?.permissions.includes('CASES_ALL') ? 
          permissionCategories.cases.map(p => p.id) : 
          selectedRole?.permissions.includes('CASES_CRUD') ? 
            ['cases_create', 'cases_edit', 'cases_view_all'] :
            selectedRole?.permissions.includes('CASES_READ') ? ['cases_view_all'] : [],
        documents: selectedRole?.permissions.includes('ALL') || selectedRole?.permissions.includes('DOCS_CRUD') ? 
          permissionCategories.documents.map(p => p.id) : 
          selectedRole?.permissions.includes('DOCS_READ') ? ['docs_download'] : [],
        users: selectedRole?.permissions.includes('ALL') ? 
          permissionCategories.users.map(p => p.id) : [],
        reports: selectedRole?.permissions.includes('ALL') || selectedRole?.permissions.includes('REPORTS_ALL') ? 
          permissionCategories.reports.map(p => p.id) : 
          selectedRole?.permissions.includes('REPORTS_READ') ? ['reports_view'] : [],
        system: selectedRole?.permissions.includes('ALL') ? 
          permissionCategories.system.map(p => p.id) : [],
      }
    }));
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const userId = `USER_${Date.now()}`;
    console.log('Creating user:', { ...formData, id: userId });
    alert(`Përdoruesi u krijua me sukses!\nID: ${userId}\nPërdoruesi: ${formData.systemInfo.username}`);
    navigate('/users');
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="classic-window-content">
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Emri:</label>
                <input
                  type="text"
                  className="classic-textbox"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  placeholder="Emri"
                  required
                />
              </div>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Mbiemri:</label>
                <input
                  type="text"
                  className="classic-textbox"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  placeholder="Mbiemri"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Email:</label>
                <input
                  type="email"
                  className="classic-textbox"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Telefoni:</label>
                <input
                  type="text"
                  className="classic-textbox"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  placeholder="+355 XX XXX XXX"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Numri Personal:</label>
                <input
                  type="text"
                  className="classic-textbox"
                  value={formData.personalInfo.personalNumber}
                  onChange={(e) => handleInputChange('personalInfo', 'personalNumber', e.target.value)}
                  placeholder="NXXXXXXXXXXXXL"
                  required
                />
              </div>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Data e Lindjes:</label>
                <input
                  type="date"
                  className="classic-textbox"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                />
              </div>
            </div>

            <div className="classic-form-row">
              <label className="classic-label">Adresa:</label>
              <input
                type="text"
                className="classic-textbox"
                value={formData.personalInfo.address}
                onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                placeholder="Adresa e plotë"
              />
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="classic-window-content">
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Emri i Përdoruesit:</label>
                <input
                  type="text"
                  className="classic-textbox"
                  value={formData.systemInfo.username}
                  onChange={(e) => handleInputChange('systemInfo', 'username', e.target.value)}
                  placeholder="username"
                  required
                />
                <small style={{ color: '#666', fontSize: '10px' }}>
                  Emri unik për qasje në sistem
                </small>
              </div>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Roli:</label>
                <select
                  className="classic-combobox"
                  value={formData.systemInfo.role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  required
                >
                  <option value="">Zgjidhni rolin...</option>
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Departamenti:</label>
                <select
                  className="classic-combobox"
                  value={formData.systemInfo.department}
                  onChange={(e) => handleInputChange('systemInfo', 'department', e.target.value)}
                  required
                >
                  <option value="">Zgjidhni departamentin...</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Pozita:</label>
                <input
                  type="text"
                  className="classic-textbox"
                  value={formData.systemInfo.position}
                  onChange={(e) => handleInputChange('systemInfo', 'position', e.target.value)}
                  placeholder="Pozita në punë"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Data e Fillimit:</label>
                <input
                  type="date"
                  className="classic-textbox"
                  value={formData.systemInfo.startDate}
                  onChange={(e) => handleInputChange('systemInfo', 'startDate', e.target.value)}
                />
              </div>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Lloji i Kontratës:</label>
                <select
                  className="classic-combobox"
                  value={formData.systemInfo.contractType}
                  onChange={(e) => handleInputChange('systemInfo', 'contractType', e.target.value)}
                >
                  <option value="FULL_TIME">Kohë e plotë</option>
                  <option value="PART_TIME">Kohë e pjesshme</option>
                  <option value="CONTRACT">Kontratë</option>
                  <option value="TEMPORARY">Përkohësisht</option>
                </select>
              </div>
            </div>

            <div className="classic-form-row">
              <label className="classic-checkbox">
                <input
                  type="checkbox"
                  checked={formData.systemInfo.isActive}
                  onChange={(e) => handleInputChange('systemInfo', 'isActive', e.target.checked)}
                />
                Llogaria aktive
              </label>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="classic-window-content">
            {Object.entries(permissionCategories).map(([category, permissions]) => (
              <div key={category} className="classic-window" style={{ marginBottom: '16px' }}>
                <div className="classic-window-header">
                  {category === 'cases' && '🔒 Lejet për Rastet'}
                  {category === 'documents' && '📄 Lejet për Dokumentet'}
                  {category === 'users' && '👥 Lejet për Përdoruesit'}
                  {category === 'reports' && '📊 Lejet për Raportet'}
                  {category === 'system' && '⚙️ Lejet e Sistemit'}
                </div>
                <div className="classic-window-content">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="classic-form-row">
                      <label className="classic-checkbox">
                        <input
                          type="checkbox"
                          checked={formData.permissions[category as keyof typeof formData.permissions].includes(permission.id)}
                          onChange={(e) => handlePermissionChange(category as keyof typeof formData.permissions, permission.id, e.target.checked)}
                        />
                        {permission.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        
      case 3:
        return (
          <div className="classic-window-content">
            <div className="classic-window" style={{ marginBottom: '16px' }}>
              <div className="classic-window-header">
                🔐 Cilësimet e Sigurisë
              </div>
              <div className="classic-window-content">
                <div className="classic-form-row">
                  <label className="classic-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.security.requireMFA}
                      onChange={(e) => handleInputChange('security', 'requireMFA', e.target.checked)}
                    />
                    Kërkoni autentifikim me dy faktorë (MFA)
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div className="classic-form-row" style={{ flex: 1 }}>
                    <label className="classic-label">Skadimi i Fjalëkalimit (ditë):</label>
                    <input
                      type="number"
                      className="classic-textbox"
                      value={formData.security.passwordExpiration}
                      onChange={(e) => handleInputChange('security', 'passwordExpiration', parseInt(e.target.value))}
                      min="30"
                      max="365"
                    />
                  </div>
                  <div className="classic-form-row" style={{ flex: 1 }}>
                    <label className="classic-label">Koha e Sesionit (minuta):</label>
                    <input
                      type="number"
                      className="classic-textbox"
                      value={formData.security.sessionTimeout}
                      onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                      min="30"
                      max="1440"
                    />
                  </div>
                </div>

                <div className="classic-form-row">
                  <label className="classic-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.security.allowRemoteAccess}
                      onChange={(e) => handleInputChange('security', 'allowRemoteAccess', e.target.checked)}
                    />
                    Lejoni qasjen nga distanca
                  </label>
                </div>

                <div className="classic-form-row">
                  <label className="classic-label">Niveli i Qasjes në të Dhëna:</label>
                  <select
                    className="classic-combobox"
                    value={formData.security.dataAccessLevel}
                    onChange={(e) => handleInputChange('security', 'dataAccessLevel', e.target.value)}
                  >
                    <option value="PUBLIC">Publike</option>
                    <option value="INTERNAL">Interne</option>
                    <option value="CONFIDENTIAL">Konfidenciale</option>
                    <option value="RESTRICTED">Të kufizuara</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="classic-window">
              <div className="classic-window-header">
                ✅ Përmbledhja e Përdoruesit
              </div>
              <div className="classic-window-content">
                <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Emri:</strong> {formData.personalInfo.firstName} {formData.personalInfo.lastName}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Email:</strong> {formData.personalInfo.email}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Përdoruesi:</strong> {formData.systemInfo.username}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Roli:</strong> {formData.systemInfo.role}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Departamenti:</strong> {formData.systemInfo.department}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Statusi:</strong> {formData.systemInfo.isActive ? 'Aktiv' : 'Joaktiv'}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>MFA:</strong> {formData.security.requireMFA ? 'I kërkuar' : 'Opsional'}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Lejet totale:</strong> {
                      Object.values(formData.permissions).reduce((acc, perms) => acc + perms.length, 0)
                    } leje të dhëna
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Hapi i panjohur</div>;
    }
  };

  return (
    <MainLayout>
      <div style={{ padding: '16px', backgroundColor: '#f0f0f0' }}>
        <div className="classic-window">
          <div className="classic-window-header">
            👤 Krijoni Përdorues të Ri - {steps[activeStep]}
            <button 
              className="classic-button" 
              onClick={() => navigate('/users')}
              style={{ marginLeft: 'auto', fontSize: '11px' }}
            >
              ❌ Anulo
            </button>
          </div>

          {/* Step Progress */}
          <div className="classic-window-content" style={{ padding: '8px 16px', borderBottom: '1px solid #808080' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {steps.map((step, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: index <= activeStep ? '#316ac5' : '#c0c0c0',
                      color: index <= activeStep ? 'white' : '#808080',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {index + 1}
                  </div>
                  <span style={{
                    marginLeft: '8px',
                    fontSize: '11px',
                    color: index <= activeStep ? '#000' : '#808080',
                    fontWeight: index === activeStep ? 'bold' : 'normal'
                  }}>
                    {step}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        height: '2px',
                        backgroundColor: index < activeStep ? '#316ac5' : '#c0c0c0',
                        margin: '0 16px'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="classic-window-content" style={{ padding: '16px', borderTop: '1px solid #808080' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="classic-button"
                onClick={handleBack}
                disabled={activeStep === 0}
                style={{ opacity: activeStep === 0 ? 0.5 : 1 }}
              >
                ⬅️ Mbrapa
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                {activeStep === steps.length - 1 ? (
                  <button
                    className="classic-button"
                    onClick={handleSubmit}
                    style={{ backgroundColor: '#28a745', color: 'white', fontWeight: 'bold' }}
                  >
                    ✅ Krijo Përdoruesin
                  </button>
                ) : (
                  <button
                    className="classic-button"
                    onClick={handleNext}
                  >
                    Përpara ➡️
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserCreate;
