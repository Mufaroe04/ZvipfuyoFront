import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonBackButton, useIonLoading, useIonToast 
} from '@ionic/react';
import { Container, Box, Typography, Alert } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import TaskForm from '../components/TaskForm';
import api from '../services/api';

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  // Pulling the task directly from Redux for immediate population
  const task = useAppSelector(state => 
    state.operations.tasks.find(t => t.id === parseInt(id))
  );

  const handleUpdate = async (updatedData: any) => {
    await presentLoading('Updating task...');
    try {
      await api.patch(`tasks/${id}/`, updatedData);
      presentToast({ message: 'Task updated successfully', duration: 2000, color: 'success' });
      history.goBack();
    } catch (err) {
      presentToast({ message: 'Failed to update task', duration: 2000, color: 'danger' });
    } finally {
      dismissLoading();
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton /></IonButtons>
          <IonTitle>Modify Task</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <Container maxWidth="sm">
          <Box sx={{ my: 2 }}>
            <Typography variant="h5" fontWeight="bold">Edit Details</Typography>
            <Typography variant="body2" color="text.secondary">
              Update task priority, instructions, or deadlines.
            </Typography>
          </Box>

          {task ? (
            <TaskForm 
              initialData={task} 
              onSubmit={handleUpdate} 
              buttonText="Update Task" 
            />
          ) : (
            <Alert severity="error" sx={{ mt: 4 }}>
              Task record not found. Please go back and try again.
            </Alert>
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default EditTask;