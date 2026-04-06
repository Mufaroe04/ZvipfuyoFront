

// import React from 'react';
// import Chart from 'react-apexcharts';
// import { ApexOptions } from 'apexcharts';

// interface WeightEntry {
//   date: string;
//   weight_kg: number | string;
// }

// interface ChartProps {
//   records: WeightEntry[];
//   birthWeight?: number | string | null;
//   birthDate?: string;
// }

// const WeightGrowthChart: React.FC<ChartProps> = ({ records, birthWeight, birthDate }) => {
//   // 1. Combine and sort records (Fixes ESLint 'prefer-const' by using a new constant)
//   const allRecords = [...records];
  
//   if (birthWeight && birthDate && !records.some(r => r.date === birthDate)) {
//     allRecords.push({ date: birthDate, weight_kg: birthWeight });
//   }

//   const sortedRecords = allRecords.sort((a, b) => 
//     new Date(a.date).getTime() - new Date(b.date).getTime()
//   );

//   const series = [{
//     name: 'Weight',
//     data: sortedRecords.map(r => ({
//       x: new Date(r.date).getTime(),
//       y: parseFloat(r.weight_kg as string)
//     }))
//   }];

//   const options: ApexOptions = {
//     chart: {
//       type: 'area',
//       toolbar: { show: false },
//       fontFamily: 'inherit',
//       // Fixed: 'easing' belongs inside 'dynamicAnimation' or 'animateGradually' 
//       // in newer versions, or simply omitted for default smooth transitions.
//       animations: { 
//         enabled: true, 
//         speed: 800,
//         dynamicAnimation: {
//           enabled: true,
//           speed: 350
//         }
//       }
//     },
//     stroke: { curve: 'smooth', width: 3, colors: ['#3880ff'] },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         shadeIntensity: 1,
//         opacityFrom: 0.4,
//         opacityTo: 0.05,
//       }
//     },
//     markers: { 
//       size: 4, 
//       colors: ['#3880ff'], 
//       strokeWidth: 2, 
//       hover: { size: 6 } 
//     },
//     xaxis: {
//       type: 'datetime',
//       labels: { 
//         datetimeUTC: false, 
//         style: { fontSize: '10px' },
//         format: 'dd MMM' // Shows date/month on x-axis
//       },
//       title: {
//         text: 'Timeline',
//         style: { fontSize: '12px', fontWeight: 600 }
//       }
//     },
//     yaxis: {
//       labels: { 
//         formatter: (val) => `${Math.round(val)} kg` 
//       },
//       title: {
//         text: 'Weight (kg)',
//         style: { fontSize: '12px', fontWeight: 600 }
//       }
//     },
//     tooltip: { 
//       theme: 'light',
//       x: { format: 'dd MMM yyyy' },
//       y: { formatter: (val) => `${val} kg` }
//     }
//   };

//   return <Chart options={options} series={series} type="area" height="100%" />;
// };

// export default WeightGrowthChart;
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface WeightEntry {
  date: string;
  weight_kg: number | string;
}

interface ChartProps {
  records: WeightEntry[];
  birthWeight?: number | string | null;
  birthDate?: string;
  targetADG?: number; // Average Daily Gain in kg (default 0.8)
}

const WeightGrowthChart: React.FC<ChartProps> = ({ 
  records, 
  birthWeight, 
  birthDate, 
  targetADG = 0.8 
}) => {
  // 1. Prepare Actual Data
  const actualData = [...records];
  if (birthWeight && birthDate && !records.some(r => r.date === birthDate)) {
    actualData.push({ date: birthDate, weight_kg: birthWeight });
  }

  const sortedActual = actualData.sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // 2. Generate Projection Data (Target Line)
  const projectionData: { x: number; y: number }[] = [];
  if (birthWeight && birthDate) {
    const startWeight = parseFloat(birthWeight as string);
    const startDate = new Date(birthDate).getTime();
    const lastDate = sortedActual.length > 0 
      ? new Date(sortedActual[sortedActual.length - 1].date).getTime() 
      : Date.now();

    // Create a point for Day 0 and a point for Today based on target ADG
    projectionData.push({ x: startDate, y: startWeight });
    
    const daysPassed = (lastDate - startDate) / (1000 * 60 * 60 * 24);
    const projectedWeight = startWeight + (daysPassed * targetADG);
    
    projectionData.push({ x: lastDate, y: parseFloat(projectedWeight.toFixed(2)) });
  }

  const series = [
    {
      name: 'Actual Weight',
      type: 'area',
      data: sortedActual.map(r => ({
        x: new Date(r.date).getTime(),
        y: parseFloat(r.weight_kg as string)
      }))
    },
    {
      name: 'Target Growth',
      type: 'line',
      data: projectionData
    }
  ];

  const options: ApexOptions = {
    chart: {
      type: 'line', // Mixed chart
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    stroke: { 
      curve: 'smooth', 
      width: [3, 2], 
      dashArray: [0, 8] // Solid for actual, Dashed for target
    },
    colors: ['#3880ff', '#8c8c8c'],
    fill: {
      type: ['gradient', 'solid'],
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.05,
      }
    },
    markers: { size: [4, 0] },
    xaxis: {
      type: 'datetime',
      labels: { datetimeUTC: false, style: { fontSize: '10px' } }
    },
    yaxis: {
      title: { text: 'Weight (kg)', style: { fontWeight: 600 } },
      labels: { formatter: (val) => `${Math.round(val)}kg` }
    },
    legend: { position: 'top', horizontalAlign: 'right' },
    tooltip: { 
      shared: true,
      intersect: false,
      x: { format: 'dd MMM yyyy' }
    }
  };

  return <Chart options={options} series={series} type="line" height="100%" />;
};

export default WeightGrowthChart;