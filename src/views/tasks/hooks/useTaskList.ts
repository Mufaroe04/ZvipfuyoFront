// import { useEffect, useState } from 'react';
// import { useIonToast } from '@ionic/react';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { fetchActiveTasks, toggleTaskOptimistic } from '../../../redux/store/slices/operationsSlice';

// export const useTaskList = () => {
//   const dispatch = useAppDispatch();
//   const [present] = useIonToast();
  
//   // Adjusted state selectors to securely point to .tasks.results
//   const { tasks, loading } = useAppSelector((state) => state.operations);
//   const [segment, setSegment] = useState<number>(0);

//   useEffect(() => {
//     dispatch(fetchActiveTasks());
//   }, [dispatch]);

//   const handleToggle = async (taskId: number, currentStatus: boolean) => {
//     try {
//       await dispatch(toggleTaskOptimistic({ id: taskId, currentStatus })).unwrap();
//     } catch (error) {
//       present({
//         message: 'Sync failed. Check your connection.',
//         duration: 2000,
//         color: 'danger'
//       });
//     }
//   };

//   const refreshTasks = async () => {
//     return dispatch(fetchActiveTasks());
//   };

//   const taskList = tasks?.results || [];
//   const todoTasks = taskList.filter(t => !t.is_completed);
//   const doneTasks = taskList.filter(t => t.is_completed);
//   const currentTasks = segment === 0 ? todoTasks : doneTasks;

//   return {
//     loading,
//     segment,
//     setSegment,
//     todoTasks,
//     doneTasks,
//     currentTasks,
//     handleToggle,
//     refreshTasks,
//   };
// };
import { useEffect, useState, useCallback } from 'react';
import { useIonToast } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchActiveTasks, toggleTaskOptimistic } from '../../../redux/store/slices/operationsSlice';

export const useTaskList = () => {
  const dispatch = useAppDispatch();
  const [present] = useIonToast();
  
  const { tasks, loading } = useAppSelector((state) => state.operations);
  const [segment, setSegment] = useState<number>(0);
  
  // Local structural state matching your grid configuration tracking
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // Centralized fetching logic that bridges 0-index to 1-index API parameters
  const loadTasks = useCallback((pageIndex: number) => {
    // Django API expects 1-indexed page limits
    return dispatch(fetchActiveTasks({ page: pageIndex + 1 }));
  }, [dispatch]);

  // Trigger initial fetch and reload whenever data reset requirements shift
  useEffect(() => {
    loadTasks(0);
  }, [loadTasks]);

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

  // Triggers complete reset sequence back to index 0
  const refreshTasks = async () => {
    setPaginationModel({ page: 0, pageSize: 10 });
    return loadTasks(0);
  };

  // Safe pagination progression engine
  const fetchNextPage = async () => {
    if (loading || !tasks.next) return;
    const nextPage = paginationModel.page + 1;
    setPaginationModel((prev) => ({ ...prev, page: nextPage }));
    await loadTasks(nextPage);
  };

  const taskList = tasks?.results || [];
  const todoTasks = taskList.filter(t => !t.is_completed);
  const doneTasks = taskList.filter(t => t.is_completed);
  const currentTasks = segment === 0 ? todoTasks : doneTasks;
  
  // High-level boolean state to toggle native viewport element nodes
  const hasMore = !!tasks.next;

  return {
    loading,
    segment,
    setSegment,
    todoTasks,
    doneTasks,
    currentTasks,
    hasMore,
    handleToggle,
    refreshTasks,
    fetchNextPage
  };
};