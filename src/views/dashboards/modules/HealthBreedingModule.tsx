import React from 'react';
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import { medkitOutline, heartOutline, alertCircleOutline, bandageOutline, sparklesOutline, warningOutline } from 'ionicons/icons';
import { InventoryItem } from '../../../types/types'; // Adjust path according to your project structure

interface HealthBreedingProps {
  healthStats: { 
    healthy_count: number; 
    sick_count: number; 
    treatment_today: number; 
  };
  operationalAlerts: { 
    pregnant_cows: number; 
    avg_herd_weight: number; 
  };
  lowStockItems: InventoryItem[];
}

export const HealthBreedingModule: React.FC<HealthBreedingProps> = ({
  healthStats,
  operationalAlerts,
  lowStockItems
}) => (
  <IonRow>
    <IonCol size="12" sizeMd="4">
      <IonCard style={{ height: '80%', borderBottom: '4px solid var(--ion-color-success)' ,boxShadow: 'none' }}>
        <IonCardHeader>
          <IonCardTitle><IonIcon icon={medkitOutline} color="danger" /> Health & Treatments</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p><IonIcon icon={heartOutline} color="success" /><small style={{ color: 'var(--ion-color-medium)' }}>  Healthy: <strong>{healthStats.healthy_count}</strong></small></p>
          <p><IonIcon icon={alertCircleOutline} color="danger" /><small style={{ color: 'var(--ion-color-medium)' }}>Sick/Quar: <strong style={{ color: 'red' }}>{healthStats.sick_count}</strong></small> </p>
          <p><IonIcon icon={bandageOutline} color="primary" /> <small style={{ color: 'var(--ion-color-medium)' }}>Treatments Today: <strong>{healthStats.treatment_today}</strong></small> </p>
        </IonCardContent>
      </IonCard>
    </IonCol>

    <IonCol size="12" sizeMd="4">
      <IonCard  style={{ height: '80%', borderBottom: '4px solid var(--ion-color-tertiary)' }}>
        <IonCardHeader>
          <IonCardTitle><IonIcon icon={sparklesOutline} color="tertiary" /> Breeding</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <small>Pregnant: <strong>{operationalAlerts.pregnant_cows}</strong></small> <br></br>
          <small>Avg Herd Weight: <strong>{operationalAlerts.avg_herd_weight} kg</strong></small><br></br>
          {/* <IonButton fill="clear" size="small" className="ion-no-padding">Manage Breeding History</IonButton> */}
        </IonCardContent>
      </IonCard>
    </IonCol>

    <IonCol size="12" sizeMd="4">
      <IonCard style={{ height: '80%', borderBottom: '4px solid var(--ion-color-danger)' }}>
        <IonCardHeader>
          <IonCardTitle><IonIcon icon={warningOutline} color="danger" /> Low Stock</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList lines="none">
            {lowStockItems.slice(0, 2).map((item) => (
              <IonItem key={item.id} className="ion-no-padding">
                <IonLabel>
                  <small style={{ color: 'var(--ion-color-medium)' }}>{item.name} ({item.quantity_on_hand} {item.unit})</small>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    </IonCol>
  </IonRow>
);