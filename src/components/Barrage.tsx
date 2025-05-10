import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface BarrageProps {
  barrage?: string[];
  speed?: number; // 弹幕滚动速度系数，值越大越快
  maxBarrages?: number; // 最大显示弹幕数
}

interface BarrageItem {
  id: string;
  text: string;
  lane: number; // 弹幕轨道
  speed: number; // 个体速度随机化
  color: string; // 随机颜色
}

const Barrage: React.FC<BarrageProps> = ({ 
  barrage = [],
  speed = 1,
  maxBarrages = 10
}) => {
  const [activeBarrages, setActiveBarrages] = useState<BarrageItem[]>([]);
  
  // 随机颜色列表
  const colors = [
    'text-white', 'text-orange-300', 'text-blue-300', 
    'text-green-300', 'text-purple-300', 'text-yellow-300'
  ];
  
  useEffect(() => {
    if (barrage.length === 0) return;
    
    // 最多显示maxBarrages条弹幕
    const barrageToShow = barrage.slice(-maxBarrages);
    
    // 创建弹幕项
    const newBarrages = barrageToShow.map((text, i) => ({
      id: `barrage-${Date.now()}-${i}`,
      text,
      lane: Math.floor(Math.random() * 3), // 0-2三个轨道
      speed: 0.8 + Math.random() * 0.4, // 0.8-1.2速度随机化
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setActiveBarrages(prev => [...prev, ...newBarrages]);
    
    // 清理过多的弹幕
    if (activeBarrages.length > maxBarrages) {
      setActiveBarrages(prev => prev.slice(-maxBarrages));
    }
    
    // 自动清理老弹幕
    const timer = setTimeout(() => {
      setActiveBarrages(prev => {
        const currentTime = Date.now();
        // 移除10秒前的弹幕
        return prev.filter(b => {
          const barrageTime = parseInt(b.id.split('-')[1], 10);
          return currentTime - barrageTime < 10000;
        });
      });
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [barrage]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence>
        {activeBarrages.map((item) => (
          <motion.div
            key={item.id}
            className={`absolute whitespace-nowrap font-medium ${item.color}`}
            style={{
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              top: `${10 + item.lane * 33}%`, // 基于轨道分布位置
              right: -200, // 起始位置在可视区域右侧外
              fontSize: `${0.9 + Math.random() * 0.2}rem` // 随机字体大小
            }}
            initial={{ x: 0 }}
            animate={{ x: -2000 }} // 移动到可视区域左侧外
            exit={{ opacity: 0 }}
            transition={{
              duration: 15 / (speed * item.speed), // 15秒基准，根据速度调整
              ease: "linear"
            }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Barrage;
