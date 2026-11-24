// src/views/dairy/components/MilkYieldForm.tsx
import React from 'react';
import { Paper, TextField, Stack, MenuItem, FormControlLabel, Checkbox, Typography, Box, Button } from '@mui/material';
import { SESSION_CHOICES } from '../../../constants/livestock';
import { AsyncAnimalSelect } from '../../../components/search/AsyncAnimalSelect';

interface Props {
  data: any;
  loading: boolean;
  onChange: (newData: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const MilkYieldForm: React.FC<Props> = ({ data, loading, onChange, onSubmit }) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: '4px', border: '1px solid #ececec' }}>
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="body1" fontWeight="black">Production Yield</Typography>
          <Typography variant="body2" color="text.secondary">Daily volume collected during milking sessions.</Typography>
        </Box>

        <AsyncAnimalSelect
          multiple={false}
          value={data.animal_object || null}
          onChange={(animal) => onChange({ 
            ...data, 
            animal: animal ? animal.id.toString() : '', 
            animal_object: animal 
          })}
          label="Search Animal Tag"
          required
        />

        <Stack direction="row" spacing={2}>
          <TextField type="date" label="Date" fullWidth InputLabelProps={{ shrink: true }} value={data.date} onChange={(e) => onChange({...data, date: e.target.value})} required />
          <TextField select label="Session" fullWidth value={data.session} onChange={(e) => onChange({...data, session: e.target.value})} required>
            {SESSION_CHOICES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
          </TextField>
        </Stack>

        <TextField 
          label="Amount Collected" type="number" 
          inputProps={{ step: "0.1" }}
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