// src/views/livestock/components/RegistrationForm.tsx
import React from 'react';
import { 
  Box, TextField, MenuItem, Button, Typography, Stack, Alert, Autocomplete, Divider, 
  CircularProgress
} from '@mui/material';
import { ANIMALSTATUS, BREED_CHOICES } from '../../../constants/livestock';

interface FormProps {
  formData: any;
  herds: any[];
  potentialMothers: any[];
  potentialFathers:any[];
  herdId?: string;
  isEditMode?: boolean; // New prop
  isSubmitting?:boolean;
  isFormValid?:boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMotherChange: (value: any) => void;
  onFatherChange:(value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  goBack:()=>void;
}

export const AnimalForm: React.FC<FormProps> = ({
  formData, herds, potentialMothers, potentialFathers,
   herdId, isEditMode, isSubmitting,onChange, onMotherChange,
    onFatherChange, onSubmit,goBack,isFormValid
}) => (
  <form onSubmit={onSubmit}>
    <Stack spacing={3}>
      <Box>
       <Typography variant="body1" fontWeight="black">
          {isEditMode ? 'Update Animal' : 'Identity & Herd'}
        </Typography>
        <Typography variant="body2" color="text.secondary">Basic details for the livestock registry.</Typography>
      </Box>

      {!formData.herd && (
        <Alert severity="success" variant="outlined" sx={{ borderRadius: '12px', color: '#374151' }}>
          Assign this animal to a  herd.
        </Alert>
      )}

      <TextField
        select fullWidth label="Assigned Herd" name="herd"
        value={formData.herd} onChange={onChange} required disabled={!!herdId}
      >
        {herdId ? (
          <MenuItem value={Number(herdId)}>Current Herd (ID: {formData.herd})</MenuItem>
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

      
      <TextField select fullWidth label="Status" name="status" value={formData.status} onChange={onChange}>
        {ANIMALSTATUS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>

      <Divider sx={{ my: 1 }} />

      <Box>
        <Typography variant="body1" fontWeight="bold">Lineage</Typography>
        <Typography variant="body2" color="text.secondary">Optional: Link parents for pedigree tracking.</Typography>
      </Box>

        <Autocomplete
      options={potentialMothers || []}
      // This ensures the correct animal is visually selected in Edit mode
      value={potentialMothers?.find(m => m.tag_number === formData.mother_tag) || null}
      getOptionLabel={(option) => `${option.tag_number} (${option.breed})`}
      isOptionEqualToValue={(option, value) => option.tag_number === value.tag_number}
      onChange={(_, val) => onMotherChange(val)}
      renderInput={(params) => <TextField {...params} label="Mother (Dam) Tag" />}
    />

    <Autocomplete
    options={potentialFathers || []}
    // This ensures the correct animal is visually selected in Edit mode
    value={potentialFathers?.find(m => m.tag_number === formData.father_tag) || null}
    getOptionLabel={(option) => `${option.tag_number} (${option.breed})`}
    isOptionEqualToValue={(option, value) => option.tag_number === value.tag_number}
    onChange={(_, val) => onFatherChange(val)}
    renderInput={(params) => <TextField {...params} label="Father (Sire) Tag" />}
  />

{/* <Typography variant="caption" color="error">
  Debug: Valid: {isFormValid ? "YES" : "NO"} | Submitting: {isSubmitting ? "YES" : "NO"}
</Typography> */}

     <Button 
        variant="contained" 
        type="submit"
        fullWidth size="large"
        disableElevation
        disabled={!isFormValid || isSubmitting}

        sx={{ py: 1.8, borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem' }}
      >
      {isSubmitting ? (
        <CircularProgress size={26} color="inherit" />
      ) : (
        isEditMode ? 'Save Changes' : 'Complete Registration'
      )}
      </Button>
      <Button 
          fullWidth 
          onClick={goBack} 
          sx={{ 
            mt: 1, 
            textTransform: "none", 
            fontWeight: 600, 
            color: "text.secondary" 
          }}
        >
          Cancel and Go Back
        </Button>
    </Stack>
  </form>
);