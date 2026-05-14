import React from 'react';
import { Box, TextField, MenuItem, Typography, Paper, Stack, Button, InputAdornment, Container } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { saveOutline } from 'ionicons/icons';
import { useWeightForm } from '../hooks/useWeightForm';

interface WeightFormProps {
  title: string;
  initialData?: any;
}

const WeightForm: React.FC<WeightFormProps> = ({ title, initialData }) => {
  const { formData, setFormData, isSubmitting, handleSubmit, isFormValid, animals } = useWeightForm(initialData);

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, borderRadius: '4px', border: '1px solid #ececec' }} elevation={0}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Typography variant="body1" fontWeight="bold">{title}</Typography>
            <Typography variant="body2" color="text.secondary">Capture current animal weight</Typography>
            <TextField
              select
              fullWidth
              label="Select Animal"
              value={formData.animal}
              onChange={(e) => setFormData({ ...formData, animal: e.target.value })}
              required
            >
              {animals.map((a) => (
                <MenuItem key={a.id} value={a.id}>
                  {a.tag_number} — {a.breed_display || 'Livestock'}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Weight"
              type="number"
              inputProps={{ step: "0.01" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              value={formData.weight_kg}
              onChange={(e) => setFormData({ ...formData, weight_kg: e.target.value })}
              required
            />

            <TextField
              fullWidth
              label="Date of Weighing"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />

            <Button 
              variant="contained" 
              type="submit" 
              disabled={!isFormValid || isSubmitting}
              fullWidth 
              startIcon={<IonIcon icon={saveOutline} />}
              sx={{ 
                borderRadius: '12px', 
                py: 1.8, 
                textTransform: 'none', 
                fontWeight: 'bold',
                bgcolor: '#18774c',
                '&:hover': { bgcolor: '#14633f' }
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save weight record'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default WeightForm;