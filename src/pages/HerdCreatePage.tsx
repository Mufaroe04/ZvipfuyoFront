import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
} from '@ionic/react';
import HerdAdd from '../components/HerdAdd';
import { useHistory } from "react-router-dom";
import { arrowBackOutline } from 'ionicons/icons';
import { IconButton } from '@mui/material';


const HerdCreatePage: React.FC = () => {
      const history = useHistory();
    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* The missing piece of the puzzle! */}
            {/* <IonMenuButton /> */}
            <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
          <IonIcon icon={arrowBackOutline} />
        </IconButton>
          </IonButtons>
  
          <IonTitle>Register Herd</IonTitle>
        
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <HerdAdd/>
      </IonContent>
    </IonPage>
  );
};



export default HerdCreatePage;