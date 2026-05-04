// src/utils/livestockMetrics.ts
export const getDaysToCalving = (dateString: string | null | undefined) => {
  if (!dateString) return null;
  const today = new Date();
  const calvingDate = new Date(dateString);
  const diffTime = calvingDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateGrowthEfficiency = (birthWeight: number, currentWeight: number, birthDateString?: string) => {
  if (!birthWeight || !birthDateString) return 0;
  const today = new Date();
  const birthDate = new Date(birthDateString);
  const diffTime = today.getTime() - birthDate.getTime();
  const daysOld = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const projectedWeight = birthWeight + (daysOld * 0.8); // 0.8kg/day target
  return Math.round((currentWeight / projectedWeight) * 100);
};