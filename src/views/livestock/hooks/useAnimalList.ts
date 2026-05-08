// src/views/livestock/hooks/useAnimalList.ts
import { useState, useMemo, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteAnimal, } from '../../../redux/store/slices/livestockSlice';
import { Animal } from '../../../types/types';
import { getAnimalColumns } from '../components/animalColumns';

export const useAnimalList = (animals: Animal[], filterIds?: number[]) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { selectedAnimal, loading } = useAppSelector((state) => state.livestock);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user?.profile?.role;

    // useEffect(() => {
    //   if (id) dispatch(fetchFullAnimalProfile(Number(id)));
    // }, [id, dispatch]);

  const filteredAnimals = useMemo(() => { 
    return (animals || []).filter((animal) => {
      const passFilter = filterIds ? filterIds.includes(animal.id) : true;
      if (!passFilter) return false;
      if (!searchQuery.trim()) return true;
      const lowerQuery = searchQuery.toLowerCase();
      return animal.tag_number.toLowerCase().includes(lowerQuery) || 
             (animal.breed || '').toLowerCase().includes(lowerQuery);
    });
  }, [animals, searchQuery, filterIds]);

     const handleDelete= async () => {
      if (deleteTargetId) {
        await dispatch(deleteAnimal(deleteTargetId)).unwrap();
        setDeleteTargetId(null);
      }
    }
  const columns = useMemo(() => 
    getAnimalColumns(userRole, {
      onView: (id) => history.push(`/animal/${id}`),
      onEdit: (id) => history.push(`/animal/edit/${id}`),
      onDelete: (id) => setDeleteTargetId(Number(id))
    }), 
    [history, userRole, setDeleteTargetId]
  );
  return {
    id,
    filteredAnimals,
    searchQuery,
    setSearchQuery,
    deleteTargetId,
    setDeleteTargetId,
    userRole: user?.profile?.role,
    handleDelete,
    history,
    selectedAnimal,
    loading,
    columns
  };
};