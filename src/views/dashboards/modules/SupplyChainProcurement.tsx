import React from 'react';
import { IonRow, IonCol, IonCard, IonItem, IonIcon, IonLabel, IonButton, IonNote } from '@ionic/react';
import { cartOutline, arrowForwardOutline, businessOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface SupplyChainProps {
  pendingProcurementCount: number;
}

export const SupplyChainProcurement: React.FC<SupplyChainProps> = ({ pendingProcurementCount }) => {
  const history = useHistory();

  return (
    <IonRow>
      <IonCol size="12" sizeMd="6">
        <IonCard 
          onClick={() => history.push('/procurement')}
          style={{ 
            cursor: 'pointer',
            borderLeft: pendingProcurementCount > 0 ? '4px solid var(--ion-color-warning)' : '4px solid var(--ion-color-success)' 
          }}
        >
          <IonItem lines="none">
            <IonIcon icon={cartOutline} slot="start" color={pendingProcurementCount > 0 ? 'warning' : 'success'} />
            <IonLabel>
              <h2>Procurement Drafts</h2>
              <p>You have <strong>{pendingProcurementCount}</strong> requisitions to review</p>
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
  );
};