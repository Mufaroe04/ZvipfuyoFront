import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonLoading, IonToast 
} from '@ionic/react';
import { Box, Paper } from '@mui/material';

import { useRegisterAnimal } from './hooks/useRegisterAnimal';
import { RegistrationForm } from './components/RegistrationForm';

const RegisterAnimalView: React.FC = () => {
  const {
    formData, herds, potentialMothers, loading, toastMsg, 
    setToastMsg, herdId, handleChange, handleMotherChange, handleSubmit
  } = useRegisterAnimal();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={herdId ? `/herds/${herdId}` : "/animals"} />
          </IonButtons>
          <IonTitle>Register Animal</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, mb: 4 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #e0e0e0' }}>
            <RegistrationForm 
              formData={formData}
              herds={herds}
              potentialMothers={potentialMothers}
              herdId={herdId}
              onChange={handleChange}
              onMotherChange={handleMotherChange}
              onSubmit={handleSubmit}
            />
          </Paper>
        </Box>

        <IonLoading isOpen={loading} message="Registering animal..." />
        <IonToast 
          isOpen={!!toastMsg} 
          message={toastMsg} 
          duration={3000} 
          color="dark"
          onDidDismiss={() => setToastMsg('')} 
        />
      </IonContent>
    </IonPage>
  );
};

export default RegisterAnimalView;