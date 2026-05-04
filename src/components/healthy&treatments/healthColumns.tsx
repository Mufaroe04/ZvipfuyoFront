import { GridColDef } from '@mui/x-data-grid';
import {  Stack, Button, Tooltip, IconButton } from '@mui/material';
import { ActionHandlers, UserRole } from '../../types/types';
import { IonIcon } from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';

export const getHealthColumns = ( role: UserRole | null | undefined,
  handlers: ActionHandlers): GridColDef[] => {

  const isPrivileged = role === 'owner' || role === 'manager';

   return [
  { 
    field: 'treatment_date', 
    headerName: 'Date', 
    width: 120 
  },
  { 
    field: 'condition', 
    headerName: 'Condition', 
    flex: 1 
  },
  { 
    field: 'treatment', 
    headerName: 'Treatment Administered', 
    flex: 1.5 
  },
  { 
    field: 'cost', 
    headerName: 'Cost ($)', 
    width: 110,
    renderCell: (params) => `$${Number(params.value).toLocaleString()}`
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
]
  };
