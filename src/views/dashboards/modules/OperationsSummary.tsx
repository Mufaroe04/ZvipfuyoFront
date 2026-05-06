import React from 'react';
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonList, IonItem, IonLabel, IonBadge, IonIcon, IonCardTitle, IonText } from '@ionic/react';
import { calendarOutline, repeatOutline } from 'ionicons/icons';
import { useAppSelector } from '../../../redux/hooks';

export const OperationsSummary: React.FC = () => {
  const { data } = useAppSelector((state) => state.dashboard);

  const upcomingTasks = data?.upcoming_tasks;
  const taskStats = data?.task_stats || { due_today: 0, overdue: 0 };
  const transferStats = data?.transfer_stats || { pending: 0, intransit: 0, incoming: 0 };

  return (
    <IonRow>
      <IonCol size="12" sizeMd="8">
        <IonCard style={{ borderBottom: '4px solid var(--ion-color-success)', height: '100%' }}>
          <IonCardHeader>
            <IonCardTitle style={{  color: 'var(--ion-color-dark)' }}><IonIcon icon={calendarOutline} /> Task Summary</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {upcomingTasks && upcomingTasks.length > 0 ? (
              <IonList lines="full">
                {upcomingTasks.slice(0, 3).map((task) => (
                  <IonItem key={task.id}>
                    <IonLabel>
                      <IonText style={{  color: 'var(--ion-color-medium)' }}>{task.title}</IonText> <br></br>
                      < small style={{ color: 'var(--ion-color-medium)', fontWeight:'bold' }}> Assigned to: {task.assigned_to_name}</ small>
                    </IonLabel>
                    <IonLabel slot="end" color={task.priority === 'high' ? 'danger' : 'primary'}>
                      < IonText style={{ color: 'var(--ion-color-dark)' }}>{task.priority} </ IonText> 
                    </IonLabel>
                  </IonItem>
                    
                ))}
              </IonList>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td>Due Today</td>
                    <td className="ion-text-end">
                      <IonText color="warning">{taskStats.due_today}</IonText>
                    </td>
                  </tr>
                  <tr>
                    <td>Overdue</td>
                    <td className="ion-text-end">
                      <IonText color="danger">{taskStats.overdue}</IonText>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </IonCardContent>
        </IonCard>
      </IonCol>

      <IonCol size="12" sizeMd="4">
        <IonCard style={{ borderBottom: '4px solid var(--ion-color-warning)', height: '100%'  }}>
          <IonCardHeader>
            <IonCardTitle style={{  color: 'var(--ion-color-dark)' }}><IonIcon icon={repeatOutline} /> Transfers</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
              <IonItem>
                <IonLabel>  < IonText style={{  color: 'var(--ion-color-medium)' }}>Pending</ IonText> </IonLabel>
                <IonCardTitle style={{  fontWeight: 'bold',  }} >{transferStats.pending}</IonCardTitle>
              </IonItem>
              <IonItem>
                <IonLabel>  < IonText style={{  color: 'var(--ion-color-medium)' }} >In Transit</ IonText></IonLabel>
                <IonCardTitle style={{  fontWeight: 'bold',  }}  >{transferStats.intransit}</IonCardTitle>
              </IonItem>
              <IonItem>
                <IonLabel> < IonText style={{  color: 'var(--ion-color-medium)' }} >Incoming</ IonText> </IonLabel>
                <IonCardTitle style={{  fontWeight: 'bold',  }}  >{transferStats.incoming}</IonCardTitle>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};