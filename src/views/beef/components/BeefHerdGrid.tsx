import React from 'react';
import { Box, Stack, Typography, TextField, InputAdornment, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { getBeefTableColumns } from './beefTableConfig';
import { useHistory } from 'react-router-dom';
import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';

interface Props {
  rows: any[];
  search: string;
  onSearch: (val: string) => void;
}

const BeefHerdGrid: React.FC<Props> = ({ rows, search, onSearch }) => {
  const history = useHistory();
  const columns = getBeefTableColumns((id) => history.push(`/animal/${id}`));

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">Herd Logs</Typography>
        <TextField 
          size="small"
          placeholder="Search tag or breed..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          sx={{ width: { xs: '100%', md: '300px' }, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><IonIcon icon={searchOutline} /></InputAdornment>,
          }}
        />
      </Stack>

      <Paper sx={{ height: 500, borderRadius: '4px', border: '1px solid #f0f0f0' }}>
    
             <CustomDataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                autoHeight
              />
      </Paper>
    </Box>
  );
};

export default BeefHerdGrid;