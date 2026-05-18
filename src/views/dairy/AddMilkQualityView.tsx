

import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon } from '@ionic/react';
import { Container, Box, Typography, IconButton } from '@mui/material';
import { arrowBackOutline } from 'ionicons/icons';
import { useMilkQuality } from './hooks/useMilkQuality';
import { MilkQualityForm } from './components/MilkQualityForm';

const AddMilkQualityView: React.FC = () => {
  const { formData, setFormData, animals, loading, submitForm ,history } = useMilkQuality();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IconButton onClick={() => history.goBack()}><IonIcon icon={arrowBackOutline} /></IconButton>
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Milk Quality</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <Container maxWidth="sm">
          <Box sx={{ mb: 4, mt: 4 }}><Typography variant="h5" fontWeight="bold">Quality Audit</Typography></Box>
          <MilkQualityForm data={formData}  loading={loading} onChange={setFormData} onSubmit={(e) => { e.preventDefault(); submitForm(); }} />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddMilkQualityView;