import React from 'react';
import { IonCol, IonCard, IonCardHeader, IonCardContent, IonList, IonItem, IonLabel, IonIcon, IonCardTitle, IonRow, IonText } from '@ionic/react';
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
    <IonRow>
      <IonCol size="12" sizeMd="6">
        <IonCard style={{ borderBottom: '4px solid var(--ion-color-secondary)', height: '100%'  }}>
          <IonCardHeader>
            <IonCardTitle style={{  color: 'var(--ion-color-dark)' }}><IonIcon icon={pinOutline} /> Area Monitoring</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
              <IonItem style={{  color: 'var(--ion-color-medium)' }}>
                <IonText style={{  color: 'var(--ion-color-medium)' }}> State: <strong>{areaMonitoring.condition}</strong> </IonText>
                <IonCardTitle style={{ fontWeight: 'bold', color: 'var(--ion-color-dark)' }} slot="end">{herdCount} Herds Total</IonCardTitle>
              </IonItem>
              <IonItem>
                <IonIcon 
                  icon={leafOutline} 
                  slot="start" 
                  color={areaMonitoring.feed_stations > 0 ? 'success' : 'danger'} 
                />
                {/* <IonLabel> */}
                  <IonText style={{ color: 'var(--ion-color-medium)' }}> Feed Present: <strong>{areaMonitoring.feed_stations > 0 ? 'Yes' : 'No'} :</strong></IonText>
                   <IonText style={{ color: 'var(--ion-color-medium)' }}> You have {areaMonitoring.bales_available ?? 0} Bales in stock</IonText>
                {/* </IonLabel> */}
              </IonItem>
              <IonItem>
                <IonIcon icon={waterOutline} slot="start" color="primary" />
                {/* <IonLabel > */}
                   <IonText style={{ color: 'var(--ion-color-medium)' }}>  Water Supply: <strong>  {areaMonitoring.water_ponds}  Ponds</strong> </IonText>
                {/* </IonLabel> */}
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonCol>

      <IonCol size="12" sizeMd="6">
        <IonCard style={{ borderLeft: '4px solid var(--ion-color-warning)', height: '100%'}}>
          <IonCardHeader>
            <IonCardTitle style={{  color: 'var(--ion-color-dark)' }}><IonIcon icon={statsChartOutline} /> Counting Session</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', alignItems: 'center', height: '100%' }}>
              <div>
                < IonCardTitle style={{ margin: 0, }}>{countingStats.today_count}</ IonCardTitle>
                <IonText style={{ margin: 0 ,color: 'var(--ion-color-dark)' }}>Today</IonText>
              </div>
              <div>
                < IonCardTitle style={{ margin: 0, }}>{countingStats.last_7_days}</ IonCardTitle>
                <IonText style={{ margin: 0 ,color: 'var(--ion-color-dark)' }}>Last 7d</IonText>
              </div>
              <div>
                <p style={{ margin: 0,color: 'var(--ion-color-dark)' ,fontSize: '0.9rem'  }}>Last Session:</p> 
                <strong>
                <small style={{ margin: 0,color: 'var(--ion-color-dark)' }}>
                  {countingStats.last_session_date 
                    ? new Date(countingStats.last_session_date).toLocaleDateString() 
                    : 'N/A'}
                </small>
                </strong>

              </div>
            </div>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};