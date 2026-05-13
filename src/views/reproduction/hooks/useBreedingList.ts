import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useMemo, useState } from "react";
import { fetchBreedingHistory, fetchUpcomingCalvings } from "../../../redux/store/slices/reproductionSlice";
import { getReproductionColumns } from "../components/reproductionColumns";

export const useBreedingList=()=>{
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { events, upcomingCalvings, loading } = useAppSelector((state) => state.reproduction);
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useAppSelector((state) => state.auth);
    const userRole = user?.profile?.role;
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
    
    const columns = useMemo(() => 
        getReproductionColumns(userRole,{
        onView: (id) => history.push(`/reproduction/view/${id}`),
        onEdit: (id) => history.push(`/reproduction/edit/${id}`),
        onDelete: (id) => setDeleteTargetId(Number(id))
    
    
        }), 
        [history,userRole]
    );
    
        const handleDeleteConfirm = async () => {
        // if (deleteTargetId !== null) {
        //   try {
        //     await dispatch(deleteHerd(deleteTargetId)).unwrap();
        //   } catch (error) {
        //     console.error("Delete failed:", error);
        //   } finally {
        //     setDeleteTargetId(null);
        //   }
        // }
        };
    const filteredEvents = useMemo(() => {
        const data = events || [];
        if (!searchQuery.trim()) return data;
        
        const lowerQuery = searchQuery.toLowerCase();
        return data.filter((e) => 
        e.dam_tag?.toLowerCase().includes(lowerQuery) ||
        e.sire_tag?.toLowerCase().includes(lowerQuery) ||
        e.status?.toLowerCase().includes(lowerQuery)
        );
    }, [events, searchQuery]);
    
      useEffect(() => {
        dispatch(fetchBreedingHistory());
        dispatch(fetchUpcomingCalvings());
      }, [dispatch]);

      return{
        history,events,upcomingCalvings,loading,setSearchQuery,
        deleteTargetId,columns,handleDeleteConfirm,filteredEvents,
        searchQuery,setDeleteTargetId
      }
}