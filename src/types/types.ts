// --- ENUMS & CONSTANTS ---
export type Gender = 'male' | 'female';
export type AnimalStatus = 'active' | 'sold' | 'deceased' | 'quarantine';
export type ReproStatus = 'none' | 'open' | 'bred' | 'pregnant' | 'lactating' | 'dry';
export type TransferStatus = 'pending' | 'approved' | 'incoming' | 'outgoing' | 'intransit' | 'completed' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high';
export type NotificationLevel = 'info' | 'success' | 'warning' | 'danger';
export type Condition='Dry'|'Good'|'Muddy/Wet'| 'Overgrazed'

// --- MODELS ---

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Herd {
  id: number;
  name: string;
  location: string;
  herd_type: string;
  primary_breed: string;
  total_cattle: number;
  cows_count: number;
  bulls_count: number;
  calves_count: number;
  pregnant_count: number;
  sick_count: number;
}

export interface HerdDetail extends Herd {
  animals: Animal[]; // This is the "Digital Kraal" list
}
export interface HerdPayload{
  name: string;
  location: string;
  herd_type: string;
  primary_breed: string;
}
export interface WeightEntry {
  id: number;          // Unique ID for DataGrid
  animal_tag: string;  // We will pull this from the serializer
  animal_id: number;
  date: string; 
  weight_kg: number;
  change_kg: number;
}

export interface CountingSession {
  id: number;
  herd: number;          // ID of the herd being counted
  herd_name: string;     // ReadOnlyField from Serializer
  session_date: string;  // ISO DateTime string
  expected_count: number;
  actual_count: number;
  discrepancy: number;   // Calculated field
  discrepancy_notes?: string;
  condition: Condition;
  water_ponds: number;
  feed_stations: number;
  bales_observed: number;
  // Optional: If you plan to store the drone footage URL in the history
  drone_footage_url?: string; 
}
export interface InsightData {
  narrative: string;
  weather: {
    temp: number;
    humidity: number;
    location:string;
    thi: number;
    condition: string;
    current_date:string;
  };
  stats: {
            avg_weight: number;
            weight_alerts: number;
            transfer_count: number
        }
}
export interface HealthRecord {
  id: number;
  animal: number; // Animal ID
  treatment_date: string;
  condition: string;
  treatment: string;
  cost: number;
  follow_up_date?: string;
}

export interface BreedingEvent {
  id: number;
  dam: number;
  sire_tag: string;
  breeding_date: string;
  method: 'natural' | 'ai';
  status: string;
  expected_pd_date?: string;
  expected_calving_date?: string;
  days_to_calving?: number;
}

export interface Animal {
  id: number;
  tag_number: string;
  herd:string| number;
  herd_name:string;
  breed: string;
  breed_display: string;
  gender: Gender;
  date_of_birth: string;
  expected_calving_date:string;
  age: number;
  status: AnimalStatus;
  status_display: string;
  reproductive_status: ReproStatus; 
  muzzle_pattern_id?: string;
  father?: number;
  father_tag: string;
  mother?: number;
  mother_tag: string;
  latest_weight?: number;
  weights: WeightEntry[];
  birth_weight?:string;
  latest_weight_date: string | null; // Matches new backend field
  previous_weight: number | null;    // Matches new backend field
  previous_weight_date: string | null; // Matches new backend field
  health_records: HealthRecord[];
  breeding_history: BreedingEvent[];
}
export interface AnimalPayload {
  tag_number: string;
  herd: number;
  breed: string;
  gender: Gender;
  date_of_birth: string;
  status: AnimalStatus;
  reproductive_status: ReproStatus;
  father?: number;
  mother?: number;
}

export interface Transfer {
  id: number;
  status: TransferStatus;
  animals: number[];
  animal_tags: string[];
  // Expanded types for Zimbabwe local contexts
  transfer_type: 'internal' | 'external' | 'sale' | 'inheritance' | 'gift' | 'lobola' | 'feasting';
  from_herd: number;
  from_herd_name: string;
  to_herd?: number;
  to_herd_name?: string;
  external_destination?: string; // e.g., "Koala Park Abattoir"
  
  // Logistics
  truck_reg_number?: string;
  driver_name?: string;
  driver_phone?: string;
  
  // Regulatory (Zim context)
  vet_permit_number?: string;
  police_clearance_ref?: string;
  
  departure_time?: string;
  arrival_time?: string;
  created_at: string;
}
export interface InventoryItem {
  id: number;
  name: string;
  category: 'feed' | 'med' | 'equip' | 'tag';
  quantity_on_hand: number;
  unit: string;
  reorder_level: number;
  is_low_stock: boolean;
  cost_per_unit?: number;
  notes?:string
}

export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  priority: Priority;
  is_completed: boolean;
  is_overdue: boolean;
  assigned_to_name: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  level: NotificationLevel;
  link_to_route?: string;
  is_read: boolean;
  created_at: string;
}

export interface MilkTrendPoint {
  date: string;
  daily_total: number;
}

export interface DashboardData {
  inventory_key_indicators: {
    total_cattle: number;
    cows: number;
    bulls: number;
    calves: number;
  };
  herd_count: number;
  operational_alerts: {
    pregnant_cows: number;
    avg_herd_weight: number;
    open_cows: number;
  };
  area_monitoring: {
    condition: string;
    water_ponds: number;
    feed_stations: number; // Removed ? to match view
    bales_available?: number; // Added ? as it's not in view yet
    present_count: number;
    absent_count: number;
  };
  // Add this to your Django View's return dict if you want to show the list!
  upcoming_tasks?: Task[]; 
  counting_stats: {
    today_count: number;
    last_7_days: number;
    last_session_date: string | null;
  };
  transfer_stats: {
    pending: number;
    approved: number;
    incoming: number;
    outgoing: number;
    intransit: number;
  };
  task_stats: {
    assigned_today: number;
    due_today: number;
    overdue: number;
    upcoming: number;
  };
  health_stats: {
    treatment_today: number;
    treatment_next_week: number;
    fever_count: number;
    healthy_count: number;
    sick_count: number;
    thin_count: number;
    obese_count: number;
  };
  inventory_cost: number;
  pending_procurement_count: number;
  enclosure_stats: {
    enclosed: number;
    pens: number;
    pastures: number;
    quarantine: number;
  };
  low_stock_items: InventoryItem[];
  dairy_stats:{
        daily_total:number;
        active_milkers:number;
        avg_yield_per_cow:number;
        milk_trend: MilkTrendPoint[];
  }
}
export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  is_grazing_day: boolean; // Custom logic: e.g., false if heavy rain
  thi_index: number;       // Temperature-Humidity Index
}

export interface MilkYield {
    id:number;
    animal : Animal;
    date :string;
    session:string;
    amount_liters :number;
    is_colostrum : boolean;
    notes? :string
}

export interface MilkQuality{
    id :number;
    animal : Animal;
    date :string;
    fat_percentage:number;
    protein_percentage :number;
    somatic_cell_count :number;
}

export interface LactationPeriod{
    id :number;
    animal : Animal;
    start_date :string;
    end_date :string;
    lactation_number:string;
    is_active :boolean;
}

export interface MilkYieldPayload {
    // animal: number;
    date: string;
    amount_liters: number;
    session: 'AM' | 'PM' | 'MID'; // Force one of your choices
    is_colostrum : boolean;
    notes? :string
}

export interface MilkQualityPayload{
    date :string;
    fat_percentage:number;
    protein_percentage :number;
    somatic_cell_count :number;
}

export interface LactationPeriodPayload{
    start_date :string;
    end_date :string;
    lactation_number:string;
    is_active :boolean;
}
