import { Suspense } from 'react';

import ResultData from '@/app/components/result-data';

type Props = {
  params: {
    makeId: string;
    year: string;
  };
};

const ResultPage: React.FC<Props> = ({ params }) => (
  <main className="flex flex-col items-center min-h-screen p-6">
    <h1 className="text-2xl font-bold mb-4">Vehicle Models</h1>

    <Suspense fallback={<p className="text-center">Loading...</p>}>
      <ResultData params={params} />
    </Suspense>
  </main>
);

export default ResultPage;
