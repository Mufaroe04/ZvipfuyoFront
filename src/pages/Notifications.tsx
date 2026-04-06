import React, { useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonMenuButton, IonList, IonItem, IonLabel, IonBadge, IonIcon, 
  IonItemSliding, IonItemOptions, IonItemOption, IonSpinner, IonRefresher, IonRefresherContent
} from '@ionic/react';
import { 
  notificationsOutline, checkmarkDoneOutline, alertCircleOutline, 
  warningOutline, megaphoneOutline, arrowForwardOutline 
} from 'ionicons/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store'; // Adjust paths as needed
import { fetchNotifications, markNotificationRead } from '../redux/store/slices/notificationSlice';
import { Typography, Box, Container, Chip, Paper, IconButton } from '@mui/material';
import NotificationBell from '../components/NotificationBell';

const Notifications: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const { items, loading, unreadCount } = useSelector((state: RootState) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleRefresh = async (event: CustomEvent) => {
    await dispatch(fetchNotifications());
    event.detail.complete();
  };

  const handleAction = (id: number, link?: string) => {
    dispatch(markNotificationRead(id));
    if (link) history.push(link);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'danger': return '#d32f2f';
      case 'warning': return '#ed6c02';
      case 'info': return '#0288d1';
      default: return '#757575';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'danger': return alertCircleOutline;
      case 'warning': return warningOutline;
      default: return megaphoneOutline;
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle>System Alerts</IonTitle>
          <IonButtons slot="end">
            {/* <IonIcon icon={notificationsOutline} />
            <IonBadge color="danger" style={{ marginRight: '10px' }}>{}{unreadCount}</IonBadge> */}
            <NotificationBell />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <Container maxWidth="sm">
          <Box sx={{ mb: 3, mt: 2 }}>
            <Typography variant="h5" fontWeight="bold">Action Required</Typography>
            <Typography variant="body2" color="text.secondary">
              Swipe left on an alert to dismiss it.
            </Typography>
          </Box>

          {loading && items.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <IonSpinner name="crescent" />
            </Box>
          ) : items.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '20px', bgcolor: '#fbfbfb' }} variant="outlined">
              <IonIcon icon={notificationsOutline} style={{ fontSize: '48px', color: '#ccc' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>All clear!</Typography>
              <Typography variant="body2" color="text.secondary">No unread notifications at the moment.</Typography>
            </Paper>
          ) : (
            <IonList mode="ios" style={{ background: 'transparent' }}>
              {items.map((n) => (
                <IonItemSliding key={n.id}>
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
                        borderRadius: '16px', 
                        borderLeft: `6px solid ${getLevelColor(n.level)}`,
                        display: 'flex',
                        alignItems: 'flex-start'
                      }}
                    >
                      <Box sx={{ mr: 2, mt: 0.5 }}>
                        <IonIcon icon={getLevelIcon(n.level)} style={{ fontSize: '24px', color: getLevelColor(n.level) }} />
                      </Box>
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">{n.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{n.message}</Typography>
                        <Typography variant="caption" color="text.disabled">
                          {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      </Box>

                      {n.link_to_route && (
                        <IconButton size="small" onClick={() => handleAction(n.id, n.link_to_route)}>
                          <IonIcon icon={arrowForwardOutline} />
                        </IconButton>
                      )}
                    </Paper>
                  </IonItem>

                  <IonItemOptions side="end">
                    <IonItemOption 
                      color="success" 
                      sx={{ borderRadius: '16px', margin: '5px' }}
                      onClick={() => dispatch(markNotificationRead(n.id))}
                    >
                      <IonIcon slot="icon-only" icon={checkmarkDoneOutline} />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              ))}
            </IonList>
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;