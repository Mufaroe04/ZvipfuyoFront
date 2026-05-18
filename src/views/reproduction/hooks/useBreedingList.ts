// import { useHistory } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { useEffect, useMemo, useState } from "react";
// import { fetchBreedingHistory, fetchUpcomingCalvings } from "../../../redux/store/slices/reproductionSlice";
// import { getReproductionColumns } from "../components/reproductionColumns";

// export const useBreedingList=()=>{
//     const history = useHistory();
//     const dispatch = useAppDispatch();
//     const { events, upcomingCalvings, loading } = useAppSelector((state) => state.reproduction);
//     const [searchQuery, setSearchQuery] = useState('');
//     const { user } = useAppSelector((state) => state.auth);
//     const userRole = user?.profile?.role;
//     const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
    
//     const columns = useMemo(() => 
//         getReproductionColumns(userRole,{
//         onView: (id) => history.push(`/reproduction/view/${id}`),
//         onEdit: (id) => history.push(`/reproduction/edit/${id}`),
//         onDelete: (id) => setDeleteTargetId(Number(id))
    
    
//         }), 
//         [history,userRole]
//     );
    
//         const handleDeleteConfirm = async () => {
//         // if (deleteTargetId !== null) {
//         //   try {
//         //     await dispatch(deleteHerd(deleteTargetId)).unwrap();
//         //   } catch (error) {
//         //     console.error("Delete failed:", error);
//         //   } finally {
//         //     setDeleteTargetId(null);
//         //   }
//         // }
//         };
//     const filteredEvents = useMemo(() => {
//         const data = events || [];
//         if (!searchQuery.trim()) return data;
        
//         const lowerQuery = searchQuery.toLowerCase();
//         return data.filter((e) => 
//         e.dam_tag?.toLowerCase().includes(lowerQuery) ||
//         e.sire_tag?.toLowerCase().includes(lowerQuery) ||
//         e.status?.toLowerCase().includes(lowerQuery)
//         );
//     }, [events, searchQuery]);
    
//       useEffect(() => {
//         dispatch(fetchBreedingHistory());
//         dispatch(fetchUpcomingCalvings());
//       }, [dispatch]);

//       return{
//         history,events,upcomingCalvings,loading,setSearchQuery,
//         deleteTargetId,columns,handleDeleteConfirm,filteredEvents,
//         searchQuery,setDeleteTargetId
//       }
// }
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useMemo, useState } from "react";
import { fetchBreedingHistory, fetchUpcomingCalvings, deleteBreedingEventThunk } from "../../../redux/store/slices/reproductionSlice";
import { getReproductionColumns } from "../components/reproductionColumns";
import { BreedingEvent } from "../../../types/types";

export const useBreedingList = (
  initialEvents: BreedingEvent[] = [],
  filterIds?: number[],
  paginationMode: 'client' | 'server' = 'client'
) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  
  const { events: storedEvents, upcomingCalvings, loading } = useAppSelector((state) => state.reproduction);
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user?.profile?.role;

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // SERVER-SIDE LIFECYCLE (Isolated strictly to explicit server-mode flags)
  useEffect(() => {
    if (paginationMode === 'server') {
      dispatch(fetchBreedingHistory({ page: paginationModel.page + 1 }));
      dispatch(fetchUpcomingCalvings({ page: paginationModel.page + 1 }));
    }
  }, [dispatch, paginationModel.page, paginationMode]);

  // ACTIVE DATA DATA SOURCE RESOLUTION
  const activeEventsSource = useMemo((): BreedingEvent[] => {
    if (paginationMode === 'server') {
      return storedEvents?.results || [];
    }
    return initialEvents || [];
  }, [paginationMode, storedEvents, initialEvents]);

  // MEMOIZED DISPATCHED CLIENT-SIDE FILTER SEARCH
  const filteredEvents = useMemo(() => {
    const baseData = activeEventsSource || [];
    
    return baseData.filter((event) => {
      const passFilter = filterIds ? filterIds.includes(event.id) : true;
      if (!passFilter) return false;
      if (!searchQuery.trim()) return true;

      const lowerQuery = searchQuery.toLowerCase();
      return (
        (event.dam_tag || '').toLowerCase().includes(lowerQuery) ||
        (event.sire_tag || '').toLowerCase().includes(lowerQuery) ||
        (event.status || '').toLowerCase().includes(lowerQuery)
      );
    });
  }, [activeEventsSource, searchQuery, filterIds]);

  const handleDeleteConfirm = async () => {
    if (deleteTargetId !== null) {
      try {
        await dispatch(deleteBreedingEventThunk(deleteTargetId)).unwrap();
      } catch (error) {
        console.error("Delete sequence abort:", error);
      } finally {
        setDeleteTargetId(null);
      }
    }
  };

  const columns = useMemo(() => 
    getReproductionColumns(userRole, {
      onView: (id) => history.push(`/reproduction/view/${id}`),
      onEdit: (id) => history.push(`/reproduction/edit/${id}`),
      onDelete: (id) => setDeleteTargetId(Number(id))
    }), 
    [history, userRole]
  );

  return {
    events: activeEventsSource,
    upcomingCalvings,
    loading,
    searchQuery,
    setSearchQuery,
    deleteTargetId,
    setDeleteTargetId,
    columns,
    history,
    storedEventsRaw: storedEvents,
    handleDeleteConfirm,
    filteredEvents,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    rowCount: paginationMode === 'server' ? (storedEvents?.count || 0) : filteredEvents.length
  };
};