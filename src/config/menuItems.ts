import {
  homeOutline, statsChartOutline, listOutline, pawOutline, waterOutline,
  trendingUpOutline, medkitOutline, gitNetworkOutline, scaleOutline,
  calculatorOutline, checkboxOutline, swapHorizontalOutline, cashOutline,
  archiveOutline, cartOutline, businessOutline
} from "ionicons/icons";
import { MenuItem } from '../types/types';

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Dashboard', icon: homeOutline, url: '/dashboard', roles: ['owner', 'manager', 'hand', 'vet'] },
  { label: 'Insights', icon: statsChartOutline, url: '/insights', roles: ['owner', 'manager', 'vet'] },
  { label: 'My Herds', icon: listOutline, url: '/herds', roles: ['owner', 'manager', 'hand', 'vet'] },
  { label: 'My Animals', icon: pawOutline, url: '/animals', roles: ['owner', 'manager', 'hand', 'vet'] },
  { label: 'Dairy Operations', icon: waterOutline, url: '/dairy', roles: ['owner', 'manager', 'hand'] },
  { label: 'Beef Cattle Operations', icon: trendingUpOutline, url: '/beef', roles: ['owner', 'manager', 'hand'] },
  { label: 'Health & Treatments', icon: medkitOutline, url: '/health', roles: ['owner', 'manager', 'vet', 'hand'] },
  { label: 'Reproduction', icon: gitNetworkOutline, url: '/reproduction', roles: ['owner', 'manager', 'vet'] },
  { label: 'Weight Tracking', icon: scaleOutline, url: '/weights', roles: ['owner', 'manager', 'hand'] },
  { label: 'Counting Session', icon: calculatorOutline, url: '/counting', roles: ['owner', 'manager', 'hand'] },
  { label: 'Tasks', icon: checkboxOutline, url: '/tasks', roles: ['owner', 'manager', 'hand', 'vet'] },
  { label: 'Transfer', icon: swapHorizontalOutline, url: '/transfer', roles: ['owner', 'manager'] },
  { label: 'Sales & Expenses', icon: cashOutline, url: '/sales-expenses', roles: ['owner'] },
  { label: 'Inventory', icon: archiveOutline, url: '/inventory', roles: ['owner', 'manager', 'hand'] },
  { label: 'Procurement', icon: cartOutline, url: '/procurement', roles: ['owner', 'manager'] },
  { label: 'Supplier Directory', icon: businessOutline, url: '/suppliers', roles: ['owner', 'manager'] },
];