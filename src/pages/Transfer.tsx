import React, { useEffect } from 'react';
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
  IonTitle, IonToolbar, IonIcon, useIonLoading, useIonToast 
} from '@ionic/react';
import { Container, Box, Typography, Button, Stack } from '@mui/material';
import { addOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchTransfers } from '../redux/store/slices/operationsSlice';
import { operationsService } from '../services/operationsService';
import TransferTable from '../components/TransferTable';

const Transfer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  const { transfers, loading } = useSelector((state: RootState) => state.operations);

  useEffect(() => {
    dispatch(fetchTransfers());
  }, [dispatch]);

  const handleDispatch = async (id: number) => {
    await presentLoading('Dispatching vehicle...');
    try {
      await operationsService.dispatchTransfer(id);
      presentToast({ message: 'Vehicle Dispatched.', duration: 2000, color: 'success' });
      dispatch(fetchTransfers());
    } catch (err) {
      presentToast({ message: 'Dispatch failed.', duration: 2000, color: 'danger' });
    } finally {
      dismissLoading();
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Ownership Transfers</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, mt: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight="bold">Movement Logs</Typography>
              <Typography variant="body2" color="text.secondary">
                Manage sales, movements, and traditional transfers
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />}
              onClick={() => history.push('/operations/add-transfer')}
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none', 
                fontWeight: 'bold', 
                bgcolor: '#18774c',
                '&:hover': { bgcolor: '#14633f' }
              }}
            >
              New Transfer
            </Button>
          </Stack>

          <TransferTable 
            transfers={transfers} 
            loading={loading} 
            onDispatch={handleDispatch} 
          />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Transfer;