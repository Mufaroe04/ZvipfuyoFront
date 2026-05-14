import { GridColDef } from '@mui/x-data-grid';
import { getBreedLabel } from '../../../constants/livestock';
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { ActionHandlers, UserRole } from '../../../types/types';

export const getBeefTableColumns = (
  role: UserRole | null | undefined,
  handlers: ActionHandlers
): GridColDef[] => {
  const isPrivileged = role === 'owner' || role === 'manager';
  
  return[
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'animal_tag', headerName: 'Tag #', flex: 1, minWidth: 100 },
  { 
    field: 'breed', 
    headerName: 'Breed', 
    width: 150, 
    renderCell: (p) => getBreedLabel(p.value) 
  },
  
  { field: 'weight_kg', headerName: 'Weight (kg)', width: 110, type: 'number' },
  { 
    field: 'adg', 
    headerName: 'ADG (kg/d)', 
    width: 100,
    // renderCell: (p) => (
    //   <Typography  color={p.value > 0.8 ? 'success.main' : 'warning.main'}>
    //     {p.value}
    //   </Typography>
    // )
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
]}