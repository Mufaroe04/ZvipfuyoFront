import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import { RoleProtectedRoute } from '../components/ProtectedRoute';
import { UserRole } from '../types/types';

// Pages
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notifications';
import Chat from '../pages/Chat';
import Insights from '../pages/Insights';
import MyHerds from '../pages/MyHerds';
import HerdCreatePage from '../pages/HerdCreatePage';
import HerdDetailView from '../pages/HerdDetailView';
import MyAnimals from '../pages/MyAnimals';
import RegisterAnimalView from '../pages/RegisterAnimalView';
import AnimalDetailView from '../pages/AnimalDetailView';
import DairyOperations from '../pages/DairyOperations';
import AddMilkYields from '../pages/AddMilkYields';
import AddMilkQuality from '../pages/AddMilkQuality';
import AddLactation from '../pages/AddLactation';
import BeefDashboard from '../pages/BeefDashboard';
import HealthAndTreatments from '../pages/HealthAndTreatments';
import AddHealthRecord from '../pages/AddHealthRecord';
import Reproduction from '../pages/Reproduction';
import AddBreedingEvent from '../pages/AddBreedingEvent';
import WeightListing from '../pages/WeightListing';
import AddWeight from '../pages/AddWeight';
import CountingSession from '../pages/CountingSession';
import Tasks from '../pages/Tasks';
import AddTask from '../pages/AddTask';
import Transfer from '../pages/Transfer';
import AddTransfer from '../pages/AddTransfer';
import Inventory from '../pages/Inventory';
import AddInventoryItem from '../pages/AddInventoryItem';
import StockHistory from '../pages/StockHistory';
import FinancePage from '../pages/FinancePage';
import NewEntryPage from '../pages/NewEntryPage';
import Procurement from '../pages/Procurement';
import Suppliers from '../pages/Suppliers';
import StaffPage from '../pages/StaffPage';
import DashboardView from '../pages/DashboardView';

interface AppRoutesProps {
  userRole: UserRole;
  isAuthenticated: boolean;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ userRole, isAuthenticated }) => (
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
    <RoleProtectedRoute exact path="/insights" component={Insights} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
    <RoleProtectedRoute exact path="/herds" component={MyHerds} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
    <RoleProtectedRoute exact path="/herdsadd" component={HerdCreatePage} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
    <RoleProtectedRoute exact path="/herds/:id" component={HerdDetailView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
    <RoleProtectedRoute exact path="/animals" component={MyAnimals} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
    <RoleProtectedRoute exact path="/animals/add" component={RegisterAnimalView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
    <RoleProtectedRoute exact path="/herds/:herdId/add-animal" component={RegisterAnimalView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
    <RoleProtectedRoute exact path="/animal/:id" component={AnimalDetailView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />

    {/* Specialized Production Operations */}
    <RoleProtectedRoute exact path="/dairy" component={DairyOperations} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
    <RoleProtectedRoute exact path="/dairy/milk-yield/add" component={AddMilkYields} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
    <RoleProtectedRoute exact path="/dairy/milk-quality/add" component={AddMilkQuality} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
    <RoleProtectedRoute exact path="/dairy/milk-lactation/add" component={AddLactation} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
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