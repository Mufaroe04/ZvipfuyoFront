import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/react';
import { Container, Alert } from '@mui/material';
import TaskForm from './components/TaskForm';
import { useTaskForm } from './hooks/useTaskForm';

const EditTaskView: React.FC = () => {
  const { task, handleSave } = useTaskForm(true);

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
          {task ? (
            <TaskForm 
              title="Edit Details"
              initialData={task} 
              onSubmit={handleSave} 
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

export default EditTaskView;
