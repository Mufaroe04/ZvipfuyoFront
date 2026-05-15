// import { useEffect, useState, useMemo } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { useHistory } from "react-router-dom";
// import { fetchAllHerds, deleteHerd } from '../../../redux/store/slices/livestockSlice';
// import { getHerdColumns } from '../components/herdColumns';

// export const useHerdList = () => {
//    const dispatch = useAppDispatch();
//     const history = useHistory();
    
//     const { herds, loading } = useAppSelector((state) => state.livestock);
    
//     // DIRECT REDUX FIX: Read the user role directly from auth state
//     const { user } = useAppSelector((state) => state.auth);
//     const userRole = user?.profile?.role;
  
//     const [searchQuery, setSearchQuery] = useState('');
//     const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
//     const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 10,
//   });
//     // Derive if the current user has privileged access
//     const isPrivileged = userRole === 'owner' || userRole === 'manager';
  
//     useEffect(() => {
//       dispatch(fetchAllHerds({ page: paginationModel.page + 1 }));
//     }, [dispatch,paginationModel.page]);
  
//     const handleDeleteConfirm = async () => {
//       if (deleteTargetId !== null) {
//         try {
//           await dispatch(deleteHerd(deleteTargetId)).unwrap();
//         } catch (error) {
//           console.error("Delete failed:", error);
//         } finally {
//           setDeleteTargetId(null);
//         }
//       }
//     };
  
//     // Memoize column definitions to prevent unnecessary table re-renders

  
//     // Memoize data filtering logic
//     const filteredHerds = useMemo(() => {
//       const data = herds?.results ||[];
//       if (!searchQuery.trim()) return data;
  
//       const lowerQuery = searchQuery.toLowerCase();
//       return data.filter((herd) =>
//         herd.name.toLowerCase().includes(lowerQuery) ||
//         herd.location.toLowerCase().includes(lowerQuery)
//       );
//     }, [herds, searchQuery]);

//   // useEffect(() => { dispatch(fetchAllHerds()); }, [dispatch]);


//   const handlers = {
//     onView: (id: any) => history.push(`/herds/${id}`),
//     onEdit: (id: any) => history.push(`/herds/edit/${id}`),
//     onDelete: (id: any) => setDeleteTargetId(Number(id)),
//     confirmDelete: async () => {
//       if (deleteTargetId) {
//         await dispatch(deleteHerd(deleteTargetId)).unwrap();
//         setDeleteTargetId(null);
//       }
//     }
//   };

//       const columns = useMemo(() => 
//       getHerdColumns(userRole,
//       //    {
//       //   onView: (id) => history.push(`/herds/${id}`),
//       //   onEdit: (id) => history.push(`/herds/edit/${id}`),
//       //   onDelete: (id) => setDeleteTargetId(Number(id))
//       // }
//       handlers
//     ), 
//       [history, userRole]
//     );

//   return { filteredHerds, loading, searchQuery, setSearchQuery,
//      deleteTargetId, setDeleteTargetId, handlers, userRole,
//       isPrivileged ,columns ,history,   paginationModel,
//     setPaginationModel,rowCount: herds.count,};
// }; 
import { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useHistory } from "react-router-dom";
import { fetchAllHerds, deleteHerd } from '../../../redux/store/slices/livestockSlice';
import { getHerdColumns } from '../components/herdColumns';

export const useHerdList = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  
  const { herds, loading } = useAppSelector((state) => state.livestock);
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user?.profile?.role;

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const isPrivileged = userRole === 'owner' || userRole === 'manager';

  // Server-side page fetching sync block
  useEffect(() => {
    dispatch(fetchAllHerds({ 
      page: paginationModel.page + 1,
    }));
  }, [dispatch, paginationModel.page]);

  // Wrap actions into stable configuration blocks
  const handlers = useMemo(() => ({
    onView: (id: any) => history.push(`/herds/${id}`),
    onEdit: (id: any) => history.push(`/herds/edit/${id}`),
    onDelete: (id: any) => setDeleteTargetId(Number(id)),
    confirmDelete: async () => {
      if (deleteTargetId) {
        try {
          await dispatch(deleteHerd(deleteTargetId)).unwrap();
        } catch (error) {
          console.error("Failed to delete herd context:", error);
        } finally {
          setDeleteTargetId(null);
        }
      }
    }
  }), [history, deleteTargetId, dispatch]);

  const columns = useMemo(() => 
    getHerdColumns(userRole, handlers), 
    [userRole, handlers]
  );

  const filteredHerds = useMemo(() => {
    const data = herds?.results || [];
    if (!searchQuery.trim()) return data;

    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((herd) =>
      herd.name.toLowerCase().includes(lowerQuery) ||
      herd.location.toLowerCase().includes(lowerQuery)
    );
  }, [herds, searchQuery]);

  return { 
    filteredHerds, 
    loading, 
    searchQuery, 
    setSearchQuery,
    deleteTargetId, 
    setDeleteTargetId, 
    handlers, 
    userRole,
    isPrivileged, 
    columns, 
    paginationModel,
    setPaginationModel,
    onPaginationModelChange: setPaginationModel,
    rowCount: herds?.count || 0,
  };
};