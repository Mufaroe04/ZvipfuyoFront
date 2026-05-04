import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  Stack,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateHerd } from "../../redux/store/slices/livestockSlice";
import { useHistory, useParams } from "react-router-dom";
import { BREED_CHOICES, HERD_TYPES } from '../../constants/livestock';

interface HerdFormState {
  name: string;
  location: string;
  herd_type: string;
  primary_breed: string;
}

const HerdEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  
  const { herds } = useAppSelector((state) => state.livestock);
  const existingHerd = herds?.find((h) => String(h.id) === id);

  const [herd, setHerd] = useState<HerdFormState>({ 
    name: '', 
    location: '', 
    herd_type: '', 
    primary_breed: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingHerd) {
      setHerd({
        name: existingHerd.name || '',
        location: existingHerd.location || '',
        herd_type: existingHerd.herd_type || '',
        primary_breed: existingHerd.primary_breed || '',
      });
    } else {
      // If direct route navigation happens and no data is loaded, send back to list
      history.replace("/herds");
    }
  }, [existingHerd, history]);

  const isFormValid = 
    herd.name.trim() !== '' && 
    herd.location.trim() !== '' && 
    herd.herd_type !== '' && 
    herd.primary_breed !== '';

  const handleChange = (field: keyof HerdFormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    setHerd((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await dispatch(updateHerd({ id: Number(id), data: herd })).unwrap();
      history.replace("/herds");
    } catch (error) {
      console.error("Herd update failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4, minHeight: "calc(100vh - 64px)" }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          Edit Herd Details
        </Typography>
      </Stack>

      <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', border: '1px solid #e0e0e0' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            id="name"
            label="Herd Name"
            fullWidth
            variant="outlined"
            value={herd.name}
            onChange={handleChange('name')}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            id="location"
            label="Location"
            fullWidth
            variant="outlined"
            value={herd.location}
            onChange={handleChange('location')}
            required
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth margin="normal" required sx={{ mb: 2 }}>
            <InputLabel id="primary-breed-label">Primary Breed</InputLabel>
            <Select
              labelId="primary-breed-label"
              id="primary_breed"
              value={herd.primary_breed}
              label="Primary Breed"
              onChange={handleChange('primary_breed')}
            >
              {BREED_CHOICES.map((choice) => (
                <MenuItem key={choice.value} value={choice.value}>{choice.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required sx={{ mb: 3 }}>
            <InputLabel id="herd-type-label">Herd Type</InputLabel>
            <Select
              labelId="herd-type-label"
              id="herd_type"
              value={herd.herd_type}
              label="Herd Type"
              onChange={handleChange('herd_type')}
            >
              {HERD_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
            <Button
              variant="text"
              onClick={() => history.goBack()}
              sx={{ textTransform: "none", fontWeight: 600, color: "text.secondary" }}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              disabled={!isFormValid || isSubmitting}
              sx={{
                textTransform: "none",
                fontWeight: 'bold',
                px: 4,
                borderRadius: '8px',
                backgroundColor: "#18774c",
                '&:hover': { backgroundColor: "#145c3b" }
              }}
            >
              {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default HerdEdit;