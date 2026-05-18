import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonLoading, IonToast 
} from '@ionic/react';
import { Box, Paper } from '@mui/material';

import { useAnimalForm } from './hooks/useAnimalForm';
import { AnimalForm } from './components/AnimalForm';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';

const RegisterAnimalView: React.FC = () => {
  const {
    formData, herds,loading, toastMsg,isFormValid,
    setToastMsg, herdId, handleChange, handleCustomTagChange, handleSubmit,isEditMode,goBack,isSubmitting
  } = useAnimalForm();

  if (loading||!herds) {
     return <LoadingSpinner />;
   } 

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={herdId ? `/herds/${herdId}` : "/animals"} />
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Register Animal</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, mb: 4 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #e0e0e0' }}>
            {/* <AnimalForm 
              formData={formData}
              herds={herds}
              potentialMothers={potentialMothers}
              potentialFathers={potentialFathers}
              herdId={herdId}
              onChange={handleChange}
              onMotherChange={handleMotherChange}
              onFatherChange={handleFatherChange}
              onSubmit={handleSubmit}
              isEditMode={isEditMode}
              isSubmitting={isSubmitting}
              isFormValid={isFormValid}
              goBack={goBack}
            /> */}
            <AnimalForm
              formData={formData}
              herds={herds.results}
              herdId={herdId}
              isEditMode={isEditMode}
              isSubmitting={isSubmitting}
              isFormValid={isFormValid}
              onChange={handleChange}
              onTagChange={handleCustomTagChange} // Ensure this maps to handleCustomTagChange from useAnimalForm
              onSubmit={handleSubmit}
              goBack={goBack}
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