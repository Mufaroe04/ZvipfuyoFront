import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Stack, Button, Tabs, Tab, Paper, Chip 
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IonIcon, IonSpinner } from '@ionic/react';
import { 
  addOutline, waterOutline, statsChartOutline, calendarOutline 
} from 'ionicons/icons';
import Chart from 'react-apexcharts';
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  fetchMilkYields, 
  fetchMilkQuality, 
  fetchLactationPeriods, 
  updateLactationPeriodDryOff 
} from '../redux/store/slices/operationsSlice';

// --- Tab Panel Helper ---
interface TabPanelProps { children?: React.ReactNode; index: number; value: number; }
const CustomTabPanel = ({ children, value, index }: TabPanelProps) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);

const DairyDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  const { milkYields, milkQuality, lactations, loading } = useAppSelector((state) => state.operations);

  useEffect(() => {
    dispatch(fetchMilkYields());
    dispatch(fetchMilkQuality());
    dispatch(fetchLactationPeriods());
  }, [dispatch]);

  // --- Handlers ---
  const handleDryOff = (id: number) => {
    if (window.confirm("Are you sure you want to mark this animal as Dry?")) {
      dispatch(updateLactationPeriodDryOff({ id }));
    }
  };

  // --- Chart Configuration (Shared Logic) ---
  const getChartOptions = (yAxisLabel: string, color: string): any => ({
    chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
    colors: [color],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { type: 'datetime', labels: { style: { fontSize: '10px' } } },
    yaxis: { title: { text: yAxisLabel } },
    tooltip: { x: { format: 'dd MMM yyyy' } }
  });

  // --- Data Preparation ---
  const yieldSeries = [{ 
    name: 'Liters', 
    data: milkYields.map(y => ({ x: new Date(y.date).getTime(), y: y.amount_liters })) 
  }];

//   const qualitySeries = [{ 
//     name: 'Fat %', 
//     data: milkQuality.map(q => ({ x: new Date(q.date).getTime(), y: q.fat_percentage })) 
//   }];
const qualitySeries = [
  { 
    name: 'Fat %', 
    data: milkQuality.map(q => ({ x: new Date(q.date).getTime(), y: q.fat_percentage })) 
  },
  { 
    name: 'Protein %', 
    data: milkQuality.map(q => ({ x: new Date(q.date).getTime(), y: q.protein_percentage })) 
  }
];
  const lactationSeries = [{
    name: 'Days in Milk',
    data: lactations.map(l => {
      const start = new Date(l.start_date).getTime();
      const end = l.end_date ? new Date(l.end_date).getTime() : new Date().getTime();
      const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
      return { x: new Date(l.start_date).getTime(), y: days };
    })
  }];

  const lactationOptions = {
    ...getChartOptions('Days in Milk', '#77757d'),
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '40%' } }
  };

  // --- Column Definitions ---
  const yieldColumns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'animal_tag', headerName: 'Animal', flex: 1 },
    { 
      field: 'session', 
      headerName: 'Session', 
      width: 120, 
      renderCell: (p) => <Chip label={p.value} size="small" color="primary" variant="outlined" /> 
    },
    { field: 'amount_liters', headerName: 'Liters (L)', type: 'number', width: 110 },
  ];

  const qualityColumns: GridColDef[] = [
    { field: 'date', headerName: 'Test Date', width: 130 },
    { field: 'animal_tag', headerName: 'Animal', flex: 1 ,
        renderCell:(params)=>(
            < >{params.value}</>
        )
    },
    { field: 'fat_percentage', headerName: 'Fat %', width: 100 },
    { field: 'protein_percentage', headerName: 'Protein %', width: 100 },
    { field: 'somatic_cell_count', headerName: 'SCC', width: 100 },
  ];

  const lactationColumns: GridColDef[] = [
    { field: 'animal_tag', headerName: 'Animal', flex: 1 },
    { field: 'start_date', headerName: 'Start', width: 120 },
    { 
      field: 'end_date', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        params.value ? 
        // <Chip label={`Dry: ${params.value}`} size="small" variant="outlined" /> : 
        // <Chip label="Milking" color="success" size="small" sx={{ fontWeight: 'bold' }} />
        <p>Dry</p>:<p>Milking</p>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      renderCell: (params) => (
        !params.row.end_date && (
          <Button 
            variant="outlined" 
            // color="secondary" 
            size="small"
            sx={{ textTransform: 'none', fontSize: '0.7rem', borderRadius: '6px' }}
            onClick={() => handleDryOff(params.row.id)}
          >
            Mark Dry
          </Button>
        )
      )
    }
  ];

  if (loading && milkYields.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <IonSpinner name="crescent" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section */}


      {/* Tabs Navigation */}
      <Paper sx={{ borderRadius: '12px', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Tabs 
          value={tabValue} 
          onChange={(_, val) => setTabValue(val)} 
          sx={{ px: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 'bold', minHeight: 64 } }}
        >
          <Tab icon={<IonIcon icon={waterOutline} style={{ marginRight: 8 }} />} iconPosition="start" label="Milk Yield" />
          <Tab icon={<IonIcon icon={statsChartOutline} style={{ marginRight: 8 }} />} iconPosition="start" label="Milk Quality" />
          <Tab icon={<IonIcon icon={calendarOutline} style={{ marginRight: 8 }} />} iconPosition="start" label="Lactation" />
        </Tabs>
      </Paper>

      {/* Panels */}
      <CustomTabPanel value={tabValue} index={0}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          {/* <Typography variant="h4" fontWeight="bold">Dairy Operations</Typography> */}
          <Typography variant="body2" color="text.secondary" fontWeight="bold">Manage Milk Yields</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<IonIcon icon={addOutline} />}
          onClick={() => history.push("/dairy/milk-yield/add")}
          sx={{ borderRadius: '10px', px: 4, textTransform: 'none', fontWeight: 'bold' }}
        >
          New Milk Yield
        </Button>
      </Stack>
        <DairyTabContent 
          title="Yield Trends" 
          series={yieldSeries} 
          options={getChartOptions('Liters', '#3880ff')} 
          rows={milkYields} 
          columns={yieldColumns} 
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          {/* <Typography variant="h4" fontWeight="bold">Dairy Operations</Typography> */}
          <Typography variant="body2" color="text.secondary" fontWeight="bold">Manage Milk Quality Audits</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<IonIcon icon={addOutline} />}
          onClick={() => history.push("/dairy/milk-quality/add")}
          sx={{ borderRadius: '10px', px: 4, textTransform: 'none', fontWeight: 'bold' }}
        >
          New Quality Audits
        </Button>
      </Stack>
        <DairyTabContent 
            title="Quality Analysis (Fat vs Protein)" 
            series={qualitySeries} 
            options={{
            ...getChartOptions('Percentage', '#2dd36f'), // Fat color (Green)
            colors: ['#2dd36f', '#3880ff'],              // Fat (Green) and Protein (Blue)
            stroke: { curve: 'smooth', width: [3, 3] },  // Ensure both lines are smooth
            }} 
            rows={milkQuality} 
            columns={qualityColumns} 
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          {/* <Typography variant="h4" fontWeight="bold">Dairy Operations</Typography> */}
          <Typography variant="body2" color="text.secondary" fontWeight="bold">Manage Milk Lactation Cycles</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<IonIcon icon={addOutline} />}
          onClick={() => history.push("/dairy/milk-lactation/add")}
          sx={{ borderRadius: '10px', px: 4, textTransform: 'none', fontWeight: 'bold' }}
        >
          New Lactation Cycles
        </Button>
      </Stack>
        <DairyTabContent 
          title="Lactation Persistence (Days)" 
          series={lactationSeries} 
          options={lactationOptions} 
          rows={lactations} 
          columns={lactationColumns} 
          chartType="bar"
        />
      </CustomTabPanel>
    </Box>
  );
};

// --- Helper Component ---
const DairyTabContent = ({ title, series, options, rows, columns, chartType = "area" }: any) => (
  <Stack spacing={8}>
    <Paper sx={{ p: 2, height: 350, borderRadius: '16px', border: '1px solid #f0f0f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', pl: 1 }}>{title}</Typography>
      <Chart options={options} series={series} type={chartType} height="100%" />
    </Paper>

    <Box sx={{ 
      height: 500, 
      bgcolor: 'white', 
      borderRadius: '16px', 
      border: '1px solid #f0f0f0', 
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <DataGrid 
        rows={rows} 
        columns={columns} 
        pageSizeOptions={[10, 25]} 
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableRowSelectionOnClick 
        sx={{ border: 0, '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' } }}
      />
    </Box>
  </Stack>
);

export default DairyDashboard;