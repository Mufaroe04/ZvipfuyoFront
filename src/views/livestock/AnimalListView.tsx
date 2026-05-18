import React from 'react';
import {  useAppSelector } from '../../redux/hooks';
import { useHistory, useLocation } from "react-router-dom";
import { Button, Box, Typography, Stack} from '@mui/material';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonIcon } from '@ionic/react';
import { addOutline, closeCircleOutline } from 'ionicons/icons';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { AnimalListGrid } from './components/AnimalListGrid';
import { useAnimalList } from './hooks/useAnimalList';

export const AnimalListView: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ filterIds?: number[], title?: string }>();

  const { animals, loading } = useAppSelector((state) => state.livestock);
  const { user } = useAppSelector((state) => state.auth);
  const isPrivileged = user?.profile?.role === 'owner' || user?.profile?.role === 'manager';
  const animalHookData = useAnimalList([], location.state?.filterIds, 'server');


  if (loading||!animals) {
    return <LoadingSpinner />;
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>{location.state?.title || 'My Animals'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Header & Filter Clear Action */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Box>
            {location.state?.filterIds ? (
              <Button 
                startIcon={<IonIcon icon={closeCircleOutline} />} 
                color="error" 
                size="small" 
                onClick={() => history.replace('/animals', {})} 
                sx={{ textTransform: 'none' }}
              >
                Clear Filter
              </Button>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {/* Total Stock: {animals?.length || 0} */}
              </Typography>
            )}
          </Box>
     
        </Stack>

        {/* Dynamic Summary Ribbon */}
        <Box  sx={{ p: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }} >
            <Box>
              <Typography variant="caption" fontWeight="bold" color="text.secondary">
                {location.state?.filterIds ? "FILTERED RESULT" : "FARM TOTAL"}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {animals?.count || 0} <small style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>Cattles</small>
              </Typography>
            </Box>
                 {isPrivileged && (
            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />} 
              onClick={() => history.push("/animals/add")}
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none', 
                fontWeight: 'bold', 
                backgroundColor: "#18774c",
                '&:hover': { backgroundColor: "#145c3b" }
              }}
            >
              New Animal
            </Button>
          )}
          </Stack>
        </Box>

        {/* <AnimalListGrid animals={animals || []} filterIds={location.state?.filterIds} /> */}
        <AnimalListGrid 
        {...animalHookData} 
        paginationMode="server" 
         />
      </IonContent>
    </IonPage>
  );
};

export default AnimalListView;