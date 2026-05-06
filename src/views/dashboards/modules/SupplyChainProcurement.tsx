import React from 'react';
import { IonRow, IonCol, IonCard, IonItem, IonIcon, IonLabel, IonButton, IonNote, IonCardTitle, IonCardHeader, IonText } from '@ionic/react';
import { cartOutline, arrowForwardOutline, businessOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';

export const SupplyChainProcurement: React.FC = () => {
  const history = useHistory();
  const { data } = useAppSelector((state) => state.dashboard);

  const pendingProcurementCount = data?.pending_procurement_count || 0;

  return (
    <IonRow>
      <IonCol size="12" sizeMd="6">
        <IonCard 
          onClick={() => history.push('/procurement')}
          style={{ 
            cursor: 'pointer',
            borderLeft: pendingProcurementCount > 0 ? '4px solid var(--ion-color-warning)' : '4px solid var(--ion-color-success)' 
            , height: '100%' 
          }}
        >
          <IonItem lines="none">
            <IonIcon icon={cartOutline} slot="start" color={pendingProcurementCount > 0 ? 'warning' : 'success'} />
            <IonLabel>
              <IonText style={{ fontSize: '1.4rem', color: 'var(--ion-color-dark)' }}>Procurement Drafts</IonText> <br></br>
              <IonText style={{  color: 'var(--ion-color-medium)' }} >You have <strong style={{  color: 'var(--ion-color-dark)' }} >{pendingProcurementCount}</strong> requisitions to review</IonText>
            </IonLabel>
            <IonButton fill="clear" slot="end">
              Review <IonIcon icon={arrowForwardOutline} slot="end" />
            </IonButton>
          </IonItem>
        </IonCard>
      </IonCol>

      <IonCol size="12" sizeMd="6">
        <IonCard style={{ borderLeft: '4px solid var(--ion-color-primary)', height: '100%' }}>
          <IonItem lines="none" button routerLink="/suppliers">
            <IonIcon icon={businessOutline} slot="start" color="primary" />
            <IonLabel>
              <IonText style={{ fontSize: '1.4rem', color: 'var(--ion-color-dark)' }}>Supplier Directory</IonText> <br></br>
              <IonText style={{  color: 'var(--ion-color-medium)' }} >Quick access to NatFoods, Agrifoods & more</IonText>
            </IonLabel>
            {/* <IonNote slot="end">Manage</IonNote> */}
              <IonButton fill="clear" slot="end">
              Manage <IonIcon icon={arrowForwardOutline} slot="end" />
            </IonButton>
          </IonItem>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};