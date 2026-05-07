import React from 'react';
import { Box, Stack, Typography, Divider, Paper } from '@mui/material';

export const HerdMetricsRibbon: React.FC<{ data: any }> = ({ data }) => (
  <Paper elevation={0} sx={{ p: 1, mb: 1, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
    <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
      <Box><Typography variant="caption" fontWeight="bold">TOTAL</Typography><Typography variant="h5">{data.total_cattle}</Typography></Box>
      <Box><Typography variant="caption" fontWeight="bold">COWS</Typography><Typography variant="h5">{data.cows_count}</Typography></Box>
      <Box><Typography variant="caption" fontWeight="bold">SICK</Typography><Typography variant="h5" color="error">{data.sick_count}</Typography></Box>
      <Box><Typography variant="caption" fontWeight="bold">PREG</Typography><Typography variant="h5">{data.pregnant_count}</Typography></Box>
    </Stack>
  </Paper>
);