import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import ModulesGrid from '../components/common/ModulesGrid';

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="dashboard-container">
        <ModulesGrid />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
