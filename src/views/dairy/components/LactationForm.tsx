// src/views/dairy/components/LactationForm.tsx
import React from 'react';
import { Paper, TextField, Stack, Autocomplete, Button, FormControlLabel, Switch, Box, Typography } from '@mui/material';
import { AsyncAnimalSelect } from '../../../components/search/AsyncAnimalSelect';

interface Props {
  data: any;
  loading: boolean;
  onChange: (newData: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LactationForm: React.FC<Props> = ({ data, loading, onChange, onSubmit }) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec' }}>
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="body1" fontWeight="black">Lactation Cycle</Typography>
          <Typography variant="body2" color="text.secondary">Track the active milking period for this animal.</Typography>
        </Box>

        {/* <Autocomplete
          options={animals}
          getOptionLabel={(option) => option.tag_number || ""}
          onChange={(_, val) => onChange({ ...data, animal: val ? val.id.toString() : '' })}
          renderInput={(params) => <TextField {...params} label="Select Animal" required />}
        /> */}
          <AsyncAnimalSelect
            value={data.animal}
            onChange={(id) => onChange({ ...data, animal: id })}
            label="Search Animal Tag"
            required
          />
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth type="date" label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={data.start_date}
            onChange={(e) => onChange({...data, start_date: e.target.value})}
            required
          />
          <TextField
            fullWidth label="Lactation #" type="number"
            value={data.lactation_number}
            onChange={(e) => onChange({...data, lactation_number: e.target.value})}
            required
          />
        </Stack>

        <FormControlLabel
          control={<Switch checked={data.is_active} onChange={(e) => onChange({...data, is_active: e.target.checked})} />}
          label={<Typography variant="body2" fontWeight="bold">Currently Active Period</Typography>}
          sx={{ ml: 0.5 }}
        />

        <Button 
          variant="contained" type="submit" size="large" disableElevation
          disabled={loading} 
          sx={{ py: 1.8, borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem' }}
        >
          {loading ? 'Starting Period...' : 'Complete Entry'}
        </Button>
      </Stack>
    </form>
  </Paper>
);