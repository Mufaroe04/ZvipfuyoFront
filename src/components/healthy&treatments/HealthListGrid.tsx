import React, { useState, useMemo } from 'react';
import { useHistory } from "react-router-dom";
import { Box, TextField, InputAdornment, DialogActions, Button, DialogContentText, DialogContent, DialogTitle, Dialog } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { CustomDataGrid } from '../datagrid/CustomDataGrid';
import { getHealthColumns } from './healthColumns';
import { useAppSelector } from '../../redux/hooks';

interface HealthListGridProps {
  records: any[];
  loading: boolean;
}

export const HealthListGrid: React.FC<HealthListGridProps> = ({ records, loading }) => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user?.profile?.role;
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  

   const handleDeleteConfirm = async () => {
    //   if (deleteTargetId !== null) {
    //     try {
    //       await dispatch(deleteHerd(deleteTargetId)).unwrap();
    //     } catch (error) {
    //       console.error("Delete failed:", error);
    //     } finally {
    //       setDeleteTargetId(null);
    //     }
    //   }
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
    const baseData = records || [];
    if (!searchQuery.trim()) return baseData;
    
    const lowerQuery = searchQuery.toLowerCase();
    return baseData.filter((r) => 
      r.condition.toLowerCase().includes(lowerQuery) ||
      r.treatment.toLowerCase().includes(lowerQuery)
    );
  }, [records, searchQuery]);

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Search conditions or treatments..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3, bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IonIcon icon={searchOutline} style={{ color: '#18774c' }} />
            </InputAdornment>
          ),
        }}
      />

      <CustomDataGrid
        rows={filteredRecords}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        height={600}
      />

         {/* Confirmation Modal for Deletion */}
            <Dialog 
              open={deleteTargetId !== null} 
              onClose={() => setDeleteTargetId(null)}
            >
              <DialogTitle sx={{ fontWeight: 'bold', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Delete Healthy record
              </DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Are you sure you want to delete this Healthy record? This action cannot be undone and will permanently erase all associated Healthy record data.
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ p: 2, gap: 1 }}>
                <Button 
                  onClick={() => setDeleteTargetId(null)} 
                  color="inherit" 
                  sx={{ textTransform: 'none', fontWeight: 600, fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleDeleteConfirm} 
                  color="error" 
                  variant="contained" 
                  sx={{ 
                    textTransform: 'none', 
                    borderRadius: '6px', 
                    fontWeight: 600,
                    fontFamily: '"Plus Jakarta Sans", sans-serif' 
                  }}
                >
                  Confirm Delete
                </Button>
              </DialogActions>
            </Dialog>
    </Box>
  );
};