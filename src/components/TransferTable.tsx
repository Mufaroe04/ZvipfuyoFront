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
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: '#18774c', fontWeight: 'bold' }}>
          {params.value?.join(', ') || 'N/A'}
        </Typography>
      )
    },
    { field: 'external_destination', headerName: 'Destination', flex: 1.2 },
    { 
      field: 'created_at', 
      headerName: 'Date', 
      width: 120,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const statusColors: any = {
          completed: 'success',
          pending: 'warning',
          intransit: 'secondary',
          approved: 'info'
        };
        return (
          <Chip 
            label={params.value.toUpperCase()} 
            size="small"
            color={statusColors[params.value] || 'default'}
            variant="outlined"
            sx={{ fontWeight: '700', fontSize: '0.65rem' }}
          />
        );
      }
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
              variant="contained"
              startIcon={<IonIcon icon={busOutline} />}
              onClick={() => onDispatch(params.row.id)}
              sx={{ 
                textTransform: 'none', 
                borderRadius: '6px', 
                bgcolor: '#18774c',
                fontSize: '0.75rem',
                '&:hover': { bgcolor: '#14633f' }
              }}
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