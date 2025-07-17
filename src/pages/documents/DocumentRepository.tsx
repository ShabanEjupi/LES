import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';

interface Document {
  id: string;
  fileName: string;
  title: string;
  type: 'PDF' | 'DOC' | 'DOCX' | 'XLS' | 'XLSX' | 'IMG' | 'TXT';
  category: 'Kërkesa' | 'Vendim' | 'Fletë Gjobe' | 'Dëshmi' | 'Raport' | 'Tjetër';
  size: number;
  uploadedBy: string;
  uploadedDate: string;
  lastModified: string;
  caseId?: string;
  status: 'Aktiv' | 'Arkivuar' | 'Fshirë';
  confidentiality: 'Publik' | 'I Brendshëm' | 'Konfidencial' | 'I Sekretë';
  version: number;
  description?: string;
  tags: string[];
}

const DocumentRepository: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [confidentialityFilter, setConfidentialityFilter] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Mock data
  useEffect(() => {
    const mockDocuments: Document[] = [
      {
        id: 'DOC001',
        fileName: 'Vendim_Gjobe_ABC_Import.pdf',
        title: 'Vendim për Gjobë Administrative - ABC Import',
        type: 'PDF',
        category: 'Vendim',
        size: 245760,
        uploadedBy: 'Agron Krasniqi',
        uploadedDate: '2024-01-15T10:30:00',
        lastModified: '2024-01-15T10:30:00',
        caseId: 'RAS-2024-001',
        status: 'Aktiv',
        confidentiality: 'I Brendshëm',
        version: 1,
        description: 'Vendim përfundimtar për gjobë administrative në vlerë 15,000 lekë',
        tags: ['gjobë', 'administrative', 'vendim', 'ABC Import']
      },
      {
        id: 'DOC002',
        fileName: 'Deshmi_Kontrabande_Cigaresh.docx',
        title: 'Dëshmi për Kontrabandë Cigaresh',
        type: 'DOCX',
        category: 'Dëshmi',
        size: 156840,
        uploadedBy: 'Mira Krasniqi',
        uploadedDate: '2024-01-18T14:15:00',
        lastModified: '2024-01-20T09:45:00',
        caseId: 'RAS-2024-001',
        status: 'Aktiv',
        confidentiality: 'Konfidencial',
        version: 2,
        description: 'Dëshmi e mbledhur gjatë hetimit për kontrabandë cigaresh',
        tags: ['kontrabandë', 'cigaresh', 'dëshmi', 'hetim']
      },
      {
        id: 'DOC003',
        fileName: 'Raport_Vleresimi_Mallrash.xlsx',
        title: 'Raport Vlerësimi të Mallrave',
        type: 'XLSX',
        category: 'Raport',
        size: 89320,
        uploadedBy: 'Besart Hoxha',
        uploadedDate: '2024-01-12T16:20:00',
        lastModified: '2024-01-12T16:20:00',
        status: 'Aktiv',
        confidentiality: 'I Brendshëm',
        version: 1,
        description: 'Raport detajuar për vlerësimin e mallrave të konfiskuara',
        tags: ['vlerësim', 'mallra', 'raport', 'konfiskuar']
      },
      {
        id: 'DOC004',
        fileName: 'Fotografi_Mallrash_Konfiskuar.jpg',
        title: 'Fotografi të Mallrave të Konfiskuara',
        type: 'IMG',
        category: 'Dëshmi',
        size: 2457600,
        uploadedBy: 'Fatjona Mullahi',
        uploadedDate: '2024-01-10T11:45:00',
        lastModified: '2024-01-10T11:45:00',
        caseId: 'RAS-2024-003',
        status: 'Aktiv',
        confidentiality: 'Konfidencial',
        version: 1,
        description: 'Fotografi dokumentuese të mallrave të konfiskuara',
        tags: ['fotografi', 'mallra', 'konfiskuar', 'dëshmi']
      }
    ];

    setTimeout(() => {
      setDocuments(mockDocuments);
      setFilteredDocuments(mockDocuments);
      setLoading(false);
    }, 800);
  }, []);

  // Filter documents
  useEffect(() => {
    let filtered = documents;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.fileName.toLowerCase().includes(searchLower) ||
        doc.title.toLowerCase().includes(searchLower) ||
        doc.uploadedBy.toLowerCase().includes(searchLower) ||
        doc.description?.toLowerCase().includes(searchLower) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(doc => doc.category === categoryFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter(doc => doc.type === typeFilter);
    }

    if (confidentialityFilter) {
      filtered = filtered.filter(doc => doc.confidentiality === confidentialityFilter);
    }

    setFilteredDocuments(filtered);
  }, [documents, searchTerm, categoryFilter, typeFilter, confidentialityFilter]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string): string => {
    switch (type) {
      case 'PDF': return '📄';
      case 'DOC':
      case 'DOCX': return '📝';
      case 'XLS':
      case 'XLSX': return '📊';
      case 'IMG': return '🖼️';
      case 'TXT': return '📄';
      default: return '📁';
    }
  };

  const getConfidentialityColor = (level: string): string => {
    switch (level) {
      case 'Publik': return '#28a745';
      case 'I Brendshëm': return '#17a2b8';
      case 'Konfidencial': return '#ffc107';
      case 'I Sekretë': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Kërkesa': return '#007bff';
      case 'Vendim': return '#28a745';
      case 'Fletë Gjobe': return '#dc3545';
      case 'Dëshmi': return '#ffc107';
      case 'Raport': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setTypeFilter('');
    setConfidentialityFilter('');
  };

  const handleUpload = () => {
    alert('Funksioni i ngarkimit të dokumenteve do të implementohet së shpejti.');
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="classic-window">
          <div className="classic-titlebar">
            <div className="classic-titlebar-text">
              <span className="classic-titlebar-icon">⏳</span>
              Duke ngarkuar dokumentet...
            </div>
          </div>
          <div className="classic-window-content" style={{ textAlign: 'center', padding: '50px' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Po ngarkohen dokumentet e arkivit...
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="classic-window">
        <div className="classic-titlebar">
          <div className="classic-titlebar-text">
            <span className="classic-titlebar-icon">📚</span>
            Arkivi i Dokumenteve - {filteredDocuments.length} dokumente
          </div>
          <div className="classic-titlebar-controls">
            <button 
              className="classic-button classic-button-primary"
              onClick={handleUpload}
              style={{ marginRight: '8px' }}
            >
              📤 Ngarko
            </button>
            <button 
              className="classic-button"
              onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
              style={{ marginRight: '8px' }}
            >
              {viewMode === 'list' ? '⊞' : '☰'} {viewMode === 'list' ? 'Grid' : 'Listë'}
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="classic-window-content" style={{ borderBottom: '1px solid #808080' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'end', flexWrap: 'wrap' }}>
            <div className="classic-form-row" style={{ flex: '2', minWidth: '200px' }}>
              <label className="classic-label">🔍 Kërko:</label>
              <input
                type="text"
                className="classic-textbox"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Emri, titulli, përshkrimi..."
              />
            </div>
            
            <div className="classic-form-row" style={{ flex: '1', minWidth: '120px' }}>
              <label className="classic-label">Kategoria:</label>
              <select
                className="classic-dropdown"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Të gjitha</option>
                <option value="Kërkesa">Kërkesa</option>
                <option value="Vendim">Vendim</option>
                <option value="Fletë Gjobe">Fletë Gjobe</option>
                <option value="Dëshmi">Dëshmi</option>
                <option value="Raport">Raport</option>
                <option value="Tjetër">Tjetër</option>
              </select>
            </div>
            
            <div className="classic-form-row" style={{ flex: '1', minWidth: '100px' }}>
              <label className="classic-label">Lloji:</label>
              <select
                className="classic-dropdown"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">Të gjitha</option>
                <option value="PDF">PDF</option>
                <option value="DOC">DOC</option>
                <option value="DOCX">DOCX</option>
                <option value="XLS">XLS</option>
                <option value="XLSX">XLSX</option>
                <option value="IMG">Imazh</option>
                <option value="TXT">Tekst</option>
              </select>
            </div>
            
            <div className="classic-form-row" style={{ flex: '1', minWidth: '120px' }}>
              <label className="classic-label">Konfidencialiteti:</label>
              <select
                className="classic-dropdown"
                value={confidentialityFilter}
                onChange={(e) => setConfidentialityFilter(e.target.value)}
              >
                <option value="">Të gjitha</option>
                <option value="Publik">Publik</option>
                <option value="I Brendshëm">I Brendshëm</option>
                <option value="Konfidencial">Konfidencial</option>
                <option value="I Sekretë">I Sekretë</option>
              </select>
            </div>
            
            <button 
              className="classic-button"
              onClick={clearFilters}
              style={{ marginBottom: '20px' }}
            >
              🗑️ Pastro
            </button>
          </div>
        </div>

        {/* Documents Display */}
        <div className="classic-window-content">
          {viewMode === 'list' ? (
            <div className="classic-table-container">
              <table className="classic-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>Lloji</th>
                    <th style={{ minWidth: '200px' }}>Titulli</th>
                    <th style={{ width: '100px' }}>Kategoria</th>
                    <th style={{ width: '80px' }}>Madhësia</th>
                    <th style={{ width: '120px' }}>Nga</th>
                    <th style={{ width: '100px' }}>Data</th>
                    <th style={{ width: '120px' }}>Konfidencialiteti</th>
                    <th style={{ width: '100px' }}>Veprimet</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((doc) => (
                    <tr 
                      key={doc.id}
                      className={selectedDocument === doc.id ? 'selected' : ''}
                      onClick={() => setSelectedDocument(doc.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ textAlign: 'center' }}>
                        <span title={doc.type}>
                          {getFileIcon(doc.type)}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '11px', fontWeight: 'bold' }}>
                          {doc.title}
                        </div>
                        <div style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>
                          {doc.fileName}
                        </div>
                        {doc.caseId && (
                          <div style={{ fontSize: '9px', color: '#007bff', marginTop: '2px' }}>
                            Rasti: {doc.caseId}
                          </div>
                        )}
                      </td>
                      <td>
                        <span 
                          className="classic-badge"
                          style={{ 
                            backgroundColor: getCategoryColor(doc.category),
                            color: '#fff',
                            fontSize: '9px'
                          }}
                        >
                          {doc.category}
                        </span>
                      </td>
                      <td style={{ fontSize: '10px' }}>
                        {formatFileSize(doc.size)}
                      </td>
                      <td style={{ fontSize: '10px' }}>
                        {doc.uploadedBy}
                      </td>
                      <td style={{ fontSize: '10px' }}>
                        {new Date(doc.uploadedDate).toLocaleDateString('sq-AL')}
                      </td>
                      <td>
                        <span 
                          className="classic-badge"
                          style={{ 
                            backgroundColor: getConfidentialityColor(doc.confidentiality),
                            color: doc.confidentiality === 'Konfidencial' ? '#000' : '#fff',
                            fontSize: '9px'
                          }}
                        >
                          {doc.confidentiality}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          <button 
                            className="classic-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`/documents/${doc.id}/view`, '_blank');
                            }}
                            style={{ fontSize: '10px', padding: '2px 4px' }}
                            title="Shiko"
                          >
                            👁️
                          </button>
                          <button 
                            className="classic-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`/documents/${doc.id}/download`, '_blank');
                            }}
                            style={{ fontSize: '10px', padding: '2px 4px' }}
                            title="Shkarko"
                          >
                            💾
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
              gap: '16px',
              padding: '16px'
            }}>
              {filteredDocuments.map((doc) => (
                <div 
                  key={doc.id}
                  className="classic-window"
                  style={{ 
                    cursor: 'pointer',
                    border: selectedDocument === doc.id ? '2px solid #316ac5' : '1px solid #808080'
                  }}
                  onClick={() => setSelectedDocument(doc.id)}
                >
                  <div className="classic-window-header" style={{ fontSize: '11px' }}>
                    {getFileIcon(doc.type)} {doc.type}
                  </div>
                  <div className="classic-window-content" style={{ padding: '8px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>
                      {doc.title}
                    </div>
                    <div style={{ fontSize: '9px', color: '#666', marginBottom: '8px' }}>
                      {doc.fileName}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <span 
                        className="classic-badge"
                        style={{ 
                          backgroundColor: getCategoryColor(doc.category),
                          color: '#fff',
                          fontSize: '8px',
                          marginRight: '4px'
                        }}
                      >
                        {doc.category}
                      </span>
                      <span 
                        className="classic-badge"
                        style={{ 
                          backgroundColor: getConfidentialityColor(doc.confidentiality),
                          color: doc.confidentiality === 'Konfidencial' ? '#000' : '#fff',
                          fontSize: '8px'
                        }}
                      >
                        {doc.confidentiality}
                      </span>
                    </div>
                    <div style={{ fontSize: '9px', color: '#666' }}>
                      Madhësia: {formatFileSize(doc.size)}
                    </div>
                    <div style={{ fontSize: '9px', color: '#666' }}>
                      Nga: {doc.uploadedBy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredDocuments.length === 0 && (
            <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📂</div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                Nuk u gjetën dokumente që përputhen me kriteret e kërkimit.
              </div>
              <button 
                className="classic-button classic-button-primary"
                onClick={clearFilters}
                style={{ marginTop: '16px', marginRight: '8px' }}
              >
                Pastro Filtrat
              </button>
              <button 
                className="classic-button"
                onClick={handleUpload}
                style={{ marginTop: '16px' }}
              >
                📤 Ngarko Dokument
              </button>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="classic-status-bar">
          <div className="classic-status-panel">📊 Gjithsej: {documents.length}</div>
          <div className="classic-status-panel">🔍 Të filtruara: {filteredDocuments.length}</div>
          <div className="classic-status-panel">📄 PDF: {documents.filter(d => d.type === 'PDF').length}</div>
          <div className="classic-status-panel">📝 DOC: {documents.filter(d => d.type === 'DOC' || d.type === 'DOCX').length}</div>
          <div className="classic-status-panel">🔒 Konfidenciale: {documents.filter(d => d.confidentiality === 'Konfidencial' || d.confidentiality === 'I Sekretë').length}</div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentRepository;
