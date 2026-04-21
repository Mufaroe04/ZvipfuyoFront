import React from 'react';
import { Typography, Paper, Chip, Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IonIcon } from '@ionic/react';
import { busOutline, documentTextOutline } from 'ionicons/icons';
import { generateMovementPermit } from '../utils/printUtils';

interface TransferTableProps {
  transfers: any[];
  loading: boolean;
  onDispatch: (id: number) => void;
}

const TransferTable: React.FC<TransferTableProps> = ({ transfers, loading, onDispatch }) => {
  const columns: GridColDef[] = [
    { 
      field: 'animal_tags', 
      headerName: 'Animals', 
      flex: 1, 
    },
    { field: 'external_destination', headerName: 'Destination', flex: 1.2 },
    { field: 'transfer_type', headerName: 'Transfer Type', flex: 1 },

{ 
  field: 'created_at', 
  headerName: 'Date & Time', 
  width: 180, // Increased width slightly to fit the time
  renderCell: (params) => (
    <Typography variant="body2"  sx={{ pt: 1.5 }}>
      {new Date(params.value).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Set to false if you prefer 24-hour time
      })}
    </Typography>
  )
},
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
    //   renderCell: (params) => {
    //     const statusColors: any = {
    //       completed: 'success',
    //       pending: 'warning',
    //       intransit: 'secondary',
    //       approved: 'info'
    //     };
    //     return (
    //       <Chip 
    //         label={params.value.toUpperCase()} 
    //         size="small"
    //         color={statusColors[params.value] || 'default'}
    //         variant="outlined"
    //         sx={{ fontWeight: '700', fontSize: '0.65rem' }}
    //       />
    //     );
    //   }
    },
    {
      field: 'actions',
      headerName: 'Logistics',
      width: 150,
      sortable: false,
      renderCell: (params) => {
        if (['approved', 'pending'].includes(params.row.status)) {
          return (
            <Button
              size="small"
              variant="outlined"
              startIcon={<IonIcon icon={busOutline} />}
              onClick={() => onDispatch(params.row.id)}
            //   sx={{ 
            //     textTransform: 'none', 
            //     borderRadius: '6px', 
            //     bgcolor: '#18774c',
            //     fontSize: '0.75rem',
            //     '&:hover': { bgcolor: '#14633f' }
            //   }}
            >
              Dispatch
            </Button>
          );
        }
        return null;
      }
    },
    {
      field: 'print',
      headerName: 'Permit',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => generateMovementPermit(params.row)}>
          <IonIcon icon={documentTextOutline} style={{ color: '#18774c' }} />
        </IconButton>
      )
    },
  ];

  return (
    <Paper sx={{ height: '65vh', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid #ececec' }} elevation={0}>
      <DataGrid
        rows={transfers}
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

export default TransferTable;