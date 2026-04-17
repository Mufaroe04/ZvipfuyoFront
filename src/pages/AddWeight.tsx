import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, IconButton 
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { arrowBackOutline } from 'ionicons/icons';
import { IconButton as MuiIconButton } from '@mui/material';
import AddWeightComponent from '../components/AddWeightComponent';

const AddWeight: React.FC = () => {
  const history = useHistory();
  
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <MuiIconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
              <IonIcon icon={arrowBackOutline} />
            </MuiIconButton>
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Log Weight</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <AddWeightComponent />
      </IonContent>
    </IonPage>
  );
};

export default AddWeight;