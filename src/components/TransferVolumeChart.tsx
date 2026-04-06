import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Box, Typography, Stack } from '@mui/material';
import Chart from 'react-apexcharts';
import { selectMonthlyTransferStats } from '../redux/store/slices/operationsSlice';
import { IonIcon } from '@ionic/react';
import { analyticsOutline } from 'ionicons/icons';
import { ApexOptions } from 'apexcharts';

const TransferVolumeChart: React.FC = () => {
  const data = useSelector(selectMonthlyTransferStats);
  
  // Extracting categories and values for ApexCharts format
  const categories = data.map(item => item.name);
  const seriesData = data.map(item => item.value);

  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '45%',
        distributed: true, // This allows different colors for each bar
      },
    },
    dataLabels: { enabled: false },
    colors: ['#3880ff', '#2dd36f', '#eb445a', '#ffc409', '#92949c'],
    xaxis: {
      categories: categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: '#666', fontSize: '12px' }
      }
    },
    yaxis: {
      labels: {
        style: { colors: '#666', fontSize: '12px' }
      }
    },
    grid: {
      borderColor: '#f1f1f1',
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val) => `${val} Head`
      }
    },
    legend: { show: false },
  };

  const series = [{
    name: 'Transfers',
    data: seriesData
  }];

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: '16px', height: '400px' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h6" fontWeight="800">Transfer Volume</Typography>
          <Typography variant="caption" color="text.secondary">
            {currentMonthName} 2026 Activity
          </Typography>
        </Box>
        <Box sx={{ 
          bgcolor: 'rgba(56, 128, 255, 0.1)', 
          p: 1, 
          borderRadius: '10px', 
          display: 'flex', 
          alignItems: 'center' 
        }}>
          <IonIcon icon={analyticsOutline} style={{ fontSize: '20px', color: '#3880ff' }} />
        </Box>
      </Stack>

      <Box sx={{ width: '100%', height: '300px' }}>
        <Chart 
          options={options} 
          series={series} 
          type="bar" 
          height="100%" 
        />
      </Box>
    </Paper>
  );
};

export default TransferVolumeChart;