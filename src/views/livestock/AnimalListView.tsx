import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Box, Typography, Button, Chip, Stack, Container, Paper } from '@mui/material';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonTitle } from '@ionic/react';
import { fetchFullAnimalProfile } from '../../redux/store/slices/livestockSlice';
import { scaleOutline, fitnessOutline, heartOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

// Sub-components
import { PregnancyAlertBanner } from './components/PregnancyAlertBanner';
import { AnimalMetricsRibbon } from './components/AnimalMetricsRibbon';
import { LineageCard } from './components/LineageCard';
import WeightGrowthChart from '../../components/WeightGrowthChart';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { HealthListGrid } from '../../components/healthy&treatments/HealthListGrid';
import { ReproductionListGrid } from '../../components/reproduction/ReproductionListGrid';

const AnimalDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { selectedAnimal, loading } = useAppSelector((state) => state.livestock);

  useEffect(() => {
    if (id) dispatch(fetchFullAnimalProfile(Number(id)));
  }, [id, dispatch]);

  if (loading || !selectedAnimal) return <LoadingSpinner  />;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/animals" /></IonButtons>
          <IonTitle>Animal Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="lg">
          
          <PregnancyAlertBanner 
            animal={selectedAnimal} 
            onRegisterBirth={() => history.push(`/animal/${id}/register-birth`)} 
          />

          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h5" fontWeight="bold">Tag: {selectedAnimal.tag_number}</Typography>
                <Chip 
                  label={selectedAnimal.reproductive_status === 'pregnant' ? 'Pregnant' : selectedAnimal.status_display} 
                  color={selectedAnimal.status_display === 'Sick' ? 'error' : 'success'}
                  sx={{ fontWeight: 'bold' }} 
                />
              </Stack>
              <Typography color="text.secondary" variant="h6">{selectedAnimal.breed} • {selectedAnimal.gender}</Typography>
            </Box>
            <Button variant="contained" onClick={() => history.push(`/animal/${id}/edit`)} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }}>
              Edit Profile
            </Button>
          </Box>

          <LineageCard animal={selectedAnimal} />
          
          <AnimalMetricsRibbon animal={selectedAnimal} />
         <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Growth Performance</Typography>
              <Paper sx={{ p: 2, height: 400, borderRadius: '16px', border: '1px solid #ececec' }} elevation={0}>
                <WeightGrowthChart 
                  records={selectedAnimal.weights || []} 
                  birthWeight={selectedAnimal.birth_weight}
                  birthDate={selectedAnimal.date_of_birth}
                />
              </Paper>

              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Clinical History</Typography>
              <HealthListGrid 
                records={selectedAnimal.health_records || []} 
                loading={loading}
              />

                   {selectedAnimal.gender?.toLowerCase() === 'female' && (
              <Box >
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Reproduction & Breeding</Typography>
                <ReproductionListGrid 
                  events={selectedAnimal.breeding_history || []} 
                  loading={loading} 
                />
              </Box>
            )}
          {/* Charts & Records Section */}
  

          {/* Global Actions */}
          <Stack direction="row" spacing={2} sx={{ mt: 4, mb: 4 }} justifyContent="center">
            <Button variant="outlined" startIcon={<IonIcon icon={scaleOutline} />} onClick={() => history.push('/weights/add')}>Log Weight</Button>
            <Button variant="outlined" startIcon={<IonIcon icon={fitnessOutline} />} onClick={() => history.push('/health/add')}>Log Health</Button>
            <Button variant="outlined" startIcon={<IonIcon icon={heartOutline} />} onClick={() => history.push("/reproduction/add")}>Log Breeding</Button>
          </Stack>
          
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AnimalDetailView;