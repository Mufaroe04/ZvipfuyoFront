// import React from 'react';
// import { Box, Stack, Typography, TextField, InputAdornment, Paper } from '@mui/material';
// import { IonIcon } from '@ionic/react';
// import { searchOutline } from 'ionicons/icons';
// import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';
// import { useBeefOperations } from '../hooks/useBeefOperations';

// interface Props {
//   rows: any[];
//   search: string;
//   onSearch: (val: string) => void;
// }

// const BeefHerdGrid: React.FC<Props> = ({ rows, search, onSearch }) => {
//   const {columns}=useBeefOperations()

//   return (
//     <Box>
//         <TextField 
//           fullWidth
//           placeholder="Search tag or breed..."
//           value={search}
//           onChange={(e) => onSearch(e.target.value)}
//           sx={{  mb: 1, bgcolor: 'white', borderRadius: '4px' }}
//           InputProps={{
//             startAdornment: <InputAdornment position="start"><IonIcon icon={searchOutline} /></InputAdornment>,
//           }}
//         />
//       <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
//         <Typography variant="body1" fontWeight="bold">Weight Logs</Typography>

//       </Stack>

//       <Paper sx={{ height: 500, borderRadius: '4px', border: '1px solid #f0f0f0' }}>
    
//              <CustomDataGrid
//                 rows={rows}
//                 columns={columns}
//                 getRowId={(row) => row.id}
//                 autoHeight
//               />
//       </Paper>
//     </Box>
//   );
// };

// export default BeefHerdGrid;
import React from 'react';
import { Box, Stack, Typography, TextField, InputAdornment, Paper } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';
import { GridColDef } from '@mui/x-data-grid';

interface Props {
  rows: any[];
  rowCount: number;
  columns: GridColDef[];
  loading: boolean;
  search: string;
  onSearch: (val: string) => void;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: any) => void;
}

const BeefHerdGrid: React.FC<Props> = ({ 
  rows, 
  rowCount, 
  columns, 
  loading, 
  search, 
  onSearch, 
  paginationModel, 
  onPaginationModelChange 
}) => {
  return (
    <Box>
      <TextField 
        fullWidth
        placeholder="Search tag or breed..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        sx={{ mb: 2, bgcolor: 'white', borderRadius: '4px' }}
        InputProps={{
          startAdornment: <InputAdornment position="start"><IonIcon icon={searchOutline} /></InputAdornment>,
        }}
      />
      
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="body1" fontWeight="bold">Weight Logs</Typography>
      </Stack>

      <Paper sx={{ height: 500, borderRadius: '4px', border: '1px solid #f0f0f0' }}>
        <CustomDataGrid
          rows={rows}
          columns={columns}
          rowCount={rowCount}
          loading={loading}
          paginationMode="server" // Explicitly tell DataGrid to wait for manual fetches
          paginationModel={paginationModel}
          onPaginationModelChange={onPaginationModelChange}
          getRowId={(row) => row.id}
        />
      </Paper>
    </Box>
  );
};

export default BeefHerdGrid;