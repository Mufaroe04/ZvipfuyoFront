import React from 'react';
import { 
  Button, Box, Typography, Stack, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions 
} from '@mui/material';
import { IonIcon } from '@ionic/react';
import { addOutline, searchOutline } from 'ionicons/icons';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';

import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';
import { useHerdList } from '../hooks/useHerdList';

const HerdList: React.FC = () => { 
 const { filteredHerds, loading,
        searchQuery, setSearchQuery, 
        deleteTargetId, setDeleteTargetId,
         handlers, isPrivileged ,columns,history }=useHerdList()

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ p: 1 }}>
      {/* Top Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Box>
          <Typography variant="body2"  >
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
        sx={{ mb: 1, bgcolor: 'white' , borderRadius: '4px' , }}
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
        <DialogTitle sx={{ fontWeight: 'bold', }}>
          Delete Herd
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ }}>
            Are you sure you want to delete this herd? This action cannot be undone and will permanently erase all associated livestock data.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={() => setDeleteTargetId(null)} 
            color="inherit" 
            sx={{ textTransform: 'none', fontWeight: 600,  }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handlers.confirmDelete} 
            color="error" 
            variant="contained" 
            sx={{ 
              textTransform: 'none', 
              borderRadius: '6px', 
              fontWeight: 600,
             
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