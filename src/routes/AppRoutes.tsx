import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { Box } from '@mui/material';
import { UserRole } from '../types/types';
import { LoadingSpinner } from '../components/feedback/LoadingSpinner';

// Pages
import Login from '../pages/authentication/Login';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notifications';
import Chat from '../pages/Chat';
import InsightsPage from '../pages/InsightsPage';
import HerdCreatePage from '../views/herd/HerdCreatePage';
import HerdDetailView from '../views/herd/HerdDetailView';
import  AnimalListView  from '../views/livestock/AnimalListView';
import RegisterAnimalView from '../views/livestock/RegisterAnimalView';
import AnimalDetailView from '../views/livestock/AnimalDetailView';
import DairyOperationsView from '../views/dairy/DairyOperationsView';
import AddMilkYieldView from '../views/dairy/AddMilkYieldView';
import AddMilkQualityView from '../views/dairy/AddMilkQualityView';
import AddLactationView from '../views/dairy/AddLactationView';
import BeefDashboard from '../pages/BeefDashboard';
import HealthAndTreatments from '../pages/healthy&treatments/HealthAndTreatments';
import AddHealthRecord from '../pages/healthy&treatments/AddHealthRecord';
import Reproduction from '../pages/reproduction/Reproduction';
import AddBreedingEvent from '../pages/reproduction/AddBreedingEvent';
import WeightListing from '../pages/weight/WeightListing';
import AddWeight from '../pages/weight/AddWeight';
import CountingSession from '../pages/CountingSession';
import Tasks from '../pages/task/Tasks';
import AddTask from '../pages/task/AddTask';
import Transfer from '../pages/transfer/Transfer';
import AddTransfer from '../pages/transfer/AddTransfer';
import Inventory from '../pages/inventory/Inventory';
import AddInventoryItem from '../pages/inventory/AddInventoryItem';
import StockHistory from '../pages/inventory/StockHistory';
import FinancePage from '../pages/finance/FinancePage';
import NewEntryPage from '../pages/finance/NewEntryPage';
import Procurement from '../pages/inventory/Procurement';
import Suppliers from '../pages/inventory/Suppliers';
import StaffPage from '../pages/StaffPage';
import DashboardView from '../pages/DashboardView';
import HerdEditPage from '../views/herd/HerdEditPage';
import { RoleProtectedRoute } from './ProtectedRoute';
import HerdListView from '../views/herd/HerdListView';
import EditAnimalView from '../views/livestock/EditAnimalView';

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
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route exact path="/login" component={Login} />

      {/* General Application Core */}
      <RoleProtectedRoute exact path="/dashboard" component={DashboardView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/profile" component={Profile} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/notifications" component={Notifications} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
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
      <RoleProtectedRoute exact path="/beef" component={BeefDashboard} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />

      {/* Health, Breeding & Records */}
      <RoleProtectedRoute exact path="/health" component={HealthAndTreatments} allowedRoles={['owner', 'manager', 'vet', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/health/add" component={AddHealthRecord} allowedRoles={['owner', 'manager', 'vet', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/reproduction" component={Reproduction} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/reproduction/add" component={AddBreedingEvent} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/weights" component={WeightListing} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/weights/add" component={AddWeight} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/counting" component={CountingSession} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />

      {/* Operations & Tasks */}
      <RoleProtectedRoute exact path="/tasks" component={Tasks} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/tasks/add" component={AddTask} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/transfer" component={Transfer} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/operations/add-transfer" component={AddTransfer} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />

      {/* Inventory & Supply Chain */}
      <RoleProtectedRoute exact path="/inventory" component={Inventory} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/inventory/add" component={AddInventoryItem} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/inventory/history" component={StockHistory} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/sales-expenses" component={FinancePage} allowedRoles={['owner']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/sales-new-entry" component={NewEntryPage} allowedRoles={['owner']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/procurement" component={Procurement} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
      <RoleProtectedRoute exact path="/suppliers" component={Suppliers} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />

      {/* Administration & Staff Control */}
      <RoleProtectedRoute exact path="/staff" component={StaffPage} allowedRoles={['owner']} userRole={userRole} isAuthenticated={isAuthenticated} />

      <Route render={() => <Redirect to="/login" />} />
    </IonRouterOutlet>
  );
};