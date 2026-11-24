import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Typography, Stack, IconButton, Chip, Button } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { logoWhatsapp, printOutline, checkmarkCircleOutline, timeOutline } from 'ionicons/icons';
import { sendOrderToWhatsApp } from '../../../utils/whatsappUtils';
import { generatePurchasePDF } from '../../../utils/printUtils';

export const getProcurementColumns = (
  onConfirm: (id: number) => void,
  onReceive: (id: number) => void
): GridColDef[] => [
  { field: 'item_name', headerName: 'Item', flex: 1.2 },
  { field: 'unit', headerName: 'Unit', flex: 1.2 },
  { field: 'order_quantity', headerName: 'Qty', width: 80 },
  { field: 'estimated_cost', headerName: 'Est. Cost', width: 100 },
  {
    field: 'status',  
    headerName: 'Status',  
    width: 130,
    renderCell: (params) => {
      const isDraft = params.value === 'draft';
      return (
        <Chip  
          label={params.value}  
          size="small"  
          variant="outlined"
          icon={<IonIcon icon={isDraft ? timeOutline : checkmarkCircleOutline} />}
        />
      );
    }
  },
  { field: 'supplier_name', headerName: 'Supplier Name', flex: 1.2 },
  { field: 'supplier_phone', headerName: 'Supplier Phone', flex: 1.2 },
  { 
    field: 'created_at', 
    headerName: 'Date', 
    flex: 1.2,  
    renderCell: (params) => (
      <Typography variant="body2" sx={{ pt: 1.5 }}>
        {new Date(params.value).toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })}
      </Typography>
    )
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1.5,
    sortable: false,
    renderCell: (params) => {
      const po = params.row;
      return (
        <Stack direction="row" spacing={1} sx={{ pt: 0.5 }}>
          <IconButton size="small" onClick={() => sendOrderToWhatsApp(po)} sx={{ color: '#25D366' }}>
            <IonIcon icon={logoWhatsapp} />
          </IconButton>
          <IconButton size="small" onClick={() => generatePurchasePDF(po)}>
            <IonIcon icon={printOutline} />
          </IconButton>
          
          {po.status === 'draft' && (
            <Button  
              size="small"  
              variant="contained"  
              onClick={() => onConfirm(po.id)}
              sx={{ bgcolor: '#18774c', fontSize: '0.7rem', textTransform: 'none' }}
            >
              Confirm
            </Button>
          )}
          {po.status === 'sent' && (
            <Button  
              size="small"  
              variant="contained"  
              color="success"
              onClick={() => onReceive(po.id)}
              sx={{ fontSize: '0.7rem', textTransform: 'none' }}
            >
              Receive
            </Button>
          )}
        </Stack>
      );
    }
  }
];