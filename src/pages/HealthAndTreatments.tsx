import React, { useEffect, useState } from 'react';
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, 
  IonPage, IonTitle, IonToolbar, IonIcon 
} from '@ionic/react';
import { Container, Typography, Box, Paper, Stack, Grid, Button } from '@mui/material';
import { cashOutline, addOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchHealthRecords } from '../redux/store/slices/operationsSlice';
import HealthRecordsTable from '../components/HealthRecordsTable';

const HealthAndTreatments: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { healthRecords, loading } = useAppSelector((state) => state.operations);

  useEffect(() => {
    dispatch(fetchHealthRecords());
  }, [dispatch]);

  const totalInvestment = healthRecords.reduce((sum, r) => sum + (+r.cost || 0), 0);

  const filteredRecords = healthRecords.filter(r => 
    r.condition.toLowerCase().includes(searchText.toLowerCase()) ||
    r.treatment.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle 
          // style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}
          >Health & Treatments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <Container maxWidth="lg">
          
          {/* Header Section */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Box>
              <Typography variant="h5" fontWeight="bold" >Clinical Records</Typography>
              <Typography variant="body2" color="text.secondary">Tracking medical history and expenses</Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />}
              onClick={() => history.push("/health/add")}
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none', 
                fontWeight: 'bold', 
                bgcolor: '#18774c',
                // fontFamily: 'Plus Jakarta Sans',
                '&:hover': { bgcolor: '#14633f' }
              }}
            >
              New Record
            </Button>
          </Stack>

          {/* Metrics Summary */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#f4f5f8', borderRadius: '12px', border: '1px solid #ececec' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1, bgcolor: 'white', borderRadius: '8px', display: 'flex', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <IonIcon icon={cashOutline} style={{ fontSize: '1.5rem', color: '#18774c' }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary">TOTAL HEALTH SPEND</Typography>
                    <Typography variant="h6" fontWeight="bold" >
                      ${totalInvestment.toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          {/* Table Component */}
          <HealthRecordsTable 
            records={filteredRecords}
            loading={loading}
            searchText={searchText}
            onSearchChange={setSearchText}
          />

        </Container>
      </IonContent>
    </IonPage>
  );
};

export default HealthAndTreatments;