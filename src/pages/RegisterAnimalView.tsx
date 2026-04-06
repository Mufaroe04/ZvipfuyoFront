import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { 
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonLoading, IonToast 
} from '@ionic/react';
import { 
  Box, TextField, MenuItem, Button, Paper, Typography, Stack, Alert, Autocomplete, Divider
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchAllHerds } from '../redux/store/slices/livestockSlice';
import { livestockService } from '../services/livestockService';
import { BREED_CHOICES } from '../constants/livestock';

const RegisterAnimalView: React.FC = () => {
  const { herdId } = useParams<{ herdId?: string }>(); 
  const history = useHistory();
  const dispatch = useAppDispatch();
  
  const { herds, animals } = useAppSelector((state) => state.livestock);
  
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    tag_number: '',
    herd: herdId ? Number(herdId) : '',
    breed: 'OTH',
    gender: 'female',
    date_of_birth: new Date().toISOString().split('T')[0],
    status: 'active',
    reproductive_status: 'none',
    mother_id: '', 
    father_tag: '',
    birth_weight: ''
  });

  // Filter potential mothers for the searchable dropdown
  const potentialMothers = animals.filter(a => a.gender === 'female');

  useEffect(() => {
    if (!herdId && herds.length === 0) {
      dispatch(fetchAllHerds());
    }
  }, [herdId, dispatch, herds.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.herd) {
      setToastMsg('Please assign this animal to a herd.');
      return;
    }

    setLoading(true);
    try {
      await livestockService.registerAnimal(formData);
      setToastMsg(`Animal ${formData.tag_number} registered successfully!`);
      
      setTimeout(() => {
        history.push(herdId ? `/herds/${herdId}` : '/animals');
      }, 1500);
    } catch (error: any) {
      const errorMsg = error.response?.data?.tag_number?.[0] || 'Registration failed.';
      setToastMsg(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={herdId ? `/herds/${herdId}` : "/animals"} />
          </IonButtons>
          <IonTitle>Register Animal</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, mb: 4 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #e0e0e0' }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                
                <Box>
                  <Typography variant="h5" fontWeight="black">Identity & Herd</Typography>
                  <Typography variant="body2" color="text.secondary">Basic details for the livestock registry.</Typography>
                </Box>

                {!herdId && (
                  <Alert severity="info" variant="outlined" sx={{ borderRadius: '12px' }}>
                    Assign this animal to a managed herd.
                  </Alert>
                )}

                <TextField
                  select
                  fullWidth
                  label="Assigned Herd"
                  name="herd"
                  value={formData.herd}
                  onChange={handleChange}
                  required
                  disabled={!!herdId}
                >
                  {herdId ? (
                    <MenuItem value={Number(herdId)}>Current Herd (ID: {herdId})</MenuItem>
                  ) : (
                    herds.map((h) => (
                      <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>
                    ))
                  )}
                </TextField>

                <TextField
                  fullWidth
                  label="Tag Number"
                  name="tag_number"
                  value={formData.tag_number}
                  onChange={handleChange}
                  required
                  inputProps={{ style: { textTransform: 'uppercase', fontWeight: 'bold' } }}
                />

                <TextField
                  select
                  fullWidth
                  label="Breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                >
                  {BREED_CHOICES.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </TextField>

                <Stack direction="row" spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                  </TextField>

                  <TextField
                    fullWidth
                    label="Birth Date"
                    name="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Stack>
                {/* NEW BIRTH WEIGHT FIELD */}
                <TextField
                  fullWidth
                  label="Birth Weight (kg)"
                  name="birth_weight"
                  type="number"
                  placeholder="e.g. 35.5"
                  value={formData.birth_weight}
                  onChange={handleChange}
                  helperText="Leave blank if unknown"
                  InputProps={{
                    endAdornment: <Typography variant="caption" sx={{ ml: 1, fontWeight: 'bold' }}>KG</Typography>
                  }}
                />
                <Divider sx={{ my: 1 }} />

                <Box>
                  <Typography variant="h6" fontWeight="bold">Lineage</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Optional: Link parents for pedigree tracking.
                  </Typography>
                </Box>

                <Autocomplete
                  options={potentialMothers}
                  getOptionLabel={(option) => `${option.tag_number} (${option.breed})`}
                  onChange={(_, newValue) => {
                    setFormData({ ...formData, mother_id: newValue ? newValue.id.toString() : '' });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Mother (Dam) Tag" placeholder="Search cows..." />
                  )}
                />

                <TextField 
                  fullWidth 
                  label="Father (Sire) Tag" 
                  name="father_tag" 
                  placeholder="e.g. Bull Tag or Straw ID"
                  value={formData.father_tag} 
                  onChange={handleChange} 
                />

                <Button 
                  variant="contained" 
                  type="submit" 
                  fullWidth 
                  size="large"
                  disableElevation
                  sx={{ py: 1.8, borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem' }}
                >
                  Complete Registration
                </Button>

              </Stack>
            </form>
          </Paper>
        </Box>

        <IonLoading isOpen={loading} message="Registering animal..." />
        <IonToast 
          isOpen={!!toastMsg} 
          message={toastMsg} 
          duration={3000} 
          color="dark"
          onDidDismiss={() => setToastMsg('')} 
        />
      </IonContent>
    </IonPage>
  );
};

export default RegisterAnimalView;