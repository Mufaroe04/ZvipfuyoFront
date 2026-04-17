import React, { useEffect } from 'react';
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, 
  IonPage, IonTitle, IonToolbar, IonIcon, IonBadge 
} from '@ionic/react';
import { 
  Container, Typography, Box, Paper, Stack, Grid, Chip, Divider, Button 
} from '@mui/material';
import { addOutline, heartOutline, calendarOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchBreedingHistory, fetchUpcomingCalvings } from '../redux/store/slices/reproductionSlice';
import ReproductionHistoryTable from '../components/ReproductionHistoryTable';

const Reproduction: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { events, upcomingCalvings, loading } = useAppSelector((state) => state.reproduction);

  useEffect(() => {
    dispatch(fetchBreedingHistory());
    dispatch(fetchUpcomingCalvings());
  }, [dispatch]);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Breeding & Calving</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <Container maxWidth="lg">
          
          {/* Header with MUI Button (Replaces IonFab) */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, mt: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight="bold">Reproduction Logs</Typography>
              <Typography variant="body2" color="text.secondary">Track inseminations and expected births</Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />}
              onClick={() => history.push("/reproduction/add")}
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none', 
                fontWeight: 'bold', 
                bgcolor: '#18774c',
                '&:hover': { bgcolor: '#14633f' }
              }}
            >
              Add Event
            </Button>
          </Stack>

          {/* Quick Stats & Upcoming Calvings */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec', bgcolor: '#fbfbfb' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">Upcoming Calvings</Typography>
                  <IonBadge color="success" style={{ padding: '5px 10px', borderRadius: '4px' }}>
                    {upcomingCalvings.length} Expected
                  </IonBadge>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                
                {upcomingCalvings.length > 0 ? (
                  <Stack spacing={2}>
                    {upcomingCalvings.slice(0, 3).map((event: any) => (
                      <Stack key={event.id} direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">{event.animal_tag}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Exp. Date: {event.expected_calving_date}
                          </Typography>
                        </Box>
                        <Chip 
                          icon={<IonIcon icon={calendarOutline} />} 
                          label="Details" 
                          size="small" 
                          clickable 
                          variant="outlined" 
                        />
                      </Stack>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">No calvings scheduled for the next 30 days.</Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#f4f5f8' }}>
                <IonIcon icon={heartOutline} style={{ fontSize: '3rem', color: '#eb445a', marginBottom: '10px' }} />
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#18774c' }}>
                  {events.filter((e: any) => e.status === 'confirmed').length}
                </Typography>
                <Typography variant="overline" color="text.secondary" fontWeight="bold">
                  Confirmed Pregnancies
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Table Section */}
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Breeding History</Typography>
          <ReproductionHistoryTable events={events} loading={loading} />

        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Reproduction;