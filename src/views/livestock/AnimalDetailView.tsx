import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonTitle } from '@ionic/react';
import AnimalContainer from './components/AnimalContainer';


const AnimalDetailView: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/animals" /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Animal Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <AnimalContainer/>
      </IonContent>
    </IonPage>
  );
};

export default AnimalDetailView;