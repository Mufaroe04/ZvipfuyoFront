import React from 'react';
import { Paper, Stack, Typography, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import Chart from 'react-apexcharts';
import { IonIcon } from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
import { BREED_CHOICES } from '../../../constants/livestock';

interface Props {
  series: any[];
  breed: string;
  onBreedChange: (val: string) => void;
}

const BeefGrowthChart: React.FC<Props> = ({ series, breed, onBreedChange }) => {
  const theme = useTheme();

  const options: ApexCharts.ApexOptions = {
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

  return (
    <Paper sx={{ p: 1, borderRadius: '4px', border: '1px solid #f0f0f0' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} mb={3}>
        <Typography variant="body1" fontWeight="bold">Growth Velocity Trend</Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter Breed</InputLabel>
          <Select
            value={breed}
            label="Filter Breed"
            onChange={(e) => onBreedChange(e.target.value)}
            sx={{ borderRadius: '4px' }}
            startAdornment={<IonIcon icon={filterOutline} style={{ marginRight: 8 }} />}
          >
            <MenuItem value="All">All Breeds</MenuItem>
            {BREED_CHOICES.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Chart options={options} series={series} type="area" height={350} />
    </Paper>
  );
};

export default BeefGrowthChart;