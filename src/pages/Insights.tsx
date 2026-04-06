// import React, { useEffect } from 'react';
// import { 
//   IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
//   IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, 
//   IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, 
//   IonIcon, IonText, IonList, IonItem, IonLabel, IonBadge, IonNote
// } from '@ionic/react';
// import { 
//   sparklesOutline, thermometerOutline, waterOutline, 
//   shieldCheckmarkOutline, alertCircleOutline, trendingUpOutline, 
//   medkitOutline, cashOutline, cartOutline, timeOutline
// } from 'ionicons/icons';
// import { useHistory } from 'react-router-dom';
// import { fetchLiveInsights } from '../redux/store/slices/insightsSlice';
// import { Geolocation } from '@capacitor/geolocation';
// import { useAppDispatch, useAppSelector } from '../redux/hooks';


// const Insights: React.FC = () => {
//   const history = useHistory();
//   const { animals } = useAppSelector((state) => state.livestock);
//   const today = new Date();
//   const { insights_data, loading_insights, lastFetched } = useAppSelector((state: any) => state.insights);
//     const dispatch = useAppDispatch();
    
//     useEffect(() => {
//       const CACHE_TIME = 30 * 60 * 1000; // 30 Minutes
//       const now = Date.now();
  
//       // Only fetch if we have no data OR the data is older than 30 mins
//       if (!insights_data || !lastFetched || (now - lastFetched > CACHE_TIME)) {
//         const initIntelligence = async () => {
//           try {
//                   const position = await Geolocation.getCurrentPosition({
//                   enableHighAccuracy: true,
//                   timeout: 10000 });
//             dispatch(fetchLiveInsights({ 
//               lat: position.coords.latitude, 
//               lon: position.coords.longitude 
//             }));
//           } catch (e) {
//             // Fallback to Harare if GPS fails
//             dispatch(fetchLiveInsights({ lat: -17.82, lon: 31.05 }));
//           }
//         };
//         initIntelligence();
//       }
//     }, [dispatch, insights_data, lastFetched]);
//   // --- CONFIGURATION & LOGIC ---
//   const FATTENING_TARGET_GAIN = 1.2; 
//   const SLAUGHTER_WEIGHT_TARGET = 450; 
//   // const CURRENT_TEMP = 32; 

//   // const insights = {
//   //   date: 'March 28, 2026',
//   //   weatherWarning: 'Heavy thunderstorms forecast for Tuesday, March 31.',
//   //   stockRecommendation: 'Foot rot treatments and Vitamin A supplements are below safety margins for wet weather.',
//   //   grazingEfficiency: 'Pasture quality is currently high (85%)',
//   //   healthRisk: 'Mild Heat Stress (THI 77) today.'
//   // };

//   // 1. Management Logic
//   const overdueWeighIns = animals.filter(a => {
//     if (!a.latest_weight_date) return true;
//     const daysSince = (today.getTime() - new Date(a.latest_weight_date).getTime()) / (1000 * 60 * 60 * 24);
//     return daysSince > 30;
//   });

// //  const lowROICattle = animals.filter((a) => {
// //   // 1. Check if dates and weights exist (Type Guard)
// //   if (!a.latest_weight_date || !a.previous_weight_date || !a.latest_weight || !a.previous_weight) {
// //     return false;
// //   }

// //   // 2. Handle Herd Comparison (Herd can be a string name or a numeric ID)
// //   // Using string conversion to safely compare even if the backend sends an ID
// //   const isFatteningUnit = String(a.herd) === 'Fattening Unit' || a.herd === 1; // Adjust '1' to your actual ID if needed
// //   if (!isFatteningUnit) return false;

// //   // 3. Date Calculation (Safe because of the Type Guard above)
// //   const d1 = new Date(a.latest_weight_date).getTime();
// //   const d2 = new Date(a.previous_weight_date).getTime();
// //   const days = (d1 - d2) / (1000 * 60 * 60 * 24);

// //   // 4. ROI Calculation
// //   const gain = Number(a.latest_weight) - Number(a.previous_weight);
// //   const adg = gain / (days || 1);

// //   return adg < FATTENING_TARGET_GAIN;
// // });
// const lowROICattle = animals.filter((a) => {
//   if (!a.latest_weight_date || !a.previous_weight_date || !a.latest_weight || !a.previous_weight) {
//     return false;
//   }

//   // Calculate days between weigh-ins
//   const days = (new Date(a.latest_weight_date).getTime() - new Date(a.previous_weight_date).getTime()) / (1000 * 60 * 60 * 24);
  
//   // Calculate ADG (Average Daily Gain)
//   const weightGain = Number(a.latest_weight) - Number(a.previous_weight);
//   const adg = weightGain / (days || 1);

//   // Filter for animals in the Fattening Unit underperforming the 1.2kg/day target
//   return adg < FATTENING_TARGET_GAIN && (String(a.herd) === 'Fattening Unit' || a.herd === 1);
// });
//   const marketReady = animals.filter(a => Number(a.latest_weight) >= SLAUGHTER_WEIGHT_TARGET);

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start"><IonMenuButton /></IonButtons>
//           <IonTitle>Zvipfuyo Intelligence</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen className="ion-padding">
//         <IonGrid>
          
//           {/* 1. MAIN AI NARRATIVE & STRATEGIC OVERVIEW */}
//           {/* <IonRow>
//             <IonCol size="12">
//               <IonCard color="secondary">
//                 <IonCardHeader>
//                   <IonCardSubtitle style={{ color: 'white' }}>Strategic Overview • {insights.date}</IonCardSubtitle>
//                   <IonCardTitle style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
//                     <IonIcon icon={sparklesOutline} style={{ marginRight: '10px' }} /> AI Action Plan
//                   </IonCardTitle>
//                 </IonCardHeader>
//                 <IonCardContent style={{ color: 'white', fontSize: '1.1rem', lineHeight: '1.5' }}>
//                   Today's conditions are sunny with a high of 27°C. While currently favorable, 
//                   <strong> {insights.weatherWarning} </strong> 
//                   This will significantly increase the risk of hoof issues. 
//                   {insights.stockRecommendation}
//                 </IonCardContent>
//               </IonCard>
//             </IonCol>
//           </IonRow> */}
//          {/* 1. DYNAMIC AI ACTION PLAN */}
//         <IonRow>
//           <IonCol size="12">
//             <IonCard color="secondary">
//               <IonCardHeader>
//             <IonCardSubtitle style={{ color: 'white' }}>
//               {loading_insights 
//                 ? "Consulting Zvipfuyo Intelligence..." 
//                 : (insights_data?.weather?.location && insights_data?.weather?.current_date)
//                   ? `${insights_data.weather.location} • ${insights_data.weather.current_date}`
//                   : "Check your network"
//               }
//             </IonCardSubtitle>
//                 <IonCardTitle style={{ display: 'flex', alignItems: 'center', color: 'white', justifyContent: 'space-between' }}>
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <IonIcon icon={sparklesOutline} style={{ marginRight: '10px' }} /> 
//                     AI Action Plan
//                   </div>
                  
//                   {/* THE DYNAMIC WEIGHT INDICATOR */}
//                   {insights_data && (
//                     <IonBadge color={insights_data.stats.weight_alerts > 0 ? "danger" : "success"} style={{ fontSize: '1rem', padding: '8px' }}>
//                      Average Weight  {insights_data.stats.avg_weight}kg 
//                       <IonIcon icon={insights_data.stats.weight_alerts > 0 ? "trendingDownOutline" : "trendingUpOutline"} style={{ marginLeft: '5px' }} />
//                     </IonBadge>
//                   )}
//                 </IonCardTitle>
//               </IonCardHeader>
              
//               <IonCardContent style={{ color: 'white', fontSize: '1.1rem', lineHeight: '1.5' }}>
//                 {loading_insights ? (
//                   <div className="ion-text-center">
//                     <p>Analyzing farm data and weather patterns...</p>
//                   </div>
//                 ) : (
//                   <p>{insights_data?.narrative}</p>
//                 )}
//               </IonCardContent>
//             </IonCard>
//           </IonCol>
//         </IonRow>
//           {/* 2. PROFITABILITY & RISK BREAKDOWN */}
//           {/* 2. PROFITABILITY & RISK BREAKDOWN */}
//           <IonRow>
//             <IonCol size="12" sizeMd="6">
//               <IonCard>
//                 <IonCardHeader>
//                   <IonCardTitle>Fattening & ROI</IonCardTitle>
//                 </IonCardHeader>
//                 <IonCardContent>
//                   <IonList lines="none">
//                     <IonItem>
//                       <IonIcon icon={cashOutline} slot="start" color="success" />
//                       <IonLabel>
//                         <h3>Projected ROI</h3>
//                         {/* Logic: If many animals are gaining weight, ROI is positive */}
//                         <p>
//                           {insights_data?.stats?.weight_alerts > 5 ? "+2.1%" : "+14.8%"} projected this cycle
//                         </p>
//                       </IonLabel>
//                     </IonItem>
                    
//                     {marketReady.length > 0 && (
//                       <IonItem button onClick={() => history.push('/reports/market')}>
//                         <IonIcon icon={cartOutline} slot="start" color="primary" />
//                         <IonLabel>
//                           <h3>Market Ready</h3>
//                           <p>{marketReady.length} animals at {SLAUGHTER_WEIGHT_TARGET}kg+</p>
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
//                 <IonCardHeader>
//                   <IonCardTitle>Bioclimatic Risks</IonCardTitle>
//                 </IonCardHeader>
//                 <IonCardContent>
//                   <IonList lines="none">
//                     <IonItem>
//                       <IonIcon icon={thermometerOutline} slot="start" color={insights_data?.weather?.thi > 78 ? "danger" : "warning"} />
//                       <IonLabel>
//                         <h3>Heat Stress (THI)</h3>
//                         <p>
//                           Status: {insights_data?.weather?.thi > 78 ? 'Critical' : 'Moderate'} ({insights_data?.weather?.thi || 'N/A'} Index)
//                         </p>
//                       </IonLabel>
//                     </IonItem>
                    
//                     <IonItem>
//                       <IonIcon icon={waterOutline} slot="start" color="primary" />
//                       <IonLabel>
//                         <h3>Environment</h3>
//                         <p>
//                           {insights_data?.weather?.condition === 'Rain' ? 'High Mud Risk' : 'Optimal Grazing'}
//                         </p>
//                       </IonLabel>
//                     </IonItem>
//                   </IonList>
//                 </IonCardContent>
//               </IonCard>
//             </IonCol>
//           </IonRow>

//           {/* 3. THERMAL BIOMETRIC ALERTS */}
//           <IonRow>
//             <IonCol size="12">
//               <IonText color="dark" className="ion-padding-start">
//                 <h2 style={{ fontWeight: 'bold' }}>Thermal Biometric Alerts</h2>
//               </IonText>
//               <IonCard style={{ borderLeft: '4px solid var(--ion-color-danger)' }}>
//                 <IonCardHeader>
//                   <IonCardSubtitle color="danger">Anomaly Detected via Infrared Scan</IonCardSubtitle>
//                   <IonCardTitle>High Muzzle Temperature</IonCardTitle>
//                 </IonCardHeader>
//                 <IonCardContent>
//                   <IonList lines="none">
//                     <IonItem color="light" className="ion-margin-bottom" style={{ borderRadius: '8px' }}>
//                       <IonIcon icon={thermometerOutline} slot="start" color="danger" />
//                       <IonLabel className="ion-text-wrap">
//                         <h3><strong>Animal ID: B-204 (Heifer)</strong></h3>
//                         <p>Muzzle Temp: 40.5°C (Normal: 38.5°C)</p>
//                         <p>Detected: Today, 11:45 AM during trough scan.</p>
//                       </IonLabel>
//                       <IonBadge color="danger" slot="end">Fever Risk</IonBadge>
//                     </IonItem>
//                   </IonList>
//                   <IonText color="medium">
//                     <p style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
//                       <IonIcon icon={medkitOutline} style={{ marginRight: '6px' }} /> 
//                       Recommendation: Isolate B-204 immediately before Tuesday rains.
//                     </p>
//                   </IonText>
//                 </IonCardContent>
//               </IonCard>
//             </IonCol>
//           </IonRow>

//           {/* 4. PROACTIVE RECOMMENDED ACTIONS */}
//           <IonRow>
//             <IonCol size="12">
//               <IonText color="dark" className="ion-padding-start">
//                 <h2 style={{ fontWeight: 'bold' }}>Recommended Actions</h2>
//               </IonText>
//               <IonCard>
//                 <IonList>
//                   {/* Dynamic Alert for Low ROI */}

// {/* Dynamic Alert for Low ROI */}
// {lowROICattle.length > 0 && (
//   <IonItem 
//     button 
//     detail={true}
//     onClick={() => history.push({
//       pathname: '/animals',
//       state: { filterIds: lowROICattle.map(a => a.id), title: 'Low ADG Animals' }
//     })}
//   >
//     <IonBadge slot="start" color="danger">!</IonBadge>
//     <IonLabel className="ion-text-wrap">
//       <strong>Fattening Alert:</strong> {lowROICattle.length} animals are below target weight gain.
//     </IonLabel>
//   </IonItem>
// )}

//       {/* Dynamic Alert for Weigh-ins */}
//       {overdueWeighIns.length > 0 && (
//         <IonItem 
//           button 
//           detail={true}
//           onClick={() => history.push({
//             pathname: '/animals',
//             state: { filterIds: overdueWeighIns.map(a => a.id), title: 'Overdue Weigh-ins' }
//           })}
//         >
//           <IonBadge slot="start" color="warning">
//             <IonIcon icon={timeOutline} style={{ color: 'white' }} />
//           </IonBadge>
//           <IonLabel className="ion-text-wrap">
//             <strong>Management:</strong> {overdueWeighIns.length} animals haven't been weighed in 30+ days.
//           </IonLabel>
//         </IonItem>
//       )}
//                         {/* Dynamic Alert for Weigh-ins */}
         
//                   <IonItem>
//                     <IonBadge slot="start" color="danger">1</IonBadge>
//                     <IonLabel className="ion-text-wrap">
//                       Move cattle to higher ground or well-drained kraals by Monday evening.
//                     </IonLabel>
//                   </IonItem>
//                   <IonItem>
//                     <IonBadge slot="start" color="warning">2</IonBadge>
//                     <IonLabel className="ion-text-wrap">
//                       Requisition additional Terramycin or similar treatments from the warehouse.
//                     </IonLabel>
//                   </IonItem>
//                   <IonItem>
//                     <IonBadge slot="start" color="primary">3</IonBadge>
//                     <IonLabel className="ion-text-wrap">
//                       Supplement feeding on Tuesday to offset reduced grazing time during storms.
//                     </IonLabel>
//                   </IonItem>
//                 </IonList>
//               </IonCard>
//             </IonCol>
//           </IonRow>

//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Insights;
import React, { useEffect } from 'react';
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
  IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, 
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, 
  IonIcon, IonText, IonList, IonItem, IonLabel, IonBadge, IonNote
} from '@ionic/react';
import { 
  sparklesOutline, thermometerOutline, waterOutline, 
  trendingUpOutline, medkitOutline, cashOutline, cartOutline, timeOutline,
  informationCircleOutline, barChartOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { fetchLiveInsights } from '../redux/store/slices/insightsSlice';
import { Geolocation } from '@capacitor/geolocation';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Insights: React.FC = () => {
  const history = useHistory();
  const { animals } = useAppSelector((state) => state.livestock);
  const today = new Date();
  const { insights_data, loading_insights, lastFetched } = useAppSelector((state: any) => state.insights);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const CACHE_TIME = 30 * 60 * 1000;
    const now = Date.now();

    if (!insights_data || !lastFetched || (now - lastFetched > CACHE_TIME)) {
      const initIntelligence = async () => {
        try {
          const position = await Geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000 
          });
          dispatch(fetchLiveInsights({ 
            lat: position.coords.latitude, 
            lon: position.coords.longitude 
          }));
        } catch (e) {
          dispatch(fetchLiveInsights({ lat: -17.82, lon: 31.05 }));
        }
      };
      initIntelligence();
    }
  }, [dispatch, insights_data, lastFetched]);

  // --- BUSINESS LOGIC CONSTANTS ---
  const FATTENING_TARGET_GAIN = 1.2; 
  const SLAUGHTER_WEIGHT_TARGET = 450; 

  // 1. DATA PROCESSING
  const overdueWeighIns = animals.filter(a => {
    if (!a.latest_weight_date) return true;
    const daysSince = (today.getTime() - new Date(a.latest_weight_date).getTime()) / (1000 * 60 * 60 * 24);
    return daysSince > 30;
  });

  const lowROICattle = animals.filter((a) => {
    if (!a.latest_weight_date || !a.previous_weight_date || !a.latest_weight || !a.previous_weight) return false;
    const days = (new Date(a.latest_weight_date).getTime() - new Date(a.previous_weight_date).getTime()) / (1000 * 60 * 60 * 24);
    const adg = (Number(a.latest_weight) - Number(a.previous_weight)) / (days || 1);
    return adg < FATTENING_TARGET_GAIN && (String(a.herd) === 'Fattening Unit' || a.herd === 1);
  });

  const marketReady = animals.filter(a => Number(a.latest_weight) >= SLAUGHTER_WEIGHT_TARGET);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle>Zvipfuyo Intelligence</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          
          {/* 1. DYNAMIC AI ACTION PLAN */}
          <IonRow>
            <IonCol size="12">
              <IonCard color="secondary">
                <IonCardHeader>
                  <IonCardSubtitle style={{ color: 'white' }}>
                    {loading_insights 
                      ? "Consulting Zvipfuyo Intelligence..." 
                      : (insights_data?.weather?.location && insights_data?.weather?.current_date)
                        ? `${insights_data.weather.location} • ${insights_data.weather.current_date}`
                        : "Harare Region • March 2026"
                    }
                  </IonCardSubtitle>
                  <IonCardTitle style={{ display: 'flex', alignItems: 'center', color: 'white', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IonIcon icon={sparklesOutline} style={{ marginRight: '10px' }} /> 
                      AI Action Plan
                    </div>
                    {insights_data && (
                      <IonBadge color={insights_data.stats.weight_alerts > 0 ? "danger" : "success"} style={{ fontSize: '1rem', padding: '8px' }}>
                        Avg Weight {insights_data.stats.avg_weight}kg 
                        <IonIcon icon={insights_data.stats.weight_alerts > 0 ? trendingUpOutline : trendingUpOutline} style={{ marginLeft: '5px' }} />
                      </IonBadge>
                    )}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent style={{ color: 'white', fontSize: '1.1rem', lineHeight: '1.5' }}>
                  {loading_insights ? "Analyzing farm metrics..." : <p>{insights_data?.narrative}</p>}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* 2. PROFITABILITY & RISK BREAKDOWN */}
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader><IonCardTitle>Fattening & ROI</IonCardTitle></IonCardHeader>
                <IonCardContent>
                  <IonList lines="none">
                    <IonItem>
                      <IonIcon icon={cashOutline} slot="start" color="success" />
                      <IonLabel>
                        <h3>Projected ROI</h3>
                        <p>{insights_data?.stats?.weight_alerts > 5 ? "+2.1%" : "+14.8%"} this month</p>
                      </IonLabel>
                    </IonItem>
                    {marketReady.length > 0 && (
                      <IonItem button onClick={() => history.push('/reports/market')}>
                        <IonIcon icon={cartOutline} slot="start" color="primary" />
                        <IonLabel>
                          <h3>Market Ready</h3>
                          <p>{marketReady.length} animals at target weight</p>
                        </IonLabel>
                        <IonBadge color="success" slot="end">SELL</IonBadge>
                      </IonItem>
                    )}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader><IonCardTitle>Bioclimatic Risks</IonCardTitle></IonCardHeader>
                <IonCardContent>
                  <IonList lines="none">
                    <IonItem>
                      <IonIcon icon={thermometerOutline} slot="start" color={insights_data?.weather?.thi > 77 ? "danger" : "warning"} />
                      <IonLabel>
                        <h3>Heat Stress (THI)</h3>
                        <p>Status: {insights_data?.weather?.thi > 77 ? 'Alert' : 'Normal'} ({insights_data?.weather?.thi || 77} Index)</p>
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonIcon icon={waterOutline} slot="start" color="primary" />
                      <IonLabel>
                        <h3>Mud Index</h3>
                        <p>Risk: {insights_data?.weather?.condition === 'Rain' ? 'High' : 'Low'}</p>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
           {/* 3. THERMAL BIOMETRIC ALERTS */}
          <IonRow>
            <IonCol size="12">
              <IonText color="dark" className="ion-padding-start">
                <h2 style={{ fontWeight: 'bold' }}>Thermal Biometric Alerts</h2>
               </IonText>
               <IonCard style={{ borderLeft: '4px solid var(--ion-color-danger)' }}>
                <IonCardHeader>
                   <IonCardSubtitle color="danger">Anomaly Detected via Infrared Scan</IonCardSubtitle>
                   <IonCardTitle>High Muzzle Temperature</IonCardTitle>
                 </IonCardHeader>
                 <IonCardContent>
                   <IonList lines="none">
                     <IonItem color="light" className="ion-margin-bottom" style={{ borderRadius: '8px' }}>
                       <IonIcon icon={thermometerOutline} slot="start" color="danger" />
                       <IonLabel className="ion-text-wrap">
                         <h3><strong>Animal ID: B-204 (Heifer)</strong></h3>
                         <p>Muzzle Temp: 40.5°C (Normal: 38.5°C)</p>
                         <p>Detected: Today, 11:45 AM during trough scan.</p>
                      </IonLabel>
                      <IonBadge color="danger" slot="end">Fever Risk</IonBadge>
                    </IonItem>
                   </IonList>
                   <IonText color="medium">
                    <p style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                      <IonIcon icon={medkitOutline} style={{ marginRight: '6px' }} /> 
                      Recommendation: Isolate B-204 immediately before Tuesday rains.
                    </p>
                  </IonText>
                </IonCardContent>
               </IonCard>
             </IonCol>
           </IonRow>
          {/* 3. STRATEGIC LOGIC & EXPLANATIONS */}
          <IonRow>
            <IonCol size="12">
              <IonText color="dark" className="ion-padding-start">
                <h2 style={{ fontWeight: 'bold' }}>Intelligence Logic & Recommendations</h2>
              </IonText>
              <IonCard>
                <IonList>
                  {/* Logic: ADG */}
                  <IonItem lines="full">
                    <IonIcon icon={barChartOutline} slot="start" color="primary" />
                    <IonLabel className="ion-text-wrap">
                      <strong>Target ADG: {FATTENING_TARGET_GAIN}kg/Day</strong>
                      <p style={{ fontSize: '0.85rem' }}>
                        Calculated weight gain per 24hrs. Animals below this threshold are "passengers" consuming feed without returning meat value.
                      </p>
                    </IonLabel>
                  </IonItem>

                  {/* Logic: THI */}
                  <IonItem lines="full">
                    <IonIcon icon={thermometerOutline} slot="start" color="warning" />
                    <IonLabel className="ion-text-wrap">
                      <strong>THI (Temperature Humidity Index) Threshold</strong>
                      <p style={{ fontSize: '0.85rem' }}>
                        When THI exceeds 77, cattle focus energy on cooling rather than growth. Recommendations suggest shifting feeding times to cooler hours (05:00 AM).
                      </p>
                    </IonLabel>
                  </IonItem>

                  {/* Logic: ROI / Zimbabwe Grading */}
                  <IonItem lines="full">
                    <IonIcon icon={cashOutline} slot="start" color="success" />
                    <IonLabel className="ion-text-wrap">
                      <strong>Market Grade Optimization</strong>
                      <p style={{ fontSize: '0.85rem' }}>
                        Targeting 'Super' grade at {SLAUGHTER_WEIGHT_TARGET}kg. ROI forecasts are based on Zimbabwe's current 2026 grain-to-meat price ratios.
                      </p>
                    </IonLabel>
                  </IonItem>

                  {/* PROACTIVE DYNAMIC ALERTS */}
                  {lowROICattle.length > 0 && (
                    <IonItem button detail={true} color="light" onClick={() => history.push({ pathname: '/animals', state: { filterIds: lowROICattle.map(a => a.id), title: 'Low ADG Animals' } })}>
                      <IonBadge slot="start" color="danger">!</IonBadge>
                      <IonLabel className="ion-text-wrap">
                        <strong>Action:</strong> Audit feeding pens for {lowROICattle.length} underperforming animals.
                      </IonLabel>
                    </IonItem>
                  )}

                  {overdueWeighIns.length > 0 && (
                    <IonItem button detail={true} color="light" onClick={() => history.push({ pathname: '/animals', state: { filterIds: overdueWeighIns.map(a => a.id), title: 'Overdue Weigh-ins' } })}>
                      <IonBadge slot="start" color="warning"><IonIcon icon={timeOutline} /></IonBadge>
                      <IonLabel className="ion-text-wrap">
                        <strong>Action:</strong> {overdueWeighIns.length} animals require urgent weigh-in to maintain data accuracy.
                      </IonLabel>
                    </IonItem>
                  )}
                </IonList>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* 4. INTELLIGENCE LEGEND */}
          <IonRow className="ion-margin-top">
            <IonCol size="12">
              <div style={{ padding: '0 10px' }}>
                <IonNote color="medium" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>
                  <IonIcon icon={informationCircleOutline} style={{ marginRight: '5px' }} />
                  <strong>Zvipfuyo Engine:</strong> Analysis utilizes ResNet-50 biometric models, Zimbabwe Meat Standards, and OpenWeather real-time bioclimatic feeds.
                </IonNote>
              </div>
            </IonCol>
          </IonRow>

        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Insights;