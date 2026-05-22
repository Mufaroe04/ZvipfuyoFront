import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { alertCircleOutline, megaphoneOutline, warningOutline } from 'ionicons/icons';
import { fetchNotifications, markNotificationRead } from '../../../redux/store/slices/notificationSlice';
import { useHistory } from 'react-router-dom';

export const useNotificationList = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.notifications);
  
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const loadNotifications = useCallback((pageIndex: number) => {
    return dispatch(fetchNotifications({ page: pageIndex + 1 }));
  }, [dispatch]);

  // Sync effect initialization on first viewport mount
  useEffect(() => {
    loadNotifications(0);
  }, [loadNotifications]);

  const handleRefresh = async (event: CustomEvent) => {
    setPaginationModel({ page: 0, pageSize: 10 });
    await loadNotifications(0);
    event.detail.complete();
  };

  const handleAction = (id: number, link?: string) => {
    dispatch(markNotificationRead(id));
    if (link) history.push(link);
  };

  const handleDismiss = (id: number) => {
    dispatch(markNotificationRead(id));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'danger': return '#d32f2f';
      case 'warning': return '#ed6c02';
      case 'info': return '#0288d1';
      default: return '#757575';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'danger': return alertCircleOutline;
      case 'warning': return warningOutline;
      default: return megaphoneOutline;
    }
  };

  const fetchNextPage = async () => {
    if (loading || !items?.next) return;
    const nextPage = paginationModel.page + 1;
    setPaginationModel((prev) => ({ ...prev, page: nextPage }));
    await loadNotifications(nextPage);
  };

  // Safe evaluation checking arrays inside slice formats
  const notificationsArray = Array.isArray(items) ? items : items?.results || [];
  const hasMore = !!items?.next;

  return {
    notifications: notificationsArray,
    loading,
    hasMore,
    handleRefresh,
    handleAction,
    handleDismiss,
    getLevelColor,
    getLevelIcon,
    fetchNextPage
  };
};