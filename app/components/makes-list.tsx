import { Make, ApiResponse } from '@/types';

import FilterForm from '@/app/components/filter-form';

const fetchMakes = async (): Promise<Make[]> => {
  const res = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
  );
  const data: ApiResponse<Make[]> = await res.json();
  return data.Results;
};

const MakesList = async () => {
  const makes = await fetchMakes();

  return <FilterForm makes={makes} />;
};

export default MakesList;
