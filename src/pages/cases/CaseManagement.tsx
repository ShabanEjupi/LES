import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CaseList from './CaseList';
import CaseDetailView from './CaseDetailView';
import CaseCreate from './CaseCreate';

const CaseManagement: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CaseList />} />
      <Route path="/new" element={<CaseCreate />} />
      <Route path="/:caseId" element={<CaseDetailView />} />
      <Route path="/my" element={<div>My Cases</div>} />
    </Routes>
  );
};

export default CaseManagement;
