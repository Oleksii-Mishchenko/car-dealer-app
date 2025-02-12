"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import { Make } from "@/types";

type Props = {
  makes: Make[];
}

const FilterForm: React.FC<Props> = ({ makes }) => {
  const [selectedMake, setSelectedMake] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const START_YEAR = Number(process.env.NEXT_PUBLIC_START_YEAR);
  const CURRENT_YEAR = Number(process.env.NEXT_PUBLIC_CURRENT_YEAR);

  const isLinkDisabled = selectedMake === null || selectedYear === null;

  const years: number[] = useMemo(() => Array.from(
      { length: CURRENT_YEAR - START_YEAR + 1 },
      (_, i) => START_YEAR + i
    ), [CURRENT_YEAR, START_YEAR]);

  return (
    <form className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg">
      <select
        className="border p-2 rounded"
        onChange={(e) => setSelectedMake(Number(e.target.value) || null)}
      >
        <option value="" disabled={selectedMake !== null}>
          Select a Vehicle
        </option>

        {makes.map(({ MakeId, MakeName }) => (
          <option key={MakeId} value={MakeId}>
            {MakeName}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      >
        <option value="" disabled={selectedYear !== null}>
          Select a Year
        </option>

        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <Link
        href={isLinkDisabled ? "#" : `/result/${selectedMake}/${selectedYear}`}
        className={clsx('text-center p-2 rounded text-white',
          isLinkDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
        )}
        aria-disabled={isLinkDisabled}
      >
        Next
      </Link>
    </form>
  );
};

export default FilterForm;
