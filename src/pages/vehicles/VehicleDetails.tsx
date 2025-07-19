import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { ClassicButton } from '../../components/common/ClassicButton';
import { ClassicCard } from '../../components/common/ClassicCard';
import '../../styles/classic-theme.css';

interface Vehicle {
  id: string;
  plateNumber: string;
  type: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  driverName: string;
  driverLicense: string;
  capacity: string;
  status: 'ACTIVE' | 'INACTIVE' | 'UNDER_INVESTIGATION';
  lastInspection: string;
}

const VehicleDetails: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    // Mock vehicles data
    const mockVehicles: Vehicle[] = [
      {
        id: '1',
        plateNumber: '01-ABC-123',
        type: 'TRUCK',
        brand: 'Mercedes',
        model: 'Actros',
        year: 2018,
        color: 'E bardhë',
        driverName: 'Agron Krasniqi',
        driverLicense: 'B123456789',
        capacity: '40 ton',
        status: 'ACTIVE',
        lastInspection: '2024-01-10'
      },
      {
        id: '2',
        plateNumber: '02-XYZ-456',
        type: 'VAN',
        brand: 'Ford',
        model: 'Transit',
        year: 2020,
        color: 'E kaltër',
        driverName: 'Fatmir Hoxha',
        driverLicense: 'B987654321',
        capacity: '3.5 ton',
        status: 'UNDER_INVESTIGATION',
        lastInspection: '2024-01-12'
      }
    ];
    setVehicles(mockVehicles);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return '#008000';
      case 'INACTIVE': return '#808080';
      case 'UNDER_INVESTIGATION': return '#e41e20';
      default: return '#000000';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Aktiv';
      case 'INACTIVE': return 'Joaktiv';
      case 'UNDER_INVESTIGATION': return 'Nën hetim';
      default: return status;
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || vehicle.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box className="classic-container">
      <Typography variant="h4" className="classic-title">
        Detajet e Mjetit të Transportit
      </Typography>
      <Typography variant="subtitle1" className="classic-subtitle">
        Menaxhimi i të dhënave për mjetet e transportit
      </Typography>

      <ClassicCard title="Filtrat e Kërkimit">
        <div className="classic-form-grid">
          <div className="classic-form-row">
            <div className="classic-form-field">
              <TextField
                fullWidth
                label="Kërko sipas numrit të targës ose shoferit"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="classic-textfield"
                variant="outlined"
              />
            </div>
            <div className="classic-form-field">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Statusi</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="classic-select"
                >
                  <MenuItem value="ALL">Të gjitha</MenuItem>
                  <MenuItem value="ACTIVE">Aktiv</MenuItem>
                  <MenuItem value="INACTIVE">Joaktiv</MenuItem>
                  <MenuItem value="UNDER_INVESTIGATION">Nën hetim</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </ClassicCard>

      <ClassicCard title="Lista e Mjeteve">
        <div className="classic-toolbar">
          <ClassicButton variant="primary">
            + Mjeti i Ri
          </ClassicButton>
          <ClassicButton variant="default">
            Eksporto
          </ClassicButton>
          <ClassicButton variant="default">
            Printo
          </ClassicButton>
        </div>

        <TableContainer component={Paper} className="classic-table-container">
          <Table className="classic-table">
            <TableHead>
              <TableRow className="classic-table-header">
                <TableCell>Numri i Targës</TableCell>
                <TableCell>Lloji</TableCell>
                <TableCell>Marka/Modeli</TableCell>
                <TableCell>Viti</TableCell>
                <TableCell>Ngjyra</TableCell>
                <TableCell>Shoferi</TableCell>
                <TableCell>Kapaciteti</TableCell>
                <TableCell>Statusi</TableCell>
                <TableCell>Veprimet</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id} className="classic-table-row">
                  <TableCell>
                    <strong>{vehicle.plateNumber}</strong>
                  </TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.brand} {vehicle.model}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{vehicle.color}</TableCell>
                  <TableCell>
                    <div>
                      <strong>{vehicle.driverName}</strong><br />
                      <small>{vehicle.driverLicense}</small>
                    </div>
                  </TableCell>
                  <TableCell>{vehicle.capacity}</TableCell>
                  <TableCell>
                    <span style={{ 
                      color: getStatusColor(vehicle.status), 
                      fontWeight: 'bold' 
                    }}>
                      {getStatusText(vehicle.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="classic-action-buttons">
                      <ClassicButton 
                        size="small" 
                        variant="default"
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
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

      {selectedVehicle && (
        <ClassicCard title="Detajet e Mjetit">
          <div className="classic-vehicle-details">
            <div className="classic-detail-grid">
              <div className="classic-detail-row">
                <div className="classic-detail-field">
                  <strong>Numri i Targës:</strong>
                  <span>{selectedVehicle.plateNumber}</span>
                </div>
                <div className="classic-detail-field">
                  <strong>Lloji:</strong>
                  <span>{selectedVehicle.type}</span>
                </div>
              </div>
              <div className="classic-detail-row">
                <div className="classic-detail-field">
                  <strong>Marka:</strong>
                  <span>{selectedVehicle.brand}</span>
                </div>
                <div className="classic-detail-field">
                  <strong>Modeli:</strong>
                  <span>{selectedVehicle.model}</span>
                </div>
              </div>
              <div className="classic-detail-row">
                <div className="classic-detail-field">
                  <strong>Viti:</strong>
                  <span>{selectedVehicle.year}</span>
                </div>
                <div className="classic-detail-field">
                  <strong>Ngjyra:</strong>
                  <span>{selectedVehicle.color}</span>
                </div>
              </div>
              <div className="classic-detail-row">
                <div className="classic-detail-field">
                  <strong>Shoferi:</strong>
                  <span>{selectedVehicle.driverName}</span>
                </div>
                <div className="classic-detail-field">
                  <strong>Patenta:</strong>
                  <span>{selectedVehicle.driverLicense}</span>
                </div>
              </div>
              <div className="classic-detail-row">
                <div className="classic-detail-field">
                  <strong>Kapaciteti:</strong>
                  <span>{selectedVehicle.capacity}</span>
                </div>
                <div className="classic-detail-field">
                  <strong>Inspektimi i fundit:</strong>
                  <span>{selectedVehicle.lastInspection}</span>
                </div>
              </div>
            </div>
            <div className="classic-button-group">
              <ClassicButton variant="default" onClick={() => setSelectedVehicle(null)}>
                Mbyll
              </ClassicButton>
              <ClassicButton variant="primary">
                Ndrysho
              </ClassicButton>
              <ClassicButton variant="default">
                Printo
              </ClassicButton>
            </div>
          </div>
        </ClassicCard>
      )}
    </Box>
  );
};

export default VehicleDetails;
