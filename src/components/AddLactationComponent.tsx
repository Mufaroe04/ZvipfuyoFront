import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, TextField, Typography, Box, 
  Stack, Autocomplete, Button, FormControlLabel, Switch 
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addLactationPeriod } from '../redux/store/slices/operationsSlice';
import { fetchAllAnimals } from '../redux/store/slices/livestockSlice';

const AddLactationComponent: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { animals } = useAppSelector((state) => state.livestock);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    animal: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    lactation_number: '',
    is_active: true
  });

  useEffect(() => {
    if (animals.length === 0) dispatch(fetchAllAnimals());
  }, [dispatch, animals.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      animal: Number(formData.animal),
      lactation_number: parseInt(formData.lactation_number),
      end_date: formData.end_date || null
    };

    const resultAction = await dispatch(addLactationPeriod(payload as any));
    if (addLactationPeriod.fulfilled.match(resultAction)) {
      history.push('/dairy');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mb: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold">New Lactation Period</Typography>
        <Typography color="text.secondary">Start a new production cycle (Calving)</Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Autocomplete
              options={animals}
              getOptionLabel={(option) => option.tag_number}
              onChange={(_, val) => setFormData({ ...formData, animal: val ? val.id.toString() : '' })}
              renderInput={(params) => <TextField {...params} label="Select Animal" required />}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth type="date" label="Start Date (Calving)"
                InputLabelProps={{ shrink: true }}
                value={formData.start_date}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                required
              />
              <TextField
                fullWidth label="Lactation #" type="number"
                placeholder="e.g. 1"
                value={formData.lactation_number}
                onChange={(e) => setFormData({...formData, lactation_number: e.target.value})}
                required
              />
            </Stack>

            <TextField
              fullWidth type="date" label="Dry-off Date (Optional)"
              helperText="Only set if cow is already dry"
              InputLabelProps={{ shrink: true }}
              value={formData.end_date}
              onChange={(e) => setFormData({...formData, end_date: e.target.value})}
            />

            <FormControlLabel
              control={<Switch checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} />}
              label="Currently Active (Milking)"
            />

            <Button variant="contained" type="submit" disabled={loading} fullWidth sx={{borderRadius: '10px', px: 6, py: 1.5, textTransform: 'none', fontWeight: 'bold' }}>
              {loading ? 'Starting Period...' : 'Start Lactation Period'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default AddLactationComponent;