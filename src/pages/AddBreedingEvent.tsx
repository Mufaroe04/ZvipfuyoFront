import React, { useState, useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonButton, IonIcon, IonLoading, IonToast 
} from '@ionic/react';
import { 
  Container, Paper, TextField, MenuItem, Typography, 
  Box, InputAdornment, Stack, Autocomplete
} from '@mui/material';
import { saveOutline, heartOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logBreedingEvent } from '../redux/store/slices/reproductionSlice';

const AddBreedingEvent: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Local state for animals (Dams and Sires)
  const [animals, setAnimals] = useState<{id: number, tag_number: string, gender: string}[]>([]);

  const [formData, setFormData] = useState({
    animal: '', // The Dam (Cow)
    breeding_date: new Date().toISOString().split('T')[0],
    type: 'natural', // 'AI' or 'natural'
    sire_tag: '', // The Bull
    status: 'pending', // 'pending', 'confirmed', 'failed'
    notes: '',
  });

  useEffect(() => {
    // Fetching all animals to filter by gender locally for the dropdowns
    fetch('http://localhost:8000/api/animals/')
      .then(res => res.json())
      .then(data => setAnimals(data));
  }, []);

  const females = animals.filter(a => a.gender === 'female');
  const males = animals.filter(a => a.gender === 'male');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const resultAction = await dispatch(logBreedingEvent(formData));
    
    setLoading(false);
    if (logBreedingEvent.fulfilled.match(resultAction)) {
      setShowToast(true);
      setTimeout(() => history.push('/reproduction'), 1500);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/reproduction" />
          </IonButtons>
          <IonTitle>Log Breeding</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="sm">
          <Box sx={{ mb: 4, mt: 2 }}>
            <Typography variant="h5" fontWeight="bold">New Breeding Event</Typography>
            <Typography color="text.secondary">Record a new mating or AI session.</Typography>
          </Box>

          <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec' }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                
                {/* Dam Selection (Searchable) */}
                <Typography variant="overline" color="primary" fontWeight="bold">The Dam (Cow)</Typography>
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

                {/* Event Details */}
                <Typography variant="overline" color="primary" fontWeight="bold">Service Details</Typography>
                
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
                  <MenuItem value="AI">Artificial Insemination (AI)</MenuItem>
                </TextField>

                {/* Sire Selection */}
                <Autocomplete
                  freeSolo // Allows entering a Sire tag if the Bull isn't in the system yet
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

                {/* Status & Outcome */}
                <Typography variant="overline" color="primary" fontWeight="bold">Initial Outcome</Typography>
                
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
                  placeholder="e.g. Straw batch ID or Bull behavior notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />

                <Box sx={{ pt: 2 }}>
                  <IonButton 
                    expand="block" 
                    type="submit" 
                    style={{ '--border-radius': '12px', height: '52px' }}
                  >
                    <IonIcon slot="start" icon={saveOutline} />
                    Log Breeding Attempt
                  </IonButton>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Container>

        <IonLoading isOpen={loading} message="Recording event..." />
        <IonToast 
          isOpen={showToast} 
          message="Breeding event logged successfully!" 
          duration={2000} 
          color="success" 
        />
      </IonContent>
    </IonPage>
  );
};

export default AddBreedingEvent;