/**
 * USER DATA INPUT SYSTEM FOR KOSOVO CUSTOMS MODULES
 * System that allows users to input their own data making the app more dynamic
 * Republika e Kosovës - Doganat e Kosovës - 2025
 */

import React, { useState, useEffect } from 'react';
import { ClassicCard } from '../common/ClassicCard';
import { ClassicButton } from '../common/ClassicButton';
import type { KosovoModule, ModuleField } from '../../data/kosovoCostomeModules';
import '../../styles/classic-theme.css';
import './UserDataInputSystem.css';

interface UserDataEntry {
  id: string;
  moduleId: string;
  moduleName: string;
  data: Record<string, string | number | boolean | string[]>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

interface UserDataInputProps {
  selectedModule?: KosovoModule;
  onDataSaved?: (entry: UserDataEntry) => void;
}

const UserDataInputSystem: React.FC<UserDataInputProps> = ({ 
  selectedModule, 
  onDataSaved 
}) => {
  const [currentModule] = useState<KosovoModule | null>(selectedModule || null);
  const [formData, setFormData] = useState<Record<string, string | number | boolean | string[]>>({});
  const [savedEntries, setSavedEntries] = useState<UserDataEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState<'input' | 'view' | 'manage'>('input');

  // Load saved entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('kosovoCustomsUserData');
    if (saved) {
      try {
        setSavedEntries(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save entries to localStorage
  const saveToStorage = (entries: UserDataEntry[]) => {
    localStorage.setItem('kosovoCustomsUserData', JSON.stringify(entries));
  };

  // Handle form field changes
  const handleFieldChange = (fieldId: string, value: string | number | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentModule) return;

    setIsSubmitting(true);

    try {
      const newEntry: UserDataEntry = {
        id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        moduleId: currentModule.id,
        moduleName: currentModule.name,
        data: { ...formData },
        createdBy: 'current_user', // Would be actual user from auth context
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'submitted'
      };

      const updatedEntries = [...savedEntries, newEntry];
      setSavedEntries(updatedEntries);
      saveToStorage(updatedEntries);

      // Clear form
      setFormData({});
      
      // Notify parent component
      onDataSaved?.(newEntry);

      alert(`✅ Te dhenat u ruajten me sukses per modulin: ${currentModule.name}`);
    } catch (error) {
      console.error('Error saving data:', error);
      alert('❌ Gabim gjate ruajtjes se te dhenave');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render form field based on type
  const renderField = (field: ModuleField) => {
    const value = formData[field.id] || '';

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            id={field.id}
            value={String(value)}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="classic-input"
            required={field.required}
            placeholder={field.label}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            id={field.id}
            value={Number(value) || ''}
            onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value))}
            className="classic-input"
            required={field.required}
            placeholder={field.label}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            id={field.id}
            value={String(value)}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="classic-input"
            required={field.required}
          />
        );

      case 'select':
        return (
          <select
            id={field.id}
            value={String(value)}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="classic-select"
            required={field.required}
          >
            <option value="">Zgjidhni {field.label}</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <select
            id={field.id}
            multiple
            value={Array.isArray(value) ? value : []}
            onChange={(e) => {
              const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
              handleFieldChange(field.id, selectedValues);
            }}
            className="classic-select"
            required={field.required}
          >
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={String(value)}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="classic-textarea"
            required={field.required}
            placeholder={field.label}
            rows={4}
          />
        );

      case 'file':
        return (
          <input
            type="file"
            id={field.id}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // For demo purposes, just store file name
                handleFieldChange(field.id, file.name);
              }
            }}
            className="classic-input"
            required={field.required}
          />
        );

      case 'currency':
        return (
          <div className="currency-input">
            <input
              type="number"
              id={field.id}
              step="0.01"
              value={Number(value) || ''}
              onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value))}
              className="classic-input"
              required={field.required}
              placeholder={field.label}
            />
            <span className="currency-symbol">€</span>
          </div>
        );

      default:
        return (
          <input
            type="text"
            id={field.id}
            value={String(value)}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="classic-input"
            required={field.required}
            placeholder={field.label}
          />
        );
    }
  };

  // View saved entries
  const renderSavedEntries = () => (
    <div className="saved-entries">
      <h3>Te Dhenat e Ruajtura ({savedEntries.length})</h3>
      {savedEntries.length === 0 ? (
        <p>Nuk ka te dhena te ruajtura.</p>
      ) : (
        <div className="entries-grid">
          {savedEntries.map((entry) => (
            <ClassicCard key={entry.id} className="entry-card">
              <div className="entry-header">
                <h4>{entry.moduleName}</h4>
                <span className={`status-badge status-${entry.status}`}>
                  {entry.status}
                </span>
              </div>
              <div className="entry-details">
                <p><strong>ID:</strong> {entry.id}</p>
                <p><strong>Krijuar:</strong> {new Date(entry.createdAt).toLocaleDateString('sq-AL')}</p>
                <p><strong>Nga:</strong> {entry.createdBy}</p>
              </div>
              <div className="entry-data">
                <h5>Te Dhenat:</h5>
                <div className="data-preview">
                  {Object.entries(entry.data).map(([key, value]) => (
                    <div key={key} className="data-item">
                      <span className="data-key">{key}:</span>
                      <span className="data-value">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="entry-actions">
                <ClassicButton size="small" variant="default">
                  Shiko Detajet
                </ClassicButton>
                <ClassicButton size="small" variant="danger">
                  Fshi
                </ClassicButton>
              </div>
            </ClassicCard>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="user-data-input-system">
      <ClassicCard className="main-container">
        <div className="system-header">
          <h2>🇽🇰 Sistema e Futet e te Dhenave - Doganat e Kosoves</h2>
          <p>Sistemi per futjen e te dhenave nga perdoruesit - 2025</p>
        </div>

        <div className="navigation-tabs">
          <ClassicButton
            variant={activeSection === 'input' ? 'primary' : 'default'}
            onClick={() => setActiveSection('input')}
          >
            📝 Fut te Dhena
          </ClassicButton>
          <ClassicButton
            variant={activeSection === 'view' ? 'primary' : 'default'}
            onClick={() => setActiveSection('view')}
          >
            👁️ Shiko te Dhenat
          </ClassicButton>
          <ClassicButton
            variant={activeSection === 'manage' ? 'primary' : 'default'}
            onClick={() => setActiveSection('manage')}
          >
            ⚙️ Menaxho
          </ClassicButton>
        </div>

        {activeSection === 'input' && (
          <div className="data-input-section">
            {!currentModule ? (
              <div className="module-selection">
                <p>Ju lutem zgjidhni nje modul per te vazhduar me futjen e te dhenave.</p>
              </div>
            ) : (
              <div className="form-container">
                <div className="module-info">
                  <h3>{currentModule.icon} {currentModule.name}</h3>
                  <p>{currentModule.description}</p>
                  <div className="module-meta">
                    <span className="department">📍 {currentModule.department}</span>
                    <span className="priority">⚡ {currentModule.priority}</span>
                    <span className="role">👤 {currentModule.requiredRole}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="dynamic-form">
                  <div className="form-fields">
                    {currentModule.fields.map((field) => (
                      <div key={field.id} className="form-field">
                        <label htmlFor={field.id} className="field-label">
                          {field.label}
                          {field.required && <span className="required">*</span>}
                        </label>
                        {renderField(field)}
                      </div>
                    ))}
                  </div>

                  <div className="form-actions">
                    <ClassicButton 
                      type="submit" 
                      variant="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? '⏳ Duke ruajtur...' : '💾 Ruaj te Dhenat'}
                    </ClassicButton>
                    <ClassicButton 
                      type="button" 
                      variant="default"
                      onClick={() => setFormData({})}
                    >
                      🗑️ Pastro Formen
                    </ClassicButton>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {activeSection === 'view' && renderSavedEntries()}

        {activeSection === 'manage' && (
          <div className="management-section">
            <h3>Menaxhimi i te Dhenave</h3>
            <div className="stats">
              <div className="stat-card">
                <h4>Te Dhenat e Ruajtura</h4>
                <span className="stat-number">{savedEntries.length}</span>
              </div>
              <div className="stat-card">
                <h4>Te Dhenat e Aprovuara</h4>
                <span className="stat-number">
                  {savedEntries.filter(e => e.status === 'approved').length}
                </span>
              </div>
              <div className="stat-card">
                <h4>Ne Pritje</h4>
                <span className="stat-number">
                  {savedEntries.filter(e => e.status === 'submitted').length}
                </span>
              </div>
            </div>
            
            <div className="management-actions">
              <ClassicButton variant="primary">
                📊 Eksporto te Dhenat
              </ClassicButton>
              <ClassicButton variant="default">
                📥 Importo te Dhena
              </ClassicButton>
              <ClassicButton variant="danger">
                🗑️ Pastro te Gjitha
              </ClassicButton>
            </div>
          </div>
        )}
      </ClassicCard>
    </div>
  );
};

export default UserDataInputSystem;
