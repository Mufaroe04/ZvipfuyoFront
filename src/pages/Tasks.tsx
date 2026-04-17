import React, { useEffect } from 'react';
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
  IonTitle, IonToolbar, IonList, IonLabel, IonIcon, IonSegment, 
  IonSegmentButton, IonRefresher, IonRefresherContent, useIonToast
} from '@ionic/react';
import { syncOutline, addOutline, checkmarkCircleOutline, ellipseOutline } from 'ionicons/icons';
import { Box, Typography, Stack, Button, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchActiveTasks, toggleTaskOptimistic } from '../redux/store/slices/operationsSlice';
import TaskItem from '../components/TaskItem';

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
        message: 'Sync failed. Check your connection.',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  const todoTasks = tasks.filter(t => !t.is_completed);
  const doneTasks = tasks.filter(t => t.is_completed);
  const currentTasks = segment === 'todo' ? todoTasks : doneTasks;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Operations</IonTitle>
        </IonToolbar>
        
        <IonToolbar>
          <IonSegment 
            value={segment} 
            onIonChange={(e: any) => setSegment(e.detail.value)}
            style={{ padding: '0 8px' }}
          >
            <IonSegmentButton value="todo">
              <IonLabel>Pending ({todoTasks.length})</IonLabel>
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

        <Container maxWidth="lg">
          {/* Standardized Header Stack */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3, mt: 1 }}>
            <Box>
              <Typography variant="h5" fontWeight="bold">Daily Routine</Typography>
              <Typography variant="body2" color="text.secondary">
                Kraal maintenance & stock care
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />}
              onClick={() => history.push('/tasks/add')}
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none', 
                fontWeight: 'bold', 
                bgcolor: '#18774c',
                '&:hover': { bgcolor: '#14633f' }
              }}
            >
              New Task
            </Button>
          </Stack>

          <IonList lines="none" style={{ background: 'transparent' }}>
            {currentTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={handleToggle} />
            ))}

            {/* Empty State */}
            {currentTasks.length === 0 && !loading && (
              <Box sx={{ textAlign: 'center', py: 8, opacity: 0.5 }}>
                <IonIcon 
                  icon={segment === 'todo' ? checkmarkCircleOutline : ellipseOutline} 
                  style={{ fontSize: '64px' }} 
                />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {segment === 'todo' ? 'All caught up!' : 'No completed tasks yet.'}
                </Typography>
              </Box>
            )}
          </IonList>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Tasks;