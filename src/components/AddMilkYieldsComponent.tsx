import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, TextField, Typography, 
  Box, InputAdornment, Stack, Autocomplete,
  Button, MenuItem, FormControlLabel, Checkbox
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { addMilkYields } from '../redux/store/slices/operationsSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchAllAnimals } from '../redux/store/slices/livestockSlice'; // Adjust path as needed
import { SESSION_CHOICES } from '../constants/livestock';
import { IonSpinner } from '@ionic/react';

// Use the constants provided in your snippet
// export const SESSION_CHOICES = [
//   { value: 'AM', label: 'Morning' },
//   { value: 'PM', label: 'Evening' },
//   { value: 'MID', label: 'Midday' }
// ];

const AddMilkYieldsComponent: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
 const { animals, loading: animalsLoading } = useAppSelector((state) => state.livestock);

  // Initializing formData to match MilkYieldPayload
  const [formData, setFormData] = useState({
    animal: '',
    date: new Date().toISOString().split('T')[0],
    amount_liters: '',
    session: 'AM',
    is_colostrum: false,
    notes: ''
  });

    useEffect(() => {
        // Only fetch if the list is empty to save bandwidth
        if (animals.length === 0) {
        dispatch(fetchAllAnimals());
        }
    }, [dispatch, animals.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      animal: Number(formData.animal),
      amount_liters: parseFloat(formData.amount_liters),
    };

    try {
      // Using the Redux Thunk for state consistency
      const resultAction = await dispatch(addMilkYields(payload as any));
      
      if (addMilkYields.fulfilled.match(resultAction)) {
        history.push('/dairy'); // Redirect to your dairy dashboard
      } else {
        alert(resultAction.payload || "Failed to save record");
      }
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mb: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold">New Milk Yield Entry</Typography>
        <Typography color="text.secondary">Daily production logging</Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            
            <Typography variant="overline" color="primary" fontWeight="bold">Identification</Typography>
            
        <Autocomplete
        fullWidth
        options={animals}
        loading={animalsLoading} // Visual indicator in dropdown
        getOptionLabel={(option) => option.tag_number || ""}
        value={animals.find((a) => a.id === Number(formData.animal)) || null}
        onChange={(_event, newValue) => {
            setFormData({ ...formData, animal: newValue ? newValue.id.toString() : "" });
        }}
        renderInput={(params) => (
            <TextField 
            {...params} 
            label="Select Animal (Tag Number)" 
            required 
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                <React.Fragment>
                    {animalsLoading ? <IonSpinner name="crescent" style={{ fontSize: '20px' }} /> : null}
                    {params.InputProps.endAdornment}
                </React.Fragment>
                ),
            }}
            />
        )}
        />

            <Typography variant="overline" color="primary" fontWeight="bold">Production Details</Typography>

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />

              <TextField
                select
                fullWidth
                label="Session"
                value={formData.session}
                onChange={(e) => setFormData({...formData, session: e.target.value})}
                required
              >
                {SESSION_CHOICES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <TextField
              fullWidth
              label="Amount Collected"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">Liters</InputAdornment>,
              }}
              value={formData.amount_liters}
              onChange={(e) => setFormData({...formData, amount_liters: e.target.value})}
              required
            />

            <FormControlLabel
              control={
                <Checkbox 
                  checked={formData.is_colostrum} 
                  onChange={(e) => setFormData({...formData, is_colostrum: e.target.checked})} 
                />
              }
              label="Is Colostrum? (First milk after birth)"
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              placeholder="Health observations or stress factors..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />

            <Box sx={{ pt: 2 }}>
              <Button 
                variant="contained" 
                type="submit" 
                disabled={loading}
                fullWidth
                sx={{ borderRadius: '10px', px: 6, py: 1.5, textTransform: 'none', fontWeight: 'bold' }}
              >
                {loading ? 'Saving...' : 'Save Yield'}
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default AddMilkYieldsComponent;