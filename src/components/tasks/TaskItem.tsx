import React from 'react';
import { 
  IonItem, IonLabel, IonCheckbox, IonBadge, IonNote, 
  IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonText 
} from '@ionic/react';
import { 
  calendarOutline, checkmarkCircleOutline, createOutline, 
  trashOutline, personOutline, alertCircleOutline 
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description: string;
    is_completed: boolean;
    is_overdue: boolean;
    assigned_to_name: string;
    due_date: string;
    priority: string;
  };
  onToggle: (id: number, currentStatus: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  const history = useHistory();

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'primary';
      default: return 'medium';
    }
  };

  return (
    <IonItemSliding>
      <IonItem 
        className="ion-margin-vertical" 
        style={{ 
          '--border-radius': '12px', 
          'boxShadow': '0 2px 8px rgba(0,0,0,0.05)',
          'border': task.is_overdue && !task.is_completed ? '1px solid #eb445a' : '1px solid #f0f0f0'
        }}
      >
        <IonCheckbox 
          slot="start" 
          checked={task.is_completed} 
          onIonChange={() => onToggle(task.id, task.is_completed)}
          style={{ 
            '--checkbox-background-checked': '#18774c', 
            '--border-color-checked': '#18774c',
            marginRight: '12px'
          }}
        />
        
        <IonLabel className="ion-text-wrap" onClick={() => history.push(`/tasks/edit/${task.id}`)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h2 style={{ 
              fontWeight: task.is_completed ? 'normal' : 'bold', 
              textDecoration: task.is_completed ? 'line-through' : 'none',
              color: task.is_completed ? '#888' : '#000',
              margin: 0
            }}>
              {task.title}
            </h2>
            
            {/* Overdue Badge */}
            {task.is_overdue && !task.is_completed && (
              <IonBadge color="danger" mode="ios" style={{ fontSize: '10px', marginLeft: '8px' }}>
                <IonIcon icon={alertCircleOutline} style={{ verticalAlign: 'middle', marginRight: '2px' }} />
                OVERDUE
              </IonBadge>
            )}
          </div>

          <p style={{ fontSize: '0.85rem', marginTop: '4px', color: '#666' }}>
            {task.description || "No description provided."}
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginTop: '10px', gap: '12px' }}>
            {/* Priority */}
            <IonBadge color={getPriorityColor(task.priority)} mode="ios" style={{ fontSize: '10px', padding: '4px 8px' }}>
              {task.priority.toUpperCase()}
            </IonBadge>

            {/* Assigned To */}
            <IonNote style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', color: '#555' }}>
              <IonIcon icon={personOutline} style={{ marginRight: '4px' }} />
              {task.assigned_to_name}
            </IonNote>

            {/* Due Date */}
            {task.due_date && (
              <IonNote style={{ 
                fontSize: '0.75rem', 
                display: 'flex', 
                alignItems: 'center',
                color: task.is_overdue && !task.is_completed ? '#eb445a' : '#888',
                fontWeight: task.is_overdue && !task.is_completed ? 'bold' : 'normal'
              }}>
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
        <IonItemOption color="danger" onClick={() => { /* Delete Logic */ }}>
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default TaskItem;