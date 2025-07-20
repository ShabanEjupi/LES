import React, { useState, useEffect } from 'react';
import type { CaseActivity, ActivityType } from '../../types';
import './ActivityCreation.css';

interface ActivityFormData {
  type: ActivityType;
  description: string;
  caseId?: string;
  attachments?: string[];
}

const ActivityCreation: React.FC = () => {
  const [formData, setFormData] = useState<ActivityFormData>({
    type: 'CREATED',
    description: ''
  });
  
  const [cases, setCases] = useState<Array<{id: string; caseNumber: string; description: string}>>([]);
  const [selectedCase, setSelectedCase] = useState<string>('');

  useEffect(() => {
    // Mock data for cases
    setCases([
      { id: '1', caseNumber: 'KV-2024-001', description: 'Import i paligjshëm i mallrave' },
      { id: '2', caseNumber: 'KV-2024-002', description: 'Deklaratë e rreme për vlera' },
      { id: '3', caseNumber: 'KV-2024-003', description: 'Kontrabandë cigaresh' }
    ]);
  }, []);

  const activityTypes: Array<{value: ActivityType; label: string; description: string}> = [
    { value: 'CREATED', label: 'Krijim', description: 'Krijimi i rastit të ri' },
    { value: 'UPDATED', label: 'Përditësim', description: 'Përditësimi i të dhënave' },
    { value: 'STATUS_CHANGED', label: 'Ndryshim Statusi', description: 'Ndryshimi i statusit të rastit' },
    { value: 'ASSIGNED', label: 'Caktim', description: 'Caktimi i rastit për oficer' },
    { value: 'COMMENT_ADDED', label: 'Koment', description: 'Shtimi i komentit' },
    { value: 'DOCUMENT_UPLOADED', label: 'Dokument', description: 'Ngarkimi i dokumentit' },
    { value: 'APPROVED', label: 'Miratim', description: 'Miratimi i rastit' },
    { value: 'REJECTED', label: 'Refuzim', description: 'Refuzimi i rastit' }
  ];

  const handleInputChange = (field: keyof ActivityFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description) {
      alert('Plotësoni përshkrimin e aktivitetit!');
      return;
    }

    try {
      const activity: Partial<CaseActivity> = {
        id: `ACT-${Date.now()}`,
        caseId: selectedCase || '',
        type: formData.type,
        description: formData.description,
        performedBy: 'current-user-id', // This would come from auth context
        timestamp: new Date(),
        attachments: formData.attachments
      };

      console.log('Creating activity:', activity);
      alert('Aktiviteti u krijua me sukses!');
      
      // Reset form
      setFormData({
        type: 'CREATED',
        description: ''
      });
      setSelectedCase('');
    } catch (error) {
      console.error('Error creating activity:', error);
      alert('Gabim gjatë krijimit të aktivitetit!');
    }
  };

  return (
    <div className="activity-creation">
      <div className="page-header">
        <h1>Krijimi i Aktivitetit</h1>
        <p>Krijoni aktivitet të ri për rast doganor</p>
      </div>

      <div className="creation-container">
        <form onSubmit={handleSubmit} className="activity-form">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Informata Bazë</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Lloji i Aktivitetit *</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value as ActivityType)}
                  required
                >
                  {activityTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {formData.type && (
                  <small className="help-text">
                    {activityTypes.find(t => t.value === formData.type)?.description}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>Rasti (Opsionale)</label>
                <select
                  value={selectedCase}
                  onChange={(e) => setSelectedCase(e.target.value)}
                >
                  <option value="">-- Zgjidhni rastin --</option>
                  {cases.map(caseItem => (
                    <option key={caseItem.id} value={caseItem.id}>
                      {caseItem.caseNumber} - {caseItem.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>Përshkrimi *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Përshkrimi i detajuar i aktivitetit"
                  rows={6}
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary">
              Anulo
            </button>
            <button type="submit" className="btn btn-primary">
              Krijo Aktivitetin
            </button>
          </div>
        </form>

        {/* Activity Preview */}
        <div className="activity-preview">
          <h3>Pamja Paraprake</h3>
          
          <div className="preview-card">
            <div className="preview-header">
              <h4>Aktivitet i ri</h4>
              <span className="activity-type-badge">
                {activityTypes.find(t => t.value === formData.type)?.label || 'Krijim'}
              </span>
            </div>
            
            <div className="preview-content">
              <p><strong>Lloji:</strong> {activityTypes.find(t => t.value === formData.type)?.label || 'Krijim'}</p>
              <p><strong>Përshkrimi:</strong> {formData.description || 'Nuk është dhënë përshkrim'}</p>
              
              {selectedCase && (
                <p><strong>Rasti:</strong> {cases.find(c => c.id === selectedCase)?.caseNumber}</p>
              )}
              
              <p><strong>Koha:</strong> {new Date().toLocaleDateString('sq-AL')} {new Date().toLocaleTimeString('sq-AL')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCreation;
