import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks'; // Path to your new hooks
import { useHistory } from "react-router-dom"; // For navigation
import { Button } from '@mui/material';
import { fetchAllAnimals } from '../redux/store/slices/livestockSlice';
    
    const MyAnimalsList: React.FC = () => {
      const dispatch = useAppDispatch();
      const { animals, loading, getAnimalsError } = useAppSelector((state) => state.livestock);
      const history = useHistory();
    
      useEffect(() => {
        dispatch(fetchAllAnimals());
      }, [dispatch]);
    
      if (loading) return <div>Loading </div>;
      if (getAnimalsError) return <div>Error: {getAnimalsError}</div>;
    
      return (
        <div className="dashboard-container">
          {/* Example: Top Stat Card */}
           <Button
          variant="contained"
          sx={{
            mb: 2,
            // backgroundColor: oklchColor,
            // color: "white",
            // "&:hover": { backgroundColor: oklchColor },
            textTransform: "none",
            fontWeight: "bold",
          }}
          onClick={() => history.replace("/herdsadd")}
        >
          New Herd
        </Button>
          <div className="stat-card">
            <h3>Total Cattle</h3>
            <p>{animals?.length}</p>
          </div>
    
          {/* Example: Inventory Alert */}
          {animals?.length ? (
            <table  >
              <thead><th>Name</th><th>Location</th><th>Total Cattle</th><th>Cows</th><th>Bulls</th><th>Calves</th></thead>
              {/* {herds.low_stock_items.map(item => (
                <p key={item.id}>{item.name}: {item.quantity_on_hand} {item.unit} left</p>
              ))} */}
            </table>
          ) : null}
        </div>
      );
    };
    
export default MyAnimalsList;
    
   