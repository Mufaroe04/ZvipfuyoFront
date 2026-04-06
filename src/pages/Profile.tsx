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
// import './Profile.css';

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* The missing piece of the puzzle! */}
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Zvipfuyo</IonTitle>
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
        
        <IonText>
          <h2>Profile My Cow</h2>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Profile;