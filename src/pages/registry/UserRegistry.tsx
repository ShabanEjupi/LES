import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const UserRegistry: React.FC = () => {
  return (
    <Box className="classic-container">
      <Paper className="classic-paper">
        <Box className="classic-header">
          <Typography variant="h5" component="h1" className="classic-title">
            Regjistri i Përdoruesve
          </Typography>
          <Typography variant="body2" className="classic-subtitle">
            Regjistri i përdoruesve të sistemit
          </Typography>
        </Box>

        <Box className="classic-toolbar">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="classic-button classic-button-primary"
          >
            Përdorues i Ri
          </Button>
        </Box>

        <Box textAlign="center" py={4}>
          <Typography variant="body1" color="text.secondary">
            Regjistri i përdoruesve në zhvillim e sipër...
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserRegistry;
