import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useAppSelector } from '../redux/hooks';

export const ActionPlanCard: React.FC = () => {
  const { insights_data } = useAppSelector((state: any) => state.insights);
  const planText = typeof insights_data?.narrative === 'object' 
    ? insights_data.narrative.executiveActionPlan 
    : 'Action plan unavailable.';

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 3, 
        backgroundColor: '#156943', 
        color: '#FFFFFF', 
        borderRadius: '8px', 
        mb: 4 
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle2" sx={{ color: '#C7D2FE', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Intelligence Console
        </Typography>
        <Typography variant="caption" sx={{ backgroundColor: '#4338CA', px: 1.5, py: 0.5, borderRadius: '4px', fontWeight: 600 }}>
          Live Narrative
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: '#FFFFFF' }}>
        Dynamic AI Action Plan
      </Typography>
      <Typography variant="body1" component="div" sx={{ color: '#E0E7FF', lineHeight: 1.7 }}>
        <ReactMarkdown>{planText || ''}</ReactMarkdown>
      </Typography>
    </Paper>
  );
};