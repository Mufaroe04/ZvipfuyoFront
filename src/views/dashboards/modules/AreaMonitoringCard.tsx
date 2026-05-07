import React from 'react';
import { IonCol, IonCard, IonCardHeader, IonCardContent, IonList, IonItem, IonLabel, IonIcon, IonCardTitle, IonRow, IonText } from '@ionic/react';
import { pinOutline, leafOutline, waterOutline, statsChartOutline } from 'ionicons/icons';
import { useAppSelector } from '../../../redux/hooks';
import { Typography } from '@mui/material';

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
              <IonItem style={{  color:'#374151' }}>
                <Typography variant="body2" style={{fontWeight: '500',   color:'#374151' }}> State: <strong style={{ color: 'var(--ion-color-dark)' }}>{areaMonitoring.condition}</strong> </Typography>
                <IonCardTitle style={{ fontWeight: 'bold', color: 'var(--ion-color-dark)' }} slot="end">{herdCount} Herds Total</IonCardTitle>
              </IonItem>
              <IonItem>
                <IonIcon 
                  icon={leafOutline} 
                  slot="start" 
                  color={areaMonitoring.feed_stations > 0 ? 'success' : 'danger'} 
                />
                {/* <IonLabel> */}
                  <Typography variant="body2" style={{fontWeight: '500',   color:'#374151' }}> Feed Present: <strong  style={{ color: 'var(--ion-color-dark)' }}>{areaMonitoring.feed_stations > 0 ? 'Yes' : 'No'} :</strong></Typography>
                   <Typography variant="body2" style={{ fontWeight: '500', color:'#374151' }}> You have <strong style={{ color: 'var(--ion-color-dark)' }}> {areaMonitoring.bales_available ?? 0}</strong>  Bales in stock</Typography>
                {/* </IonLabel> */}
              </IonItem>
              <IonItem>
                <IonIcon icon={waterOutline} slot="start" color="primary" />
                {/* <IonLabel > */}
                   <Typography style={{fontWeight: '500', color:'#374151' }}>  Water Supply: <strong style={{ color: 'var(--ion-color-dark)' }}>  {areaMonitoring.water_ponds}  Ponds</strong> </Typography>
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
                < IonCardTitle style={{ margin: 0, fontWeight:'bold'}}>{countingStats.today_count}</ IonCardTitle>
                <Typography variant="body2" style={{fontWeight: '500',   color:'#374151' }}>Today</Typography>
              </div>
              <div>
                < IonCardTitle style={{ margin: 0,fontWeight:'bold' }}>{countingStats.last_7_days}</ IonCardTitle>
                <Typography variant="body2" style={{fontWeight: '500',   color:'#374151' }}>Last 7d</Typography>
              </div>
              <div>
                <strong>
                <Typography style={{fontWeight: 'bold', margin: 0,color: 'var(--ion-color-dark)' }}>
                  {countingStats.last_session_date 
                    ? new Date(countingStats.last_session_date).toLocaleDateString() 
                    : 'N/A'}
                </Typography>
                </strong>
                <Typography variant="body2" style={{fontWeight: '500',   color:'#374151' }}>Last Session:</Typography> 


              </div>
            </div>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};