import React from 'react';
import { Paper, TextField, Stack, Autocomplete, Button, MenuItem, FormControlLabel, Checkbox, InputAdornment, Typography, Box } from '@mui/material';
import { SESSION_CHOICES } from '../../../constants/livestock';

interface Props {
  data: any;
  animals: any[];
  loading: boolean;
  onChange: (newData: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const MilkYieldForm: React.FC<Props> = ({ data, animals, loading, onChange, onSubmit }) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec' }}>
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" fontWeight="black">Production Yield</Typography>
          <Typography variant="body2" color="text.secondary">Daily volume collected during milking sessions.</Typography>
        </Box>

        <Autocomplete
          options={animals}
          getOptionLabel={(opt) => opt.tag_number || ""}
          onChange={(_, val) => onChange({ ...data, animal: val ? val.id.toString() : "" })}
          renderInput={(params) => <TextField {...params} label="Animal Tag" required />}
        />

        <Stack direction="row" spacing={2}>
          <TextField type="date" label="Date" fullWidth InputLabelProps={{ shrink: true }} value={data.date} onChange={(e) => onChange({...data, date: e.target.value})} required />
          <TextField select label="Session" fullWidth value={data.session} onChange={(e) => onChange({...data, session: e.target.value})} required>
            {SESSION_CHOICES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
          </TextField>
        </Stack>

        <TextField 
          label="Amount Collected" type="number" 
          InputProps={{ endAdornment: <Typography variant="caption" sx={{ fontWeight: 'bold' }}>LITERS</Typography> }} 
          value={data.amount_liters} onChange={(e) => onChange({...data, amount_liters: e.target.value})} required 
        />

        <FormControlLabel 
          control={<Checkbox checked={data.is_colostrum} onChange={(e) => onChange({...data, is_colostrum: e.target.checked})} />} 
          label={<Typography variant="body2">This is colostrum milk</Typography>} 
        />

        <Button 
          type="submit" variant="contained" size="large" disableElevation
          disabled={loading} 
          sx={{ py: 1.8, borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem' }}
        >
          {loading ? 'Saving...' : 'Save Production Record'}
        </Button>
      </Stack>
    </form>
  </Paper>
);