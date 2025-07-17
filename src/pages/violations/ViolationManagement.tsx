import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ViolationList from './ViolationList';
import ViolationDetail from './ViolationDetail';
import ViolationCreate from './ViolationCreate';
import ViolationTypeChange from './ViolationTypeChange';

const ViolationManagement: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ViolationList />} />
      <Route path="/new" element={<ViolationCreate />} />
      <Route path="/change-type" element={<ViolationTypeChange />} />
      <Route path="/:violationId" element={<ViolationDetail />} />
    </Routes>
  );
};

export default ViolationManagement;
