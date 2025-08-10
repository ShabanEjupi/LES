import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CaseList from './CaseList';
import CaseDetailView from './CaseDetailView';
import CaseCreate from './CaseCreate';
import CaseAssignment from './CaseAssignment';
import CaseRelatedEntities from './CaseRelatedEntities';
import CaseAccessManagement from './CaseAccessManagement';
import DifferentCaseTypes from './DifferentCaseTypes';
import AdditionalCaseInfo from './AdditionalCaseInfo';

const CaseManagement: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CaseList />} />
      <Route path="/new" element={<CaseCreate />} />
      <Route path="/assignment" element={<CaseAssignment />} />
      <Route path="/related-entities/:caseId?" element={<CaseRelatedEntities />} />
      <Route path="/access/:caseId?" element={<CaseAccessManagement />} />
      <Route path="/types" element={<DifferentCaseTypes />} />
      <Route path="/additional-info/:caseId?" element={<AdditionalCaseInfo />} />
      <Route path="/:caseId" element={<CaseDetailView />} />
      <Route path="/my" element={<div>My Cases</div>} />
    </Routes>
  );
};

export default CaseManagement;
