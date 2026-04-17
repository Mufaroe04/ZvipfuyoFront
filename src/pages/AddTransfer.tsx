import React, { useState, useMemo } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, useIonLoading, useIonToast, IonIcon 
} from '@ionic/react';
import { Container, Box, Typography, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { arrowBackOutline } from 'ionicons/icons';
import { RootState } from '../redux/store';
import api from '../services/api';
import TransferForm from '../components/TransferForm';

interface Animal {
  id: number;
  tag_number: string;
  status?: string; // Added to support filtering
}

const AddTransfer: React.FC = () => {
  const history = useHistory();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();
  
  // Access animals from Redux store
  const { animals } = useSelector((state: RootState) => state.livestock);

  // Filter for active animals only
  const availableAnimals = useMemo(() => {
    return animals.filter((animal: Animal) => animal.status === 'active');
  }, [animals]);

  const [selectedAnimals, setSelectedAnimals] = useState<Animal[]>([]);
  const [formData, setFormData] = useState({
    transfer_type: 'internal',
    from_herd: '',
    to_herd: '',
    external_destination: '',
    truck_reg_number: '',
    driver_name: '',
    vet_permit_number: '',
    police_clearance_ref: '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedAnimals.length === 0) {
      presentToast({ message: 'Please select at least one animal', color: 'warning', duration: 2000 });
      return;
    }

    await presentLoading('Initiating transfer...');
    try {
      await api.post('transfers/', {
        ...formData,
        animals: selectedAnimals.map(a => a.id),
        status: 'pending'
      });
      presentToast({ message: 'Transfer request created', duration: 2000, color: 'success' });
      history.goBack();
    } catch (err) {
      presentToast({ message: 'Error initiating transfer', duration: 2000, color: 'danger' });
    } finally {
      dismissLoading();
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
              <IonIcon icon={arrowBackOutline} />
            </IconButton>
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>New Transfer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="sm">
          <Box sx={{ my: 3, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="bold">Digital Kraal Transfer</Typography>
            <Typography variant="body2" color="text.secondary">
              Select animals from your active herd and provide movement details.
            </Typography>
          </Box>

          <TransferForm 
            availableAnimals={availableAnimals}
            selectedAnimals={selectedAnimals}
            onAnimalsChange={setSelectedAnimals}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSave}
          />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddTransfer;