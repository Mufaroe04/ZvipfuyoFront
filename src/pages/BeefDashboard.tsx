import React, { useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonRefresher, 
  IonRefresherContent,
  RefresherEventDetail, 
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import { Box, Typography, Divider, CircularProgress, Container, Grid, useTheme, useMediaQuery, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchWeights, fetchMarketPrices, updateMarketPrice } from '../redux/store/slices/operationsSlice';
import MarketConfigComponent from '../components/MarketConfigComponent';
import BeefDashboardComponent from '../components/BeefDashboardComponent';

const BeefDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  
  // Detect screen size for adaptive styling
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const { weights, marketPrices, loading } = useAppSelector((state) => state.operations);

  const loadData = () => {
    dispatch(fetchWeights());
    dispatch(fetchMarketPrices());
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    loadData();
    setTimeout(() => event.detail.complete(), 1000);
  };

  return (
    <IonPage>
      {/* Header stays pinned, but adjusts padding for desktop */}
      <IonHeader className="ion-no-border">
        <IonToolbar sx={{ '--background': '#ffffff', px: isDesktop ? 4 : 0 }}>
        <IonButtons slot="start"><IonMenuButton /></IonButtons>
            
          <IonTitle sx={{ fontWeight: 900, fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
            Zvipfuyo Analytics
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': '#f4f7f6' }}>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <Container 
          maxWidth={false} 
          sx={{ 
            py: { xs: 2, md: 5 }, 
            px: { xs: 2, md: 6, lg: 10 }, // Expansive horizontal padding on large screens
            maxWidth: '1800px' // Caps the width for ultra-wide monitors to maintain readability
          }}
        >
          {loading && weights.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress thickness={5} size={60} sx={{ color: 'primary.main' }} />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {/* PAGE HEADER SECTION */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center' }}>
                  <Box>
                    <Typography variant={isMobile ? "h4" : "h3"} fontWeight={900} letterSpacing="-0.02em">
                      Beef Operations
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Real-time growth velocity and market performance.
                    </Typography>
                  </Box>
                  
                  {!isMobile && (
                    <Typography variant="caption" sx={{ textAlign: 'right', fontWeight: 600, color: 'text.disabled' }}>
                      LAST SYNC: {new Date().toLocaleTimeString()}
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* MARKET CONFIG SECTION - Dynamic Width */}
              <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 0, borderRadius: 4, overflow: 'hidden', height: '100%', border: '1px solid #e0e6e4' }}>
                   <MarketConfigComponent 
                      prices={marketPrices} 
                      onUpdate={(id, price) => dispatch(updateMarketPrice({ id, price }))} 
                    />
                </Paper>
              </Grid>

              {/* DASHBOARD ANALYTICS SECTION - Takes more space on desktop */}
              <Grid item xs={12} lg={8}>
                <BeefDashboardComponent weights={weights} />
              </Grid>
            </Grid>
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default BeefDashboard;