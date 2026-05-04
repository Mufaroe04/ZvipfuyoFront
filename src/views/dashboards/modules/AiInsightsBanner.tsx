import React from 'react';
import { IonRow, IonCol, IonCard, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { sparklesOutline, arrowForwardOutline } from 'ionicons/icons';
import { useAppSelector } from '../../../redux/hooks';
import ReactMarkdown from 'react-markdown';

export const AiInsightsBanner: React.FC = () => {
  const { insights_data } = useAppSelector((state) => state.insights);
  const narrative = insights_data?.narrative?.executiveActionPlan;

  return (
    <IonRow>
      <IonCol size="12">
        <IonCard style={{ borderLeft: '4px solid var(--ion-color-secondary)', borderRadius: '16px', boxShadow: 'none' }}>
          <IonItem lines="none" style={{ alignItems: 'flex-start', py: 1 }}>
            <IonIcon icon={sparklesOutline} slot="start" color="secondary" style={{ marginTop: '12px' }} />
            <IonLabel className="ion-text-wrap" style={{ width: '100%', margin: '12px 0' }}>
              <h2 style={{ fontWeight: 800, color: '#18774c', marginBottom: '8px', fontSize: '1.1rem', letterSpacing: '-0.5px' }}>
                Zvipfuyo Intelligence
              </h2>
              <div style={{ color: '#444', lineHeight: '1.5', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <ReactMarkdown 
                  components={{
                    p: ({node, ...props}) => <span {...props} />,
                    ul: ({node, ...props}) => <span {...props} />, 
                    li: ({node, ...props}) => <span {...props} />
                  }}
                >
                  {narrative || "Analyzing farm data..."}
                </ReactMarkdown>
              </div>
            </IonLabel>
            <IonButton fill="clear" slot="end" routerLink="/insights" style={{ alignSelf: 'center', '--color': '#18774c', fontWeight: 600 }}>
              View All <IonIcon icon={arrowForwardOutline} slot="end" />
            </IonButton>
          </IonItem>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};