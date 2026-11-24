import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon } from '@ionic/react';
import { Container, IconButton } from '@mui/material';
import { arrowBackOutline } from 'ionicons/icons';
import { useLactation } from './hooks/useLactation';
import { LactationForm } from './components/LactationForm';

const AddLactationView: React.FC = () => {
  const { formData, setFormData, loading, handleSubmit,history } = useLactation();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
              <IonIcon icon={arrowBackOutline} />
            </IconButton>
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Milk Lactation Cycles</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <Container maxWidth="sm">
          <LactationForm 
            data={formData} 
            loading={loading} 
            onChange={setFormData}
            onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}
          />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddLactationView;