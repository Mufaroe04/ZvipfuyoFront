// // src/views/livestock/hooks/useAnimalList.ts
// import { useState, useMemo, useEffect } from 'react';
// import { useHistory, useParams } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { deleteAnimal, } from '../../../redux/store/slices/livestockSlice';
// import { Animal } from '../../../types/types';
// import { getAnimalColumns } from '../components/animalColumns';

// export const useAnimalList = (animals: Animal[], filterIds?: number[]) => {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useAppDispatch();
//   const history = useHistory();
//   const { selectedAnimal, loading } = useAppSelector((state) => state.livestock);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
//   const { user } = useAppSelector((state) => state.auth);
//   const userRole = user?.profile?.role;

//     // useEffect(() => {
//     //   if (id) dispatch(fetchFullAnimalProfile(Number(id)));
//     // }, [id, dispatch]);

//   const filteredAnimals = useMemo(() => { 
//     return (animals || []).filter((animal) => {
//       const passFilter = filterIds ? filterIds.includes(animal.id) : true;
//       if (!passFilter) return false;
//       if (!searchQuery.trim()) return true;
//       const lowerQuery = searchQuery.toLowerCase();
//       return animal.tag_number.toLowerCase().includes(lowerQuery) || 
//              (animal.breed || '').toLowerCase().includes(lowerQuery);
//     });
//   }, [animals, searchQuery, filterIds]);

//      const handleDelete= async () => {
//       if (deleteTargetId) {
//         await dispatch(deleteAnimal(deleteTargetId)).unwrap();
//         setDeleteTargetId(null);
//       }
//     }
//   const columns = useMemo(() => 
//     getAnimalColumns(userRole, {
//       onView: (id) => history.push(`/animal/${id}`),
//       onEdit: (id) => history.push(`/animal/edit/${id}`),
//       onDelete: (id) => setDeleteTargetId(Number(id))
//     }), 
//     [history, userRole, setDeleteTargetId]
//   );
//   return {
//     id,
//     filteredAnimals,
//     searchQuery,
//     setSearchQuery,
//     deleteTargetId,
//     setDeleteTargetId,
//     userRole: user?.profile?.role,
//     handleDelete,
//     history,
//     selectedAnimal,
//     loading,
//     columns
//   };
// };

import { useState, useMemo, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteAnimal, fetchAllAnimals } from '../../../redux/store/slices/livestockSlice';
import { Animal } from '../../../types/types';
import { getAnimalColumns } from '../components/animalColumns';

export const useAnimalList = (
  initialAnimals: Animal[], 
  filterIds?: number[], 
  paginationMode: 'client' | 'server' = 'client'
) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  
  // Connect cleanly to global slice state
  const { animals: storeAnimals,  loading } = useAppSelector((state) => state.livestock);
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user?.profile?.role;

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  
  // Standard DataGrid pagination tracking structure
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // SERVER-SIDE DISPATCH LIFECYCLE
  // Automatically runs when page changes, only if the mode is set to server
  useEffect(() => {
    if (paginationMode === 'server') {
      dispatch(fetchAllAnimals({ 
        page: paginationModel.page + 1,
      }));
    }
  }, [dispatch, paginationModel.page, paginationMode]);

  // SOURCE SELECTION
  // Determines whether to filter the array passed into props or the array inside Redux
  const activeAnimalsSource = useMemo((): Animal[] => {
    if (paginationMode === 'server') {
      return storeAnimals?.results || [];
    }
    return initialAnimals || [];
  }, [paginationMode, storeAnimals, initialAnimals]);

  // MEMOIZED FILTER LOGIC
  const filteredAnimals = useMemo(() => { 
    return activeAnimalsSource.filter((animal) => {
      const passFilter = filterIds ? filterIds.includes(animal.id) : true;
      if (!passFilter) return false;
      if (!searchQuery.trim()) return true;
      
      const lowerQuery = searchQuery.toLowerCase();
      return animal.tag_number.toLowerCase().includes(lowerQuery) || 
             (animal.breed || '').toLowerCase().includes(lowerQuery);
    });
  }, [activeAnimalsSource, searchQuery, filterIds]);

  const handleDelete = async () => {
    if (deleteTargetId) {
      try {
        await dispatch(deleteAnimal(deleteTargetId)).unwrap();
      } catch (error) {
        console.error("Failed to delete animal record:", error);
      } finally {
        setDeleteTargetId(null);
      }
    }
  };

  const columns = useMemo(() => 
    getAnimalColumns(userRole, {
      onView: (id) => history.push(`/animal/${id}`),
      onEdit: (id) => history.push(`/animal/edit/${id}`),
      onDelete: (id) => setDeleteTargetId(Number(id))
    }), 
    [history, userRole]
  );

  return {
    id,
    filteredAnimals,
    searchQuery,
    storeAnimals,
    setSearchQuery,
    deleteTargetId,
    setDeleteTargetId,
    userRole,
    handleDelete,
    history,
    loading,
    columns,
    // Add pagination attributes to prevent layout code modifications later
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    rowCount: paginationMode === 'server' ? (storeAnimals.count || 0) : filteredAnimals.length
  };
};