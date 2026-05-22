import React from 'react';
import { 
  IonItemSliding, IonItem, IonItemOptions, IonItemOption, IonIcon 
} from '@ionic/react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import { checkmarkDoneOutline, arrowForwardOutline } from 'ionicons/icons';

interface NotificationItemData {
  id: number;
  title: string;
  message: string;
  level: string;
  created_at: string;
  link_to_route?: string;
}

interface NotificationCardProps {
  notification: NotificationItemData;
  levelColor: string;
  levelIcon: string;
  onAction: (id: number, link?: string) => void;
  onDismiss: (id: number) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  levelColor,
  levelIcon,
  onAction,
  onDismiss
}) => {
const formattedTime = new Date(notification.created_at).toLocaleString([], {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

  return (
    <IonItemSliding>
      <IonItem 
        className="ion-no-padding" 
        lines="none" 
        style={{ '--background': 'transparent', marginBottom: '12px' }}
      >
        <Paper 
          elevation={0} 
          variant="outlined"
          sx={{ 
            width: '100%', 
            p: 2, 
            borderRadius: '4px', 
            borderLeft: `6px solid ${levelColor}`,
            display: 'flex',
            alignItems: 'flex-start'
          }}
        >
          <Box sx={{ mr: 2, mt: 0.5 }}>
            <IonIcon icon={levelIcon} style={{ fontSize: '24px', color: levelColor }} />
          </Box>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold">{notification.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {notification.message}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {formattedTime}
            </Typography>
          </Box>

          {notification.link_to_route && (
            <IconButton 
              size="small" 
              onClick={() => onAction(notification.id, notification.link_to_route)}
            >
              <IonIcon icon={arrowForwardOutline} />
            </IconButton>
          )}
        </Paper>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption 
          color="success" 
          style={{ borderRadius: '16px', margin: '5px' }}
          onClick={() => onDismiss(notification.id)}
        >
          <IonIcon slot="icon-only" icon={checkmarkDoneOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default NotificationCard;