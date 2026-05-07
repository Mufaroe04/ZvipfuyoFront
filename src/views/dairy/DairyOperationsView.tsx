// import { 
//   IonButtons, 
//   IonContent, 
//   IonHeader, 
//   IonMenuButton, 
//   IonPage, 
//   IonTitle, 
//   IonToolbar 
// } from '@ionic/react';
// import DairyDashboard from '../../components/DairyDashboard';

// const DairyOperationsView: React.FC = () => {
//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>Dairy Operations</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen>
//         {/* Notice we don't use ion-padding here if the Dashboard 
//           component already has its own padding (p: 3). 
//         */}
//         <DairyDashboard />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default DairyOperationsView;
import React, { useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonSpinner, IonIcon } from '@ionic/react';
import { Box, Typography, Stack, Tabs, Tab, Paper, FormControl, InputLabel, Select, MenuItem, Container } from '@mui/material';
import { waterOutline, statsChartOutline, calendarOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useDairyData } from './hooks/useDairyData';
import { useAppDispatch } from '../../redux/hooks';
import { updateLactationPeriodDryOff } from '../../redux/store/slices/operationsSlice';
import { BREED_CHOICES } from '../../constants/livestock';
import DairyTabContent from './components/DairyTabContent';
import { getYieldColumns, getQualityColumns, getLactationColumns } from './components/dashboardConfig';

const DairyOperationsView: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState(0);
  const { 
    yieldSeries, qualitySeries, lactationDistribution, 
    milkYields, milkQuality, lactations, 
    loading, selectedBreed, setSelectedBreed 
  } = useDairyData();

  const handleDryOff = (id: number) => {
    if (window.confirm("Mark this animal as Dry?")) {
      dispatch(updateLactationPeriodDryOff({ id }));
    }
  };

  if (loading && milkYields.length === 0) {
    return <Box display="flex" justifyContent="center" py={10}><IonSpinner name="crescent" /></Box>;
  }

  const filteredYields = milkYields.filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
  const filteredQuality = milkQuality.filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
  const filteredLactations = lactations.filter(r => selectedBreed === 'All' || r.breed === selectedBreed);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle>Dairy Operations</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} mb={3}>
            <Typography variant="h5" fontWeight="bold">Production Intelligence</Typography>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filter Breed</InputLabel>
              <Select value={selectedBreed} label="Filter Breed" onChange={(e) => setSelectedBreed(e.target.value)} sx={{ borderRadius: '12px', bgcolor: 'white' }}>
                <MenuItem value="All">All Breeds</MenuItem>
                {BREED_CHOICES.map((opt) => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>

          <Paper sx={{ borderRadius: '16px', mb: 3, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
            <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} variant="fullWidth">
              <Tab icon={<IonIcon icon={waterOutline} />} label="Yield" />
              <Tab icon={<IonIcon icon={statsChartOutline} />} label="Quality" />
              <Tab icon={<IonIcon icon={calendarOutline} />} label="Lactation" />
            </Tabs>
          </Paper>

          {tabValue === 0 && (
            <DairyTabContent 
              title="Yield Trends" series={yieldSeries} colors={['#3880ff']} yLabel="Liters"
              rows={filteredYields} columns={getYieldColumns()} 
              actionLabel="Add Yield" onAction={() => history.push("/dairy/milk-yield/add")}
            />
          )}
          {tabValue === 1 && (
            <DairyTabContent 
              title="Quality Trends" series={qualitySeries} colors={['#2dd36f', '#3880ff']} yLabel="%"
              rows={filteredQuality} columns={getQualityColumns()} 
              actionLabel="Add Quality" onAction={() => history.push("/dairy/milk-quality/add")}
            />
          )}
          {tabValue === 2 && (
            <DairyTabContent 
              title="Herd Distribution" series={[{ name: 'Head Count', data: lactationDistribution }]} 
              type="bar" colors={['#2dd36f', '#3880ff', '#ffc409', '#eb445a']} yLabel="Heads"
              rows={filteredLactations} columns={getLactationColumns(handleDryOff)} 
              actionLabel="Add Lactation" onAction={() => history.push("/dairy/milk-lactation/add")}
            />
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default DairyOperationsView;