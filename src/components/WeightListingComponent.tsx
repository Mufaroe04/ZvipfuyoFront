import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography, Box, Chip, Paper } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { trendingUp, trendingDown } from 'ionicons/icons';

interface WeightListingComponentProps {
  weights: any[];
  loading: boolean;
}

const WeightListingComponent: React.FC<WeightListingComponentProps> = ({ weights, loading }) => {
  const columns: GridColDef[] = [
    { 
      field: 'animal_tag', 
      headerName: 'Animal Tag', 
      flex: 1,
    //   renderCell: (params) => (
    //     <Typography variant="body2" fontWeight="bold" sx={{ color: '#18774c' }}>
    //       {params.value || 'N/A'}
    //     </Typography>
    //   )
    },
    { field: 'date', headerName: 'Date', flex: 1 },
    { 
      field: 'weight_kg', 
      headerName: 'Weight (kg)', 
      width: 130,
      renderCell: (params) => <Typography variant="body2">{params.value} kg</Typography>
    },
    { 
      field: 'change_kg', 
      headerName: 'Change', 
      width: 120,
      renderCell: (params) => {
        const val = Number(params.value);
        return (
          <Chip 
            size="small"
            icon={<IonIcon icon={val >= 0 ? trendingUp : trendingDown} style={{ fontSize: '14px' }} />}
            label={`${val > 0 ? '+' : ''}${val} kg`}
            color={val >= 0 ? "success" : "error"}
            variant="outlined"
            sx={{ fontWeight: 'bold' }}
          />
        );
      }
    },
  ];

  return (
    <Paper sx={{ height: '70vh', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid #ececec' }} elevation={0}>
      <DataGrid
        rows={weights}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        pageSizeOptions={[10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        sx={{ 
          border: 'none',
          '& .MuiDataGrid-columnHeaders': { bgcolor: '#fbfbfb' },
          '& .MuiDataGrid-cell:focus': { outline: 'none' }
        }}
      />
    </Paper>
  );
};

export default WeightListingComponent;