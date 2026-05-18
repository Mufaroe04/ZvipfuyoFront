// import React from 'react';
// import { Box, Paper, Typography, Stack, Button } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import DairyChart from './DairyChart';
// import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';
// import { IonIcon } from '@ionic/react';
// import { addOutline } from 'ionicons/icons';

// interface Props {
//   title: string;
//   series: any[];
//   type?: "area" | "bar";
//   colors: string[];
//   yLabel: string;
//   rows: any[];
//   columns: any[];
//   actionLabel: string;
//   onAction: () => void;
// }

// const DairyTabContent: React.FC<Props> = ({ 
//   title, series, type = "area", colors, yLabel, rows, columns, actionLabel, onAction ,
// }) => (
//   <Stack spacing={3}>
//     <Paper sx={{ p: 1, borderRadius: '4px', }}>
//       <Typography variant="h6" fontWeight="bold" mb={2}>{title}</Typography>
//       <DairyChart series={series} type={type} colors={colors} yLabel={yLabel} />
//     </Paper>
//     <Box>
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6" fontWeight="bold">Historical Records</Typography>
//         <Button
//          variant="contained"
//          size="small"
//          startIcon={<IonIcon icon={addOutline} />}
//          onClick={onAction} sx={{ textTransform: 'none' }}>
//           {actionLabel}
//         </Button>
//       </Stack>
//         <CustomDataGrid rows={rows} columns={columns} getRowId={(r) => r.id} autoHeight/>
//     </Box>
//   </Stack>
// );

// export default DairyTabContent;

// import React from 'react';
// import { Box, Paper, Typography, Stack, Button } from '@mui/material';
// import DairyChart from './DairyChart';
// import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';
// import { IonIcon } from '@ionic/react';
// import { addOutline } from 'ionicons/icons';

// interface Props {
//   title: string;
//   series: any[];
//   type?: "area" | "bar";
//   colors: string[];
//   yLabel: string;
//   rows: any[];
//   columns: any[];
//   actionLabel: string;
//   onAction: () => void;
//   // --- Pass properties down ---
//   selectedBreed: string;
//   setSelectedBreed: (breed: string) => void;
// }

// const DairyTabContent: React.FC<Props> = ({ 
//   title, series, type = "area", colors, yLabel, rows, columns, actionLabel, onAction,
//   selectedBreed, setSelectedBreed
// }) => (
//   <Stack spacing={3}>
//     <Paper sx={{ p: 1, borderRadius: '4px' }}>
//       <Typography variant="h6" fontWeight="bold" mb={2}>{title}</Typography>
//       <DairyChart 
//         series={series} 
//         type={type} 
//         colors={colors} 
//         yLabel={yLabel} 
//         selectedBreed={selectedBreed}
//         setSelectedBreed={setSelectedBreed}
//       />
//     </Paper>
//     <Box>
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6" fontWeight="bold">Historical Records</Typography>
//         <Button
//           variant="contained"
//           size="small"
//           startIcon={<IonIcon icon={addOutline} />}
//           onClick={onAction} 
//           sx={{ textTransform: 'none' }}
//         >
//           {actionLabel}
//         </Button>
//       </Stack>
//       <CustomDataGrid rows={rows} columns={columns} getRowId={(r) => r.id} autoHeight/>
//     </Box>
//   </Stack>
// );

// export default DairyTabContent;

import React from 'react';
import { Box, Paper, Typography, Stack, Button } from '@mui/material';
import DairyChart from './DairyChart';
import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';
import { IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

interface Props {
  title: string;
  series: any[];
  type?: "area" | "bar";
  colors: string[];
  yLabel: string;
  rows: any[];
  columns: any[];
  actionLabel: string;
  onAction: () => void;
  selectedBreed: string;
  setSelectedBreed: (breed: string) => void;
  // --- NEW SERVER-SIDE PAGINATION CONTRACTS ---
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
  rowCount: number;
}

const DairyTabContent: React.FC<Props> = ({ 
  title, series, type = "area", colors, yLabel, rows, columns, actionLabel, onAction,
  selectedBreed, setSelectedBreed,
  paginationModel, onPaginationModelChange, rowCount
}) => (
  <Stack spacing={3}>
    <Paper sx={{ p: 1, borderRadius: '4px' }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>{title}</Typography>
      <DairyChart 
        series={series} 
        type={type} 
        colors={colors} 
        yLabel={yLabel} 
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
      />
    </Paper>
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">Historical Records</Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<IonIcon icon={addOutline} />}
          onClick={onAction} 
          sx={{ textTransform: 'none' }}
        >
          {actionLabel}
        </Button>
      </Stack>
      {/* 
        The properties are spread after our internal declarations within CustomDataGrid.
        Explicitly passing these overrides the baseline model frames cleanly.
      */}
      <CustomDataGrid 
        rows={rows} 
        columns={columns} 
        getRowId={(r) => r.id} 
        autoHeight
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        rowCount={rowCount}
        paginationMode="server"
      />
    </Box>
  </Stack>
);

export default DairyTabContent;