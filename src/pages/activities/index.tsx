import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ActivityDashboard from './ActivityDashboard';
import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';
import ActivityCreation from './ActivityCreation';
import ActivityFromViolation from './ActivityFromViolation';

const ActivitiesModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ActivityDashboard />} />
      <Route path="/list" element={<ActivityList />} />
      <Route path="/create" element={<ActivityCreation />} />
      <Route path="/from-violation" element={<ActivityFromViolation />} />
      <Route path="/:id" element={<ActivityDetails />} />
    </Routes>
  );
};

export default ActivitiesModule;
