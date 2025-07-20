import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/classic-theme.css";

interface Vehicle {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
  year: number;
  color: string;
  vinNumber: string;
  engineNumber: string;
  registrationCountry: string;
  ownerName: string;
  ownerType: 'INDIVIDUAL' | 'COMPANY';
  ownerDocument: string;
  customsStatus: 'CLEARED' | 'PENDING' | 'SEIZED' | 'TRANSIT';
  lastCrossing: string;
  crossingPoint: string;
  associatedCases: string[];
  isBlacklisted: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const VehicleManagement: React.FC = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual service call
      const mockVehicles: Vehicle[] = [
        {
          id: 'VEH-001',
          plateNumber: '01-ABC-123',
          make: 'BMW',
          model: 'X5',
          year: 2020,
          color: 'Black',
          vinNumber: 'WBAXN31060PZ12345',
          engineNumber: 'N57D30TOP',
          registrationCountry: 'Kosovo',
          ownerName: 'Agim Kastrati',
          ownerType: 'INDIVIDUAL',
          ownerDocument: '123456789',
          customsStatus: 'CLEARED',
          lastCrossing: '2025-07-18T10:30:00Z',
          crossingPoint: 'Merdare',
          associatedCases: ['CASE-001'],
          isBlacklisted: false,
          notes: 'Regular vehicle, no issues',
          createdAt: '2025-01-15T08:00:00Z',
          updatedAt: '2025-07-18T10:30:00Z'
        },
        {
          id: 'VEH-002',
          plateNumber: 'D-XY-9876',
          make: 'Mercedes-Benz',
          model: 'Sprinter',
          year: 2019,
          color: 'White',
          vinNumber: 'WDB9066241S123456',
          engineNumber: 'OM651DE22LA',
          registrationCountry: 'Germany',
          ownerName: 'Transport GmbH',
          ownerType: 'COMPANY',
          ownerDocument: 'DE123456789',
          customsStatus: 'PENDING',
          lastCrossing: '2025-07-19T14:15:00Z',
          crossingPoint: 'Dheu i Bardhë',
          associatedCases: ['CASE-002', 'CASE-003'],
          isBlacklisted: false,
          notes: 'Commercial transport, pending documentation review',
          createdAt: '2025-07-19T14:15:00Z',
          updatedAt: '2025-07-19T14:15:00Z'
        },
        {
          id: 'VEH-003',
          plateNumber: 'SK-123-XY',
          make: 'Volkswagen',
          model: 'Golf',
          year: 2018,
          color: 'Red',
          vinNumber: '3VWC57BU8JM123456',
          engineNumber: 'CJXB',
          registrationCountry: 'Slovakia',
          ownerName: 'Petar Novák',
          ownerType: 'INDIVIDUAL',
          ownerDocument: 'SK987654321',
          customsStatus: 'SEIZED',
          lastCrossing: '2025-07-17T16:45:00Z',
          crossingPoint: 'Jarinje',
          associatedCases: ['CASE-004'],
          isBlacklisted: true,
          notes: 'Vehicle seized for document irregularities',
          createdAt: '2025-07-17T16:45:00Z',
          updatedAt: '2025-07-17T18:30:00Z'
        },
        {
          id: 'VEH-004',
          plateNumber: 'TR-34-XYZ-56',
          make: 'Ford',
          model: 'Transit',
          year: 2021,
          color: 'Blue',
          vinNumber: 'WF0XXTTGXXC123456',
          engineNumber: 'DRFB',
          registrationCountry: 'Turkey',
          ownerName: 'Nakliyat A.Ş.',
          ownerType: 'COMPANY',
          ownerDocument: 'TR12345678901',
          customsStatus: 'TRANSIT',
          lastCrossing: '2025-07-19T09:20:00Z',
          crossingPoint: 'Merdare',
          associatedCases: [],
          isBlacklisted: false,
          notes: 'Transit cargo, no customs declaration required',
          createdAt: '2025-07-19T09:20:00Z',
          updatedAt: '2025-07-19T09:20:00Z'
        }
      ];
      
      setVehicles(mockVehicles);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.vinNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === '' || vehicle.customsStatus === filterStatus;
    const matchesCountry = filterCountry === '' || vehicle.registrationCountry === filterCountry;
    
    return matchesSearch && matchesStatus && matchesCountry;
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'CLEARED': return 'status-cleared';
      case 'PENDING': return 'status-pending';
      case 'SEIZED': return 'status-seized';
      case 'TRANSIT': return 'status-transit';
      default: return 'status-default';
    }
  };

  const handleSelectVehicle = (vehicleId: string) => {
    setSelectedVehicles(prev => 
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const handleSelectAll = () => {
    if (selectedVehicles.length === filteredVehicles.length) {
      setSelectedVehicles([]);
    } else {
      setSelectedVehicles(filteredVehicles.map(v => v.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on vehicles:`, selectedVehicles);
    // Implement bulk actions here
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Vehicle Management</h1>
        <p className="page-description">
          Comprehensive vehicle registry and tracking system for Kosovo Customs
        </p>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/vehicles/register')}
          >
            Register New Vehicle
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/vehicles/import')}
          >
            Import Vehicles
          </button>
        </div>
      </div>

      <div className="search-filters-container">
        <div className="search-row">
          <div className="search-group">
            <label htmlFor="search">Search Vehicles:</label>
            <input
              id="search"
              type="text"
              className="search-input"
              placeholder="Search by plate number, make, model, owner, or VIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label htmlFor="status-filter">Customs Status:</label>
            <select
              id="status-filter"
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="CLEARED">Cleared</option>
              <option value="PENDING">Pending</option>
              <option value="SEIZED">Seized</option>
              <option value="TRANSIT">Transit</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="country-filter">Registration Country:</label>
            <select
              id="country-filter"
              className="filter-select"
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
            >
              <option value="">All Countries</option>
              <option value="Kosovo">Kosovo</option>
              <option value="Germany">Germany</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Turkey">Turkey</option>
              <option value="Serbia">Serbia</option>
              <option value="Albania">Albania</option>
              <option value="North Macedonia">North Macedonia</option>
              <option value="Montenegro">Montenegro</option>
            </select>
          </div>

          <div className="filter-group">
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('');
                setFilterCountry('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="results-summary">
        <p>Showing {filteredVehicles.length} of {vehicles.length} vehicles</p>
        {selectedVehicles.length > 0 && (
          <div className="bulk-actions">
            <span>{selectedVehicles.length} vehicles selected</span>
            <button 
              className="btn btn-sm btn-primary"
              onClick={() => handleBulkAction('export')}
            >
              Export Selected
            </button>
            <button 
              className="btn btn-sm btn-warning"
              onClick={() => handleBulkAction('flag')}
            >
              Flag for Review
            </button>
            <button 
              className="btn btn-sm btn-danger"
              onClick={() => handleBulkAction('blacklist')}
            >
              Add to Blacklist
            </button>
          </div>
        )}
      </div>

      <div className="vehicles-container">
        {filteredVehicles.length === 0 ? (
          <div className="no-results">
            <p>No vehicles found matching your criteria.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/vehicles/register')}
            >
              Register First Vehicle
            </button>
          </div>
        ) : (
          <div className="vehicles-table-container">
            <table className="vehicles-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedVehicles.length === filteredVehicles.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Plate Number</th>
                  <th>Vehicle</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Country</th>
                  <th>Last Crossing</th>
                  <th>Cases</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className={vehicle.isBlacklisted ? 'blacklisted-row' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedVehicles.includes(vehicle.id)}
                        onChange={() => handleSelectVehicle(vehicle.id)}
                      />
                    </td>
                    <td className="plate-number">
                      <Link to={`/vehicles/${vehicle.id}`} className="vehicle-link">
                        {vehicle.plateNumber}
                      </Link>
                      {vehicle.isBlacklisted && (
                        <span className="blacklist-indicator" title="Blacklisted vehicle">⚠️</span>
                      )}
                    </td>
                    <td className="vehicle-info">
                      <div className="vehicle-details">
                        <span className="make-model">{vehicle.make} {vehicle.model}</span>
                        <span className="year-color">{vehicle.year} • {vehicle.color}</span>
                      </div>
                    </td>
                    <td className="owner-info">
                      <div className="owner-details">
                        <span className="owner-name">{vehicle.ownerName}</span>
                        <span className="owner-type">{vehicle.ownerType}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(vehicle.customsStatus)}`}>
                        {vehicle.customsStatus}
                      </span>
                    </td>
                    <td className="country">{vehicle.registrationCountry}</td>
                    <td className="last-crossing">
                      <div className="crossing-info">
                        <span className="crossing-point">{vehicle.crossingPoint}</span>
                        <span className="crossing-date">
                          {new Date(vehicle.lastCrossing).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="associated-cases">
                      {vehicle.associatedCases.length > 0 ? (
                        <div className="cases-list">
                          {vehicle.associatedCases.map((caseId, index) => (
                            <Link 
                              key={caseId} 
                              to={`/cases/${caseId}`}
                              className="case-link"
                            >
                              {caseId}
                              {index < vehicle.associatedCases.length - 1 && ', '}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <span className="no-cases">None</span>
                      )}
                    </td>
                    <td className="actions">
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                          title="View Details"
                        >
                          👁️
                        </button>
                        <button 
                          className="btn btn-sm btn-secondary"
                          onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
                          title="Edit Vehicle"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn btn-sm btn-warning"
                          onClick={() => navigate(`/vehicles/${vehicle.id}/history`)}
                          title="View History"
                        >
                          📋
                        </button>
                        {!vehicle.isBlacklisted && (
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => {/* Add to blacklist */}}
                            title="Add to Blacklist"
                          >
                            🚫
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="page-actions">
        <button 
          className="btn btn-secondary"
          onClick={() => window.print()}
        >
          Print List
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => {/* Export to Excel */}}
        >
          Export to Excel
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/vehicles/statistics')}
        >
          View Statistics
        </button>
      </div>
    </div>
  );
};

export default VehicleManagement;
