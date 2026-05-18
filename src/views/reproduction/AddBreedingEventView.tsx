// import React from 'react';
// import { 
//   IonButtons, 
//   IonContent, 
//   IonHeader, 
//   IonIcon, 
//   IonPage, 
//   IonTitle, 
//   IonToolbar,
// } from '@ionic/react';
// import { useHistory } from "react-router-dom";
// import { arrowBackOutline } from 'ionicons/icons';
// import { IconButton } from '@mui/material';
// import AddBreedingEventComponent from './components/AddBreedingEventComponent';

// const AddBreedingEvent: React.FC = () => {
//   const history = useHistory();

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
//               <IonIcon icon={arrowBackOutline} />
//             </IconButton>
//           </IonButtons>
//           <IonTitle style={{ fontWeight: 700 }}>Log Breeding</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen className="ion-padding">
//         <AddBreedingEventComponent />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default AddBreedingEvent;

import React from 'react';
import { IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { arrowBackOutline } from 'ionicons/icons';
import { IconButton } from '@mui/material';
import AddBreedingEventForm from './components/AddBreedingEventForm';

const AddBreedingEventView: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IconButton onClick={() => history.goBack()}><IonIcon icon={arrowBackOutline} /></IconButton>
          </IonButtons>
          <IonTitle>Log Breeding</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <AddBreedingEventForm />
      </IonContent>
    </IonPage>
  );
};
export default AddBreedingEventView;