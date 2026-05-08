import { GridColDef } from '@mui/x-data-grid';
import { getBreedLabel } from '../../../constants/livestock';
import { Button } from '@mui/material';

export const getYieldColumns = (): GridColDef[] => [
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'animal_tag', headerName: 'Animal', width: 150  },
  { field: 'breed', headerName: 'Breed', width: 150, renderCell: (p) => getBreedLabel(p.value) },
  { field: 'session', headerName: 'Session', width: 150  },
  { field: 'session_display', headerName: 'Session Display', width: 150  },
  { field: 'is_colostrum',
    headerName: 'Colostrum',
    width: 130, 
    renderCell: (params) => (
            params.value ? <span style={{ color:'#374151'}}>Yes</span> : <span style={{ color:'#374151'}}>No</span>
        )
     },
  { field: 'amount_liters', headerName: 'Liters (L)', type: 'number', width: 150 },
];

export const getQualityColumns = (): GridColDef[] => [
  { field: 'date', headerName: 'Date', width: 160 },
  { field: 'animal_tag', headerName: 'Animal', width: 160  },
  { field: 'breed', headerName: 'Breed', width: 160, renderCell: (p) => getBreedLabel(p.value) },
  { field: 'somatic_cell_count', headerName: 'Somatic Cell Count',width: 160  },
  { field: 'status', headerName: 'Status', width: 160  },
  { field: 'fat_percentage', headerName: 'Fat %', width: 160 },
  { field: 'protein_percentage', headerName: 'Protein %', width: 160 },
];

export const getLactationColumns = (onDryOff: (id: number) => void): GridColDef[] => [
  { field: 'animal_tag', headerName: 'Animal', flex: 1 },
  { field: 'breed', headerName: 'Breed', width: 160, renderCell: (p) => getBreedLabel(p.value) },
  { field: 'start_date', headerName: 'start_date', width: 150 },
  { field: 'end_date', headerName: 'End Date', width: 150 },
  { field: 'lactation_number', headerName: 'Lactation Number', width: 150 },
  { field: 'total_yield', headerName: 'Total Yield', width: 150 },
  { field: 'is_active', headerName: 'Status', width: 150, renderCell: (params) => params.value ? "Milking" : "Dry" },
  {
    field: 'actions', headerName: 'Actions', width: 150,
    renderCell: (params) => !params.row.end_date && (
      <Button variant="outlined" size="small" onClick={() => onDryOff(params.row.id)}>Mark Dry</Button>
    )
  }
];