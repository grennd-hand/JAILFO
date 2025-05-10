import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 监狱大门动画组件
const PrisonGate = () => {
  const [opened, setOpened] = useState(false);
  const [showHint, setShowHint] = useState(true);
  
  useEffect(() => {
    if (opened) {
      // 打开门后隐藏提示
      setShowHint(false);
      
      // 触发自定义事件，通知父组件门已打开
      const event = new Event('prisonGateOpened');
      window.dispatchEvent(event);
      
      // 5秒后自动关门
      const timer = setTimeout(() => {
        setOpened(false);
        setTimeout(() => setShowHint(true), 1000);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [opened]);

  const handleClick = () => {
    if (!opened) {
      setOpened(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* 铁栅栏阴影 */}
      <div className="absolute top-2 w-64 sm:w-80 h-48 sm:h-60 bg-black/20 rounded-lg blur-md"></div>
      
      {/* 监狱围墙 */}
      <div className="relative w-64 sm:w-80 h-52 sm:h-64 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800">
        {/* 警告标志 */}
        <motion.div 
          className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold py-1 px-3 rounded-sm z-10"
          animate={{ rotateZ: [0, 1, -1, 0] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
        >
          高压危险区域
        </motion.div>
        
        {/* 大门结构 */}
        <div className="absolute top-9 left-0 right-0 bottom-0 bg-gray-950 flex items-center justify-center">
          {/* 门框 */}
          <div className="relative w-44 sm:w-56 h-40 sm:h-48 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-xl border-t-2 border-x-2 border-gray-700 overflow-hidden">
            {/* 图片门 */}
            <motion.div
              className="absolute inset-0 flex"
              style={{
                backgroundImage: 'url(/prison-image.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: opened ? 0 : 1 }}
              transition={{ duration: 0.8 }}
            />
            
            {/* 铁栏杆左侧门 */}
            <motion.div
              className="absolute inset-0 flex flex-row justify-between pr-4 pl-8 py-2"
              initial={{ x: 0 }}
              animate={{ x: opened ? -80 : 0 }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 70 }}
            >
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-full bg-gradient-to-b from-gray-500 to-gray-600 rounded-full shadow-inner">
                  {/* 铁锈效果 */}
                  {[...Array(3)].map((_, j) => (
                    <div 
                      key={j} 
                      className="absolute w-1 h-1 rounded-full bg-orange-800" 
                      style={{ 
                        left: `${Math.random() * 80}%`, 
                        top: `${Math.random() * 100}%` 
                      }}
                    />
                  ))}
                </div>
              ))}
              
              {/* 门锁 */}
              <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 sm:w-3 h-12 sm:h-16 bg-gray-400 rounded-sm"></div>
            </motion.div>
            
            {/* 铁栏杆右侧门 */}
            <motion.div
              className="absolute inset-0 flex flex-row justify-between pl-4 pr-8 py-2"
              initial={{ x: 0 }}
              animate={{ x: opened ? 80 : 0 }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 70 }}
            >
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-full bg-gradient-to-b from-gray-500 to-gray-600 rounded-full shadow-inner">
                  {/* 铁锈效果 */}
                  {[...Array(3)].map((_, j) => (
                    <div 
                      key={j} 
                      className="absolute w-1 h-1 rounded-full bg-orange-800" 
                      style={{ 
                        left: `${Math.random() * 80}%`, 
                        top: `${Math.random() * 100}%` 
                      }}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
            
            {/* 电机/机械部分 */}
            <div className="absolute -bottom-2 w-full h-6 sm:h-8 bg-gray-800 flex justify-center items-center">
              <motion.div 
                className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-600 rounded-full border-4 border-gray-500"
                animate={{ rotateZ: opened ? [0, 360] : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
        
        {/* 互动区域 - 在移动端增大点击区域 */}
        <button 
          className="absolute inset-0 cursor-pointer z-20 opacity-0"
          onClick={handleClick}
          aria-label="打开监狱大门"
        />
        
        {/* 顶部闪烁警灯 */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 flex space-x-10 sm:space-x-12">
          <motion.div
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500 shadow-lg shadow-red-500/50"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1, repeatDelay: 0.2 }}
          />
          <motion.div
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1, repeatDelay: 0.2 }}
          />
        </div>
      </div>
      
      {/* 提示文字 */}
      <AnimatePresence>
        {showHint && (
          <motion.div 
            className="mt-4 text-gray-400 text-xs hidden sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            点击大门进入监狱系统
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 地面阴影 */}
      <div className="w-48 sm:w-64 h-3 sm:h-4 bg-black/20 rounded-full blur-md -mt-2"></div>
    </div>
  );
};

export default PrisonGate;
