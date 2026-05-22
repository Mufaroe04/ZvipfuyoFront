import React from 'react';
import { Typography, Paper } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { notificationsOutline } from 'ionicons/icons';

const NotificationEmptyState: React.FC = () => {
  return (
    <Paper 
      sx={{ p: 4, textAlign: 'center', borderRadius: '20px', bgcolor: '#fbfbfb' }} 
      variant="outlined"
    >
      <IonIcon icon={notificationsOutline} style={{ fontSize: '48px', color: '#ccc' }} />
      <Typography variant="h6" sx={{ mt: 2 }}>All clear!</Typography>
      <Typography variant="body2" color="text.secondary">
        No unread notifications at the moment.
      </Typography>
    </Paper>
  );
};

export default NotificationEmptyState;