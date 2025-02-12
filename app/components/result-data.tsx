import { ApiResponse, Vehicle } from '@/types';

import ErrorMessage from '@/app/components/error';

type Props = {
  params: {
    makeId: string;
    year: string;
  };
};

const fetchModels = async (
  makeId: string,
  year: string,
): Promise<Vehicle[] | Error> => {
  try {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
    }

    const data: ApiResponse<Vehicle[]> = await res.json();
    return data.Results.length ? data.Results : new Error("No models found.");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching vehicle models:", error);
      return error;
    }
    return new Error("An unknown error occurred.");
  }
};

const ResultData: React.FC<Props> = async ({ params }) => {
  const { makeId, year } = await params;
  const result = await fetchModels(makeId, year);

  if (result instanceof Error) {
    return <ErrorMessage message={result.message} />;
  }

  return (
    <>
      {result.length > 0 && (
        <h2 className="text-xl mb-2">
          {`Available models for ${result[0].Make_Name}, year ${year}`}
        </h2>
      )}

      <ul className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {result.map(({ Model_ID, Model_Name }) => (
          <li key={Model_ID} className="p-2 border-b last:border-none">
            {Model_Name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ResultData;
