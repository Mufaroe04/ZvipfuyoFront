import React from 'react';
import { IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonBadge, IonIcon } from '@ionic/react';
import { pinOutline, leafOutline, waterOutline, statsChartOutline } from 'ionicons/icons';

interface AreaMonitoringProps {
  areaMonitoring: {
    condition: string;
    water_ponds: number;
    feed_stations: number;
    bales_available?: number;
    present_count: number;
    absent_count: number;
  };
  herdCount: number;
  countingStats: {
    today_count: number;
    last_7_days: number;
    last_session_date: string | null;
  };
}

export const AreaMonitoringCard: React.FC<AreaMonitoringProps> = ({
  areaMonitoring,
  herdCount,
  countingStats
}) => (
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
               <small>  Feed Present: <strong>{areaMonitoring.feed_stations > 0 ? 'Yes' : 'No'}</strong></small>
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