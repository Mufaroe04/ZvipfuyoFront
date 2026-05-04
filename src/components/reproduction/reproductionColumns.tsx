import { GridColDef } from '@mui/x-data-grid';
import { Button, Stack, IconButton, Tooltip } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { ActionHandlers, UserRole } from '../../types/types';

export const getReproductionColumns = (
  role: UserRole | null | undefined,
  handlers: ActionHandlers
): GridColDef[] => {
  const isPrivileged = role === 'owner' || role === 'manager';

  return [
   { 
      field: 'breeding_date', 
      headerName: 'Date', 
      width: 120,
    },
    { 
      field: 'dam_tag', 
      headerName: 'Dam (Cow)', 
      width: 120 
    },
    { 
      field: 'sire_tag', 
      headerName: 'Sire (Bull)', 
      width: 120 
    },
    { 
      field: 'method', 
      headerName: 'Method', 
      width: 80,

    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 100,

    },
    { 
      field: 'expected_calving_date', 
      headerName: 'Exp. Calving', 
      width: 120,

    },
        { 
      field: 'breeding_date', 
      headerName: 'Breeding Date', 
      width: 120,

    },
        { 
      field: 'days_to_calving', 
      headerName: 'Days to calving', 
      width: 120,
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: isPrivileged ? 160 : 90,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => handlers.onView(params.id)}
            sx={{ 
              textTransform: 'none', 
              borderRadius: '6px', 
              color: "#18774c", 
              borderColor: "#18774c", 
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 600,
              minWidth: '60px',
              height: '32px',
              '&:hover': {
                borderColor: "#18774c",
                backgroundColor: 'rgba(24, 119, 76, 0.04)', 
              }
            }}
          >
            View
          </Button>

          {isPrivileged && (
            <>
              <Tooltip title="Edit Herd">
                <IconButton 
                  onClick={() => handlers.onEdit(params.id)} 
                  size="small"
                  sx={{ color: "#18774c", p: '6px' }}
                >
                  <IonIcon icon={pencilOutline} style={{ fontSize: '18px' }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Herd">
                <IconButton 
                  onClick={() => handlers.onDelete(params.id)} 
                  size="small"
                  sx={{ color: '#d32f2f', p: '6px' }}
                >
                  <IonIcon icon={trashOutline} style={{ fontSize: '18px' }} />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      ),
    },
  ];
};