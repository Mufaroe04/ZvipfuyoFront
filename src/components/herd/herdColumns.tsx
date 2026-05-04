import { GridColDef } from '@mui/x-data-grid';
import { Button, Stack, IconButton, Tooltip } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { UserRole } from '../../types/types';

interface ActionHandlers {
  onView: (id: string | number) => void;
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}

export const getHerdColumns = (
  role: UserRole | null | undefined,
  handlers: ActionHandlers
): GridColDef[] => {
  const isPrivileged = role === 'owner' || role === 'manager';

  return [
    { field: 'id', headerName: 'ID', width: 60 },
    { 
      field: 'name', 
      headerName: 'Herd Name', 
      flex: 1, 
      minWidth: 150,
      renderCell: (params) => <span style={{ fontWeight: 500 }}>{params.value}</span> 
    },
    { field: 'location', headerName: 'Location', width: 130 },
    { field: 'total_cattle', headerName: 'Total', type: 'number', width: 80, align: 'center' },
    { field: 'cows_count', headerName: 'Cows', type: 'number', width: 70, align: 'center' },
    { field: 'bulls_count', headerName: 'Bulls', type: 'number', width: 70, align: 'center' },
    { field: 'calves_count', headerName: 'Calves', type: 'number', width: 70, align: 'center' },
    { field: 'pregnant_count', headerName: 'Preg', type: 'number', width: 70, align: 'center' },
    { field: 'sick_count', headerName: 'Sick', type: 'number', width: 80, align: 'center' },
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