import React from 'react';
import { IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { pinOutline, leafOutline, waterOutline, statsChartOutline } from 'ionicons/icons';
import { useAppSelector } from '../../../redux/hooks';

export const AreaMonitoringCard: React.FC = () => {
  const { data } = useAppSelector((state) => state.dashboard);

  // Safely retrieve the relevant slices with structured fallbacks
  const areaMonitoring = data?.area_monitoring || {
    condition: 'N/A',
    water_ponds: 0,
    feed_stations: 0,
    bales_available: 0,
    present_count: 0,
    absent_count: 0
  };

  const herdCount = data?.herd_count || 0;

  const countingStats = data?.counting_stats || {
    today_count: 0,
    last_7_days: 0,
    last_session_date: null
  };

  return (
    <>
      <IonCol size="12" sizeMd="6">
        <IonCard style={{ borderBottom: '4px solid var(--ion-color-secondary)', height: '100%' }}>
          <IonCardHeader>
            <IonCardTitle><IonIcon icon={pinOutline} /> Area Monitoring</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
              <IonItem>
                <IonLabel> <small>State: <strong>{areaMonitoring.condition}</strong> </small></IonLabel>
                <IonLabel color="primary" slot="end">{herdCount} Herds Total</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon 
                  icon={leafOutline} 
                  slot="start" 
                  color={areaMonitoring.feed_stations > 0 ? 'success' : 'danger'} 
                />
                <IonLabel>
                  <small> Feed Present: <strong>{areaMonitoring.feed_stations > 0 ? 'Yes' : 'No'}</strong></small>
                  <p>{areaMonitoring.bales_available ?? 0} Bales in stock</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={waterOutline} slot="start" color="primary" />
                <IonLabel> <small> Water Supply: {areaMonitoring.water_ponds} Ponds</small></IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonCol>

      <IonCol size="12" sizeMd="6">
        <IonCard style={{ borderLeft: '4px solid var(--ion-color-warning)', height: '100%' }}>
          <IonCardHeader>
            <IonCardTitle><IonIcon icon={statsChartOutline} /> Counting Session</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', alignItems: 'center', height: '100%' }}>
              <div>
                <h2 style={{ margin: 0, fontWeight: 'bold' }}>{countingStats.today_count}</h2>
                <p style={{ margin: 0 }}>Today</p>
              </div>
              <div>
                <h2 style={{ margin: 0, fontWeight: 'bold' }}>{countingStats.last_7_days}</h2>
                <p style={{ margin: 0 }}>Last 7d</p>
              </div>
              <div>
                <p style={{ margin: 0 }}>Last Session:</p>
                <small>
                  {countingStats.last_session_date 
                    ? new Date(countingStats.last_session_date).toLocaleDateString() 
                    : 'N/A'}
                </small>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </>
  );
};