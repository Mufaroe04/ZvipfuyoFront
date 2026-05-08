import React from 'react';
import { Paper, Stack, Box, Typography, Divider } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { gitBranchOutline } from 'ionicons/icons';

interface LineageCardProps {
  animal: {
    father_tag?: string | null;
    mother_tag?: string | null;
  };
}

export const LineageCard: React.FC<LineageCardProps> = ({ animal }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 1, 
        mb: 1, 
        bgcolor: '#ffffff', 
        borderRadius: '4px', 
        border: '1px dotted #ccc' 
      }}
    >
      <Stack 
        direction="row" 
        spacing={4} 
        alignItems="center" 
        divider={<Divider orientation="vertical" flexItem />}
      >
        {/* Section Label */}
        <Stack direction="row" spacing={1} alignItems="center">
          <IonIcon icon={gitBranchOutline} style={{ color: '#666' }} />
          <Typography 
            variant="subtitle2" 
            fontWeight="bold" 
          >
            LINEAGE:
          </Typography>
        </Stack>
        
        {/* Sire Info */}
        <Box>
          <Typography variant="body2" color="text.secondary" display="block">
            FATHER (SIRE)
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {animal.father_tag ? `Tag: ${animal.father_tag}` : 'Unknown'}
          </Typography>
        </Box>

        {/* Dam Info */}
        <Box>
          <Typography variant="body2" color="text.secondary" display="block">
            MOTHER (DAM)
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {animal.mother_tag ? `Tag: ${animal.mother_tag}` : 'Unknown'}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};