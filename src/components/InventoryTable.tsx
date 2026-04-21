import React from 'react';
import { Typography, Paper, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IonIcon } from '@ionic/react';
import { removeCircleOutline, archiveOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { InventoryItem } from '../types/types';

interface InventoryTableProps {
  items: InventoryItem[];
  loading: boolean;
  onAdjust: (item: InventoryItem) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items, loading, onAdjust }) => {
  const history = useHistory();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Item Name', flex: 1.5 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { 
      field: 'quantity_on_hand', 
      headerName: 'Stock', 
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" sx={{  color: params.value < 10 ? 'error.main' : 'text.primary' }}>
          {params.value} {params.row.unit}
        </Typography>
      )
    },
        { 
      field: 'reorder_level', 
      headerName: 'Reorder Level ', 
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" sx={{  color: params.value < 10 ? 'error.main' : 'text.primary' }}>
          {params.value} {params.row.unit}
        </Typography>
      )
    },
        { 
      field: 'last_updated', 
      headerName: 'Last Updated', 
      flex: 1,
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
      field: 'cost_per_unit', 
      headerName: 'Cost Per Unit ', 
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" >
          {params.value} {params.row.unit}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Adjust',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => onAdjust(params.row)}>
          <IonIcon icon={removeCircleOutline} style={{ color: '#18774c' }} />
        </IconButton>
      )
    },
    {
      field: 'history',
      headerName: 'Log',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => history.push(`/inventory/history?item=${params.row.id}`)}>
          <IonIcon icon={archiveOutline} />
        </IconButton>
      )
    }
  ];

  return (
    <Paper sx={{ height: '65vh', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid #ececec' }} elevation={0}>
      <DataGrid 
        rows={items} 
        columns={columns} 
        loading={loading} 
        getRowId={(row) => row.id}
        sx={{ 
          border: 'none',
          '& .MuiDataGrid-columnHeaders': { bgcolor: '#fbfbfb' },
          '& .MuiDataGrid-cell:focus': { outline: 'none' }
        }} 
      />
    </Paper>
  );
};

export default InventoryTable;