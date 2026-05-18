import { useHistory, useParams } from 'react-router-dom';
import { useIonLoading, useIonToast } from '@ionic/react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { fetchActiveTasks } from '../../../redux/store/slices/operationsSlice';
import api from '../../../services/api';

export const useTaskForm = (isEditMode: boolean) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  // Safely navigating down the backend .results array boundary map
  const task = useAppSelector(state =>
    state.operations.tasks.results.find(t => t.id === parseInt(id))
  );

  const handleSave = async (formData: any) => {
    if (!formData.title.trim()) {
      presentToast({ message: 'Please provide a task title.', duration: 2000, color: 'warning' });
      return;
    }

    await presentLoading({ message: isEditMode ? 'Updating task...' : 'Creating task...' });

    try {
      if (isEditMode) {
        await api.patch(`tasks/${id}/`, formData);
        presentToast({ message: 'Task updated successfully', duration: 2000, color: 'success' });
      } else {
        await api.post('tasks/', {
          ...formData,
          is_completed: false,
          created_at: new Date().toISOString()
        });
        presentToast({ message: 'Task assigned successfully', duration: 2000, color: 'success' });
      }
      
      // Force refresh data in store to keep paginated layout perfectly synced
      await dispatch(fetchActiveTasks());
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

  return {
    task,
    handleSave,
  };
};