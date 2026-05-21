import React from 'react';
import { Box, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';
import { GridColDef } from '@mui/x-data-grid';

interface TransferListGridProps {
  filteredTransfers: any[];
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
}

export const TransferListGrid: React.FC<TransferListGridProps> = ({
  filteredTransfers,
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
}) => {
  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Search transfers by type, status, destination..."
        value={searchQuery || ''}
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
      <CustomDataGrid
        rows={filteredTransfers}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        getRowId={(row) => row.id}
        height={540}
      />

      <Dialog open={deleteTargetId !== null} onClose={() => setDeleteTargetId(null)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Delete Transfer Manifest</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this transfer manifest? This action cancels the transit loop and releases the locked animal tags.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDeleteTargetId(null)} color="inherit" sx={{ textTransform: 'none', fontWeight: 600 }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" sx={{ textTransform: 'none', borderRadius: '6px', fontWeight: 600 }}>
            Confirm Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};