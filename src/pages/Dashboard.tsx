import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ModulesGrid from '../components/common/ModulesGrid';
import type { KosovoModule } from '../data/kosovoCostomeModules';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleModuleSelect = (module: KosovoModule) => {
    // Navigate to the module route
    if (module.route) {
      navigate(module.route);
    }
  };

  return (
    <MainLayout>
      <div className="dashboard-container">
        <ModulesGrid onModuleSelect={handleModuleSelect} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
