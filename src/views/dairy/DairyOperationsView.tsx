import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonSpinner, IonIcon } from '@ionic/react';
import { Box, Typography, Stack, Tabs, Tab, Paper, FormControl, InputLabel, Select, MenuItem, Container } from '@mui/material';
import { waterOutline, statsChartOutline, calendarOutline } from 'ionicons/icons';
import { useDairyData } from './hooks/useDairyData';
import { BREED_CHOICES } from '../../constants/livestock';
import DairyTabContent from './components/DairyTabContent';
import { getYieldColumns, getQualityColumns, getLactationColumns } from './components/dashboardConfig';

const DairyOperationsView: React.FC = () => {

  const { 
    yieldSeries, qualitySeries, lactationDistribution,filteredQuality, 
    milkYields,filteredYields,filteredLactations, 
    loading, selectedBreed, setSelectedBreed,handleDryOff,history,tabValue,
    setTabValue
  } = useDairyData();

  if (loading && milkYields.length === 0) {
    return <Box display="flex" justifyContent="center" py={10}><IonSpinner name="crescent" /></Box>;
  }
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
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} mb={1}>
            <Typography variant="body1" fontWeight="bold">Production Intelligence</Typography>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filter Breed</InputLabel>
              <Select value={selectedBreed} label="Filter Breed" onChange={(e) => setSelectedBreed(e.target.value)} sx={{ borderRadius: '4px', bgcolor: 'white' }}>
                <MenuItem value="All">All Breeds</MenuItem>
                {BREED_CHOICES.map((opt) => <MenuItem key={opt.value} value={opt.value}> <Typography variant='body2'> {opt.label} </Typography></MenuItem>)}
              </Select>
            </FormControl>
          </Stack>

          <Paper elevation={0}  sx={{borderRadius: '4px', mb: 1, overflow: 'hidden',  }}>
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