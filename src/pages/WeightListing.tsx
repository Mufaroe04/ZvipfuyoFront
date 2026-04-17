import React, { useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonIcon 
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeights } from '../redux/store/slices/operationsSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Typography, Box, Stack, Button, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import WeightListingComponent from '../components/WeightListingComponent';

const WeightListing: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const { weights, loading } = useSelector((state: RootState) => state.operations);

  useEffect(() => {
    dispatch(fetchWeights());
  }, [dispatch]);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Weight Logs</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, mt: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight="bold">Growth Monitor</Typography>
              <Typography variant="body2" color="text.secondary">Digital Kraal weight gain records</Typography>
            </Box>

            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />}
              onClick={() => history.push("/weights/add")}
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none', 
                fontWeight: 'bold', 
                bgcolor: '#18774c',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#14633f', boxShadow: 'none' }
              }}
            >
              New Weight
            </Button>
          </Stack>

          <WeightListingComponent weights={weights} loading={loading} />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default WeightListing;