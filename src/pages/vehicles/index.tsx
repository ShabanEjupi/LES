import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VehicleManagement from './VehicleManagement';
import VehicleDetails from './VehicleDetails';
import VehicleSearch from './VehicleSearch';

const VehiclesModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<VehicleManagement />} />
      <Route path="/search" element={<VehicleSearch />} />
      <Route path="/details" element={<VehicleDetails />} />
      <Route path="/:id" element={<VehicleDetails />} />
    </Routes>
  );
};

export default VehiclesModule;
