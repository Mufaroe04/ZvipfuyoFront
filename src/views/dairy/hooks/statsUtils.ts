export const aggregateDairyData = (data: any[], valueKeys: string | string[], selectedBreed: string) => {
  const stats = data.reduce((acc: any, curr) => {
    if (selectedBreed !== 'All' && curr.breed !== selectedBreed) return acc;
    const dateKey = curr.date || curr.test_date || curr.start_date;
    if (!dateKey) return acc;

    if (!acc[dateKey]) {
      acc[dateKey] = { total: Array.isArray(valueKeys) ? valueKeys.map(() => 0) : 0, count: 0 };
    }

    if (Array.isArray(valueKeys)) {
      valueKeys.forEach((key, idx) => { acc[dateKey].total[idx] += Number(curr[key]) || 0; });
    } else {
      acc[dateKey].total += Number(curr[valueKeys]) || 0;
    }
    acc[dateKey].count += 1;
    return acc;
  }, {});

  return Object.keys(stats).sort().reduce((obj: any, key) => {
    obj[key] = stats[key];
    return obj;
  }, {});
};

export const getLactationDistribution = (lactations: any[], selectedBreed: string) => {
  const stages = { 'Early (0-100d)': 0, 'Mid (100-200d)': 0, 'Late (200-305d)': 0, 'Overdue (>305d)': 0 };
  
  lactations.forEach(l => {
    if (selectedBreed !== 'All' && l.breed !== selectedBreed) return;
    if (l.end_date) return;
    const start = new Date(l.start_date).getTime();
    const days = Math.floor((new Date().getTime() - start) / (1000 * 60 * 60 * 24));
    
    if (days <= 100) stages['Early (0-100d)']++;
    else if (days <= 200) stages['Mid (100-200d)']++;
    else if (days <= 305) stages['Late (200-305d)']++;
    else stages['Overdue (>305d)']++;
  });

  return Object.keys(stages).map(key => ({ x: key, y: (stages as any)[key] }));
};