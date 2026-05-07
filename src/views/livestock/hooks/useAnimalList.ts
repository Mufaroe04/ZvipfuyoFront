// src/views/livestock/hooks/useAnimalList.ts
import { useState, useMemo } from 'react';
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteAnimal } from '../../../redux/store/slices/livestockSlice';
import { Animal } from '../../../types/types';

export const useAnimalList = (animals: Animal[], filterIds?: number[]) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const { user } = useAppSelector((state) => state.auth);

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

  return {
    filteredAnimals,
    searchQuery,
    setSearchQuery,
    deleteTargetId,
    setDeleteTargetId,
    userRole: user?.profile?.role,
    handleDelete: async () => {
      if (deleteTargetId) {
        await dispatch(deleteAnimal(deleteTargetId)).unwrap();
        setDeleteTargetId(null);
      }
    },
    history
  };
};