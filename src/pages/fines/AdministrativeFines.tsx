import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/useAuth';

interface AdministrativeFine {
  id: string;
  fineNumber: string;
  relatedCaseId: string;
  subject: {
    name: string;
    idNumber: string;
    address: string;
    phone: string;
  };
  violation: {
    type: string;
    description: string;
    lawArticle: string;
  };
  fineAmount: number;
  currency: 'EUR' | 'USD';
  issueDate: string;
  dueDate: string;
  paymentDate?: string;
  status: 'ISSUED' | 'PAID' | 'OVERDUE' | 'CANCELLED' | 'REDUCED';
  issuedBy: string;
  approvedBy: string;
  paymentMethod?: 'CASH' | 'BANK_TRANSFER' | 'ONLINE';
  reductionReason?: string;
  reductionAmount?: number;
  notes: string;
}

const AdministrativeFines: React.FC = () => {
  const { state } = useAuth();
  const [fines, setFines] = useState<AdministrativeFine[]>([]);
  const [filters, setFilters] = useState({
    fineNumber: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    subject: '',
    minAmount: '',
    maxAmount: ''
  });
  const [selectedFine, setSelectedFine] = useState<AdministrativeFine | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    // Mock fines data
    const mockFines: AdministrativeFine[] = [
      {
        id: '1',
        fineNumber: 'GA-2024-001',
        relatedCaseId: 'KV-2024-001',
        subject: {
          name: 'ABC Company Ltd.',
          idNumber: '811234567',
          address: 'Rruga Zahir Pajaziti 10, Prishtinë',
          phone: '+383 44 123 456'
        },
        violation: {
          type: 'Kontrabandë',
          description: 'Importim i mallrave pa deklarim të plotë',
          lawArticle: 'Neni 45, Ligji për Dogana'
        },
        fineAmount: 5000,
        currency: 'EUR',
        issueDate: '2024-07-15',
        dueDate: '2024-08-15',
        status: 'ISSUED',
        issuedBy: 'oficer',
        approvedBy: 'supervisor',
        notes: 'Gjoba e lëshuar për kontrabandë mallrash'
      },
      {
        id: '2',
        fineNumber: 'GA-2024-002',
        relatedCaseId: 'KV-2024-002',
        subject: {
          name: 'Agron Krasniqi',
          idNumber: '1234567890',
          address: 'Rruga UÇK 25, Prizren',
          phone: '+383 49 987 654'
        },
        violation: {
          type: 'Gabim deklarimi',
          description: 'Deklarim i gabuar i vlerës së mallrave',
          lawArticle: 'Neni 32, Ligji për Dogana'
        },
        fineAmount: 1500,
        currency: 'EUR',
        issueDate: '2024-07-10',
        dueDate: '2024-08-10',
        paymentDate: '2024-07-18',
        status: 'PAID',
        issuedBy: 'supervisor',
        approvedBy: 'admin',
        paymentMethod: 'BANK_TRANSFER',
        notes: 'Gjoba u pagua në kohë'
      },
      {
        id: '3',
        fineNumber: 'GA-2024-003',
        relatedCaseId: 'KV-2024-003',
        subject: {
          name: 'XYZ Transport',
          idNumber: '700123456',
          address: 'Rruga Deshmoret e Kombit 15, Gjilan',
          phone: '+383 44 555 777'
        },
        violation: {
          type: 'Dokumenta të falsifikuara',
          description: 'Përdorim i certifikatave të falsifikuara',
          lawArticle: 'Neni 67, Ligji për Dogana'
        },
        fineAmount: 8000,
        currency: 'EUR',
        issueDate: '2024-06-20',
        dueDate: '2024-07-20',
        status: 'OVERDUE',
        issuedBy: 'admin',
        approvedBy: 'admin',
        notes: 'Gjoba e vonuar - në proces ekzekutimi'
      }
    ];

    setFines(mockFines);
  }, []);

  const getFilteredFines = () => {
    let filtered = fines;

    // Apply role-based filtering
    const userRole = state.user?.role?.name;
    if (userRole === 'officer') {
      // Officers see only fines they issued
      filtered = filtered.filter(fine => fine.issuedBy === state.user?.username);
    }

    // Apply search filters
    if (filters.fineNumber) {
      filtered = filtered.filter(fine => 
        fine.fineNumber.toLowerCase().includes(filters.fineNumber.toLowerCase())
      );
    }
    if (filters.status) {
      filtered = filtered.filter(fine => fine.status === filters.status);
    }
    if (filters.subject) {
      filtered = filtered.filter(fine => 
        fine.subject.name.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }
    if (filters.minAmount) {
      filtered = filtered.filter(fine => fine.fineAmount >= parseFloat(filters.minAmount));
    }
    if (filters.maxAmount) {
      filtered = filtered.filter(fine => fine.fineAmount <= parseFloat(filters.maxAmount));
    }
    if (filters.dateFrom) {
      filtered = filtered.filter(fine => fine.issueDate >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(fine => fine.issueDate <= filters.dateTo);
    }

    return filtered;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return '#28a745';
      case 'ISSUED': return '#007bff';
      case 'OVERDUE': return '#dc3545';
      case 'CANCELLED': return '#6c757d';
      case 'REDUCED': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PAID': return 'E paguar';
      case 'ISSUED': return 'E lëshuar';
      case 'OVERDUE': return 'E vonuar';
      case 'CANCELLED': return 'E anuluar';
      case 'REDUCED': return 'E reduktuar';
      default: return status;
    }
  };

  const handleCreateFine = () => {
    // TODO: Implement fine creation modal
    console.log('Create fine functionality to be implemented');
  };

  const handlePayment = (fine: AdministrativeFine) => {
    setSelectedFine(fine);
    setShowPaymentModal(true);
  };

  const handlePrintFine = (fine: AdministrativeFine) => {
    // Generate PDF fine document
    console.log('Printing fine:', fine.fineNumber);
    alert(`Duke printuar gjobën: ${fine.fineNumber}`);
  };

  const calculateTotalAmount = (fine: AdministrativeFine) => {
    return fine.fineAmount - (fine.reductionAmount || 0);
  };

  const filteredFines = getFilteredFines();

  return (
    <div className="classic-window" style={{ margin: '20px', maxWidth: '100%' }}>
      <div className="classic-window-header">
        💰 Menaxhimi i Gjobave Administrative
      </div>

      <div className="classic-window-content">
        {/* Header Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px',
          padding: '12px',
          background: '#f0f0f0',
          border: '1px inset #c0c0c0'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
            💰 Gjithsej: {filteredFines.length} gjoba | 
            Vlera totale: {filteredFines.reduce((sum, fine) => sum + calculateTotalAmount(fine), 0).toLocaleString()} EUR
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="classic-button classic-button-primary"
              onClick={handleCreateFine}
              style={{ fontSize: '11px' }}
            >
              ➕ Krijo Gjobë
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📊 Raporte
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📤 Eksporto
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ 
          background: '#f8f8f8', 
          border: '1px inset #c0c0c0', 
          padding: '16px', 
          marginBottom: '16px' 
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Numri i Gjobës:</label>
              <input
                type="text"
                className="classic-textbox"
                value={filters.fineNumber}
                onChange={(e) => setFilters({...filters, fineNumber: e.target.value})}
                placeholder="GA-2024-001"
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Statusi:</label>
              <select
                className="classic-dropdown"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">Të gjitha</option>
                <option value="ISSUED">E lëshuar</option>
                <option value="PAID">E paguar</option>
                <option value="OVERDUE">E vonuar</option>
                <option value="CANCELLED">E anuluar</option>
                <option value="REDUCED">E reduktuar</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Subjekti:</label>
              <input
                type="text"
                className="classic-textbox"
                value={filters.subject}
                onChange={(e) => setFilters({...filters, subject: e.target.value})}
                placeholder="Emri i subjektit..."
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Vlera nga (EUR):</label>
              <input
                type="number"
                className="classic-textbox"
                value={filters.minAmount}
                onChange={(e) => setFilters({...filters, minAmount: e.target.value})}
                placeholder="0"
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Vlera deri (EUR):</label>
              <input
                type="number"
                className="classic-textbox"
                value={filters.maxAmount}
                onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}
                placeholder="999999"
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Nga Data:</label>
              <input
                type="date"
                className="classic-textbox"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Deri Data:</label>
              <input
                type="date"
                className="classic-textbox"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                style={{ fontSize: '11px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              🔍 Kërko
            </button>
            <button 
              className="classic-button"
              onClick={() => setFilters({
                fineNumber: '', status: '', dateFrom: '', dateTo: '',
                subject: '', minAmount: '', maxAmount: ''
              })}
              style={{ fontSize: '11px' }}
            >
              🗑️ Pastro
            </button>
          </div>
        </div>

        {/* Fines Table */}
        <div style={{ 
          border: '1px inset #c0c0c0', 
          background: 'white',
          maxHeight: '500px',
          overflow: 'auto'
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '11px'
          }}>
            <thead style={{ 
              background: '#c0c0c0', 
              position: 'sticky', 
              top: 0 
            }}>
              <tr>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Nr. Gjobës</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Subjekti</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Kundervajtja</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Vlera (EUR)</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Data e Lëshimit</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Afati</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Statusi</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Veprimet</th>
              </tr>
            </thead>
            <tbody>
              {filteredFines.map((fine, index) => (
                <tr 
                  key={fine.id}
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8',
                    cursor: 'pointer'
                  }}
                  onDoubleClick={() => setSelectedFine(fine)}
                >
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', fontWeight: 'bold' }}>
                    {fine.fineNumber}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    <div style={{ fontWeight: 'bold' }}>{fine.subject.name}</div>
                    <div style={{ fontSize: '10px', color: '#666' }}>{fine.subject.idNumber}</div>
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    <div>{fine.violation.type}</div>
                    <div style={{ fontSize: '10px', color: '#666' }}>
                      {fine.violation.description.substring(0, 30)}...
                    </div>
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0', textAlign: 'right', fontWeight: 'bold' }}>
                    {calculateTotalAmount(fine).toLocaleString()} {fine.currency}
                    {fine.reductionAmount && (
                      <div style={{ fontSize: '10px', color: '#dc3545', textDecoration: 'line-through' }}>
                        {fine.fineAmount.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    {fine.issueDate}
                  </td>
                  <td style={{ 
                    padding: '6px', 
                    border: '1px solid #c0c0c0',
                    color: new Date(fine.dueDate) < new Date() && fine.status !== 'PAID' ? '#dc3545' : 'inherit'
                  }}>
                    {fine.dueDate}
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: getStatusColor(fine.status),
                      color: 'white',
                      fontSize: '10px'
                    }}>
                      {getStatusText(fine.status)}
                    </span>
                  </td>
                  <td style={{ padding: '6px', border: '1px solid #c0c0c0' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button 
                        className="classic-button"
                        onClick={() => setSelectedFine(fine)}
                        style={{ fontSize: '10px', padding: '2px 6px' }}
                        title="Shiko detajet"
                      >
                        👁️
                      </button>
                      <button 
                        className="classic-button"
                        onClick={() => handlePrintFine(fine)}
                        style={{ fontSize: '10px', padding: '2px 6px' }}
                        title="Printo gjobën"
                      >
                        🖨️
                      </button>
                      {fine.status === 'ISSUED' && (
                        <button 
                          className="classic-button"
                          onClick={() => handlePayment(fine)}
                          style={{ fontSize: '10px', padding: '2px 6px' }}
                          title="Regjistro pagesën"
                        >
                          💰
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFines.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666',
            fontSize: '12px'
          }}>
            ℹ️ Nuk ka gjoba të gjetur sipas kritereve të kërkimit.
          </div>
        )}

        {/* Statistics */}
        <div style={{ 
          background: '#f0f0f0', 
          border: '1px inset #c0c0c0', 
          padding: '12px', 
          marginTop: '16px',
          fontSize: '11px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <strong>📊 Statistika:</strong><br />
            Gjithsej gjoba: {filteredFines.length}<br />
            Vlera totale: {filteredFines.reduce((sum, fine) => sum + calculateTotalAmount(fine), 0).toLocaleString()} EUR
          </div>
          <div>
            <strong>💰 Statusi i pagesave:</strong><br />
            E paguar: {filteredFines.filter(f => f.status === 'PAID').length}<br />
            E lëshuar: {filteredFines.filter(f => f.status === 'ISSUED').length}<br />
            E vonuar: {filteredFines.filter(f => f.status === 'OVERDUE').length}
          </div>
          <div>
            <strong>👤 Qasja juaj:</strong><br />
            Roli: {state.user?.role?.name}<br />
            Departamenti: {state.user?.department}
          </div>
        </div>

        {/* Detail Modal */}
        {selectedFine && !showPaymentModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div className="classic-window" style={{ 
              width: '90%', 
              maxWidth: '700px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <div className="classic-window-header">
                💰 Detajet e Gjobës Administrative - {selectedFine.fineNumber}
              </div>
              <div className="classic-window-content">
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  {/* Subject Information */}
                  <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '12px' }}>👤 Informata për Subjektin:</h4>
                    <div style={{ fontSize: '11px' }}>
                      <div><strong>Emri:</strong> {selectedFine.subject.name}</div>
                      <div><strong>ID Numri:</strong> {selectedFine.subject.idNumber}</div>
                      <div><strong>Adresa:</strong> {selectedFine.subject.address}</div>
                      <div><strong>Telefoni:</strong> {selectedFine.subject.phone}</div>
                    </div>
                  </div>

                  {/* Violation Information */}
                  <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '12px' }}>⚠️ Informata për Kundervajtjen:</h4>
                    <div style={{ fontSize: '11px' }}>
                      <div><strong>Lloji:</strong> {selectedFine.violation.type}</div>
                      <div><strong>Përshkrimi:</strong> {selectedFine.violation.description}</div>
                      <div><strong>Neni ligjor:</strong> {selectedFine.violation.lawArticle}</div>
                      <div><strong>Rasti i lidhur:</strong> {selectedFine.relatedCaseId}</div>
                    </div>
                  </div>
                </div>

                {/* Fine Details */}
                <div style={{ 
                  background: '#f8f8f8', 
                  border: '1px inset #c0c0c0', 
                  padding: '12px',
                  marginBottom: '16px'
                }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '12px' }}>💰 Detajet e Gjobës:</h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '12px',
                    fontSize: '11px'
                  }}>
                    <div><strong>Vlera origjinale:</strong> {selectedFine.fineAmount.toLocaleString()} {selectedFine.currency}</div>
                    <div><strong>Reduktimi:</strong> {selectedFine.reductionAmount ? `${selectedFine.reductionAmount.toLocaleString()} ${selectedFine.currency}` : 'Asnjë'}</div>
                    <div><strong>Vlera finale:</strong> {calculateTotalAmount(selectedFine).toLocaleString()} {selectedFine.currency}</div>
                    <div><strong>Data e lëshimit:</strong> {selectedFine.issueDate}</div>
                    <div><strong>Afati i pagesës:</strong> {selectedFine.dueDate}</div>
                    <div><strong>Data e pagesës:</strong> {selectedFine.paymentDate || 'Nuk është paguar'}</div>
                    <div><strong>Lëshuar nga:</strong> {selectedFine.issuedBy}</div>
                    <div><strong>Miratuar nga:</strong> {selectedFine.approvedBy}</div>
                    <div><strong>Metoda e pagesës:</strong> {selectedFine.paymentMethod || 'N/A'}</div>
                  </div>
                  
                  <div style={{ marginTop: '12px' }}>
                    <strong>Statusi:</strong>
                    <span style={{ 
                      marginLeft: '8px',
                      padding: '4px 8px', 
                      borderRadius: '3px',
                      backgroundColor: getStatusColor(selectedFine.status),
                      color: 'white',
                      fontSize: '11px'
                    }}>
                      {getStatusText(selectedFine.status)}
                    </span>
                  </div>

                  {selectedFine.notes && (
                    <div style={{ marginTop: '12px' }}>
                      <strong>Shënime:</strong><br />
                      <div style={{ 
                        background: 'white', 
                        border: '1px inset #c0c0c0', 
                        padding: '8px',
                        marginTop: '4px',
                        fontSize: '11px'
                      }}>
                        {selectedFine.notes}
                      </div>
                    </div>
                  )}

                  {selectedFine.reductionReason && (
                    <div style={{ marginTop: '12px' }}>
                      <strong>Arsyeja e reduktimit:</strong><br />
                      <div style={{ 
                        background: 'white', 
                        border: '1px inset #c0c0c0', 
                        padding: '8px',
                        marginTop: '4px',
                        fontSize: '11px'
                      }}>
                        {selectedFine.reductionReason}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  gap: '8px',
                  borderTop: '1px solid #c0c0c0',
                  paddingTop: '16px'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="classic-button"
                      onClick={() => handlePrintFine(selectedFine)}
                      style={{ fontSize: '11px' }}
                    >
                      🖨️ Printo
                    </button>
                    {selectedFine.status === 'ISSUED' && (
                      <button 
                        className="classic-button classic-button-primary"
                        onClick={() => handlePayment(selectedFine)}
                        style={{ fontSize: '11px' }}
                      >
                        💰 Regjistro Pagesën
                      </button>
                    )}
                  </div>
                  
                  <button 
                    className="classic-button"
                    onClick={() => setSelectedFine(null)}
                    style={{ fontSize: '11px' }}
                  >
                    🚪 Mbyll
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedFine && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001
          }}>
            <div className="classic-window" style={{ 
              width: '90%', 
              maxWidth: '500px'
            }}>
              <div className="classic-window-header">
                💰 Regjistrimi i Pagesës - {selectedFine.fineNumber}
              </div>
              <div className="classic-window-content">
                <div style={{ marginBottom: '16px' }}>
                  <strong>Vlera për tu paguar:</strong> {calculateTotalAmount(selectedFine).toLocaleString()} {selectedFine.currency}
                </div>

                <div className="classic-form-row">
                  <label className="classic-label">📅 Data e Pagesës:</label>
                  <input
                    type="date"
                    className="classic-textbox"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    style={{ fontSize: '11px' }}
                  />
                </div>

                <div className="classic-form-row">
                  <label className="classic-label">💳 Metoda e Pagesës:</label>
                  <select className="classic-dropdown" style={{ fontSize: '11px' }}>
                    <option value="CASH">Cash - Para në dorë</option>
                    <option value="BANK_TRANSFER">Transfer bankar</option>
                    <option value="ONLINE">Pagesë online</option>
                  </select>
                </div>

                <div className="classic-form-row">
                  <label className="classic-label">📝 Shënime shtesë:</label>
                  <textarea
                    className="classic-textbox"
                    rows={3}
                    placeholder="Shënime për pagesën..."
                    style={{ fontSize: '11px' }}
                  />
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  gap: '8px',
                  marginTop: '20px',
                  borderTop: '1px solid #c0c0c0',
                  paddingTop: '16px'
                }}>
                  <button 
                    className="classic-button"
                    onClick={() => setShowPaymentModal(false)}
                    style={{ fontSize: '11px' }}
                  >
                    ❌ Anulo
                  </button>
                  <button 
                    className="classic-button classic-button-primary"
                    onClick={() => {
                      alert('Pagesa u regjistrua me sukses!');
                      setShowPaymentModal(false);
                      setSelectedFine(null);
                    }}
                    style={{ fontSize: '11px' }}
                  >
                    ✅ Regjistro Pagesën
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdministrativeFines;
