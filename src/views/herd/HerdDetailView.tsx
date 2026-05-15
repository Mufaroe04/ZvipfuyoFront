
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Box, Typography, Button, Alert } from '@mui/material';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonTitle, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { fetchHerdById } from '../../redux/store/slices/livestockSlice';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { AnimalListGrid } from '../livestock/components/AnimalListGrid';
import { HerdMetricsRibbon } from './components/HerdMetricsRibbon';
import { useAnimalList } from '../livestock/hooks/useAnimalList';

const HerdDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { selectedHerd, loading } = useAppSelector((state) => state.livestock);
  const isPrivileged = useAppSelector((state) => state.auth.user?.profile?.role === 'owner');
  const animalHookData = useAnimalList(selectedHerd?.animals || [], undefined, 'client');
  useEffect(() => { if (id) dispatch(fetchHerdById(Number(id))); }, [id, dispatch]);

  if (loading || !selectedHerd) return <LoadingSpinner />;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar><IonButtons slot="start"><IonBackButton defaultHref="/herds" /></IonButtons><IonTitle style={{ fontWeight: 700 }}>Herd Info</IonTitle></IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="body1" fontWeight="bold">{selectedHerd.name}</Typography>
            <Typography variant="body2" color="text.secondary">{selectedHerd.location}</Typography>
          </Box>
          {isPrivileged && (
            <Button variant="contained" onClick={() => history.push(`/herds/${id}/add-animal`)} startIcon={<IonIcon icon={addOutline} />} sx={{ bgcolor: "#18774c" }}>Register Animal</Button>
          )}
        </Box>
        
        <HerdMetricsRibbon data={selectedHerd} />
        
        {selectedHerd.sick_count > 0 && <Alert severity="warning" sx={{ mb: 1 }}>Health checks required you have {selectedHerd.sick_count} cattle that needs attention</Alert>}
        
        {/* <AnimalListGrid animals={selectedHerd?.animals || []} /> */}
        <AnimalListGrid 
        {...animalHookData} 
        paginationMode="client" 
      />
      </IonContent>
    </IonPage>
  );
};
export default HerdDetailView;