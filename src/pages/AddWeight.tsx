import React, { useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonBackButton, IonButton, IonIcon, IonLoading, IonToast
} from '@ionic/react';
import { saveOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addWeight } from '../redux/store/slices/operationsSlice';
import { AppDispatch, RootState } from '../redux/store';
import { Box, TextField, MenuItem, Typography, Paper } from '@mui/material';

const AddWeight: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  
  const { animals } = useSelector((state: RootState) => state.livestock);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
      
      setShowToast(true);
      setTimeout(() => history.push('/weights'), 1500);
    } catch (err) {
      console.error("Failed to save weight", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/weights" />
          </IonButtons>
          <IonTitle>Log Weight</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Box sx={{ maxWidth: 500, margin: 'auto', mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            New Measurement
          </Typography>
          
          <Paper sx={{ p: 3, borderRadius: '15px' }} variant="outlined">
            <form onSubmit={handleSubmit}>
              <TextField
                select
                fullWidth
                label="Animal Tag"
                value={formData.animal}
                onChange={(e) => setFormData({ ...formData, animal: e.target.value })}
                sx={{ mb: 3 }}
                required
              >
                {animals.map((a) => (
                  <MenuItem key={a.id} value={a.id}>
                    {a.tag_number} ({a.breed_display})
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Weight (kg)"
                type="number"
                inputProps={{ step: "0.01" }}
                value={formData.weight_kg}
                onChange={(e) => setFormData({ ...formData, weight_kg: e.target.value })}
                sx={{ mb: 3 }}
                required
              />

              <TextField
                fullWidth
                label="Date of Weighing"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                sx={{ mb: 4 }}
                InputLabelProps={{ shrink: true }}
                required
              />

              <IonButton expand="block" type="submit" disabled={loading}>
                <IonIcon icon={saveOutline} slot="start" />
                Save to Records
              </IonButton>
            </form>
          </Paper>
        </Box>

        <IonLoading isOpen={loading} message={"Syncing with Digital Kraal..."} />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Weight record saved successfully!"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default AddWeight;