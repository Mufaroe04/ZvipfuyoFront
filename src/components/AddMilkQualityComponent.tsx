import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, TextField, Typography, Box, 
  InputAdornment, Stack, Autocomplete, Button 
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addMilkQuality } from '../redux/store/slices/operationsSlice';
import { fetchAllAnimals } from '../redux/store/slices/livestockSlice';

const AddMilkQualityComponent: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { animals } = useAppSelector((state) => state.livestock);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    animal: '',
    date: new Date().toISOString().split('T')[0],
    fat_percentage: '',
    protein_percentage: '',
    somatic_cell_count: '',
  });

  useEffect(() => {
    if (animals.length === 0) dispatch(fetchAllAnimals());
  }, [dispatch, animals.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      date: formData.date,
      fat_percentage: parseFloat(formData.fat_percentage),
      protein_percentage: parseFloat(formData.protein_percentage),
      somatic_cell_count: parseInt(formData.somatic_cell_count),
      animal: formData.animal ? Number(formData.animal) : null,
    };

    const resultAction = await dispatch(addMilkQuality(payload as any));
    if (addMilkQuality.fulfilled.match(resultAction)) {
      history.push('/dairy');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mb: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold">Milk Quality Audit</Typography>
        <Typography color="text.secondary">Record laboratory test results</Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Autocomplete
              options={animals}
              getOptionLabel={(option) => option.tag_number}
              onChange={(_, val) => setFormData({ ...formData, animal: val ? val.id.toString() : '' })}
              renderInput={(params) => <TextField {...params} label="Animal (Optional - leave blank for Bulk)" />}
            />

            <TextField
              fullWidth type="date" label="Test Date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth label="Fat %" type="number"
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                value={formData.fat_percentage}
                onChange={(e) => setFormData({...formData, fat_percentage: e.target.value})}
                required
              />
              <TextField
                fullWidth label="Protein %" type="number"
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                value={formData.protein_percentage}
                onChange={(e) => setFormData({...formData, protein_percentage: e.target.value})}
                required
              />
            </Stack>

            <TextField
              fullWidth label="SCC (Somatic Cell Count)" type="number"
              placeholder="e.g. 150000"
              helperText="High SCC indicates potential mastitis"
              value={formData.somatic_cell_count}
              onChange={(e) => setFormData({...formData, somatic_cell_count: e.target.value})}
              required
            />

            <Button variant="contained" type="submit" disabled={loading} fullWidth sx={{ borderRadius: '10px', px: 6, py: 1.5, textTransform: 'none', fontWeight: 'bold'  }}>
              {loading ? 'Saving Audit...' : 'Save Quality Record'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default AddMilkQualityComponent;