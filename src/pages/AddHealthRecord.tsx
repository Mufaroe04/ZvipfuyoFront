import React, { useState, useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonButton, IonIcon, IonLoading, IonToast 
} from '@ionic/react';
import { 
  Container, Paper, TextField, Typography, 
  Box, InputAdornment, Stack,Autocomplete
} from '@mui/material';
import { saveOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const AddHealthRecord: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [animals, setAnimals] = useState<{id: number, tag_number: string}[]>([]);

  const [formData, setFormData] = useState({
    animal: '',
    treatment_date: new Date().toISOString().split('T')[0],
    condition: '',
    treatment: '',
    cost: '',
    follow_up_date: '',
  });

  useEffect(() => {
    fetch('http://localhost:8000/api/animals/')
      .then(res => res.json())
      .then(data => setAnimals(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/health/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowToast(true);
        setTimeout(() => history.push('/health'), 1500);
      }
    } catch (error) {
      console.error("Failed to save record:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/health" />
          </IonButtons>
          <IonTitle>Log Treatment</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="sm">
          <Box sx={{ mb: 4, mt: 2 }}>
            <Typography variant="h5" fontWeight="bold">New Health Entry</Typography>
            <Typography color="text.secondary">Record medical interventions and costs.</Typography>
          </Box>

          <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec' }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                
                {/* Identification Section */}
                <Typography variant="overline" color="primary" fontWeight="bold">Animal Identification</Typography>
                
                <Autocomplete
                fullWidth
                options={animals}
                getOptionLabel={(option) => option.tag_number || ""}
                // Ensure we find the correct animal object to keep the value in sync
                value={animals.find((a) => a.id === Number(formData.animal)) || null}
                onChange={(_event, newValue) => {
                    setFormData({ ...formData, animal: newValue ? newValue.id.toString() : "" });
                }}
                renderInput={(params) => (
                    <TextField 
                    {...params} 
                    label="Search Tag Number (e.g. ZW-26...)" 
                    required 
                    placeholder="Type to filter..."
                    />
                )}
                // This makes the dropdown easier to read with large lists
                ListboxProps={{
                    style: { maxHeight: '250px' }
                }}
                />

                {/* Clinical Details Section */}
                <Typography variant="overline" color="primary" fontWeight="bold">Clinical Details</Typography>

                <TextField
                  fullWidth
                  label="Condition / Diagnosis"
                  placeholder="e.g. Foot Rot"
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
                  rows={4}
                  label="Treatment Administered"
                  placeholder="Meds, dosage, and procedures..."
                  value={formData.treatment}
                  onChange={(e) => setFormData({...formData, treatment: e.target.value})}
                  required
                />

                {/* Financials & Scheduling */}
                <Typography variant="overline" color="primary" fontWeight="bold">Follow-up & Logistics</Typography>

                <TextField
                  fullWidth
                  label="Treatment Cost (USD)"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: e.target.value})}
                />

                <TextField
                  fullWidth
                  type="date"
                  label="Follow-up Date"
                  helperText="Leave blank if no follow-up is required"
                  InputLabelProps={{ shrink: true }}
                  value={formData.follow_up_date}
                  onChange={(e) => setFormData({...formData, follow_up_date: e.target.value})}
                />

                <Box sx={{ pt: 2 }}>
                  <IonButton 
                    expand="block" 
                    type="submit" 
                    style={{ '--border-radius': '12px', height: '52px' }}
                  >
                    <IonIcon slot="start" icon={saveOutline} />
                    Save Health Record
                  </IonButton>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Container>

        <IonLoading isOpen={loading} message="Saving record..." />
        <IonToast 
          isOpen={showToast} 
          message="Health record saved successfully!" 
          duration={2000} 
          color="success" 
        />
      </IonContent>
    </IonPage>
  );
};

export default AddHealthRecord;