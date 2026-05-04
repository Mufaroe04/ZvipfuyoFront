import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useHistory } from "react-router-dom";
import { 
  Button, Box, Typography, Stack, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions 
} from '@mui/material';
import { fetchAllHerds, deleteHerd } from '../../redux/store/slices/livestockSlice';
import { IonIcon } from '@ionic/react';
import { addOutline, searchOutline } from 'ionicons/icons';
import { LoadingSpinner } from '../feedback/LoadingSpinner';

import { CustomDataGrid } from '../datagrid/CustomDataGrid';
import { getHerdColumns } from './herdColumns';

const HerdList: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  
  const { herds, loading } = useAppSelector((state) => state.livestock);
  
  // DIRECT REDUX FIX: Read the user role directly from auth state
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user?.profile?.role;

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // Derive if the current user has privileged access
  const isPrivileged = userRole === 'owner' || userRole === 'manager';

  useEffect(() => {
    dispatch(fetchAllHerds());
  }, [dispatch]);

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

  // Memoize column definitions to prevent unnecessary table re-renders
  const columns = useMemo(() => 
    getHerdColumns(userRole, {
      onView: (id) => history.push(`/herds/${id}`),
      onEdit: (id) => history.push(`/herds/edit/${id}`),
      onDelete: (id) => setDeleteTargetId(Number(id))
    }), 
    [history, userRole]
  );

  // Memoize data filtering logic
  const filteredHerds = useMemo(() => {
    const data = herds || [];
    if (!searchQuery.trim()) return data;

    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((herd) =>
      herd.name.toLowerCase().includes(lowerQuery) ||
      herd.location.toLowerCase().includes(lowerQuery)
    );
  }, [herds, searchQuery]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Top Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Select a herd to manage its digital kraal
          </Typography>
        </Box>
        {isPrivileged && (
          <Button 
            variant="contained" 
            startIcon={<IonIcon icon={addOutline} />}
            onClick={() => history.push("/herdsadd")}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none', 
              fontWeight: 'bold', 
              px: 3, 
              backgroundColor: "#18774c",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              '&:hover': { backgroundColor: "#145c3b" }
            }}
          >
            New Herd
          </Button>
        )}
      </Stack>

      {/* Global Search */}
      <TextField
        fullWidth
        placeholder="Search herds by name or location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, bgcolor: 'white' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IonIcon icon={searchOutline} style={{ color: '#666' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Custom Data Grid Component */}
      <CustomDataGrid
        rows={filteredHerds}
        columns={columns}
        getRowId={(row) => row.id}
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
            Are you sure you want to delete this herd? This action cannot be undone and will permanently erase all associated livestock data.
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

export default HerdList;