import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import DairyDashboard from '../components/DairyDashboard';

const DairyOperations: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dairy Operations</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Notice we don't use ion-padding here if the Dashboard 
          component already has its own padding (p: 3). 
        */}
        <DairyDashboard />
      </IonContent>
    </IonPage>
  );
};

export default DairyOperations;