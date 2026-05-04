import React, { useState, useMemo } from 'react';
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { 
  Box, Button, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions 
} from '@mui/material';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { CustomDataGrid } from '../datagrid/CustomDataGrid';
import { getAnimalColumns } from './animalColumns';
import { deleteAnimal } from '../../redux/store/slices/livestockSlice';
import { Animal } from '../../types/types';

interface AnimalListGridProps {
  animals: Animal[];
  filterIds?: number[];
}

export const AnimalListGrid: React.FC<AnimalListGridProps> = ({ animals, filterIds }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // Directly extract auth state to prevent prop-drilling
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user?.profile?.role;

  const handleDeleteConfirm = async () => {
    if (deleteTargetId !== null) {
      try {
        await dispatch(deleteAnimal(deleteTargetId)).unwrap();
      } catch (error) {
        console.error("Animal deletion failed:", error);
      } finally {
        setDeleteTargetId(null);
      }
    }
  };

  // 1. Column memoization
  const columns = useMemo(() => 
    getAnimalColumns(userRole, {
      onView: (id) => history.push(`/animal/${id}`),
      onEdit: (id) => history.push(`/animal/edit/${id}`),
      onDelete: (id) => setDeleteTargetId(Number(id))
    }), 
    [history, userRole]
  );

  // 2. Data filtering logic combining search strings & parent filters
  const filteredAnimals = useMemo(() => {
    const baseData = animals || [];

    return baseData.filter((animal) => {
      // Apply Insight filtering
      const passFilter = filterIds ? filterIds.includes(animal.id) : true;
      if (!passFilter) return false;

      // Apply search query filtering
      if (!searchQuery.trim()) return true;
      const lowerQuery = searchQuery.toLowerCase();
      return (
        animal.tag_number.toLowerCase().includes(lowerQuery) ||
        (animal.breed || '').toLowerCase().includes(lowerQuery)
      );
    });
  }, [animals, searchQuery, filterIds]);

  return (
    <Box>
      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search animals by tag or breed..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IonIcon icon={searchOutline} style={{ color: '#666' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Shared Data Grid */}
      <CustomDataGrid
        rows={filteredAnimals}
        columns={columns}
        getRowId={(row) => row.id}
      />

      {/* Shared Deletion Confirmation Modal */}
      <Dialog open={deleteTargetId !== null} onClose={() => setDeleteTargetId(null)}>
        <DialogTitle sx={{ fontWeight: 'bold', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          Delete Animal
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            Are you sure you want to delete this animal? This action cannot be undone and will permanently erase all associated data.
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