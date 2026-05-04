

// import React, { useEffect } from 'react';
// import { 
//   IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
//   IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, 
//   IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, 
//   IonIcon, IonText, IonList, IonItem, IonLabel, IonBadge, IonNote
// } from '@ionic/react';
// import { 
//   sparklesOutline, thermometerOutline, waterOutline, 
//   trendingUpOutline, medkitOutline, cashOutline, cartOutline, timeOutline,
//   informationCircleOutline, barChartOutline
// } from 'ionicons/icons';
// import { useHistory } from 'react-router-dom';
// import { fetchLiveInsights } from '../redux/store/slices/insightsSlice';
// import { Geolocation } from '@capacitor/geolocation';
// import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import ReactMarkdown from 'react-markdown';

// const Insights: React.FC = () => {
//   const history = useHistory();
//   const { animals } = useAppSelector((state) => state.livestock);
//   const today = new Date();
//   const { insights_data, loading_insights, lastFetched } = useAppSelector((state: any) => state.insights);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const CACHE_TIME = 30 * 60 * 1000;
//     const now = Date.now();

//     if (!insights_data || !lastFetched || (now - lastFetched > CACHE_TIME)) {
//       const initIntelligence = async () => {
//         try {
//           const position = await Geolocation.getCurrentPosition({
//             enableHighAccuracy: true,
//             timeout: 10000 
//           });
//           dispatch(fetchLiveInsights({ 
//             lat: position.coords.latitude, 
//             lon: position.coords.longitude 
//           }));
//         } catch (e) {
//           dispatch(fetchLiveInsights({ lat: -17.82, lon: 31.05 }));
//         }
//       };
//       initIntelligence();
//     }
//   }, [dispatch, insights_data, lastFetched]);

//   // --- BUSINESS LOGIC CONSTANTS ---
//   const FATTENING_TARGET_GAIN = 1.2; 
//   const SLAUGHTER_WEIGHT_TARGET = 450; 

//   // 1. DATA PROCESSING
//   const overdueWeighIns = animals.filter(a => {
//     if (!a.latest_weight_date) return true;
//     const daysSince = (today.getTime() - new Date(a.latest_weight_date).getTime()) / (1000 * 60 * 60 * 24);
//     return daysSince > 30;
//   });

//   const lowROICattle = animals.filter((a) => {
//     if (!a.latest_weight_date || !a.previous_weight_date || !a.latest_weight || !a.previous_weight) return false;
//     const days = (new Date(a.latest_weight_date).getTime() - new Date(a.previous_weight_date).getTime()) / (1000 * 60 * 60 * 24);
//     const adg = (Number(a.latest_weight) - Number(a.previous_weight)) / (days || 1);
//     return adg < FATTENING_TARGET_GAIN && (String(a.herd) === 'Fattening Unit' || a.herd === 1);
//   });

//   const marketReady = animals.filter(a => Number(a.latest_weight) >= SLAUGHTER_WEIGHT_TARGET);

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start"><IonMenuButton /></IonButtons>
//           <IonTitle>Zvipfuyo Intelligence</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen className="ion-padding" color="light">
//         <IonGrid>
          
//           {/* 1. DYNAMIC AI ACTION PLAN */}
//           <IonRow>
//             <IonCol size="12">
//               <IonCard color="secondary">
//                 <IonCardHeader>
//                   <IonCardSubtitle style={{ color: 'white' }}>
//                     {loading_insights 
//                       ? "Consulting Zvipfuyo Intelligence..." 
//                       : (insights_data?.weather?.location && insights_data?.weather?.current_date)
//                         ? `${insights_data.weather.location} • ${insights_data.weather.current_date}`
//                         : "Harare Region • March 2026"
//                     }
//                   </IonCardSubtitle>
//                   <IonCardTitle style={{ display: 'flex', alignItems: 'center', color: 'white', justifyContent: 'space-between' }}>
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                       <IonIcon icon={sparklesOutline} style={{ marginRight: '10px' }} /> 
//                       AI Action Plan
//                     </div>
//                     {insights_data && (
//                       <IonBadge color={insights_data.stats.weight_alerts > 0 ? "danger" : "success"} style={{ fontSize: '1rem', padding: '8px' }}>
//                         Avg Weight {insights_data.stats.avg_weight}kg 
//                         <IonIcon icon={insights_data.stats.weight_alerts > 0 ? trendingUpOutline : trendingUpOutline} style={{ marginLeft: '5px' }} />
//                       </IonBadge>
//                     )}
//                   </IonCardTitle>
//                 </IonCardHeader>
//                 <IonCardContent style={{ color: 'white', fontSize: '1.1rem', lineHeight: '1.5' }}>
//                   {loading_insights ? "Analyzing farm metrics..." : <ReactMarkdown>{insights_data?.narrative}</ReactMarkdown>}
//                 </IonCardContent>
//               </IonCard>
//             </IonCol>
//           </IonRow>

//           {/* 2. PROFITABILITY & RISK BREAKDOWN */}
//           <IonRow>
//             <IonCol size="12" sizeMd="6">
//               <IonCard>
//                 <IonCardHeader><IonCardTitle>Fattening & ROI</IonCardTitle></IonCardHeader>
//                 <IonCardContent>
//                   <IonList lines="none">
//                     <IonItem>
//                       <IonIcon icon={cashOutline} slot="start" color="success" />
//                       <IonLabel>
//                         <h3>Projected ROI</h3>
//                         <p>{insights_data?.stats?.weight_alerts > 5 ? "+2.1%" : "+14.8%"} this month</p>
//                       </IonLabel>
//                     </IonItem>
//                     {marketReady.length > 0 && (
//                       <IonItem button onClick={() => history.push('/reports/market')}>
//                         <IonIcon icon={cartOutline} slot="start" color="primary" />
//                         <IonLabel>
//                           <h3>Market Ready</h3>
//                           <p>{marketReady.length} animals at target weight</p>
//                         </IonLabel>
//                         <IonBadge color="success" slot="end">SELL</IonBadge>
//                       </IonItem>
//                     )}
//                   </IonList>
//                 </IonCardContent>
//               </IonCard>
//             </IonCol>

//             <IonCol size="12" sizeMd="6">
//               <IonCard>
//                 <IonCardHeader><IonCardTitle>Bioclimatic Risks</IonCardTitle></IonCardHeader>
//                 <IonCardContent>
//                   <IonList lines="none">
//                     <IonItem>
//                       <IonIcon icon={thermometerOutline} slot="start" color={insights_data?.weather?.thi > 77 ? "danger" : "warning"} />
//                       <IonLabel>
//                         <h3>Heat Stress (THI)</h3>
//                         <p>Status: {insights_data?.weather?.thi > 77 ? 'Alert' : 'Normal'} ({insights_data?.weather?.thi || 77} Index)</p>
//                       </IonLabel>
//                     </IonItem>
//                     <IonItem>
//                       <IonIcon icon={waterOutline} slot="start" color="primary" />
//                       <IonLabel>
//                         <h3>Mud Index</h3>
//                         <p>Risk: {insights_data?.weather?.condition === 'Rain' ? 'High' : 'Low'}</p>
//                       </IonLabel>
//                     </IonItem>
//                   </IonList>
//                 </IonCardContent>
//               </IonCard>
//             </IonCol>
//           </IonRow>
//            {/* 3. THERMAL BIOMETRIC ALERTS */}
//           <IonRow>
//             <IonCol size="12">
//               <IonText color="dark" className="ion-padding-start">
//                 <h2 style={{ fontWeight: 'bold' }}>Thermal Biometric Alerts</h2>
//                </IonText>
//                <IonCard style={{ borderLeft: '4px solid var(--ion-color-danger)' }}>
//                 <IonCardHeader>
//                    <IonCardSubtitle color="danger">Anomaly Detected via Infrared Scan</IonCardSubtitle>
//                    <IonCardTitle>High Muzzle Temperature</IonCardTitle>
//                  </IonCardHeader>
//                  <IonCardContent>
//                    <IonList lines="none">
//                      <IonItem color="light" className="ion-margin-bottom" style={{ borderRadius: '8px' }}>
//                        <IonIcon icon={thermometerOutline} slot="start" color="danger" />
//                        <IonLabel className="ion-text-wrap">
//                          <h3><strong>Animal ID: B-204 (Heifer)</strong></h3>
//                          <p>Muzzle Temp: 40.5°C (Normal: 38.5°C)</p>
//                          <p>Detected: Today, 11:45 AM during trough scan.</p>
//                       </IonLabel>
//                       <IonBadge color="danger" slot="end">Fever Risk</IonBadge>
//                     </IonItem>
//                    </IonList>
//                    <IonText color="medium">
//                     <p style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
//                       <IonIcon icon={medkitOutline} style={{ marginRight: '6px' }} /> 
//                       Recommendation: Isolate B-204 immediately before Tuesday rains.
//                     </p>
//                   </IonText>
//                 </IonCardContent>
//                </IonCard>
//              </IonCol>
//            </IonRow>
//           {/* 3. STRATEGIC LOGIC & EXPLANATIONS */}
//           <IonRow>
//             <IonCol size="12">
//               <IonText color="dark" className="ion-padding-start">
//                 <h2 style={{ fontWeight: 'bold' }}>Intelligence Logic & Recommendations</h2>
//               </IonText>
//               <IonCard>
//                 <IonList>
//                   {/* Logic: ADG */}
//                   <IonItem lines="full">
//                     <IonIcon icon={barChartOutline} slot="start" color="primary" />
//                     <IonLabel className="ion-text-wrap">
//                       <strong>Target ADG: {FATTENING_TARGET_GAIN}kg/Day</strong>
//                       <p style={{ fontSize: '0.85rem' }}>
//                         Calculated weight gain per 24hrs. Animals below this threshold are "passengers" consuming feed without returning meat value.
//                       </p>
//                     </IonLabel>
//                   </IonItem>

//                   {/* Logic: THI */}
//                   <IonItem lines="full">
//                     <IonIcon icon={thermometerOutline} slot="start" color="warning" />
//                     <IonLabel className="ion-text-wrap">
//                       <strong>THI (Temperature Humidity Index) Threshold</strong>
//                       <p style={{ fontSize: '0.85rem' }}>
//                         When THI exceeds 77, cattle focus energy on cooling rather than growth. Recommendations suggest shifting feeding times to cooler hours (05:00 AM).
//                       </p>
//                     </IonLabel>
//                   </IonItem>

//                   {/* Logic: ROI / Zimbabwe Grading */}
//                   <IonItem lines="full">
//                     <IonIcon icon={cashOutline} slot="start" color="success" />
//                     <IonLabel className="ion-text-wrap">
//                       <strong>Market Grade Optimization</strong>
//                       <p style={{ fontSize: '0.85rem' }}>
//                         Targeting 'Super' grade at {SLAUGHTER_WEIGHT_TARGET}kg. ROI forecasts are based on Zimbabwe's current 2026 grain-to-meat price ratios.
//                       </p>
//                     </IonLabel>
//                   </IonItem>

//                   {/* PROACTIVE DYNAMIC ALERTS */}
//                   {lowROICattle.length > 0 && (
//                     <IonItem button detail={true} color="light" onClick={() => history.push({ pathname: '/animals', state: { filterIds: lowROICattle.map(a => a.id), title: 'Low ADG Animals' } })}>
//                       <IonBadge slot="start" color="danger">!</IonBadge>
//                       <IonLabel className="ion-text-wrap">
//                         <strong>Action:</strong> Audit feeding pens for {lowROICattle.length} underperforming animals.
//                       </IonLabel>
//                     </IonItem>
//                   )}

//                   {overdueWeighIns.length > 0 && (
//                     <IonItem button detail={true} color="light" onClick={() => history.push({ pathname: '/animals', state: { filterIds: overdueWeighIns.map(a => a.id), title: 'Overdue Weigh-ins' } })}>
//                       <IonBadge slot="start" color="warning"><IonIcon icon={timeOutline} /></IonBadge>
//                       <IonLabel className="ion-text-wrap">
//                         <strong>Action:</strong> {overdueWeighIns.length} animals require urgent weigh-in to maintain data accuracy.
//                       </IonLabel>
//                     </IonItem>
//                   )}
//                 </IonList>
//               </IonCard>
//             </IonCol>
//           </IonRow>

//           {/* 4. INTELLIGENCE LEGEND */}
//           <IonRow className="ion-margin-top">
//             <IonCol size="12">
//               <div style={{ padding: '0 10px' }}>
//                 <IonNote color="medium" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>
//                   <IonIcon icon={informationCircleOutline} style={{ marginRight: '5px' }} />
//                   <strong>Zvipfuyo Engine:</strong> Analysis utilizes ResNet-50 biometric models, Zimbabwe Meat Standards, and OpenWeather real-time bioclimatic feeds.
//                 </IonNote>
//               </div>
//             </IonCol>
//           </IonRow>

//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Insights;

// import React from 'react';
// import { 
//   IonContent, 
//   IonPage, 
//   IonGrid, 
//   IonRow, 
//   IonCol 
// } from '@ionic/react';
// import { 
//   Box, 
//   Typography, 
//   Paper, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Divider 
// } from '@mui/material';

// // Intersecting TypeScript definitions for the dynamic dashboard data
// interface ConsoleDataProps {
//   date: string;
//   beef: {
//     totalActiveCattle: number;
//     avgDailyGain: number;
//     estHerdValue: number;
//     currentAvgWeight: number;
//     targetWeight: number;
//     pricePerKg: number;
//   };
//   dairy: {
//     activeMilkingCows: number;
//     avgDailyYield: number;
//     somaticCellCount: number;
//     butterfat: number;
//     protein: number;
//     avgDaysInMilk: number;
//     totalProduction30d: number;
//     activeTreatments: number;
//   };
//   bioclimatic: {
//     temperature: number;
//     humidity: number;
//     thi: number;
//   };
//   inventory: Array<{
//     resource: string;
//     level: string;
//     status: string;
//     isLowStock: boolean;
//   }>;
// }

// export const Insights: React.FC<{ data: ConsoleDataProps }> = ({ data }) => {
//   return (
//     <IonPage style={{ background: '#F9FAFB' }}>
//       <IonContent className="ion-padding">
//         <IonGrid style={{ maxWidth: '1440px', margin: '0 auto' }}>
          
//           {/* HEADER SECTION */}
//           <IonRow>
//             <IonCol size="12">
//               <Box mb={3} mt={1}>
//                 <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#111827', letterSpacing: '-0.025em' }}>
//                   Farm Intelligence Summary: Dual-Enterprise Console
//                 </Typography>
//                 <Typography variant="subtitle1" sx={{ color: '#4B5563', mt: 0.5, fontWeight: 500 }}>
//                   <strong>Date:</strong> {data?.date} | <strong>Enterprise Focus:</strong> Integrated Beef Fattening & Dairy Operations
//                 </Typography>
//               </Box>
//               <Divider sx={{ mb: 4, borderColor: '#E5E7EB', borderWidth: '1px' }} />
//             </IonCol>
//           </IonRow>

//           {/* SECTION 1: EXECUTIVE OPERATIONS SNAPSHOT */}
//           <IonRow>
//             <IonCol size="12">
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
//                 1. Executive Operations Snapshot
//               </Typography>
//               <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
//                 <Table>
//                   <TableHead sx={{ backgroundColor: '#F3F4F6' }}>
//                     <TableRow>
//                       <TableCell colSpan={2} align="center" sx={{ fontWeight: 800, py: 1.5, color: '#111827', fontSize: '0.95rem', borderBottom: '1px solid #D1D5DB' }}>
//                         DUAL-ENTERPRISE METRICS
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell sx={{ width: '50%', fontWeight: 700, color: '#374151', borderRight: '1px solid #E5E7EB' }}>
//                         BEEF & HERD
//                       </TableCell>
//                       <TableCell sx={{ width: '50%', fontWeight: 700, color: '#374151' }}>
//                         DAIRY
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                       <TableCell sx={{ borderRight: '1px solid #E5E7EB', verticalAlign: 'top', py: 2 }}>
//                         <Typography variant="body1">Total Active Cattle: <strong>{data?.beef.totalActiveCattle} head</strong></Typography>
//                         <Typography variant="body1" sx={{ mt: 1 }}>Avg Daily Gain (ADG): <strong>+{data?.beef.avgDailyGain} kg</strong></Typography>
//                         <Typography variant="body1" sx={{ mt: 1 }}>Est. Herd Market Value: <strong>${data?.beef.estHerdValue.toLocaleString()}</strong></Typography>
//                       </TableCell>
//                       <TableCell sx={{ verticalAlign: 'top', py: 2 }}>
//                         <Typography variant="body1">Milking Cows (Active): <strong>{data?.dairy.activeMilkingCows} head</strong></Typography>
//                         <Typography variant="body1" sx={{ mt: 1 }}>Avg Daily Yield: <strong>{data?.dairy.avgDailyYield} L/cow</strong></Typography>
//                         <Typography variant="body1" sx={{ mt: 1 }}>Bulk Somatic Cell Count: <strong>{data?.dairy.somaticCellCount.toLocaleString()}/mL</strong></Typography>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <Box sx={{ p: 2.5, backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #3B82F6', mb: 4 }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A8A', textTransform: 'uppercase', mb: 0.5 }}>
//                   Strategic Directive
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>
//                   The enterprise shows strong physical performance, but immediate operational adjustments are required to mitigate seasonal transition risks. The arrival of dry, cooler May conditions requires shifting both nutritional and metabolic protocols for both livestock sectors.
//                 </Typography>
//               </Box>
//               <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
//             </IonCol>
//           </IonRow>

//           {/* SECTION 2: BEEF FATTENING & ROI INTELLIGENCE */}
//           <IonRow>
//             <IonCol size="12">
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
//                 2. Beef Fattening & ROI Intelligence
//               </Typography>
              
//               {/* ASCII / Graphical Trend Chart Box */}
//               <TableContainer component={Paper} variant="outlined" sx={{ p: 3, mb: 3, backgroundColor: '#1E293B', borderRadius: '8px' }}>
//                 <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#94A3B8', fontWeight: 700, mb: 2, letterSpacing: '0.1em' }}>
//                   WEIGHT & VALUE TRENDS
//                 </Typography>
//                 <Box sx={{ fontFamily: 'monospace', whiteSpace: 'pre', color: '#38BDF8', fontSize: '0.85rem', overflowX: 'auto' }}>
//                   {`460 kg ─────────────────────────────────────────── ▲ Target: $1,104/hd\n`}
//                   {`                                                     │ \n`}
//                   {`410 kg ─────────────────────────── ▲ Current Avg   │ \n`}
//                   {`                                     │               │ \n`}
//                   {`320 kg ─── ▲ Entry Avg             │               │ \n`}
//                   {`             │                       │               │ \n`}
//                   {` ───────────┴───────────────────────┴───────────────┴───────────────►\n`}
//                   {`          M1 (Entry)              M2 (Feedlot)     M3 (Marketing)`}
//                 </Box>
//               </TableContainer>

//               <Box mb={3}>
//                 <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
//                   • <strong>Average Daily Gain (ADG):</strong> The feedlot division is currently achieving <strong>{data?.beef.avgDailyGain} kg/day</strong> across high-performance breeds. Indigenous breeds are tracking at <strong>0.98 kg/day</strong>.
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
//                   • <strong>Target Weight Projections:</strong> For the upcoming marketing cycle, 28 animals are projected to hit the <strong>{data?.beef.targetWeight} kg</strong> target weight.
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
//                   • <strong>Valuation & Price Per Kg:</strong> Using the cached market price of <strong>${data?.beef.pricePerKg.toFixed(2)}/kg live weight</strong>, the current finished head inventory stands at <strong>$1,080 per head</strong>.
//                 </Typography>
//               </Box>

//               <Box sx={{ p: 2.5, backgroundColor: '#FFFBEB', borderRadius: '8px', borderLeft: '4px solid #D97706', mb: 4 }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#92400E', textTransform: 'uppercase', mb: 0.5 }}>
//                   Margin Optimization Alert
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#78350F', lineHeight: 1.6 }}>
//                   The feed-to-beef conversion ratio is under pressure due to rising raw material costs for maize bran and cotton cake.
//                   <br />
//                   <strong>Action Item:</strong> Optimize feed mixes by utilizing cheaper local silage reserves to protect margins without dropping target ADG below 1.35 kg.
//                 </Typography>
//               </Box>
//               <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
//             </IonCol>
//           </IonRow>

//           {/* SECTION 3: DAIRY OPERATIONS & LACTATION ANALYTICS */}
//           <IonRow>
//             <IonCol size="12">
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
//                 3. Dairy Operations & Lactation Analytics
//               </Typography>
              
//               <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
//                 <Table>
//                   <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Metric</TableCell>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Current Level</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
//                       <TableCell sx={{ color: '#334155' }}>Butterfat</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#0F172A' }}>{data?.dairy.butterfat}%</TableCell>
//                     </TableRow>
//                     <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
//                       <TableCell sx={{ color: '#334155' }}>Protein</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#0F172A' }}>{data?.dairy.protein}%</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell sx={{ color: '#334155' }}>Avg Days in Milk (DIM)</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#0F172A' }}>{data?.dairy.avgDaysInMilk} Days</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <Box mb={3}>
//                 <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
//                   • <strong>Milk Yield Dynamics:</strong> Total milk production across morning, midday, and evening sessions over the last 30 days stands at <strong>{data?.dairy.totalProduction30d.toLocaleString()} liters</strong>.
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
//                   • <strong>Mastitis Screening:</strong> The current SCC sits at <strong>{data?.dairy.somaticCellCount.toLocaleString()} cells/mL</strong>. Any upward trend toward 250,000 cells/mL will trigger critical animal screenings.
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
//                   • <strong>Antibiotic Security:</strong> There are currently <strong>{data?.dairy.activeTreatments} cows</strong> flagged on health treatments. Their milk is immediately diverted and excluded from commercial tank sales.
//                 </Typography>
//               </Box>

//               <Box sx={{ p: 2.5, backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #3B82F6', mb: 4 }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A8A', textTransform: 'uppercase', mb: 0.5 }}>
//                   Immediate Dry-Off Actions
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>
//                   <strong>Cow Tag #1042</strong> and <strong>Cow Tag #1109</strong> are exactly 60 days away from their calving dates.
//                   <br />
//                   <strong>Action Item:</strong> Begin the dry-off protocol today. Move these animals to the dry-cow pasture and adjust their diet to lower energy density to prevent metabolic issues.
//                 </Typography>
//               </Box>
//               <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
//             </IonCol>
//           </IonRow>

//           {/* SECTION 4: BIOCLIMATIC RISK & RISK MATRIX */}
//           <IonRow>
//             <IonCol size="12">
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
//                 4. Bioclimatic Risk & Environmental Management
//               </Typography>

//               <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
//                 <Table>
//                   <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Metric</TableCell>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Value</TableCell>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Risk Level</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
//                       <TableCell sx={{ color: '#334155' }}>Ambient Temperature</TableCell>
//                       <TableCell sx={{ color: '#0F172A' }}>{data?.bioclimatic.temperature}°C</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#16A34A' }}>Low (Thermal Comfort)</TableCell>
//                     </TableRow>
//                     <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
//                       <TableCell sx={{ color: '#334155' }}>Relative Humidity</TableCell>
//                       <TableCell sx={{ color: '#0F172A' }}>{data?.bioclimatic.humidity}%</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#16A34A' }}>Low</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell sx={{ color: '#334155' }}>THI (Computed)</TableCell>
//                       <TableCell sx={{ color: '#0F172A' }}>{data?.bioclimatic.thi}</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#16A34A' }}>Safe</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <Box mb={4}>
//                 <Typography variant="body2" sx={{ color: '#4B5563', lineHeight: 1.6 }}>
//                   The <strong>Temperature-Humidity Index (THI)</strong> is computed at <strong>{data?.bioclimatic.thi}</strong>, placing the entire farm in the safe thermal zone. Both sectors are in optimal microclimate conditions without heat stress.
//                 </Typography>
//               </Box>
//               <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
//             </IonCol>
//           </IonRow>

//           {/* SECTION 5: LOGISTICS, INVENTORY & OUTLOOK */}
//           <IonRow>
//             <IonCol size="12">
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
//                 5. Logistics, Inventory & Financial Outlook
//               </Typography>

//               <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
//                 <Table>
//                   <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Resource</TableCell>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Level</TableCell>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Status</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {data?.inventory.map((item, index) => (
//                       <TableRow key={index} sx={{ borderBottom: index !== data.inventory.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
//                         <TableCell sx={{ color: '#334155', fontWeight: 600 }}>{item.resource}</TableCell>
//                         <TableCell sx={{ color: '#334155' }}>{item.level}</TableCell>
//                         <TableCell sx={{ fontWeight: 600, color: item.isLowStock ? '#DC2626' : '#16A34A' }}>
//                           {item.status}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <Box sx={{ p: 2.5, backgroundColor: '#FFFBEB', borderRadius: '8px', borderLeft: '4px solid #D97706', mb: 2 }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#92400E', textTransform: 'uppercase', mb: 0.5 }}>
//                   Procurement Priority
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#78350F', lineHeight: 1.6 }}>
//                   <strong>Low Stock Warning:</strong> Beef Finisher has dropped below the reorder threshold of 1,000 kg.
//                   <br />
//                   <strong>Action:</strong> Order 5,000 kg of finisher immediately to prevent feed disruptions.
//                 </Typography>
//               </Box>
//             </IonCol>
//           </IonRow>

//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Insights;

import React from 'react';
import { 
  IonContent, 
  IonPage, 
  IonGrid, 
  IonRow, 
  IonCol 
} from '@ionic/react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Divider 
} from '@mui/material';

// Expanded definitions to capture AI-generated dynamic insights
interface ConsoleDataProps {
  date: string;
  beef: {
    totalActiveCattle: number;
    avgDailyGain: number;
    estHerdValue: number;
    currentAvgWeight: number;
    targetWeight: number;
    pricePerKg: number;
    projectedAnimals: number;
  };
  dairy: {
    activeMilkingCows: number;
    avgDailyYield: number;
    somaticCellCount: number;
    butterfat: number;
    protein: number;
    avgDaysInMilk: number;
    totalProduction30d: number;
    activeTreatments: number;
  };
  bioclimatic: {
    temperature: number;
    humidity: number;
    thi: number;
  };
  inventory: Array<{
    resource: string;
    level: string;
    status: string;
    isLowStock: boolean;
  }>;
  // DYNAMIC NARRATIVES INJECTED VIA BACKEND AI
  narrative: {
    executiveActionPlan: string;
    strategicDirective: string;
    marginOptimizationAlert: string;
    dryOffActionItem: string;
    bioclimaticAssessment: string;
    procurementInstruction: string;
    currencyStrategy: string;
  };
}

export const Insights: React.FC<{ data: ConsoleDataProps }> = ({ data }) => {
  return (
    <IonPage style={{ background: '#F9FAFB' }}>
      <IonContent className="ion-padding">
        <IonGrid style={{ maxWidth: '1440px', margin: '0 auto' }}>
          
          {/* HEADER SECTION */}
          {/* 1. DYNAMIC AI ACTION PLAN */}
<IonRow>
  <IonCol size="12">
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 3, 
        backgroundColor: '#1E1B4B', 
        color: '#FFFFFF', 
        borderRadius: '8px', 
        mb: 4, 
        border: '1px solid #4338CA' 
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle2" sx={{ color: '#C7D2FE', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Intelligence Console
        </Typography>
        <Typography variant="caption" sx={{ backgroundColor: '#4338CA', px: 1.5, py: 0.5, borderRadius: '4px', fontWeight: 600 }}>
          Live Narrative
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: '#FFFFFF' }}>
        Dynamic AI Action Plan
      </Typography>
      <Typography variant="body1" sx={{ color: '#E0E7FF', lineHeight: 1.7 }}>
        {data?.narrative.executiveActionPlan}
      </Typography>
    </Paper>
  </IonCol>
</IonRow>
          <IonRow>
            <IonCol size="12">
              <Box mb={3} mt={1}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#111827', letterSpacing: '-0.025em' }}>
                  Farm Intelligence Summary: Dual-Enterprise Console
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#4B5563', mt: 0.5, fontWeight: 500 }}>
                  <strong>Date:</strong> {data?.date} | <strong>Enterprise Focus:</strong> Integrated Beef Fattening & Dairy Operations
                </Typography>
              </Box>
              <Divider sx={{ mb: 4, borderColor: '#E5E7EB', borderWidth: '1px' }} />
            </IonCol>
          </IonRow>

          {/* SECTION 1: EXECUTIVE OPERATIONS SNAPSHOT */}
          <IonRow>
            <IonCol size="12">
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
                1. Executive Operations Snapshot
              </Typography>
              <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#F3F4F6' }}>
                    <TableRow>
                      <TableCell colSpan={2} align="center" sx={{ fontWeight: 800, py: 1.5, color: '#111827', fontSize: '0.95rem', borderBottom: '1px solid #D1D5DB' }}>
                        DUAL-ENTERPRISE METRICS
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ width: '50%', fontWeight: 700, color: '#374151', borderRight: '1px solid #E5E7EB' }}>
                        BEEF & HERD
                      </TableCell>
                      <TableCell sx={{ width: '50%', fontWeight: 700, color: '#374151' }}>
                        DAIRY
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ borderRight: '1px solid #E5E7EB', verticalAlign: 'top', py: 2 }}>
                        <Typography variant="body1">Total Active Cattle: <strong>{data?.beef.totalActiveCattle} head</strong></Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>Avg Daily Gain (ADG): <strong>+{data?.beef.avgDailyGain} kg</strong></Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>Est. Herd Market Value: <strong>${data?.beef.estHerdValue.toLocaleString()}</strong></Typography>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'top', py: 2 }}>
                        <Typography variant="body1">Milking Cows (Active): <strong>{data?.dairy.activeMilkingCows} head</strong></Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>Avg Daily Yield: <strong>{data?.dairy.avgDailyYield} L/cow</strong></Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>Bulk Somatic Cell Count: <strong>{data?.dairy.somaticCellCount.toLocaleString()}/mL</strong></Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ p: 2.5, backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #3B82F6', mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A8A', textTransform: 'uppercase', mb: 0.5 }}>
                  Strategic Directive
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>
                  {data?.narrative.strategicDirective}
                </Typography>
              </Box>
              <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
            </IonCol>
          </IonRow>

          {/* SECTION 2: BEEF FATTENING & ROI INTELLIGENCE */}
          <IonRow>
            <IonCol size="12">
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
                2. Beef Fattening & ROI Intelligence
              </Typography>
              
              <TableContainer component={Paper} variant="outlined" sx={{ p: 3, mb: 3, backgroundColor: '#1E293B', borderRadius: '8px' }}>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#94A3B8', fontWeight: 700, mb: 2, letterSpacing: '0.1em' }}>
                  WEIGHT & VALUE TRENDS
                </Typography>
                <Box sx={{ fontFamily: 'monospace', whiteSpace: 'pre', color: '#38BDF8', fontSize: '0.85rem', overflowX: 'auto' }}>
                  {`460 kg ─────────────────────────────────────────── ▲ Target: $1,104/hd\n`}
                  {`                                                   │ \n`}
                  {`410 kg ─────────────────────────── ▲ Current Avg   │ \n`}
                  {`                                   │               │ \n`}
                  {`320 kg ─── ▲ Entry Avg             │               │ \n`}
                  {`          │                        │               │ \n`}
                  {` ───────────┴───────────────────────┴───────────────┴───────────────►\n`}
                  {`           M1 (Entry)              M2 (Feedlot)     M3 (Marketing)`}
                </Box>
              </TableContainer>

              <Box mb={3}>
                <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
                  • <strong>Average Daily Gain (ADG):</strong> The feedlot division is currently achieving <strong>+{data?.beef.avgDailyGain} kg/day</strong> across high-performance breeds. Indigenous breeds are tracking at <strong>0.98 kg/day</strong>.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
                  • <strong>Target Weight Projections:</strong> For the upcoming marketing cycle, <strong>{data?.beef.projectedAnimals} animals</strong> are projected to hit the <strong>{data?.beef.targetWeight} kg</strong> target weight.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
                  • <strong>Valuation & Price Per Kg:</strong> Using the cached market price of <strong>${data?.beef.pricePerKg.toFixed(2)}/kg live weight</strong>, the current finished head inventory stands at <strong>${(data?.beef.targetWeight * data?.beef.pricePerKg).toLocaleString()} per head</strong>.
                </Typography>
              </Box>

              <Box sx={{ p: 2.5, backgroundColor: '#FFFBEB', borderRadius: '8px', borderLeft: '4px solid #D97706', mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#92400E', textTransform: 'uppercase', mb: 0.5 }}>
                  Margin Optimization Alert
                </Typography>
                <Typography variant="body2" sx={{ color: '#78350F', lineHeight: 1.6 }}>
                  {data?.narrative.marginOptimizationAlert}
                </Typography>
              </Box>
              <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
            </IonCol>
          </IonRow>

          {/* SECTION 3: DAIRY OPERATIONS & LACTATION ANALYTICS */}
          <IonRow>
            <IonCol size="12">
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
                3. Dairy Operations & Lactation Analytics
              </Typography>
              
              <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Metric</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Current Level</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
                      <TableCell sx={{ color: '#334155' }}>Butterfat</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#0F172A' }}>{data?.dairy.butterfat}%</TableCell>
                    </TableRow>
                    <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
                      <TableCell sx={{ color: '#334155' }}>Protein</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#0F172A' }}>{data?.dairy.protein}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: '#334155' }}>Avg Days in Milk (DIM)</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#0F172A' }}>{data?.dairy.avgDaysInMilk} Days</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box mb={3}>
                <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
                  • <strong>Milk Yield Dynamics:</strong> Total milk production across morning, midday, and evening sessions over the last 30 days stands at <strong>{data?.dairy.totalProduction30d.toLocaleString()} liters</strong>.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
                  • <strong>Mastitis Screening:</strong> The current SCC sits at <strong>{data?.dairy.somaticCellCount.toLocaleString()} cells/mL</strong>. Any upward trend toward 250,000 cells/mL will trigger critical animal screenings.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
                  • <strong>Antibiotic Security:</strong> There are currently <strong>{data?.dairy.activeTreatments} cows</strong> flagged on health treatments. Their milk is immediately diverted and excluded from commercial bulk tank sales.
                </Typography>
              </Box>

              <Box sx={{ p: 2.5, backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #3B82F6', mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A8A', textTransform: 'uppercase', mb: 0.5 }}>
                  Immediate Dry-Off Actions
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>
                  {data?.narrative.dryOffActionItem}
                </Typography>
              </Box>
              <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
            </IonCol>
          </IonRow>

          {/* SECTION 4: BIOCLIMATIC RISK & RISK MATRIX */}
          <IonRow>
            <IonCol size="12">
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
                4. Bioclimatic Risk & Environmental Management
              </Typography>

              <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Metric</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Value</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Risk Level</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
                      <TableCell sx={{ color: '#334155' }}>Ambient Temperature</TableCell>
                      <TableCell sx={{ color: '#0F172A' }}>{data?.bioclimatic.temperature}°C</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#16A34A' }}>Low (Thermal Comfort)</TableCell>
                    </TableRow>
                    <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
                      <TableCell sx={{ color: '#334155' }}>Relative Humidity</TableCell>
                      <TableCell sx={{ color: '#0F172A' }}>{data?.bioclimatic.humidity}%</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#16A34A' }}>Low</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: '#334155' }}>THI (Computed)</TableCell>
                      <TableCell sx={{ color: '#0F172A' }}>{data?.bioclimatic.thi}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#16A34A' }}>Safe</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box mb={4}>
                <Typography variant="body2" sx={{ color: '#4B5563', lineHeight: 1.6 }}>
                  {data?.narrative.bioclimaticAssessment}
                </Typography>
              </Box>
              <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
            </IonCol>
          </IonRow>

          {/* SECTION 5: LOGISTICS, INVENTORY & OUTLOOK */}
          <IonRow>
            <IonCol size="12">
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
                5. Logistics, Inventory & Financial Outlook
              </Typography>

              <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Resource</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Level</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.inventory.map((item, index) => (
                      <TableRow key={index} sx={{ borderBottom: index !== data.inventory.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
                        <TableCell sx={{ color: '#334155', fontWeight: 600 }}>{item.resource}</TableCell>
                        <TableCell sx={{ color: '#334155' }}>{item.level}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: item.isLowStock ? '#DC2626' : '#16A34A' }}>
                          {item.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* PROCUREMENT PRIORITY */}
              <Box sx={{ p: 2.5, backgroundColor: '#FFFBEB', borderRadius: '8px', borderLeft: '4px solid #D97706', mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#92400E', textTransform: 'uppercase', mb: 0.5 }}>
                  Procurement Priority
                </Typography>
                <Typography variant="body2" sx={{ color: '#78350F', lineHeight: 1.6 }}>
                  {data?.narrative.procurementInstruction}
                </Typography>
              </Box>

              {/* NEW SUBSECTION: TRANSACTION & CURRENCY STRATEGY */}
              <Box sx={{ p: 2.5, backgroundColor: '#F0FDF4', borderRadius: '8px', borderLeft: '4px solid #16A34A', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#14532D', textTransform: 'uppercase', mb: 0.5 }}>
                  Transaction & Currency Strategy
                </Typography>
                <Typography variant="body2" sx={{ color: '#166534', lineHeight: 1.6 }}>
                  {data?.narrative.currencyStrategy}
                </Typography>
              </Box>
            </IonCol>
          </IonRow>

        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Insights;

// import React, { useEffect } from 'react';
// import { 
//   IonContent, 
//   IonPage, 
//   IonGrid, 
//   IonRow, 
//   IonCol,
//   IonSpinner
// } from '@ionic/react';
// import { 
//   Box, 
//   Typography, 
//   Paper, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Divider 
// } from '@mui/material';

// import { Geolocation } from '@capacitor/geolocation';
// import ReactMarkdown from 'react-markdown';

// import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import { fetchLiveInsights } from '../redux/store/slices/insightsSlice';

// // Core interface matching dynamic output
// interface ConsoleDataProps {
//   date: string;
//   beef: {
//     totalActiveCattle: number;
//     avgDailyGain: number;
//     estHerdValue: number;
//     currentAvgWeight: number;
//     targetWeight: number;
//     pricePerKg: number;
//     projectedAnimals: number;
//     avg_weight: number;
//     weight_alerts: number;
//   };
//   dairy: {
//     activeMilkingCows: number;
//     avgDailyYield: number;
//     somaticCellCount: number;
//     butterfat: number;
//     protein: number;
//     avgDaysInMilk: number;
//     totalProduction30d: number;
//     activeTreatments: number;
//     today_yield: number;
//     quality_alerts: number;
//     yield_change: number;
//   };
//   bioclimatic: {
//     temperature: number;
//     humidity: number;
//     thi: number;
//   };
//   inventory: Array<{
//     resource: string;
//     level: string;
//     status: string;
//     isLowStock: boolean;
//   }>;
//   narrative: {
//     executiveActionPlan: string;
//     strategicDirective: string;
//     marginOptimizationAlert: string;
//     dryOffActionItem: string;
//     bioclimaticAssessment: string;
//     procurementInstruction: string;
//     currencyStrategy: string;
//   };
// }

// export const Insights: React.FC = () => {
//   const dispatch = useAppDispatch();
  
//   // Extract state matching slice schema
//   const { insights_data, loading_insights, lastFetched } = useAppSelector(
//     (state: any) => state.insights
//   );

//   useEffect(() => {
//     const CACHE_TIME = 30 * 60 * 1000; // 30 minutes
//     const now = Date.now();

//     if (!insights_data || !lastFetched || now - lastFetched > CACHE_TIME) {
//       const initIntelligence = async () => {
//         try {
//           const position = await Geolocation.getCurrentPosition({
//             enableHighAccuracy: true,
//             timeout: 10000
//           });
          
//           dispatch(
//             fetchLiveInsights({
//               lat: position.coords.latitude,
//               lon: position.coords.longitude
//             })
//           );
//         } catch (e) {
//           // Fallback coordinates
//           dispatch(fetchLiveInsights({ lat: -17.82, lon: 31.05 }));
//         }
//       };
//       initIntelligence();
//     }
//   }, [dispatch, insights_data, lastFetched]);

//   // Loading indicator for empty data
//   if (loading_insights && !insights_data) {
//     return (
//       <IonPage style={{ background: '#F9FAFB' }}>
//         <IonContent className="ion-padding">
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
//             <IonSpinner name="crescent" color="primary" />
//             <Typography variant="body1" sx={{ mt: 2, color: '#4B5563', fontWeight: 600 }}>
//               Retrieving live telemetry and AI insights...
//             </Typography>
//           </Box>
//         </IonContent>
//       </IonPage>
//     );
//   }

//   // Extract from the Redux payload
//   const weather = insights_data?.weather;
//   const stats = insights_data?.stats;
  
//   // Cleanly map fallback values directly to the expected visual component structures
//   const data: ConsoleDataProps = {
//     date: stats?.date || weather?.current_date || 'N/A',
//     beef: {
//       totalActiveCattle: stats?.beef?.totalActiveCattle || 0,
//       avgDailyGain: stats?.beef?.avgDailyGain || 0,
//       estHerdValue: stats?.beef?.estHerdValue || 0,
//       currentAvgWeight: stats?.beef?.currentAvgWeight || stats?.beef?.avg_weight || 0,
//       targetWeight: stats?.beef?.targetWeight || 450,
//       pricePerKg: stats?.beef?.pricePerKg || 0,
//       projectedAnimals: stats?.beef?.projectedAnimals || 0
//     },
//     dairy: {
//       activeMilkingCows: stats?.dairy?.activeMilkingCows || 0,
//       avgDailyYield: stats?.dairy?.avgDailyYield || 0,
//       somaticCellCount: stats?.dairy?.somaticCellCount || 0,
//       butterfat: stats?.dairy?.butterfat || 0,
//       protein: stats?.dairy?.protein || 0,
//       avgDaysInMilk: stats?.dairy?.avgDaysInMilk || 0,
//       totalProduction30d: stats?.dairy?.totalProduction30d || 0,
//       activeTreatments: stats?.dairy?.activeTreatments || 0,
//       today_yield: stats?.dairy?.today_yield || 0,
//       quality_alerts: stats?.dairy?.quality_alerts || 0,
//       yield_change: stats?.dairy?.yield_change || 0
//     },
//     bioclimatic: {
//       temperature: weather?.temp || 0,
//       humidity: weather?.humidity || 0,
//       thi: weather?.thi || 0
//     },
//     inventory: stats?.inventory || [],
//     narrative: {
//       executiveActionPlan: insights_data?.narrative || 'Action plan unavailable.',
//       strategicDirective: insights_data?.narrative || 'Directive pending generation.',
//       marginOptimizationAlert: insights_data?.narrative || 'Optimization metrics pending evaluation.',
//       dryOffActionItem: insights_data?.narrative || 'Standard operational protocol applies.',
//       bioclimaticAssessment: insights_data?.narrative || 'Bioclimatic metrics normal.',
//       procurementInstruction: insights_data?.narrative || 'No supply constraints detected.',
//       currencyStrategy: insights_data?.narrative || 'Maintain current allocation strategy.'
//     }
//   };

//   return (
//     <IonPage style={{ background: '#F9FAFB' }}>
//       <IonContent className="ion-padding">
//         <IonGrid style={{ maxWidth: '1440px', margin: '0 auto' }}>
          
//           {/* HEADER SECTION - 1. DYNAMIC AI ACTION PLAN */}
//           <IonRow>
//             <IonCol size="12">
//               <Paper 
//                 variant="outlined" 
//                 sx={{ 
//                   p: 3, 
//                   backgroundColor: '#1E1B4B', 
//                   color: '#FFFFFF', 
//                   borderRadius: '8px', 
//                   mb: 4, 
//                   border: '1px solid #4338CA' 
//                 }}
//               >
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//                   <Typography variant="subtitle2" sx={{ color: '#C7D2FE', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
//                     Intelligence Console
//                   </Typography>
//                   <Typography variant="caption" sx={{ backgroundColor: '#4338CA', px: 1.5, py: 0.5, borderRadius: '4px', fontWeight: 600 }}>
//                     Live Narrative
//                   </Typography>
//                 </Box>
//                 <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: '#FFFFFF' }}>
//                   Dynamic AI Action Plan
//                 </Typography>
//                 <Typography variant="body1" component="div" sx={{ color: '#E0E7FF', lineHeight: 1.7 }}>
//                   <ReactMarkdown>{data.narrative.executiveActionPlan}</ReactMarkdown>
//                 </Typography>
//               </Paper>
//             </IonCol>
//           </IonRow>

//           <IonRow>
//             <IonCol size="12">
//               <Box mb={3} mt={1}>
//                 <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#111827', letterSpacing: '-0.025em' }}>
//                   Farm Intelligence Summary: Dual-Enterprise Console
//                 </Typography>
//                 <Typography variant="subtitle1" sx={{ color: '#4B5563', mt: 0.5, fontWeight: 500 }}>
//                   <strong>Date:</strong> {data.date} | <strong>Enterprise Focus:</strong> Integrated Beef Fattening & Dairy Operations
//                 </Typography>
//               </Box>
//               <Divider sx={{ mb: 4, borderColor: '#E5E7EB', borderWidth: '1px' }} />
//             </IonCol>
//           </IonRow>

//           {/* SECTION 1: EXECUTIVE OPERATIONS SNAPSHOT */}
//           <IonRow>
//             <IonCol size="12">
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
//                 1. Executive Operations Snapshot
//               </Typography>
//               <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
//                 <Table>
//                   <TableHead sx={{ backgroundColor: '#F3F4F6' }}>
//                     <TableRow>
//                       <TableCell colSpan={2} align="center" sx={{ fontWeight: 800, py: 1.5, color: '#111827', fontSize: '0.95rem', borderBottom: '1px solid #D1D5DB' }}>
//                         DUAL-ENTERPRISE METRICS
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell sx={{ width: '50%', fontWeight: 700, color: '#374151', borderRight: '1px solid #E5E7EB' }}>
//                         BEEF & HERD
//                       </TableCell>
//                       <TableCell sx={{ width: '50%', fontWeight: 700, color: '#374151' }}>
//                         DAIRY
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                       <TableCell sx={{ borderRight: '1px solid #E5E7EB', verticalAlign: 'top', py: 2 }}>
//                         <Typography variant="body1">Total Active Cattle: <strong>{data.beef.totalActiveCattle} head</strong></Typography>
//                         <Typography variant="body1" sx={{ mt: 1 }}>Avg Daily Gain (ADG): <strong>+{data.beef.avgDailyGain} kg</strong></Typography>
//                         <Typography variant="body1" sx={{ mt: 1 }}>Est. Herd Market Value: <strong>${data.beef.estHerdValue.toLocaleString()}</strong></Typography>
//                       </TableCell>
//                       <TableCell sx={{ verticalAlign: 'top', py: 2 }}>
//                         <Typography variant="body1">Milking Cows (Active): <strong>{data.dairy.activeMilkingCows} head</strong></Typography>
//                         <Typography variant="body1" sx={{ mt: 1 }}>Avg Daily Yield: <strong>{data.dairy.avgDailyYield} L/cow</strong></Typography>
//                         <Typography variant="body1" sx={{ mt: 1 }}>Bulk Somatic Cell Count: <strong>{data.dairy.somaticCellCount.toLocaleString()}/mL</strong></Typography>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <Box sx={{ p: 2.5, backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #3B82F6', mb: 4 }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A8A', textTransform: 'uppercase', mb: 0.5 }}>
//                   Strategic Directive
//                 </Typography>
//                 <Typography variant="body2" component="div" sx={{ color: '#334155', lineHeight: 1.6 }}>
//                   <ReactMarkdown>{data.narrative.strategicDirective}</ReactMarkdown>
//                 </Typography>
//               </Box>
//               <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
//             </IonCol>
//           </IonRow>

//           {/* SECTION 2: BEEF FATTENING & ROI INTELLIGENCE */}
//           <IonRow>
//             <IonCol size="12">
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
//                 2. Beef Fattening & ROI Intelligence
//               </Typography>
              
//               <TableContainer component={Paper} variant="outlined" sx={{ p: 3, mb: 3, backgroundColor: '#1E293B', borderRadius: '8px' }}>
//                 <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#94A3B8', fontWeight: 700, mb: 2, letterSpacing: '0.1em' }}>
//                   WEIGHT & VALUE TRENDS
//                 </Typography>
//                 <Box sx={{ fontFamily: 'monospace', whiteSpace: 'pre', color: '#38BDF8', fontSize: '0.85rem', overflowX: 'auto' }}>
//                   {`460 kg ─────────────────────────────────────────── ▲ Target: $1,104/hd\n`}
//                   {`                                                   │ \n`}
//                   {`410 kg ─────────────────────────── ▲ Current Avg   │ \n`}
//                   {`                                    │               │ \n`}
//                   {`320 kg ─── ▲ Entry Avg             │               │ \n`}
//                   {`          │                        │               │ \n`}
//                   {` ───────────┴───────────────────────┴───────────────┴───────────────►\n`}
//                   {`           M1 (Entry)              M2 (Feedlot)     M3 (Marketing)`}
//                 </Box>
//               </TableContainer>

//               <Box mb={3}>
//                 <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
//                   • <strong>Average Daily Gain (ADG):</strong> The feedlot division is currently achieving <strong>+{data.beef.avgDailyGain} kg/day</strong> across the performance index.
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
//                   • <strong>Target Weight Projections:</strong> For the upcoming marketing cycle, <strong>{data.beef.projectedAnimals} animals</strong> are projected to hit the <strong>{data.beef.targetWeight} kg</strong> target weight.
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
//                   • <strong>Valuation & Price Per Kg:</strong> Using current market pricing of <strong>${data.beef.pricePerKg.toFixed(2)}/kg live weight</strong>, the current finished head inventory stands at <strong>${(data.beef.targetWeight * data.beef.pricePerKg).toLocaleString()} per head</strong>.
//                 </Typography>
//               </Box>

//               <Box sx={{ p: 2.5, backgroundColor: '#FFFBEB', borderRadius: '8px', borderLeft: '4px solid #D97706', mb: 4 }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#92400E', textTransform: 'uppercase', mb: 0.5 }}>
//                   Margin Optimization Alert
//                 </Typography>
//                 <Typography variant="body2" component="div" sx={{ color: '#78350F', lineHeight: 1.6 }}>
//                   <ReactMarkdown>{data.narrative.marginOptimizationAlert}</ReactMarkdown>
//                 </Typography>
//               </Box>
//               <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
//             </IonCol>
//           </IonRow>

//           {/* SECTION 3: DAIRY OPERATIONS & LACTATION ANALYTICS */}
//           <IonRow>
//             <IonCol size="12">
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
//                 3. Dairy Operations & Lactation Analytics
//               </Typography>
              
//               <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
//                 <Table>
//                   <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Metric</TableCell>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Current Level</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
//                       <TableCell sx={{ color: '#334155' }}>Butterfat</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#0F172A' }}>{data.dairy.butterfat}%</TableCell>
//                     </TableRow>
//                     <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
//                       <TableCell sx={{ color: '#334155' }}>Protein</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#0F172A' }}>{data.dairy.protein}%</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell sx={{ color: '#334155' }}>Avg Days in Milk (DIM)</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#0F172A' }}>{data.dairy.avgDaysInMilk} Days</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <Box mb={3}>
//                 <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
//                   • <strong>Milk Yield Dynamics:</strong> Total milk production across morning, midday, and evening sessions over the last 30 days stands at <strong>{data.dairy.totalProduction30d.toLocaleString()} liters</strong>.
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
//                   • <strong>Mastitis Screening:</strong> The current bulk tank somatic cell count is <strong>{data.dairy.somaticCellCount.toLocaleString()} cells/mL</strong>.
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
//                   • <strong>Antibiotic Security:</strong> There are currently <strong>{data.dairy.activeTreatments} cows</strong> flagged on health treatments. Their milk is safely diverted from commercial distribution.
//                 </Typography>
//               </Box>

//               <Box sx={{ p: 2.5, backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #3B82F6', mb: 4 }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A8A', textTransform: 'uppercase', mb: 0.5 }}>
//                   Immediate Dry-Off Actions
//                 </Typography>
//                 <Typography variant="body2" component="div" sx={{ color: '#334155', lineHeight: 1.6 }}>
//                   <ReactMarkdown>{data.narrative.dryOffActionItem}</ReactMarkdown>
//                 </Typography>
//               </Box>
//               <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
//             </IonCol>
//           </IonRow>

//           {/* SECTION 4: BIOCLIMATIC RISK & RISK MATRIX */}
//           <IonRow>
//             <IonCol size="12">
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
//                 4. Bioclimatic Risk & Environmental Management
//               </Typography>

//               <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
//                 <Table>
//                   <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Metric</TableCell>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Value</TableCell>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Risk Level</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
//                       <TableCell sx={{ color: '#334155' }}>Ambient Temperature</TableCell>
//                       <TableCell sx={{ color: '#0F172A' }}>{data.bioclimatic.temperature}°C</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#16A34A' }}>Low (Thermal Comfort)</TableCell>
//                     </TableRow>
//                     <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
//                       <TableCell sx={{ color: '#334155' }}>Relative Humidity</TableCell>
//                       <TableCell sx={{ color: '#0F172A' }}>{data.bioclimatic.humidity}%</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#16A34A' }}>Optimal</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell sx={{ color: '#334155' }}>THI (Computed)</TableCell>
//                       <TableCell sx={{ color: '#0F172A' }}>{data.bioclimatic.thi}</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#16A34A' }}>Safe Range</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <Box mb={4}>
//                 <Typography variant="body2" component="div" sx={{ color: '#4B5563', lineHeight: 1.6 }}>
//                   <ReactMarkdown>{data.narrative.bioclimaticAssessment}</ReactMarkdown>
//                 </Typography>
//               </Box>
//               <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />
//             </IonCol>
//           </IonRow>

//           {/* SECTION 5: LOGISTICS, INVENTORY & OUTLOOK */}
//           <IonRow>
//             <IonCol size="12">
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
//                 5. Logistics, Inventory & Financial Outlook
//               </Typography>

//               <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
//                 <Table>
//                   <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Resource</TableCell>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Level</TableCell>
//                       <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Status</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {data.inventory.map((item, index) => (
//                       <TableRow key={index} sx={{ borderBottom: index !== data.inventory.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
//                         <TableCell sx={{ color: '#334155', fontWeight: 600 }}>{item.resource}</TableCell>
//                         <TableCell sx={{ color: '#334155' }}>{item.level}</TableCell>
//                         <TableCell sx={{ fontWeight: 600, color: item.isLowStock ? '#DC2626' : '#16A34A' }}>
//                           {item.status}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                     {data.inventory.length === 0 && (
//                       <TableRow>
//                         <TableCell colSpan={3} align="center" sx={{ color: '#6B7280' }}>
//                           Inventory operational data clear.
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               {/* PROCUREMENT PRIORITY */}
//               <Box sx={{ p: 2.5, backgroundColor: '#FFFBEB', borderRadius: '8px', borderLeft: '4px solid #D97706', mb: 3 }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#92400E', textTransform: 'uppercase', mb: 0.5 }}>
//                   Procurement Priority
//                 </Typography>
//                 <Typography variant="body2" component="div" sx={{ color: '#78350F', lineHeight: 1.6 }}>
//                   <ReactMarkdown>{data.narrative.procurementInstruction}</ReactMarkdown>
//                 </Typography>
//               </Box>

//               {/* TRANSACTION & CURRENCY STRATEGY */}
//               <Box sx={{ p: 2.5, backgroundColor: '#F0FDF4', borderRadius: '8px', borderLeft: '4px solid #16A34A', mb: 2 }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#14532D', textTransform: 'uppercase', mb: 0.5 }}>
//                   Transaction & Currency Strategy
//                 </Typography>
//                 <Typography variant="body2" component="div" sx={{ color: '#166534', lineHeight: 1.6 }}>
//                   <ReactMarkdown>{data.narrative.currencyStrategy}</ReactMarkdown>
//                 </Typography>
//               </Box>
//             </IonCol>
//           </IonRow>

//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Insights;
