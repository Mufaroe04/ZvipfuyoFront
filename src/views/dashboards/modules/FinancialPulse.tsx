import React from 'react';
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { walletOutline, trendingUpOutline, trendingDownOutline } from 'ionicons/icons';
import { useAppSelector } from '../../../redux/hooks';

export const FinancialPulse: React.FC = () => {
  const { summary } = useAppSelector((state) => state.finance);

  if (!summary) return null;

  const isProfitable = summary.net_profit_usd >= 0;

  return (
    <IonRow>
      <IonCol size="12">
        <IonCard style={{ borderLeft: `4px solid ${isProfitable ? 'var(--ion-color-success)' : 'var(--ion-color-danger)'}` }}>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={walletOutline} /> Financial Pulse
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonRow>
              <IonCol size="12" sizeMd="4">
                <small style={{ color: 'var(--ion-color-medium)' }}>Total Revenue (Sales & Milk)</small>
                <h2 style={{ color: 'var(--ion-color-success)', fontWeight: 'bold', margin: '4px 0 0' }}>
                  ${(summary.total_income_usd || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
              </IonCol>
              
              <IonCol size="12" sizeMd="4">
                <small style={{ color: 'var(--ion-color-medium)' }}>Operating Expenses</small>
                <h2 style={{ color: 'var(--ion-color-danger)', fontWeight: 'bold', margin: '4px 0 0' }}>
                  ${(summary.total_expense_usd || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
              </IonCol>

              <IonCol size="12" sizeMd="4">
                <small style={{ color: 'var(--ion-color-medium)' }}>Net Profit</small>
                <h2 style={{ 
                  color: isProfitable ? 'var(--ion-color-success)' : 'var(--ion-color-danger)', 
                  fontWeight: 'bold', 
                  margin: '4px 0 0',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <IonIcon icon={isProfitable ? trendingUpOutline : trendingDownOutline} style={{ marginRight: '6px' }} />
                  ${(summary.net_profit_usd || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
              </IonCol>
            </IonRow>
            
            <div style={{ marginTop: '12px', borderTop: '1px solid #f4f5f8', paddingTop: '8px' }}>
              <small style={{ color: 'var(--ion-color-medium)' }}>
                System rate: <strong>1 USD = {summary.current_zig_rate || '0'} ZiG</strong>
              </small>
            </div>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};