import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { ClassicCard } from '../common/ClassicCard';
import { ClassicButton } from '../common/ClassicButton';
import ModulesGrid from '../common/ModulesGrid';
// import { allKosovoModules } from '../../data/kosovoCostomeModules';
// import { allExtendedModules } from '../../data/extendedKosovoModules';
import type { KosovoModule, ModuleField } from '../../data/kosovoCostomeModules';
import '../../styles/classic-theme.css';

interface FormData {
  [key: string]: string | number | boolean | string[];
}

const DynamicModuleForm: React.FC = () => {
  const { state } = useAuth();
  const [selectedModule, setSelectedModule] = useState<KosovoModule | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModuleGrid, setShowModuleGrid] = useState(true);
  const [savedEntries, setSavedEntries] = useState<Array<{
    id: string;
    moduleId: string;
    moduleName: string;
    data: FormData;
    createdBy: string;
    createdAt: string;
    status: string;
  }>>([]);

  // Combine all modules for future use
  // const allModules = [...allKosovoModules, ...allExtendedModules];

  useEffect(() => {
    // Load saved entries from localStorage
    const saved = localStorage.getItem('savedEntries');
    if (saved) {
      setSavedEntries(JSON.parse(saved));
    }
  }, []);

  const handleModuleSelect = (module: KosovoModule) => {
    setSelectedModule(module);
    setShowModuleGrid(false);
    setFormData({});
    setErrors({});
  };

  const handleInputChange = (fieldName: string, value: string | number | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error for this field
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!selectedModule) return false;
    
    const newErrors: Record<string, string> = {};
    
    selectedModule.fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} është i detyrueshëm`;
      }
      
      if (field.validation && formData[field.name]) {
        const value = formData[field.name];
        const validation = field.validation;
        
        if (validation.pattern && typeof value === 'string') {
          const regex = new RegExp(validation.pattern);
          if (!regex.test(value)) {
            newErrors[field.name] = validation.message || 'Format i pavlefshëm';
          }
        }
        
        if (validation.min && typeof value === 'number' && value < validation.min) {
          newErrors[field.name] = `Vlera duhet të jetë të paktën ${validation.min}`;
        }
        
        if (validation.max && typeof value === 'number' && value > validation.max) {
          newErrors[field.name] = `Vlera duhet të jetë maksimumi ${validation.max}`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      // Create entry object
      const entry = {
        id: Date.now().toString(),
        moduleId: selectedModule?.id || '',
        moduleName: selectedModule?.name || '',
        data: formData,
        createdBy: state.user?.username || 'Unknown',
        createdAt: new Date().toISOString(),
        status: 'SUBMITTED'
      };
      
      // Save to localStorage (in real app, would save to database)
      const updatedEntries = [...savedEntries, entry];
      setSavedEntries(updatedEntries);
      localStorage.setItem('savedEntries', JSON.stringify(updatedEntries));
      
      // Reset form
      setFormData({});
      alert('Të dhënat u ruajtën me sukses!');
      
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Gabim gjatë ruajtjes së të dhënave');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: ModuleField) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <div key={field.id} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
              className={`classic-input ${error ? 'error' : ''}`}
              value={String(value)}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={`Shkruani ${field.label.toLowerCase()}`}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
        );
        
      case 'textarea':
        return (
          <div key={field.id} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <textarea
              className={`classic-textarea ${error ? 'error' : ''}`}
              value={String(value)}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={`Shkruani ${field.label.toLowerCase()}`}
              rows={4}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
        );
        
      case 'number':
      case 'currency':
        return (
          <div key={field.id} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type="number"
              className={`classic-input ${error ? 'error' : ''}`}
              value={Number(value)}
              onChange={(e) => handleInputChange(field.name, parseFloat(e.target.value) || 0)}
              placeholder={`Shkruani ${field.label.toLowerCase()}`}
              min={field.validation?.min}
              max={field.validation?.max}
            />
            {field.type === 'currency' && <span className="currency-symbol">€</span>}
            {error && <span className="error-message">{error}</span>}
          </div>
        );
        
      case 'date':
        return (
          <div key={field.id} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type="date"
              className={`classic-input ${error ? 'error' : ''}`}
              value={String(value)}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
        );
        
      case 'time':
        return (
          <div key={field.id} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type="time"
              className={`classic-input ${error ? 'error' : ''}`}
              value={String(value)}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
        );
        
      case 'select':
        return (
          <div key={field.id} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <select
              className={`classic-select ${error ? 'error' : ''}`}
              value={String(value)}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            >
              <option value="">Zgjidhni {field.label.toLowerCase()}</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            {error && <span className="error-message">{error}</span>}
          </div>
        );
        
      case 'multiselect':
        return (
          <div key={field.id} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <div className="multiselect-container">
              {field.options?.map((option, index) => (
                <label key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(value as string[])?.includes(option) || false}
                    onChange={(e) => {
                      const currentValues = (value as string[]) || [];
                      if (e.target.checked) {
                        handleInputChange(field.name, [...currentValues, option]);
                      } else {
                        handleInputChange(field.name, currentValues.filter(v => v !== option));
                      }
                    }}
                  />
                  <span className="checkbox-text">{option}</span>
                </label>
              ))}
            </div>
            {error && <span className="error-message">{error}</span>}
          </div>
        );
        
      case 'checkbox':
        return (
          <div key={field.id} className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={value as boolean || false}
                onChange={(e) => handleInputChange(field.name, e.target.checked)}
              />
              <span className="checkbox-text">
                {field.label}
                {field.required && <span className="required">*</span>}
              </span>
            </label>
            {error && <span className="error-message">{error}</span>}
          </div>
        );
        
      case 'file':
        return (
          <div key={field.id} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type="file"
              className={`classic-input ${error ? 'error' : ''}`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleInputChange(field.name, file.name);
                }
              }}
              multiple
            />
            {error && <span className="error-message">{error}</span>}
          </div>
        );
        
      default:
        return null;
    }
  };

  if (showModuleGrid) {
    return (
      <div className="dynamic-module-form">
        <div className="form-header">
          <h2>Hyrje e të Dhënave - Sistemi LES</h2>
          <p>Zgjidhni modulin për të cilin dëshironi të futni të dhëna</p>
        </div>
        
        <ModulesGrid onModuleSelect={handleModuleSelect} />
        
        {savedEntries.length > 0 && (
          <ClassicCard className="saved-entries">
            <h3>Të dhënat e ruajtura ({savedEntries.length})</h3>
            <div className="entries-list">
              {savedEntries.slice(-5).map((entry) => (
                <div key={entry.id} className="entry-item">
                  <span className="entry-module">{entry.moduleName}</span>
                  <span className="entry-date">{new Date(entry.createdAt).toLocaleDateString()}</span>
                  <span className="entry-user">{entry.createdBy}</span>
                </div>
              ))}
            </div>
          </ClassicCard>
        )}
      </div>
    );
  }

  return (
    <div className="dynamic-module-form">
      <div className="form-header">
        <ClassicButton 
          variant="default" 
          onClick={() => setShowModuleGrid(true)}
          size="small"
        >
          ← Kthehu te Moduli
        </ClassicButton>
        <h2>{selectedModule?.icon} {selectedModule?.name}</h2>
        <p>{selectedModule?.description}</p>
      </div>

      <ClassicCard className="form-container">
        <div className="module-info">
          <div className="info-row">
            <span><strong>Departamenti:</strong> {selectedModule?.department}</span>
            <span><strong>Prioriteti:</strong> {selectedModule?.priority}</span>
            <span><strong>Roli i Kërkuar:</strong> {selectedModule?.requiredRole}</span>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="form-fields">
            {selectedModule?.fields.map(field => renderField(field))}
          </div>

          <div className="form-actions">
            <ClassicButton
              type="button"
              variant="default"
              onClick={() => setFormData({})}
              disabled={loading}
            >
              Pastro Formularin
            </ClassicButton>
            <ClassicButton
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Duke ruajtur...' : 'Ruaj të Dhënat'}
            </ClassicButton>
          </div>
        </form>
      </ClassicCard>
    </div>
  );
};

export default DynamicModuleForm;
