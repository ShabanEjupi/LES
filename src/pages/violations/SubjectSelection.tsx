import React, { useState, useEffect } from 'react';
import './SubjectSelection.css';

interface Subject {
  id: string;
  name: string;
  type: 'INDIVIDUAL' | 'COMPANY' | 'ORGANIZATION';
  personalId?: string;
  fiscalNumber?: string;
  address: string;
  phone?: string;
  email?: string;
  active: boolean;
}

const SubjectSelection: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newSubject, setNewSubject] = useState<Partial<Subject>>({
    type: 'INDIVIDUAL',
    active: true
  });

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockSubjects: Subject[] = [
      {
        id: '1',
        name: 'Agron Ramadani',
        type: 'INDIVIDUAL',
        personalId: '1234567890',
        address: 'Prishtinë, Kosovë',
        phone: '+383 44 123 456',
        email: 'agron.ramadani@email.com',
        active: true
      },
      {
        id: '2',
        name: 'TechKos LLC',
        type: 'COMPANY',
        fiscalNumber: '811234567',
        address: 'Rruga Nëna Terezë 15, Prishtinë',
        phone: '+383 38 123 456',
        email: 'info@techkos.com',
        active: true
      },
      {
        id: '3',
        name: 'Blerta Krasniqi',
        type: 'INDIVIDUAL',
        personalId: '0987654321',
        address: 'Pejë, Kosovë',
        phone: '+383 39 123 456',
        email: 'blerta.krasniqi@email.com',
        active: true
      },
      {
        id: '4',
        name: 'Import Export Kosova',
        type: 'COMPANY',
        fiscalNumber: '811987654',
        address: 'Zona Industriale, Ferizaj',
        phone: '+383 29 123 456',
        email: 'contact@iekosova.com',
        active: true
      }
    ];
    setSubjects(mockSubjects);
    setFilteredSubjects(mockSubjects);
  }, []);

  useEffect(() => {
    let filtered = subjects;

    if (selectedType !== 'ALL') {
      filtered = filtered.filter(subject => subject.type === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.personalId?.includes(searchTerm) ||
        subject.fiscalNumber?.includes(searchTerm) ||
        subject.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSubjects(filtered);
  }, [subjects, searchTerm, selectedType]);

  const handleCreateNew = () => {
    if (!newSubject.name || !newSubject.address) {
      alert('Plotësoni fushat e detyrueshme!');
      return;
    }

    const subject: Subject = {
      id: Date.now().toString(),
      name: newSubject.name!,
      type: newSubject.type!,
      personalId: newSubject.personalId,
      fiscalNumber: newSubject.fiscalNumber,
      address: newSubject.address!,
      phone: newSubject.phone,
      email: newSubject.email,
      active: true
    };

    setSubjects([...subjects, subject]);
    setNewSubject({ type: 'INDIVIDUAL', active: true });
    setIsCreatingNew(false);
    alert('Subjekti u krijua me sukses!');
  };

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    // In real app, this would navigate to next step or save selection
    alert(`Subjekti "${subject.name}" u përzgjodh me sukses!`);
  };

  return (
    <div className="subject-selection">
      <div className="page-header">
        <h1>Përzgjedhja e Subjektit</h1>
        <p>Përzgjidhni subjektin kundërvajtës ose krijoni të ri</p>
      </div>

      <div className="selection-container">
        {/* Search and Filter Section */}
        <div className="search-section">
          <div className="search-controls">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Kërkoni subjekt (emri, numri personal, adresa...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-group">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="type-filter"
              >
                <option value="ALL">Të gjithë llojet</option>
                <option value="INDIVIDUAL">Personat Fizik</option>
                <option value="COMPANY">Kompanitë</option>
                <option value="ORGANIZATION">Organizatat</option>
              </select>
            </div>

            <button
              onClick={() => setIsCreatingNew(true)}
              className="btn btn-primary"
            >
              + Krijo të Ri
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="subjects-grid">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className={`subject-card ${selectedSubject?.id === subject.id ? 'selected' : ''}`}
              onClick={() => handleSelectSubject(subject)}
            >
              <div className="subject-header">
                <h3>{subject.name}</h3>
                <span className={`subject-type ${subject.type.toLowerCase()}`}>
                  {subject.type === 'INDIVIDUAL' ? 'Person Fizik' : 
                   subject.type === 'COMPANY' ? 'Kompani' : 'Organizatë'}
                </span>
              </div>
              
              <div className="subject-details">
                {subject.personalId && (
                  <p><strong>Nr. Personal:</strong> {subject.personalId}</p>
                )}
                {subject.fiscalNumber && (
                  <p><strong>Nr. Fiskal:</strong> {subject.fiscalNumber}</p>
                )}
                <p><strong>Adresa:</strong> {subject.address}</p>
                {subject.phone && (
                  <p><strong>Telefoni:</strong> {subject.phone}</p>
                )}
                {subject.email && (
                  <p><strong>Email:</strong> {subject.email}</p>
                )}
              </div>
              
              <div className="subject-actions">
                <button className="btn btn-outline">Përzgjidh</button>
              </div>
            </div>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="no-results">
            <p>Nuk u gjetën subjekte që përputhen me kriteret e kërkimit.</p>
            <button
              onClick={() => setIsCreatingNew(true)}
              className="btn btn-primary"
            >
              Krijo Subjekt të Ri
            </button>
          </div>
        )}
      </div>

      {/* Create New Subject Modal */}
      {isCreatingNew && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Krijo Subjekt të Ri</h2>
              <button
                onClick={() => setIsCreatingNew(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Lloji i Subjektit *</label>
                  <select
                    value={newSubject.type}
                    onChange={(e) => setNewSubject({...newSubject, type: e.target.value as Subject['type']})}
                  >
                    <option value="INDIVIDUAL">Person Fizik</option>
                    <option value="COMPANY">Kompani</option>
                    <option value="ORGANIZATION">Organizatë</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Emri/Emërtimi *</label>
                  <input
                    type="text"
                    value={newSubject.name || ''}
                    onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                    placeholder="Shkruani emrin ose emërtimin"
                  />
                </div>

                {newSubject.type === 'INDIVIDUAL' && (
                  <div className="form-group">
                    <label>Numri Personal</label>
                    <input
                      type="text"
                      value={newSubject.personalId || ''}
                      onChange={(e) => setNewSubject({...newSubject, personalId: e.target.value})}
                      placeholder="1234567890"
                    />
                  </div>
                )}

                {(newSubject.type === 'COMPANY' || newSubject.type === 'ORGANIZATION') && (
                  <div className="form-group">
                    <label>Numri Fiskal</label>
                    <input
                      type="text"
                      value={newSubject.fiscalNumber || ''}
                      onChange={(e) => setNewSubject({...newSubject, fiscalNumber: e.target.value})}
                      placeholder="811234567"
                    />
                  </div>
                )}

                <div className="form-group full-width">
                  <label>Adresa *</label>
                  <textarea
                    value={newSubject.address || ''}
                    onChange={(e) => setNewSubject({...newSubject, address: e.target.value})}
                    placeholder="Shkruani adresën e plotë"
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label>Telefoni</label>
                  <input
                    type="tel"
                    value={newSubject.phone || ''}
                    onChange={(e) => setNewSubject({...newSubject, phone: e.target.value})}
                    placeholder="+383 xx xxx xxx"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={newSubject.email || ''}
                    onChange={(e) => setNewSubject({...newSubject, email: e.target.value})}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                onClick={() => setIsCreatingNew(false)}
                className="btn btn-secondary"
              >
                Anulo
              </button>
              <button
                onClick={handleCreateNew}
                className="btn btn-primary"
              >
                Krijo Subjektin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectSelection;
