import React, { useState, useMemo } from 'react';
import { 
  Box, Paper, Stack, Typography, Button, TextField, InputAdornment, 
  useTheme, MenuItem, Select, FormControl, InputLabel 
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Chart from 'react-apexcharts';
import { useHistory } from 'react-router-dom';
import { addOutline, searchOutline, eyeOutline, trendingUpOutline, filterOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

// Import your constants
import { BREED_CHOICES, getBreedLabel } from '../constants/livestock';

const BeefDashboardComponent: React.FC<{ weights: any[] }> = ({ weights }) => {
  const theme = useTheme();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use "All" as a string value for the logic
  const [selectedBreed, setSelectedBreed] = useState('All');

  // --- Logic: Aggregate Average ADG per Date (Filtered by breed code) ---
  const dailyStats = useMemo(() => {
    return weights.reduce((acc: any, curr) => {
      // Filter logic using the breed code (value)
      if (selectedBreed !== 'All' && curr.breed !== selectedBreed) return acc;

      const date = curr.date;
      if (!acc[date]) acc[date] = { totalAdg: 0, count: 0 };
      acc[date].totalAdg += curr.adg || 0;
      acc[date].count += 1;
      return acc;
    }, {});
  }, [weights, selectedBreed]);

  const sortedDates = Object.keys(dailyStats).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const chartSeries = [{
    name: `${selectedBreed === 'All' ? 'Herd' : getBreedLabel(selectedBreed)} Avg ADG`,
    data: sortedDates.map(date => ({
      x: new Date(date).getTime(),
      y: parseFloat((dailyStats[date].totalAdg / dailyStats[date].count).toFixed(2))
    }))
  }];

  const chartOptions: ApexCharts.ApexOptions = {
    chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
    stroke: { curve: 'smooth', width: 3 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    colors: [theme.palette.primary.main],
    xaxis: { type: 'datetime', labels: { style: { fontSize: '10px', fontWeight: 600 } } },
    yaxis: { 
      title: { text: 'ADG (kg/day)', style: { fontWeight: 600 } },
      labels: { formatter: (val) => `${val}kg` }
    },
    tooltip: { x: { format: 'dd MMM yyyy' } },
    dataLabels: { enabled: false },
    markers: { size: 4, strokeWidth: 2 }
  };

  // --- Filtered Rows for the Table ---
  const filteredRows = weights.filter(w => {
    const label = getBreedLabel(w.breed).toLowerCase();
    const tag = w.animal_tag.toLowerCase();
    const search = searchTerm.toLowerCase();
    return tag.includes(search) || label.includes(search);
  });

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'animal_tag', headerName: 'Tag #', flex: 1, minWidth: 100 },
    { 
      field: 'breed', 
      headerName: 'Breed', 
      width: 150, 
      renderCell: (p) => getBreedLabel(p.value) // Transform code to Label
    },
    { field: 'weight_kg', headerName: 'Weight (kg)', width: 110, type: 'number' },
    { 
      field: 'adg', 
      headerName: 'ADG (kg/d)', 
      width: 100,
      renderCell: (p) => (
        <Typography fontWeight={800} color={p.value > 0.8 ? 'success.main' : 'warning.main'}>
          {p.value}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Options',
      width: 110,
      renderCell: (params) => (
        <Button 
          variant="outlined" 
          size="small" 
          onClick={() => history.push(`/animal/${params.row.animal_id || params.row.id}`)}
          sx={{ borderRadius: '20px', textTransform: 'none' }}
        >
          View
        </Button>
      )
    }
  ];

  return (
    <Stack spacing={4}>
      {/* Header Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="overline" color="text.secondary" fontWeight={900}>
          Beef Console
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<IonIcon icon={addOutline} />}
          onClick={() => history.push("/add-weight")}
          sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 'bold' }}
        >
          New Entry
        </Button>
      </Box>

      {/* Chart Section */}
      <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #f0f0f0' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} mb={3}>
          <Typography variant="h6" fontWeight="bold">Growth Velocity Trend</Typography>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Filter Breed</InputLabel>
            <Select
              value={selectedBreed}
              label="Filter Breed"
              onChange={(e) => setSelectedBreed(e.target.value)}
              sx={{ borderRadius: '10px' }}
              startAdornment={<IonIcon icon={filterOutline} style={{ marginRight: 8 }} />}
            >
              <MenuItem value="All">All Breeds</MenuItem>
              {BREED_CHOICES.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        
        <Chart options={chartOptions} series={chartSeries} type="area" height={350} />
      </Paper>

      {/* Table Section */}
      <Box>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">Herd Logs</Typography>
          <TextField 
            size="small"
            placeholder="Search tag or breed..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: '100%', md: '300px' }, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><IonIcon icon={searchOutline} /></InputAdornment>,
            }}
          />
        </Stack>

        <Paper sx={{ height: 500, borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
          <DataGrid 
            rows={filteredRows} 
            columns={columns} 
            getRowId={(row) => row.id}
            initialState={{ 
              sorting: { sortModel: [{ field: 'date', sort: 'desc' }] },
              pagination: { paginationModel: { pageSize: 10 } } 
            }}
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </Stack>
  );
};

export default BeefDashboardComponent;