import React from 'react';
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonBadge, IonIcon } from '@ionic/react';
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
            <IonCardTitle><IonIcon icon={calendarOutline} /> Task Summary</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {upcomingTasks && upcomingTasks.length > 0 ? (
              <IonList lines="full">
                {upcomingTasks.slice(0, 3).map((task) => (
                  <IonItem key={task.id}>
                    <IonLabel>
                      <p style={{ fontWeight: 'bold' }}>{task.title}</p>
                      <small style={{ color: 'var(--ion-color-medium)' }}>Assigned to: {task.assigned_to_name}</small>
                    </IonLabel>
                    <IonLabel slot="end" color={task.priority === 'high' ? 'danger' : 'primary'}>
                      <small style={{ color: 'var(--ion-color-medium)' }}>{task.priority} </small> 
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
                      <IonBadge color="warning">{taskStats.due_today}</IonBadge>
                    </td>
                  </tr>
                  <tr>
                    <td>Overdue</td>
                    <td className="ion-text-end">
                      <IonBadge color="danger">{taskStats.overdue}</IonBadge>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </IonCardContent>
        </IonCard>
      </IonCol>

      <IonCol size="12" sizeMd="4">
        <IonCard style={{ borderBottom: '4px solid var(--ion-color-warning)', height: '100%' }}>
          <IonCardHeader>
            <IonCardTitle><IonIcon icon={repeatOutline} /> Transfers</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
              <IonItem>
                <IonLabel>  <small style={{ color: 'var(--ion-color-medium)' }}>Pending</small> </IonLabel>
                <IonLabel color="warning">{transferStats.pending}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>  <small style={{ color: 'var(--ion-color-medium)' }}>In Transit</small></IonLabel>
                <IonLabel color="primary">{transferStats.intransit}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel> <small style={{ color: 'var(--ion-color-medium)' }}>Incoming</small> </IonLabel>
                <IonLabel color="success">{transferStats.incoming}</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};