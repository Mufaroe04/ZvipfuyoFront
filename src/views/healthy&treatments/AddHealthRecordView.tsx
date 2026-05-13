import React from 'react';
import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonPage, 
  IonTitle, 
  IonToolbar,
} from '@ionic/react';
import { useHistory } from "react-router-dom";
import { arrowBackOutline } from 'ionicons/icons';
import { IconButton } from '@mui/material';
import AddHealthRecord from './components/AddHealthRecord';


const AddHealthRecordView: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
              <IonIcon icon={arrowBackOutline} />
            </IconButton>
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }} >
            Log Treatment
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <AddHealthRecord />
      </IonContent>
    </IonPage>
  );
};

export default AddHealthRecordView;