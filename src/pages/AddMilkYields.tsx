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
import AddMilkYieldsComponent from '../components/AddMilkYieldsComponent';


const AddMilkYields: React.FC = () => {
      const history = useHistory();
    
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            {/* The missing piece of the puzzle! */}
            {/* <IonMenuButton /> */}
            <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
          <IonIcon icon={arrowBackOutline} />
        </IconButton>
          </IonButtons>
  
          <IonTitle>Milk Quality </IonTitle>
        
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <AddMilkYieldsComponent/>
      </IonContent>
    </IonPage>
  );
};



export default AddMilkYields;