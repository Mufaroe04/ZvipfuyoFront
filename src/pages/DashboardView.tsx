import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import { MainDashboard } from '../views/dashboards/MainDashboard';
import NotificationBell from '../layout/NotificationBell';

interface DashboardViewProps {
  userRole: 'owner' | 'manager' | 'hand' | 'vet';
}

const DashboardView: React.FC<DashboardViewProps> = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <NotificationBell />
          </IonButtons>
          <IonTitle>Zvipfuyo Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding" color="light">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Zvipfuyo zvako</IonTitle>
          </IonToolbar>
          <IonText>
            <p style={{ margin: '0 0 16px 12px', fontSize: '1rem', color: 'var(--ion-color-medium)' }}>
              Digital Kraal
            </p>
          </IonText>
        </IonHeader>

        {/* The single dashboard entry point with built-in role orchestration */}
        <MainDashboard  />
      </IonContent>
    </IonPage>
  );
};

export default DashboardView;