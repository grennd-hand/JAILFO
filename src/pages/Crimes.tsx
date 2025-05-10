import React from 'react';
import CrimeList from '../components/CrimeList';

const Crimes = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-white mb-4">罪名墙 · meme审判</h2>
      <CrimeList />
    </div>
  );
};

export default Crimes;
