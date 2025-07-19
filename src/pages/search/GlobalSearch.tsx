import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/classic-theme.css';

interface SearchCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  placeholder: string;
  searchType: string;
}

interface QuickSearchResult {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  relevanceScore: number;
}

const GlobalSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickResults, setQuickResults] = useState<QuickSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'BMW X5', 'CASE-2024-001', 'Agim Kastrati', 'Merdare crossing'
  ]);

  const searchCategories: SearchCategory[] = [
    {
      id: 'all',
      name: 'All Categories',
      icon: '🔍',
      description: 'Search across all modules and data types',
      placeholder: 'Search for anything...',
      searchType: 'global'
    },
    {
      id: 'vehicles',
      name: 'Vehicles',
      icon: '🚗',
      description: 'Search vehicles by plate, VIN, owner, or make/model',
      placeholder: 'Enter plate number, VIN, or vehicle details...',
      searchType: 'vehicle'
    },
    {
      id: 'cases',
      name: 'Cases',
      icon: '📁',
      description: 'Search cases by ID, type, status, or assigned officer',
      placeholder: 'Enter case ID or related information...',
      searchType: 'case'
    },
    {
      id: 'violations',
      name: 'Violations',
      icon: '⚠️',
      description: 'Search violations and administrative penalties',
      placeholder: 'Enter violation details or case number...',
      searchType: 'violation'
    },
    {
      id: 'people',
      name: 'People',
      icon: '👤',
      description: 'Search for persons, companies, and entities',
      placeholder: 'Enter name, ID number, or company details...',
      searchType: 'person'
    },
    {
      id: 'documents',
      name: 'Documents',
      icon: '📄',
      description: 'Search documents, permits, and certificates',
      placeholder: 'Enter document number or type...',
      searchType: 'document'
    },
    {
      id: 'crossings',
      name: 'Border Crossings',
      icon: '🚧',
      description: 'Search border crossing records and logs',
      placeholder: 'Enter crossing point, date, or vehicle info...',
      searchType: 'crossing'
    }
  ];

  useEffect(() => {
    if (searchQuery.length >= 2) {
      performQuickSearch();
    } else {
      setQuickResults([]);
      setShowResults(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory]); // performQuickSearch is stable callback, no need to include

  const performQuickSearch = useCallback(async () => {
    setIsSearching(true);
    try {
      // Simulate API search with delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock search results
      const mockResults: QuickSearchResult[] = [
        {
          id: 'VEH-001',
          type: 'Vehicle',
          title: '01-ABC-123',
          subtitle: 'BMW X5 2020',
          description: 'Registered to Agim Kastrati, last seen at Merdare crossing',
          url: '/vehicles/VEH-001',
          relevanceScore: 95
        },
        {
          id: 'CASE-001',
          type: 'Case',
          title: 'CASE-2024-001',
          subtitle: 'Import Documentation Review',
          description: 'Pending case assigned to Officer Smith, related to vehicle 01-ABC-123',
          url: '/cases/CASE-001',
          relevanceScore: 88
        },
        {
          id: 'PER-001',
          type: 'Person',
          title: 'Agim Kastrati',
          subtitle: 'Individual',
          description: 'ID: 123456789, multiple vehicle registrations, no violations',
          url: '/people/PER-001',
          relevanceScore: 82
        },
        {
          id: 'DOC-001',
          type: 'Document',
          title: 'Import Permit IP-2024-567',
          subtitle: 'Commercial Import License',
          description: 'Valid until 2024-12-31, issued for Transport GmbH',
          url: '/documents/DOC-001',
          relevanceScore: 76
        }
      ].filter(result => {
        if (selectedCategory === 'all') return true;
        return result.type.toLowerCase() === selectedCategory || 
               (selectedCategory === 'people' && result.type === 'Person') ||
               (selectedCategory === 'vehicles' && result.type === 'Vehicle');
      });

      setQuickResults(mockResults.slice(0, 6)); // Limit to 6 results
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, [selectedCategory]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(search => search !== searchQuery);
      return [searchQuery, ...filtered].slice(0, 8);
    });

    // Navigate to detailed search results
    navigate(`/search/results?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
  };

  const handleCategorySelect = (category: SearchCategory) => {
    setSelectedCategory(category.id);
    setSearchQuery('');
    setShowResults(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'vehicle': return '🚗';
      case 'case': return '📁';
      case 'person': return '👤';
      case 'document': return '📄';
      case 'violation': return '⚠️';
      case 'crossing': return '🚧';
      default: return '📋';
    }
  };

  const selectedCategoryData = searchCategories.find(cat => cat.id === selectedCategory) || searchCategories[0];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Global Search</h1>
        <p className="page-description">
          Search across all Kosovo Customs systems and databases
        </p>
      </div>

      <div className="search-categories">
        <h3>Search Categories</h3>
        <div className="categories-grid">
          {searchCategories.map(category => (
            <button
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(category)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-content">
                <h4>{category.name}</h4>
                <p>{category.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="search-container">
        <div className="search-form">
          <div className="selected-category">
            <span className="category-indicator">
              {selectedCategoryData.icon} {selectedCategoryData.name}
            </span>
          </div>
          
          <div className="search-input-container">
            <input
              type="text"
              className="global-search-input"
              placeholder={selectedCategoryData.placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              className="search-button"
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
            >
              {isSearching ? (
                <span className="spinner-small"></span>
              ) : (
                '🔍'
              )}
            </button>
          </div>
        </div>

        {showResults && quickResults.length > 0 && (
          <div className="quick-results">
            <div className="quick-results-header">
              <h4>Quick Results</h4>
              <span className="results-count">{quickResults.length} found</span>
            </div>
            <div className="quick-results-list">
              {quickResults.map(result => (
                <button
                  key={result.id}
                  className="quick-result-item"
                  onClick={() => navigate(result.url)}
                >
                  <div className="result-icon">{getTypeIcon(result.type)}</div>
                  <div className="result-content">
                    <div className="result-header">
                      <span className="result-title">{result.title}</span>
                      <span className="result-type">{result.type}</span>
                    </div>
                    <div className="result-subtitle">{result.subtitle}</div>
                    <div className="result-description">{result.description}</div>
                  </div>
                  <div className="result-score">{result.relevanceScore}%</div>
                </button>
              ))}
            </div>
            <div className="quick-results-footer">
              <button 
                className="btn btn-primary"
                onClick={handleSearch}
              >
                View All Results
              </button>
            </div>
          </div>
        )}
      </div>

      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h3>Recent Searches</h3>
          <div className="recent-searches-list">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className="recent-search-item"
                onClick={() => setSearchQuery(search)}
              >
                <span className="recent-search-icon">🕒</span>
                <span className="recent-search-text">{search}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="search-shortcuts">
        <h3>Quick Access</h3>
        <div className="shortcuts-grid">
          <button 
            className="shortcut-card"
            onClick={() => navigate('/vehicles/search')}
          >
            <div className="shortcut-icon">🚗</div>
            <div className="shortcut-label">Vehicle Search</div>
          </button>
          <button 
            className="shortcut-card"
            onClick={() => navigate('/cases')}
          >
            <div className="shortcut-icon">📁</div>
            <div className="shortcut-label">Case Management</div>
          </button>
          <button 
            className="shortcut-card"
            onClick={() => navigate('/violations')}
          >
            <div className="shortcut-icon">⚠️</div>
            <div className="shortcut-label">Violations</div>
          </button>
          <button 
            className="shortcut-card"
            onClick={() => navigate('/documents')}
          >
            <div className="shortcut-icon">📄</div>
            <div className="shortcut-label">Documents</div>
          </button>
          <button 
            className="shortcut-card"
            onClick={() => navigate('/reports')}
          >
            <div className="shortcut-icon">📊</div>
            <div className="shortcut-label">Reports</div>
          </button>
          <button 
            className="shortcut-card"
            onClick={() => navigate('/search/advanced')}
          >
            <div className="shortcut-icon">🔧</div>
            <div className="shortcut-label">Advanced Search</div>
          </button>
        </div>
      </div>

      <div className="search-tips">
        <h3>Search Tips</h3>
        <div className="tips-grid">
          <div className="tip-item">
            <strong>Use quotes</strong> for exact phrase matching: "BMW X5 2020"
          </div>
          <div className="tip-item">
            <strong>Use wildcards</strong> with asterisk: "01-*-123" for partial plate numbers
          </div>
          <div className="tip-item">
            <strong>Filter by category</strong> to narrow down results to specific data types
          </div>
          <div className="tip-item">
            <strong>Combine terms</strong> with AND/OR: "BMW AND seized" or "import OR export"
          </div>
          <div className="tip-item">
            <strong>Use date ranges</strong> in advanced search for time-specific queries
          </div>
          <div className="tip-item">
            <strong>Search by ID numbers</strong> for exact matches: case IDs, VINs, document numbers
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
