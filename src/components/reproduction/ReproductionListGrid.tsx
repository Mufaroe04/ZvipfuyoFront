import React, { useState, useMemo } from 'react';
import { useHistory } from "react-router-dom";
import { Box, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,  } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { CustomDataGrid } from '../datagrid/CustomDataGrid';
import { getReproductionColumns } from './reproductionColumns';
import { useAppSelector } from '../../redux/hooks';

interface ReproductionListGridProps {
  events: any[];
  loading: boolean;
}

export const ReproductionListGrid: React.FC<ReproductionListGridProps> = ({ events, loading }) => {
  const history = useHistory();
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

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Search by Tag or Status..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        // sx={{ mb: 3, bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
        sx={{ mb: 3, bgcolor: 'white',borderRadius: '4px'}}

        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IonIcon icon={searchOutline} style={{ color: '#18774c' }} />
            </InputAdornment>
          ),
        }}
      />

      <CustomDataGrid
        rows={filteredEvents}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        height={500}
      />

         {/* Confirmation Modal for Deletion */}
            <Dialog 
              open={deleteTargetId !== null} 
              onClose={() => setDeleteTargetId(null)}
            >
              <DialogTitle sx={{ fontWeight: 'bold', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Delete Herd
              </DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Are you sure you want to delete this Breeding Record? This action cannot be undone and will permanently erase all associated livestock data.
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