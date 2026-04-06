import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
} from '@ionic/react';
import HerdList from '../components/HerdList';
// import './MyHerds.css';

const MyHerds: React.FC = () => {
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
        <HerdList/>
      </IonContent>
    </IonPage>
  );
};

export default MyHerds;