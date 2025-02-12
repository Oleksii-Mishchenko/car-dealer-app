import { Make, ApiResponse } from '@/types';

import ErrorMessage from '@/app/components/error';
import FilterForm from '@/app/components/filter-form';

const fetchMakes = async (): Promise<Make[] | Error> => {
  try {
    const res = await fetch(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
    }

    const data: ApiResponse<Make[]> = await res.json();
    return data.Results.length ? data.Results : new Error('No car makes found.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching car makes:', error);
      return error;
    }
    return new Error('An unknown error occurred.');
  }
};

const MakesList = async () => {
  const result = await fetchMakes();

  if (result instanceof Error) {
    return <ErrorMessage message={result.message} />;
  }

  return <FilterForm makes={result} />;
};

export default MakesList;
