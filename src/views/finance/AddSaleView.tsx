// src/views/finance/AddSaleView.tsx
import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton
} from '@ionic/react';
import SalesForm from './components/SalesForm';

const AddSaleView: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/sales-expenses" />
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>New Sale Transaction</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding" style={{ '--background': '#fafafa' }}>
        <SalesForm />
      </IonContent>
    </IonPage>
  );
};

export default AddSaleView;