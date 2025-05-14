import React from 'react';
import CrimeCard from './CrimeCard';

interface CrimeListProps {
  crimes: any[];
}

const CrimeList: React.FC<CrimeListProps> = ({ crimes }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {crimes.map((crime, idx) => (
      <CrimeCard key={crime.id} crime={crime} idx={idx} />
    ))}
  </div>
);

export default CrimeList;