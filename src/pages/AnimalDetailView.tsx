
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  Box, Typography, Button, Chip, Stack, Paper, Grid, Container, Divider, 
  Alert
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { 
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonContent, IonSpinner, IonTitle 
} from '@ionic/react';
import { fetchFullAnimalProfile } from '../redux/store/slices/livestockSlice';
import { IonIcon } from '@ionic/react';
import { fitnessOutline, scaleOutline, leafOutline, calendarOutline, heartOutline,alertCircleOutline, timeOutline } from 'ionicons/icons';
import WeightGrowthChart from '../components/WeightGrowthChart'; // Your new component
import { gitBranchOutline } from 'ionicons/icons';

const AnimalDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { selectedAnimal, loading } = useAppSelector((state) => state.livestock);

  useEffect(() => {
    if (id) dispatch(fetchFullAnimalProfile(Number(id)));
  }, [id, dispatch]);
// 1. CALVING COUNTDOWN LOGIC
 // Change 'string | null' to 'string | null | undefined'
const getDaysToCalving = (dateString: string | null | undefined) => {
  if (!dateString) return null;
  const today = new Date();
  const calvingDate = new Date(dateString);
  const diffTime = calvingDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const daysRemaining = getDaysToCalving(selectedAnimal?.expected_calving_date);
const isOverdue = daysRemaining !== null && daysRemaining < 0;

// Define the constants first
const today = new Date();
const birthDate = selectedAnimal?.date_of_birth ? new Date(selectedAnimal.date_of_birth) : null;

const currentWeight = Number(selectedAnimal?.latest_weight || 0);
const birthWeight = Number(selectedAnimal?.birth_weight || 0);

// Calculate Efficiency safely
let efficiency = 0;
if (birthWeight > 0 && birthDate) {
  const diffTime = today.getTime() - birthDate.getTime();
  const daysOld = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const projectedWeight = birthWeight + (daysOld * 0.8); // 0.8kg/day target
  efficiency = Math.round((currentWeight / projectedWeight) * 100);
}

const hasWeightWarning = birthWeight > 0 && currentWeight < birthWeight;
  const healthColumns: GridColDef[] = [
    { field: 'treatment_date', headerName: 'Date', width: 120 },
    { field: 'condition', headerName: 'Diagnosis', flex: 1 },
    { field: 'treatment', headerName: 'Treatment', flex: 1 },
    { field: 'cost', headerName: 'Cost', flex: 1 },
    { field: 'follow_up_date', headerName: 'Follow up date', width: 110, renderCell: (p) => (
      <Chip label={p.value} size="small" color={p.value === 'Recovered' ? 'success' : 'warning'} />
    )},
  ];

  // BREEDING HISTORY COLUMNS
  const breedingColumns: GridColDef[] = [
    { field: 'breeding_date', headerName: 'Service Date', width: 130 },
    { field: 'type', headerName: 'Type', width: 100 }, // AI or Natural
    { field: 'sire_tag', headerName: 'Sire (Bull)', width: 120 },
    { field: 'expected_calving', headerName: 'Exp. Calving', width: 130 },
    { field: 'status', headerName: 'Status', flex: 1 },
  ];

  if (loading || !selectedAnimal) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="80vh">
        <IonSpinner name="crescent" color="primary" />
        <Typography sx={{ mt: 2 }}>Loading Animal Imfomation...</Typography>
      </Box>
    );
  }

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

          {/* 2. PREGNANCY & CALVING ALERT BANNER */}
          {selectedAnimal.reproductive_status === 'pregnant' && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                mb: 3, 
                bgcolor: isOverdue ? '#fff1f0' : '#fff9e6', 
                border: isOverdue ? '1px solid #ffa39e' : '1px solid #ffe58f', 
                borderRadius: '12px'
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1, bgcolor: isOverdue ? '#ff4d4f' : '#ffec3d', borderRadius: '50%', display: 'flex' }}>
                    <IonIcon icon={alertCircleOutline} style={{ fontSize: '1.2rem', color: isOverdue ? 'white' : '#874d00' }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: isOverdue ? '#cf1322' : '#874d00' }}>
                      {isOverdue ? 'ATTENTION: ANIMAL OVERDUE' : 'PREGNANCY DETECTED'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: isOverdue ? '#cf1322' : '#874d00' }}>
                      Expected Calving: <strong>{selectedAnimal.expected_calving_date}</strong>
                    </Typography>
                  </Box>
                </Stack>
                
                <Stack direction="row" spacing={3} alignItems="center">
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h5" fontWeight="black" sx={{ color: isOverdue ? '#cf1322' : '#d48806', lineHeight: 1 }}>
                      {isOverdue ? Math.abs(daysRemaining!) : daysRemaining}
                    </Typography>
                    <Typography variant="caption" fontWeight="bold" sx={{ color: isOverdue ? '#cf1322' : '#d48806' }}>
                      {isOverdue ? 'DAYS OVERDUE' : 'DAYS TO GO'}
                    </Typography>
                  </Box>

                  {/* REGISTER BIRTH BUTTON */}
                  <Button 
                    variant="contained" 
                    color={isOverdue ? "error" : "primary"}
                    size="small"
                    onClick={() => history.push(`/animal/${id}/register-birth`)}
                    sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }}
                  >
                    Register Birth
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          )}

          {/* Header Section */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h5" fontWeight="bold">Tag: {selectedAnimal.tag_number}</Typography>
                {/* Updated Chip to reflect Pregnancy status alongside Health */}
                <Chip 
                  label={selectedAnimal.reproductive_status === 'pregnant' ? 'Pregnant' : selectedAnimal.status_display} 
                  sx={{ 
                    bgcolor: selectedAnimal.reproductive_status === 'pregnant' ? '#7044ff' : (selectedAnimal.status_display === 'Sick' ? '#eb445a' : '#2dd36f'), 
                    color: 'white', 
                    fontWeight: 'bold' 
                  }} 
                />
              </Stack>
              <Typography color="text.secondary" variant="h6">{selectedAnimal.breed} • {selectedAnimal.gender}</Typography>
            </Box>
            <Button variant="contained" onClick={() => history.push(`/animal/${id}/edit`)} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }}>Edit Profile</Button>
          </Box>
          {/* Header Section */}
 
{/* 2. FAMILY LINEAGE SECTION (New) */}
          <Paper elevation={0} sx={{ p: 2, mb: 4, bgcolor: '#f8f9fa', borderRadius: '12px', border: '1px dotted #ccc' }}>
            <Stack direction="row" spacing={4} alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
              <Stack direction="row" spacing={1} alignItems="center">
                <IonIcon icon={gitBranchOutline} style={{ color: '#666' }} />
                <Typography variant="subtitle2" fontWeight="bold">LINEAGE:</Typography>
              </Stack>
              
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">FATHER (SIRE)</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {selectedAnimal.father_tag ? `Tag: ${selectedAnimal.father_tag}` : 'Unknown'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary" display="block">MOTHER (DAM)</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {selectedAnimal.mother_tag ? `Tag: ${selectedAnimal.mother_tag}` : 'Unknown'}
                </Typography>
              </Box>
            </Stack>
          </Paper>
          {/* Metrics Ribbon */}
          {hasWeightWarning && (
            <Alert 
              severity="error" 
              variant="outlined" 
              icon={<IonIcon icon={alertCircleOutline} />}
              sx={{ mb: 3, borderRadius: '12px', bgcolor: '#fff1f0', fontWeight: 'medium' }}
            >
              <strong>Critical Growth Alert:</strong> Current weight ({currentWeight}kg) has dropped below birth weight ({birthWeight}kg). This suggests severe illness or data entry error.
            </Alert>
          )}

          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              { label: 'WEIGHT', value: `${selectedAnimal?.latest_weight} kg`, icon: scaleOutline, color: '#3880ff' },
              { label: 'AGE', value: selectedAnimal.age, icon: calendarOutline, color: '#7044ff' },
              { 
                label: 'BREEDING', 
                // LOGIC: If status is deceased, force 'N/A', otherwise use reproductive_status
                value: selectedAnimal.status === 'deceased' ? 'N/A' : (selectedAnimal.reproductive_status || 'N/A'), 
                icon: heartOutline, 
                color: '#ff4961' 
                },
              { label: 'HERD', value: selectedAnimal.herd, icon: leafOutline, color: '#2dd36f' },
            ].map((stat, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#f4f5f8', borderRadius: '12px', border: '1px solid #ececec' }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ p: 1, bgcolor: 'white', borderRadius: '8px', display: 'flex' }}><IonIcon icon={stat.icon} style={{ fontSize: '1.5rem', color: stat.color }} /></Box>
                    <Box>
                      <Typography variant="caption" fontWeight="bold" color="text.secondary">{stat.label}</Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {stat.value === 'deceased' ? 'N/A' : stat.value}
                      </Typography>
                      {stat.label === 'WEIGHT' && efficiency > 0 && (
                        <Chip 
                          label={`${efficiency}%  Growth Target`} 
                          size="small"
                          color={efficiency >= 90 ? "success" : efficiency >= 75 ? "warning" : "error"} 
                          sx={{ height: 20, fontSize: '0.65rem', fontWeight: 'bold' }}
                        />
                      )}

                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Weight Chart Section */}
          <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: '12px', border: '1px solid #f0f0f0' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Weight Growth Curve</Typography>
            <Box sx={{ height: 300 }}>
              {/* <WeightGrowthChart records={selectedAnimal.weights || []} /> */}
              <WeightGrowthChart 
                records={selectedAnimal.weights || []} 
                birthWeight={selectedAnimal.birth_weight}
                birthDate={selectedAnimal.date_of_birth}
              />
            </Box>
          </Paper>

          {/* Detailed Records */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Health History</Typography>
              <Box sx={{ height: 350, bgcolor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                <DataGrid rows={selectedAnimal.health_records || []} columns={healthColumns} sx={{ border: 0 }} hideFooter />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Breeding Records</Typography>
              <Box sx={{ height: 350, bgcolor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                <DataGrid rows={selectedAnimal.breeding_history || []} columns={breedingColumns} sx={{ border: 0 }} hideFooter />
              </Box>
            </Grid>
          </Grid>

          {/* Quick Actions */}
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