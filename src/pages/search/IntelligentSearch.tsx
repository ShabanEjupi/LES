import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { ClassicCard } from '../../components/common/ClassicCard';
import { ClassicButton } from '../../components/common/ClassicButton';
import './IntelligentSearch.css';

interface SearchResult {
  id: string;
  type: 'CASE' | 'VIOLATION' | 'PERSON' | 'VEHICLE' | 'DOCUMENT' | 'CROSSING' | 'FINE';
  title: string;
  subtitle: string;
  description: string;
  url: string;
  relevanceScore: number;
  metadata: {
    [key: string]: string | number | boolean;
  };
  highlightTerms: string[];
  lastModified: string;
  department: string;
  status?: string;
}

interface SearchFilter {
  type: string[];
  dateFrom: string;
  dateTo: string;
  department: string;
  status: string;
  relevanceThreshold: number;
}

interface SearchSuggestion {
  query: string;
  type: string;
  description: string;
  icon: string;
}

interface AISearchAnalysis {
  intent: 'LOOKUP' | 'ANALYSIS' | 'REPORT' | 'NAVIGATION';
  entities: Array<{
    type: string;
    value: string;
    confidence: number;
  }>;
  suggestedFilters: SearchFilter;
  alternativeQueries: string[];
  searchTips: string[];
}

const IntelligentSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<SearchFilter>({
    type: [],
    dateFrom: '',
    dateTo: '',
    department: '',
    status: '',
    relevanceThreshold: 0.3
  });
  const [aiAnalysis, setAiAnalysis] = useState<AISearchAnalysis | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Mock intelligent search service
  const analyzeSearchQuery = useCallback((query: string): AISearchAnalysis => {
    const lowerQuery = query.toLowerCase();
    
    // Simple AI analysis simulation
    let intent: AISearchAnalysis['intent'] = 'LOOKUP';
    const entities: AISearchAnalysis['entities'] = [];
    
    // Detect intent
    if (lowerQuery.includes('analiz') || lowerQuery.includes('statistik') || lowerQuery.includes('raport')) {
      intent = 'ANALYSIS';
    } else if (lowerQuery.includes('shko') || lowerQuery.includes('hap') || lowerQuery.includes('nav')) {
      intent = 'NAVIGATION';
    } else if (lowerQuery.includes('gjej') || lowerQuery.includes('kërko') || lowerQuery.includes('find')) {
      intent = 'LOOKUP';
    }

    // Extract entities
    const patterns = [
      { type: 'CASE_NUMBER', pattern: /\b\d{2}\.\d{1,2}\.\d{1,2}-\d{4}-\d+\b/g },
      { type: 'PLATE_NUMBER', pattern: /\b[A-Z]{2}-?\d{3,4}-?[A-Z]{1,2}\b/g },
      { type: 'PERSON_ID', pattern: /\b\d{10}\b/g },
      { type: 'PHONE', pattern: /\b\+?\d{8,12}\b/g },
      { type: 'DATE', pattern: /\b\d{1,2}[./]\d{1,2}[./]\d{4}\b/g },
      { type: 'AMOUNT', pattern: /\b€?\d{1,3}(?:,\d{3})*(?:\.\d{2})?\b/g }
    ];

    patterns.forEach(({ type, pattern }) => {
      const matches = query.match(pattern);
      if (matches) {
        matches.forEach(match => {
          entities.push({
            type,
            value: match,
            confidence: 0.9
          });
        });
      }
    });

    // Suggest filters based on query
    const suggestedFilters: SearchFilter = {
      type: [],
      dateFrom: '',
      dateTo: '',
      department: '',
      status: '',
      relevanceThreshold: 0.3
    };

    if (lowerQuery.includes('kundërvajtj') || lowerQuery.includes('violation')) {
      suggestedFilters.type.push('VIOLATION');
    }
    if (lowerQuery.includes('rast') || lowerQuery.includes('case')) {
      suggestedFilters.type.push('CASE');
    }
    if (lowerQuery.includes('mjet') || lowerQuery.includes('vehicle') || lowerQuery.includes('auto')) {
      suggestedFilters.type.push('VEHICLE');
    }

    // Generate alternative queries
    const alternativeQueries = [];
    if (entities.length > 0) {
      alternativeQueries.push(`${entities[0].value} status:active`);
      alternativeQueries.push(`${entities[0].value} type:${entities[0].type.toLowerCase()}`);
    }

    const searchTips = [
      'Përdorni simbole si "BMW X5" për kërkim të saktë',
      'Shtoni filtra si status:aktiv për rezultate më të sakta',
      'Përdorni * për kërkim me karaktere të panjohura',
      'Kombinoni terma me AND, OR për kërkim të avancuar'
    ];

    return {
      intent,
      entities,
      suggestedFilters,
      alternativeQueries,
      searchTips
    };
  }, []);

  const generateMockResults = useCallback((query: string): SearchResult[] => {
    const mockData: SearchResult[] = [
      {
        id: 'case-001',
        type: 'CASE',
        title: 'Rasti 03.1.7-2024-145',
        subtitle: 'Kontrabandë e Mallrave',
        description: 'Rast i kontrabandës së mallrave elektronike në vlerë €25,000',
        url: '/cases/case-001',
        relevanceScore: 0.95,
        metadata: {
          officer: 'Agim Kastrati',
          status: 'ACTIVE',
          value: 25000,
          location: 'Merdare'
        },
        highlightTerms: ['kontrabandë', 'mallra'],
        lastModified: '2024-01-15T10:30:00Z',
        department: 'Doganat e Prishtinës',
        status: 'ACTIVE'
      },
      {
        id: 'violation-001',
        type: 'VIOLATION',
        title: 'Kundërvajtje KV-273',
        subtitle: 'Deklarim i Rremë',
        description: 'Deklarim i pasaktë i mallrave të importuara nga Shqipëria',
        url: '/violations/violation-001',
        relevanceScore: 0.87,
        metadata: {
          fineAmount: 5000,
          subject: 'Kompania ABC sh.p.k',
          violationType: 'FALSE_DECLARATION'
        },
        highlightTerms: ['deklarim', 'mallra'],
        lastModified: '2024-01-14T15:45:00Z',
        department: 'Doganat e Gjakovës',
        status: 'PENDING'
      },
      {
        id: 'vehicle-001',
        type: 'VEHICLE',
        title: 'BMW X5 - PR-123-AB',
        subtitle: 'I regjistruar në Prishtinë',
        description: 'Mjet i përfshirë në 3 raste të ndryshme të kundërvajtjeve',
        url: '/vehicles/vehicle-001',
        relevanceScore: 0.78,
        metadata: {
          owner: 'Bekim Rexhepi',
          year: 2019,
          engine: '3.0L',
          cases: 3
        },
        highlightTerms: ['BMW', 'X5'],
        lastModified: '2024-01-13T09:20:00Z',
        department: 'Doganat e Prishtinës',
        status: 'MONITORED'
      },
      {
        id: 'person-001',
        type: 'PERSON',
        title: 'Agim Kastrati',
        subtitle: 'Zyrtari Doganor - Inspektor',
        description: 'Përgjegjës për 24 raste aktive të kundërvajtjeve',
        url: '/persons/person-001',
        relevanceScore: 0.82,
        metadata: {
          position: 'Inspektor Doganor',
          activeCases: 24,
          department: 'Doganat e Prishtinës'
        },
        highlightTerms: ['Agim', 'Kastrati'],
        lastModified: '2024-01-15T16:00:00Z',
        department: 'Doganat e Prishtinës',
        status: 'ACTIVE'
      },
      {
        id: 'document-001',
        type: 'DOCUMENT',
        title: 'Certifikatë Origine CO-2024-0456',
        subtitle: 'Lëshuar për mallra nga Turqia',
        description: 'Certifikatë e origjinës për import mallrash tekstile në vlerë €15,000',
        url: '/documents/document-001',
        relevanceScore: 0.65,
        metadata: {
          issueDate: '2024-01-10',
          expiryDate: '2024-04-10',
          value: 15000,
          origin: 'Turqia'
        },
        highlightTerms: ['certifikatë', 'origine'],
        lastModified: '2024-01-10T11:30:00Z',
        department: 'Doganat e Mitrovicës'
      }
    ];

    // Filter based on query relevance
    if (!query.trim()) return [];
    
    return mockData
      .filter(item => {
        const searchText = `${item.title} ${item.subtitle} ${item.description}`.toLowerCase();
        const queryLower = query.toLowerCase();
        
        // Simple relevance scoring
        let score = 0;
        const queryWords = queryLower.split(' ').filter(word => word.length > 2);
        
        queryWords.forEach(word => {
          if (searchText.includes(word)) {
            score += 0.3;
            if (item.title.toLowerCase().includes(word)) score += 0.4;
            if (item.subtitle.toLowerCase().includes(word)) score += 0.2;
          }
        });
        
        item.relevanceScore = Math.min(1, score);
        return score >= filters.relevanceThreshold;
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }, [filters.relevanceThreshold]);

  const performSearch = useCallback(async () => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      setAiAnalysis(null);
      return;
    }

    setIsSearching(true);
    
    try {
      // Simulate AI analysis
      const analysis = analyzeSearchQuery(searchQuery);
      setAiAnalysis(analysis);
      
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate mock results
      const results = generateMockResults(searchQuery);
      setSearchResults(results);
      
      // Add to search history
      if (!searchHistory.includes(searchQuery)) {
        setSearchHistory(prev => [searchQuery, ...prev.slice(0, 9)]);
      }
      
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, analyzeSearchQuery, generateMockResults, searchHistory]);

  const generateSuggestions = useCallback((query: string): SearchSuggestion[] => {
    if (query.length < 2) return [];
    
    const commonSuggestions: SearchSuggestion[] = [
      {
        query: 'BMW X5 kontrabandë',
        type: 'CASE',
        description: 'Raste të kontrabandës me mjete BMW X5',
        icon: '🚗'
      },
      {
        query: 'deklarim i rremë 2024',
        type: 'VIOLATION',
        description: 'Kundërvajtje për deklarim të rremë këtë vit',
        icon: '⚠️'
      },
      {
        query: 'gjoba > 10000',
        type: 'FINE',
        description: 'Gjoba mbi €10,000',
        icon: '💰'
      },
      {
        query: 'Merdare crossing',
        type: 'CROSSING',
        description: 'Aktivitete në pikën kufitare Merdare',
        icon: '🚧'
      },
      {
        query: 'status:aktiv priority:urgjent',
        type: 'CASE',
        description: 'Raste aktive me përparësi urgjente',
        icon: '🔥'
      }
    ];
    
    return commonSuggestions.filter(s => 
      s.query.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
    );
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length >= 2) {
        performSearch();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  useEffect(() => {
    setSuggestions(generateSuggestions(searchQuery));
  }, [searchQuery, generateSuggestions]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
  };

  const applyAdvancedFilters = () => {
    performSearch();
    setShowAdvanced(false);
  };

  const quickSearchTemplates = [
    { query: 'BMW X5', icon: '🚗', label: 'Mjet BMW X5' },
    { query: 'kontrabandë mallra', icon: '⚠️', label: 'Kontrabandë' },
    { query: 'Agim Kastrati', icon: '👤', label: 'Zyrtari' },
    { query: 'status:aktiv', icon: '✅', label: 'Raste Aktive' },
    { query: 'gjoba > 5000', icon: '💰', label: 'Gjoba të Larta' },
    { query: 'Merdare', icon: '🚧', label: 'Pika Kufitare' }
  ];

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'CASE': return '📁';
      case 'VIOLATION': return '⚠️';
      case 'PERSON': return '👤';
      case 'VEHICLE': return '🚗';
      case 'DOCUMENT': return '📄';
      case 'CROSSING': return '🚧';
      case 'FINE': return '💰';
      default: return '📋';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'ACTIVE': return '#28a745';
      case 'PENDING': return '#ffc107';
      case 'COMPLETED': return '#6c757d';
      case 'MONITORED': return '#17a2b8';
      default: return '#333';
    }
  };

  return (
    <MainLayout>
      <div className="intelligent-search">
        
        {/* Search Header */}
        <ClassicCard title="🔍 Motori i Kërkimit Inteligjent">
          <div className="search-header">
            <div className="search-main">
              <div className="search-input-container">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Shkruani këtu për të kërkuar nëpër të gjitha modulet..."
                  className="search-input"
                  autoFocus
                />
                {isSearching && <div className="search-spinner">⏳</div>}
              </div>
              
              <div className="search-actions">
                <ClassicButton 
                  variant="primary" 
                  onClick={performSearch}
                  disabled={!searchQuery.trim() || isSearching}
                >
                  🔍 Kërko
                </ClassicButton>
                <ClassicButton 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  ⚙️ Të Avancuara
                </ClassicButton>
              </div>
            </div>

            {/* Quick Templates */}
            <div className="quick-templates">
              <span className="templates-label">Kërkim të shpejtë:</span>
              {quickSearchTemplates.map((template, index) => (
                <button
                  key={index}
                  className="template-btn"
                  onClick={() => setSearchQuery(template.query)}
                >
                  {template.icon} {template.label}
                </button>
              ))}
            </div>
          </div>
        </ClassicCard>

        {/* Advanced Filters */}
        {showAdvanced && (
          <ClassicCard title="🎯 Filtrat e Avancuar">
            <div className="advanced-filters">
              <div className="filter-grid">
                <div className="filter-group">
                  <label>Lloji i Rezultatit:</label>
                  <div className="type-checkboxes">
                    {['CASE', 'VIOLATION', 'PERSON', 'VEHICLE', 'DOCUMENT'].map(type => (
                      <label key={type} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.type.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({ ...prev, type: [...prev.type, type] }));
                            } else {
                              setFilters(prev => ({ ...prev, type: prev.type.filter(t => t !== type) }));
                            }
                          }}
                        />
                        {getResultIcon(type)} {type}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="filter-group">
                  <label>Nga Data:</label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                  />
                </div>
                
                <div className="filter-group">
                  <label>Deri në Datë:</label>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                  />
                </div>
                
                <div className="filter-group">
                  <label>Departamenti:</label>
                  <select
                    value={filters.department}
                    onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                  >
                    <option value="">Të gjitha</option>
                    <option value="Doganat e Prishtinës">Doganat e Prishtinës</option>
                    <option value="Doganat e Gjakovës">Doganat e Gjakovës</option>
                    <option value="Doganat e Mitrovicës">Doganat e Mitrovicës</option>
                    <option value="Doganat e Prizrenit">Doganat e Prizrenit</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Pragu i Relevancës:</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={filters.relevanceThreshold}
                    onChange={(e) => setFilters(prev => ({ ...prev, relevanceThreshold: parseFloat(e.target.value) }))}
                  />
                  <span>{Math.round(filters.relevanceThreshold * 100)}%</span>
                </div>
              </div>
              
              <div className="filter-actions">
                <ClassicButton variant="primary" onClick={applyAdvancedFilters}>
                  ✅ Apliko Filtrat
                </ClassicButton>
                <ClassicButton onClick={() => setFilters({
                  type: [],
                  dateFrom: '',
                  dateTo: '',
                  department: '',
                  status: '',
                  relevanceThreshold: 0.3
                })}>
                  🗑️ Pastro
                </ClassicButton>
              </div>
            </div>
          </ClassicCard>
        )}

        {/* AI Analysis */}
        {aiAnalysis && (
          <ClassicCard title="🤖 Analiza e Kërkimit">
            <div className="ai-analysis">
              <div className="analysis-section">
                <div className="analysis-intent">
                  <strong>Qëllimi i Identifikuar:</strong>
                  <span className={`intent-badge ${aiAnalysis.intent.toLowerCase()}`}>
                    {aiAnalysis.intent === 'LOOKUP' ? '🔍 Kërkim' :
                     aiAnalysis.intent === 'ANALYSIS' ? '📊 Analizë' :
                     aiAnalysis.intent === 'NAVIGATION' ? '🧭 Navigim' : '📋 Raport'}
                  </span>
                </div>
                
                {aiAnalysis.entities.length > 0 && (
                  <div className="analysis-entities">
                    <strong>Entitete të Identifikuara:</strong>
                    {aiAnalysis.entities.map((entity, index) => (
                      <span key={index} className="entity-badge">
                        {entity.type}: {entity.value} ({Math.round(entity.confidence * 100)}%)
                      </span>
                    ))}
                  </div>
                )}
                
                {aiAnalysis.alternativeQueries.length > 0 && (
                  <div className="analysis-alternatives">
                    <strong>Kërkime Alternative:</strong>
                    {aiAnalysis.alternativeQueries.map((query, index) => (
                      <button
                        key={index}
                        className="alternative-btn"
                        onClick={() => setSearchQuery(query)}
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ClassicCard>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <ClassicCard title={`📋 Rezultatet e Kërkimit (${searchResults.length})`}>
            <div className="search-results">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="result-item"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="result-header">
                    <div className="result-icon">
                      {getResultIcon(result.type)}
                    </div>
                    <div className="result-title-section">
                      <div className="result-title">{result.title}</div>
                      <div className="result-subtitle">{result.subtitle}</div>
                    </div>
                    <div className="result-metadata">
                      <div className="result-score">
                        Relevanca: {Math.round(result.relevanceScore * 100)}%
                      </div>
                      {result.status && (
                        <div 
                          className="result-status"
                          style={{ color: getStatusColor(result.status) }}
                        >
                          ● {result.status}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="result-description">
                    {result.description}
                  </div>
                  
                  <div className="result-footer">
                    <div className="result-department">
                      🏢 {result.department}
                    </div>
                    <div className="result-modified">
                      📅 {new Date(result.lastModified).toLocaleDateString('sq-AL')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ClassicCard>
        )}

        {/* No Results */}
        {searchQuery.length >= 2 && !isSearching && searchResults.length === 0 && (
          <ClassicCard title="❌ Nuk u gjetën rezultate">
            <div className="no-results">
              <p>Nuk u gjetën rezultate për "{searchQuery}"</p>
              
              {suggestions.length > 0 && (
                <div className="suggestions-section">
                  <h4>Sugjerime:</h4>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-btn"
                      onClick={() => setSearchQuery(suggestion.query)}
                    >
                      {suggestion.icon} {suggestion.description}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="search-tips">
                <h4>Këshilla për Kërkim:</h4>
                <ul>
                  <li>Përdorni terma më të përgjithshëm</li>
                  <li>Kontrolloni drejtshkrimin</li>
                  <li>Përdorni filtra për të ngushtuar kërkimin</li>
                  <li>Provoni kërkime alternative nga analiza AI</li>
                </ul>
              </div>
            </div>
          </ClassicCard>
        )}

        {/* Search History */}
        {searchHistory.length > 0 && (
          <ClassicCard title="📚 Historiku i Kërkimeve">
            <div className="search-history">
              {searchHistory.map((query, index) => (
                <button
                  key={index}
                  className="history-btn"
                  onClick={() => setSearchQuery(query)}
                >
                  🔍 {query}
                </button>
              ))}
              <ClassicButton onClick={() => setSearchHistory([])}>
                🗑️ Pastro Historikun
              </ClassicButton>
            </div>
          </ClassicCard>
        )}

      </div>
    </MainLayout>
  );
};

export default IntelligentSearch;
