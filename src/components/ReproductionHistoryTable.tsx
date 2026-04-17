import React from 'react';
import { Box, Paper, } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface ReproductionHistoryTableProps {
  events: any[];
  loading: boolean;
}

const ReproductionHistoryTable: React.FC<ReproductionHistoryTableProps> = ({ events, loading }) => {
  
  const columns: GridColDef[] = [
    { 
      field: 'breeding_date', 
      headerName: 'Date', 
      width: 130,
    //   renderCell: (p) => <Typography variant="body2" fontWeight="bold">{p.value}</Typography>
    },
    { 
      field: 'dam_tag', 
      headerName: 'Dam (Cow)', 
      width: 150 
    },
    { 
      field: 'sire_tag', 
      headerName: 'Sire (Bull)', 
      width: 150 
    },
    { 
      field: 'method', 
      headerName: 'Method', 
      width: 130,
    //   renderCell: (p) => (
    //     <Chip 
    //       label={p.value === 'AI' ? 'Artificial' : 'Natural'} 
    //       size="small" 
    //       variant="outlined" 
    //       sx={{ fontWeight: 'medium' }}
    //     />
    //   )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
    //   renderCell: (p) => {
    //     const colors: Record<string, "success" | "warning" | "error" | "default"> = {
    //       'confirmed': 'success',
    //       'pending': 'warning',
    //       'failed': 'error'
    //     };
    //     return <Chip label={p.value?.toUpperCase()} size="small" color={colors[p.value] || 'default'} />;
    //   }
    },
    { 
      field: 'expected_calving_date', 
      headerName: 'Exp. Calving', 
      width: 130,
    //   renderCell: (p) => p.value ? (
    //     <Typography variant="body2" sx={{ color: '#18774c', fontWeight: 'bold' }}>
    //       {p.value}
    //     </Typography>
    //   ) : '-'
    },
        { 
      field: 'breeding_date', 
      headerName: 'Breeding Date', 
      width: 130,

    },
        { 
      field: 'days_to_calving', 
      headerName: 'Days to calving', 
      width: 130,
    //   renderCell: (p) => <Typography variant="body2" fontWeight="bold">{p.value}</Typography>
    },
  ];

  return (
    <Paper elevation={0} sx={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={events}
          columns={columns}
          loading={loading}
          pageSizeOptions={[10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
          sx={{ 
            border: 0,
            '& .MuiDataGrid-columnHeaders': { bgcolor: '#fbfbfb' },
            '& .MuiDataGrid-cell:focus': { outline: 'none' }
          }}
        />
      </Box>
    </Paper>
  );
};

export default ReproductionHistoryTable;