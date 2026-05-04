import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
} from '@ionic/react';
import HerdList from '../../components/herd/HerdList';
import { UserRole } from '../../types/types';
// import './MyHerds.css';

interface MyHerdsProps {
  userRole?: UserRole | null;
}
const MyHerds: React.FC <MyHerdsProps> = () => {

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            {/* The missing piece of the puzzle! */}
            <IonMenuButton />
          </IonButtons>
          <IonTitle>My Herds</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <HerdList />
      </IonContent>
    </IonPage>
  );
};

export default MyHerds;