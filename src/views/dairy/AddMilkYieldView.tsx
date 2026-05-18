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
// import AddMilkYieldsComponent from '../../components/dairy/AddMilkYieldsComponent';


// const AddMilkYieldView: React.FC = () => {
//       const history = useHistory();
    
//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start">
//             {/* The missing piece of the puzzle! */}
//             {/* <IonMenuButton /> */}
//             <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
//           <IonIcon icon={arrowBackOutline} />
//         </IconButton>
//           </IonButtons>
  
//           <IonTitle>Milk Quality </IonTitle>
        
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen className="ion-padding">
//         <AddMilkYieldsComponent/>
//       </IonContent>
//     </IonPage>
//   );
// };



// export default AddMilkYieldView;

import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon } from '@ionic/react';
import { Container, IconButton } from '@mui/material';
import { arrowBackOutline } from 'ionicons/icons';
import { useMilkYield } from './hooks/useMilkYield';
import { MilkYieldForm } from './components/MilkYieldForm';

const AddMilkYieldView: React.FC = () => {
  const { formData, setFormData, loading, submitForm,history } = useMilkYield();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IconButton onClick={() => history.goBack()}><IonIcon icon={arrowBackOutline} /></IconButton>
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Milk Yield</IonTitle>
        </IonToolbar> 
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <Container maxWidth="sm">
          <MilkYieldForm data={formData}  loading={loading} onChange={setFormData} onSubmit={(e) => { e.preventDefault(); submitForm(); }} />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddMilkYieldView;