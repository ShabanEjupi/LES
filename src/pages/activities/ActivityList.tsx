import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ClassicButton } from '../../components/common/ClassicButton';
import { ClassicCard } from '../../components/common/ClassicCard';
import '../../styles/classic-theme.css';

interface Activity {
  id: string;
  type: string;
  description: string;
  assignedTo: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  createdDate: string;
}

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockActivities: Activity[] = [
      {
        id: '1',
        type: 'INVESTIGATION',
        description: 'Hetim i rastit të kontrabandës',
        assignedTo: 'Agron Krasniqi',
        priority: 'HIGH',
        dueDate: '2024-01-15',
        status: 'IN_PROGRESS',
        createdDate: '2024-01-10'
      },
      {
        id: '2',
        type: 'DOCUMENTATION',
        description: 'Dokumentimi i provave',
        assignedTo: 'Fatmir Hoxha',
        priority: 'MEDIUM',
        dueDate: '2024-01-20',
        status: 'PENDING',
        createdDate: '2024-01-12'
      }
    ];
    setActivities(mockActivities);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return '#e41e20';
      case 'MEDIUM': return '#ff8000';
      case 'LOW': return '#008000';
      default: return '#000000';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Në pritje';
      case 'IN_PROGRESS': return 'Në zhvendosje';
      case 'COMPLETED': return 'Përfunduar';
      default: return status;
    }
  };

  return (
    <Box className="classic-container">
      <Typography variant="h4" className="classic-title">
        Lista e Aktiviteteve
      </Typography>
      <Typography variant="subtitle1" className="classic-subtitle">
        Menaxhimi i aktiviteteve të krijuara
      </Typography>

      <ClassicCard>
        <div className="classic-toolbar">
          <ClassicButton variant="primary">
            + Aktivitet i Ri
          </ClassicButton>
          <ClassicButton variant="default">
            Filtro
          </ClassicButton>
          <ClassicButton variant="default">
            Eksporto
          </ClassicButton>
        </div>

        <TableContainer component={Paper} className="classic-table-container">
          <Table className="classic-table">
            <TableHead>
              <TableRow className="classic-table-header">
                <TableCell>ID</TableCell>
                <TableCell>Lloji</TableCell>
                <TableCell>Përshkrimi</TableCell>
                <TableCell>Caktuar për</TableCell>
                <TableCell>Prioriteti</TableCell>
                <TableCell>Data e Përfundimit</TableCell>
                <TableCell>Statusi</TableCell>
                <TableCell>Veprimet</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id} className="classic-table-row">
                  <TableCell>{activity.id}</TableCell>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>{activity.assignedTo}</TableCell>
                  <TableCell>
                    <span style={{ color: getPriorityColor(activity.priority), fontWeight: 'bold' }}>
                      {activity.priority}
                    </span>
                  </TableCell>
                  <TableCell>{activity.dueDate}</TableCell>
                  <TableCell>{getStatusText(activity.status)}</TableCell>
                  <TableCell>
                    <div className="classic-action-buttons">
                      <ClassicButton size="small" variant="default">
                        Shiko
                      </ClassicButton>
                      <ClassicButton size="small" variant="default">
                        Ndrysho
                      </ClassicButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ClassicCard>
    </Box>
  );
};

export default ActivityList;
