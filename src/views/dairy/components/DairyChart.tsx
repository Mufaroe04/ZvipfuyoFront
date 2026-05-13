import React from 'react';
import Chart from 'react-apexcharts';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { BREED_CHOICES } from '../../../constants/livestock';
import { useDairyData } from '../hooks/useDairyData';

interface DairyChartProps {
  series: any[];
  type: "area" | "bar";
  colors: string[];
  yLabel: string;
}

const DairyChart: React.FC<DairyChartProps> = ({ series, type, colors, yLabel }) => {
    const { 
       selectedBreed, setSelectedBreed
    } = useDairyData();
  const options: any = {
    chart: { toolbar: { show: false }, zoom: { enabled: false } },
    colors: colors,
    markers: { size: [4, 0] },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    stroke: { curve: 'smooth', width: type === 'bar' ? 0 : 3 },
    xaxis: type === 'bar' ? { type: 'category' } : { type: 'datetime' },
    yaxis: { title: { text: yLabel } },
    plotOptions: type === 'bar' ? { bar: { borderRadius: 6, columnWidth: '45%', distributed: true } } : {},
    dataLabels: { enabled: false },

  };

  return (
    <Box >
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} mb={3}>
          <Typography variant="body1" fontWeight="bold"></Typography>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Filter Breed</InputLabel>
            <Select value={selectedBreed} label="Filter Breed" onChange={(e) => setSelectedBreed(e.target.value)} sx={{ borderRadius: '4px', bgcolor: 'white' }}>
              <MenuItem value="All">All Breeds</MenuItem>
              {BREED_CHOICES.map((opt) => <MenuItem key={opt.value} value={opt.value}> <Typography variant='body2'> {opt.label} </Typography></MenuItem>)}
            </Select>
          </FormControl>
        </Stack>
      <Chart options={options} series={series} type={type} height="100%" elevation={0}/>
    </Box>
  );
};

export default DairyChart;