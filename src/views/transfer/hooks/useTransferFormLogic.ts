// import { useState, useEffect } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
// import { useIonLoading, useIonToast } from '@ionic/react';
// import { logisticsService } from '../../../services/logisticsService';
// import api from '../../../services/api';
// import { Transfer } from '../../../types/types';

// export const useTransferFormLogic = () => {
//   const history = useHistory();
//   const { id } = useParams<{ id?: string }>();
//   const isEditMode = Boolean(id);

//   const [presentLoading, dismissLoading] = useIonLoading();
//   const [presentToast] = useIonToast();

//   const [availableAnimals, setAvailableAnimals] = useState<any[]>([]);
//   const [selectedAnimals, setSelectedAnimals] = useState<any[]>([]);
//   const [formData, setFormData] = useState({
//     transfer_type: 'internal',
//     from_herd: '',
//     to_herd: '',
//     external_destination: '',
//     truck_reg_number: '',
//     driver_name: '',
//     vet_permit_number: '',
//     police_clearance_ref: '',
//   });

//   // Load animal references matching your system baseline active rules
//   useEffect(() => {
//     api.get('animals/').then((res) => {
//       const activeList = Array.isArray(res.data) ? res.data : res.data?.results || [];
//       setAvailableAnimals(activeList.filter((a: any) => a.status === 'active'));
//     }).catch(() => {
//       presentToast({ message: 'Error syncing herd data.', color: 'danger', duration: 2000 });
//     });
//   }, [presentToast]);

//   // Handle Edit Mode: Load existing details if id is provided
//   useEffect(() => {
//     if (isEditMode && id) {
//       logisticsService.getTransfers().then((res) => {
//         const transfersList = res.data?.results || [];
//         const record = transfersList.find((t: Transfer) => t.id === parseInt(id));
//         if (record) {
//           setFormData({
//             transfer_type: record.transfer_type || 'internal',
//             from_herd: record.from_herd?.toString() || '',
//             to_herd: record.to_herd?.toString() || '',
//             external_destination: record.external_destination || '',
//             truck_reg_number: record.truck_reg_number || '',
//             driver_name: record.driver_name || '',
//             vet_permit_number: record.vet_permit_number || '',
//             police_clearance_ref: record.police_clearance_ref || '',
//           });
//           // Match selected entities
//           if (record.animals) {
//             setSelectedAnimals(record.animals);
//           }
//         }
//       });
//     }
//   }, [id, isEditMode]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedAnimals.length === 0) {
//       presentToast({ message: 'Please select at least one animal tag.', color: 'warning', duration: 2000 });
//       return;
//     }

//     await presentLoading(isEditMode ? 'Updating pipeline...' : 'Initiating data payload...');
//     try {
//     //   const payload = {
//     //     ...formData,
//     //     animals: selectedAnimals.map((a) => a.id),
//     //     status: 'pending',
//     //   };
//     // Update the payload generation inside handleSubmit:
//         const payload: Partial<Transfer> = {
//         ...formData,
//         animals: selectedAnimals.map((a) => a.id),
//         status: 'pending' as const, // Uses literal type framing or 'as TransferStatus'
//         };

//       if (isEditMode && id) {
//         await logisticsService.updateTransfer(parseInt(id), payload);
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
//     availableAnimals,
//     selectedAnimals,
//     setSelectedAnimals,
//     formData,
//     setFormData,
//     handleSubmit,
//   };
// };

// import { useState, useEffect } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
// import { useIonLoading, useIonToast } from '@ionic/react';
// import { logisticsService } from '../../../services/logisticsService';
// import api from '../../../services/api';
// import { Transfer, TransferType } from '../../../types/types';

// // 1. Explicitly type the flat React form fields 
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

//   const [availableAnimals, setAvailableAnimals] = useState<any[]>([]);
//   const [selectedAnimals, setSelectedAnimals] = useState<any[]>([]);
  
//   // 2. Initialize state with strict interface boundaries
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

//   // Load animal references matching system baseline active rules
//   useEffect(() => {
//     api.get('animals/')
//       .then((res) => {
//         const activeList = Array.isArray(res.data) ? res.data : res.data?.results || [];
//         setAvailableAnimals(activeList.filter((a: any) => a.status === 'active'));
//       })
//       .catch(() => {
//         presentToast({ message: 'Error syncing herd data.', color: 'danger', duration: 2000 });
//       });
//   }, [presentToast]);

//   // Handle Edit Mode: Load existing details if id is provided
//   useEffect(() => {
//     if (isEditMode && id) {
//       logisticsService.getTransfers().then((res) => {
//         const transfersList = res.data?.results || [];
//         const record = transfersList.find((t: Transfer) => t.id === parseInt(id));
//         if (record) {
//           setFormData({
//             transfer_type: record.transfer_type || 'internal',
//             from_herd: record.from_herd?.toString() || '',
//             to_herd: record.to_herd?.toString() || '',
//             external_destination: record.external_destination || '',
//             truck_reg_number: record.truck_reg_number || '',
//             driver_name: record.driver_name || '',
//             vet_permit_number: record.vet_permit_number || '',
//             police_clearance_ref: record.police_clearance_ref || '',
//           });
          
//           if (record.animals) {
//             setSelectedAnimals(record.animals);
//           }
//         }
//       });
//     }
//   }, [id, isEditMode]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedAnimals.length === 0) {
//       presentToast({ message: 'Please select at least one animal tag.', color: 'warning', duration: 2000 });
//       return;
//     }

//     await presentLoading(isEditMode ? 'Updating pipeline...' : 'Initiating data payload...');
    
//     try {
//       // 3. Construct payload parsing types explicitly (string fields to numeric references)
//       const payload: Partial<Transfer> = {
//         transfer_type: formData.transfer_type,
//         from_herd: formData.from_herd ? parseInt(formData.from_herd, 10) : undefined,
//         to_herd: formData.to_herd ? parseInt(formData.to_herd, 10) : undefined,
//         external_destination: formData.external_destination || undefined,
//         truck_reg_number: formData.truck_reg_number || undefined,
//         driver_name: formData.driver_name || undefined,
//         vet_permit_number: formData.vet_permit_number || undefined,
//         police_clearance_ref: formData.police_clearance_ref || undefined,
//         animals: selectedAnimals.map((a) => (typeof a === 'object' ? a.id : a)),
//         status: 'pending',
//       };

//       if (isEditMode && id) {
//         await logisticsService.updateTransfer(parseInt(id, 10), payload);
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
//     availableAnimals,
//     selectedAnimals,
//     setSelectedAnimals,
//     formData,
//     setFormData,
//     handleSubmit,
//   };
// };

import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useIonLoading, useIonToast } from '@ionic/react';
import { logisticsService } from '../../../services/logisticsService';
import { Transfer, TransferType } from '../../../types/types';

// 1. Strict typing for local state form boundaries
interface TransferFormData {
  transfer_type: TransferType;
  from_herd: string;
  to_herd: string;
  external_destination: string;
  truck_reg_number: string;
  driver_name: string;
  vet_permit_number: string;
  police_clearance_ref: string;
  sire_tag?: string; // Captures single value selections
}

export const useTransferFormLogic = () => {
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();
  const isEditMode = Boolean(id);

  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  // Tracks multiple selected animals [{ id: number, tag_number: string }]
  const [selectedAnimals, setSelectedAnimals] = useState<any[]>([]);
  
  const [formData, setFormData] = useState<TransferFormData>({
    transfer_type: 'internal',
    from_herd: '',
    to_herd: '',
    external_destination: '',
    truck_reg_number: '',
    driver_name: '',
    vet_permit_number: '',
    police_clearance_ref: '',
    sire_tag: '',
  });

  // Handle Edit Mode: Fetch and hydrate active pipeline modifications
  useEffect(() => {
    if (isEditMode && id) {
      logisticsService.getTransfers()
        .then((res) => {
          const transfersList = res.data?.results || [];
          const record = transfersList.find((t: Transfer) => t.id === parseInt(id, 10));
          
          if (record) {
            setFormData({
              transfer_type: record.transfer_type || 'internal',
              from_herd: record.from_herd?.toString() || '',
              to_herd: record.to_herd?.toString() || '',
              external_destination: record.external_destination || '',
              truck_reg_number: record.truck_reg_number || '',
              driver_name: record.driver_name || '',
              vet_permit_number: record.vet_permit_number || '',
              police_clearance_ref: record.police_clearance_ref || '',
              sire_tag: (record as any).sire_tag || '',
            });
            
            // Normalize incoming animal profiles for AsyncAnimalSelect
            if (record.animals) {
              const mappedAnimals = record.animals.map((anim: any) => {
                if (typeof anim === 'object') {
                  return { id: anim.id, tag_number: anim.tag_number || `Tag: ${anim.id}` };
                }
                return { id: Number(anim), tag_number: `Tag: ${anim}` };
              });
              setSelectedAnimals(mappedAnimals);
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

    await presentLoading(isEditMode ? 'Updating pipeline...' : 'Initiating data payload...');
    
    try {
      // 2. Map payload cleanly, unpacking array objects to primary database keys
      const payload: Partial<Transfer> & { sire_tag?: string } = {
        transfer_type: formData.transfer_type,
        from_herd: formData.from_herd ? parseInt(formData.from_herd, 10) : undefined,
        to_herd: formData.to_herd ? parseInt(formData.to_herd, 10) : undefined,
        external_destination: formData.external_destination || undefined,
        truck_reg_number: formData.truck_reg_number || undefined,
        driver_name: formData.driver_name || undefined,
        vet_permit_number: formData.vet_permit_number || undefined,
        police_clearance_ref: formData.police_clearance_ref || undefined,
        animals: selectedAnimals.map((a) => (typeof a === 'object' ? a.id : parseInt(a, 10))),
        sire_tag: formData.sire_tag || undefined,
        status: 'pending',
      };

      if (isEditMode && id) {
        await logisticsService.updateTransfer(parseInt(id, 10), payload);
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
    setFormData,
    handleSubmit,
  };
};