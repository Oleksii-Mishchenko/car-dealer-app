import { Suspense } from "react";

import MakesList from "@/app/components/makes-list";

const HomePage = () => (
  <main className="flex flex-col gap-4 justify-center items-center min-h-screen">
    <h1 className="text-xl text-center">
      Please select a vehicle maker and a production year
    </h1>

    <Suspense fallback={<p>Loading...</p>}>
      <MakesList />
    </Suspense>
  </main>
);

export default HomePage;