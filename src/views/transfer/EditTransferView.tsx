// import React from 'react';
// import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon } from '@ionic/react';
// import { Container, Box, IconButton } from '@mui/material';
// import { useHistory } from 'react-router-dom';
// import { arrowBackOutline } from 'ionicons/icons';
// import { useTransferFormLogic } from './hooks/useTransferFormLogic';
// import TransferForm from './components/TransferForm';

// const EditTransferView: React.FC = () => {
//   const history = useHistory();
//   const hook = useTransferFormLogic();

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
//               <IonIcon icon={arrowBackOutline} />
//             </IconButton>
//           </IonButtons>
//           <IonTitle style={{ fontWeight: 700 }}>Modify Transfer</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="ion-padding">
//         <Container maxWidth="sm">
//           <Box sx={{ mt: 2, mb: 4 }}>
//             <TransferForm
//               title="Update Movement Manifest"
//               // onAnimalsChange={hook.setSelectedAnimals}
//               formData={hook.formData}
//               setFormData={hook.setFormData}
//               onSubmit={hook.handleSubmit}
//             />
//           </Box>
//         </Container>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default EditTransferView;
// src/views/logistics/EditTransferView.tsx
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon } from '@ionic/react';
import { Container, Box, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { arrowBackOutline } from 'ionicons/icons';
import { useTransferFormLogic } from './hooks/useTransferFormLogic';
import TransferForm from './components/TransferForm';

const EditTransferView: React.FC = () => {
  const history = useHistory();
  const hook = useTransferFormLogic();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
              <IonIcon icon={arrowBackOutline} />
            </IconButton>
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Modify Transfer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="sm">
          <Box sx={{ mt: 2, mb: 4 }}>
            <TransferForm
              title="Digital Kraal Transfer"
              animalsValue={hook.selectedAnimals}
              onAnimalsChange={hook.setSelectedAnimals}
              formData={hook.formData}
              herdsList={hook.herdsList}
              handleInputChange={hook.handleInputChange}
              onSubmit={hook.handleSubmit}
            />
          </Box>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default EditTransferView;