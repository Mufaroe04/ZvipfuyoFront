// import React from 'react';
// import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,  } from '@ionic/react';
// import { HealthListGrid } from './components/HealthListGrid';
// import ClinicalBanner from './components/ClinicalBanner';

// const HealthAndTreatmentsView: React.FC = () => {
 

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start"><IonMenuButton /></IonButtons>
//           <IonTitle style={{ fontWeight: 700 }}>Health & Treatments</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen className="ion-padding">
//         <ClinicalBanner/>
//         <HealthListGrid  />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default HealthAndTreatmentsView;

import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { HealthListGrid } from './components/HealthListGrid';
import ClinicalBanner from './components/ClinicalBanner';
import { useHealthyRecordsList } from './hooks/useHealthyRecordsList';

const HealthAndTreatmentsView: React.FC = () => {
  // Execute hook using 'server' mode configuration
  const healthHookData = useHealthyRecordsList([], undefined, 'server');

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Health & Treatments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Pass the calculated total aggregate downstream to the metric ribbon banner */}
        <ClinicalBanner totalSpend={healthHookData.totalSpend} />
        <HealthListGrid {...healthHookData} paginationMode="server" />
      </IonContent>
    </IonPage>
  );
};

export default HealthAndTreatmentsView;