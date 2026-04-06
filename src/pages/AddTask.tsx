import React from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonBackButton, 
  useIonLoading, 
  useIonToast 
} from '@ionic/react';
import { Container, Box, Typography, Divider } from '@mui/material';
import { useHistory } from 'react-router-dom';
import TaskForm from '../components/TaskForm'; 
import api from '../services/api';

const AddTask: React.FC = () => {
  const history = useHistory();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  const handleSave = async (formData: any) => {
    // Basic validation check before hitting the API
    if (!formData.title.trim()) {
      presentToast({ 
        message: 'Please provide a task title.', 
        duration: 2000, 
        color: 'warning' 
      });
      return;
    }

    await presentLoading({
      message: 'Creating task...',
      duration: 0 // Keep open until manual dismiss
    });

    try {
      await api.post('tasks/', {
        ...formData,
        is_completed: false,
        created_at: new Date().toISOString()
      });
      
      presentToast({ 
        message: 'Task assigned successfully', 
        duration: 2000, 
        color: 'success' 
      });
      
      history.goBack();
    } catch (err) {
      presentToast({ 
        message: 'Failed to save task. Please try again.', 
        duration: 3000, 
        color: 'danger' 
      });
    } finally {
      dismissLoading();
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/operations" />
          </IonButtons>
          <IonTitle>Assign New Task</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Container ensures the form doesn't stretch too wide on desktop */}
        <Container maxWidth="sm">
          <Box sx={{ mt: 2, mb: 3, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="700" gutterBottom>
              Task Assignment
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in the details below to schedule an operational task for the farm team.
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 4 }} />

          <TaskForm 
            onSubmit={handleSave} 
            buttonText="Create Task" 
          />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddTask;