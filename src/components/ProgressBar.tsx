import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  isVisible: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <motion.div
        className="h-1 bg-orange-500"
        initial={{ width: "0%" }}
        animate={{ 
          width: "100%",
          transition: { duration: 1, ease: "easeInOut" }
        }}
      />
    </motion.div>
  );
};

export default ProgressBar; 