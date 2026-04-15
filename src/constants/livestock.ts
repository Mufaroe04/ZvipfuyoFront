export const   BREED_CHOICES = [
    { value: 'AFR', label: 'Afrikaner' },
    { value: 'BOR', label: 'Boran' },
    { value: 'NGA', label: 'Nguni' },
    { value: 'TUL', label: 'Tuli' },
    { value: 'DRA', label: 'Drakensberger' },
    { value: 'BON', label: 'Bonsmara' },
    { value: 'ANG', label: 'Angus' },
    { value: 'HER', label: 'Hereford' },
    { value: 'SIM', label: 'Simmental' },
    { value: 'LIM', label: 'Limousin' },
    { value: 'CHA', label: 'Charolais' },
    { value: 'BRM', label: 'Brahman' },
    { value: 'DRM', label: 'Droughtmaster' },
    { value: 'BMA', label: 'Beefmaster' },
    { value: 'SGT', label: 'Santa Gertrudis' },
    { value: 'HOL', label: 'Holstein' },
    { value: 'JER', label: 'Jersey' },
    { value: 'AYR', label: 'Ayrshire' },
    { value: 'GUE', label: 'Guernsey' },
    { value: 'OTH', label: 'Other / Mixed' },
  ]as const;
 

 export const HERD_TYPES = [
    { value: 'Stud', label: 'Stud' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Feedlot', label: 'Feedlot' },
    { value: 'Research', label: 'Research' },
    { value: 'Dairy', label: 'Dairy' },
  ] as const;
export const REPRO_STATUS_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'open', label: 'Open' },
  { value: 'bred', label: 'Bred' },
  { value: 'pregnant', label: 'Pregnant' },
  { value: 'lactating', label: 'Lactating' },
  { value: 'dry', label: 'Dry' }
] as const;
export const SESSION_CHOICES =[
   {value:'AM',label : 'Morning'},
   {value:'PM', label:'Evening'},
    {value:'MID', label:'Midday'}
]
/**
 * Helper to get the Label from a Value (e.g., 'ANG' -> 'Angus')
 */
export const getBreedLabel = (value: string) => {
  return BREED_CHOICES.find(opt => opt.value === value)?.label || value;
};