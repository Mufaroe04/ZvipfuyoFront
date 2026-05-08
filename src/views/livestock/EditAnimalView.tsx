// src/views/livestock/EditAnimalView.tsx
import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonLoading, IonToast 
} from '@ionic/react';
import { Box, Paper, CircularProgress } from '@mui/material';
import { useAnimalForm } from './hooks/useAnimalForm';
import { AnimalForm } from './components/AnimalForm';

const EditAnimalView: React.FC = () => {
  const {
    formData, herds, potentialMothers, loading,
     fetching, isEditMode,potentialFathers,isSubmitting,
    toastMsg, setToastMsg, herdId, handleChange,goBack,
     handleMotherChange, handleSubmit,handleFatherChange,

  } = useAnimalForm();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/animals" />
          </IonButtons>
          <IonTitle>Edit Animal</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, mb: 4 }}>
          {fetching ? (
            <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>
          ) : (
            <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #e0e0e0' }}>
            <AnimalForm 
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
              goBack={goBack}
            />
            </Paper>
          )}
        </Box>

        <IonLoading isOpen={loading} message="Updating record..." />
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

export default EditAnimalView;