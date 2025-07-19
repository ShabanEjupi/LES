import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const EvidenceRegistry: React.FC = () => {
  return (
    <Box className="classic-container">
      <Paper className="classic-paper">
        <Box className="classic-header">
          <Typography variant="h5" component="h1" className="classic-title">
            Regjistri i Provave
          </Typography>
          <Typography variant="body2" className="classic-subtitle">
            Regjistri i provave dhe dëshmive
          </Typography>
        </Box>

        <Box className="classic-toolbar">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="classic-button classic-button-primary"
          >
            Provë e Re
          </Button>
        </Box>

        <Box textAlign="center" py={4}>
          <Typography variant="body1" color="text.secondary">
            Regjistri i provave në zhvillim e sipër...
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default EvidenceRegistry;
