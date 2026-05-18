// import React from 'react';
// import { 
//   IonButtons, IonContent, IonHeader, IonMenuButton, 
//   IonPage, IonTitle, IonToolbar,  
// } from '@ionic/react';
// import { ReproductionListGrid } from './components/ReproductionListGrid';
// import BreedingBanner from './components/BreedingBanner';
// import { useBreedingList } from './hooks/useBreedingList';

// const ReproductionView: React.FC = () => {
//     const { events,loading}=useBreedingList()


//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start"><IonMenuButton /></IonButtons>
//           <IonTitle style={{ fontWeight: 700 }}>Breeding & Calving</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen className="ion-padding">
        
//         <BreedingBanner/>
//         <ReproductionListGrid  />
   
//       </IonContent>
//     </IonPage>
//   );
// };

// export default ReproductionView;
import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ReproductionListGrid } from './components/ReproductionListGrid';
import BreedingBanner from './components/BreedingBanner';
import { useBreedingList } from './hooks/useBreedingList';

const ReproductionView: React.FC = () => {
  // Execute global server-side hook strategy
  const breedingHookData = useBreedingList([], undefined, 'server');

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Breeding & Calving</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <BreedingBanner />
        <ReproductionListGrid 
          {...breedingHookData} 
          paginationMode="server" 
        />
      </IonContent>
    </IonPage>
  );
};

export default ReproductionView;