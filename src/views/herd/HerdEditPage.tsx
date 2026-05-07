import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonPage, 
  IonTitle, 
  IonToolbar,
} from '@ionic/react';
import { UserRole } from '../../types/types';
import HerdEdit from './components/HerdEdit';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { arrowBackOutline } from 'ionicons/icons';

interface MyHerdsProps {
  userRole?: UserRole | null;
}
const MyHerds: React.FC <MyHerdsProps> = () => {
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
          <IonTitle>Edit Herd </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <HerdEdit />
      </IonContent>
    </IonPage>
  );
};

export default MyHerds;