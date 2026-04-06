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
  IconButton
} from "@mui/material";
import { createHerd, selectCreateHerdError, resetCreateHerdStatus } from "../redux/store/slices/livestockSlice";
import { AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BREED_CHOICES } from '../constants/livestock';
import { IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

const HerdAdd: React.FC = () => {
  const [herd, setHerd] = useState({ name: '', location: '', herd_type: '', primary_breed: '' });
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const createHerdStatus = useSelector(selectCreateHerdError);

  useEffect(() => {
    if (createHerdStatus === "succeeded") {
      history.replace("/herds");
      dispatch(resetCreateHerdStatus());
    } else if (createHerdStatus === "failed") {
      dispatch(resetCreateHerdStatus());
    }
  }, [createHerdStatus, history, dispatch]);

  const HERD_TYPES = [
    { value: 'Stud', label: 'Stud' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Feedlot', label: 'Feedlot' },
    { value: 'Research', label: 'Research' },
    { value: 'Dairy', label: 'Dairy' },
  ];

  const handleSubmit = async () => {
    try {
      await dispatch(createHerd(herd)).unwrap();
    } catch (error: any) {
      console.error("Herd creation failed:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4, minHeight: "calc(100vh - 64px)" }}>
      {/* BACK NAVIGATION HEADER */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        {/* <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
          <IonIcon icon={arrowBackOutline} />
        </IconButton> */}
        <Typography variant="h5" fontWeight="bold" textAlign={'center'}>Add New Herd</Typography>
      </Stack>

      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #e0e0e0' }}>
        <Box component="form" noValidate>
          <TextField
            margin="normal"
            id="name"
            label="Herd Name"
            fullWidth
            variant="outlined"
            value={herd.name}
            onChange={(e) => setHerd({ ...herd, name: e.target.value })}
            required
          />

          <TextField
            margin="normal"
            id="location"
            label="Location (e.g. Harare )"
            fullWidth
            variant="outlined"
            value={herd.location}
            onChange={(e) => setHerd({ ...herd, location: e.target.value })}
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="primary-breed-label">Primary Breed</InputLabel>
            <Select
              labelId="primary-breed-label"
              id="primary_breed"
              value={herd.primary_breed}
              label="Primary Breed"
              onChange={(e) => setHerd({ ...herd, primary_breed: e.target.value })}
            >
              {BREED_CHOICES.map((choice) => (
                <MenuItem key={choice.value} value={choice.value} sx={{ fontSize: "0.9rem" }}>
                  {choice.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="herd-type-label">Herd Type</InputLabel>
            <Select
              labelId="herd-type-label"
              id="herd_type"
              value={herd.herd_type}
              label="Herd Type"
              onChange={(e) => setHerd({ ...herd, herd_type: e.target.value })}
            >
              {HERD_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value} sx={{ fontSize: "0.9rem" }}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
            {/* SECONDARY BACK BUTTON (CANCEL) */}
            <Button
              variant="text"
              onClick={() => history.goBack()}
              sx={{ textTransform: "none", fontWeight: "bold", color: "text.secondary" }}
            >
              Cancel
            </Button>
            
            <Button
              variant="contained"
              size="large"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                px: 4,
                borderRadius: '8px'
              }}
              onClick={handleSubmit}
            >
              Create Herd
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default HerdAdd;