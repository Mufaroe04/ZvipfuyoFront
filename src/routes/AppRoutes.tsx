import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { Box } from '@mui/material';
import { UserRole } from '../types/types';
import { LoadingSpinner } from '../components/feedback/LoadingSpinner';

// Pages
import Login from '../views/authentication/Login';
// import Profile from '../pages/Profile';
import NotificationsView from '../views/notifications/NotificationsView';
import Chat from '../views/chat/Chat';
import InsightsPage from '../views/insights/InsightsPage';
import HerdCreatePage from '../views/herd/HerdCreatePage';
import HerdDetailView from '../views/herd/HerdDetailView';
import  AnimalListView  from '../views/livestock/AnimalListView';
import RegisterAnimalView from '../views/livestock/RegisterAnimalView';
import AnimalDetailView from '../views/livestock/AnimalDetailView';
import DairyOperationsView from '../views/dairy/DairyOperationsView';
import AddMilkYieldView from '../views/dairy/AddMilkYieldView';
import AddMilkQualityView from '../views/dairy/AddMilkQualityView';
import AddLactationView from '../views/dairy/AddLactationView';
import BeefOperations from '../views/beef/BeefOperations';
import AddBreedingEvent from '../views/reproduction/AddBreedingEventView';
import WeightListingView from '../views/weight/WeightListingView';
import CountingSessionView from '../views/counting/CountingSessionView';
import TasksView from '../views/tasks/TasksView';
import AddTaskView from '../views/tasks/AddTaskView';
import TransferView from '../views/transfer/TransferView';
// import AddTransfer from '../views/transfer/AddTransfer';
import Inventory from '../views/inventory/InventoryView';
import AddInventoryItem from '../views/inventory/AddInventoryItemView';
import StockHistory from '../views/inventory/StockHistory';
import FinanceView from '../views/finance/FinanceView';
import AddSaleView from '../views/finance/AddSaleView';
import ProcurementView from '../views/inventory/ProcurementView';
import SuppliersView from '../views/inventory/SuppliersView';
import StaffView from '../views/staff/StaffView';
import DashboardView from '../views/dashboards/DashboardView';
import HerdEditPage from '../views/herd/HerdEditPage';
import { RoleProtectedRoute } from './ProtectedRoute';
import HerdListView from '../views/herd/HerdListView';
import EditAnimalView from '../views/livestock/EditAnimalView';
import HealthAndTreatmentsView from '../views/healthy&treatments/HealthAndTreatmentsView';
import AddHealthRecordView from '../views/healthy&treatments/AddHealthRecordView';
import EditHealthRecordView from '../views/healthy&treatments/EditHealthRecordView';
import ReproductionView from '../views/reproduction/ReproductionView';
import EditBreedingEventView from '../views/reproduction/EditBreedingEventView';
import AddWeightView from '../views/weight/AddWeightView';
import EditWeightView from '../views/weight/EditWeightView';
import EditTaskView from '../views/tasks/EditTaskView';
import AddTransferView from '../views/transfer/AddTransferView';
import EditTransferView from '../views/transfer/EditTransferView';

interface AppRoutesProps {
  userRole: UserRole | null; // Correctly typed to allow null values during initialization
  isAuthenticated: boolean;
  isAuthLoading?: boolean;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ 
  userRole, 
  isAuthenticated, 
  isAuthLoading = false 
}) => {
  
  if (isAuthLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#F9FAFB' }}>
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <IonRouterOutlet id="main-content">
      {/* Fundamental Public Base Handling */}
      <Switch>

      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route exact path="/login" component={Login} />

      {/* General Application Core */}
      <RoleProtectedRoute exact path="/dashboard" component={DashboardView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      {/* <RoleProtectedRoute exact path="/profile" component={Profile} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} /> */}
      <RoleProtectedRoute exact path="/notifications" component={NotificationsView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/chat" component={Chat} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />

      {/* Herd Management */}
      <RoleProtectedRoute exact path="/insights" component={InsightsPage} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/herds" component={HerdListView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/herdsadd" component={HerdCreatePage} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/herds/:id" component={HerdDetailView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/herds/edit/:id" component={HerdEditPage} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/animals" component={AnimalListView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/animals/add" component={RegisterAnimalView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/herds/:herdId/add-animal" component={RegisterAnimalView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/animal/:id" component={AnimalDetailView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/animal/edit/:id" component={EditAnimalView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />


      {/* Specialized Production Operations */}
      <RoleProtectedRoute exact path="/dairy" component={DairyOperationsView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/dairy/milk-yield/add" component={AddMilkYieldView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/dairy/milk-quality/add" component={AddMilkQualityView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/dairy/milk-lactation/add" component={AddLactationView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/beef" component={BeefOperations} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />

      {/* Health, Breeding & Records */}
      <RoleProtectedRoute exact path="/health" component={HealthAndTreatmentsView} allowedRoles={['owner', 'manager', 'vet', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/health/add" component={AddHealthRecordView} allowedRoles={['owner', 'manager', 'vet', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/health/edit/:id" component={EditHealthRecordView} allowedRoles={['owner', 'manager', 'vet', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/reproduction" component={ReproductionView} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/reproduction/add" component={AddBreedingEvent} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/reproduction/edit/:id" component={EditBreedingEventView} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/weights" component={WeightListingView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/weights/add" component={AddWeightView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/weights/edit/:id" component={EditWeightView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />

      <RoleProtectedRoute exact path="/counting" component={CountingSessionView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />

      {/* Operations & Tasks */}
      <RoleProtectedRoute exact path="/tasks" component={TasksView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/tasks/add" component={AddTaskView} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/tasks/edit/:id" component={EditTaskView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/transfer" component={TransferView} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/operations/add-transfer" component={AddTransferView} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/operations/edit/:id" component={EditTransferView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />


      {/* Inventory & Supply Chain */}
      <RoleProtectedRoute exact path="/inventory" component={Inventory} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/inventory/add" component={AddInventoryItem} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/inventory/history" component={StockHistory} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/sales-expenses" component={FinanceView} allowedRoles={['owner']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/sales-new-entry" component={AddSaleView} allowedRoles={['owner']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/procurement" component={ProcurementView} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/suppliers" component={SuppliersView} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />

      {/* Administration & Staff Control */}
      <RoleProtectedRoute exact path="/staff" component={StaffView} allowedRoles={['owner']} userRole={userRole} isAuthenticated={isAuthenticated} />

      <Route render={() => <Redirect to="/login" />} />
      </Switch>

    </IonRouterOutlet>
  );
};