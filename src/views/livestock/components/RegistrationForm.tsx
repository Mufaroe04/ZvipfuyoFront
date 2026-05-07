// src/views/livestock/components/RegistrationForm.tsx
import React from 'react';
import { 
  Box, TextField, MenuItem, Button, Typography, Stack, Alert, Autocomplete, Divider 
} from '@mui/material';
import { BREED_CHOICES } from '../../../constants/livestock';

interface RegistrationFormProps {
  formData: any;
  herds: any[];
  potentialMothers: any[];
  herdId?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMotherChange: (value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formData, herds, potentialMothers, herdId, onChange, onMotherChange, onSubmit
}) => (
  <form onSubmit={onSubmit}>
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" fontWeight="black">Identity & Herd</Typography>
        <Typography variant="body2" color="text.secondary">Basic details for the livestock registry.</Typography>
      </Box>

      {!herdId && (
        <Alert severity="success" variant="outlined" sx={{ borderRadius: '12px', color: '#374151' }}>
          Assign this animal to a managed herd.
        </Alert>
      )}

      <TextField
        select fullWidth label="Assigned Herd" name="herd"
        value={formData.herd} onChange={onChange} required disabled={!!herdId}
      >
        {herdId ? (
          <MenuItem value={Number(herdId)}>Current Herd (ID: {herdId})</MenuItem>
        ) : (
          herds.map((h) => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)
        )}
      </TextField>

      <TextField
        fullWidth label="Tag Number" name="tag_number" required
        value={formData.tag_number} onChange={onChange}
        inputProps={{ style: { textTransform: 'uppercase', fontWeight: 'bold' } }}
      />

      <TextField select fullWidth label="Breed" name="breed" value={formData.breed} onChange={onChange}>
        {BREED_CHOICES.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>

      <Stack direction="row" spacing={2}>
        <TextField select fullWidth label="Gender" name="gender" value={formData.gender} onChange={onChange}>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="male">Male</MenuItem>
        </TextField>
        <TextField
          fullWidth label="Birth Date" name="date_of_birth" type="date"
          value={formData.date_of_birth} onChange={onChange} InputLabelProps={{ shrink: true }}
        />
      </Stack>

      <TextField
        fullWidth label="Birth Weight (kg)" name="birth_weight" type="number"
        value={formData.birth_weight} onChange={onChange}
        InputProps={{ endAdornment: <Typography variant="caption" sx={{ ml: 1, fontWeight: 'bold' }}>KG</Typography> }}
      />

      <Divider sx={{ my: 1 }} />

      <Box>
        <Typography variant="h6" fontWeight="bold">Lineage</Typography>
        <Typography variant="caption" color="text.secondary">Optional: Link parents for pedigree tracking.</Typography>
      </Box>

      <Autocomplete
        options={potentialMothers}
        getOptionLabel={(option) => `${option.tag_number} (${option.breed})`}
        onChange={(_, val) => onMotherChange(val)}
        renderInput={(params) => <TextField {...params} label="Mother (Dam) Tag" placeholder="Search cows..." />}
      />

      <TextField 
        fullWidth label="Father (Sire) Tag" name="father_tag" 
        value={formData.father_tag} onChange={onChange} placeholder="e.g. Bull Tag or Straw ID"
      />

      <Button 
        variant="contained" type="submit" fullWidth size="large" disableElevation
        sx={{ py: 1.8, borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem' }}
      >
        Complete Registration
      </Button>
    </Stack>
  </form>
);