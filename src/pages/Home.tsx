import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PrisonGate from '../components/PrisonGate';

const Home = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [gateOpened, setGateOpened] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  useEffect(() => {
    // 页面加载后设置状态
    setIsLoaded(true);
    
    // 监听PrisonGate组件的开门事件
    const handleGateOpen = () => {
      setGateOpened(true);
      // 门开后显示菜单
      setTimeout(() => {
        setShowMenu(true);
      }, 1000);
    };
    
    // 添加自定义事件监听
    window.addEventListener('prisonGateOpened', handleGateOpen);
    
    return () => {
      window.removeEventListener('prisonGateOpened', handleGateOpen);
    };
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // 菜单按钮动画
  const menuButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 } 
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 0px 8px rgb(249,115,22)", 
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden px-4"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.3
          }
        }
      }}
    >
      {/* 背景元素 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 to-transparent"></div>
      </div>
      
      {/* 警戒线元素 - 移动端隐藏 */}
      <div className="absolute top-16 sm:top-20 left-0 right-0 w-full overflow-hidden h-6 hidden sm:flex">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...Array(20)].map((_, i) => (
            <span key={i} className="inline-block py-1 px-2 bg-yellow-400 text-black font-bold mx-2">警戒区域 · 禁止入内</span>
          ))}
        </motion.div>
      </div>

      {/* 主内容容器 - 适应不同屏幕尺寸 */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto">
        {/* 主内容 */}
        <motion.div variants={fadeIn} className="transform scale-90 sm:scale-100">
          <PrisonGate />
        </motion.div>
        
        <motion.h1 
          variants={fadeIn}
          className="mt-6 sm:mt-8 text-4xl sm:text-5xl font-bold text-white tracking-widest drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-500"
        >
          FO改造监狱
        </motion.h1>
        
        <motion.div 
          variants={fadeIn}
          className="mt-4 sm:mt-6 text-lg sm:text-xl text-orange-400 font-mono px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gray-800 bg-opacity-70 shadow-lg border border-orange-500/20 backdrop-blur-sm"
        >
          因"割韭菜罪"终身监禁
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-300 max-w-md text-center px-4"
        >
          本监狱不提供保释，只提供meme刑具
        </motion.div>
        
        {/* 导航菜单 - 仅当大门打开后显示 */}
        <AnimatePresence>
          {showMenu && (
            <motion.div 
              className="mt-8 sm:mt-12 flex flex-col space-y-4 w-full sm:w-auto sm:flex-row sm:space-y-0 sm:gap-6 px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.button
                variants={menuButtonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full sm:w-auto btn-primary text-lg py-3 px-6 sm:px-8 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg"
                onClick={() => navigate('/forum')}
              >
                进入讨论区
              </motion.button>
              
              <motion.button
                variants={menuButtonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full sm:w-auto btn-outline text-lg py-3 px-6 sm:px-8 rounded-lg shadow-lg"
                onClick={() => navigate('/crimes')}
              >
                查看罪名墙
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* 数据统计 - 在移动端调整位置和大小 */}
      <motion.div 
        variants={fadeIn}
        className="absolute bottom-4 sm:bottom-8 left-0 right-0 grid grid-cols-3 gap-4 sm:gap-8 px-4"
      >
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-orange-400">385</div>
          <div className="text-gray-400 text-xs sm:text-sm">在押囚犯</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-orange-400">782</div>
          <div className="text-gray-400 text-xs sm:text-sm">执行刑罚</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-orange-400">∞</div>
          <div className="text-gray-400 text-xs sm:text-sm">刑期总和</div>
        </div>
      </motion.div>
      
      {/* 移动端屏幕触控提示 */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 sm:hidden">
        <motion.div
          className="text-xs text-gray-400 opacity-70"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          点击大门体验监狱生活
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
