import React from 'react';
import { Box, Typography, Paper, TextField, Grid, InputAdornment } from '@mui/material';
import Chart from 'react-apexcharts';
import { MarketPrice } from '../types/types';

interface MarketConfigProps {
  prices: MarketPrice[];
  onUpdate: (id: number, price: number) => void;
}

const MarketConfigComponent: React.FC<MarketConfigProps> = ({ prices, onUpdate }) => {
  const barOptions: ApexCharts.ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, distributed: true } },
    xaxis: { categories: prices.map(p => p.breed) },
    legend: { show: false }
  };

  const barSeries = [{
    name: 'Price/KG',
    data: prices.map(p => p.price_per_kg)
  }];

  return (
    <Box>
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight={800} gutterBottom>Live Market Config</Typography>
            <Grid container spacing={2}>
                {prices.map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                    <Typography variant="caption" fontWeight={700} color="primary">{item.breed}</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        margin="dense"
                        defaultValue={item.price_per_kg}
                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                        onBlur={(e) => onUpdate(item.id, parseFloat(e.target.value))}
                    />
                    </Paper>
                </Grid>
                ))}
            </Grid>
        </Grid>
        
        {/* Market Visualizer */}
        <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, borderRadius: 4, bgcolor: '#f9fafb' }}>
                <Typography variant="subtitle2" fontWeight={700} mb={1}>Price Comparison</Typography>
                <Chart options={barOptions} series={barSeries} type="bar" height={200} />
            </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarketConfigComponent;