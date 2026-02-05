const categoryMap: Record<string, string> = {
  machine_roller: 'Rollers',
  machine_sorter: 'Optical Sorters',
  machine_dryer: 'Dryers',
  machine_die_casting: 'Die Casting Machines'
};

export function useCategoryFormatter() {
  const formatCategory = (slug: string): string => {
    return categoryMap[slug] ?? slug.replace('machine_', '').toUpperCase();
  };

  return {
    formatCategory
  };
}