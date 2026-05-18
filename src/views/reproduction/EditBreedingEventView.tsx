import React from 'react';
import { IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { arrowBackOutline } from 'ionicons/icons';
import { IconButton } from '@mui/material';
import EditBreedingEventForm from './components/EditBreedingEventForm';

const EditBreedingEventView: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IconButton onClick={() => history.goBack()}><IonIcon icon={arrowBackOutline} /></IconButton>
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Edit Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <EditBreedingEventForm />
      </IonContent>
    </IonPage>
  );
};
export default EditBreedingEventView;