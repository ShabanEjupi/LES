import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/classic-theme.css';

interface AdvancedSearchCriteria {
  plateNumber: string;
  make: string;
  model: string;
  year: string;
  color: string;
  vinNumber: string;
  engineNumber: string;
  ownerName: string;
  ownerDocument: string;
  registrationCountry: string;
  customsStatus: string;
  crossingPoint: string;
  dateFrom: string;
  dateTo: string;
  isBlacklisted: boolean | null;
  hasAssociatedCases: boolean | null;
}

interface QuickSearchOption {
  label: string;
  value: string;
  type: 'plate' | 'vin' | 'owner' | 'case';
}

const VehicleSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState<'quick' | 'advanced'>('quick');
  const [quickSearch, setQuickSearch] = useState('');
  const [searchType, setSearchType] = useState<'plate' | 'vin' | 'owner' | 'case'>('plate');
  const [advancedCriteria, setAdvancedCriteria] = useState<AdvancedSearchCriteria>({
    plateNumber: '',
    make: '',
    model: '',
    year: '',
    color: '',
    vinNumber: '',
    engineNumber: '',
    ownerName: '',
    ownerDocument: '',
    registrationCountry: '',
    customsStatus: '',
    crossingPoint: '',
    dateFrom: '',
    dateTo: '',
    isBlacklisted: null,
    hasAssociatedCases: null
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<QuickSearchOption[]>([
    { label: '01-ABC-123', value: '01-ABC-123', type: 'plate' },
    { label: 'WBAXN31060PZ12345', value: 'WBAXN31060PZ12345', type: 'vin' },
    { label: 'Agim Kastrati', value: 'Agim Kastrati', type: 'owner' },
    { label: 'CASE-001', value: 'CASE-001', type: 'case' }
  ]);

  const handleQuickSearch = async () => {
    if (!quickSearch.trim()) return;

    setIsSearching(true);
    try {
      // Add to search history
      const newHistoryItem: QuickSearchOption = {
        label: quickSearch,
        value: quickSearch,
        type: searchType
      };
      
      setSearchHistory(prev => {
        const filtered = prev.filter(item => item.value !== quickSearch);
        return [newHistoryItem, ...filtered].slice(0, 10); // Keep last 10 searches
      });

      // Simulate search API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to vehicle management with search parameters
      navigate(`/vehicles?search=${encodeURIComponent(quickSearch)}&type=${searchType}`);
      
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAdvancedSearch = async () => {
    setIsSearching(true);
    try {
      // Build search query parameters
      const searchParams = new URLSearchParams();
      
      Object.entries(advancedCriteria).forEach(([key, value]) => {
        if (value !== '' && value !== null) {
          searchParams.append(key, value.toString());
        }
      });

      // Simulate advanced search API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to vehicle management with advanced search parameters
      navigate(`/vehicles?${searchParams.toString()}&mode=advanced`);
      
    } catch (error) {
      console.error('Advanced search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearAdvancedForm = () => {
    setAdvancedCriteria({
      plateNumber: '',
      make: '',
      model: '',
      year: '',
      color: '',
      vinNumber: '',
      engineNumber: '',
      ownerName: '',
      ownerDocument: '',
      registrationCountry: '',
      customsStatus: '',
      crossingPoint: '',
      dateFrom: '',
      dateTo: '',
      isBlacklisted: null,
      hasAssociatedCases: null
    });
  };

  const handleHistoryItemClick = (item: QuickSearchOption) => {
    setQuickSearch(item.value);
    setSearchType(item.type);
  };

  const getSearchTypeIcon = (type: string) => {
    switch (type) {
      case 'plate': return '🚗';
      case 'vin': return '🔢';
      case 'owner': return '👤';
      case 'case': return '📁';
      default: return '🔍';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Vehicle Search</h1>
        <p className="page-description">
          Search for vehicles in the Kosovo Customs database using various criteria
        </p>
      </div>

      <div className="search-mode-tabs">
        <button 
          className={`tab-button ${searchMode === 'quick' ? 'active' : ''}`}
          onClick={() => setSearchMode('quick')}
        >
          Quick Search
        </button>
        <button 
          className={`tab-button ${searchMode === 'advanced' ? 'active' : ''}`}
          onClick={() => setSearchMode('advanced')}
        >
          Advanced Search
        </button>
      </div>

      {searchMode === 'quick' ? (
        <div className="quick-search-container">
          <div className="search-form">
            <div className="search-type-selector">
              <label htmlFor="search-type">Search by:</label>
              <select
                id="search-type"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'plate' | 'vin' | 'owner' | 'case')}
                className="search-type-select"
              >
                <option value="plate">Plate Number</option>
                <option value="vin">VIN Number</option>
                <option value="owner">Owner Name</option>
                <option value="case">Case ID</option>
              </select>
            </div>

            <div className="search-input-container">
              <input
                type="text"
                className="quick-search-input"
                placeholder={`Enter ${searchType === 'plate' ? 'plate number' : 
                           searchType === 'vin' ? 'VIN number' :
                           searchType === 'owner' ? 'owner name' : 'case ID'}...`}
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuickSearch()}
              />
              <button 
                className="search-button"
                onClick={handleQuickSearch}
                disabled={isSearching || !quickSearch.trim()}
              >
                {isSearching ? (
                  <span className="spinner-small"></span>
                ) : (
                  '🔍 Search'
                )}
              </button>
            </div>
          </div>

          {searchHistory.length > 0 && (
            <div className="search-history">
              <h3>Recent Searches</h3>
              <div className="history-items">
                {searchHistory.map((item, index) => (
                  <button
                    key={index}
                    className="history-item"
                    onClick={() => handleHistoryItemClick(item)}
                  >
                    <span className="history-icon">{getSearchTypeIcon(item.type)}</span>
                    <span className="history-label">{item.label}</span>
                    <span className="history-type">{item.type}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="quick-search-examples">
            <h3>Search Examples</h3>
            <div className="examples-grid">
              <div className="example-item">
                <strong>Plate Number:</strong>
                <span>01-ABC-123, D-XY-9876, SK-123-XY</span>
              </div>
              <div className="example-item">
                <strong>VIN Number:</strong>
                <span>WBAXN31060PZ12345, WDB9066241S123456</span>
              </div>
              <div className="example-item">
                <strong>Owner Name:</strong>
                <span>Agim Kastrati, Transport GmbH</span>
              </div>
              <div className="example-item">
                <strong>Case ID:</strong>
                <span>CASE-001, VIO-2024-456</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="advanced-search-container">
          <form className="advanced-search-form" onSubmit={(e) => { e.preventDefault(); handleAdvancedSearch(); }}>
            <div className="form-sections">
              <div className="form-section">
                <h3>Vehicle Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="plateNumber">Plate Number:</label>
                    <input
                      id="plateNumber"
                      type="text"
                      value={advancedCriteria.plateNumber}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, plateNumber: e.target.value }))}
                      placeholder="e.g., 01-ABC-123"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="vinNumber">VIN Number:</label>
                    <input
                      id="vinNumber"
                      type="text"
                      value={advancedCriteria.vinNumber}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, vinNumber: e.target.value }))}
                      placeholder="17-character VIN"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="make">Make:</label>
                    <select
                      id="make"
                      value={advancedCriteria.make}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, make: e.target.value }))}
                    >
                      <option value="">Any Make</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Audi">Audi</option>
                      <option value="Ford">Ford</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="model">Model:</label>
                    <input
                      id="model"
                      type="text"
                      value={advancedCriteria.model}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, model: e.target.value }))}
                      placeholder="Vehicle model"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="year">Year:</label>
                    <input
                      id="year"
                      type="number"
                      min="1990"
                      max="2025"
                      value={advancedCriteria.year}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, year: e.target.value }))}
                      placeholder="e.g., 2020"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <select
                      id="color"
                      value={advancedCriteria.color}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, color: e.target.value }))}
                    >
                      <option value="">Any Color</option>
                      <option value="Black">Black</option>
                      <option value="White">White</option>
                      <option value="Red">Red</option>
                      <option value="Blue">Blue</option>
                      <option value="Silver">Silver</option>
                      <option value="Gray">Gray</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Owner Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ownerName">Owner Name:</label>
                    <input
                      id="ownerName"
                      type="text"
                      value={advancedCriteria.ownerName}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, ownerName: e.target.value }))}
                      placeholder="Owner or company name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ownerDocument">Owner Document:</label>
                    <input
                      id="ownerDocument"
                      type="text"
                      value={advancedCriteria.ownerDocument}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, ownerDocument: e.target.value }))}
                      placeholder="ID number or company registration"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Customs Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="registrationCountry">Registration Country:</label>
                    <select
                      id="registrationCountry"
                      value={advancedCriteria.registrationCountry}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, registrationCountry: e.target.value }))}
                    >
                      <option value="">Any Country</option>
                      <option value="Kosovo">Kosovo</option>
                      <option value="Germany">Germany</option>
                      <option value="Serbia">Serbia</option>
                      <option value="Albania">Albania</option>
                      <option value="North Macedonia">North Macedonia</option>
                      <option value="Montenegro">Montenegro</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="customsStatus">Customs Status:</label>
                    <select
                      id="customsStatus"
                      value={advancedCriteria.customsStatus}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, customsStatus: e.target.value }))}
                    >
                      <option value="">Any Status</option>
                      <option value="CLEARED">Cleared</option>
                      <option value="PENDING">Pending</option>
                      <option value="SEIZED">Seized</option>
                      <option value="TRANSIT">Transit</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="crossingPoint">Crossing Point:</label>
                    <select
                      id="crossingPoint"
                      value={advancedCriteria.crossingPoint}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, crossingPoint: e.target.value }))}
                    >
                      <option value="">Any Crossing</option>
                      <option value="Merdare">Merdare</option>
                      <option value="Dheu i Bardhë">Dheu i Bardhë</option>
                      <option value="Jarinje">Jarinje</option>
                      <option value="Bërnjak">Bërnjak</option>
                      <option value="Vermica">Vermica</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateFrom">Date From:</label>
                    <input
                      id="dateFrom"
                      type="date"
                      value={advancedCriteria.dateFrom}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, dateFrom: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateTo">Date To:</label>
                    <input
                      id="dateTo"
                      type="date"
                      value={advancedCriteria.dateTo}
                      onChange={(e) => setAdvancedCriteria(prev => ({ ...prev, dateTo: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Additional Filters</h3>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={advancedCriteria.isBlacklisted === true}
                      onChange={(e) => setAdvancedCriteria(prev => ({ 
                        ...prev, 
                        isBlacklisted: e.target.checked ? true : null 
                      }))}
                    />
                    Only blacklisted vehicles
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={advancedCriteria.hasAssociatedCases === true}
                      onChange={(e) => setAdvancedCriteria(prev => ({ 
                        ...prev, 
                        hasAssociatedCases: e.target.checked ? true : null 
                      }))}
                    />
                    Only vehicles with associated cases
                  </label>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button"
                className="btn btn-secondary"
                onClick={clearAdvancedForm}
              >
                Clear Form
              </button>
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <span className="spinner-small"></span>
                    Searching...
                  </>
                ) : (
                  'Search Vehicles'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="search-tips">
        <h3>Search Tips</h3>
        <ul>
          <li>Use partial matches for plate numbers (e.g., "ABC" will find all plates containing "ABC")</li>
          <li>VIN searches are exact match only</li>
          <li>Owner name searches are case-insensitive</li>
          <li>Date ranges help narrow down recent border crossings</li>
          <li>Use advanced search for complex queries with multiple criteria</li>
        </ul>
      </div>
    </div>
  );
};

export default VehicleSearch;
