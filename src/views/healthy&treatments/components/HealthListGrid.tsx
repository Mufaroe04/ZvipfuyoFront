import React from 'react';
import { Box, TextField, InputAdornment, DialogActions, Button, DialogContentText, DialogContent, DialogTitle, Dialog } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';
import { GridColDef } from '@mui/x-data-grid';

interface HealthListGridProps {
  filteredRecords: any[];
  rowCount: number;
  columns: GridColDef[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  setDeleteTargetId: (val: any) => void;
  handleDeleteConfirm: () => void;
  deleteTargetId: number | null;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: any) => void;
  paginationMode?: 'client' | 'server';
}

export const HealthListGrid: React.FC<HealthListGridProps> = ({
  filteredRecords,
  rowCount,
  columns,
  loading,
  searchQuery,
  setSearchQuery,
  setDeleteTargetId,
  handleDeleteConfirm,
  deleteTargetId,
  paginationModel,
  onPaginationModelChange,
  paginationMode = 'server'
}) => {
  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Search conditions or treatments..."
        value={searchQuery || ''}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 1, bgcolor: 'white', borderRadius: '4px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IonIcon icon={searchOutline} style={{ color: '#18774c' }} />
            </InputAdornment>
          ),
        }}
      />

      <CustomDataGrid
        rows={filteredRecords || []}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        paginationMode={paginationMode}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        getRowId={(row) => row.id}
        height={500}
      />

      {/* Confirmation Modal for Deletion */}
      <Dialog open={deleteTargetId !== null} onClose={() => setDeleteTargetId(null)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Delete Health Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this health record? This action cannot be undone and will permanently erase all associated data.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDeleteTargetId(null)} color="inherit" sx={{ textTransform: 'none', fontWeight: 600 }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" sx={{ textTransform: 'none', borderRadius: '6px', fontWeight: 600 }}>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};