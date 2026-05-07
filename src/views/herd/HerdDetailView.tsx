// import React, { useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { Box, Typography, Button, Stack, Divider, Paper, Alert } from '@mui/material';
// import { 
//   IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonTitle 
// } from '@ionic/react';
// import { addOutline } from 'ionicons/icons';
// import { IonIcon } from '@ionic/react';
// import { fetchHerdById } from '../../redux/store/slices/livestockSlice';
// import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
// import { AnimalListGrid } from '../livestock/components/AnimalListGrid';

// export const HerdDetailView: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useAppDispatch();
//   const history = useHistory();
  
//   const { selectedHerd, loading } = useAppSelector((state) => state.livestock);
//   const { user } = useAppSelector((state) => state.auth);
//   const isPrivileged = user?.profile?.role === 'owner' || user?.profile?.role === 'manager';

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchHerdById(Number(id)));
//     }
//   }, [id, dispatch]);

//   if (loading || !selectedHerd) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonBackButton defaultHref="/herds" />
//           </IonButtons>
//           <IonTitle>Herd Info</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="ion-padding">
//         {/* Top Information Section */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 1 }}>
//           <Box>
//             <Typography variant="body1" fontWeight="bold">{selectedHerd.name}</Typography>
//             <Typography variant="body2" color="text.secondary">{selectedHerd.location} • {selectedHerd.herd_type}</Typography>
//           </Box>
//           {isPrivileged && (
//             <Button 
//               variant="contained" 
//               disableElevation
//               onClick={() => history.push(`/herds/${id}/add-animal`)}
//               startIcon={<IonIcon icon={addOutline} />}
//               sx={{ 
//                 borderRadius: '8px', 
//                 textTransform: 'none', 
//                 fontWeight: 'bold', 
//                 backgroundColor: "#18774c",
//                 // fontFamily: '"Plus Jakarta Sans", sans-serif',
//                 '&:hover': { backgroundColor: "#145c3b" }
//               }}
//             >
//               Register Animal
//             </Button>
//           )}
//         </Box>

//         {/* Stats Ribbon */}
//         <Paper elevation={0} sx={{ p: 1, mb: 1, bgcolor: '#ffffff', borderRadius: '4px' }}>
//           <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
//             <Box><Typography variant="caption" fontWeight="bold">TOTAL</Typography><Typography variant="h5">{selectedHerd.total_cattle}</Typography></Box>
//             <Box><Typography variant="caption" fontWeight="bold">COWS</Typography><Typography variant="h5">{selectedHerd.cows_count}</Typography></Box>
//             <Box><Typography variant="caption" fontWeight="bold">BULLS</Typography><Typography variant="h5">{selectedHerd.bulls_count}</Typography></Box>
//             <Box><Typography variant="caption" fontWeight="bold">SICK</Typography><Typography variant="h5">{selectedHerd.sick_count}</Typography></Box>
//             <Box><Typography variant="caption" fontWeight="bold">PREGNANT</Typography><Typography variant="h5">{selectedHerd.pregnant_count}</Typography></Box>
//           </Stack>
//         </Paper>

//         {/* Conditional Alert banner for sick counts */}
//         {selectedHerd.sick_count > 0 && (
//           <Alert severity="warning" sx={{ mb: 1 }}>
//             There are {selectedHerd.sick_count} animals requiring health checks.
//           </Alert>
//         )}


//         {/* Our new, reusable table component takes care of searching, permissions and columns */}
//         <AnimalListGrid animals={selectedHerd?.animals || []} />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default HerdDetailView;
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

const HerdDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { selectedHerd, loading } = useAppSelector((state) => state.livestock);
  const isPrivileged = useAppSelector((state) => state.auth.user?.profile?.role === 'owner');

  useEffect(() => { if (id) dispatch(fetchHerdById(Number(id))); }, [id, dispatch]);

  if (loading || !selectedHerd) return <LoadingSpinner />;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar><IonButtons slot="start"><IonBackButton defaultHref="/herds" /></IonButtons><IonTitle>Herd Info</IonTitle></IonToolbar>
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
        
        {selectedHerd.sick_count > 0 && <Alert severity="warning" sx={{ mb: 1 }}>Health checks required.</Alert>}
        
        <AnimalListGrid animals={selectedHerd?.animals || []} />
      </IonContent>
    </IonPage>
  );
};
export default HerdDetailView;