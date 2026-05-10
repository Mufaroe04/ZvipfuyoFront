import React from 'react';
import { Paper, Typography } from '@mui/material';
import Chart from 'react-apexcharts';

interface Props {
  series: any[];
}

const MarketPriceChart: React.FC<Props> = ({ series }) => {
  const options: ApexCharts.ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { 
      bar: { 
        borderRadius: 8, 
        distributed: true,
        columnWidth: '50%'
      } 
    },
    xaxis: { 
      type: 'category',
      labels: { style: { fontWeight: 600 } }
    },
    yaxis: {
      title: { text: 'Price per KG ($)' }
    },
    legend: { show: false },
    dataLabels: {
      enabled: true,
      formatter: (val) => `$${val}`
    }
  };

  return (
    <Paper sx={{ p: 1, borderRadius: '4px', bgcolor: '#f9fafb', border: '1px solid #f0f0f0' }}>
      <Typography variant="subtitle1" fontWeight={700} mb={2}>Market Price Comparison</Typography>
      <Chart options={options} series={series} type="bar" height={300} />
    </Paper>
  );
};

export default MarketPriceChart;