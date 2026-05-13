import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { MainDashboard } from './MainDashboard';
import NotificationBell from '../../layout/NotificationBell';

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
          <IonTitle style={{ fontWeight: 700 }}>Zvipfuyo Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding" >
        <MainDashboard  />
      </IonContent>
    </IonPage>
  );
};

export default DashboardView;