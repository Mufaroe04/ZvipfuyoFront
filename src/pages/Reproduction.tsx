import React, { useEffect } from 'react';
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, 
  IonPage, IonTitle, IonToolbar, IonText, IonFab, IonFabButton, IonIcon, IonBadge 
} from '@ionic/react';
import { 
  Container, Typography, Box, Paper, Stack, Grid, Chip, Divider 
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { addOutline, heartOutline, calendarOutline, statsChartOutline } from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchBreedingHistory, fetchUpcomingCalvings } from '../redux/store/slices/reproductionSlice';

const Reproduction: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, upcomingCalvings, loading } = useAppSelector((state) => state.reproduction);

  useEffect(() => {
    dispatch(fetchBreedingHistory());
    dispatch(fetchUpcomingCalvings());
  }, [dispatch]);

  const columns: GridColDef[] = [
    { 
      field: 'breeding_date', 
      headerName: 'Date', 
      width: 130,
      renderCell: (p) => <Typography variant="body2" fontWeight="bold">{p.value}</Typography>
    },
    { 
      field: 'animal_tag', // Assuming your serializer returns the tag for display
      headerName: 'Dam (Cow)', 
      width: 150 
    },
    { 
      field: 'type', 
      headerName: 'Method', 
      width: 130,
      renderCell: (p) => (
        <Chip 
          label={p.value === 'AI' ? 'Artificial' : 'Natural'} 
          size="small" 
          variant="outlined" 
          color="secondary"
        />
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (p) => {
        const colors: Record<string, "success" | "warning" | "error" | "default"> = {
          'confirmed': 'success',
          'pending': 'warning',
          'failed': 'error'
        };
        return <Chip label={p.value.toUpperCase()} size="small" color={colors[p.value] || 'default'} />;
      }
    },
    { 
      field: 'expected_calving_date', 
      headerName: 'Exp. Calving', 
      flex: 1,
      renderCell: (p) => p.value ? (
        <Typography variant="body2" color="primary.main" fontWeight="medium">
          {p.value}
        </Typography>
      ) : '-'
    },
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle>Breeding & Calving</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <Container maxWidth="lg">
          
          {/* Header */}
          <Box sx={{ mb: 4, mt: 2 }}>
            {/* <Typography variant="h4" fontWeight="bold" gutterBottom>Breeding & Calving</Typography> */}
            <Typography color="text.secondary">Track inseminations, pregnancy checks, and expected births.</Typography>
          </Box>

          {/* Quick Stats & Upcoming Calvings */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec', bgcolor: '#fbfbfb' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">Upcoming Calvings</Typography>
                  <IonBadge color="primary">{upcomingCalvings.length} Expected</IonBadge>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                {upcomingCalvings.length > 0 ? (
                   <Stack spacing={2}>
                     {upcomingCalvings.slice(0, 3).map((event) => (
                       <Stack key={event.id} direction="row" justifyContent="space-between" alignItems="center">
                         <Box>
                           <Typography variant="subtitle2" fontWeight="bold">{event.animal_tag}</Typography>
                           <Typography variant="caption" color="text.secondary">Expected: {event.expected_calving_date}</Typography>
                         </Box>
                         <Chip icon={<IonIcon icon={calendarOutline} />} label="View Details" size="small" clickable />
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
                <IonIcon icon={heartOutline} style={{ fontSize: '3rem', color: '#ff4961', marginBottom: '10px' }} />
                <Typography variant="h4" fontWeight="bold">{events.filter(e => e.status === 'confirmed').length}</Typography>
                <Typography variant="overline" color="text.secondary">Confirmed Pregnancies</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Breeding History Table */}
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Breeding History</Typography>
          <Paper elevation={0} sx={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={events}
                columns={columns}
                loading={loading}
                pageSizeOptions={[10, 20]}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                disableRowSelectionOnClick
                sx={{ border: 0 }}
              />
            </Box>
          </Paper>

        </Container>

        {/* Floating Action Button for Adding Event */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/reproduction/add">
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Reproduction;