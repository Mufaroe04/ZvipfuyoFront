
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
// import AddLactationComponent from '../../components/dairy/AddLactationComponent';


// const AddLactationView: React.FC = () => {
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
  
//           <IonTitle>Milk Lactation Cycles </IonTitle>
        
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen className="ion-padding">
//         <AddLactationComponent/>
//       </IonContent>
//     </IonPage>
//   );
// };



// export default AddLactationView;
import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon } from '@ionic/react';
import { Container, Box, Typography, IconButton } from '@mui/material';
import { arrowBackOutline } from 'ionicons/icons';
import { useLactation } from './hooks/useLactation';
import { LactationForm } from './components/LactationForm';

const AddLactationView: React.FC = () => {
  const { formData, setFormData, animals, loading, submitForm,history } = useLactation();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
              <IonIcon icon={arrowBackOutline} />
            </IconButton>
          </IonButtons>
          <IonTitle>Milk Lactation Cycles</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <Container maxWidth="sm">
          <Box sx={{ mb: 4, mt: 4 }}>
            <Typography variant="h5" fontWeight="bold">New Lactation Period</Typography>
            <Typography color="text.secondary">Start a new production cycle (Calving)</Typography>
          </Box>
          
          <LactationForm 
            data={formData} 
            animals={animals} 
            loading={loading} 
            onChange={setFormData}
            onSubmit={(e) => { e.preventDefault(); submitForm(); }}
          />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddLactationView;