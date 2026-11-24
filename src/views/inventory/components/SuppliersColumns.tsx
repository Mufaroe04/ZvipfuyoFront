import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Stack, Typography, Button } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { businessOutline } from 'ionicons/icons';

export const getSupplierColumns = (): GridColDef[] => [
  {  
    field: 'name',  
    headerName: 'Supplier Name',  
    flex: 1.5,
    renderCell: (params) => (
      <Stack direction="row" spacing={1} alignItems="center" sx={{ pt: 1.5 }}>
        <IonIcon icon={businessOutline} style={{ color: '#18774c' }} />
        <Typography variant="body2" fontWeight="bold">{params.value}</Typography>
      </Stack>
    )
  },
  { field: 'location', headerName: 'Location', flex: 1 },
  { field: 'phone', headerName: 'Contact Number', flex: 1 },
  {
    field: 'actions',
    headerName: 'View',
    width: 120,
    renderCell: () => (
      <Button size="small" variant="text" sx={{ textTransform: 'none', fontWeight: 'bold', color: '#18774c' }}>
        History
      </Button>
    )
  }
];