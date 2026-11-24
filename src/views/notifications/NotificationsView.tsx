import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonMenuButton, IonList, IonSpinner, IonRefresher, IonRefresherContent,
  IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/react';
import { Typography, Box, Container } from '@mui/material';

import NotificationCard from './components/NotificationCard';
import NotificationEmptyState from './components/NotificationEmptyState';
import NotificationBell from '../../components/feedback/NotificationBell';
import { useNotificationList } from './hooks/useNotifactionList';

const NotificationsView: React.FC = () => {
  const {
    notifications,
    loading,
    hasMore,
    handleRefresh,
    handleAction,
    handleDismiss,
    getLevelColor,
    getLevelIcon,
    fetchNextPage
  } = useNotificationList();

  const handleInfiniteScroll = async (e: CustomEvent<void>) => {
    await fetchNextPage();
    (e.target as HTMLIonInfiniteScrollElement).complete();
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Notifications</IonTitle>
          <IonButtons slot="end">
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
            <Typography variant="body1" fontWeight="bold">Action Required</Typography>
            <Typography variant="body2" color="text.secondary">
              Swipe left on an alert to dismiss it.
            </Typography>
          </Box>

          {loading && notifications.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <IonSpinner name="crescent" />
            </Box>
          ) : notifications.length === 0 ? (
            <NotificationEmptyState />
          ) : (
            <IonList mode="ios" style={{ background: 'transparent' }}>
              {notifications.map((n) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  levelColor={getLevelColor(n.level)}
                  levelIcon={getLevelIcon(n.level)}
                  onAction={handleAction}
                  onDismiss={handleDismiss}
                />
              ))}
            </IonList>
          )}
        </Container>

        <IonInfiniteScroll
          threshold="150px"
          disabled={!hasMore}
          onIonInfinite={handleInfiniteScroll}
        >
          <IonInfiniteScrollContent 
            loadingSpinner="bubbles" 
            loadingText="Loading more tracking logs..." 
          />
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default NotificationsView;