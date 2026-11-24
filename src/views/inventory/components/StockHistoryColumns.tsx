import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { arrowUpOutline, arrowDownOutline, settingsOutline } from 'ionicons/icons';

export const getStockHistoryColumns = (): GridColDef[] => [
  {  
    field: 'log_type',  
    headerName: 'Type',  
    width: 130,
    renderCell: (params) => {
      const isAddition = params.value === 'addition';
      const isUsage = params.value === 'usage';
      return (
        <Chip  
          size="small"
          icon={<IonIcon icon={isAddition ? arrowUpOutline : (isUsage ? arrowDownOutline : settingsOutline)} />}
          label={params.value}
          color={isAddition ? "success" : (isUsage ? "warning" : "default")}
          variant="outlined"
        />
      );
    }
  },
  { field: 'item_name', headerName: 'Item', flex: 1 },
  { field: 'quantity', headerName: 'Qty', width: 100 },
  { field: 'notes', headerName: 'Activity Note', flex: 1.5 },
  { field: 'date_display', headerName: 'Timestamp', width: 180 },
];