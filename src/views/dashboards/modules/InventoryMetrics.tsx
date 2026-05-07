import React from 'react';
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonLabel, IonText } from '@ionic/react';
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
            <IonCard color="danger" className="ion-no-margin" style={{ height: '100%' }}>
              <IonCardHeader>
                <IonCardTitle>Total Active Cattle</IonCardTitle>
                <IonCardTitle style={{fontWeight: 'bold',}}>{inventoryIndicators.total_cattle || 0}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="6" sizeMd="3">
            <IonCard color="tertiary" className="ion-no-margin" style={{ height: '100%' }}>
              <IonCardHeader>
                <IonCardTitle>Cows</IonCardTitle>
                <IonCardTitle style={{fontWeight: 'bold',}}>{inventoryIndicators.cows || 0}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="6" sizeMd="3">
            <IonCard color="secondary" className="ion-no-margin" style={{ height: '100%' }}>
              <IonCardHeader>
                <IonCardTitle>Bulls</IonCardTitle>
                <IonCardTitle style={{fontWeight: 'bold',}}>{inventoryIndicators.bulls || 0}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="6" sizeMd="3">
            <IonCard color="warning" className="ion-no-margin" style={{ height: '100%' }}>
              <IonCardHeader>
                <IonCardTitle>Calves</IonCardTitle>
                <IonCardTitle style={{fontWeight: 'bold',}}>{inventoryIndicators.calves || 0}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>

        {/* Bottom Row: Cost & Enclosures */}
        <IonRow >
          <IonCol size="6" sizeMd="4">
            <IonCard color="success" className="ion-no-margin" style={{ height: '100%' }}>
              <IonCardHeader>
                <IonCardTitle style={{ color: 'white' }}>Inventory Value</IonCardTitle>
                <IonCardTitle style={{fontWeight: 'bold', color: 'white' }}>${inventoryCost.toLocaleString()}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="6" sizeMd="8">
            <IonCard className="ion-no-margin" style={{ borderLeft: '4px solid var(--ion-color-medium)' , height: '100%'  }}>
              <IonCardHeader className="ion-no-padding ion-padding-horizontal ion-padding-top">
                <IonCardTitle style={{  color: 'var(--ion-color-dark)' }}><IonIcon icon={pinOutline} /> Enclosure Status</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonRow className="ion-text-center">
                  <IonCol> < IonCardTitle style={{ fontWeight: 'bold', color: 'var(--ion-color-dark)' }}>  {enclosureStats.enclosed || 0}</ IonCardTitle><br />< IonText style={{  color:'#374151' }}> Enclosed</IonText> </IonCol>
                  <IonCol>< IonCardTitle  style={{ fontWeight: 'bold', color: 'var(--ion-color-dark)' }} >  {enclosureStats.pens || 0} </ IonCardTitle><br />< IonText style={{  color:'#374151' }}>Pens</ IonText></IonCol>
                  <IonCol>< IonCardTitle  style={{ fontWeight: 'bold', color: 'var(--ion-color-dark)' }} > {enclosureStats.pastures || 0}    </ IonCardTitle><br />< IonText style={{  color:'#374151' }}>Pasture</ IonText></IonCol>
                  <IonCol>< IonCardTitle  style={{ fontWeight: 'bold', color: 'var(--ion-color-dark)' }} >  {enclosureStats.quarantine || 0} </ IonCardTitle><br />< IonText style={{  color:'#374151' }}>Quar.</ IonText></IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
  );
};