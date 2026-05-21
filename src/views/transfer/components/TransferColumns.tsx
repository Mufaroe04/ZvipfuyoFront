import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Stack, Button, IconButton, Tooltip, Typography, Chip, Box } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { busOutline, documentTextOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import { generateMovementPermit } from '../../../utils/printUtils';
import { UserRole } from '../../../types/types';

interface HandlerProps {
  onDispatch: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const getTransferColumns = (
  role: UserRole | null | undefined,
  handlers: HandlerProps
): GridColDef[] => {
  const isPrivileged = role === 'owner' || role === 'manager';

  return [
    { 
      field: 'animal_tags', 
      headerName: 'Animals', 
    //   width: 150,
       flex:1,
      renderCell: (params) => (
        <Typography variant="body2" noWrap sx={{ pt: 1.5 }}>
          {Array.isArray(params.value) ? params.value.join(', ') : params.row.animals?.map((a: any) => a.tag_number).join(', ') || 'N/A'}
        </Typography>
      )
    },
    { field: 'external_destination', headerName: 'Destination', width: 160 },
    { field: 'transfer_type', headerName: 'Transfer Type', width: 130 },
    {
      field: 'created_at',
      headerName: 'Date & Time',
      width: 180,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ pt: 1.5 }}>
          {params.value ? new Date(params.value).toLocaleString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
          }) : 'N/A'}
        </Typography>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      // renderCell: (params) => {
      //   const statusColors: Record<string, 'success' | 'warning' | 'secondary' | 'info' | 'default'> = {
      //     completed: 'success',
      //     pending: 'warning',
      //     intransit: 'secondary',
      //     approved: 'info'
      //   };
      //   return (
      //     <Box sx={{ pt: 1 }}>
      //       <Chip 
      //         label={(params.value || 'pending').toUpperCase()} 
      //         size="small"
      //         color={statusColors[params.value] || 'default'}
      //         variant="outlined"
      //         sx={{ fontWeight: '700', fontSize: '0.65rem' }}
      //       />
      //     </Box>
      //   );
      // }
    },
    {
      field: 'actions',
      headerName: 'Logistics / Actions',
      width: isPrivileged ? 240 : 180,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
          {['approved', 'pending'].includes(params.row.status) && (
            <Button
              size="small"
              variant="outlined"
              startIcon={<IonIcon icon={busOutline} />}
              onClick={() => handlers.onDispatch(params.row.id)}
              sx={{
                textTransform: 'none', borderRadius: '6px', fontSize: '0.75rem',
                color: '#18774c', borderColor: '#18774c',
                '&:hover': { bgcolor: 'rgba(24, 119, 76, 0.04)', borderColor: '#18774c' }
              }}
            >
              Dispatch
            </Button>
          )}

          <Tooltip title="Print Permit">
            <IconButton onClick={() => generateMovementPermit(params.row)} size="small" sx={{ color: '#18774c' }}>
              <IonIcon icon={documentTextOutline} style={{ fontSize: '18px' }} />
            </IconButton>
          </Tooltip>

          {isPrivileged && (
            <>
              <Tooltip title="Edit Manifest">
                <IconButton onClick={() => handlers.onEdit(params.row.id)} size="small" sx={{ color: '#18774c' }}>
                  <IonIcon icon={pencilOutline} style={{ fontSize: '18px' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Manifest">
                <IconButton onClick={() => handlers.onDelete(params.row.id)} size="small" sx={{ color: '#d32f2f' }}>
                  <IonIcon icon={trashOutline} style={{ fontSize: '18px' }} />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      )
    }
  ];
};