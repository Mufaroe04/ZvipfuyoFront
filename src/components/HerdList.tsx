
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useHistory } from "react-router-dom";
import { 
  Button, Box, Typography,  Stack, TextField, InputAdornment 
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { fetchAllHerds } from '../redux/store/slices/livestockSlice';
import { IonSpinner, IonIcon } from '@ionic/react';
import { addOutline, searchOutline } from 'ionicons/icons';

const HerdList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { herds, loading } = useAppSelector((state) => state.livestock);
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchAllHerds());
  }, [dispatch]);

  const filteredHerds = (herds || []).filter((herd) =>
    herd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    herd.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    { 
      field: 'name', 
      headerName: 'Herd Name', 
      flex: 1, 
      minWidth: 150,
      renderCell: (params) => <p >{params.value}</p> 
    },
    { field: 'location', headerName: 'Location', width: 130 },
    
    // --- RESTORED COUNT COLUMNS ---
    { field: 'total_cattle', headerName: 'Total', type: 'number', width: 80, align: 'center' },
    { field: 'cows_count', headerName: 'Cows', type: 'number', width: 70, align: 'center' },
    { field: 'bulls_count', headerName: 'Bulls', type: 'number', width: 70, align: 'center' },
    { field: 'calves_count', headerName: 'Calves', type: 'number', width: 70, align: 'center' },
    { 
      field: 'pregnant_count', 
      headerName: 'Preg', 
      type: 'number', 
      width: 70, 
      align: 'center',
    },
    { 
      field: 'sick_count', 
      headerName: 'Sick', 
      type: 'number', 
      width: 80, 
      align: 'center',

    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 90,
      renderCell: (params) => (
        // <Button 
        //   variant="outlined" 
        //   size="small" 
        //   color="#18774c"
        //   sx={{ textTransform: 'none', borderRadius: '6px' ,color:"#18774c" ,fontFamily:"Plus Jakarta Sans"}}
        //   onClick={() => history.push(`/herds/${params.id}`)}
        // >
        //   View
        // </Button>
        <Button 
        variant="outlined" 
        size="small" 
        onClick={() => history.push(`/herds/${params.id}`)}
        sx={{ 
          textTransform: 'none', 
          borderRadius: '6px', 
          // This sets the text and the icon color
          color: "#18774c", 
          // This sets the border color specifically
          borderColor: "#18774c", 
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 600,
          '&:hover': {
            // Maintains the color and adds a light background on hover
            borderColor: "#18774c",
            backgroundColor: 'rgba(24, 119, 76, 0.04)', 
          }
        }}
      >
        View
      </Button>
      ),
    },
  ];

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="400px">
      <IonSpinner name="crescent" color="primary" />
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Top Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">Select a herd to manage its digital kraal</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<IonIcon icon={addOutline} />}
          onClick={() => history.push("/herdsadd")}
          sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold', px: 3 ,backgroundColor:"#18774c",}}
        >
          New Herd
        </Button>
      </Stack>

      {/* Global Search */}
      <TextField
        fullWidth
        placeholder="Search herds by name or location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, bgcolor: 'white' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IonIcon icon={searchOutline} style={{ color: '#666' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* DataGrid Container */}
      <Box sx={{ 
        height: 650, 
        width: '100%', 
        bgcolor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        border: '1px solid #f0f0f0'
      }}>
        <DataGrid
          rows={filteredHerds}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
          sx={{ 
            border: 0,
            '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' }
          }}
        />
      </Box>
    </Box>
  );
};

export default HerdList;