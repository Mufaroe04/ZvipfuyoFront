// import React from 'react';
// import { 
//   IonItem, IonLabel, IonCheckbox, IonBadge, IonNote, 
//   IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonText 
// } from '@ionic/react';
// import { 
//   calendarOutline, checkmarkCircleOutline, createOutline, 
//   trashOutline, personOutline, alertCircleOutline 
// } from 'ionicons/icons';
// import { useHistory } from 'react-router-dom';

// interface TaskItemProps {
//   task: {
//     id: number;
//     title: string;
//     description: string;
//     is_completed: boolean;
//     is_overdue: boolean;
//     assigned_to_name: string;
//     due_date: string;
//     priority: string;
//   };
//   onToggle: (id: number, currentStatus: boolean) => void;
// }

// const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
//   const history = useHistory();

//   const getPriorityColor = (priority: string) => {
//     switch (priority.toLowerCase()) {
//       case 'high': return 'danger';
//       case 'medium': return 'warning';
//       case 'low': return 'primary';
//       default: return 'medium';
//     }
//   };

//   return (
//     <IonItemSliding>
//       <IonItem 
//         className="ion-margin-vertical" 
//         style={{ 
//           '--border-radius': '4px', 
//           'boxShadow': '0 2px 4px rgba(0,0,0,0.05)',
//           'border': task.is_overdue && !task.is_completed ? '1px solid #eb445a' : '1px solid #f0f0f0'
//         }}
//       >
//         <IonCheckbox 
//           slot="start" 
//           checked={task.is_completed} 
//           onIonChange={() => onToggle(task.id, task.is_completed)}
//           style={{ 
//             '--checkbox-background-checked': '#18774c', 
//             '--border-color-checked': '#18774c',
//             marginRight: '12px'
//           }}
//         />
        
//         <IonLabel className="ion-text-wrap" onClick={() => history.push(`/tasks/edit/${task.id}`)}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//             <h2 style={{ 
//               fontWeight: task.is_completed ? 'normal' : 'bold', 
//               textDecoration: task.is_completed ? 'line-through' : 'none',
//               color: task.is_completed ? '#888' : '#000',
//               margin: 0
//             }}>
//               {task.title}
//             </h2>
            
//             {/* Overdue Badge */}
//             {task.is_overdue && !task.is_completed && (
//               <IonBadge color="danger" mode="ios" style={{ fontSize: '10px', marginLeft: '8px' }}>
//                 <IonIcon icon={alertCircleOutline} style={{ verticalAlign: 'middle', marginRight: '2px' }} />
//                 OVERDUE
//               </IonBadge>
//             )}
//           </div>

//           <p style={{ fontSize: '0.85rem', marginTop: '4px', color: '#666' }}>
//             {task.description || "No description provided."}
//           </p>
          
//           <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginTop: '4px', gap: '1px' }}>
//             {/* Priority */}
//             <IonBadge color={getPriorityColor(task.priority)} mode="ios" style={{ fontSize: '10px', padding: '4px 8px' }}>
//               {task.priority.toUpperCase()}
//             </IonBadge>

//             {/* Assigned To */}
//             <IonNote style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', color: '#555' }}>
//               <IonIcon icon={personOutline} style={{ marginRight: '4px' }} />
//               {task.assigned_to_name}
//             </IonNote>

//             {/* Due Date */}
//             {task.due_date && (
//               <IonNote style={{ 
//                 fontSize: '0.75rem', 
//                 display: 'flex', 
//                 alignItems: 'center',
//                 color: task.is_overdue && !task.is_completed ? '#eb445a' : '#888',
//                 fontWeight: task.is_overdue && !task.is_completed ? 'bold' : 'normal'
//               }}>
//                 <IonIcon icon={calendarOutline} style={{ marginRight: '4px' }} />
//                 {new Date(task.due_date).toLocaleDateString()}
//               </IonNote>
//             )}
//           </div>
//         </IonLabel>

//         {task.is_completed && <IonIcon icon={checkmarkCircleOutline} color="success" slot="end" />}
//       </IonItem>

//       <IonItemOptions side="end">
//         <IonItemOption color="primary" onClick={() => history.push(`/tasks/edit/${task.id}`)}>
//           <IonIcon slot="icon-only" icon={createOutline} />
//         </IonItemOption>
//         <IonItemOption color="danger" onClick={() => { /* Delete Logic */ }}>
//           <IonIcon slot="icon-only" icon={trashOutline} />
//         </IonItemOption>
//       </IonItemOptions>
//     </IonItemSliding>
//   );
// };

// export default TaskItem;
import React from 'react';
import { 
  IonItem, IonLabel, IonCheckbox, IonBadge, IonNote, 
  IonIcon, IonItemSliding, IonItemOptions, IonItemOption 
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
        style={{ 
          '--border-radius': '8px', 
          // 'boxShadow': '0 1px 3px rgba(0,0,0,0.04)',
          // 'border': task.is_overdue && !task.is_completed ? '1px solid #eb445a' : '1px solid #f0f0f0',
          // Tightens the gap between item cards (e.g., 6px margin top/bottom equals a tight 12px gap total)
          'margin': '6px 0',
          '--padding-start': '12px',
          '--padding-end': '12px',
          '--inner-padding-end': '0px'
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
        
        <IonLabel 
          className="ion-text-wrap" 
          onClick={() => history.push(`/tasks/edit/${task.id}`)}
          style={{ margin: '10px 0' }} // Standardizes vertical padding within the card boundaries
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h2 style={{ 
              fontWeight: task.is_completed ? '400' : '700', 
              textDecoration: task.is_completed ? 'line-through' : 'none',
              color: task.is_completed ? '#8e8e93' : '#1c1c1e',
              margin: 0,
              fontSize: '1rem'
            }}>
              {task.title}
            </h2>
            
            {/* Overdue Badge */}
            {task.is_overdue && !task.is_completed && (
              <IonBadge color="danger" mode="ios" style={{ fontSize: '10px', marginLeft: '8px', fontWeight: 'bold' }}>
                <IonIcon icon={alertCircleOutline} style={{ verticalAlign: 'middle', marginRight: '2px' }} />
                OVERDUE
              </IonBadge>
            )}
          </div>

          <p style={{ fontSize: '0.85rem', marginTop: '4px', marginBottom: '8px', color: '#636366' }}>
            {task.description || "No description provided."}
          </p>
          
          {/* Metadata Footer Layout Grid - Increased flex gap from 1px to 12px for clear readability */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
            {/* Priority */}
            <IonBadge color={getPriorityColor(task.priority)} mode="ios" style={{ fontSize: '10px', padding: '3px 6px', fontWeight: '600' }}>
              {task.priority.toUpperCase()}
            </IonBadge>

            {/* Assigned To */}
            <IonNote style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', color: '#8e8e93' }}>
              <IonIcon icon={personOutline} style={{ marginRight: '4px', fontSize: '14px' }} />
              {task.assigned_to_name}
            </IonNote>

            {/* Due Date */}
            {task.due_date && (
              <IonNote style={{ 
                fontSize: '0.75rem', 
                display: 'flex', 
                alignItems: 'center',
                color: task.is_overdue && !task.is_completed ? '#eb445a' : '#8e8e93',
                fontWeight: task.is_overdue && !task.is_completed ? '700' : '400'
              }}>
                <IonIcon icon={calendarOutline} style={{ marginRight: '4px', fontSize: '14px' }} />
                {new Date(task.due_date).toLocaleDateString()}
              </IonNote>
            )}
          </div>
        </IonLabel>

        {task.is_completed && <IonIcon icon={checkmarkCircleOutline} color="success" slot="end" style={{ marginRight: '8px' }} />}
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