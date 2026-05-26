
// // src/views/transfer/hooks/useTransferFormLogic.ts
// import { useState, useEffect } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
// import { useIonLoading, useIonToast } from '@ionic/react';
// import { logisticsService } from '../../../services/logisticsService';
// import { Transfer, TransferType, Animal } from '../../../types/types';

// interface TransferFormData {
//   transfer_type: TransferType;
//   from_herd: string;
//   to_herd: string;
//   external_destination: string;
//   truck_reg_number: string;
//   driver_name: string;
//   vet_permit_number: string;
//   police_clearance_ref: string;
// }

// export const useTransferFormLogic = () => {
//   const history = useHistory();
//   const { id } = useParams<{ id?: string }>();
//   const isEditMode = Boolean(id);

//   const [presentLoading, dismissLoading] = useIonLoading();
//   const [presentToast] = useIonToast();
//   const [selectedAnimals, setSelectedAnimals] = useState<Animal[]>([]);
  
//   const [formData, setFormData] = useState<TransferFormData>({
//     transfer_type: 'internal',
//     from_herd: '',
//     to_herd: '',
//     external_destination: '',
//     truck_reg_number: '',
//     driver_name: '',
//     vet_permit_number: '',
//     police_clearance_ref: '',
//   });

//   // Functional state updater to prevent component tree state clearing
//   const handleInputChange = (name: keyof TransferFormData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     if (isEditMode && id) {
//       logisticsService.getTransfers()
//         .then((res) => {
//           const transfersList = res.data?.results || [];
//           const record = transfersList.find((t: Transfer) => t.uuid === id);
          
//           if (record) {
//             setFormData({
//               transfer_type: record.transfer_type || 'internal',
//               from_herd: record.from_herd?.toString() || '',
//               to_herd: record.to_herd?.toString() || '',
//               external_destination: record.external_destination || '',
//               truck_reg_number: record.truck_reg_number || '',
//               driver_name: record.driver_name || '',
//               vet_permit_number: record.vet_permit_number || '',
//               police_clearance_ref: record.police_clearance_ref || '',
//             });
            
//             // if (record.animals) {
//             //   const normalizedAnimals = record.animals.map((a: any) => 
//             //     typeof a === 'object' 
//             //       ? (a as Animal) 
//             //       : ({ id: Number(a), tag_number: `Tag: ${a}` } as unknown as Animal)
//             //   );
//             //   setSelectedAnimals(normalizedAnimals);
//             // }
//             if (record.animals && Array.isArray(record.animals)) {
//                 const normalizedAnimals = record.animals.map((id: any, index: number) => {
//                   // If the API somehow returned a full object already, preserve it
//                   if (typeof id === 'object' && id !== null) {
//                     return id as Animal;
//                   }
                  
//                   // Otherwise, construct a structurally valid Animal object using the parallel tag array
//                   const tagFromPayload = record.animal_tags && record.animal_tags[index];
                  
//                   return {
//                     id: Number(id),
//                     // Fallback cleanly to the ID only if the backend array element is missing
//                     tag_number: tagFromPayload || `ID: ${id}`
//                   } as unknown as Animal;
//                 });

//                 setSelectedAnimals(normalizedAnimals);
//               }
//           }
//         })
//         .catch(() => {
//           presentToast({ message: 'Failed to synchronize manifest data.', color: 'danger', duration: 2000 });
//         });
//     }
//   }, [id, isEditMode, presentToast]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (selectedAnimals.length === 0) {
//       presentToast({ message: 'Please select at least one animal tag.', color: 'warning', duration: 2000 });
//       return;
//     }

//     await presentLoading(isEditMode ? 'Updating pipeline...' : 'Initiating data payload...');
    
//     try {
//       const payload: any = {
//         transfer_type: formData.transfer_type,
//         from_herd: formData.from_herd ? parseInt(formData.from_herd, 10) : null,
//         to_herd: formData.transfer_type === 'internal' ? parseInt(formData.to_herd, 10) : null,
//         external_destination: formData.transfer_type !== 'internal' ? formData.external_destination : '',
//         truck_reg_number: formData.truck_reg_number || '',
//         driver_name: formData.driver_name || '',
//         vet_permit_number: formData.vet_permit_number || '',
//         police_clearance_ref: formData.police_clearance_ref || '',
//         animals: selectedAnimals.map((a) => a.id),
//         status: 'pending',
//       };

//       if (isEditMode && id) {
//         await logisticsService.updateTransfer(id, payload);
//         presentToast({ message: 'Transfer record updated successfully.', color: 'success', duration: 2000 });
//       } else {
//         await logisticsService.createTransfer(payload);
//         presentToast({ message: 'Digital transfer instantiated.', color: 'success', duration: 2000 });
//       }
      
//       history.goBack();
//     } catch (err) {
//       presentToast({ message: 'Failed to process manifest actions.', color: 'danger', duration: 2000 });
//     } finally {
//       dismissLoading();
//     }
//   };

//   return {
//     isEditMode,
//     selectedAnimals,
//     setSelectedAnimals,
//     formData,
//     handleInputChange,
//     handleSubmit,
//   };
// };
// src/views/transfer/hooks/useTransferFormLogic.ts
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useIonLoading, useIonToast } from '@ionic/react';
import { logisticsService } from '../../../services/logisticsService';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAllHerds } from '../../../redux/store/slices/livestockSlice'; // Adjust path if necessary
import { Transfer, TransferType, Animal } from '../../../types/types';

interface TransferFormData {
  transfer_type: TransferType;
  from_herd: string | number;
  to_herd: string | number;
  external_destination: string;
  truck_reg_number: string;
  driver_name: string;
  vet_permit_number: string;
  police_clearance_ref: string;
}

export const useTransferFormLogic = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const isEditMode = Boolean(id);

  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();
  const [selectedAnimals, setSelectedAnimals] = useState<Animal[]>([]);
  
  // Select herds from Redux state
  const { herds } = useAppSelector((state) => state.livestock);
  // Extract real array assuming structure is herds.results or herds itself
  const herdsList = Array.isArray(herds) ? herds : (herds as any)?.results || [];

  const [formData, setFormData] = useState<TransferFormData>({
    transfer_type: 'internal',
    from_herd: '',
    to_herd: '',
    external_destination: '',
    truck_reg_number: '',
    driver_name: '',
    vet_permit_number: '',
    police_clearance_ref: '',
  });

  // Fetch herds on initialization if not loaded
  useEffect(() => {
    if (herdsList.length === 0) {
      dispatch(fetchAllHerds({ page: 1, pageSize: 200 }));
    }
  }, [dispatch, herdsList.length]);
  const handleInputChange = (name: keyof TransferFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isEditMode && id) {
      logisticsService.getTransfers()
        .then((res) => {
          const transfersList = res.data?.results || [];
          const record = transfersList.find((t: Transfer) => t.uuid === id);
          
          if (record) {
            setFormData({
              transfer_type: record.transfer_type || 'internal',
              from_herd: record.from_herd ? Number(record.from_herd) : '',
              to_herd: record.to_herd ? Number(record.to_herd) : '',
              external_destination: record.external_destination || '',
              truck_reg_number: record.truck_reg_number || '',
              driver_name: record.driver_name || '',
              vet_permit_number: record.vet_permit_number || '',
              police_clearance_ref: record.police_clearance_ref || '',
            });
            
            if (record.animals && Array.isArray(record.animals)) {
              const normalizedAnimals = record.animals.map((animId: any, index: number) => {
                if (typeof animId === 'object' && animId !== null) {
                  return animId as Animal;
                }
                const tagFromPayload = record.animal_tags && record.animal_tags[index];
                return {
                  id: Number(animId),
                  tag_number: tagFromPayload || `ID: ${animId}`
                } as unknown as Animal;
              });

              setSelectedAnimals(normalizedAnimals);
            }
          }
        })
        .catch(() => {
          presentToast({ message: 'Failed to synchronize manifest data.', color: 'danger', duration: 2000 });
        });
    }
  }, [id, isEditMode, presentToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedAnimals.length === 0) {
      presentToast({ message: 'Please select at least one animal tag.', color: 'warning', duration: 2000 });
      return;
    }

    if (!formData.from_herd) {
      presentToast({ message: 'Please specify the originating source herd.', color: 'warning', duration: 2000 });
      return;
    }

    await presentLoading(isEditMode ? 'Updating pipeline...' : 'Initiating data payload...');
    
    try {
      const payload: any = {
        transfer_type: formData.transfer_type,
        from_herd: Number(formData.from_herd),
        to_herd: formData.transfer_type === 'internal' ? Number(formData.to_herd) : null,
        external_destination: formData.transfer_type !== 'internal' ? formData.external_destination : '',
        truck_reg_number: formData.truck_reg_number || '',
        driver_name: formData.driver_name || '',
        vet_permit_number: formData.vet_permit_number || '',
        police_clearance_ref: formData.police_clearance_ref || '',
        animals: selectedAnimals.map((a) => a.id),
        status: 'pending',
      };

      if (isEditMode && id) {
        await logisticsService.updateTransfer(id, payload);
        presentToast({ message: 'Transfer record updated successfully.', color: 'success', duration: 2000 });
      } else {
        await logisticsService.createTransfer(payload);
        presentToast({ message: 'Digital transfer instantiated.', color: 'success', duration: 2000 });
      }
      
      history.goBack();
    } catch (err) {
      presentToast({ message: 'Failed to process manifest actions.', color: 'danger', duration: 2000 });
    } finally {
      dismissLoading();
    }
  };

  return {
    isEditMode,
    selectedAnimals,
    setSelectedAnimals,
    formData,
    herdsList,
    handleInputChange,
    handleSubmit,
  };
};