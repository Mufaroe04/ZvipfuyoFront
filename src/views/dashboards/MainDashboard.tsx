import React, { useEffect } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDashboardData } from '../../redux/store/slices/dashboardSlice';
import { fetchLiveInsights } from '../../redux/store/slices/insightsSlice';
import { Geolocation } from '@capacitor/geolocation';
import { UserRole } from '../../types/types'; // Adjust path according to your project structure

// Sub-components modules
import { AiInsightsBanner } from './modules/AiInsightsBanner';
import { DairyProductionCard } from './modules/DairyProductionCard';
import { InventoryMetrics } from './modules/InventoryMetrics';
import { AreaMonitoringCard } from './modules/AreaMonitoringCard';
import { OperationsSummary } from './modules/OperationsSummary';
import { HealthBreedingModule } from './modules/HealthBreedingModule';
import { SupplyChainProcurement } from './modules/SupplyChainProcurement';
import WeatherCard from '../../components/WeatherCard';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { FinancialPulse } from './modules/FinancialPulse';
import { fetchFinanceData } from '../../redux/store/slices/financeSlice';

export const MainDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Extract user and auth status directly from Redux auth slice
  const { user } = useAppSelector((state) => state.auth);
  const { data, loading, error } = useAppSelector((state) => state.dashboard);
  const { insights_data, loading_insights, lastFetched } = useAppSelector((state) => state.insights);
  const { summary } = useAppSelector((state) => state.finance);


  // Derive the active role from the user's profile with a fallback
  const userRole: UserRole = (user?.profile?.role as UserRole) || 'hand';

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchFinanceData());
  }, [dispatch]);

  useEffect(() => {
    const CACHE_TIME = 30 * 60 * 1000;
    const now = Date.now();
    const isDataFresh = insights_data && lastFetched && (now - lastFetched < CACHE_TIME);

    if (!isDataFresh && !loading_insights) {
      const initIntelligence = async () => {
        try {
          const position = await Geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000 
          });
          dispatch(fetchLiveInsights({ 
            lat: position.coords.latitude, 
            lon: position.coords.longitude 
          }));
        } catch (e) {
          dispatch(fetchLiveInsights({ lat: -17.82, lon: 31.05 }));
        }
      };
      initIntelligence();
    }
  }, [dispatch, insights_data, lastFetched, loading_insights]);

  if (loading) {
    return (<LoadingSpinner/> );
  }

  if (error || !data) {
    return <div className="ion-padding ion-text-center">Something Went Wrong</div>;
  }

  // --- Role Access Flags ---
  const isOwner = userRole === 'owner';
  const isManager = userRole === 'manager' || isOwner;
  const isHand = userRole === 'hand';
  const isVet = userRole === 'vet';

  return (
    <IonGrid>
      {/* 1. AI Narrative Banner (Accessible by Management & Vets) */}
      {(isManager || isVet) && (
        <AiInsightsBanner narrative={insights_data?.narrative.executiveActionPlan} />
      )}

      {/* 2. Top Metric Stack */}
      <IonRow>
        <IonCol size="12" sizeLg="4">
          <WeatherCard />
        </IonCol>
        
        {/* Real-Time Dairy Metrics Dashboard (Management, Livestock Workers) */}
        {(isManager || isHand) && data.dairy_stats && (
          <IonCol size="12" sizeLg="8">
            <DairyProductionCard dairyStats={data.dairy_stats} />
          </IonCol>
        )}
      </IonRow>
      {isOwner&&(
        <FinancialPulse 
        financeSummary={summary}
        />
      )}
      {/* 3. Detailed Infrastructure & Value metrics (Management only) */}
      {isManager && (
        <InventoryMetrics 
          inventoryIndicators={data.inventory_key_indicators}
          inventoryCost={data.inventory_cost}
          enclosureStats={data.enclosure_stats}
        />
      )}


      {/* 4. Area, Herds & Real-time Counts (Management & Field Hands) */}
      {(isManager || isHand) && (
        <IonRow>
          <AreaMonitoringCard 
            areaMonitoring={data.area_monitoring}
            herdCount={data.herd_count}
            countingStats={data.counting_stats}
          />
        </IonRow>
      )}

      {/* 5. Health & Breeding Slices (Veterinary focus or Management) */}
      {(isManager || isVet) && (
        <HealthBreedingModule 
          healthStats={data.health_stats}
          operationalAlerts={data.operational_alerts}
          lowStockItems={data.low_stock_items}
        />
      )}

      {/* 6. Operations & Work Order Assignments (Management & Hands) */}
      {(isManager || isHand) && (
        <OperationsSummary 
          upcomingTasks={data.upcoming_tasks}
          taskStats={data.task_stats}
          transferStats={data.transfer_stats}
        />
      )}

      {/* 7. Strategic Procurement (Financial visibility restricted to Management) */}
      {isManager && (
        <SupplyChainProcurement pendingProcurementCount={data.pending_procurement_count} />
      )}
    </IonGrid>
  );
};