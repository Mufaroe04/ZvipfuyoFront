import { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useHistory } from "react-router-dom";
import { fetchAllHerds, deleteHerd } from '../../../redux/store/slices/livestockSlice';

export const useHerdList = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { herds, loading } = useAppSelector((state) => state.livestock);
  const { user } = useAppSelector((state) => state.auth);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const userRole = user?.profile?.role;
  const isPrivileged = userRole === 'owner' || userRole === 'manager';

  useEffect(() => { dispatch(fetchAllHerds()); }, [dispatch]);

  const filteredHerds = useMemo(() => {
    const data = herds || [];
    if (!searchQuery.trim()) return data;
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((h) => h.name.toLowerCase().includes(lowerQuery) || h.location.toLowerCase().includes(lowerQuery));
  }, [herds, searchQuery]);

  const handlers = {
    onView: (id: any) => history.push(`/herds/${id}`),
    onEdit: (id: any) => history.push(`/herds/edit/${id}`),
    onDelete: (id: any) => setDeleteTargetId(Number(id)),
    confirmDelete: async () => {
      if (deleteTargetId) {
        await dispatch(deleteHerd(deleteTargetId)).unwrap();
        setDeleteTargetId(null);
      }
    }
  };

  return { filteredHerds, loading, searchQuery, setSearchQuery, deleteTargetId, setDeleteTargetId, handlers, userRole, isPrivileged };
};