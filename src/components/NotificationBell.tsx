import React from 'react';
import { IonButtons, IonButton, IonIcon, IonBadge } from '@ionic/react';
import { notificationsOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../redux/store';
import { Box } from '@mui/material';

const NotificationBell: React.FC = () => {
  const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);
  const history = useHistory();

  return (
    <IonButtons slot="end">
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <IonButton onClick={() => history.push('/notifications')}>
          <IonIcon icon={notificationsOutline} />
        </IonButton>
        
        {unreadCount > 0 && (
          <IonBadge 
            color="danger" 
            style={{ 
              position: 'absolute', 
              top: '5px', 
              right: '5px', 
              fontSize: '10px',
              minWidth: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              // Simple Pulse Animation
              animation: unreadCount > 5 ? 'pulse 2s infinite' : 'none'
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </IonBadge>
        )}
      </Box>
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(235, 68, 90, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(235, 68, 90, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(235, 68, 90, 0); }
        }
      `}</style>
    </IonButtons>
  );
};

export default NotificationBell;