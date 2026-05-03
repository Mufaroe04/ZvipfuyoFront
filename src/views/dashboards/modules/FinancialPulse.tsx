import React from 'react';
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { walletOutline, trendingUpOutline, trendingDownOutline } from 'ionicons/icons';

interface FinancialMetricsProps {
  financeSummary: {
    total_income_usd: number;
    total_expense_usd: number;
    net_profit_usd: number;
    current_zig_rate: string;
  };
}

export const FinancialPulse: React.FC<FinancialMetricsProps> = ({ financeSummary }) => {
  const isProfitable = financeSummary.net_profit_usd >= 0;

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
                  ${financeSummary.total_income_usd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
              </IonCol>
              
              <IonCol size="12" sizeMd="4">
                <small style={{ color: 'var(--ion-color-medium)' }}>Operating Expenses</small>
                <h2 style={{ color: 'var(--ion-color-danger)', fontWeight: 'bold', margin: '4px 0 0' }}>
                  ${financeSummary.total_expense_usd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
                  ${financeSummary.net_profit_usd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
              </IonCol>
            </IonRow>
            
            <div style={{ marginTop: '12px', borderTop: '1px solid #f4f5f8', paddingTop: '8px' }}>
              <small style={{ color: 'var(--ion-color-medium)' }}>
                System rate: <strong>1 USD = {financeSummary.current_zig_rate} ZiG</strong>
              </small>
            </div>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};