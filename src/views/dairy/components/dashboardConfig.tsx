import { GridColDef } from '@mui/x-data-grid';
import { getBreedLabel } from '../../../constants/livestock';
import { Button } from '@mui/material';

export const getYieldColumns = (): GridColDef[] => [
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'animal_tag', headerName: 'Animal', flex: 1 },
  { field: 'breed', headerName: 'Breed', width: 130, renderCell: (p) => getBreedLabel(p.value) },
  { field: 'amount_liters', headerName: 'Liters (L)', type: 'number', width: 110 },
];

export const getQualityColumns = (): GridColDef[] => [
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'animal_tag', headerName: 'Animal', flex: 1 },
  { field: 'fat_percentage', headerName: 'Fat %', width: 100 },
  { field: 'protein_percentage', headerName: 'Protein %', width: 100 },
];

export const getLactationColumns = (onDryOff: (id: number) => void): GridColDef[] => [
  { field: 'animal_tag', headerName: 'Animal', flex: 1 },
  { field: 'start_date', headerName: 'Start', width: 120 },
  { field: 'end_date', headerName: 'Status', width: 150, renderCell: (params) => params.value ? "Dry" : "Milking" },
  {
    field: 'actions', headerName: 'Actions', width: 130,
    renderCell: (params) => !params.row.end_date && (
      <Button variant="outlined" size="small" onClick={() => onDryOff(params.row.id)}>Mark Dry</Button>
    )
  }
];