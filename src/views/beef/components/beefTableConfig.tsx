import { GridColDef } from '@mui/x-data-grid';
import { getBreedLabel } from '../../../constants/livestock';

export const getBeefTableColumns = (onView: (id: number) => void): GridColDef[] => [
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'animal_tag', headerName: 'Tag #', flex: 1, minWidth: 100 },
  { 
    field: 'breed', 
    headerName: 'Breed', 
    width: 150, 
    renderCell: (p) => getBreedLabel(p.value) 
  },
  
   { field: 'date', headerName: 'Date', width: 110, },
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
    headerName: 'Options',
    width: 110,
    renderCell: (params) => (
      <Button 
        variant="outlined" size="small" 
        onClick={() => onView(params.row.animal_id || params.row.id)}
        sx={{ borderRadius: '4px', textTransform: 'none' }}
      >
        View
      </Button>
    )
  }
];