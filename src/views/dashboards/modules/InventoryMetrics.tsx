import React from 'react';
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonBadge } from '@ionic/react';
import { pinOutline } from 'ionicons/icons';

interface InventoryMetricsProps {
  inventoryIndicators: {
    total_cattle: number;
    cows: number;
    bulls: number;
    calves: number;
  };
  inventoryCost: number;
  enclosureStats: {
    enclosed: number;
    pens: number;
    pastures: number;
    quarantine: number;
  };
}

export const InventoryMetrics: React.FC<InventoryMetricsProps> = ({
  inventoryIndicators,
  inventoryCost,
  enclosureStats
}) => (
  <IonRow>
    <IonCol size="12">
      {/* Top Row: Inventory Indicators */}
      <IonRow>
        <IonCol size="6" sizeMd="3">
          <IonCard color="primary" className="ion-no-margin">
            <IonCardHeader>
              <IonCardSubtitle>Total Active Cattle</IonCardSubtitle>
              <IonCardTitle>{inventoryIndicators.total_cattle || 0}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonCol>
        <IonCol size="6" sizeMd="3">
          <IonCard color="tertiary" className="ion-no-margin">
            <IonCardHeader>
              <IonCardSubtitle>Cows</IonCardSubtitle>
              <IonCardTitle>{inventoryIndicators.cows}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonCol>
        <IonCol size="6" sizeMd="3">
          <IonCard color="secondary" className="ion-no-margin">
            <IonCardHeader>
              <IonCardSubtitle>Bulls</IonCardSubtitle>
              <IonCardTitle>{inventoryIndicators.bulls}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonCol>
        <IonCol size="6" sizeMd="3">
          <IonCard color="warning" className="ion-no-margin">
            <IonCardHeader>
              <IonCardSubtitle>Calves</IonCardSubtitle>
              <IonCardTitle>{inventoryIndicators.calves}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonCol>
      </IonRow>

      {/* Bottom Row: Cost & Enclosures */}
      <IonRow className="ion-margin-top">
        <IonCol size="12" sizeMd="4">
          <IonCard color="success" className="ion-no-margin" style={{ height: '100%' }}>
            <IonCardHeader>
              <IonCardSubtitle style={{ color: 'white' }}>Inventory Value</IonCardSubtitle>
              <IonCardTitle style={{ color: 'white' }}>${inventoryCost.toLocaleString()}</IonCardTitle>
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
                <IonCol><IonBadge color="primary">{enclosureStats.enclosed}</IonBadge><br /><small>Enclosed</small></IonCol>
                <IonCol><IonBadge color="secondary">{enclosureStats.pens}</IonBadge><br /><small>Pens</small></IonCol>
                <IonCol><IonBadge color="success">{enclosureStats.pastures}</IonBadge><br /><small>Pasture</small></IonCol>
                <IonCol><IonBadge color="danger">{enclosureStats.quarantine}</IonBadge><br /><small>Quar.</small></IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonCol>
  </IonRow>
);