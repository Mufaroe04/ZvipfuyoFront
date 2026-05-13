import React from 'react';
import { scaleOutline, fitnessOutline, heartOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { Box, Typography, Button, Chip, Stack, Container, Paper } from '@mui/material';
import { PregnancyAlertBanner } from './PregnancyAlertBanner';
import { AnimalMetricsRibbon } from './AnimalMetricsRibbon';
import { LineageCard } from './LineageCard';
import WeightGrowthChart from '../../../components/WeightGrowthChart';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { HealthListGrid } from '../../healthy&treatments/components/HealthListGrid';
import { ReproductionListGrid } from '../../reproduction/components/ReproductionListGrid';
import { useAnimalView } from '../hooks/useAnimalView';

const AnimalContainer : React.FC = () => {
   const { id,history,selectedAnimal,loading}=useAnimalView()

  if (loading || !selectedAnimal) return <LoadingSpinner  />;
    return(
        <Container maxWidth="lg">
          <PregnancyAlertBanner 
            animal={selectedAnimal} 
            onRegisterBirth={() => history.push(`/animal/${id}/register-birth`)} 
          />
          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body1" fontWeight="bold">Tag: {selectedAnimal.tag_number}</Typography>
                <Chip 
                  label={selectedAnimal.reproductive_status === 'pregnant' ? 'Pregnant' : selectedAnimal.status_display} 
                  color={selectedAnimal.status_display === 'Sick' ? 'error' : 'success'}
                  sx={{ fontWeight: 'bold' }} 
                />
              </Stack>
              <Typography color="text.secondary" variant="body1">{selectedAnimal.breed} • {selectedAnimal.gender}</Typography>
            </Box>
            <Button variant="contained" onClick={() => history.push(`/animal/edit/${id}`)} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }}>
              Edit Profile
            </Button>
          </Box>

          <LineageCard animal={selectedAnimal} />
          
          <AnimalMetricsRibbon animal={selectedAnimal} />
         <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>Growth Performance</Typography>
              <Paper sx={{ p: 1, height: 400, borderRadius: '4px', border: '1px solid #ececec' }} elevation={0}>
                <WeightGrowthChart 
                  records={selectedAnimal.weights || []} 
                  birthWeight={selectedAnimal.birth_weight}
                  birthDate={selectedAnimal.date_of_birth}
                />
              </Paper>

              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>Clinical History</Typography>
              <HealthListGrid 
                records={selectedAnimal.health_records || []} 
                loading={loading}
              />

                   {selectedAnimal.gender?.toLowerCase() === 'female' && (
              <Box >
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>Reproduction & Breeding</Typography>
                <ReproductionListGrid 
                  events={selectedAnimal.breeding_history || []} 
                  loading={loading} 
                />
              </Box>
            )}
          {/* Charts & Records Section */}
  

          {/* Global Actions */}
          <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 1 }} justifyContent="center">
            <Button variant="outlined" startIcon={<IonIcon icon={scaleOutline} />} onClick={() => history.push('/weights/add')}>Log Weight</Button>
            <Button variant="outlined" startIcon={<IonIcon icon={fitnessOutline} />} onClick={() => history.push('/health/add')}>Log Health</Button>
            <Button variant="outlined" startIcon={<IonIcon icon={heartOutline} />} onClick={() => history.push("/reproduction/add")}>Log Breeding</Button>
          </Stack>
          
        </Container>
    )
}
export default AnimalContainer;