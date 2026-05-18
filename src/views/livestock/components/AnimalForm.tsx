// src/views/livestock/components/RegistrationForm.tsx
import React from 'react';
import { 
  Box, TextField, MenuItem, Button, Typography, Stack, Alert, Divider, 
  CircularProgress
} from '@mui/material';
import { ANIMALSTATUS, BREED_CHOICES } from '../../../constants/livestock';
import { AsyncAnimalSelect } from '../../../components/search/AsyncAnimalSelect';

interface FormProps {
  formData: any;
  herds: any[];
  herdId?: string;
  isEditMode?: boolean; // New prop
  isSubmitting?:boolean;
  isFormValid?:boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTagChange: (field: 'mother_tag' | 'father_tag', value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  goBack:()=>void;
}

export const AnimalForm: React.FC<FormProps> = ({
  formData, herds,
   herdId, isEditMode, isSubmitting,onChange,
   onSubmit,goBack,isFormValid,onTagChange
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
      <AsyncAnimalSelect
            value={formData.mother_tag}
            onChange={(val) => onTagChange('mother_tag', val)}
            gender="female"
            label="Mother (Dam) Tag"
            valueType="tag_number"
          />

      <AsyncAnimalSelect
        value={formData.father_tag}
        onChange={(val) => onTagChange('father_tag', val)}
        gender="male"
        label="Father (Sire) Tag"
        valueType="tag_number"
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