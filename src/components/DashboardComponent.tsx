
import React, { useEffect } from 'react';
import { 
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, 
  IonCardSubtitle, IonCardTitle, IonCardContent, 
  IonIcon, IonBadge, IonList, IonItem, IonLabel, IonSpinner,
  IonButton, IonNote
} from '@ionic/react';
import { 
  warningOutline, calendarOutline, cubeOutline, sparklesOutline, 
  arrowForwardOutline, pinOutline, statsChartOutline, repeatOutline,
  fitnessOutline, leafOutline, waterOutline,
  bandageOutline,
  alertCircleOutline,
  heartOutline,
  medkitOutline,
  cartOutline,
  businessOutline
} from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchDashboardData } from '../redux/store/slices/dashboardSlice';
import WeatherCard from './WeatherCard';
import { useHistory } from 'react-router-dom';
import { fetchLiveInsights } from '../redux/store/slices/insightsSlice';
import { Geolocation } from '@capacitor/geolocation';

const DashboardComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.dashboard);
  const { insights_data, loading_insights, lastFetched } = useAppSelector((state: any) => state.insights);
  const history = useHistory();
  

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // useEffect(() => {
  //   const CACHE_TIME = 30 * 60 * 1000; // 30 Minutes
  //   const now = Date.now();

  //   // Only fetch if we have no data OR the data is older than 30 mins
  //   if (!insights_data || !lastFetched || (now - lastFetched > CACHE_TIME)) {
  //     const initIntelligence = async () => {
  //       try {
  //               const position = await Geolocation.getCurrentPosition({
  //               enableHighAccuracy: true,
  //               timeout: 10000 });
  //         dispatch(fetchLiveInsights({ 
  //           lat: position.coords.latitude, 
  //           lon: position.coords.longitude 
  //         }));
  //       } catch (e) {
  //         // Fallback to Harare if GPS fails
  //         dispatch(fetchLiveInsights({ lat: -17.82, lon: 31.05 }));
  //       }
  //     };
  //     initIntelligence();
  //   }
  // }, [dispatch, insights_data, lastFetched]);
useEffect(() => {
  const CACHE_TIME = 30 * 60 * 1000;
  const now = Date.now();

  // 1. Calculate if data is fresh
  const isDataFresh = insights_data && lastFetched && (now - lastFetched < CACHE_TIME);

  // 2. ONLY fetch if it is NOT fresh and we aren't already loading
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

  // Adding loading_insights to the array is the "secret" to stopping the loop.
  // Once the fetch starts, loading becomes true, which changes the condition 
  // above to FALSE, preventing a second call from starting.
}, [dispatch, insights_data, lastFetched, loading_insights]);
  if (loading) return (
    <div className="ion-text-center ion-padding">
      <IonSpinner name="crescent" />
      <p>Loading Please Wait</p>
    </div>
  );

  if (error) return <div className="ion-padding ion-text-center">Error: {error}</div>;

  return (

    <IonGrid>
  {/* 1. AI INSIGHTS BANNER */}
  <IonRow>
    <IonCol size="12">
      <IonCard color="light" style={{ borderLeft: '4px solid var(--ion-color-secondary)' }}>
        <IonItem lines="none" color="light">
          <IonIcon icon={sparklesOutline} slot="start" color="secondary" />
          <IonLabel className="ion-text-wrap">
            <h2 style={{ fontWeight: 'bold' }}>Zvipfuyo Intelligence</h2>
            <p>{insights_data?.narrative}</p>
          </IonLabel>
          <IonButton fill="clear" slot="end" routerLink="/insights">
            View All <IonIcon icon={arrowForwardOutline} slot="end" />
          </IonButton>
        </IonItem>
      </IonCard>
    </IonCol>
  </IonRow>

  {/* 2. WEATHER, PRIMARY STATS & ENCLOSURES */}
  <IonRow>
    <IonCol size="12" sizeLg="4">
      <WeatherCard />
    </IonCol>
    <IonCol size="12" sizeLg="8">
      {/* Top Row: Inventory Indicators */}
      <IonRow>
        <IonCol size="6" sizeMd="3">
          <IonCard color="primary" className="ion-no-margin">
            <IonCardHeader>
              <IonCardSubtitle>Total Cattle</IonCardSubtitle>
              <IonCardTitle>{data?.inventory_key_indicators.total_cattle || 0}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonCol>
        <IonCol size="6" sizeMd="3">
          <IonCard color="tertiary" className="ion-no-margin">
            <IonCardHeader><IonCardSubtitle>Cows</IonCardSubtitle><IonCardTitle>{data?.inventory_key_indicators.cows}</IonCardTitle></IonCardHeader>
          </IonCard>
        </IonCol>
        <IonCol size="6" sizeMd="3">
          <IonCard color="secondary" className="ion-no-margin">
            <IonCardHeader><IonCardSubtitle>Bulls</IonCardSubtitle><IonCardTitle>{data?.inventory_key_indicators.bulls}</IonCardTitle></IonCardHeader>
          </IonCard>
        </IonCol>
        <IonCol size="6" sizeMd="3">
          <IonCard color="warning" className="ion-no-margin">
            <IonCardHeader><IonCardSubtitle>Calves</IonCardSubtitle><IonCardTitle>{data?.inventory_key_indicators.calves}</IonCardTitle></IonCardHeader>
          </IonCard>
        </IonCol>
      </IonRow>

      {/* Bottom Row: Inventory Cost & Enclosure Status */}
      <IonRow className="ion-margin-top">
        <IonCol size="12" sizeMd="4">
          <IonCard color="success" className="ion-no-margin" style={{ height: '100%' }}>
            <IonCardHeader>
              <IonCardSubtitle style={{ color: 'white' }}>Inventory Value</IonCardSubtitle>
              <IonCardTitle style={{ color: 'white' }}>${data?.inventory_cost.toLocaleString()}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonCol>
        <IonCol size="12" sizeMd="8">
          <IonCard className="ion-no-margin" style={{ borderLeft: '4px solid var(--ion-color-medium)' }}>
            <IonCardHeader className="ion-no-padding ion-padding-horizontal ion-padding-top">
              <IonCardSubtitle><IonIcon icon={pinOutline} /> Enclosure Status</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonRow className="ion-text-center">
                <IonCol><IonBadge color="primary">{data?.enclosure_stats.enclosed}</IonBadge><br/><small>Enclosed</small></IonCol>
                <IonCol><IonBadge color="secondary">{data?.enclosure_stats.pens}</IonBadge><br/><small>Pens</small></IonCol>
                <IonCol><IonBadge color="success">{data?.enclosure_stats.pastures}</IonBadge><br/><small>Pasture</small></IonCol>
                <IonCol><IonBadge color="danger">{data?.enclosure_stats.quarantine}</IonBadge><br/><small>Quar.</small></IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonCol>
  </IonRow>

  {/* 3. AREA MONITORING & COUNTING */}
  <IonRow>
    <IonCol size="12" sizeMd="6">
      <IonCard style={{ borderBottom: '4px solid var(--ion-color-secondary)' }}>
        <IonCardHeader>
          <IonCardTitle><IonIcon icon={pinOutline} /> Area Monitoring</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList lines="none">
            <IonItem>
              <IonLabel>State: <strong>{data?.area_monitoring.condition}</strong></IonLabel>
              <IonBadge color="primary" slot="end" >{data?.herd_count} Herds Total</IonBadge>
            </IonItem>
            <IonItem>
              <IonIcon 
                icon={leafOutline} 
                slot="start" 
                color={(data?.area_monitoring?.feed_stations ?? 0) > 0 ? 'success' : 'danger'} 
              />
              <IonLabel>
                Feed Present: <strong>{(data?.area_monitoring?.feed_stations ?? 0) > 0 ? 'Yes' : 'No'}</strong>
                <p>{data?.area_monitoring?.bales_available ?? 0} Bales in stock</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={waterOutline} slot="start" color="primary" />
              <IonLabel>Water Supply: {data?.area_monitoring.water_ponds} Ponds</IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </IonCol>

    <IonCol size="12" sizeMd="6">
      <IonCard style={{ borderLeft: '4px solid var(--ion-color-warning)' }}>
        <IonCardHeader><IonCardTitle><IonIcon icon={statsChartOutline} /> Counting Session</IonCardTitle></IonCardHeader>
        <IonCardContent>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div><h2>{data?.counting_stats.today_count}</h2><p>Today</p></div>
            <div><h2>{data?.counting_stats.last_7_days}</h2><p>Last 7d</p></div>
            <div><p>Last Session:</p><small>{data?.counting_stats.last_session_date ? new Date(data.counting_stats.last_session_date).toLocaleDateString() : 'N/A'}</small></div>
          </div>
        </IonCardContent>
      </IonCard>
    </IonCol>
  </IonRow>

  {/* 4. TASK MANAGEMENT (With Titles) & TRANSFERS */}
  <IonRow>
 <IonCol size="12" sizeMd="8">
  <IonCard style={{ borderBottom: '4px solid var(--ion-color-success)' }}>
    <IonCardHeader><IonCardTitle><IonIcon icon={calendarOutline} /> Task Summary</IonCardTitle></IonCardHeader>
    <IonCardContent>
      {/* If you have the tasks list, show them. Otherwise show the counts. */}
      {data?.upcoming_tasks ? (
        <IonList lines="full">
          {data.upcoming_tasks.slice(0, 3).map(task => (
            <IonItem key={task.id}>
              <IonLabel>
                <h2 style={{fontWeight: 'bold'}}>{task.title}</h2>
                <p>Assigned to: {task.assigned_to_name}</p>
              </IonLabel>
              <IonBadge slot="end" color={task.priority === 'high' ? 'danger' : 'primary'}>{task.priority}</IonBadge>
            </IonItem>
          ))}
        </IonList>
      ) : (
        /* Fallback to the table counts if no list is provided */
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr><td>Due Today</td><td className="ion-text-end"><IonBadge color="warning">{data?.task_stats.due_today}</IonBadge></td></tr>
            <tr><td>Overdue</td><td className="ion-text-end"><IonBadge color="danger">{data?.task_stats.overdue}</IonBadge></td></tr>
          </tbody>
        </table>
      )}
    </IonCardContent>
  </IonCard>
</IonCol>
    <IonCol size="12" sizeMd="4">
      <IonCard style={{ borderBottom: '4px solid var(--ion-color-warning)' }}>
        <IonCardHeader><IonCardTitle><IonIcon icon={repeatOutline} /> Transfers</IonCardTitle></IonCardHeader>
        <IonCardContent>
          <IonList lines="none">
            <IonItem><IonLabel>Pending</IonLabel><IonBadge color="warning">{data?.transfer_stats.pending}</IonBadge></IonItem>
            <IonItem><IonLabel>In Transit</IonLabel><IonBadge color="primary">{data?.transfer_stats.intransit}</IonBadge></IonItem>
            <IonItem><IonLabel>Incoming</IonLabel><IonBadge color="success">{data?.transfer_stats.incoming}</IonBadge></IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </IonCol>
  </IonRow>

  {/* 5. HEALTH, REPRODUCTION & STOCK */}
  <IonRow>
<IonCol size="12" sizeMd="4">
  <IonCard style={{ height: '100%' , borderBottom: '4px solid var(--ion-color-success)' }}>
    <IonCardHeader>
      <IonCardTitle>
        <IonIcon icon={medkitOutline} color="danger" /> Healthy & Treatments
        {/* <IonIcon icon={fitnessOutline} color="danger" /> Healthy & Treatments */}
      </IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <p>
        <IonIcon icon={heartOutline} color="success" /> Healthy: 
        <strong>{data?.health_stats.healthy_count}</strong>
      </p>
      <p>
        <IonIcon icon={alertCircleOutline} color="danger" /> Sick/Quar: 
        <strong style={{color: 'red'}}>{data?.health_stats.sick_count}</strong>
      </p>
      <p>
        <IonIcon icon={bandageOutline} color="primary" /> Treatments Today: 
        <strong>{data?.health_stats.treatment_today}</strong>
      </p>
    </IonCardContent>
  </IonCard>
</IonCol>

    <IonCol size="12" sizeMd="4">
      <IonCard color="light" style={{ height: '100%' ,borderBottom: '4px solid var(--ion-color-tertiary)' }}>
        <IonCardHeader>
          <IonCardTitle><IonIcon icon={sparklesOutline} color="tertiary" /> Breeding</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Pregnant: <strong>{data?.operational_alerts.pregnant_cows}</strong></p>
          <p>Avg Herd Weight: <strong>{data?.operational_alerts.avg_herd_weight} kg</strong></p>
          <IonButton fill="clear" size="small" className="ion-no-padding">Manage Breeding History</IonButton>
        </IonCardContent>
      </IonCard>
    </IonCol>

    <IonCol size="12" sizeMd="4">
      <IonCard style={{ height: '100%' , borderBottom: '4px solid var(--ion-color-danger)' }}>
        <IonCardHeader><IonCardTitle><IonIcon icon={warningOutline} color="danger" /> Low Stock</IonCardTitle></IonCardHeader>
        <IonCardContent>
          <IonList lines="none">
            {data?.low_stock_items.slice(0, 2).map(item => (
              <IonItem key={item.id} className="ion-no-padding">
                <IonLabel><small>{item.name} ({item.quantity_on_hand} {item.unit})</small></IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    </IonCol>
  </IonRow>
  {/* 6. PROCUREMENT & SUPPLY CHAIN ACTION */}
<IonRow>
  <IonCol size="12" sizeMd="6">
    <IonCard 
      onClick={() => history.push('/procurement')}
      style={{ 
        cursor: 'pointer',
        borderLeft: (data?.pending_procurement_count ?? 0) > 0 ? '4px solid var(--ion-color-warning)' : '4px solid var(--ion-color-success)' 
      }}
    >
      <IonItem lines="none">
        <IonIcon icon={cartOutline} slot="start" color={(data?.pending_procurement_count ?? 0) > 0 ? 'warning' : 'success'} />
        <IonLabel>
          <h2>Procurement Drafts</h2>
          <p>You have <strong>{data?.pending_procurement_count || 0}</strong> requisitions to review</p>
        </IonLabel>
        <IonButton fill="clear" slot="end">
          Review <IonIcon icon={arrowForwardOutline} slot="end" />
        </IonButton>
      </IonItem>
    </IonCard>
  </IonCol>

  <IonCol size="12" sizeMd="6">
    <IonCard style={{ borderLeft: '4px solid var(--ion-color-primary)' }}>
      <IonItem lines="none" button routerLink="/suppliers">
        <IonIcon icon={businessOutline} slot="start" color="primary" />
        <IonLabel>
          <h2>Supplier Directory</h2>
          <p>Quick access to NatFoods, Agrifoods & more</p>
        </IonLabel>
        <IonNote slot="end">Manage</IonNote>
      </IonItem>
    </IonCard>
  </IonCol>
</IonRow>
</IonGrid>
  );
};

export default DashboardComponent;