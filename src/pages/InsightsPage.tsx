import React, { useEffect } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonMenuButton, IonTitle, IonButtons } from '@ionic/react';
import { Box, Divider } from '@mui/material';
import { Geolocation } from '@capacitor/geolocation';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchLiveInsights } from '../redux/store/slices/insightsSlice';
import { LoadingSpinner } from '../components/feedback/LoadingSpinner';

// Refactored Domain Components (Direct state consumers)
import { ActionPlanCard } from '../components/insights/ActionPlanCard';
import { SummaryHeader } from '../components/insights/SummaryHeader';
import { SnapshotTable } from '../components/insights/SnapshotTable';
import { BeefTimeline } from '../components/insights/BeefTimeline';
import { DairyTable } from '../components/insights/DairyTable';
import { BioclimaticTable } from '../components/insights/BioclimaticTable';
import { LogisticsInventory } from '../components/insights/LogisticsInventory';

export const InsightsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { insights_data, loading_insights, lastFetched } = useAppSelector((state: any) => state.insights);

  useEffect(() => {
    const CACHE_TIME = 30 * 60 * 1000;
    const now = Date.now();

    if (!insights_data || !lastFetched || now - lastFetched > CACHE_TIME) {
      const initIntelligence = async () => {
        try {
          const position = await Geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000,
          });
          dispatch(fetchLiveInsights({ lat: position.coords.latitude, lon: position.coords.longitude }));
        } catch (e) {
          dispatch(fetchLiveInsights({ lat: -17.8248, lon: 31.0530 }));
        }
      };
      initIntelligence();
    }
  }, [dispatch, insights_data, lastFetched]);

  if (!insights_data || loading_insights) {
    return (
      <IonPage style={{ background: '#F9FAFB' }}>
        <IonContent className="ion-padding">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <LoadingSpinner />
          </Box>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage style={{ background: '#F9FAFB' }}>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Zvipfuyo Intelligence Insights</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid style={{ width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
          <IonRow>
            <IonCol size="12">
              <ActionPlanCard />
              <SummaryHeader />
              <SnapshotTable />
              <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
              <BeefTimeline />
              <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
              <DairyTable />
              <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
              <BioclimaticTable />
              <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
              <LogisticsInventory />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default InsightsPage;