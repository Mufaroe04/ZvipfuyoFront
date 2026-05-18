// import React from 'react';
// import { Box, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,  } from '@mui/material';
// import { IonIcon } from '@ionic/react';
// import { searchOutline } from 'ionicons/icons';
// import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';
// import { useBreedingList } from '../hooks/useBreedingList';



// export const ReproductionListGrid: React.FC= () => {
//   const {setDeleteTargetId,searchQuery,setSearchQuery,loading,
//         deleteTargetId,columns,handleDeleteConfirm,filteredEvents}=useBreedingList()

//   return (
//     <Box>
//       <TextField
//         fullWidth
//         placeholder="Search by Tag or Status..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         sx={{ mb: 2, bgcolor: 'white', borderRadius: '4px' }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <IonIcon icon={searchOutline} style={{ color: '#666' }} />
//                     </InputAdornment>
//                   ),
//                 }}
//       />
//       <CustomDataGrid
//         rows={filteredEvents}
//         columns={columns}
//         loading={loading}
//         getRowId={(row) => row.id}
//         height={500}
//       />
//          {/* Confirmation Modal for Deletion */}
//             <Dialog 
//               open={deleteTargetId !== null} 
//               onClose={() => setDeleteTargetId(null)}
//             >
//               <DialogTitle sx={{ fontWeight: 'bold'}}>
//                 Delete Herd
//               </DialogTitle>
//               <DialogContent>
//                 <DialogContentText >
//                   Are you sure you want to delete this Breeding Record? This action cannot be undone and will permanently erase all associated livestock data.
//                 </DialogContentText>
//               </DialogContent>
//               <DialogActions sx={{ p: 2, gap: 1 }}>
//                 <Button 
//                   onClick={() => setDeleteTargetId(null)} 
//                   color="inherit" 
//                   sx={{ textTransform: 'none', fontWeight: 600,  }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button 
//                   onClick={handleDeleteConfirm} 
//                   color="error" 
//                   variant="contained" 
//                   sx={{ 
//                     textTransform: 'none', 
//                     borderRadius: '6px', 
//                     fontWeight: 600,
//                   }}
//                 >
//                   Confirm Delete
//                 </Button>
//               </DialogActions>
//             </Dialog>
//     </Box>
//   );
// };

import React from 'react';
import { Box, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';
import { GridColDef } from '@mui/x-data-grid';

interface ReproductionListGridProps {
  filteredEvents: any[];
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

export const ReproductionListGrid: React.FC<ReproductionListGridProps> = ({
  filteredEvents,
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
        placeholder="Search by Tag or Status..."
        value={searchQuery || ''}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, bgcolor: 'white', borderRadius: '4px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IonIcon icon={searchOutline} style={{ color: '#666' }} />
            </InputAdornment>
          ),
        }}
      />
      <CustomDataGrid
        rows={filteredEvents || []}
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
        <DialogTitle sx={{ fontWeight: 'bold' }}>Delete Breeding Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Breeding Record? This action cannot be undone and will permanently erase all associated livestock data.
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