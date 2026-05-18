import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useAppSelector } from '../../redux/hooks';
import { IonIcon } from '@ionic/react';
import { sparklesOutline } from 'ionicons/icons';

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
        // backgroundColor: '#156943', 
        // color: '#FFFFFF', 
        borderRadius: '8px', 
        mb: 4 
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
        <IonIcon icon={sparklesOutline} slot="start" style={{ 'color':'#18774c'  }} />
        <Typography variant="subtitle2" sx={{ marginBottom: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#18774c', }}>
           Zvipfuyo Intelligence
        </Typography>
      </Box>
 
      <Typography variant="body2" component="div" sx={{ lineHeight: 1.7,color:'#374151' }}>
        <ReactMarkdown>{planText || ''}</ReactMarkdown>
      </Typography>
    </Paper>
  );
};