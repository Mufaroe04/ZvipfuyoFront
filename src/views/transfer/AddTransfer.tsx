import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonIcon
} from '@ionic/react';
import { Container, Box, Typography, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { arrowBackOutline } from 'ionicons/icons';
import TransferForm from './components/TransferForm';
import { useTransferFormLogic } from './hooks/useTransferFormLogic'; // Paths adapted to your structure

const AddTransfer: React.FC = () => {
  const history = useHistory();
  const { formData, setFormData, handleSubmit, isEditMode } = useTransferFormLogic();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
              <IonIcon icon={arrowBackOutline} />
            </IconButton>
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>
            {isEditMode ? 'Edit Pipeline Manifest' : 'New Transfer'}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="sm">
          <Box sx={{ my: 3, textAlign: 'center'}}>
            <Typography variant="h5" fontWeight="bold">Digital Kraal Transfer</Typography>
            <Typography variant="body2" color="text.secondary">
              Select animals from your active herd and provide movement details.
            </Typography>
          </Box>

          <TransferForm
            title={isEditMode ? "Modify Active Manifest" : "Initiate Livestock Record"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddTransfer;