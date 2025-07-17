import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress: number;
}

const DocumentUpload: React.FC = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [caseNumber, setCaseNumber] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [confidentiality, setConfidentiality] = useState('INTERNAL');
  
  const categories = [
    'Formulare Zyrtare',
    'Lista Mallrave',
    'Dëshmi Fotografike',
    'Raportet Teknike',
    'Vendime Gjyqësore',
    'Korrespondenca',
    'Dokumente Ligjore',
    'Analiza dhe Studime'
  ];

  const cases = [
    '03.1.7-2025-4',
    '03.1.7-2025-3', 
    '03.1.7-2025-2',
    '03.1.7-2025-1'
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    const newFiles: UploadedFile[] = selectedFiles.map((file, index) => ({
      id: `file_${Date.now()}_${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    
    const newFiles: UploadedFile[] = droppedFiles.map((file, index) => ({
      id: `file_${Date.now()}_${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'xls':
      case 'xlsx': return '📊';
      case 'ppt':
      case 'pptx': return '📈';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return '🖼️';
      case 'zip':
      case 'rar':
      case '7z': return '🗜️';
      case 'txt': return '📃';
      default: return '📎';
    }
  };

  const simulateUpload = (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'uploading' as const } : f
    ));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: 'completed' as const, progress: 100 } : f
        ));
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      }
    }, 500);
  };

  const handleUploadAll = () => {
    if (!caseNumber || !category) {
      alert('Ju lutemi plotësoni fushat e detyrueshme (Numri i Rastit dhe Kategoria)');
      return;
    }

    files.forEach(file => {
      if (file.status === 'pending') {
        simulateUpload(file.id);
      }
    });
  };

  const handleFinish = () => {
    alert(`${files.filter(f => f.status === 'completed').length} dokument(e) u ngarkuan me sukses!`);
    navigate('/documents');
  };

  return (
    <MainLayout>
      <div style={{ padding: '16px', backgroundColor: '#f0f0f0' }}>
        <div className="classic-window">
          <div className="classic-window-header">
            📁 Ngarko Dokumente të Reja
            <button 
              className="classic-button" 
              onClick={() => navigate('/documents')}
              style={{ marginLeft: 'auto', fontSize: '11px' }}
            >
              ❌ Anulo
            </button>
          </div>
          
          {/* Document Information */}
          <div className="classic-window-content">
            <div className="classic-window" style={{ marginBottom: '16px' }}>
              <div className="classic-window-header">
                📋 Informacionet e Dokumentit
              </div>
              <div className="classic-window-content">
                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <div className="classic-form-row" style={{ flex: 1 }}>
                    <label className="classic-label">Numri i Rastit: *</label>
                    <select
                      className="classic-combobox"
                      value={caseNumber}
                      onChange={(e) => setCaseNumber(e.target.value)}
                      required
                    >
                      <option value="">Zgjidhni rastin...</option>
                      {cases.map(caseNum => (
                        <option key={caseNum} value={caseNum}>{caseNum}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="classic-form-row" style={{ flex: 1 }}>
                    <label className="classic-label">Kategoria: *</label>
                    <select
                      className="classic-combobox"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Zgjidhni kategorinë...</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="classic-form-row" style={{ flex: 1 }}>
                    <label className="classic-label">Niveli i Konfidencialitetit:</label>
                    <select
                      className="classic-combobox"
                      value={confidentiality}
                      onChange={(e) => setConfidentiality(e.target.value)}
                    >
                      <option value="PUBLIC">Publik</option>
                      <option value="INTERNAL">Intern</option>
                      <option value="CONFIDENTIAL">Konfidencial</option>
                      <option value="RESTRICTED">I Kufizuar</option>
                    </select>
                  </div>
                </div>
                
                <div className="classic-form-row">
                  <label className="classic-label">Përshkrimi:</label>
                  <textarea
                    className="classic-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Përshkrimi i shkurtër i dokumentit(eve)..."
                    rows={3}
                  />
                </div>
                
                <div className="classic-form-row">
                  <label className="classic-label">Etiketat (të ndara me presje):</label>
                  <input
                    type="text"
                    className="classic-textbox"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="etiketa1, etiketa2, etiketa3..."
                  />
                </div>
              </div>
            </div>

            {/* File Upload Area */}
            <div className="classic-window" style={{ marginBottom: '16px' }}>
              <div className="classic-window-header">
                📎 Zgjidhni Dokumentet
              </div>
              <div className="classic-window-content">
                <div
                  style={{
                    border: '2px dashed #808080',
                    padding: '40px',
                    textAlign: 'center',
                    backgroundColor: '#f8f8f8',
                    cursor: 'pointer'
                  }}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
                  <div style={{ fontSize: '14px', marginBottom: '8px', fontWeight: 'bold' }}>
                    Klikoni këtu ose tërhiqni skedarët për t'i ngarkuar
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Formatet e mbështetura: PDF, Word, Excel, PowerPoint, Imazhe, ZIP
                    <br />
                    Madhësia maksimale: 50MB për skedar
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.zip,.rar,.7z,.txt"
                  />
                </div>
                
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  <button 
                    className="classic-button"
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    📁 Zgjidh Skedarët
                  </button>
                  <button 
                    className="classic-button"
                    onClick={handleUploadAll}
                    disabled={files.length === 0 || !caseNumber || !category}
                    style={{ 
                      opacity: files.length === 0 || !caseNumber || !category ? 0.5 : 1,
                      backgroundColor: '#28a745',
                      color: 'white'
                    }}
                  >
                    ⬆️ Ngarko të Gjitha
                  </button>
                  <button 
                    className="classic-button"
                    onClick={() => setFiles([])}
                    disabled={files.length === 0}
                    style={{ opacity: files.length === 0 ? 0.5 : 1 }}
                  >
                    ❌ Pastro Listën
                  </button>
                </div>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="classic-window">
                <div className="classic-window-header">
                  📋 Skedarët e Zgjedhur ({files.length})
                </div>
                <div className="classic-window-content" style={{ padding: '0' }}>
                  <table className="classic-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '8px', width: '40px' }}>Tip</th>
                        <th style={{ padding: '8px' }}>Emri i Skedarit</th>
                        <th style={{ padding: '8px', width: '100px' }}>Madhësia</th>
                        <th style={{ padding: '8px', width: '150px' }}>Statusi</th>
                        <th style={{ padding: '8px', width: '200px' }}>Përparimi</th>
                        <th style={{ padding: '8px', width: '80px' }}>Veprime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((file) => (
                        <tr key={file.id}>
                          <td style={{ padding: '6px 8px', textAlign: 'center', fontSize: '16px' }}>
                            {getFileIcon(file.name)}
                          </td>
                          <td style={{ padding: '6px 8px', fontSize: '12px' }}>
                            {file.name}
                          </td>
                          <td style={{ padding: '6px 8px', fontSize: '12px' }}>
                            {formatFileSize(file.size)}
                          </td>
                          <td style={{ padding: '6px 8px', fontSize: '12px' }}>
                            <span className={`classic-status-badge ${
                              file.status === 'pending' ? 'status-info' :
                              file.status === 'uploading' ? 'status-pending' :
                              file.status === 'completed' ? 'status-success' :
                              'status-danger'
                            }`}>
                              {file.status === 'pending' && 'Në pritje'}
                              {file.status === 'uploading' && 'Duke ngarkuar'}
                              {file.status === 'completed' && 'Përfunduar'}
                              {file.status === 'error' && 'Gabim'}
                            </span>
                          </td>
                          <td style={{ padding: '6px 8px' }}>
                            <div style={{ 
                              width: '100%', 
                              height: '16px', 
                              backgroundColor: '#e0e0e0',
                              border: '1px inset #808080'
                            }}>
                              <div style={{
                                width: `${file.progress}%`,
                                height: '100%',
                                backgroundColor: file.status === 'completed' ? '#28a745' : '#007bff',
                                transition: 'width 0.3s ease'
                              }} />
                            </div>
                            <div style={{ fontSize: '10px', textAlign: 'center', marginTop: '2px' }}>
                              {Math.round(file.progress)}%
                            </div>
                          </td>
                          <td style={{ padding: '6px 8px' }}>
                            <button
                              className="classic-button"
                              onClick={() => removeFile(file.id)}
                              style={{ fontSize: '10px', padding: '2px 6px' }}
                              disabled={file.status === 'uploading'}
                            >
                              ❌
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Summary and Actions */}
            {files.length > 0 && (
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Totali: {files.length} skedar(ë) | 
                  Madhësia totale: {formatFileSize(files.reduce((acc, f) => acc + f.size, 0))} | 
                  Përfunduar: {files.filter(f => f.status === 'completed').length}
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="classic-button"
                    onClick={() => navigate('/documents')}
                  >
                    ❌ Anulo
                  </button>
                  
                  {files.some(f => f.status === 'completed') && (
                    <button
                      className="classic-button"
                      onClick={handleFinish}
                      style={{ backgroundColor: '#28a745', color: 'white', fontWeight: 'bold' }}
                    >
                      ✅ Përfundo
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentUpload;
