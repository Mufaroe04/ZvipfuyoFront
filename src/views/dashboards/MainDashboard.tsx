
import React, { useEffect, useRef } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDashboardData } from '../../redux/store/slices/dashboardSlice';
import { fetchLiveInsights } from '../../redux/store/slices/insightsSlice';
import { fetchFinanceData } from '../../redux/store/slices/financeSlice';
import { Geolocation } from '@capacitor/geolocation';
import { UserRole } from '../../types/types';

// Refactored Sub-components modules
import { AiInsightsBanner } from './modules/AiInsightsBanner';
import { DairyProductionCard } from './modules/DairyProductionCard';
import { InventoryMetrics } from './modules/InventoryMetrics';
import { AreaMonitoringCard } from './modules/AreaMonitoringCard';
import { OperationsSummary } from './modules/OperationsSummary';
import { HealthBreedingModule } from './modules/HealthBreedingModule';
import { SupplyChainProcurement } from './modules/SupplyChainProcurement';
import WeatherCard from './modules/WeatherCard';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { FinancialPulse } from './modules/FinancialPulse';

export const MainDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { data, loading, error } = useAppSelector((state) => state.dashboard);
  const { insights_data, loading_insights, lastFetched } = useAppSelector((state) => state.insights);

  const userRole: UserRole = (user?.profile?.role as UserRole) || 'hand';
// 1. The Circuit Breaker: This persists across renders and updates instantly
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
  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(fetchFinanceData());
  }, [dispatch]);

  if (loading || !data) return <LoadingSpinner />;

  if (error) {
    return <div className="ion-padding ion-text-center">Something Went Wrong</div>;
  }

  const isOwner = userRole === 'owner';
  const isManager = userRole === 'manager' || isOwner;
  const isHand = userRole === 'hand';
  const isVet = userRole === 'vet';

  return (
    <IonGrid style={{ 

}} >
      {/* 1. AI Narrative Banner */}
      {(isManager || isVet) && <AiInsightsBanner />}

      {/* 2. Top Metric Stack */}
      <IonRow >
        <IonCol size="12" sizeLg="4" sizeMd="4">
          <WeatherCard />
        </IonCol>
        
        {(isManager || isHand) && (
          <IonCol size="12" sizeLg="8" sizeMd="8">
            <DairyProductionCard />
          </IonCol>
        )}
      </IonRow>

      {/* 3. Financial Pulse (Only for Owner) */}
      {isOwner && <FinancialPulse />}

      {/* 4. Detailed Infrastructure (Management only) */}
      {isManager && <InventoryMetrics />}

      {/* 5. Area & Counts (Management & Field Hands) */}
      {(isManager || isHand) && (
        
          <AreaMonitoringCard />
       
      )}

      {/* 6. Health & Breeding */}
      {(isManager || isVet) && <HealthBreedingModule />}

      {/* 7. Operations & Work Orders */}
      {(isManager || isHand) && <OperationsSummary />}

      {/* 8. Strategic Procurement */}
      {isManager && <SupplyChainProcurement />}
    </IonGrid>
  );
};