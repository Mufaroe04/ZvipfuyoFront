// src/views/livestock/components/AnimalListGrid.tsx
import React from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  InputAdornment, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions 
} from '@mui/material';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';

// Domain-Specific imports
import { useAnimalList } from '../hooks/useAnimalList';
import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';
import { Animal } from '../../../types/types';

interface AnimalListGridProps {
  animals: Animal[];
  filterIds?: number[];
}

/**
 * AnimalListGrid
 * A feature-specific component that handles the search, display, and deletion
 * of livestock records using a refactored hook-based architecture.
 */
export const AnimalListGrid: React.FC<AnimalListGridProps> = ({ animals, filterIds }) => {
  
  // Logic is abstracted into the custom hook to keep this component "Thin"
  const { 
    filteredAnimals, 
    searchQuery, 
    setSearchQuery, 
    deleteTargetId, 
    setDeleteTargetId, 
    handleDelete ,
    columns
  } = useAnimalList(animals, filterIds);

  /**
   * Memoized Column Definitions
   * We inject the handlers directly from the history and hook state.
   */


  return (
    <Box>
      {/* Search Bar - Stylized for 1440px desktop / responsive view */}
      <TextField
        fullWidth
        placeholder="Search animals by tag or breed..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 1, bgcolor: 'white', borderRadius: '4px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IonIcon icon={searchOutline} style={{ color: '#666' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Main Data Table */}
      <CustomDataGrid
        rows={filteredAnimals}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
      />

      {/* Deletion Confirmation Dialog */}
      <Dialog 
        open={deleteTargetId !== null} 
        onClose={() => setDeleteTargetId(null)}
        PaperProps={{ sx: { borderRadius: '12px' } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Delete Animal Record
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this animal? This action cannot be undone 
            and will permanently erase all associated health and biometric data.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={() => setDeleteTargetId(null)} 
            color="inherit"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            variant="contained" 
            sx={{ 
              textTransform: 'none', 
              borderRadius: '6px', 
              fontWeight: 600,
              boxShadow: 'none'
            }}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};