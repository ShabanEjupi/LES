import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Euro as EuroIcon,
  Security as SecurityIcon,
  Schedule as ScheduleIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import type { 
  KPIDefinition, 
  ChartData, 
  KosovoReportingType 
} from '../../types';

// Sample data for Kosovo Customs reporting requirements
const generateKosovoCustomsKPIs = (): KPIDefinition[] => [
  {
    id: 'kpi-001',
    name: 'Case Resolution Time',
    description: 'Average time to resolve customs violations cases',
    formula: 'SUM(resolution_days) / COUNT(cases)',
    targetValue: 30,
    unit: 'days',
    frequency: 'MONTHLY',
    category: 'EFFICIENCY',
  },
  {
    id: 'kpi-002',
    name: 'Revenue Collection Rate',
    description: 'Percentage of expected customs revenue collected',
    formula: '(collected_revenue / expected_revenue) * 100',
    targetValue: 95,
    unit: '%',
    frequency: 'MONTHLY',
    category: 'REVENUE',
  },
  {
    id: 'kpi-003',
    name: 'GDPR Compliance Score',
    description: 'Percentage of personal data processing activities that comply with GDPR',
    formula: '(compliant_activities / total_activities) * 100',
    targetValue: 100,
    unit: '%',
    frequency: 'QUARTERLY',
    category: 'COMPLIANCE',
  },
  {
    id: 'kpi-004',
    name: 'Investigation Success Rate',
    description: 'Percentage of investigations resulting in successful outcomes',
    formula: '(successful_investigations / total_investigations) * 100',
    targetValue: 75,
    unit: '%',
    frequency: 'MONTHLY',
    category: 'QUALITY',
  }
];

const generateViolationStatistics = (): ChartData[] => [
  { label: 'Undervaluation', value: 35, color: '#8884d8' },
  { label: 'Misclassification', value: 25, color: '#82ca9d' },
  { label: 'Origin Fraud', value: 20, color: '#ffc658' },
  { label: 'Prohibited Goods', value: 15, color: '#ff7300' },
  { label: 'Transit Violations', value: 5, color: '#00ff88' }
];

interface KPICardValue {
  current: number;
  target: number;
  trend: 'up' | 'down';
}

const KPICard = ({ kpi, value }: { kpi: KPIDefinition; value: KPICardValue }) => {
  const isAboveTarget = value.current >= value.target;
  const trendIcon = value.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />;
  const trendColor = value.trend === 'up' ? 'success.main' : 'error.main';

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              {kpi.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {kpi.description}
            </Typography>
          </Box>
          {kpi.category === 'EFFICIENCY' && <ScheduleIcon color="primary" />}
          {kpi.category === 'REVENUE' && <EuroIcon color="primary" />}
          {kpi.category === 'COMPLIANCE' && <SecurityIcon color="primary" />}
          {kpi.category === 'QUALITY' && <AssessmentIcon color="primary" />}
        </Box>
        
        <Box display="flex" alignItems="baseline" mb={1}>
          <Typography variant="h4" component="div" color={isAboveTarget ? 'success.main' : 'warning.main'}>
            {value.current}
          </Typography>
          <Typography variant="body1" ml={1}>
            {kpi.unit}
          </Typography>
          <Box ml="auto" display="flex" alignItems="center" sx={{ color: trendColor }}>
            {trendIcon}
          </Box>
        </Box>
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Target: {value.target} {kpi.unit}
          </Typography>
          <Chip 
            label={kpi.frequency} 
            size="small" 
            variant="outlined"
            color={isAboveTarget ? 'success' : 'warning'}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const AdvancedReportingDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [kpis] = useState(generateKosovoCustomsKPIs());
  const [violationData] = useState(generateViolationStatistics());

  const getCurrentKPIValues = (): Record<string, KPICardValue> => ({
    'Case Resolution Time': { current: 28, target: 30, trend: 'down' },
    'Revenue Collection Rate': { current: 97.2, target: 95, trend: 'up' },
    'GDPR Compliance Score': { current: 98.5, target: 100, trend: 'up' },
    'Investigation Success Rate': { current: 78.3, target: 75, trend: 'up' },
  });

  const currentKPIValues = getCurrentKPIValues();

  const handleExportReport = (type: KosovoReportingType) => {
    console.log('Exporting report:', type);
    // Implementation would generate and download report
  };

  const handlePeriodChange = (event: { target: { value: string } }) => {
    setSelectedPeriod(event.target.value);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Kosovo Customs Analytics Dashboard
        </Typography>
        <Box display="flex" gap={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Period</InputLabel>
            <Select
              value={selectedPeriod}
              label="Period"
              onChange={handlePeriodChange}
            >
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => handleExportReport('MONTHLY_CUSTOMS_STATISTICS')}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        This dashboard provides real-time insights into Kosovo Customs operations, 
        GDPR compliance status, and EU reporting requirements. Data is updated automatically.
      </Alert>

      {/* KPI Cards */}
      <Typography variant="h5" gutterBottom mb={2}>
        Key Performance Indicators
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        {kpis.map((kpi) => (
          <Box key={kpi.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
            <KPICard 
              kpi={kpi} 
              value={currentKPIValues[kpi.name] || { current: 0, target: 0, trend: 'down' }} 
            />
          </Box>
        ))}
      </Box>

      {/* Charts Section */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        {/* Revenue Analysis */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(66.67% - 12px)' } }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <EuroIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Revenue Collection Analysis</Typography>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={[
                  { period: 'Jan', revenue: 1200000, target: 1500000 },
                  { period: 'Feb', revenue: 1350000, target: 1500000 },
                  { period: 'Mar', revenue: 1450000, target: 1500000 },
                  { period: 'Apr', revenue: 1600000, target: 1500000 },
                  { period: 'May', revenue: 1580000, target: 1500000 },
                  { period: 'Jun', revenue: 1720000, target: 1500000 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis tickFormatter={(value: number) => `€${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value: number) => [`€${(value / 1000000).toFixed(2)}M`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" name="Collected Revenue" />
                  <Area type="monotone" dataKey="target" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Target Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Violation Types Distribution */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.33% - 12px)' } }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AssessmentIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Violation Types</Typography>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={violationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {violationData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* GDPR Compliance Chart */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <SecurityIcon sx={{ mr: 1 }} />
                <Typography variant="h6">GDPR Compliance Status</Typography>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Compliant', value: 95, color: '#4caf50' },
                  { name: 'Pending', value: 3, color: '#ff9800' },
                  { name: 'Non-Compliant', value: 2, color: '#f44336' }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8">
                    {[
                      { name: 'Compliant', value: 95, color: '#4caf50' },
                      { name: 'Pending', value: 3, color: '#ff9800' },
                      { name: 'Non-Compliant', value: 2, color: '#f44336' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Kosovo Customs Posts Activity */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Border Posts Activity
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Pristina Airport', value: 156 },
                  { name: 'Merdare', value: 89 },
                  { name: 'Dheu i Bardhë', value: 67 },
                  { name: 'Jarinje', value: 45 },
                  { name: 'Bllace', value: 78 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Kosovo Customs Specific Reports */}
      <Typography variant="h5" gutterBottom mb={2}>
        Kosovo Customs Reporting
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.33% - 16px)' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                EU Compliance Report
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Monthly compliance report for EU customs union requirements
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Chip label="Monthly" color="primary" size="small" />
                <Button 
                  size="small" 
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleExportReport('EU_PROGRESS_REPORT')}
                >
                  View Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.33% - 16px)' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Collection Summary
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Detailed breakdown of customs revenue by violation type
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Chip label="Weekly" color="success" size="small" />
                <Button 
                  size="small" 
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleExportReport('QUARTERLY_VIOLATION_SUMMARY')}
                >
                  View Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.33% - 16px)' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cross-Border Cooperation
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Cases involving international customs cooperation
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Chip label="Quarterly" color="warning" size="small" />
                <Button 
                  size="small" 
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleExportReport('JUDICIAL_COOPERATION_REPORT')}
                >
                  View Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Recent Activities Table */}
      <Typography variant="h5" gutterBottom mb={2}>
        Recent Reporting Activities
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report Type</TableCell>
              <TableCell>Generated Date</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { type: 'EU Compliance Report', date: '2024-07-15', period: 'June 2024', status: 'Completed' },
              { type: 'Revenue Collection', date: '2024-07-14', period: 'Week 28', status: 'Completed' },
              { type: 'GDPR Audit Report', date: '2024-07-10', period: 'Q2 2024', status: 'In Progress' },
              { type: 'Violation Analysis', date: '2024-07-08', period: 'June 2024', status: 'Completed' },
            ].map((report, index) => (
              <TableRow key={index}>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.period}</TableCell>
                <TableCell>
                  <Chip 
                    label={report.status}
                    color={report.status === 'Completed' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" startIcon={<DownloadIcon />}>
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdvancedReportingDashboard;
