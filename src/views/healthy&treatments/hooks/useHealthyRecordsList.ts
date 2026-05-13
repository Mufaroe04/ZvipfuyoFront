import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useMemo, useState } from "react";
import { fetchHealthRecords } from "../../../redux/store/slices/operationsSlice";
import { deleteHerd } from "../../../redux/store/slices/livestockSlice";
import { getHealthColumns } from "../components/healthColumns";

export const useHealthyRecordsList=()=>{
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { healthRecords, loading } = useAppSelector((state) => state.operations);

    useEffect(() => {
    dispatch(fetchHealthRecords());
    }, [dispatch]);

    const totalSpend = useMemo(() => 
    healthRecords.reduce((sum, r) => sum + (+r.cost || 0), 0), 
    [healthRecords]
    );
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useAppSelector((state) => state.auth);
    const userRole = user?.profile?.role;
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
    

    const handleDeleteConfirm = async () => {
          if (deleteTargetId !== null) {
            try {
              await dispatch(deleteHerd(deleteTargetId)).unwrap();
            } catch (error) {
              console.error("Delete failed:", error);
            } finally {
              setDeleteTargetId(null);
            }
          }
        };
    const columns = useMemo(() => 
        getHealthColumns(userRole,{
        onView: (id) => history.push(`/health/view/${id}`),
        onEdit: (id) => history.push(`/health/edit/${id}`),
        onDelete: (id) => setDeleteTargetId(Number(id))

        }), 
        [history,userRole]
    );

    const filteredRecords = useMemo(() => {
        const baseData = healthRecords || [];
        if (!searchQuery.trim()) return baseData;
        
        const lowerQuery = searchQuery.toLowerCase();
        return baseData.filter((r) => 
        r.condition.toLowerCase().includes(lowerQuery) ||
        r.treatment.toLowerCase().includes(lowerQuery)
        );
    }, [healthRecords, searchQuery]);
    return{
        history,healthRecords,dispatch,loading,totalSpend,
        setSearchQuery,handleDeleteConfirm,columns,filteredRecords,
        setDeleteTargetId,deleteTargetId,searchQuery
    }
}