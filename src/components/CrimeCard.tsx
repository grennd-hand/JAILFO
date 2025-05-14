import React from 'react';
import { motion } from 'framer-motion';

const colors = [
  'from-orange-400 via-pink-500 to-purple-600',
  'from-blue-400 via-green-400 to-yellow-400',
  'from-purple-500 via-indigo-500 to-pink-500',
  'from-teal-400 via-cyan-500 to-blue-500'
];

function randomColor(idx: number) {
  return colors[idx % colors.length];
}

const CrimeCard = ({ crime, idx }: { crime: any, idx: number }) => (
  <motion.div
    className={`bg-gradient-to-br ${randomColor(idx)} rounded-2xl shadow-2xl p-6 flex flex-col items-center relative transition-all`}
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(255,140,0,0.3)' }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg mb-4 bg-white flex items-center justify-center text-2xl font-bold text-orange-500">
      {crime.icon || '罪'}
    </div>
    <div className="text-white text-xl font-bold mb-2 tracking-wide drop-shadow">{crime.title}</div>
    <div className="text-white/80 mb-2">{crime.desc}</div>
    <div className="text-sm text-white/70 mb-1">编号 <span className="font-mono">{crime.id}</span></div>
    <div className="text-xs text-white/50 mb-2">时间 {crime.time}</div>
  </motion.div>
);

export default CrimeCard; 