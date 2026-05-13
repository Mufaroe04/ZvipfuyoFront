import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,  } from '@ionic/react';
import { HealthListGrid } from './components/HealthListGrid';
import ClinicalBanner from './components/ClinicalBanner';

const HealthAndTreatmentsView: React.FC = () => {
 

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Health & Treatments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <ClinicalBanner/>
        <HealthListGrid  />
      </IonContent>
    </IonPage>
  );
};

export default HealthAndTreatmentsView;