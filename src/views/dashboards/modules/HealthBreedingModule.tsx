import React from 'react';
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonIcon, IonList, IonItem, IonLabel, IonCardTitle, IonText } from '@ionic/react';
import { medkitOutline, heartOutline, alertCircleOutline, bandageOutline, sparklesOutline, warningOutline } from 'ionicons/icons';
import { useAppSelector } from '../../../redux/hooks';
import { Typography } from '@mui/material';

export const HealthBreedingModule: React.FC = () => {
  const { data } = useAppSelector((state) => state.dashboard);

  const healthStats = data?.health_stats || { healthy_count: 0, sick_count: 0, treatment_today: 0 };
  const operationalAlerts = data?.operational_alerts || { pregnant_cows: 0, avg_herd_weight: 0 };
  const lowStockItems = data?.low_stock_items || [];

  return (
    <IonRow>
      <IonCol size="12" sizeMd="4">
        <IonCard style={{ height: '100%', borderBottom: '4px solid var(--ion-color-success)', boxShadow: 'none'   }}>
          <IonCardHeader>
            <IonCardTitle style={{  color: 'var(--ion-color-dark)' }}><IonIcon icon={medkitOutline} color="danger" /> Health & Treatments</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
            <IonItem className="ion-no-padding">
            <Typography variant="body2" style={{fontWeight: '500',   color:'#374151' }}><IonIcon icon={heartOutline} color="success" />  Healthy: <strong style={{  color: 'var(--ion-color-dark)' }}>{healthStats.healthy_count}</strong></Typography>
            </IonItem>
            <IonItem className="ion-no-padding">
            <Typography variant="body2" style={{fontWeight: '500',   color:'#374151' }}><IonIcon icon={alertCircleOutline} color="danger" />Sick/Quar: <strong style={{  color: 'var(--ion-color-dark)' }}>{healthStats.sick_count}</strong> </Typography>
            </IonItem>
            <IonItem className="ion-no-padding">
            <Typography variant="body2" style={{fontWeight: '500',   color:'#374151' }}><IonIcon icon={bandageOutline} color="primary" /> Treatments Today: <strong style={{  color: 'var(--ion-color-dark)' }}>{healthStats.treatment_today}</strong> </Typography>
            </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonCol>

      <IonCol size="12" sizeMd="4">
        <IonCard  style={{ height: '100%', borderBottom: '4px solid var(--ion-color-tertiary)'  }}>
          <IonCardHeader>
            <IonCardTitle style={{  color: 'var(--ion-color-dark)' }}><IonIcon icon={sparklesOutline} color="tertiary" /> Breeding</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
            <IonItem className="ion-no-padding">
            < Typography variant="body2" style={{fontWeight: '500',   color:'#374151' }}>Pregnant: <strong style={{  color: 'var(--ion-color-dark)' }}>{operationalAlerts.pregnant_cows}</strong></ Typography> 
            </IonItem>
            <IonItem className="ion-no-padding">
            < Typography variant="body2" style={{fontWeight: '500',   color:'#374151' }}>Avg Herd Weight: <strong style={{  color: 'var(--ion-color-dark)' }}>{operationalAlerts.avg_herd_weight} kg</strong></ Typography>
            </IonItem>
            </IonList>

          </IonCardContent>
        </IonCard>
      </IonCol>

      <IonCol size="12" sizeMd="4">
        <IonCard style={{ height: '100%', borderBottom: '4px solid var(--ion-color-danger)'   }}>
          <IonCardHeader>
            <IonCardTitle style={{  color: 'var(--ion-color-dark)' }}><IonIcon icon={warningOutline} color="danger" /> Low Stock</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
              {lowStockItems.slice(0, 2).map((item) => (
                <IonItem key={item.id} className="ion-no-padding">
                  <IonLabel>
                    < Typography variant="body2" style={{fontWeight: '500',   color:'#374151' }}> {item.name} <strong style={{  color: 'var(--ion-color-dark)' }}> ({item.quantity_on_hand} {item.unit})</strong></ Typography>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};