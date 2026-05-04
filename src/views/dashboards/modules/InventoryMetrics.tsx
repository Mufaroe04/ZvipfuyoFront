import React from 'react';
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonBadge } from '@ionic/react';
import { pinOutline } from 'ionicons/icons';
import { useAppSelector } from '../../../redux/hooks';

export const InventoryMetrics: React.FC = () => {
  const { data } = useAppSelector((state) => state.dashboard);

  const inventoryIndicators = data?.inventory_key_indicators || { total_cattle: 0, cows: 0, bulls: 0, calves: 0 };
  const inventoryCost = data?.inventory_cost || 0;
  const enclosureStats = data?.enclosure_stats || { enclosed: 0, pens: 0, pastures: 0, quarantine: 0 };

  return (
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
                <IonCardTitle>{inventoryIndicators.cows || 0}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="6" sizeMd="3">
            <IonCard color="secondary" className="ion-no-margin">
              <IonCardHeader>
                <IonCardSubtitle>Bulls</IonCardSubtitle>
                <IonCardTitle>{inventoryIndicators.bulls || 0}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="6" sizeMd="3">
            <IonCard color="warning" className="ion-no-margin">
              <IonCardHeader>
                <IonCardSubtitle>Calves</IonCardSubtitle>
                <IonCardTitle>{inventoryIndicators.calves || 0}</IonCardTitle>
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
                  <IonCol><IonBadge color="primary">{enclosureStats.enclosed || 0}</IonBadge><br /><small>Enclosed</small></IonCol>
                  <IonCol><IonBadge color="secondary">{enclosureStats.pens || 0}</IonBadge><br /><small>Pens</small></IonCol>
                  <IonCol><IonBadge color="success">{enclosureStats.pastures || 0}</IonBadge><br /><small>Pasture</small></IonCol>
                  <IonCol><IonBadge color="danger">{enclosureStats.quarantine || 0}</IonBadge><br /><small>Quar.</small></IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
  );
};