import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useAppSelector } from '../redux/hooks';

export const SummaryHeader: React.FC = () => {
  const { insights_data } = useAppSelector((state: any) => state.insights);
  const date = insights_data?.date || insights_data?.weather?.current_date || 'N/A';

  return (
    <Box mb={3} mt={1}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#111827', letterSpacing: '-0.025em' }}>
        Farm Intelligence Summary: Dual-Enterprise Console
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#4B5563', mt: 0.5, fontWeight: 500 }}>
        <strong>Date:</strong> {date} | <strong>Enterprise Focus:</strong> Integrated Beef Fattening & Dairy Operations
      </Typography>
      <Divider sx={{ mt: 3, mb: 1, borderColor: '#E5E7EB', borderWidth: '1px' }} />
    </Box>
  );
};