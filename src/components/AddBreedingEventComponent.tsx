import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, TextField, MenuItem, Typography, 
  Box, Stack, Autocomplete, Button 
} from '@mui/material';
import { useHistory } from 'react-router-dom';
// import { IonIcon } from '@ionic/react';
// import { saveOutline } from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchAllAnimals } from '../redux/store/slices/livestockSlice';
import { logBreedingEvent } from '../redux/store/slices/reproductionSlice';

const AddBreedingEventComponent: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { animals } = useAppSelector((state) => state.livestock);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    animal: '', 
    breeding_date: new Date().toISOString().split('T')[0],
    type: 'natural', 
    sire_tag: '', 
    status: 'pending', 
    notes: '',
  });

  useEffect(() => {
    if (animals.length === 0) dispatch(fetchAllAnimals());
  }, [dispatch, animals.length]);

  const females = animals.filter(a => a.gender?.toLowerCase() === 'female');
  const males = animals.filter(a => a.gender?.toLowerCase() === 'male');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const resultAction = await dispatch(logBreedingEvent(formData));
    
    if (logBreedingEvent.fulfilled.match(resultAction)) {
      history.push('/reproduction');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mb: 4, mt: 2 }}>
        <Typography variant="h5" fontWeight="bold">New Breeding Event</Typography>
        <Typography color="text.secondary">Record a new mating or AI session</Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            
            <Typography variant="overline" sx={{ color: '#18774c', fontWeight: 'bold' }}>
              The Dam (Cow)
            </Typography>
            
            <Autocomplete
              fullWidth
              options={females}
              getOptionLabel={(option) => option.tag_number || ""}
              value={females.find((a) => a.id === Number(formData.animal)) || null}
              onChange={(_, newValue) => {
                setFormData({ ...formData, animal: newValue ? newValue.id.toString() : "" });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Search Cow Tag Number" required />
              )}
            />

            <Typography variant="overline" sx={{ color: '#18774c', fontWeight: 'bold' }}>
              Service Details
            </Typography>
            
            <TextField
              fullWidth
              type="date"
              label="Date of Service"
              InputLabelProps={{ shrink: true }}
              value={formData.breeding_date}
              onChange={(e) => setFormData({...formData, breeding_date: e.target.value})}
              required
            />

            <TextField
              select
              fullWidth
              label="Breeding Method"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <MenuItem value="natural">Natural Service (Bull)</MenuItem>
              <MenuItem value="ai">Artificial Insemination (AI)</MenuItem>
            </TextField>

            <Autocomplete
              freeSolo
              fullWidth
              options={males}
              getOptionLabel={(option) => typeof option === 'string' ? option : option.tag_number}
              value={males.find((a) => a.tag_number === formData.sire_tag) || formData.sire_tag}
              onInputChange={(_, newValue) => {
                setFormData({ ...formData, sire_tag: newValue });
              }}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Sire (Bull) Tag Number" 
                  placeholder="Select or type Bull Tag"
                />
              )}
            />

            <Typography variant="overline" sx={{ color: '#18774c', fontWeight: 'bold' }}>
              Initial Outcome
            </Typography>
            
            <TextField
              select
              fullWidth
              label="Current Status"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <MenuItem value="pending">Pending (Awaiting Check)</MenuItem>
              <MenuItem value="confirmed">Confirmed Pregnant</MenuItem>
              <MenuItem value="failed">Attempt Failed</MenuItem>
            </TextField>

            <TextField
              fullWidth
              multiline
              rows={2}
              label="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />

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
              {loading ? 'Recording...' : 'Log Breeding Attempt'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBreedingEventComponent;