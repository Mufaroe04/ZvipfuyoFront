import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addWeight } from '../redux/store/slices/operationsSlice';
import { AppDispatch, RootState } from '../redux/store';
import { Box, TextField, MenuItem, Typography, Paper, Stack, Button, InputAdornment } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { saveOutline } from 'ionicons/icons';

const AddWeightComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const { animals } = useSelector((state: RootState) => state.livestock);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    animal: '',
    weight_kg: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.animal || !formData.weight_kg) return;

    setLoading(true);
    try {
      await dispatch(addWeight({
        animal: Number(formData.animal),
        weight_kg: Number(formData.weight_kg),
        date: formData.date
      })).unwrap();
      history.push('/weights');
    } catch (err) {
      console.error("Failed to save weight", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">New Measurement</Typography>
        <Typography variant="body2" color="text.secondary">Capture current animal weight</Typography>
      </Box>
      
      <Paper sx={{ p: 4, borderRadius: '16px', border: '1px solid #ececec' }} elevation={0}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
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
              disabled={loading}
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
              {loading ? 'Saving to Records...' : 'Save weight record'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddWeightComponent;