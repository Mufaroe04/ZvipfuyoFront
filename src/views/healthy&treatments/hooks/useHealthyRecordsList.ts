// import { useHistory } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { useEffect, useMemo, useState } from "react";
// import { fetchHealthRecords } from "../../../redux/store/slices/operationsSlice";
// import { deleteHerd } from "../../../redux/store/slices/livestockSlice";
// import { getHealthColumns } from "../components/healthColumns";

// export const useHealthyRecordsList=()=>{
//     const history = useHistory();
//     const dispatch = useAppDispatch();
//     const { healthRecords, loading } = useAppSelector((state) => state.operations);
//     const [paginationModel, setPaginationModel] = useState({
//       page: 0,
//       pageSize: 10,
//     });
//     useEffect(() => {
//     dispatch(fetchHealthRecords({ page: paginationModel.page + 1 }));
//     }, [dispatch, paginationModel.page]);

//     const totalSpend = useMemo(() => 
//     healthRecords.results.reduce((sum, r) => sum + (+r.cost || 0), 0), 
//     [healthRecords]
//     );
//     const [searchQuery, setSearchQuery] = useState('');
//     const { user } = useAppSelector((state) => state.auth);
//     const userRole = user?.profile?.role;
//     const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
    

//     const handleDeleteConfirm = async () => { 
//           if (deleteTargetId !== null) {
//             try {
//               await dispatch(deleteHerd(deleteTargetId)).unwrap();
//             } catch (error) {
//               console.error("Delete failed:", error);
//             } finally {
//               setDeleteTargetId(null);
//             }
//           }
//         };
//     const columns = useMemo(() => 
//         getHealthColumns(userRole,{
//         onView: (id) => history.push(`/health/view/${id}`),
//         onEdit: (id) => history.push(`/health/edit/${id}`),
//         onDelete: (id) => setDeleteTargetId(Number(id))

//         }), 
//         [history,userRole]
//     );

//     const filteredRecords = useMemo(() => {
//         const baseData = healthRecords || [];
//         if (!searchQuery.trim()) return baseData;
        
//         const lowerQuery = searchQuery.toLowerCase();
//         return baseData.results.filter((r) => 
//         r.condition.toLowerCase().includes(lowerQuery) ||
//         r.treatment.toLowerCase().includes(lowerQuery)
//         );
//     }, [healthRecords, searchQuery]);
//     return{
//         history,healthRecords,dispatch,loading,totalSpend,
//         setSearchQuery,handleDeleteConfirm,columns,filteredRecords,
//         setDeleteTargetId,deleteTargetId,searchQuery,paginationModel,
//         setPaginationModel
//     }
// }

import { useState, useEffect, useMemo } from 'react';
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchHealthRecords, deleteHealthRecord } from "../../../redux/store/slices/operationsSlice"; // Ensure delete action import matches your slice
import { getHealthColumns } from "../components/healthColumns";
import { HealthRecord } from "../../../types/types";

export const useHealthyRecordsList = (
  initialRecords: HealthRecord[] = [], 
  filterIds?: number[], 
  paginationMode: 'client' | 'server' = 'client'
) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  
  // Extract state from the operations slice
  const { healthRecords: storedRecords, loading } = useAppSelector((state) => state.operations);
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user?.profile?.role;

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // SERVER-SIDE LIFECYCLE
  useEffect(() => {
    if (paginationMode === 'server') {
      dispatch(fetchHealthRecords({ page: paginationModel.page + 1 }));
    }
  }, [dispatch, paginationModel.page, paginationMode]);

  // SOURCE SELECTION
  const activeHealthRecordsSource = useMemo((): HealthRecord[] => {
    if (paginationMode === 'server') {
      return storedRecords?.results || [];
    }
    return initialRecords || [];
  }, [paginationMode, storedRecords, initialRecords]);

  // TOTAL SPEND EXTRACTION (Server aggregate metric fallback)
  const totalSpend = useMemo(() => {
    if (paginationMode === 'server') {
      return storedRecords?.total_spend || 0; // Fallback to a custom property returned from Django if available
    }
    return activeHealthRecordsSource.reduce((sum, r) => sum + (+r.cost || 0), 0);
  }, [paginationMode, storedRecords, activeHealthRecordsSource]);

  // MEMOIZED SEARCH & FILTER LOGIC
  const filteredRecords = useMemo(() => {
    const baseData = activeHealthRecordsSource || [];
    
    return baseData.filter((record) => {
      const passFilter = filterIds ? filterIds.includes(record.id) : true;
      if (!passFilter) return false;
      if (!searchQuery.trim()) return true;

      const lowerQuery = searchQuery.toLowerCase();
      return (
        (record.condition || '').toLowerCase().includes(lowerQuery) ||
        (record.treatment || '').toLowerCase().includes(lowerQuery)
      );
    });
  }, [activeHealthRecordsSource, searchQuery, filterIds]);

  // CORRECTION: Cleaned up target deletion action to hit medical/operations slices instead of livestock
  const handleDeleteConfirm = async () => { 
    if (deleteTargetId !== null) {
      try {
        await dispatch(deleteHealthRecord(deleteTargetId)).unwrap();
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setDeleteTargetId(null);
      }
    }
  };

  const columns = useMemo(() => 
    getHealthColumns(userRole, {
      onView: (id) => history.push(`/health/view/${id}`),
      onEdit: (id) => history.push(`/health/edit/${id}`),
      onDelete: (id) => setDeleteTargetId(Number(id))
    }), 
    [history, userRole]
  );

  return {
    loading,
    totalSpend,
    searchQuery,
    setSearchQuery,
    deleteTargetId,
    setDeleteTargetId,
    handleDeleteConfirm,
    columns,
    history,
    filteredRecords,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    rowCount: paginationMode === 'server' ? (storedRecords?.count || 0) : filteredRecords.length
  };
};