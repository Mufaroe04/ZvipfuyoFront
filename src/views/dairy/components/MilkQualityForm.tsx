import React from 'react';
import { Paper, TextField, Stack, Autocomplete, Button, Typography, Box } from '@mui/material';

interface Props {
  data: any;
  animals: any[];
  loading: boolean;
  onChange: (newData: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}
 


export const MilkQualityForm: React.FC<Props> = ({ data, animals, loading, onChange, onSubmit }) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec' }}>
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" fontWeight="black">Quality Analysis</Typography>
          <Typography variant="body2" color="text.secondary">Record laboratory results and nutrient levels.</Typography>
        </Box>

        <Autocomplete
          options={animals}
          getOptionLabel={(opt) => opt.tag_number || ""}
          onChange={(_, val) => onChange({ ...data, animal: val ? val.id.toString() : '' })}
          renderInput={(params) => <TextField {...params} label="Animal (Optional for Bulk)" />}
        />

        <TextField fullWidth type="date" label="Test Date" InputLabelProps={{ shrink: true }} value={data.date} onChange={(e) => onChange({...data, date: e.target.value})} required />

        <Stack direction="row" spacing={2}>
          <TextField 
            fullWidth label="Fat %" type="number" 
            InputProps={{ endAdornment: <Typography variant="caption" sx={{ fontWeight: 'bold' }}>%</Typography> }} 
            value={data.fat_percentage} onChange={(e) => onChange({...data, fat_percentage: e.target.value})} required 
          />
          <TextField 
            fullWidth label="Protein %" type="number" 
            InputProps={{ endAdornment: <Typography variant="caption" sx={{ fontWeight: 'bold' }}>%</Typography> }} 
            value={data.protein_percentage} onChange={(e) => onChange({...data, protein_percentage: e.target.value})} required 
          />
        </Stack>

        <TextField 
          fullWidth label="SCC" type="number" 
          placeholder="e.g. 200000"
          helperText="Somatic Cell Count per mL" 
          value={data.somatic_cell_count} onChange={(e) => onChange({...data, somatic_cell_count: e.target.value})} required 
        />

        <Button 
          variant="contained" type="submit" size="large" disableElevation
          disabled={loading} 
          sx={{ py: 1.8, borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem' }}
        >
          {loading ? 'Saving...' : 'Record Analysis'}
        </Button>
      </Stack>
    </form>
  </Paper>
);