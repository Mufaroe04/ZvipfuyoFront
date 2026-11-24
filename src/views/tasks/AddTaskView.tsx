import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/react';
import { Container } from '@mui/material';
import TaskForm from './components/TaskForm';
import { useTaskForm } from './hooks/useTaskForm';

const AddTaskView: React.FC = () => {
  const { handleSave } = useTaskForm(false);

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
        <Container maxWidth="sm">
          <TaskForm 
            title="Task Assignment"
            onSubmit={handleSave} 
            buttonText="Create Task" 
          />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddTaskView;