import React, { useEffect } from 'react';
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
  IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonCheckbox,
  IonBadge, IonNote, IonIcon, IonSegment, IonSegmentButton,
  IonRefresher, IonRefresherContent, useIonToast,
  IonText, IonButton, IonItemSliding, IonItemOptions, IonItemOption
} from '@ionic/react';
import { 
  checkmarkCircleOutline, ellipseOutline, calendarOutline, 
  syncOutline, addOutline, createOutline, trashOutline 
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchActiveTasks, toggleTaskOptimistic } from '../redux/store/slices/operationsSlice';

const Tasks: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [present] = useIonToast();
  const { tasks, loading } = useAppSelector((state) => state.operations);
  const [segment, setSegment] = React.useState<'todo' | 'done'>('todo');

  useEffect(() => {
    dispatch(fetchActiveTasks());
  }, [dispatch]);

  const handleToggle = async (taskId: number, currentStatus: boolean) => {
    try {
      await dispatch(toggleTaskOptimistic({ id: taskId, currentStatus })).unwrap();
    } catch (error) {
      present({
        message: 'Failed to sync task. Try again.',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  const todoTasks = tasks.filter(t => !t.is_completed);
  const doneTasks = tasks.filter(t => t.is_completed);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle>Operations</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/tasks/add')}>
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        
        <IonToolbar>
          <IonSegment value={segment} onIonChange={(e: any) => setSegment(e.detail.value)}>
            <IonSegmentButton value="todo">
              <IonLabel>To Do ({todoTasks.length})</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="done">
              <IonLabel>Completed</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={(e) => {
          dispatch(fetchActiveTasks()).finally(() => e.detail.complete());
        }}>
          <IonRefresherContent pullingIcon={syncOutline} refreshingSpinner="circles" />
        </IonRefresher>

        <div className="ion-padding-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <IonText color="dark">
              <h1 style={{ fontWeight: 'bold', margin: '0' }}>Daily Routine</h1>
            </IonText>
            <IonNote>Kraal maintenance & stock care</IonNote>
          </div>
          {/* Alternative 'Add' button in the content area */}
          <IonButton fill="clear" onClick={() => history.push('/tasks/add')}>
             <IonIcon icon={addOutline} slot="start" />
             New Task
          </IonButton>
        </div>

        <IonList lines="none">
          {(segment === 'todo' ? todoTasks : doneTasks).map((task) => (
            <IonItemSliding key={task.id}>
              <IonItem 
                className="ion-margin-vertical" 
                style={{ 
                  '--border-radius': '12px', 
                  '--padding-start': '10px',
                  'boxShadow': '0 2px 8px rgba(0,0,0,0.05)',
                  'border': '1px solid #f0f0f0'
                }}
              >
                <IonCheckbox 
                  slot="start" 
                  checked={task.is_completed} 
                  onIonChange={() => handleToggle(task.id, task.is_completed)}
                />
                
                <IonLabel className="ion-text-wrap" onClick={() => history.push(`/tasks/edit/${task.id}`)}>
                  <h2 style={{ 
                    fontWeight: task.is_completed ? 'normal' : 'bold', 
                    textDecoration: task.is_completed ? 'line-through' : 'none',
                    color: task.is_completed ? '#888' : '#000'
                  }}>
                    {task.title}
                  </h2>
                  <p>{task.description}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px', gap: '10px' }}>
                    <IonBadge color={getPriorityColor(task.priority)} mode="ios">
                      {task.priority.toUpperCase()}
                    </IonBadge>
                    {task.due_date && (
                      <IonNote style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center' }}>
                        <IonIcon icon={calendarOutline} style={{ marginRight: '4px' }} />
                        {new Date(task.due_date).toLocaleDateString()}
                      </IonNote>
                    )}
                  </div>
                </IonLabel>

                {task.is_completed && <IonIcon icon={checkmarkCircleOutline} color="success" slot="end" />}
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption color="primary" onClick={() => history.push(`/tasks/edit/${task.id}`)}>
                  <IonIcon slot="icon-only" icon={createOutline} />
                </IonItemOption>
                <IonItemOption color="danger" onClick={() => {/* Handle delete logic */}}>
                  <IonIcon slot="icon-only" icon={trashOutline} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}

          {/* Empty State */}
          {(segment === 'todo' ? todoTasks : doneTasks).length === 0 && !loading && (
            <div className="ion-text-center ion-padding" style={{ marginTop: '40px' }}>
              <IonIcon icon={segment === 'todo' ? checkmarkCircleOutline : ellipseOutline} style={{ fontSize: '64px', color: '#ccc' }} />
              <p style={{ color: '#888' }}>
                {segment === 'todo' ? 'All caught up! No pending tasks.' : 'No completed tasks yet.'}
              </p>
            </div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high': return 'danger';
    case 'medium': return 'warning';
    case 'low': return 'primary';
    default: return 'medium';
  }
};

export default Tasks;