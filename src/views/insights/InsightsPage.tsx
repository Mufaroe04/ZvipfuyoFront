import React, { useEffect, useRef } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonMenuButton, IonTitle, IonButtons } from '@ionic/react';
import { Box, Divider } from '@mui/material';
import { Geolocation } from '@capacitor/geolocation';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchLiveInsights } from '../../redux/store/slices/insightsSlice';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';

// Refactored Domain Components (Direct state consumers)
import { ActionPlanCard } from './ActionPlanCard';
import { SummaryHeader } from './SummaryHeader';
import { SnapshotTable } from './SnapshotTable';
import { BeefTimeline } from './BeefTimeline';
import { DairyTable } from './DairyTable';
import { BioclimaticTable } from './BioclimaticTable';
import { LogisticsInventory } from './LogisticsInventory';

export const InsightsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { insights_data, loading_insights, lastFetched } = useAppSelector((state: any) => state.insights);

  const isFetchingRef = useRef(false);

  useEffect(() => {
    // 2. Global Guard: If dashboard is loading, or we are already fetching, or data is fresh
    const CACHE_TIME = 30 * 60 * 1000;
    const isFresh = lastFetched && (Date.now() - lastFetched < CACHE_TIME);

    if (isFetchingRef.current || loading_insights || isFresh) {
      return;
    }

    const initIntelligence = async () => {
      // 3. Lock it immediately before the async call
      isFetchingRef.current = true;
      
      try {
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000 
        });
        
        await dispatch(fetchLiveInsights({ 
          lat: position.coords.latitude, 
          lon: position.coords.longitude 
        })).unwrap(); // unwrap helps catch errors properly
        
      } catch (e) {
        await dispatch(fetchLiveInsights({ lat: -17.82, lon: 31.05 })).unwrap();
      } finally {
        // 4. Release lock only after the request is finished
        isFetchingRef.current = false;
      }
    };

    initIntelligence();
  }, [dispatch, lastFetched, loading_insights]); // Dependencies are now safe with the Ref guard

  // Initial Data Fetch - Moved to separate Effect


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