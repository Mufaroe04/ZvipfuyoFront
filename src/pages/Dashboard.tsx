import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonText 
} from '@ionic/react';
import DashboardComponent from '../components/DashboardComponent';
import NotificationBell from '../components/NotificationBell'; // Ensure path is correct
// import './Dashboard.css';

const Dashboard: React.FC = () => {

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            {/* The missing piece of the puzzle! */}
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            {/* The Bell is now positioned in the start slot (left corner) */}
            <NotificationBell />
          </IonButtons>
          <IonTitle>Zvipfuyo Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Zvipfuyo zvako</IonTitle>
             
          </IonToolbar>
           <IonText>
               <p> Digital Kraal  </p>
              </IonText>
        </IonHeader>
        <DashboardComponent/>
      </IonContent>
    </IonPage>
  );
};



export default Dashboard;