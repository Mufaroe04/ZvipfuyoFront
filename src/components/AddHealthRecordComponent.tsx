import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, TextField, Typography, Box, 
  InputAdornment, Stack, Autocomplete, Button 
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { saveOutline } from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchAllAnimals } from '../redux/store/slices/livestockSlice';
// Replace with your actual health slice action
import { addHealthRecord } from '../redux/store/slices/operationsSlice'; 

const AddHealthRecordComponent: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { animals } = useAppSelector((state) => state.livestock);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    animal: '',
    treatment_date: new Date().toISOString().split('T')[0],
    condition: '',
    treatment: '',
    cost: '',
    follow_up_date: '',
  });

  useEffect(() => {
    if (animals.length === 0) dispatch(fetchAllAnimals());
  }, [dispatch, animals.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      animal: formData.animal ? Number(formData.animal) : null,
      cost: formData.cost ? parseFloat(formData.cost) : 0,
    };

    const resultAction = await dispatch(addHealthRecord(payload as any));
    if (addHealthRecord.fulfilled.match(resultAction)) {
      history.push('/health');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mb: 4, mt: 2 }}>
        <Typography variant="h5" fontWeight="bold" >
          New Health Entry
        </Typography>
        <Typography color="text.secondary">Record medical interventions and costs</Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            
            <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold', color: '#18774c' }}>
              Animal Identification
            </Typography>
            
            <Autocomplete
              fullWidth
              options={animals}
              getOptionLabel={(option) => option.tag_number || ""}
              onChange={(_event, newValue) => {
                setFormData({ ...formData, animal: newValue ? newValue.id.toString() : "" });
              }}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Search Tag Number" 
                  required 
                  placeholder="e.g. ZW-26..."
                />
              )}
            />

            <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold', color: '#18774c' }}>
              Clinical Details
            </Typography>

            <TextField
              fullWidth
              label="Condition / Diagnosis"
              value={formData.condition}
              onChange={(e) => setFormData({...formData, condition: e.target.value})}
              required
            />

            <TextField
              fullWidth
              type="date"
              label="Date of Treatment"
              InputLabelProps={{ shrink: true }}
              value={formData.treatment_date}
              onChange={(e) => setFormData({...formData, treatment_date: e.target.value})}
              required
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Treatment Administered"
              value={formData.treatment}
              onChange={(e) => setFormData({...formData, treatment: e.target.value})}
              required
            />

            <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold', color: '#18774c' }}>
              Financials & Scheduling
            </Typography>

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Cost (USD)"
                type="number"
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                value={formData.cost}
                onChange={(e) => setFormData({...formData, cost: e.target.value})}
              />
              <TextField
                fullWidth
                type="date"
                label="Follow-up Date"
                InputLabelProps={{ shrink: true }}
                value={formData.follow_up_date}
                onChange={(e) => setFormData({...formData, follow_up_date: e.target.value})}
              />
            </Stack>

            <Button 
              variant="contained" 
              type="submit" 
              disabled={loading}
              fullWidth 
            //   startIcon={<IonIcon icon={saveOutline} />}
              sx={{ 
                borderRadius: '12px', 
                py: 1.8, 
                textTransform: 'none', 
                fontWeight: 'bold',
                bgcolor: '#18774c',
                '&:hover': { bgcolor: '#14633f' }
              }}
            >
              {loading ? 'Saving Record...' : 'Save Health Record'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default AddHealthRecordComponent;