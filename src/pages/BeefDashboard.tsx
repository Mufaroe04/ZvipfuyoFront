import React, { useEffect, useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonButtons, IonMenuButton, IonIcon 
} from '@ionic/react';
import { barChartOutline, pricetagOutline } from 'ionicons/icons';
import { Box, Container, Paper, Tabs, Tab, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchWeights, fetchMarketPrices, updateMarketPrice } from '../redux/store/slices/operationsSlice';
import MarketConfigComponent from '../components/MarketConfigComponent';
import BeefDashboardComponent from '../components/BeefDashboardComponent';

const BeefOperations: React.FC = () => {
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState(0);
  const { weights, marketPrices, loading } = useAppSelector((state) => state.operations);

  useEffect(() => {
    dispatch(fetchWeights());
    dispatch(fetchMarketPrices());
  }, [dispatch]);

  if (loading && weights.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar sx={{ '--background': '#ffffff' }}>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle sx={{ fontWeight: 900 }}>Beef Operations</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': '#f8faf9' }}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          {/* Navigation Tabs */}
          <Paper sx={{ borderRadius: '12px', mb: 4, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <Tabs 
              value={tabValue} 
              onChange={(_, val) => setTabValue(val)} 
              sx={{ px: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 'bold', minHeight: 64 } }}
            >
              <Tab icon={<IonIcon icon={barChartOutline} style={{ marginRight: 8 }} />} iconPosition="start" label="Herd Performance" />
              <Tab icon={<IonIcon icon={pricetagOutline} style={{ marginRight: 8 }} />} iconPosition="start" label="Market Configuration" />
            </Tabs>
          </Paper>

          {/* Tab 0: Herd Analytics & Weights */}
          {tabValue === 0 && (
            <BeefDashboardComponent weights={weights} />
          )}

          {/* Tab 1: Market & Price History */}
          {tabValue === 1 && (
            <Box>
              <MarketConfigComponent 
                prices={marketPrices} 
                onUpdate={(id, price) => dispatch(updateMarketPrice({ id, price }))} 
              />
            </Box>
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default BeefOperations;