import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import AdvancedSearch from './AdvancedSearch';
import SearchResults from './SearchResults';

const SearchModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GlobalSearch />} />
      <Route path="/global" element={<GlobalSearch />} />
      <Route path="/advanced" element={<AdvancedSearch />} />
      <Route path="/results" element={<SearchResults />} />
    </Routes>
  );
};

export default SearchModule;
