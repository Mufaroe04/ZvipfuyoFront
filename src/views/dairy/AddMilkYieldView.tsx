import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon } from '@ionic/react';
import { Container, IconButton } from '@mui/material';
import { arrowBackOutline } from 'ionicons/icons';
import { useMilkYield } from './hooks/useMilkYield';
import { MilkYieldForm } from './components/MilkYieldForm';

const AddMilkYieldView: React.FC = () => {
  const { formData, setFormData, loading, handleSubmit,history } = useMilkYield();

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
          <MilkYieldForm data={formData}  loading={loading} onChange={setFormData} onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }} />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddMilkYieldView;