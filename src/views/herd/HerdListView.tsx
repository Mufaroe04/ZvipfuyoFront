import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
} from '@ionic/react';
import HerdList from './components/HerdListGrid';
import { UserRole } from '../../types/types';
import { useHerdList } from './hooks/useHerdList';
// import './MyHerds.css';

interface MyHerdsProps {
  userRole?: UserRole | null;
}
const HerdListView: React.FC <MyHerdsProps> = () => {
const herdListData = useHerdList();
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            {/* The missing piece of the puzzle! */}
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>My Herds</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <HerdList {...herdListData} />
      </IonContent>
    </IonPage>
  );
};

export default HerdListView;