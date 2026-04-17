import React from 'react';
import { Box, Paper, Typography, Chip, TextField, InputAdornment } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';

interface HealthRecordsTableProps {
  records: any[];
  loading: boolean;
  searchText: string;
  onSearchChange: (value: string) => void;
}

const HealthRecordsTable: React.FC<HealthRecordsTableProps> = ({ 
  records, 
  loading, 
  searchText, 
  onSearchChange 
}) => {
  
  const columns: GridColDef[] = [
    { 
      field: 'treatment_date', 
      headerName: 'Date', 
      width: 120,
    //   renderCell: (p) => <Typography variant="body2" fontWeight="bold">{p.value}</Typography>
    },
    { 
      field: 'condition', 
      headerName: 'Condition', 
      flex: 1,
    //   renderCell: (p) => (
    //     <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
    //       {p.value}
    //     </Typography>
    //   )
    },
    { field: 'treatment', headerName: 'Treatment Administered', flex: 1.5 },
    { 
      field: 'cost', 
      headerName: 'Cost', 
      width: 110,
    //   renderCell: (p) => <Typography variant="body2" fontWeight="bold">${p.value}</Typography>
    },
    { 
      field: 'follow_up_date', 
      headerName: 'Follow-up', 
      width: 130,
    //   renderCell: (p) => p.value ? (
    //     <Chip label={p.value} size="small" color="warning" variant="outlined" />
    //   ) : '-'
    },
  ];

  return (
    <Box>
      {/* MUI Custom Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search conditions or medications..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ 
          mb: 3, 
          bgcolor: 'white',
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IonIcon icon={searchOutline} style={{ color: '#18774c' }} />
            </InputAdornment>
          ),
        }}
      />

      <Paper elevation={0} sx={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={records}
            columns={columns}
            loading={loading}
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            disableRowSelectionOnClick
            sx={{
              border: 0,
            //   fontFamily: '"Plus Jakarta Sans", sans-serif',
              '& .MuiDataGrid-columnHeaders': { bgcolor: '#fbfbfb', borderBottom: '1px solid #f0f0f0' },
              '& .MuiDataGrid-cell:focus': { outline: 'none' },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default HealthRecordsTable;