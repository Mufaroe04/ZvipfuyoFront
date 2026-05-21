import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import FinanceDashboard from './FinanceDashboard';
const FinanceView: React.FC = () => {

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Sales and Finances Management</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding gray-bg">
        <FinanceDashboard 
        />
      </IonContent>
    </IonPage>
  );
};
export default FinanceView;